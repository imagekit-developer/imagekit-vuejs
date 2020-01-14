<script>
export default {
  name: "IKContext",

  inheritAttrs:false,

  provide() {
    const contextConfigurations = {}
    Object.assign(contextConfigurations, this.$attrs);
    return {configurations:contextConfigurations};
  },

  computed: {
    attributes() {
      return this.$attrs
    }
  },

   render(h) {
    return h(
      "div",
      {
        class: { "ik-context": true },
        attrs: this.attributes
      },
      this.$slots.default
    );
  }
};
</script>
