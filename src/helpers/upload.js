import ImageKit from 'imagekit-javascript';
const pjson = require('../../package.json');

export const uploadImage = ({ e, file, fileName, useUniqueFileName, tags, folder, isPrivateFile, customCoordinates, responseFields, publicKey, urlEndpoint, authenticationEndpoint, onError, onSuccess }) => {


  if (!publicKey) {
    throw new Error("Missing publicKey during initialization");
  }

  if (!urlEndpoint) {
    throw new Error("Missing urlEndpoint during initialization");
  }

  if (!authenticationEndpoint) {
    throw new Error("Missing authenticationEndpoint during initialization");
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

  const ik = new ImageKit({
    sdkVersion : `vuejs-${pjson.version}`,
    publicKey: publicKey,
    urlEndpoint: newUrlEndpoint,
    authenticationEndpoint: authenticationEndpoint
  });

  const params = {
    file: file,
    fileName: fileName,
    useUniqueFileName: useUniqueFileName,
    isPrivateFile: isPrivateFile,
    folder: folder,
  }
  if (tags) {
    Object.assign(params, { tags: tags });
  }

  if (customCoordinates) {
    Object.assign(params, { customCoordinates: customCoordinates });
  }

  if (responseFields) {
    Object.assign(params, { responseFields: responseFields });
  }

  ik.upload(params
    , function (err, result) {
      if (err) {
        onError(err);
      } else {
        onSuccess(result);
      }
    });
}
