<template>
  <input type="file" ref="imageFile" @change="upload($event)" @click="$emit('onUploadStart')"/>
</template>

<script>
import ImageKit from "imagekit-javascript";
import { VERSION } from "../plugin";
import {inject, ref} from 'vue'

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
    onUploadStart: { type: Function, required: false }
  },
  // emits: ['onUploadStart'],
  setup(props) {
    const file = ref('')
    const configurations = inject('contextConfigurations');
    const upload = (event) => {
      console.log(event,"---upload")
      file.value = event.target.files[0];
      
      if (!file.value) {
        return;
      }

      // this.$emit('onUploadStart', event)
      // if (this.onUploadStart && typeof this.onUploadStart === "function") {
      // this.onUploadStart(event);
      // } 
      
      // if(this.validateFile && !this.validateFile(file)) {
      //   return
      // }

      const fileSystemFileName = file.value.name;

      const mergedOptions = getMergedOptions();
      const IkClient = getClient();

      const publicKey = props.publicKey || mergedOptions.publicKey;
      const authenticationEndpoint = props.authenticationEndpoint || mergedOptions.authenticationEndpoint;

      if(!publicKey || publicKey.trim() === "") {
        if(typeof props.onError === "function"){
          props.onError({
            message: "Missing publicKey"
          });
        }
        return;
      }

      if(!authenticationEndpoint || authenticationEndpoint.trim() === "") {
        if(typeof props.onError === "function"){
          props.onError({
            message: "Missing authenticationEndpoint"
          });
        }
        return;
      }

      IkClient.upload(
        {
          file: file,
          fileName: props.fileName || fileSystemFileName,
          useUniqueFileName: props.useUniqueFileName,
          tags: props.tags,
          folder: props.folder,
          isPrivateFile: props.isPrivateFile,
          customCoordinates: props.customCoordinates,
          responseFields: props.responseFields
        },
        (err, result) => {
          if (err && typeof props.onError === "function") {
            props.onError(err);
          } else if (!err && typeof props.onSuccess === "function") {
            props.onSuccess(result);
          }
        },
        {
          publicKey,
          authenticationEndpoint
        }
      );

      return;
    }
    const getMergedOptions = () => {
      return {
       configurations
      };
    }

    const getClient= () => {
      return new ImageKit({
        sdkVersion: `vuejs-${VERSION}`,
        urlEndpoint: props.urlEndpoint
          ? props.urlEndpoint
          : configurations.urlEndpoint,
        publicKey: props.urlEndpoint || configurations.urlEndpoint,
        authenticationEndpoint:
        props.authenticationEndpoint ||
        configurations.authenticationEndpoint
      });
    }

    return {
      upload
    }
  },
  data() {
    return {
      file: {}
    };
  },
  methods: {
    // getMergedOptions: function() {
    //   return {
    //     ...this.defaultOptions,
    //     ...this.contextConfigurations
    //   };
    // },
    // getClient: function() {
    //   return new ImageKit({
    //     sdkVersion: `vuejs-${VERSION}`,
    //     urlEndpoint: this.urlEndpoint
    //       ? this.urlEndpoint
    //       : this.contextConfigurations.urlEndpoint,
    //     publicKey: this.urlEndpoint || this.contextConfigurations.urlEndpoint,
    //     authenticationEndpoint:
    //       this.authenticationEndpoint ||
    //       this.contextConfigurations.authenticationEndpoint
    //   });
    // },
    // upload(event) {
    //   const file = this.$refs.imageFile.files[0];
    //   console.log(this.$refs.imageFile,"---upload")
    //   if (!file) {
    //     return;
    //   }

    //   this.$emit('onUploadStart', event)
    //   if (this.onUploadStart && typeof this.onUploadStart === "function") {
    //   this.onUploadStart(event);
    //   } 
      
    //   if(this.validateFile && !this.validateFile(file)) {
    //     return
    //   }

    //   const fileSystemFileName = file.name;

    //   const mergedOptions = this.getMergedOptions();
    //   const IkClient = this.IkClient || this.getClient();

    //   const publicKey = this.publicKey || mergedOptions.publicKey;
    //   const authenticationEndpoint = this.authenticationEndpoint || mergedOptions.authenticationEndpoint;

    //   if(!publicKey || publicKey.trim() === "") {
    //     if(typeof this.onError === "function"){
    //       this.onError({
    //         message: "Missing publicKey"
    //       });
    //     }
    //     return;
    //   }

    //   if(!authenticationEndpoint || authenticationEndpoint.trim() === "") {
    //     if(typeof this.onError === "function"){
    //       this.onError({
    //         message: "Missing authenticationEndpoint"
    //       });
    //     }
    //     return;
    //   }

    //   IkClient.upload(
    //     {
    //       file: file,
    //       fileName: this.fileName || fileSystemFileName,
    //       useUniqueFileName: this.useUniqueFileName,
    //       tags: this.tags,
    //       folder: this.folder,
    //       isPrivateFile: this.isPrivateFile,
    //       customCoordinates: this.customCoordinates,
    //       responseFields: this.responseFields
    //     },
    //     (err, result) => {
    //       if (err && typeof this.onError === "function") {
    //         this.onError(err);
    //       } else if (!err && typeof this.onSuccess === "function") {
    //         this.onSuccess(result);
    //       }
    //     },
    //     {
    //       publicKey,
    //       authenticationEndpoint
    //     }
    //   );

    //   return;
    // }
  }
};
</script>
