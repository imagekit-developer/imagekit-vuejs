import { defineComponent } from 'vue';
import IKUpload from '../../src/components/IKUpload.vue';
import IKContext from '../../src/components/IKContext.vue';
export default {
  title: 'IKUpload',
};

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
const publicKey = process.env.VUE_APP_PUBLIC_KEY;
const authenticationEndpoint = process.env.VUE_APP_AUTHENTICATION_ENDPOINT;

export const ImageUpload = () => defineComponent({
  components: { IKUpload,IKContext },
  methods: {
    onError(err) {
    console.log(err);
  }, onSuccess(res) {
    console.log(res);
  }},
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}><IKUpload fileName="'new'" :onError="onError" :onSuccess = "onSuccess" publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}/></IKContext>`,
});

export const ImageUploadWithAllProps = () => defineComponent({
  components: { IKUpload,IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}><IKUpload fileName="'new'" v-bind:useUniqueFileName="true" v-bind:tags="['tag1', 'tag2', 'tag3']" v-bind:folder="'/'" v-bind:isPrivateFile="true" v-bind:customCoordinates="'0,0,0,0'" v-bind:responseFields="['tags', 'isPrivateFile', 'customCoordinates']" publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}/></IKContext>`,
});

export const ImageUploadWithNoTags = () => defineComponent({
  components: { IKUpload,IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}><IKUpload fileName="'new'" v-bind:useUniqueFileName="true" v-bind:folder="'/'" v-bind:isPrivateFile="true" v-bind:customCoordinates="'0,0,0,0'" v-bind:responseFields="['isPrivateFile', 'customCoordinates']" publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}/></IKContext>`,
});

export const ImageUploadWithNoCustomCoordinates = () => defineComponent({
  components: { IKUpload,IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}><IKUpload fileName="'new'" v-bind:useUniqueFileName="false" v-bind:tags="['tag1', 'tag2', 'tag3']" v-bind:folder="'/'" v-bind:isPrivateFile="false" v-bind:responseFields="['tags', 'isPrivateFile']" publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}/></IKContext>`,
});

export const ImageUploadNoAuthentication = () => defineComponent({
  components: { IKUpload,IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=""><IKUpload fileName="new" publicKey="${publicKey}" urlEndpoint=${urlEndpoint} authenticationEndpoint=${authenticationEndpoint}/></IKContext>`,
});

