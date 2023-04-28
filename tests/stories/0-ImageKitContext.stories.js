import { defineComponent } from 'vue';
import IKImage from '../../src/components/IKImage.vue';
import IKContext from '../../src/components/IKContext.vue';

export default {
  title: 'IKContext',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;
const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
const path = "/default-image.jpg";
const src = `${urlEndpoint}/${path}`;

export const imageWithContext = () => defineComponent({
  components: { IKImage, IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint}><IKImage urlEndpoint=${urlEndpoint} src=${src}/></IKContext>`,
});

export const OverridingUrlParameter = () => defineComponent({
  components: { IKImage, IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint}><IKImage path="${path}" urlEndpoint=${urlEndpoint}></IKImage></IKContext>`,
});
