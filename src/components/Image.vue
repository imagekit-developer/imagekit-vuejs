<script setup lang="ts">
/**
 * This is image js doc
 */

// Import the defineProps function from Vue
import { buildSrc, getResponsiveImageAttributes } from "@imagekit/javascript";
import { computed, inject, useAttrs } from "vue";
import type { IKImageProps, ImageKitProviderProps } from '../interface';
import { ImageKitContextKey } from "../provider/keys";

defineOptions({ inheritAttrs: false });

const props = defineProps<IKImageProps>();
const context = inject<ImageKitProviderProps>(ImageKitContextKey, {});

/* ------------------------------------------------------------------ */
/* helper: prop values override ONLY when not undefined               */
/* ------------------------------------------------------------------ */
function mergeDefined<T extends Record<string, any>>(base: ImageKitProviderProps, override: IKImageProps): T {
  const out = { ...base } as Record<string, any>
  for (const [k, v] of Object.entries(override)) {
    if (v !== undefined) out[k] = v
  }
  return out as T
}

function getInt(x: unknown): number {
  if (typeof x === "number") return Number.isFinite(x) ? x : NaN;
  if (typeof x === "string" && /^[0-9]+$/.test(x)) return parseInt(x, 10);
  return NaN;
}

const merged = computed(() => {
  const m = mergeDefined(context, props)
  return m
})

const imgData = computed(() => {
  const {
    src = "",
    transformation = [],
    queryParameters,
    urlEndpoint,
    transformationPosition,
    sizes,
    responsive = true,
    deviceBreakpoints,
    imageBreakpoints,
    width,
    loading = "lazy"
  } = merged.value;

  if (!urlEndpoint || urlEndpoint.trim() === "") {
    console.error("urlEndpoint is neither provided in this component nor in any parent ImageKitProvider.");
    return { src, loading };
  }

  if (responsive === false) {
    const normalSrc = buildSrc({
      src,
      transformation: [...transformation],
      queryParameters,
      urlEndpoint,
      transformationPosition,
    });

    return { src: normalSrc, loading, width };
  }

  const widthInt = getInt(width);

  const { src: newSrc, srcSet } = getResponsiveImageAttributes({
    src,
    transformation: [...transformation],
    width: isNaN(widthInt) ? undefined : widthInt,
    sizes,
    queryParameters,
    urlEndpoint,
    transformationPosition,
    deviceBreakpoints,
    imageBreakpoints,
  });

  return { responsive, src: newSrc, loading, srcSet, sizes, width };
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
  "sizes",
  "responsive",
  "deviceBreakpoints",
  "imageBreakpoints",
  "srcSet",
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
  <img v-bind="nonIKAttrs" :width="width" :loading="imgData.loading"
    :sizes="imgData.responsive ? imgData.sizes : undefined" :srcset="imgData.responsive ? imgData.srcSet : undefined"
    :src="imgData.src" />
</template>