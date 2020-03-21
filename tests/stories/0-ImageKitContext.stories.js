import IKImage from '../../src/components/IKImage.vue';
import IKContext from '../../src/components/IKContext.vue';
export default {
  title: 'IKContext',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;

const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;

const path = "/default-image.jpg";

export const imageWithContext = () => ({
  components: { IKImage, IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint}><IKImage path="${path}"></IKImage></IKContext>`,
});

export const OverridingUrlParameter = () => ({
  components: { IKImage, IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint}><IKImage path="${path}" urlEndpoint='https://ik.imagekit.io/utkace/'></IKImage></IKContext>`,
});


