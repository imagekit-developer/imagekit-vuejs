import IKImage from '../../src/components/IKImage.vue';
import IKContext from '../../src/components/IKContext.vue';
export default {
  title: 'IKContext',
};


const urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
const publicKey = process.env.VUE_APP_PUBLIC_KEY;
const src = "https://ik.imagekit.io/mindship/default-image.jpg";

export const imageWithContext = () => ({
  components: { IKImage, IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint}><IKImage src="${src}"/></IKContext>`,
});


