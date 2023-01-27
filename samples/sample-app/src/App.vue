/* eslint-disable no-console */
<template>
  <div class="sample-app">
    <h1>Hi! This is an ImageKit Vue SDK Demo!</h1>

    <p>Let's add an Image using global component</p>
    <ik-image :src="'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'"></ik-image>

    <p>Transformation - height and width manipulation</p>
    <ik-image
      :src="'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'"
      :transformation="[{height:300,width:400}]"
    />

    <p>Chained transformation</p>
    <ik-image
      :src="'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'"
      :transformation="[{height:300,width:400},{rotation:90}]"
    />

    <p>lazyLoading stop</p>
    <ik-image
      :src="'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'"
      :transformation="[{height:300,width:400},{rotation:90}]"
    />

    <p>Lazy loading image</p>
    <ik-image
      class="lazyload"
      src="'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'"
      :transformation="[{height:200,width:200}]"
      loading="lazy"
    />

    <p>Progressive image loading wihtout lazy loading</p>
    <ik-image
      class="lqip"
      path="'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'"
      :transformation="[{height:200,width:200}]"
      :lqip="{active:true,threshold:20}"
    />

    <p>Progressive image loading with lazy loading</p>
    <ik-image
      class="lazyload-lqip"
      path="'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'"
      :transformation="[{height:200,width:200}]"
      :lqip="{active:true,threshold:20,quality:20,blur:30}"
      loading="lazy"
    />

    <p>Using exported component</p>
    <IKImage
      :publicKey="publicKey"
      :urlEndpoint="urlEndpoint"
      :src="'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'"
    />

    <p>Adding a Image with Context</p>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint">
      <IKImage :path="path" :transformation="[{height:300,width:400}]" />
    </IKContext>

    <p>Let's add an Video using global component</p>
    <ik-video
      :src="'https://ik.imagekit.io/demo/sample-video.mp4'"
      :transformation="[{height:300,width:400},{rotation:180}]"
    />

    <p>Adding a Video with Context</p>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint">
      <IKVideo
        :src="'https://ik.imagekit.io/demo/sample-video.mp4'"
        :transformation="[{height:400,width:400}]"
      />
    </IKContext>

    <p>Using exported component</p>
    <IKVideo
      :urlEndpoint="urlEndpoint"
      :src="'https://ik.imagekit.io/demo/sample-video.mp4'"
      :transformation="[{height:300,width:400}]"
    />

    <p>File upload</p>
      <ik-upload 
        :tags="['tag1','tag2']"
        :responseFields="['tags']"
        :onError="onError"
        :onSuccess="onSuccess"
        :validateFile="validateFile"
        customCoordinates="10,10,100,100"
      />
    
    <p>Upload using exported component</p>
    <IKContext
      :publicKey="publicKey"
      :urlEndpoint="urlEndpoint"
      :authenticationEndpoint="authenticationEndpoint"
    >
      <IKUpload
        :tags="['tag3','tag4']"
        :responseFields="['tags']"
        :onError="onError"
        :onSuccess="onSuccess"
        :useUniqueFileName=true
        :isPrivateFile=false
        customCoordinates="10,10,100,100"
      />
    </IKContext>
    <p>To use this funtionality please remember to setup the backend server</p>
  </div>
</template>

<script>
import Vue from 'vue';
// import ImageKit, { IKImage, IKContext, IKUpload } from "imagekitio-vue"
import ImageKit, { IKImage, IKContext, IKUpload, IKVideo } from "../../../src/index"

Vue.use(ImageKit, {
  urlEndpoint: process.env.VUE_APP_URL_ENDPOINT,
  publicKey: process.env.VUE_APP_PUBLIC_KEY,
  authenticationEndpoint: process.env.VUE_APP_AUTHENTICATION_ENDPOINT
})

let path = "'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg'";

export default {
  name: "app",
  components: {
    IKImage,
    IKContext,
    IKUpload,
    IKVideo,
  },
  data() {
    return {
      urlEndpoint: process.env.VUE_APP_URL_ENDPOINT,
      publicKey: process.env.VUE_APP_PUBLIC_KEY,
      authenticationEndpoint: process.env.VUE_APP_AUTHENTICATION_ENDPOINT,
      path: path,
      src: `${process.env.VUE_APP_URL_ENDPOINT}/${path}`
    };
  },
  methods: {
    onError(err) {
      console.log("Error");
      console.log(err);
    },
    onSuccess(res) {
      console.log("Success");
      console.log(res);
    },
    validateFile(res) {
      console.log(res);
      if(res.size > 0) {
        return true
      }
      return false
    }
  }
};
</script>

<style>
.sample-app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px; 
}

img {
  min-height: 400px;
}
</style>
