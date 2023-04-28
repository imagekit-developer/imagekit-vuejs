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

export const videoWithTransformation = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :transformation="[{height: 300}, {width: 400}]"></IKVideo>`,
});

export const videoWithTransformationPosition = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} transformationPosition="${path}"></IKVideo>`,
});

export const videoWithFallbackSrc = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path="/non-existent-video.mp4" src=${src}></IKVideo>`,
});

export const videoWithPlaybackRates = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :playbackRates="[0.5, 1.0, 1.5]"></IKVideo>`,
});

export const videoWithLoop = () => defineComponent({
  components: { IKVideo },
  template: `<IKVideo publicKey="${publicKey}" urlEndpoint=${urlEndpoint} path=${path} :loop="true"></IKVideo>`,
});