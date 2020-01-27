import ImageKit from 'imagekit-javascript';
const pjson = require('../../package.json');

export const uploadImage = ({ e, file, fileName, useUniqueFileName, tags, folder, isPrivateFile, customCoordinates, responseFields, publicKey, urlEndpoint, authenticationEndpoint }) => {


  if (!publicKey) {
    throw new Error("Missing publicKey during initialization");
  }

  if (!urlEndpoint) {
    throw new Error("Missing urlEndpoint during initialization");
  }

  if (!authenticationEndpoint) {
    throw new Error("Missing authenticationEndpoint during initialization");
  }

  let onError = (e, err) => {
    e.insertAdjacentHTML(
      "afterend",
      `<div>${err}</div>`
    );
  };

  let onSuccess = (e) => {
    e.insertAdjacentHTML(
      "afterend",
      `<div>Image Uploaded</div>`
    );
  };

  const ik = new ImageKit({
    sdkVersion : `vuejs-${pjson.version}`,
    publicKey: publicKey,
    urlEndpoint: urlEndpoint,
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
        onError(e, err);
      } else {
        onSuccess(e);
      }
    });
}
