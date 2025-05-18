<script setup lang="ts">
import { provide, reactive } from "vue";
import type { ImageKitProviderProps } from "../interface";
import { ImageKitContextKey } from "./keys";


const props = defineProps<ImageKitProviderProps>();

/* reactive() lets descendants pick up runtime changes */
provide(ImageKitContextKey, reactive(props));
</script>

<template>
  <!-- Render children as-is -->
  <slot />
</template>
