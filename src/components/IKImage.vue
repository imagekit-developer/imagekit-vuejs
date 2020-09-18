<template>
  <Intersect
    v-if="lqip && lqip.active"
    @enter="lqipSrc = imageAttrs.src"
    @leave="lqipSrc = lqipImage.src"
  >
    <img class="ik-image" ref="imageRef" :src="lqipSrc?lqipSrc:lqipImage.src" />
  </Intersect>
  <img v-else class="ik-image" ref="imageRef" v-bind="imageAttrs" />
</template>

<script>
import Intersect from "./Intersect";
import ImageKit from '@imagekit/imagekit-javascript';
import pkg from "../../package.json";
import Vue from "vue";

export default {
  name: "ik-image",
  inject: { contextConfigurations: { default: {} } },
  data() {
    return {
      lqipSrc: null
    };
  },
  components: { Intersect },
  props: {
    publicKey: { type: String, default: "", required: false },
    urlEndpoint: { type: String, default: "", required: false },
    path: { type: String, default: "", required: false },
    src: { type: String, default: "", required: false },
    transformation: { type: Array, required: false },
    transformationPosition: { type: String, required: false },
    queryParameters: { type: Object, required: false },
    lqip: { type: Object, required: false }
  },
  methods: {
    getMergedOptions: function() {
      return {
        ...this.defaultOptions,
        ...this.contextConfigurations
      };
    },
    getClient: function() {
      return new ImageKit({
        sdkVersion: `vuejs-${pkg.version}`,
        urlEndpoint: this.urlEndpoint ? this.urlEndpoint : this.contextConfigurations.urlEndpoint
      })
    }
  },
  computed: {
    imageAttrs: function() {
      const mergedOptions = this.getMergedOptions();
      const IkClient = this.IkClient || this.getClient();

      let src = IkClient.url({
        publicKey: this.publicKey ? this.publicKey : mergedOptions.publicKey,
        urlEndpoint: this.urlEndpoint ? this.urlEndpoint : mergedOptions.urlEndpoint,
        src: this.src,
        path: this.path,
        transformation: this.transformation,
        transformationPosition: this.transformationPosition,
        queryParameters: this.queryParameters
      });

      return {
        src
      };
    },
    lqipImage: function() {
      const { lqip, path } = this;
      const mergedOptions = this.getMergedOptions();
      const IkClient = this.IkClient || this.getClient();

      let src = IkClient.url({
        publicKey: this.publicKey ? this.publicKey : mergedOptions.publicKey,
        urlEndpoint: this.urlEndpoint ? this.urlEndpoint : mergedOptions.urlEndpoint,
        src: this.src,
        path: this.path,
        transformation: this.transformation,
        transformationPosition: this.transformationPosition,
        queryParameters: this.queryParameters
      });

      if (lqip.active) {
        const quality = lqip.threshold;
        if (path !== "") {
          let newUrl = src.split("tr:");
          if (newUrl[0] === src) {
            let newUrl = src.split("/");
            src = `${newUrl[0]}//${newUrl[2]}/${newUrl[3]}/tr:q-${quality}/${newUrl[4]}`;
          } else {
            src = `${newUrl[0]}tr:q-${quality},${newUrl[1]}`;
          }
        } else {
          if (this.transformation !== undefined) {
            src = `${src}%2Cq-${quality}`;
          } else {
            src = `${src}&tr=q-${quality}`;
          }
        }
      }

      return {
        src
      };
    }
  }
};
</script>
