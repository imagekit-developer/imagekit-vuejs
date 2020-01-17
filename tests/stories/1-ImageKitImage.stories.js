import IKImage from '../../src/components/IKImage.vue';

export default {
  title: 'IKImage',
};

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
const publicKey = process.env.VUE_APP_PUBLIC_KEY;
const path = "default-image.jpg";
const src = `${urlEndpoint}${path}`;

export const imageWithSrc = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src}/>`,
});

export const imageWithPath = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path}/>`,
});

export const imageWithLQIP = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:lqip="{active:true,threshold:20}"/>`,
});

export const imageWithNoPublicKey = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="" urlEndpoint=${urlEndpoint} src=${src}/>`,
});

export const imageWithNoUrlEndpoint = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint="" src=${src}/>`,
});
