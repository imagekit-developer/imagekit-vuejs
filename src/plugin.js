import { defineComponent } from 'vue';
import IKImage from "./components/IKImage.vue";
import IKContext from "./components/IKImage.vue";
import IKVideo from "./components/IKVideo"
import IKUpload from "./components/IKUpload"
import ImageKit from 'imagekit-javascript';
export const VERSION = "1.0.9";

const componentMapping = {
  "ik-image": IKImage,
  "ik-context": IKContext,
  "ik-video": IKVideo,
  "ik-upload": IKUpload,
};

export function install(Vue, options) {
  if (Vue.IkInstalled) {
    throw new Error("Imagekit plugin already installed");
  }

  options.defaultOptions = {
    sdkVersion: `vuejs-${VERSION}`,
    publicKey: options.publicKey,
    urlEndpoint: options.urlEndpoint,
    // authenticationEndpoint: options.authenticationEndpoint
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
      defineComponent({
        ...component,
        setup() {
          return {
            ...(component.setup ? component.setup() : {}),
            IkClient: options.IkClient,
            defaultOptions: options.defaultOptions
          }
        }
      })
    }
  }
}
