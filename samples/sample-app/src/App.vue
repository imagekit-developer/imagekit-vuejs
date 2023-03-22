<template>
  <div class="sample-app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <p>IK Image component</p>
    <IKImage
      :urlEndpoint="urlEndpoint"
      :publicKey="publicKey"
      :path = "path"
      :transformation="[{height:300,width:400},{rotation:360}]"
    />
  
    <p>IK Image with context</p>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint">
      <template v-slot:default>
        <IKImage :path="path" :transformation='[{height:300,width:400}]' :urlEndpoint="urlEndpoint"/>
      </template>
    </IKContext>
    
    <p>Using exported component</p>
      <IKVideo
        :urlEndpoint="urlEndpoint"
        :src="'https://ik.imagekit.io/demo/sample-video.mp4'"
        :transformation="[{height:300,width:400,q:50}]"
      />

    <p>File upload2</p>
      <IKUpload
        :urlEndpoint="urlEndpoint"
        :publicKey="publicKey"
        :authenticationEndpoint="authenticationEndpoint"
        :tags="['tag1','tag2']"
        :responseFields="['tags']"
        :onError="onError"
        :onSuccess="onSuccess"
        customCoordinates="10,10,100,100"
      />
  </div>
</template>

<script>

// import ImageKit, { IKImage, IKContext, IKVideo, IKUpload } from '../../../src/index'
import ImageKit, { IKImage, IKUpload, IKContext, IKVideo, } from 'imagekitio-vue'
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: process.env.VUE_APP_URL_ENDPOINT,
  publicKey: process.env.VUE_APP_PUBLIC_KEY,
  authenticationEndpoint: process.env.VUE_APP_AUTHENTICATION_ENDPOINT
})

let path = "/default-image.jpg";

export default {
  name: 'App',
  components: {
    IKImage,
    IKContext,
    IKVideo,
    IKUpload,
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
    // validateFile(res) {
    //   console.log("---res",res);
    //   if(res.size > 0) {
    //     return true
    //   }
    //   return false
    // },
    // onUploadStart(event) {
    //   console.log("---res",event);
    //   console.log(event.target.value);
    // }
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
