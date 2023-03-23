import { defineComponent } from 'vue';
import IKImage from '../../src/components/IKImage.vue';

export default {
  title: 'IKImage',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;

const path = "default-image.jpg";

const src = `${urlEndpoint}/${path}`;

let nestedImagePath = "/sample-folder/default-image.jpg";

export const imageWithSrc = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src}></IKImage>`,
});

export const imageWithPath = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path}></IKImage>`,
});

export const imageWithQueryParameters = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :queryParameters="{version:5, name: 'check'}"></IKImage>`,
});

export const imageWithSrcQueryParameters = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src="${src}?foo=bar" :queryParameters="{version:5, name: 'check'}"></IKImage>`,
});

export const imageWithTrailingSlashesInUrlEndpoint = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint="https://ik.imagekit.io/your_imagekit_id////" path=${path}></IKImage>`,
});

export const imageWithLeadingSlashesInPath = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${`////${path}`}></IKImage>`,
});

export const imageWithLQIPWithSrcWithNoTransformation = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} :lqip="{active:'true',threshold:20}"></IKImage>`,
});

export const imageWithLQIPWithSrcWithTransformation = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src} :lqip="{active:'true',threshold:20}" :transformation="[{height:300,width:400}]"></IKImage>`,
});


export const imageWithLQIPWithPathWithNoTransformation = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :lqip="{active:'true',threshold:20}"></IKImage>`,
});

export const imageWithLQIPWithPathWithTransformation = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :lqip="{active:'true',threshold:20}" :transformation="[{height:300,width:400}]"></IKImage>`,
});

export const imageWithLQIPWithNestedPath = () => defineComponent({
  components: { IKImage },
  template: `<IKImage publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${nestedImagePath} :lqip="{active:'true',threshold:20}" :transformation="[{height:300,width:400}]"></IKImage>`,
});