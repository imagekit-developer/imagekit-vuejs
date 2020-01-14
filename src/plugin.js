export function install(Vue, options = {}) {
  if(Vue.IkInstalled) {
    throw new Error("Imagekit plugin already installed");
  }

  Vue.IkInstalled = true;

  initComponents(Vue, options);
}

function registerComponents( Vue, components = {}, defaultConfigurations = {}) {
  if( !components) { throw new Error("No component found. ") }

  for ( let key in component ) {
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

function initComponents(Vue) {
  const components = Array.isArray(options.components) ? options.components.reduce((obj, component) => ({
    ...obj,
    [component.name] : component
  }), {}) : options.components;

  registerComponents( Vue, components);
}
