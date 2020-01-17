import IKImage from '../../src/components/IKImage.vue';

export default {
  title: 'Transformations',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;

let urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
if(urlEndpoint[urlEndpoint.length-1] === "/")
    urlEndpoint = urlEndpoint.slice(0,urlEndpoint.length-1);

let path = "/default-image.jpg";
  if(path[0] === "/")
    path = path.split("/")[1];

const src = `${urlEndpoint}/${path}`;

export const imageWithTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{height:300,width:400}]" />`,
});

export const imageWithChainedTransformation = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} v-bind:transformation="[{height:300,width:400},{rotation:90}]" />`,
});
