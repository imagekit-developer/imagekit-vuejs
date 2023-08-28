<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ik-context',
  props: {
    publicKey: {
      type: String,
      required: true
    },
    urlEndpoint: {
      type: String,
      required: true
    },
  },
  setup(props, { slots }) {
    const contextConfigurations = ref({
      publicKey: props.publicKey,
      urlEndpoint: props.urlEndpoint
    });

    return {
      contextConfigurations,
      slots
    };
  },
  render() {
    return this.$slots.default && this.$slots.default();
  }
});
</script>