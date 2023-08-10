<template>
    <video class="ik-video" controls :src="srcVideo" />
</template>

<script>
  import ImageKit from 'imagekit-javascript';
  import { VERSION } from "../plugin";
  
  export default {
    name: "ik-video",
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
      path: { type: String, default: "", required: false },
      src: { type: String, default: "", required: false },
      transformation: { type: Array, required: false },
      transformationPosition: { type: String, required: false },
      queryParameters: { type: Object, required: false },
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
          sdkVersion: `vuejs-${VERSION}`,
          urlEndpoint: this.urlEndpoint ? this.urlEndpoint : this.contextConfigurations.urlEndpoint
        })
      },
      
      getEffectiveConnection: function() {
        try {
          return navigator.connection.effectiveType;
        } catch(ex) {
          return "4g";
        }
      }
    },
    mounted() {
      // use client specific APIs in client-side hooks only
    },
    beforeUnmount() {
      if(this.observer) { 
        this.observer.disconnect();
      }
    },
    computed: {
      srcVideo: function() {
        return this.videoAttrs.src;
      },
      videoAttrs: function() {
        const mergedOptions = this.getMergedOptions();
        const IkClient = this.IkClient || this.getClient();
  
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
        return result;
      }
    }
  };
  </script>
  