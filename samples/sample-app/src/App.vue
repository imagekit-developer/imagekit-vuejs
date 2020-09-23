/* eslint-disable no-console */
<template>
  <div class="sample-app">
    <h1>Hi! This is an ImageKit Vue SDK Demo!</h1>

    <p>Let's add an Image using global component</p>
    <ik-image :src="src"></ik-image>

    <p>Transformation - height and width manipulation</p>
    <ik-image
      :src="src"
      :transformation="[{height:300,width:400}]"
    />

    <p>Chained transformation</p>
    <ik-image
       :path="path"
      :transformation="[{height:300,width:400},{rotation:90}]"
    />

    <p>Lazy loading image</p>
    <ik-image
      path="/default-image.jpg"
      :transformation="[{height:300,width:400},{rotation:90}]"
      loading="lazy"
    />

    <p>Progressive image loading wihtout lazy loading</p>
    <ik-image
      path="/default-image.jpg"
      :transformation="[{height:300,width:400},{rotation:90}]"
      :lqip="{active:true,threshold:20}"
    />

    <p>Progressive image loading with lazy loading</p>
    <ik-image
      path="/default-image.jpg"
      :transformation="[{height:300,width:400},{rotation:90}]"
      :lqip="{active:true,threshold:20}"
      loading="lazy"
    />

    <p>Using exported component</p>
    <IKImage
      :publicKey="publicKey"
      :urlEndpoint="urlEndpoint"
      :src="src"
    />

    <p>Adding a Image with Context</p>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint">
      <IKImage :path="path" :transformation="[{height:300,width:400}]" />
    </IKContext>

    <p>Upload</p>
    <IKContext
      :publicKey="publicKey"
      :urlEndpoint="urlEndpoint"
      :authenticationEndpoint="authenticationEndpoint"
    >
      <IKUpload
        :tags="['tag1','tag2']"
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
import { IKImage, IKContext, IKUpload } from "../../../src";

let path = "/default-image.jpg";

export default {
  name: "app",
  components: {
    IKImage,
    IKContext,
    IKUpload
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
