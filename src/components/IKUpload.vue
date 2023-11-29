<template>
  <div>
    <input type="file" @change="upload" />
  </div>
</template>

<script>
import ImageKit from "imagekit-javascript";
import { VERSION } from "../plugin";
import { inject, ref } from "vue";

export default {
  name: "ik-upload",
  props: {
    urlEndpoint: { type: String, default: "", required: false },
    publicKey: { type: String, default: "", required: false },
    authenticator: { type: Function, required: true },
    fileName: { type: String, default: "", required: false },
    useUniqueFileName: { type: Boolean, default: true, required: false },
    tags: { type: Array, required: false },
    folder: { type: String, default: "/", required: false },
    isPrivateFile: { type: Boolean, default: false, required: false },
    customCoordinates: { type: String, default: "", required: false },
    responseFields: { type: Array, required: false },
    extensions: { type: Array, required: false },
    webhookUrl: { type: String, required: false },
    overwriteFile: { type: Boolean, default: true, required: false },
    overwriteAITags: { type: Boolean, default: true, required: false },
    overwriteTags: { type: Boolean, default: true, required: false },
    overwriteCustomMetadata: { type: Boolean, default: true, required: false },
    customMetadata: { type: Object, required: false },
    onError: { type: Function, required: false },
    onSuccess: { type: Function, required: false },
    validateFile: { type: Function, required: false },
    onUploadStart: { type: Function, required: false },
    onUploadProgress: { type: Function, required: false }
  },
  setup(props) {
    const xhrRef = ref(null);
    const file = ref(null);
    const contextConfigurations = inject("contextConfigurations");

    const getClient = () => {
      return new ImageKit({
        sdkVersion: `vuejs-${VERSION}`,
        urlEndpoint: props.urlEndpoint
          ? props.urlEndpoint
          : contextConfigurations.value.urlEndpoint,
        publicKey: props.publicKey || contextConfigurations.value.publicKey,
      });
    };

    const upload = (event) => {
      file.value = event.target.files[0];
      if (!file.value) {
        return;
      }

      const getMergedOptions = () => {
        return {
          ...contextConfigurations.value,
        };
      };

      const fileSystemFileName = file.value.name;
      const mergedOptions = getMergedOptions();
      const IkClient = getClient();

      const publicKey = props.publicKey || mergedOptions.publicKey;
      const authenticator = props.authenticator || mergedOptions.authenticator;

      if (!publicKey || publicKey.trim() === "") {
        if (typeof props.onError === "function") {
          props.onError({
            message: "Missing publicKey",
          });
        }
        return;
      }

      if (!authenticator) {
        if (props.onError && typeof props.onError === "function") {
          props.onError({
            message: "The authenticator function is not provided."
          });
        }
        return;
      }

      if (typeof authenticator !== 'function') {
        if (props.onError && typeof props.onError === "function") {
          props.onError({
            message: "The provided authenticator is not a function."
          })
        }
        return;
      }

      if (authenticator.length !== 0) {
        if (props.onError && typeof props.onError === "function") {
          props.onError({
            message: "The authenticator function should not accept any parameters. Please provide a parameterless function reference."
          })
        }
        return;
      }

      if (typeof props.validateFile === "function" && !props.validateFile(file.value)) {
        return;
      }

      if (typeof props.onUploadStart === "function") {
        props.onUploadStart();
      }

      const xhr = new XMLHttpRequest();
      xhrRef.value = xhr; // Store the XMLHttpRequest reference

      const progressCb = (e) => {
        if (props.onUploadProgress && typeof props.onUploadProgress === 'function') {
          props.onUploadProgress(e);
        }
      };

      xhr.upload.addEventListener('progress', progressCb);

      const authPromise = authenticator();

      if (!(authPromise instanceof Promise)) {
        if (props.onError && typeof props.onError === "function") {
          props.onError({
            message: "The authenticator function is expected to return a Promise instance."
          });
        }
        return;
      }

      authPromise
        .then(({ signature, token, expire }) => {
          IkClient.upload(
            {
              file: file.value,
              fileName: props.fileName || fileSystemFileName,
              useUniqueFileName: props.useUniqueFileName,
              tags: props.tags,
              folder: props.folder,
              isPrivateFile: props.isPrivateFile,
              customCoordinates: props.customCoordinates,
              responseFields: props.responseFields,
              extensions: props.extensions,
              webhookUrl: props.webhookUrl,
              overwriteFile: props.overwriteFile,
              overwriteAITags: props.overwriteAITags,
              overwriteTags: props.overwriteTags,
              overwriteCustomMetadata: props.overwriteCustomMetadata,
              customMetadata: props.customMetadata,
              signature,
              token,
              expire,
              xhr
            },
            (err, result) => {
              if (err && typeof props.onError === "function") {
                props.onError(err);
                console.error(err); // add this line to log the error to the console
              } else if (!err && typeof props.onSuccess === "function") {
                props.onSuccess(result);
                console.log(result); // add this line to log the success response to the console
              }
              xhr.upload.removeEventListener('progress', progressCb);
            },
            {
              publicKey,
            }
          );
        })
        .catch((data) => {
          var error;
          if (data instanceof Array) {
            error = data[0];
          }
          else {
            error = data
          }

          if (props.onError && typeof props.onError === "function") {
            props.onError({
              message: String(error)
            });
          }
          return;
        })
      return;
    };

    const abortUpload = () => {
      if (xhrRef.value && xhrRef.value.readyState !== 4) {
        xhrRef.value.abort(); // Abort the ongoing upload
        xhrRef.value = null; // Reset the XMLHttpRequest reference
      }
    };


    return {
      file,
      upload,
      abortUpload
    };
  },
  methods:{
    triggerAbortUpload() {
      this.abortUpload();
    },
  }
};
</script>