import ImageKit from 'imagekit-javascript';
const pjson = require('../../package.json');

export const generateUrl = ({publicKey, urlEndpoint, src, path, transformation}) => {

  if(!publicKey) {
    throw new Error("Missing publicKey during initialization");
  }

  if(!urlEndpoint) {
    throw new Error("Missing urlEndpoint during initialization");
  }

  let newUrlEndpoint = urlEndpoint;

  if(urlEndpoint) {
    let pathInEndpoint = urlEndpoint.replace('https://ik.imagekit.io/','');
    let leadingSlashes = pathInEndpoint.match("\/+");
    if(leadingSlashes){
      pathInEndpoint = pathInEndpoint.replace(leadingSlashes[0],'/');
      newUrlEndpoint = "https://ik.imagekit.io/" + pathInEndpoint;
    }
  }

  let newPath = path;

  if(path) {
    let trailingSlashes = newPath.match("\/+");
    if(trailingSlashes){
      newPath = newPath.replace(trailingSlashes[0],'/');
    }
  }

  const ik = new ImageKit({
    sdkVersion : `vuejs-${pjson.version}`,
    publicKey: publicKey,
    urlEndpoint: newUrlEndpoint,
  });

  if(path){
    return ik.url({path: newPath, transformation: transformation});
  } else {
    return ik.url({src: src, transformation: transformation});
  }
}
