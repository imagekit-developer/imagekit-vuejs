<template>
  <input type="file" ref="imageFile" @change="upload" />
</template>

<script>
import ImageKit from "imagekit-javascript";
import { VERSION } from "../plugin";

export default {
  name: "ik-upload",
  inject: { contextConfigurations: { default: {} } },
  props: {
    urlEndpoint: { type: String, default: "", required: false },
    publicKey: { type: String, default: "", required: false },
    authenticationEndpoint: { type: String, default: "", required: false },
    fileName: { type: String, default: "", required: false },
    useUniqueFileName: { type: Boolean, default: true, required: false },
    tags: { type: Array, required: false },
    folder: { type: String, default: "/", required: false },
    isPrivateFile: { type: Boolean, default: false, required: false },
    customCoordinates: { type: String, default:"", required: false },
    responseFields: { type: Array, required: false },
    onError: { type: Function, required: false },
    onSuccess: { type: Function, required: false },
    validateFile: { type: Function, required: false },
    // onUploadStart: { type: Function, required: false }
  },
  data() {
    return {
      file: {}
    };
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
        urlEndpoint: this.urlEndpoint
          ? this.urlEndpoint
          : this.contextConfigurations.urlEndpoint,
        publicKey: this.urlEndpoint || this.contextConfigurations.urlEndpoint,
        authenticationEndpoint:
          this.authenticationEndpoint ||
          this.contextConfigurations.authenticationEndpoint
      });
    },
    upload() {
      const file = this.$refs.imageFile.files[0];
      console.log(this.validateFile && !this.validateFile(file),"----upload")
      if (!file) {
        return;
      }
      if(this.validateFile && !this.validateFile(file)) {
        return
      }
      const fileSystemFileName = file.name;

      const mergedOptions = this.getMergedOptions();
      const IkClient = this.IkClient || this.getClient();

      const publicKey = this.publicKey || mergedOptions.publicKey;
      const authenticationEndpoint = this.authenticationEndpoint || mergedOptions.authenticationEndpoint;

      if(!publicKey || publicKey.trim() === "") {
        if(typeof this.onError === "function"){
          this.onError({
            message: "Missing publicKey"
          });
        }
        return;
      }

      if(!authenticationEndpoint || authenticationEndpoint.trim() === "") {
        if(typeof this.onError === "function"){
          this.onError({
            message: "Missing authenticationEndpoint"
          });
        }
        return;
      }

      IkClient.upload(
        {
          file: file,
          fileName: this.fileName || fileSystemFileName,
          useUniqueFileName: this.useUniqueFileName,
          tags: this.tags,
          folder: this.folder,
          isPrivateFile: this.isPrivateFile,
          customCoordinates: this.customCoordinates,
          responseFields: this.responseFields
        },
        (err, result) => {
          if (err && typeof this.onError === "function") {
            this.onError(err);
          } else if (!err && typeof this.onSuccess === "function") {
            this.onSuccess(result);
          }
        },
        {
          publicKey,
          authenticationEndpoint
        }
      );

      return;
    }
  }
};
</script>
