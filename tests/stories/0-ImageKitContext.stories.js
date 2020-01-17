import IKImage from '../../src/components/IKImage.vue';
import IKContext from '../../src/components/IKContext.vue';
export default {
  title: 'IKContext',
};

const publicKey = process.env.VUE_APP_PUBLIC_KEY;

let urlEndpoint = process.env.VUE_APP_URL_ENDPOINT;
if(urlEndpoint[urlEndpoint.length-1] === "/")
    urlEndpoint = urlEndpoint.slice(0,urlEndpoint.length-1);

let path = "/default-image.jpg";
  if(path[0] === "/")
    path = path.split("/")[1];

const src = `${urlEndpoint}/${path}`;

export const imageWithContext = () => ({
  components: { IKImage, IKContext },
  template: `<IKContext publicKey="${publicKey}" urlEndpoint=${urlEndpoint}><IKImage src="${src}"/></IKContext>`,
});


