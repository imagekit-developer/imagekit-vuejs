<script setup lang="ts">
import { buildSrc } from "@imagekit/javascript";
import { computed, inject, useAttrs } from "vue";
import type { IKVideoProps, ImageKitProviderProps } from "../interface";
import { ImageKitContextKey } from "../provider/keys";

const props = defineProps<IKVideoProps>();
const context = inject<ImageKitProviderProps>(ImageKitContextKey, {});

function mergeDefined<T extends Record<string, any>>(base: ImageKitProviderProps, override: IKVideoProps): T {
  const out = { ...base } as Record<string, any>;
  for (const [k, v] of Object.entries(override)) {
    if (v !== undefined) out[k] = v;
  }
  return out as T;
}

const merged = computed(() => mergeDefined(context, props));

const videoData = computed(() => {
  const {
    src = "",
    transformation = [],
    queryParameters,
    urlEndpoint,
    transformationPosition,
  } = merged.value;

  if (!urlEndpoint || urlEndpoint.trim() === "") {
    console.error("urlEndpoint is neither provided in this component nor in any parent ImageKitProvider.");
    return { src };
  }

  const finalSrc = buildSrc({
    urlEndpoint,
    src,
    transformation: [...transformation],
    queryParameters,
    transformationPosition,
  });

  return { src: finalSrc };
});

/* ------------------------------------------------------------------ */
/* forward non-ImageKit attrs                                         */
/* ------------------------------------------------------------------ */

const IK_KEYS = [
  "src",
  "transformation",
  "queryParameters",
  "urlEndpoint",
  "transformationPosition",
] as const;

const attrs = useAttrs();
const nonIKAttrs = computed(() => {
  const obj: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(attrs)) {
    if (!IK_KEYS.includes(k as (typeof IK_KEYS)[number])) obj[k] = v;
  }
  return obj;
});
</script>

<template>
  <video v-bind="nonIKAttrs" :src="videoData.src" />
</template>
