[<img width="250" alt="ImageKit.io" src="https://raw.githubusercontent.com/imagekit-developer/imagekit-javascript/master/assets/imagekit-light-logo.svg"/>](https://imagekit.io)

# ImageKit.io Vue.js SDK

[![Node CI](https://github.com/imagekit-developer/imagekit-vuejs/workflows/Node%20CI/badge.svg)](https://github.com/imagekit-developer/imagekit-vuejs/)
[![npm version](https://img.shields.io/npm/v/imagekitio-vue)](https://www.npmjs.com/package/imagekitio-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter Follow](https://img.shields.io/twitter/follow/imagekitio?label=Follow&style=social)](https://twitter.com/ImagekitIo)

ImageKit Vue.js SDK allows you to use real-time [image resizing](https://docs.imagekit.io/features/image-transformations), [optimization](https://docs.imagekit.io/features/image-optimization), and [file uploading](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload) in client-side.

## Changelog - SDK Version 2.0.0
### Breaking changes
**1. Authentication Process Update:**
* Previously, when using this SDK, we had to pass `authenticationEndpoint` which is used by SDK internally for fetching security parameters i.e `signature`, `token`, and `expire`.
* In version 2.0.0, we have deprecated the use of the `authenticationEndpoint` parameter. Instead, the SDK now introduces a new parameter named `authenticator`. This parameter expects an asynchronous function that resolves with an object containing the necessary security parameters i.e `signature`, `token`, and `expire`.

Example implementation for `authenticator` using `Fetch API`.

``` javascript
const authenticator = () => {
    return new Promise((resolve, reject) => {
      var url = "server_endpoint"; // Use the full URL with the protocol

      // Make the Fetch API request
      fetch(url, { method: "GET", mode: "cors" }) // Enable CORS mode
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((body) => {
          var obj = {
            signature: body.signature,
            expire: body.expire,
            token: body.token,
          };
          resolve(obj);
        })
        .catch((error) => {
          reject([error]);
        });
    });
```

*Note*: Avoid generating security parameters on the client side. Always send a request to your backend to retrieve security parameters, as the generation of these parameters necessitates the use of your Imagekit `privateKey`, which must not be included in client-side code.

                          
| IMAGEKIT-VUEJS VERSION             | VUEJS VERSION                    |
| :----------------|:----------------------------- |
| ^2.0.0 | ^3.0.0 |
| 1.0.9 | ^2.6.12 |
| 1.0.5 and below | ^2.6.11 |


## Installation

```shell
npm install --save imagekitio-vue
```

or

```shell
yarn add imagekitio-vue
```

## Usage

### Initialization
Register it as a plugin to globally install all components.

```js
import ImageKit from "imagekitio-vue"
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: "your_url_endpoint", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey: "your_public_api_key", // optional
  // transformationPosition: "path" // optional
})
```
`urlEndpoint` is required to use the SDK. You can get URL-endpoint from your ImageKit dashboard - https://imagekit.io/dashboard#url-endpoints.

`publicKey` and `authenticator` parameters are required if you want to use the SDK for client-side file upload. You can get these parameters from the developer section in your ImageKit dashboard - https://imagekit.io/dashboard#developers.

`transformationPosition` is optional. The default value for this parameter is `path`. Acceptable values are `path` & `query`

_Note: Do not include your Private Key in any client-side code, including this SDK or its initialization. If you pass the `privateKey` parameter while initializing this SDK, it throws an error_

Or, import components individually.
```
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-vue"

export default {
  components: {
    IKImage,
    IKVideo,
    IKContext,
    IKUpload
  }
}
```

### Quick examples
```js
import ImageKit from "imagekitio-vue"
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: "your_url_endpoint", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey: "your_public_api_key", // optional
})

// Rendering image using a relative file path
<IKImage
  path="/default-image.jpg"
/>

// Image resizing
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}]"
/>

// Using chained transformation
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}, {rotation:90}]"
/>

// Imgae from absolute file path
<IKImage
  src="https://custom-domain.com/default-image.jpg"
  :transformation="[{height:300,width:400}, {rotation:90}]"
/>

// Lazy loading
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400},{rotation:90}]"
  loading="lazy"
  height="300"
  width="400"
/>

// Low-quality blurred image placeholder of original image
<IKImage
  path="/default-image.jpg"
  :lqip="{active:true}"
  :transformation="[{height:300,width:400},{rotation:90}]"
  loading="lazy"
  height="300"
  width="400"
/>

// Controlling quality and blur value of placeholder image
<IKImage
  path="/default-image.jpg"
  :lqip="{active:true, quality:30, blur: 5}" // default values are quality=20 and blur=6
  :transformation="[{height:300,width:400},{rotation:90}]"
  loading="lazy"
  height="300"
  width="400"
/>

<IKContext urlEndpoint="https://ik.imagekit.io/your_imagekit_id">
  // Render an image using a relative path - https://ik.imagekit.io/your_imagekit_id/default-image.jpg
  <IKImage path="/default-image.jpg" />
  // Overriding urlEndpoint defined in parent IkContext - https://www.custom-domain.com/default-image.jpg
  <IKImage urlEndpoint="https://www.custom-domain.com" path="/default-image.jpg" />
  // Render an image using an absolute URL - https://www1.custom-domain.com/default-image.jpg?tr=w-100
  <IKImage src="https://www1.custom-domain.com/default-image.jpg?tr=w-100" />
  // Height and width manipulation - https://ik.imagekit.io/your_imagekit_id/tr:h-200,w-200/default-image.jpg
  <IKImage path="/default-image.jpg" transformation={[{
    "height": "200",
    "width": "200"
  }]} />
  // Chained transformation - https://ik.imagekit.io/your_imagekit_id/tr:h-200,w-200:rt-90/default-image.jpg
  <IKImage path="/default-image.jpg" transformation={[{
    "height": "200",
    "width": "200",
  },
  {
    "rotation": "90"
  }]} />
  // Lazy loading image
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      "height": "200",
      "width": "200"
    }]}
    loading="lazy"
  />
  /*
     Low-quality image placeholder
     Will first load https://ik.imagekit.io/your_imagekit_id/tr:h-200,w-200:q-20,bl-6/default-image.jpg, while the original image, i.e., https://ik.imagekit.io/your_imagekit_id/tr:h-200,w-200/default-image.jpg is being loaded in the background.
  */
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      "height": "200",
      "width": "200"
    }]}
    lqip={{ active: true }}
  />
  // Low quality image placeholder with custom quality and blur values
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      "height": "200",
      "width": "200"
    }]}
    lqip={{ active: true, quality: 20, blur: 10 }}
  />
  // Low quality image placeholder and lazy loading original image in the background
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      "height": "200",
      "width": "200"
    }]}
    loading="lazy"
    lqip={{ active: true }}
  />
  // Video element with basic transaformation, reduced quality by 50% using q: 50

  <IKVideo
    path={'/default-video.mp4'}
    transformation={[{ height: 200, width: 200, q: 50 }]}
    controls={true}
  />
</IKContext>

// File upload
<IKUpload
  :tags="['tag1','tag2']"
  :responseFields="['tags']"
  :onError="onError"
  :onSuccess="onSuccess"
  :useUniqueFileName=true
  :isPrivateFile=false
  customCoordinates="10,10,100,100"
/> 
  
// This promise resolves with an object containing the necessary security parameters i.e `signature`, `token`, and `expire`.
<IKContext publicKey="your_public_api_key" authenticator="()=>Promise">
  // Simple file upload and response handling
  <IKUpload
    onError={onError}
    onSuccess={onSuccess}
  />
  // Passing different upload API options
  <IKUpload
    fileName="file-name.jpg"
    tags={["sample-tag1", "sample-tag2"]}
    customCoordinates={"10,10,10,10"}
    isPrivateFile={false}
    useUniqueFileName={true}
    responseFields={["tags"]}
    folder={"/sample-folder"}
    inputRef={uploadRef}
    onError={onError} onSuccess={onSuccess}
  />
</IKContext>

```

### Demo application
* The official step by step Vue.js quick start guide - https://docs.imagekit.io/getting-started/quickstart-guides/vuejs.

### Components

This SDK provides 4 global components, when registered as a plugin:
* [`IKContext`](#IKContext) for defining options like `urlEndpoint`, `publicKey` or `authenticator` to all children elements. This component does not render anything.
* `IKImage` for [image resizing](#image-resizing). This renders a `<img>` tag.
* `IKVideo` for [video resizing](#video-resizing). This renders a `<video>` tag.
* `IKUpload`for client-side [file uploading](#file-upload). This renders a `<input type="file">` tag.

If you want to do anything custom, access the [ImageKit core JS SDK](https://github.com/imagekit-developer/imagekit-javascript) using `IKCore` module. For example:

```js
import { IKCore } from "imagekitio-vue"

// Generate image URL
var imagekit = new ImageKit({
    publicKey: "your_public_api_key",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
});

//https://ik.imagekit.io/your_imagekit_id/endpoint/tr:h-300,w-400/default-image.jpg
var imageURL = imagekit.url({
    path: "/default-image.jpg",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/endpoint/",
    transformation: [{
        "height": "300",
        "width": "400"
    }]
});
```

## IKContext

In order to use the SDK, you need to provide it with a few configuration parameters. You can use a parent `IKContext` component to define common options for all children `IKImage`, `IKVideo` or `IKupload` compoents. For example:

```js
// Register as plugin
import ImageKit from "imagekitio-vue"
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
})

// Using global configuration
// https://ik.imagekit.io/your_imagekit_id/default-image.jpg
<IKImage 
  path="/default-image.jpg"/>

// Defining urlEndpoint in IKContext
<IKContext
  urlEndpoint="https://www.custom-domain.com/">
    // https://www.custom-domain.com/default-image.jpg
    // urlEndpoint is taken from the parent IKContext
    <IKImage path="/default-image.jpg"/>
</IKContext >

// Using exported component
<IKContext
  :publicKey="your_url_endpoint"
  :urlEndpoint="your_public_api_key"
  :authenticator={()=>Promise} 
  // This promise  resolves with an object containing the necessary security parameters i.e `signature`, `token`, and `expire`.
>
>
  <IKUpload
    :tags="['tag3','tag4']"
    :responseFields="['tags']"
    :onSuccess="onSuccess"
  />
</IKContext>
```

## Image resizing

`IKImage` components accept the following props:

| Prop             | Type | Description                    |
| :----------------| :----|:----------------------------- |
| urlEndpoint      | String | Optional. The base URL to be appended before the path of the image. If not specified, the URL-endpoint specified at the time of [SDK initialization](#initialization) is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| path             | String |Conditional. This is the path at which the image exists. For example, `/path/to/image.jpg`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| src              | String |Conditional. This is the complete URL of an image already mapped to ImageKit. For example, `https://ik.imagekit.io/your_imagekit_id/endpoint/path/to/image.jpg`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| transformation   | Array of objects |Optional. An array of objects specifying the transformation to be applied in the URL. The transformation name and the value should be specified as a key-value pair in the object. See list of [different tranformations](#list-of-supported-transformations). Different steps of a [chained transformation](https://docs.imagekit.io/features/image-transformations/chained-transformations) can be specified as the array's different objects. The complete list of supported transformations in the SDK and some examples of using them are given later. If you use a transformation name that is not specified in the SDK, it is applied in the URL as it is. |
| transformationPosition | String |Optional. The default value is `path` that places the transformation string as a URL path parameter. It can also be specified as `query`, which adds the transformation string as the URL's query parameter i.e.`tr`. If you use `src` parameter to create the URL, then the transformation string is always added as a query parameter. |
| queryParameters  | Object |Optional. These are the other query parameters that you want to add to the final URL. These can be any query parameters and not necessarily related to ImageKit. Especially useful if you want to add some versioning parameter to your URLs. |
| loading  | String |Optional. Pass `lazy` to lazy load images |
| lqip  | Object |Optional. You can use this to show a low-quality blurred placeholder while the original image is being loaded e.g. `{active:true, quality: 20, blur: 6`}. The default value of `quality` is `20` and `blur` is `6`.|

### Basic resizing examples

```js
// Image from related file path with no transformations - https://ik.imagekit.io/your_imagekit_id/default-image.jpg
<IKImage
  path="/default-image.jpg"
/>

// Image resizing - https://ik.imagekit.io/your_imagekit_id/tr:w-h-300,w-400/default-image.jpg
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}]"
/>

// Loading imgae from an absolute file path with no transformations - https://www.custom-domain.com/default-image.jpg
<IKImage
  src="https://www.custom-domain.com/default-image.jpg"
/>

// Using a new tranformation parameter which is not there in this SDK yet - https://ik.imagekit.io/your_imagekit_id/tr:custom-value/default-image.jpg
<IKImage
  path="/default-image.jpg"
  :transformation="[{custom: 'value'}]"
/>
```

The `transformation` prop is an array of objects. Each object can have the following properties. When you specify more than one object, each object is added as a chained transformation. For example:

```js
// It means first resize the image to 400x400 and then rotate 90 degree
transformation = [
  {
    height: 400,
    width: 400
  },
  {
    rotation: 90
  }
]
```

See the complete list of transformations supported in ImageKit [here](https://docs.imagekit.io/features/image-transformations). The SDK gives a name to each transformation parameter e.g. `height` for `h` and `width` for `w` parameter. It makes your code more readable. If the property does not match any of the following supported options, it is added as it is.

<br/>

> #### Deprecation notice
> The list below mentions the old overlay syntax parameters such as `oi`, `ot`, `obg`, and more. These parameters will be deprecated on 31st Oct 2023 and will start returning errors when used in URLs. Please migrate to the new Layers syntax that supports overlay nesting, provides better positional control, and allows more transformations at the layer level. You can start with [examples](https://docs.imagekit.io/features/image-transformations/overlay-using-layers#examples) to learn quickly.
> If you create overlay transformations using the JavaScript SDK, you can migrate to the new Layers syntax using the `raw` transformation parameter, as given in the example below.
> `transformation = [{ "width": 300, "height": 300 },{ "raw": "l-image,i-logo.png,w-10,rt-90,l-end" }]`

<br/>

### List of supported transformations
<details>
<summary>Expand</summary>

| Supported Transformation Name | Translates to parameter |
|-------------------------------|-------------------------|
| height | h |
| width | w |
| aspectRatio | ar |
| quality | q |
| crop | c |
| cropMode | cm |
| x | x |
| y | y |
| focus | fo |
| format | f |
| radius | r |
| background | bg |
| border | b |
| rotation | rt |
| blur | bl |
| named | n |
| overlayX | ox |
| overlayY | oy |
| overlayFocus | ofo |
| overlayHeight | oh |
| overlayWidth | ow |
| overlayImage | oi |
| overlayImageTrim | oit |
| overlayImageAspectRatio | oiar |
| overlayImageBackground | oibg |
| overlayImageBorder | oib |
| overlayImageDPR | oidpr |
| overlayImageQuality | oiq |
| overlayImageCropping | oic |
| overlayImageTrim | oit |
| overlayText | ot |
| overlayTextFontSize | ots |
| overlayTextFontFamily | otf |
| overlayTextColor | otc |
| overlayTextTransparency | oa |
| overlayAlpha | oa |
| overlayTextTypography | ott |
| overlayBackground | obg |
| overlayTextEncoded | ote |
| overlayTextWidth | otw |
| overlayTextBackground | otbg |
| overlayTextPadding | otp |
| overlayTextInnerAlignment | otia |
| overlayRadius | or |
| progressive | pr |
| lossless | lo |
| trim | t |
| metadata | md |
| colorProfile | cp |
| defaultImage | di |
| dpr | dpr |
| effectSharpen | e-sharpen |
| effectUSM | e-usm |
| effectContrast | e-contrast |
| effectGray | e-grayscale |
| original | orig |

</details>

### Chained Transforms

Chained transforms make it easy to specify the order the transform is applied. For example:

```js
// Using chained transformation. First, resize and then rotate the image to 90 degrees.
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}, {rotation:90}]"
/>
```

### Lazy loading images

You can lazy load images using the `loading` prop. When you use `loading="lazy"`, all images that are immediately viewable without scrolling load normally. Those that are far below the device viewport are only fetched when the user scrolls near them.

The SDK uses a fixed threshold based on the effective connection type to ensure that images are loaded early enough so that they have finished loading once the user scrolls near to them.

On fast connections (e.g 4G), the value of threshold is `1250px` and on slower connections (e.g 3G), it is `2500px`.

> You should always set the `height` and `width` of image element to avoid [layout shift](https://www.youtube.com/watch?v=4-d_SoCHeWE) when lazy-loading images.

Example usage:

```js
// Lazy loading images
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400},{rotation:90}]"
  loading="lazy"
  height="300"
  width="400"
/>
```

### Low-quality image placeholders (LQIP)
To improve user experience, you can use a low-quality blurred variant of the original image as a placeholder while the original image is being loaded in the background. Once the loading of the original image is finished, the placeholder is replaced with the original image.

```js
// Loading a blurred low quality image placeholder while the original image is being loaded
<IKImage
  path="/default-image.jpg"
  :lqip="{active:true}"
/>
```

By default, the SDK uses the `quality:20` and `blur:6`. You can change this. For example:

```js
<IKImage
  path="/default-image.jpg"
  :lqip="{active:true, quality: 40, blur: 5}"
/>
```

### Combining lazy loading with low-quality placeholders
You have the option to lazy-load the original image only when the user scrolls near them. Until then, only a low-quality placeholder is loaded. This saves a lot of network bandwidth if the user never scrolls further down.

```js
// Loading a blurred low quality image placeholder and lazy-loading original when user scrolls near them
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400},{rotation:90}]"
  :lqip="{active:true}"
  loading="lazy"
  height="300"
  width="400"
/>
```

### Overriding urlEndpoint for a particular image
You can use `urlEndpoint` prop in an individual `IKImage` to change url for that image. For example:
```js
import ImageKit from "imagekitio-vue"
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id"
})

// Changing urlEndpoint
// https://www.custom-domain.com/tr:w-400,h-300/default-image.jpg
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}]"
  urlEndpoint="https://www.custom-domain.com"
/>

// Without urlEndpoint
// https://ik.imagekit.io/your_imagekit_id/tr:w-400,h-300/default-image.jpg
<IKImage
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}]"
/>
```

## Video resizing

The `IKVideo` component renders a `video` tag. It is used for rendering and manipulating videos in real-time. `IKVideo` component accepts the following props:

| Prop             | Type | Description                    |
| :----------------| :----|:----------------------------- |
| urlEndpoint      | String | Optional. The base URL to be appended before the path of the video. If not specified, the URL-endpoint specified in the parent `IKContext` component is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| path             | String |Conditional. This is the path at which the video exists. For example, `/path/to/video.mp4`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| src              | String |Conditional. This is the complete URL of a video already mapped to ImageKit. For example, `https://ik.imagekit.io/your_imagekit_id/endpoint/path/to/video.mp4`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| transformation   | Array of objects |Optional. An array of objects specifying the transformation to be applied in the URL. The transformation name and the value should be specified as a key-value pair in the object. See list of [different tranformations](#list-of-supported-transformations). The complete list of supported transformations in the SDK and some examples of using them are given later. If you use a transformation name that is not specified in the SDK, it gets applied as it is in the URL. |
| transformationPosition | String |Optional. The default value is path, which places the transformation string as a path parameter in the URL. It can also be specified as query, which adds the transformation string as the query parameter tr in the URL. If you use the src parameter to create the URL, then the transformation string is always added as a query parameter. |
| queryParameters  | Object |Optional. These are the other query parameters that you want to add to the final URL. These can be any query parameters and are not necessarily related to ImageKit. Especially useful if you want to add some versioning parameters to your URLs. |

### Basic video resizing examples

```js
<IKContext urlEndpoint="https://ik.imagekit.io/demo/your_imagekit_id">
  // Video from related file path with no transformations - https://ik.imagekit.io/demo/your_imagekit_id/sample-video.mp4
  <IKVideo
    path="/sample-video.mp4"
  />
  // Video resizing - https://ik.imagekit.io/demo/your_imagekit_id/tr:w-h-300,w-400/sample-video.mp4
  <IKVideo
    path="/sample-video.mp4"
    transformation={[{
      height:300,
      width:400
    }]}
  />
  // Loading video from an absolute file path with no transformations - https://www.custom-domain.com/default-video.mp4
  <IKVideo
    src="https://www.custom-domain.com/default-video.mp4"
  />
  // Using a new tranformation parameter which is not there in this SDK yet - https://ik.imagekit.io/demo/your_imagekit_id/tr:custom-value/sample-video.mp4
  <IKVideo
    path="/sample-video.mp4"
    transformation={[{
      custom: 'value'
    }]}
  />
</IKContext>
```

The `transformation` prop is an array of objects. Each object can have the following properties.

```js
// It means first resize the video to 400x400 and then rotate 90 degree
transformation = [
  {
    height: 400,
    width: 400,
    rt: 90
  }
]
```

## File Upload
The SDK provides the `IKUpload` component to upload files to the [ImageKit Media Library](https://docs.imagekit.io/media-library/overview). 

`IKUpload` component accepts the [ImageKit Upload API](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#request-structure-multipart-form-data) options as props.

| Prop             | Type | Description                    |
| :----------------| :----|:----------------------------- |
| fileName | String | Optional. If not specified, the file system name is picked. 
| useUniqueFileName  | Boolean | Optional. Accepts `true` of `false`. The default value is `true`. Specify whether to use a unique filename for this file or not. |
| tags     | Array of string | Optional. Set the tags while uploading the file e.g. ["tag1","tag2"] |
| folder        | String | Optional. The folder path (e.g. `/images/folder/`) in which the file has to be uploaded. If the folder doesn't exist before, a new folder is created.|
| isPrivateFile | Boolean | Optional. Accepts `true` of `false`. The default value is `false`. Specify whether to mark the file as private or not. This is only relevant for image type files|
| customCoordinates   | String | Optional. Define an important area in the image. This is only relevant for image type files. To be passed as a string with the `x` and `y` coordinates of the top-left corner, and `width` and `height` of the area of interest in format `x,y,width,height`. For example - `10,10,100,100` |
| responseFields   | Array of string | Optional. Values of the fields that you want upload API to return in the response. For example, set the value of this field to `["tags", "customCoordinates", "isPrivateFile"]` to get value of `tags`, `customCoordinates`, and `isPrivateFile` in the response. |
| extensions   | Array of object | Optional. Array of object for [applying extensions](https://docs.imagekit.io/extensions/overview) on the image. |
| webhookUrl   | String | Optional. Final status of pending extensions will be sent to this URL. |
| overwriteFile   | Boolean | Optional. Default is true. If overwriteFile is set to false and useUniqueFileName is also false, and a file already exists at the exact location, upload API will return an error immediately. |
| overwriteAITags   | Boolean | Optional. Default is true. If set to true and a file already exists at the exact location, its AITags will be removed. Set overwriteAITags to false to preserve AITags. |
| overwriteCustomMetadata   | Boolean | Optional. Default is true. If the request does not have customMetadata , overwriteCustomMetadata is set to true and a file already exists at the exact location, exiting customMetadata will be removed. In case the request body has customMetadata, setting overwriteCustomMetadata to false has no effect and request's customMetadata is set on the asset. |
| customMetadata   | Object | Optional. JSON key-value data to be associated with the asset. |
| ref   | Reference | Optional. Reference to the core HTMLInputElement.|
| onSuccess   | Function callback | Optional. Called if the upload is successful. The first and only argument is the response JSON from the upload API |
| onError   | Function callback | Optional. Called if upload results in an error. The first and only argument is the error received from the upload API |
| urlEndpoint      | String | Optional. If not specified, the URL-endpoint specified at the time of [SDK initialization](#initialization) is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| publicKey      | String | Optional. If not specified, the `publicKey` specified at the time of [SDK initialization](#initialization) is used.|
| authenticator      | ()=>Promise<{signature:string,token:string,expiry:number}> | Optional. If not specified, the `authenticator` specified at the time of [SDK initialization](#initialization) is used. |

> Make sure that you have specified authenticator and publicKey in IKUpload or in the parent IKContext component as a prop. The authenticator expects an asynchronous function that resolves with an object containing the necessary security parameters i.e signature, token, and expire. 

Sample file upload:

```js
<template>
  <IKUpload 
    :onUploadStart="onUploadStart" 
    :onUploadProgress="onUploadProgress"
    :tags="['tag1','tag2']"
    :responseFields="['tags']"
    :onError="onError"
    :onSuccess="onSuccess"
    customCoordinates="10,10,100,100"
  />
</template>

<script>
import { IKUpload } from "imagekitio-vue"
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: "your_url_endpoint", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey: "your_public_api_key", // optional
})

export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {
    onError(err) {
      console.log("Error");
      console.log(err);
    },
    onSuccess(res) {
      console.log("Success");
      console.log(res);
    }
    onUploadProgress(evt) {
      console.log("Inprogress ... ", evt);
    };
    onUploadStart(evt) {
      console.log("Upload started");
    },
  }
};
</script>
```

#### Abort upload

ref can be passed to obtain access to the IKUpload component's instance. Calling the `triggerAbortUpload` method will abort the upload if any is in progress.

Example Usage

```js
<template>
  <IKUpload 
    ref="childComponentRef" 
    :publicKey="publicKey" 
    :urlEndpoint="urlEndpoint"
    :authenticator="authenticator"
    :tags="['tag1','tag2']"
    :responseFields="['tags']"
    :onError="onError"
    :onSuccess="onSuccess"
    customCoordinates="10,10,100,100"
  />
  <button @click="abortChildUpload">Abort Child Upload</button>
</template>

<script>
import { IKUpload } from "imagekitio-vue"
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: "your_url_endpoint", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey: "your_public_api_key", // optional
})

export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {
    onError(err) {
      console.log("Error");
      console.log(err);
    },
    onSuccess(res) {
      console.log("Success");
      console.log(res);
    }
    abortChildUpload() {
      this.$refs.childComponentRef.triggerAbortUpload();
      console.log("Upload aborted")
    },
  }
};
</script>
```

## IKCore

Accessing the underlying [ImageKit javascript SDK](https://github.com/imagekit-developer/imagekit-javascript) is possible using the `IKCore` import. For example:

```js
import { IKCore } from "imagekitio-vue"
// Generate image URL
var imagekit = new IKCore({
    publicKey: "your_public_api_key",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
});
//https://ik.imagekit.io/your_imagekit_id/endpoint/tr:h-300,w-400/default-image.jpg
var imageURL = imagekit.url({
    path: "/default-image.jpg",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/endpoint/",
    transformation: [{
        "height": "300",
        "width": "400"
    }]
});
```

## Support

For any feedback or to report any issues or general implementation support, please reach out to [support@imagekit.io](mailto:support@imagekit.io)

## Links
* [Documentation](https://docs.imagekit.io)
* [Main website](https://imagekit.io)

## License
Released under the MIT license.
