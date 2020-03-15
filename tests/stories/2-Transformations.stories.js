import IKImage from '../../src/components/IKImage.vue';

export default {
  title: 'Transformations',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;

const path = "default-image.jpg";

const src = `${urlEndpoint}/${path}`;

export const imageWithTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{height:300,width:400}]" />`,
});

export const imageWithTransformationPositionAsQuery = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} v-bind:transformation="[{height:300,width:400}]" :transformationPosition="'query'" />`,
});

export const imageWithTransformationPositionAsPathPassingSrc = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{height:300,width:400}]" :transformationPosition="'path'" />`,
});

export const imageWithChainedTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{height:300,width:400},{rotation:90}]" />`,
});

export const imageWithonExistingTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{foo:'bar'}]" />`,
});

export const imageWithNonExistingTransformationWithExistingTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{height:300,foo:'bar'}]" />`,
});
