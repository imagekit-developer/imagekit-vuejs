[<img width="250" alt="ImageKit.io" src="https://raw.githubusercontent.com/imagekit-developer/imagekit-javascript/master/assets/imagekit-light-logo.svg"/>](https://imagekit.io)

# ImageKit.io Vue.js SDK

[![Node CI](https://github.com/imagekit-developer/imagekit-vuejs/workflows/Node%20CI/badge.svg)](https://github.com/imagekit-developer/imagekit-vuejs/)
[![npm version](https://img.shields.io/npm/v/imagekitio-vue)](https://www.npmjs.com/package/imagekitio-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter Follow](https://img.shields.io/twitter/follow/imagekitio?label=Follow&style=social)](https://twitter.com/ImagekitIo)

ImageKit Vue.js SDK allows you to use real-time [image resizing](https://docs.imagekit.io/features/image-transformations), [optimization](https://docs.imagekit.io/features/image-optimization), and [file uploading](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload) in the client-side.

## Installation

```shell
npm install --save imagekitio-vue
```

or

```shell
yarn add imagekitio-vue
```

## Usage

Register it as a plugin to globally install all components.

### Initialization

```js
import ImageKit from "imagekitio-vue"

Vue.use(ImageKit, {
  urlEndpoint: your_url_endpoint,
  // publicKey: your_public_api_key,
  // authenticationEndpoint: https://your-server.com/auth,
  // transformationPosition: "path"
})
```
`urlEndpoint` is required to use the SDK. You can get URL-endpoint from your ImageKit dashboard - https://imagekit.io/dashboard#url-endpoints.

`publicKey` and `authenticationEndpoint` parameters are required if you want to use the SDK for client-side file upload. You can get these parameters from the developer section in your ImageKit dashboard - https://imagekit.io/dashboard#developers.

`transformationPosition` is optional. The default value for this parameter is `path`. Acceptable values are `path` & `query`

_Note: Do not include your Private Key in any client-side code, including this SDK or its initialization. If you pass the `privateKey` parameter while initializing this SDK, it throws an error_

### Quick examples
```js
import ImageKit from "imagekitio-vue"
Vue.use(ImageKit, {
  urlEndpoint: your_url_endpoint, // Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  // publicKey: your_public_api_key,
  // authenticationEndpoint: https://your-server.com/auth
})

// Image from related file path
<ik-image
  path="/default-image.jpg"
/>

// Image resizing
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}]"
/>

// Using chained transformation
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}, {rotate:90}]"
/>

// Imgae from absolute file path
<ik-image
  src="https://custom-domain.com/default-image.jpg"
  :transformation="[{height:300,width:400}, {rotate:90}]"
/>

// Lazy loading
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400},{rotation:90}]"
  loading="lazy"
  height="300"
  width="400"
/>

// Low-quality blurred image placeholder of original image
<ik-image
  path="/default-image.jpg"
  :lqip="{active:true}"
  :transformation="[{height:300,width:400},{rotation:90}]"
  loading="lazy"
  height="300"
  width="400"
/>

// Controlling quality and blur value of placeholder image
<ik-image
  path="/default-image.jpg"
  :lqip="{active:true, quality:30, blur: 5}" // default values are quality=20 and blur=6
  :transformation="[{height:300,width:400},{rotation:90}]"
  loading="lazy"
  height="300"
  width="400"
/>

// File upload
<ik-upload
  :tags="['tag1','tag2']"
  :responseFields="['tags']"
  :onError="onError"
  :onSuccess="onSuccess"
  :useUniqueFileName=true
  :isPrivateFile=false
  customCoordinates="10,10,100,100"
/>
```

Or, import components individually.
```
import { IKImage, IKContext, IKUpload } from "imagekitio-vue"

export default {
  components: {
    IKImage,
    IKContext,
    IKUpload
  }
}
```

### Demo application
The fastest way to get started is by running the demo application in [samples/sample-app](/samples/sample-app) folder as the [README.md](/samples/sample-app/README.md).

### Components

This SDK provides 3 global components, when registered as a plugin:
* `ik-image` for [image resizing](#image-resizing). The output is a `<img>` tag.
* `ik-upload` for [file uploading](#file-upload). The output is a `<input type="file">` tag.
* [`ik-context`](#ik-context) for defining `urlEndpoint`, `publicKey` and `authenticationEndpoint` to all children elements.

If you want to do anything custom, access the [ImageKit core JS SDK](https://github.com/imagekit-developer/imagekit-javascript) using `IKCore` module. For example:

```js
import { IKCore } from "imagekitio-vue"

// Generate image URL
var imagekit = new ImageKit({
    publicKey: "your_public_api_key",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
    authenticationEndpoint: "http://www.yourserver.com/auth",
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

## Image resizing

`ik-image` components accept the following props:

| Prop             | Type | Description                    |
| :----------------| :----|:----------------------------- |
| urlEndpoint      | String | Optional. The base URL to be appended before the path of the image. If not specified, the URL-endpoint specified at the time of [SDK initialization](#initialization) is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| path             | String |Conditional. This is the path at which the image exists. For example, `/path/to/image.jpg`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| src              | String |Conditional. This is the complete URL of an image already mapped to ImageKit. For example, `https://ik.imagekit.io/your_imagekit_id/endpoint/path/to/image.jpg`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| transformation   | Array of objects |Optional. An array of objects specifying the transformation to be applied in the URL. The transformation name and the value should be specified as a key-value pair in the object. See list of [different tranformations](#list-of-supported-transformations). Different steps of a [chained transformation](https://docs.imagekit.io/features/image-transformations/chained-transformations) can be specified as the array's different objects. The complete list of supported transformations in the SDK and some examples of using them are given later. If you use a transformation name that is not specified in the SDK, it gets applied as it is in the URL. |
| transformationPostion | String |Optional. The default value is `path` that places the transformation string as a path parameter in the URL. It can also be specified as `query` which adds the transformation string as the query parameter `tr` in the URL. If you use `src` parameter to create the URL, then the transformation string is always added as a query parameter. |
| queryParameters  | Object |Optional. These are the other query parameters that you want to add to the final URL. These can be any query parameters and not necessarily related to ImageKit. Especially useful if you want to add some versioning parameter to your URLs. |
| loading  | String |Optional. Pass `lazy` to lazy load images |
| lqip  | Object |Optional. You can use this to show a low-quality blurred placeholder while the original image is being loaded e.g. `{active:true, quality: 20, blur: 6`}. The default value of `quality` is `20` and `blur` is `6`.|

### Basic resizing examples

```js
// Image from related file path with no transformations
<ik-image
  path="/default-image.jpg"
/>

// Loading imgae from an absolute file path with no transformations
<ik-image
  src="https://custom-domain.com/default-image.jpg"
  :transformation="[{height:300,width:400}, {rotate:90}]"
/>

// Image resizing
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}]"
/>

// Using a new tranformation parameter which is not there in this SDK yet.
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400, custom: 'value'}, {rotate:90}]"
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
    rotate: 90
  }
]
```

<details>
<summary>List of supported transformations</summary>

The complete list of transformations supported and their usage in ImageKit can be found [here](https://docs.imagekit.io/features/image-transformations). The SDK gives a name to each transformation parameter, making the code readable. If the property does not match any of the following, it is appended in the URL.

| Supported Transformation Name | Translates to parameter |
| ----------------------------- | ----------------------- |
| height                        | h                       |
| width                         | w                       |
| aspectRatio                   | ar                      |
| quality                       | q                       |
| crop                          | c                       |
| cropMode                      | cm                      |
| x                             | x                       |
| y                             | y                       |
| focus                         | fo                      |
| format                        | f                       |
| radius                        | r                       |
| background                    | bg                      |
| border                        | bo                      |
| rotation                      | rt                      |
| blur                          | bl                      |
| named                         | n                       |
| overlayImage                  | oi                      |
| overlayX                      | ox                      |
| overlayY                      | oy                      |
| overlayFocus                  | ofo                     |
| overlayHeight                 | oh                      |
| overlayWidth                  | ow                      |
| overlayText                   | ot                      |
| overlayTextFontSize           | ots                     |
| overlayTextFontFamily         | otf                     |
| overlayTextColor              | otc                     |
| overlayAlpha                  | oa                      |
| overlayTextTypography         | ott                     |
| overlayBackground             | obg                     |
| overlayImageTrim              | oit                     |
| progressive                   | pr                      |
| lossless                      | lo                      |
| trim                          | t                       |
| metadata                      | md                      |
| colorProfile                  | cp                      |
| defaultImage                  | di                      |
| dpr                           | dpr                     |
| effectSharpen                 | e-sharpen               |
| effectUSM                     | e-usm                   |
| effectContrast                | e-contrast              |
| effectGray                    | e-grayscale             |
| original                      | orig                    |

</details>

### Chained Transforms

Chained transforms make it easy to specify the order the transform are applied. For example:

```js
// Using chained transformation. First resize and then rotate image to 90 degree.
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}, {rotate:90}]"
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
<ik-image
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
<ik-image
  path="/default-image.jpg"
  :lqip="{active:true}"
/>
```

By default, the SDK uses the `quality:20` and `blur:6`. You can change this. For example:

```js
<ik-image
  path="/default-image.jpg"
  :lqip="{active:true, quality: 40, blur: 5}"
/>
```

### Combining lazy loading with low-quality placeholders
You have the option to lazy-load the original image only when the user scrolls near them. Until then, only a low-quality placeholder is loaded. This saves a lot of network bandwidth if the user never scrolls further down.

```js
// Loading a blurred low quality image placeholder and lazy-loading original when user scrolls near them
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400},{rotation:90}]"
  :lqip="{active:true}"
  loading="lazy"
  height="300"
  width="400"
/>
```

### Overriding urlEndpoint for a particular image
You can use `urlEndpoint` prop in an individual `ik-image` to change url for that image. For example:
```js
import ImageKit from "imagekitio-vue"
Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id"
})

// Changing urlEndpoint
// https://www.custom-domain.com/tr:w-400,h-300/default-image.jpg
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}]"
  urlEndpoint="https://www.custom-domain.com"
/>

// Without urlEndpoint
// https://ik.imagekit.io/your_imagekit_id/tr:w-400,h-300/default-image.jpg
<ik-image
  path="/default-image.jpg"
  :transformation="[{height:300,width:400}]"
/>
```

## File Upload
The SDK provides the `ik-upload` component to upload files to the [ImageKit Media Library](https://docs.imagekit.io/media-library/overview). 

`ik-upload` component accepts the [ImageKit Upload API](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#request-structure-multipart-form-data) options as props.

| Prop             | Type | Description                    |
| :----------------| :----|:----------------------------- |
| fileName | String | Optional. If not specified, the file system name is picked. 
| useUniqueFileName  | Boolean | Optional. Accepts `true` of `false`. The default value is `true`. Specify whether to use a unique filename for this file or not. |
| tags     | Array of string | Optional. Set the tags while uploading the file e.g. ["tag1","tag2"] |
| folder        | String | Optional. The folder path (e.g. `/images/folder/`) in which the file has to be uploaded. If the folder doesn't exist before, a new folder is created.|
| isPrivateFile | Boolean | Optional. Accepts `true` of `false`. The default value is `false`. Specify whether to mark the file as private or not. This is only relevant for image type files|
| customCoordinates   | String | Optional. Define an important area in the image. This is only relevant for image type files. To be passed as a string with the `x` and `y` coordinates of the top-left corner, and `width` and `height` of the area of interest in format `x,y,width,height`. For example - `10,10,100,100` |
| responseFields   | Array of string | Optional. Values of the fields that you want upload API to return in the response. For example, set the value of this field to `["tags", "customCoordinates", "isPrivateFile"]` to get value of `tags`, `customCoordinates`, and `isPrivateFile` in the response. |
| onSuccess   | Function callback | Optional. Called if upload is successfull. The first and only argument is the response JOSN from the upload API |
| onError   | Function callback | Optional. Called if upload results in an error. The first and only argument is the error received from the upload API |
| urlEndpoint      | String | Optional. If not specified, the URL-endpoint specified at the time of [SDK initialization](#initialization) is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| publicKey      | String | Optional. If not specified, the `publicKey` specified at the time of [SDK initialization](#initialization) is used.|
| authenticationEndpoint      | String | Optional. If not specified, the `authenticationEndpoint` specified at the time of [SDK initialization](#initialization) is used. |

> Make sure that you have specified `authenticationEndpoint` and `publicKey` during SDK initialization or in `ik-upload` as a prop. The SDK makes an HTTP GET request to this endpoint and expects a JSON response with three fields i.e. `signature`, `token`, and `expire`. [Learn how to implement authenticationEndpoint](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#how-to-implement-authenticationendpoint-endpoint) on your server. Refer to sample application in this repository for an example implementation.

Sample file upload:

```js
<template>
  <ik-upload 
    :tags="['tag1','tag2']"
    :responseFields="['tags']"
    :onError="onError"
    :onSuccess="onSuccess"
    customCoordinates="10,10,100,100"
  />
</template>

<script>
import Vue from 'vue';
import ImageKit from "imagekitio-vue"

Vue.use(ImageKit, {
  urlEndpoint: your_url_endpoint,
  publicKey: your_public_api_key,
  authenticationEndpoint: "https://www.your-server.com/auth",
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
  }
};
</script>
```

## ik-context
`ik-context` component allows you to define configuration parameters that are applied to all children elements.

```js
// Register as plugin
import Vue from 'vue';
import ImageKit from "imagekitio-vue"

Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
})

// Using global configuration
// https://ik.imagekit.io/your_imagekit_id/default-image.jpg
<ik-image 
  path="/default-image.jpg"/>

// Defining urlEndpoint in ik-context
<ik-context 
  urlEndpoint="https://www.custom-domain.com/">
    // https://www.custom-domain.com/default-image.jpg
    // urlEndpoint is taken from the parent ik-context
    <ik-image path="/default-image.jpg"/>
</ik-context >

// Using exported component
<IKContext
  :publicKey="your_url_endpoint"
  :urlEndpoint="your_public_api_key"
  :authenticationEndpoint="https://www.your-server.com/auth"
>
  <IKUpload
    :tags="['tag3','tag4']"
    :responseFields="['tags']"
    :onSuccess="onSuccess"
  />
</IKContext>
```

## Support

For any feedback or to report any issues or general implementation support, please reach out to [support@imagekit.io](mailto:support@imagekit.io)

## Links
* [Documentation](https://docs.imagekit.io)
* [Main website](https://imagekit.io)

## License
Released under the MIT license.