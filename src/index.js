import * as plugin from "./plugin";
import IKImage from "./components/IKImage.vue";
import IKContext from "./components/IKContext.vue";
import IKVideo from "./components/IKVideo"
import IKUpload from "./components/IKUpload"
import { ImageKit as IKCore } from "imagekit-javascript";

const ImageKit = {
  install(app, options = {}) {
    if (!options.urlEndpoint || options.urlEndpoint.trim() === "") {
      throw new Error("urlEndpoint is required to initialize ImageKit");
    }

    if (!options.components || options.components.length === 0) {
      options.components = ["ik-image","ik-context","ik-video","ik-upload"];
    }

    plugin.install(app, options);
  }
};

export {
  ImageKit as default,
  ImageKit,
  IKImage,
  IKCore,
  IKContext,
  IKVideo,
  IKUpload
};
