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
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} :transformation="[{height:300,width:400}]"></IKImage>`,
});

export const imageWithTransformationPositionAsQuery = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :transformation="[{height:300,width:400}]" :transformationPosition="'query'"></IKImage>`,
});

export const imageWithTransformationPositionAsPathPassingSrc = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} :transformation="[{height:300,width:400}]" :transformationPosition="'path'"></IKImage>`,
});

export const imageWithChainedTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} :transformation="[{height:300,width:400},{rotation:90}]"></IKImage>`,
});

export const imageWithoutExistingTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} :transformation="[{foo:'bar'}]"></IKImage>`,
});

export const imageWithNonExistingTransformationWithExistingTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} :transformation="[{height:300,foo:'bar'}]"></IKImage>`,
});
