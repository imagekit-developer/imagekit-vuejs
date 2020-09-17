<script>
export default {
  name: "ik-context",

  inheritAttrs:false,

  provide() {
    const contextConfigurations = {}
    Object.assign(contextConfigurations, this.$attrs);
    return {configurations:contextConfigurations};
  },
  render() {
    return this.$scopedSlots.default()
  },
};
</script>
