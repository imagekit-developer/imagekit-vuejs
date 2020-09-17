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
import { generateUrl } from "../helpers/urlGenerators";
import Vue from "vue";

export default {
  name: "ik-image",
  inject: { configurations: { default: {} } },
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
    getConfiguration: function() {
      return {
        ...this.defaultConfiguration,
        ...this.configurations
      };
    }
  },
  computed: {
    imageAttrs: function() {
      const configurations = this.getConfiguration();
      let src = generateUrl({
        publicKey:
          configurations && configurations.publicKey
            ? configurations.publicKey
            : this.publicKey,
        urlEndpoint: this.urlEndpoint
          ? this.urlEndpoint
          : configurations.urlEndpoint,
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
      const configurations = this.getConfiguration();
      let src = generateUrl({
        publicKey:
          configurations && configurations.publicKey
            ? configurations.publicKey
            : this.publicKey,
        urlEndpoint: this.urlEndpoint
          ? this.urlEndpoint
          : configurations.urlEndpoint,
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

      debugger;
console.log(src);
      return {
        src
      };
    }
  }
};
</script>
