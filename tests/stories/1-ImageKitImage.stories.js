import IKImage from '../../src/components/IKImage.vue';

export default {
  title: 'IKImage',
};

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
const publicKey = process.env.VUE_APP_PUBLIC_KEY;

export const imageWithSrc = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src="https://ik.imagekit.io/gqyojxcwzxj/ABC_BV8lzpfOS"/>`,
});

export const imageWithPath = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path="/ABC_BV8lzpfOS"/>`,
});

export const imageWithLQIP = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src="https://ik.imagekit.io/gqyojxcwzxj/ABC_BV8lzpfOS" v-bind:lqip="{active:true,threshold:20}"/>`,
});

export const imageWithNoPublicKey = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="" urlEndpoint=${urlEndpoint} src="https://ik.imagekit.io/gqyojxcwzxj/ABC_BV8lzpfOS"/>`,
});

export const imageWithNoUrlEndpoint = () => ({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint="" src="https://ik.imagekit.io/gqyojxcwzxj/ABC_BV8lzpfOS"/>`,
});
