<template>
  <div class="sample-app">
    <p>IK Image component</p>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 200, width: 200 }, { rotation: 360 }]"
      :lqip="{ active: true, threshold: 20, quality: 20, blur: 30 }" loading="lazy" />

    <p>Lazy loading</p>
    <!-- tr:h-200,w-200/default-image.jpg -->
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 200, width: 200 }]" loading="lazy"
      class="lazyload" />

    <p>Lazyload with LQIP</p>
    <!-- tr:h-200,w-200:q-20,bl-30/default-image.jpg -->
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 200, width: 200 }]"
      :lqip="{ active: true, threshold: 20, quality: 20, blur: 30 }" loading="lazy" class="lazyload-lqip" />

    <p>With LQIP</p>
    <!-- tr:h-200,w-200:q-20,bl-30/default-image.jpg -->
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 200, width: 200 }]"
      :lqip="{ active: true, threshold: 20, quality: 20, blur: 30 }" class="lqip" />


    <p>IK Image with context</p>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint">
      <template v-slot:default>
        <IKImage :path="path" :transformation='[{ height: 300, width: 400 }]' />
      </template>
    </IKContext>

    <p>Using exported component</p>
    <IKVideo class="ikvideo-default" :urlEndpoint="urlEndpoint" :src="'https://ik.imagekit.io/demo/sample-video.mp4'"
      :transformation="[{ height: 200, width: 200 }]" />

    <p>Video with some advance transformation</p>
    <IKVideo class="ikvideo-with-tr" :urlEndpoint="urlEndpoint" :src="'https://ik.imagekit.io/demo/sample-video.mp4'"
      :transformation="[{ height: 200, width: 600, b: '5_red', q: 95 }]" />

    <p>File upload</p>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint" :authenticator="authenticator">
      <IKUpload ref="childComponentRef" :tags="['tag1', 'tag2']" class="file-upload-ik"
        :responseFields="['tags']" :onError="onError" :onSuccess="onSuccess" :onUploadStart="onUploadStart" :onUploadProgress="onUploadProgress"
        :validateFile="validateFile" customCoordinates="10,10,100,100" />
      <p>Your above uploaded file will appear here </p>
      <IKImage :src="uploadedImageSource" :transformation='[{ height: 200, width: 200 }]' class="uploaded-img-ik"/>
    </IKContext>
    <button @click="abortChildUpload">Abort Child Upload</button>
  </div>
</template>

<script>

import ImageKit, { IKImage, IKUpload, IKContext, IKVideo, } from 'imagekitio-vue'
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: process.env.VUE_APP_URL_ENDPOINT,
  publicKey: process.env.VUE_APP_PUBLIC_KEY,
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
      path,
      src: `${process.env.VUE_APP_URL_ENDPOINT}/${path}`,
      uploadedImageSource: ''
    };
  },
  methods: {
    onError(err) {
      try {
        console.log("Error");
        console.log(err);
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess(res) {
      try {
        console.log("Success");
        console.log(res);
        this.uploadedImageSource = res.url
      } catch (e) {
        console.error(e);
      }
    },
    validateFile(res) {
      if (res.size > 0) {
        return true;
      }
      return false;
    },
    onUploadStart(event) {
      console.log("Upload started");
      console.log(event);
    },
    onUploadProgress(event) {
      console.log(`Upload inprogress ... (${(event.loaded*100/event.total).toFixed(2)}% Done)`)
      console.log(event)
    },
    abortChildUpload() {
      this.$refs.childComponentRef.triggerAbortUpload();
      console.log("Upload aborted")
    },
    authenticator(){
      return new Promise((resolve, reject) => {
        var url = process.env.VUE_APP_AUTHENTICATION_ENDPOINT;

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
    }
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
