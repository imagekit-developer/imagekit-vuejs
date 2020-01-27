import ImageKit from 'imagekit-javascript';
const pjson = require('../../package.json');

export const generateUrl = ({publicKey, urlEndpoint, src, path, transformation}) => {

  if(!publicKey) {
    throw new Error("Missing publicKey during initialization");
  }

  if(!urlEndpoint) {
    throw new Error("Missing urlEndpoint during initialization");
  }

  const ik = new ImageKit({
    sdkVersion : `vuejs-${pjson.version}`,
    publicKey: publicKey,
    urlEndpoint: urlEndpoint,
  });

  if(path){
    return ik.url({path: path, transformation: transformation});
  } else {
    return ik.url({src: src, transformation: transformation});
  }
}
