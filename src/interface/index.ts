import type { GetImageAttributesOptions, SrcOptions } from '@imagekit/javascript';

export type IKImageProps = Pick<GetImageAttributesOptions, "deviceBreakpoints" | "imageBreakpoints"> & CommonProps & {
    /**
     * Set to `false` to disable automatic responsive `srcSet` generation.
     * Defaults to `true`.
     */
    responsive?: Boolean;

    /**
     * The intended display width of the image.
     *
     * - Accepts a number (e.g. `100`) or a numeric string (e.g. `"100"`).
     * - If you pass units such as `"100px"` or a percentage like `"100%"`, the value
     *   is ignored when generating the `srcSet`. In that case, a broad range of
     *   widths is produced to cover all possible viewport sizes.
     */
    width?: number | `${number}`;

    /**
     * Define the sizes of the image at different breakpoints. Used by the browser to choose the most appropriate size from the generated srcset.
     */
    sizes?: string;

    /**
     * Controls when the image should start loading.
     * 
     * * `lazy` -  Defer loading the image until it reaches a calculated distance from the viewport.
     * * `eager` - Load the image immediately, regardless of its position in the page.
     * 
     * `lazy` is the default value.
     */
    loading?: "lazy" | "eager";
}

type CommonProps = {
    /**
     * Accepts a relative or absolute path of the resource. If a relative path is provided, it is appended to the `urlEndpoint`.
     * If an absolute path is provided, `urlEndpoint` is ignored.
    */
    src: SrcOptions["src"];

    /**
     * Get your urlEndpoint from the [ImageKit dashboard](https://imagekit.io/dashboard/url-endpoints).
     * 
     * You can also set `urlEndpoint` in the `ImageKitProvider` component, which will be used as a default value for all nested Image and Video components provided by the SDK.
     * 
     * @example
     * ```jsx
     * import { ImageKitProvider, Image, Video } from "@imagekit/vue";
     * <ImageKitProvider urlEndpoint="https://ik.imagekit.io/your_imagekit_id">
     *   <Video src="/video.mp4" />
     *   <Image src="/default-image.jpg" />
     * </ImageKitProvider>
     * ```
     */
    urlEndpoint?: SrcOptions["urlEndpoint"];

    /**
     * These are additional query parameters that you want to add to the final URL.
     * They can be any query parameters and not necessarily related to ImageKit.
     * This is especially useful if you want to add a versioning parameter to your URLs.
     */
    queryParameters?: SrcOptions["queryParameters"]

    /**
     * An array of objects specifying the transformations to be applied in the URL. If more than one transformation is specified, they are applied in the order they are specified as chained transformations.
     *
     * {@link https://imagekit.io/docs/transformations#chained-transformations}
     */
    transformation?: SrcOptions["transformation"];

    /**
     * By default, the transformation string is added as a `query` parameter in the URL, e.g., `?tr=w-100,h-100`.
     * If you want to add the transformation string in the path of the URL, set this to `path`, final URL will look like `https://ik.imagekit.io/your_imagekit_id/tr:w-100,h-100/default-image.jpg`.
     */
    transformationPosition?: "path" | "query";
}

export type IKVideoProps = CommonProps;

export type ImageKitProviderProps = Pick<IKImageProps, "urlEndpoint" | "transformationPosition">
