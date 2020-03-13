import ImageKit from 'imagekit-javascript';
const pjson = require('../../package.json');
import { parseURL } from '../utils/urlParser.js';

export const generateUrl = ({publicKey, urlEndpoint, src, path, transformation, transformationPosition, queryParameters}) => {

  if(!publicKey) {
    throw new Error("Missing publicKey during initialization");
  }

  if(!urlEndpoint) {
    throw new Error("Missing urlEndpoint during initialization");
  }

  let newUrlEndpoint = urlEndpoint;

  if(urlEndpoint) {
    const url_params = parseURL(urlEndpoint);
    let {protocol, host, pathname } = url_params;
    pathname = pathname.slice(1);
    let leadingSlashes = pathname.match("\/+");
    if(leadingSlashes){
      pathname = pathname.replace(leadingSlashes[0],'/');
      newUrlEndpoint = `${protocol}//${host}/${pathname}`;
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
    return ik.url({path: newPath, transformation: transformation, transformationPosition: transformationPosition? transformationPosition: "path", queryParameters: queryParameters});
  } else {
    return ik.url({src: src, transformation: transformation, transformationPosition: "query", queryParameters: queryParameters});
  }
}
