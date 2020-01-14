# ImageKit.io Vue SDK

[![Node CI](https://github.com/imagekit-developer/imagekit-nodejs/workflows/Node%20CI/badge.svg)](https://github.com/imagekit-developer/imagekit-vuejs/)
[![npm version](https://img.shields.io/npm/v/imagekit-vue)](https://www.npmjs.com/package/imagekit-vuejs) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter Follow](https://img.shields.io/twitter/follow/imagekitio?label=Follow&style=social)](https://twitter.com/ImagekitIo)

Vue SDK for [ImageKit.io](https://imagekit.io) which implements client-side upload and URL generation for use inside a vue application.

ImageKit is a complete image optimization and transformation solution that comes with an [image CDN](https://imagekit.io/features/imagekit-infrastructure) and media storage. It can be integrated with your existing infrastructure - storages like AWS S3, web servers, your CDN and custom domain names, allowing you to deliver optimized images in minutes with minimal code changes.

## Installation

  `npm install --save imagekit-vue`

Include the components in your code:

  `import {IKContext} from "imagekit-vue"`

## Usage

The library includes 3 Components: 
* IKContext

* Image

* Upload

### IKContext

In order to use the SDK, you need to provide it with a few configuration parameters. The configuration parameters can be applied directly to the `Image` component or using an `IKContext` component. example:

```js
    template: <IKContext publicKey="your_public_api_key" urlEndpoint="<https://ik.imagekit.io/your_imagekit_id>"><IKImage src="<full_image_url_from_db>"/></IKContext>
```

`publicKey` and `urlEndpoint` are mandatory parameters for SDK initialization.
`authenticationEndpoint` is essential if you want to use the SDK for client-side uploads.
`transformationPosition` is optional. The default value for the parametere is `path`. Acceptable values are `path` & `query`

_Note: Do not include your Private Key in any client side code, including this SDK or its initialization. If you pass the `privateKey` parameter while initializing this SDK, it throws an error_

### Image

The image component component defines a ImageKit Image tag. example usage:

#### Using image path and image hostname or endpoint

```js
  template: '<IKImage publicKey="your_public_api_key" urlEndpoint="https://ik.imagekit.io/your_imagekit_id" path="/path_to_file"/>'

  ```
#### Using full image URL  

  ```js
  template: '<IKImage publicKey="your_public_api_key" urlEndpoint="https://ik.imagekit.io/your_imagekit_id" src="<full_image_url_from_db>"/>'
  ```
  
`src` is the complete URL that is already mapped to ImageKit.
`path` is the location of the image in the ImageKit cloud. `urlEndpoint` + `path` makes the complete url.
`transformations` is optional. The transformations to be applied to a given image. It is declared in the form of an array of objects, where each object specifies the transformation you need. The values are mentioned below.

#### List of supported transformations

The complete list of transformations supported and their usage in ImageKit can be found [here](https://docs.imagekit.io/imagekit-docs/image-transformations). The SDK gives a name to each transformation parameter, making the code simpler and readable. If a transformation is supported in ImageKit, but a name for it cannot be found in the table below, then use the transformation code from ImageKit docs as the name when using in the `url` function.

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

template: '<IKImage publicKey="your_public_api_key" urlEndpoint="https://ik.imagekit.io/gqyojxcwzxj/" src="<full_image_url_from_db>" v-bind:transformation="[{height:300,width:400}]" />'
```
The above image will apply transformation of width = 90 and height = 180 on the image. Since some transformatinos are destructive you might want to control the order in which the transforms are applied.

##### Chained Transforms
Chained transforms make it easy to specify the order the transform are applied. example: 

```js
template: '<IKImage publicKey="your_public_api_key" urlEndpoint="https://ik.imagekit.io/your_imagekit_id" src="<full_image_url_from_db>" v-bind:transformation="[{height:300,width:400},{rotation:90}]"
```
In the above case, rotation will be performed first and resizing according to width and aspect ratio will be performed afterwards.

#### Low Quality Image Placeholders (LQIP) for images
The SDK supports automatic support for LQIP for your images, if you set lqip to true in the image component. example:

  ```js 
  <IKImage publicKey="your_public_api_key" urlEndpoint="https://ik.imagekit.io/your_imagekit_id" v-bind:lqip="{active:true,threshold:20}"/>
  ```
`active` tells the status for lqip, it can be either, `true` or `false`
`threshold` decided the quaility of placeholder image. It can be any numeric value, a low number means low quality, and high number means high quality.

##### How does the lqip work?
The component tries to keep the it simple, it loads a lower quality image using the quality parameter to load a lower quality image, which is then replaced with the actual quality image later.

#### File Upload
The SDK provides a simple Component to upload files to the ImageKit Media Library. It accepts `fileName` parameter as a prop. The file parameter is provided as an input from the user. Additionally, this method uses the `authenticationEndpoint` that is specified at the time of SDK initialization. Client-side file upload requires a token, expiry timestamp and signature, and these values can be safely generated on the server-side using your ImageKit account's private key.

The SDK issues a GET request to the authentication endpoint provided and the endpoint must respond with a JSON object with the values for `token`, `signature` and `expire`.

For example, you can use ImageKit's NodeJS SDK which implements the `getAuthenticationParameters` method to create a simple API endpoint like this on your server and provide the API endpoint as the `authenticationEndpoint` parameter.

An example of this server is provided in the samples folder of the SDK.

Sample Usage
```js
 template: '<IKContext publicKey="your_public_api_key" urlEndpoint="https://ik.imagekit.io/your_imagekit_id" authenticationEndpoint="http://www.yourserver.com/auth"><IKUpload fileName="your_desired_filename"/></IKContext>'
```
The SDK provides a simple interface using the .upload() method to upload files to the ImageKit Media Library. It accepts all the parameters supported by the [ImageKit Upload API](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#request-structure-multipart-form-data).
