import IKContext from "./components/IKContext.vue";
import IKImage from "./components/IKImage.vue";
import IKUpload from "./components/IKUpload.vue";
import Intersect from "./components/Intersect.vue";
import ImageKit from '@imagekit/imagekit-javascript';
import pkg from "../package.json";

const componentMapping = {
  "ik-context": IKContext,
  "ik-image": IKImage,
  "ik-upload": IKUpload,
  "intersect": Intersect
};

export function install(Vue, options) {
  if (Vue.IkInstalled) {
    throw new Error("Imagekit plugin already installed");
  }

  options.defaultOptions = {
    sdkVersion: `vuejs-${pkg.version}`,
    publicKey: options.publicKey,
    urlEndpoint: options.urlEndpoint,
    authenticationEndpoint: options.authenticationEndpoint
  };

  options.IkClient = new ImageKit(options.defaultOptions)

  Vue.IkInstalled = true;

  initComponents(Vue, options);
}

function initComponents(Vue, options) {
  for (var i = 0; i < options.components.length; i++) {
    let componentName = options.components[i];
    const component = componentMapping[componentName];
    if (component) {
      Vue.component(componentName, {
        ...component,
        data() {
          return {
            ...(component.data ? component.data() : {}),
            IkClient: options.IkClient,
            defaultOptions : options.defaultOptions
          }
        }
      })
    }
  }
}
