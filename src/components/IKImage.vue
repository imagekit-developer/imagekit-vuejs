<template>
  <div v-if="lqip && lqip.active">
    <Intersect @enter="lqipSrc = imageAttrs.src" @leave="lqipSrc = lqipImage.src">
      <img class="=ik-image" ref="imageRef" v-bind:src="lqipSrc" />
    </Intersect>
  </div>
  <div v-else>
    <img class="=ik-image" ref="imageRef" v-bind="imageAttrs" />
  </div>
</template>

<script>
import Intersect from "./Intersect";
import { generateUrl } from "../helpers/urlGenerators";

import Vue from "vue";
export default Vue.extend({
  name: "IKImage",
  inject: { configurations: { default: "" } },
  data() {
    return {
      lqipSrc: ""
    };
  },
  components: { Intersect },
  props: {
    publicKey: { type: String, default: "", required: false },
    urlEndpoint: { type: String, default: "", required: false },
    path: { type: String, default: "", required: false },
    src: { type: String, default: "", required: false },
    transformation: { type: Array, required: false },
    lqip: { type: Object, required: false }
  },
  computed: {
    imageAttrs() {
      const { configurations } = this;
      let src = generateUrl({
        publicKey:
          configurations && configurations.publicKey
            ? configurations.publicKey
            : this.publicKey,
        urlEndpoint:
          configurations && configurations.urlEndpoint
            ? configurations.urlEndpoint
            : this.urlEndpoint,
        src: this.src,
        path: this.path,
        transformation: this.transformation
      });

      return {
        src
      };
    },
    lqipImage() {
      const { lqip, path } = this;
      let { src } = this;
      if (lqip !== undefined && lqip.active) {
        const quality = lqip.quality;
        if (path !== "") {
          let newUrl = src.split("tr:");
          if (newUrl[0] === src) {
            let newUrl = src.split("/");
            newUrl = `${newUrl[0]}//${newUrl[2]}/${
              newUrl[3]
            }/tr:q-${quality}/${newUrl[4]}`;
            src = `${newUrl}`;
          } else {
            newUrl = `${newUrl[0]}tr:q-${quality}${newUrl[1]}`;
            src = `${newUrl}`;
          }
        } else {
          src = `${src}?tr=q-${quality}`;
        }
      }

      return {
        src
      };
    }
  },
  mounted: function() {}
});
</script>
