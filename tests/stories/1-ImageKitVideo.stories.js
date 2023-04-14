import { defineComponent } from 'vue';
import IKVideo from '../../src/components/IKVideo.vue';

export default {
  title: 'IKVideo',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;

const path = "sample-video.mp4";

const src = `${urlEndpoint}/${path}`;

// let nestedImagePath = "/sample-folder/default-image.jpg";

export const videoWithSrc = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src=${src}></IKVideo>`,
});

export const videoWithPath = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path}></IKVideo>`,
});

export const videoWithQueryParameters = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :queryParameters="{version:5, name: 'check'}"></IKVideo>`,
});

export const videoWithSrcQueryParameters = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} src="${src}?foo=bar" :queryParameters="{version:5, name: 'check'}"></IKVideo>`,
});

export const videoWithTrailingSlashesInUrlEndpoint = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint="https://ik.imagekit.io/your_imagekit_id////" path=${path}></IKVideo>`,
});

export const videoWithLeadingSlashesInPath = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${`////${path}`}></IKVideo>`,
});