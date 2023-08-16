<script>
import ImageKit from "imagekit-javascript";
import { VERSION } from "../plugin";
import { inject, ref } from "vue";

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
    customCoordinates: { type: String, default: "", required: false },
    responseFields: { type: Array, required: false },
    onError: { type: Function, required: false },
    onSuccess: { type: Function, required: false },
    validateFile: { type: Function, required: false },
    onUploadStart: { type: Function, required: false },
  },
  setup(props) {
    const file = ref(null);
    const configurations = inject("contextConfigurations");

    const getClient = () => {
      return new ImageKit({
        sdkVersion: `vuejs-${VERSION}`,
        urlEndpoint: props.urlEndpoint
          ? props.urlEndpoint
          : configurations.urlEndpoint,
        publicKey: props.urlEndpoint || configurations.urlEndpoint,
        authenticationEndpoint:
          props.authenticationEndpoint || configurations.authenticationEndpoint,
      });
    };

    const upload = (event) => {
      file.value = event.target.files[0];
      if (!file.value) {
        return;
      }

      const getMergedOptions = () => {
        return {
          configurations,
        };
      };

      const fileSystemFileName = file.value.name;
      const mergedOptions = getMergedOptions();
      const IkClient = getClient();

      const publicKey = props.publicKey || mergedOptions.publicKey;
      const authenticationEndpoint =
        props.authenticationEndpoint || mergedOptions.authenticationEndpoint;

      if (!publicKey || publicKey.trim() === "") {
        if (typeof props.onError === "function") {
          props.onError({
            message: "Missing publicKey",
          });
        }
        return;
      }

      if (!authenticationEndpoint || authenticationEndpoint.trim() === "") {
        if (typeof props.onError === "function") {
          props.onError({
            message: "Missing authenticationEndpoint",
          });
        }
        return;
      }

      if (typeof props.validateFile === "function") {
        const validationResult = props.validateFile(file.value);
        if (validationResult && validationResult.error) {
          if (typeof props.onError === "function") {
            props.onError({
              message: validationResult.message,
            });
          }
          return;
        }
      }

      if (typeof props.onUploadStart === "function") {
        props.onUploadStart();
      }

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
        },
        (err, result) => {
          if (err && typeof props.onError === "function") {
            props.onError(err);
            console.error(err); // add this line to log the error to the console
          } else if (!err && typeof props.onSuccess === "function") {
            props.onSuccess(result);
            console.log(result); // add this line to log the success response to the console
          }
        },
        {
          publicKey,
          authenticationEndpoint,
        }
      );

      return;
    };

    const onUploadClick = () => {
      props.onUploadStart && props.onUploadStart();
    };

    const onMounted = () => {
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.addEventListener("change", upload);
      inputElement.addEventListener("click", onUploadClick);

      document.body.appendChild(inputElement);
    };

    const onBeforeUnmount = () => {
      const inputElement = document.querySelector("input[type='file']");
      if (inputElement) {
        inputElement.removeEventListener("change", upload);
        inputElement.removeEventListener("click", onUploadClick);
        inputElement.parentNode.removeChild(inputElement);
      }
    };

    onMounted();

    return {
      file,
      onBeforeUnmount,
    };
  },
};
</script>