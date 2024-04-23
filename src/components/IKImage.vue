<template>
  <img class="ik-image" :src="srcImage" />
</template>

<script>
import { defineComponent } from 'vue';
import ImageKit from 'imagekit-javascript';
const VERSION = "2.0.2";

export default defineComponent({
  name: "ik-image",
  inject: { contextConfigurations: { default: {} } },
  data() {
    return {
      intersected: false,
      observer: null,
      originalSrcLoaded: false
    };
  },
  props: {
    urlEndpoint: { type: String, default: "", required: false },
    publicKey: { type: String, default: "", required: false },
    path: { type: String, default: "", required: false },
    src: { type: String, default: "", required: false },
    transformation: { type: Array, required: false },
    transformationPosition: { type: String, required: false },
    queryParameters: { type: Object, required: false },
    lqip: { type: Object, default: null, required: false },
    loading: { type: String, default: "" }
  },
  methods: {
    getMergedOptions: function () {
      return {
        ...this.contextConfigurations
      };
    },
    getClient: function () {
      return new ImageKit({
        sdkVersion: `vuejs-${VERSION}`,
        urlEndpoint: this.urlEndpoint ? this.urlEndpoint : this.contextConfigurations.urlEndpoint
      })
    },
    triggerOriginalImageLoad: function () {
      var img = new Image();
      img.onload = () => {
        this.originalSrcLoaded = true;
      }
      img.src = this.imageAttrs.src;
    },
    getEffectiveConnection: function () {
      try {
        return navigator.connection.effectiveType;
      } catch (ex) {
        return "4g";
      }
    }
  },
  mounted() {
    // use client specific APIs in client-side hooks only

    if (window && 'IntersectionObserver' in window && this.loading === "lazy") {
      var connectionType = this.getEffectiveConnection();
      // Values based on native lazy loading in Chrome - https://web.dev/native-lazy-loading/#improved-data-savings-and-distance-from-viewport-thresholds
      var rootMargin = "1250px";
      if (connectionType !== "4g") rootMargin = "2500px";
      this.observer = new IntersectionObserver(entries => {
        const image = entries[0];
        if (image && image.isIntersecting) {
          this.intersected = true;
          if (this.lqip) this.triggerOriginalImageLoad();
          this.observer.disconnect();
        }
      }, {
        rootMargin: `${rootMargin} 0px ${rootMargin} 0px`
      });
      this.observer.observe(this.$el);
    } else {
      // Load image right away
      if (this.lqip) this.triggerOriginalImageLoad();
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  computed: {
    srcImage: function () {
      /*
        No lazy loading no lqip
          src=originalImage

        No lazy loading lqip
          src=lqip
          src=originalImage (when loaded)

        lazy loading and no lqip
          src=''
          onIntersect:
            src=originalImage

        lazy loading and lqip
          src=lqip
          onInterserct:
            src=originalImage (when loaded)
      */
      if (this.loading !== "lazy" && this.lqip === null) {
        return this.imageAttrs.src;
      } else if (this.loading !== "lazy" && this.lqip && this.lqip.active) {
        if (this.originalSrcLoaded) {
          return this.imageAttrs.src;
        } else {
          return this.imageAttrs.lqipSrc;
        }
      } else if (this.loading === "lazy" && this.lqip === null) {
        if (this.intersected) {
          return this.imageAttrs.src;
        } else {
          return "";
        }
      } else if (this.loading === "lazy" && this.lqip && this.lqip.active) {
        if (this.intersected && this.originalSrcLoaded) {
          return this.imageAttrs.src;
        } else {
          return this.imageAttrs.lqipSrc;
        }
      }
      return this.imageAttrs.src;
    },
    imageAttrs: function () {
      const mergedOptions = this.getMergedOptions();
      const IkClient = this.getClient();
      var options = {
        urlEndpoint: this.urlEndpoint ? this.urlEndpoint : mergedOptions.urlEndpoint,
        src: this.src,
        path: this.path,
        transformation: this.transformation,
        transformationPosition: this.transformationPosition,
        queryParameters: this.queryParameters
      };
      let result = {};

      result.src = IkClient.url(options);

      if (this.lqip && this.lqip.active) {
        var quality = parseInt((this.lqip.quality || this.lqip.threshold), 10) || 20;
        var blur = parseInt((this.lqip.blur || this.lqip.blur), 10) || 6;
        var transformation = options.transformation || [];
        transformation.push({
          quality,
          blur
        })
        result.lqipSrc = IkClient.url({
          ...options,
          transformation
        })
      }

      return result;
    }
  }
});
</script>
