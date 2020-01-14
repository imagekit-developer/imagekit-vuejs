import * as plugin from "./plugin";
import IKContext from "./components/IKContext.vue";
import IKImage from "./components/IKImage.vue";
import IKUpload from "./components/IKUpload.vue";
import Intersect from "./components/Intersect.vue";
const ImageKit = {
  install: (Vue, options = {}) => {
    plugin.install(Vue, options.components ? options: {...options, components: {IKContext, IKImage, IKUpload, Intersect}})
  }
};

export {
  ImageKit as default,
  ImageKit,
  IKContext, IKImage, IKUpload, Intersect
};
