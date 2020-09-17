import IKContext from "./components/IKContext.vue";
import IKImage from "./components/IKImage.vue";
import IKUpload from "./components/IKUpload.vue";
import Intersect from "./components/Intersect.vue";

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

  Vue.IkInstalled = true;

  initComponents(Vue, options);
}

function registerComponents(Vue, components = {}, defaultConfigurations = {}) {
  if (!components) { throw new Error("No component found. ") }

  for (let key in components) {
    const component = components[key];

    if (component) {
      Vue.component(key, {
        ...component,
        data() {
          return {
            ...(component.data ? component.data() : {}),
            defaultConfigurations
          }
        }

      })
    }
  }
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
            defaultConfiguration : {
              publicKey: options.publicKey,
              urlEndpoint: options.urlEndpoint,
              authenticationEndpoint: options.authenticationEndpoint,
            }
          }
        }
      })
    }
  }
}
