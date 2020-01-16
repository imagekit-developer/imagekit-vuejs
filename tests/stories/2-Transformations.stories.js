import IKImage from '../../src/components/IKImage.vue';

export default {
  title: 'Transformations',
};

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
const publicKey = process.env.VUE_APP_PUBLIC_KEY;
const src = "https://ik.imagekit.io/mindship/default-image.jpg";

export const imageWithTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{height:300,width:400}]" />`,
});

export const imageWithChainedTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{height:300,width:400},{rotation:90}]" />`,
});
