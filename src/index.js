import * as plugin from "./plugin";
import IKContext from "./components/IKContext.vue";
import IKImage from "./components/IKImage.vue";
import IKUpload from "./components/IKUpload.vue";
import IKVideo from "./components/IKVideo.vue";
import { ImageKit as IKCore } from "imagekit-javascript";

const ImageKit = {
  install: (Vue, options = {}) => {
    if (!options.urlEndpoint || options.urlEndpoint.trim() === "") {
      throw new Error("urlEndpoint is required to initilize ImageKit");
    }

    if (!options.components || options.components.length === 0) {
      options.components = ["ik-image", "ik-context", "ik-upload", "ik-video"];
    }

    plugin.install(Vue, options);
  }
};

export {
  ImageKit as default,
  ImageKit,
  IKContext,
  IKImage,
  IKUpload,
  IKCore,
  IKVideo,
};
