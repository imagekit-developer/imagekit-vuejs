<script>
import { defineComponent, ref, provide, onBeforeMount } from 'vue';

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
    authenticator: {
      type: Function
    }
  },
  setup(props, { slots }) {
    const contextConfigurations = ref({
      publicKey: props.publicKey,
      urlEndpoint: props.urlEndpoint,
      authenticator: props.authenticator
    });

    onBeforeMount(() => {
      provide('contextConfigurations', contextConfigurations);
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