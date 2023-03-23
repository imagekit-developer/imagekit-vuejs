import { defineComponent, h } from 'vue';
import IKImage from '../../src/components/IKImage.vue';

export default {
  title: 'Transformations',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;
const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
const path = "default-image.jpg";
const src = `${urlEndpoint}/${path}`;

export const imageWithTransformation = defineComponent({
  components: { IKImage },
  render() {
    return h(IKImage, {
      publicKey: publicKey,
      urlEndpoint: urlEndpoint,
      src: src,
      transformation: [{ height: 300, width: 400 }]
    });
  }
});

export const imageWithTransformationPositionAsQuery = defineComponent({
  components: { IKImage },
  render() {
    return h(IKImage, {
      publicKey: publicKey,
      urlEndpoint: urlEndpoint,
      path: path,
      transformation: [{ height: 300, width: 400 }],
      transformationPosition: 'query'
    });
  }
});

export const imageWithTransformationPositionAsPathPassingSrc = defineComponent({
  components: { IKImage },
  render() {
    return h(IKImage, {
      publicKey: publicKey,
      urlEndpoint: urlEndpoint,
      src: src,
      transformation: [{ height: 300, width: 400 }],
      transformationPosition: 'path'
    });
  }
});

export const imageWithChainedTransformation = defineComponent({
  components: { IKImage },
  render() {
    return h(IKImage, {
      publicKey: publicKey,
      urlEndpoint: urlEndpoint,
      src: src,
      transformation: [{ height: 300, width: 400 }, { rotation: 90 }]
    });
  }
});

export const imageWithoutExistingTransformation = defineComponent({
  components: { IKImage },
  render() {
    return h(IKImage, {
      publicKey: publicKey,
      urlEndpoint: urlEndpoint,
      src: src,
      transformation: [{ foo: 'bar' }]
    });
  }
});

export const imageWithNonExistingTransformationWithExistingTransformation = defineComponent({
  components: { IKImage },
  render() {
    return h(IKImage, {
      publicKey: publicKey,
      urlEndpoint: urlEndpoint,
      src: src,
      transformation: [{ height: 300, foo: 'bar' }]
    });
  }
});
