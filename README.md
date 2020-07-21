# ImageKit.io Vue SDK

[![Node CI](https://github.com/imagekit-developer/imagekit-vuejs/workflows/Node%20CI/badge.svg)](https://github.com/imagekit-developer/imagekit-vuejs/)
[![npm version](https://img.shields.io/npm/v/imagekitio-vue)](https://www.npmjs.com/package/imagekitio-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter Follow](https://img.shields.io/twitter/follow/imagekitio?label=Follow&style=social)](https://twitter.com/ImagekitIo)

Vue SDK for [ImageKit.io](https://imagekit.io), which implements client-side upload and URL generation for use inside a vue application.

ImageKit is a complete image optimization and transformation solution that comes with an [image CDN](https://imagekit.io/features/imagekit-infrastructure) and media storage. It can be integrated with your existing infrastructure - storage like AWS S3, web servers, your CDN, and custom domain names, allowing you to deliver optimized images in minutes with minimal code changes.

## Installation

`npm install --save imagekitio-vue`

Include the components in your code:

`import {IKContext} from "imagekitio-vue"`

## Usage

The library includes 3 Components: 
* [IKContext](#IKContext)

* [IKImage - URL generation](#ikimage---url-generation)

* [IKUpload - File upload](#ikupload---file-upload)

### IKContext

In order to use the SDK, you need to provide it with a few configuration parameters. The configuration parameters can be applied directly to the `Image` component or using an `IKContext` component. example:

```js
<IKContext 
  publicKey="your_public_api_key"
  urlEndpoint="<https://ik.imagekit.io/your_imagekit_id>">
    <IKImage src="<full_image_url_from_db>"/>
</IKContext>
```

`publicKey` and `urlEndpoint` are mandatory parameters for SDK initialization.
`authenticationEndpoint` is essential if you want to use the SDK for client-side uploads.
`transformationPosition` is optional. The default value for this parameter is `path`. Acceptable values are `path` & `query`

_Note: Do not include your Private Key in any client-side code, including this SDK or its initialization. If you pass the `privateKey` parameter while initializing this SDK, it throws an error_

### IKImage - URL generation

The image component defines an IKImage tag. Example usage:

#### Using image path and image hostname or endpoint

```js
<IKImage
  publicKey="your_public_api_key"
  urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
  path="/path_to_file"/>
```

#### Using full image URL  

```js
<IKImage 
  publicKey="your_public_api_key"
  urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
  src="<full_image_url_from_db>"/>'
```

#### Supported options:

| Option           | Description                    |
| :----------------| :----------------------------- |
| urlEndpoint      | Optional. The base URL to be appended before the path of the image. If not specified, the URL Endpoint specified at the time of SDK initialization is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| path             | Conditional. This is the path at which the image exists. For example, `/path/to/image.jpg`. Either the `path` or `src` parameter need to be specified for URL generation. |
| src              | Conditional. This is the complete URL of an image already mapped to ImageKit. For example, `https://ik.imagekit.io/your_imagekit_id/endpoint/path/to/image.jpg`. Either the `path` or `src` parameter need to be specified for URL generation. |
| transformation   | Optional. An array of objects specifying the transformation to be applied in the URL. The transformation name  and the value should be specified as a key-value pair in the object. Different steps of a [chained transformation](https://docs.imagekit.io/features/image-transformations/chained-transformations) can be specified as different objects of the array. The complete list of supported transformations in the SDK and some examples of using them are given later. If you use a transformation name that is not specified in the SDK, it gets applied as it is in the URL. |
| transformationPostion | Optional. The default value is `path` that places the transformation string as a path parameter in the URL. It can also be specified as `query` which adds the transformation string as the query parameter `tr` in the URL. If you use `src` parameter to create the URL, then the transformation string is always added as a query parameter. |
| queryParameters  | Optional. These are the other query parameters that you want to add to the final URL. These can be any query parameters and not necessarily related to ImageKit. Especially useful if you want to add some versioning parameter to your URLs. |


#### List of supported transformations

The complete list of transformations supported and their usage in ImageKit can be found [here](https://docs.imagekit.io/features/image-transformations). The SDK gives a name to each transformation parameter, making the code simpler and readable. If a transformation is supported in ImageKit, but a name for it cannot be found in the table below, then use the transformation code from ImageKit docs as the name when using in the `url` function.

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

#### Applying Transforms
```js

<IKImage
  publicKey="your_public_api_key"
  urlEndpoint="https://ik.imagekit.io/gqyojxcwzxj/"
  src="<full_image_url_from_db>"
  v-bind:transformation="[{height:300,width:400}]" />
```
The above image will apply transformation of width = 90 and height = 180 on the image. Since some transformatinos are destructive you might want to control the order in which the transforms are applied.

##### Chained Transforms
Chained transforms make it easy to specify the order the transform are applied. example: 

```js
<IKImage
  publicKey="your_public_api_key"
  urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
  src="<full_image_url_from_db>"
  v-bind:transformation="[{height:300,width:400},{rotation:90}]" />
```
In the above case, rotation will be performed first and resizing according to width and aspect ratio will be performed afterwards.

#### Low-Quality Image Placeholders (LQIP) for images
The SDK supports automatic support for LQIP for your images if you set lqip to true in the image component. example:

```js 
<IKImage
  publicKey="your_public_api_key"
  urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
  v-bind:lqip="{active:true,threshold:20}" />
```

`active` tells the status for lqip. It can be either, `true` or `false`.
`threshold` decides the quality of the placeholder image. It can be any numeric value, a low number means low quality, and a high number means high quality.

##### How does the lqip work?
The component tries to keep it simple. It loads a lower quality image using the quality parameter to load a lower quality image, which is then replaced with the actual quality image later.

### IKUpload - File Upload
The SDK provides a simple Component to upload files to the ImageKit Media Library. It accepts `fileName` parameter as a prop. The file parameter is provided as an input from the user. 

Also, make sure that you have specified `authenticationEndpoint` during SDK initialization. The SDK makes an HTTP GET request to this endpoint and expects a JSON response with three fields i.e. `signature`, `token` and `expire`.  

[Learn how to implement authenticationEndpoint](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#how-to-implement-authenticationendpoint-endpoint) on your server.

An example of this server is provided in the samples folder of the SDK.

Sample Usage
```js
<IKContext
  publicKey="your_public_api_key"
  urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
  authenticationEndpoint="http://www.yourserver.com/auth">
    <IKUpload fileName="your_desired_filename"/>
</IKContext>
```

`IKUpload` component accepts all the parameters supported by the [ImageKit Upload API](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#request-structure-multipart-form-data) e.g. `tags`, `useUniqueFileName`, `folder` etc.

You can also use `onSuccess` and `onError` callbacks to handle success and falure respectively, you can simply pass your custom functions to handle the response from API.

```js
template: `<IKContext publicKey="${publicKey}" urlEndpoint="https://ik.imagekit.io/your_imagekit_id" authenticationEndpoint="http://www.yourserver.com/auth"><IKUpload fileName="your_desired_filename" :onError="onError" :onSuccess = "onSuccess" /></IKContext>`,

methods: {
    onError(err) {
    console.log(err);
  }, onSuccess(res) {
    console.log(res);
  }},
```

## Demo Application
The fastest way to get started is by running the demo application. You can run the code locally. The source code is in [samples/sample-app](/samples/sample-app). For the instructions in [readme.md](https://github.com/imagekit-developer/imagekit-vuejs/blob/master/samples/sample-app/README.md) file within [samples/sample-app](/samples/sample-app) folder.

## Support

For any feedback or to report any issues or general implementation support please reach out to [support@imagekit.io](mailto:support@imagekit.io)

## Links
* [Documentation](https://docs.imagekit.io)
* [Main website](https://imagekit.io)

## License

Released under the MIT license.