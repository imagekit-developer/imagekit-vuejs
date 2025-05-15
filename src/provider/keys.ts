import type { InjectionKey } from "vue";
import type { ImageKitProviderProps } from "../interface";

/** Use the same key everywhere */
export const ImageKitContextKey: InjectionKey<ImageKitProviderProps> =
  Symbol("ImageKitContext");