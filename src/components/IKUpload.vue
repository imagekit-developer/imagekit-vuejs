<template>
  <input type="file" ref="imageFile" @change="upload" />
</template>

<script>
import { uploadImage } from "../helpers/upload";
export default {
  name: "ik-upload",
  inject: { configurations: { default: {} } },
  props: {
    fileName: { type: String, default: "", required: false },
    useUniqueFileName: { type: Boolean, default: true, required: false },
    tags: { type: Array, required: false },
    folder: { type: String, default: "/", required: false },
    isPrivateFile: { type: Boolean, default: false, required: false },
    customCoordinates: { type: String, default: "", required: false },
    responseFields: { type: Array, required: false },
    onError: { type: Function, required: false },
    onSuccess: { type: Function, required: false }
  },
  data() {
    return {
      file: {}
    };
  },
  methods: {
    getConfiguration: function() {
      return {
        ...this.defaultConfiguration,
        ...this.configurations
      };
    },
    upload() {
      const file = this.$refs.imageFile.files[0];
      const fileSystemFileName = file.name;
      let useUniqueFileName = this.useUniqueFileName;
      let isPrivateFile = this.isPrivateFile;

      if (useUniqueFileName === true) useUniqueFileName = "true";
      if (useUniqueFileName === false) useUniqueFileName = "false";
      if (isPrivateFile === true) isPrivateFile = "true";
      if (isPrivateFile === false) isPrivateFile = "false";

      const configurations = this.getConfiguration();

      uploadImage({
        e: this.$refs.imageFile,
        file: file,
        fileName: this.fileName || fileSystemFileName,
        useUniqueFileName: useUniqueFileName,
        tags: this.tags,
        folder: this.folder,
        isPrivateFile: isPrivateFile,
        customCoordinates: this.customCoordinates,
        responseFields: this.responseFields,
        publicKey: configurations.publicKey,
        urlEndpoint: configurations.urlEndpoint,
        authenticationEndpoint: configurations.authenticationEndpoint,
        onError: this.onError,
        onSuccess: this.onSuccess
      });

      return;
    }
  }
};
</script>
