import ImagePicker from 'react-native-image-crop-picker';

class MediaProvider {
   OpenCamera = async (crop) => {
      let cropvalue = crop == null ? false : crop
      return new Promise((resolve, reject) => {
         ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: cropvalue,
            includeBase64: true,
            includeExif: true,
            compressImageQuality: 0.4,
         }).then((res) => {
            resolve(res);
         }).catch((error) => {
            reject(error);
         });
      })
   }
   OpenGalery = async (crop) => {
      let cropvalue = crop == null ? false : crop
      return new Promise((resolve, reject) => {
         ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: cropvalue,
            includeBase64: true,
            includeExif: true,
            compressImageQuality: 0.4,
            // multiple: true
         }).then((res) => {
            resolve(res);
         }).catch((error) => {
            reject(error);
         });
      });
   }
   
}

export const Media = new MediaProvider();

