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
    slots: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const contextConfigurations = ref({
      publicKey: props.publicKey,
      urlEndpoint: props.urlEndpoint
    });

    return {
      contextConfigurations
    };
  },
  render() {
    return this.slots.default ? this.slots.default() : null;
  }
});
</script>

<!-- In this code, we've used the `Ref` method to make the `contextConfigurations` object reactive, and we've used a conditional statement to check if `this.slots.default` exists before  -->
