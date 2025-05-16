import type { GetImageAttributesOptions, ResponsiveImageAttributes, SrcOptions, Transformation, UploadOptions, UploadResponse } from '@imagekit/javascript';
import { buildSrc, buildTransformationString, getResponsiveImageAttributes, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from '@imagekit/javascript';
import Image from './components/Image.vue';
import Video from './components/Video.vue';
import ImageKitProvider from './provider/ImageKitProvider.vue';
import { ImageKitContextKey } from './provider/keys';

import type { IKImageProps, IKVideoProps, ImageKitProviderProps } from './interface';

export { buildSrc, buildTransformationString, getResponsiveImageAttributes, Image, ImageKitAbortError, ImageKitContextKey, ImageKitInvalidRequestError, ImageKitProvider, ImageKitServerError, ImageKitUploadNetworkError, upload, Video };

export type {
    GetImageAttributesOptions, IKImageProps, IKVideoProps,
    // Vue 3 specific
    ImageKitProviderProps, ResponsiveImageAttributes,
    // JS SDK types
    SrcOptions,
    Transformation,
    UploadOptions,
    UploadResponse
};