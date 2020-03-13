import IKImage from '../../src/components/IKImage.vue';

export default {
  title: 'IKImage',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;

const path = "default-image.jpg";

const src = `${urlEndpoint}${path}`;

const srcWithQuery = `${src}?foo=bar`;

export const imageWithSrc = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src}/>`,
});

export const imageWithPath = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path}/>`,
});

export const imageWithQueryParameters = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :queryParameters="{version:5, name: 'check'}"/>`,
});

export const imageWithSrcQueryParameters = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src="${src}?foo=bar" :queryParameters="{version:5, name: 'check'}"/>`,
});

export const imageWithLeadingSlashesInUrlEndpoint = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint="https://ik.imagekit.io/mindship////" path=${path}/>`,
});

export const imageWithTrailingSlashesInPath = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${`////${path}`}/>`,
});

export const imageWithLQIP = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} :lqip="{active:'true',threshold:20}"/>`,
});

export const imageWithNoPublicKey = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="" urlEndpoint=${urlEndpoint} src=${src}/>`,
});

export const imageWithNoUrlEndpoint = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint="" src=${src}/>`,
});
