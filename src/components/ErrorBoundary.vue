<template>
  <div>
    <slot v-if="hasError">
      <!-- You can render any custom fallback UI here -->
      <h1>{{ error }}</h1>
    </slot>
    <slot v-else></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  },
  methods: {
    componentDidCatch(error, info) {
      // Display fallback UI
      this.hasError = true;
      this.error = error.toString();
      this.errorInfo = info;
    },
  },
});
</script>
