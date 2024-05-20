export const uploadImageToCloudinary = async (imageUri) => {
    try {
      const image = {
        uri: imageUri,
        type: 'image/jpeg', // Adjust the type based on your image format
        name: 'image.jpg',
      };
  
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'ml_default');
  
      console.log(data);
  
      const response = await fetch('https://api.cloudinary.com/v1_1/kdjfowejnfewfholksds/image/upload', {
        method: 'post',
        body: data,
      });
  
      if (!response.ok) {
        console.log('Error:', response);
        return 'error';
      }
  
      const responseData = await response.json();
      console.log(responseData.url);
      return responseData.url;
    } catch (err) {
      console.log(err);
      return 'error';
    }
  };
  