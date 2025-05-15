import Image from './components/Image.vue'
import ImageKitProvider from './provider/ImageKitProvider.vue'
import type { SrcOptions, Transformation, UploadOptions, UploadResponse, GetImageAttributesOptions, ResponsiveImageAttributes } from '@imagekit/javascript';

import type { ImageKitProviderProps, IKImageProps } from './interface'
export { Image, ImageKitProvider }

export type {
    SrcOptions,
    Transformation,
    UploadOptions,
    UploadResponse,
    GetImageAttributesOptions,
    ResponsiveImageAttributes,

    ImageKitProviderProps, IKImageProps
}