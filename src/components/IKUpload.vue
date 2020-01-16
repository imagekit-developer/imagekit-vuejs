<template>
  <input type="file" ref="imageFile" @change="upload"/>
</template>

<script>
import { uploadImage } from "../helpers/upload";
export default {
  name: "IKUpload",
  inject: {configurations: {default:""}},
  props: {
    fileName: { type: String, default: "", required: false },
    useUniqueFileName: {type: Boolean, default:true, required:false},
    tags:{type:Array,required:false},
    folder:{ type: String, default: "/", required: false },
    isPrivateFile: {type: Boolean, default:false, required:false},
    customCoordinates: { type: String, default: "", required: false },
    responseFields: { type: Array, required: false }
  },
  data() {
    return {
      file: {}
    };
  },
  methods: {
    upload() {
      const file = this.$refs.imageFile.files[0];
      let useUniqueFileName = this.useUniqueFileName;
      let isPrivateFile = this.isPrivateFile;

      if(useUniqueFileName === true) useUniqueFileName = "true"
      if(useUniqueFileName === false) useUniqueFileName = "false"
      if(isPrivateFile === true) isPrivateFile = "true"
      if(isPrivateFile === false) isPrivateFile = "false"

      uploadImage({
        e: this.$refs.imageFile,
        file: file,
        fileName: this.fileName,
        useUniqueFileName: useUniqueFileName,
        tags: this.tags,
        folder: this.folder,
        isPrivateFile: isPrivateFile,
        customCoordinates: this.customCoordinates,
        responseFields: this.responseFields,
        publicKey: this.configurations.publicKey,
        urlEndpoint: this.configurations.urlEndpoint,
        authenticationEndpoint: this.configurations.authenticationEndpoint
      });

      return;
    }
  }
};
</script>
