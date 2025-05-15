<script setup lang="ts">
import { computed } from 'vue'

// minimal props: src (required) and alt (optional)
const props = defineProps<{ 
    /**
     * JS doc for src
     */
   src: string;
   alt?: string 
  }>()

/* Example computed—replace with ImageKit logic later */
const finalSrc = computed(() =>
  props.src.startsWith('http')
    ? props.src
    : `https://example.cdn.com${props.src}`
)
</script>

<template>
  <img :src="finalSrc" :alt="alt" style="max-width: 100%; display: block;" />
</template>
