const handleImageUpload = async () => {
    try {
      const options = {
        mediaType: MediaTypeOptions.Images,
        quality: 0.5,
        allowsEditing: true, // Allow editing for better user experience
        aspect: [4, 3], // Maintain a 4:3 aspect ratio
      };

      const result = await launchImageLibraryAsync(options);

      if (result.cancelled) {
        console.log('User cancelled image picker');
        return;
      }
      
      console.log(result);
      const { uri } = result; // Get image URI and filename

      const imageRef = ref(storage, `posteos/${uri}`); // Create unique image reference

      const response = await uploadBytes(imageRef, uri); // Upload the image to Firebase Storage
      if (response.state === 'success') {
        console.log('Image uploaded successfully');
      } else {
        console.error('Error uploading image:', response.error);
        return; // Handle error appropriately
      }


      const downloadURL = await getDownloadURL(imageRef); // Get the download URL

      setUrlIMG(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };




  const handleImageUpload2 = async () => {
    const options = {
      mediaType: MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true, // Allow editing for better user experience
      aspect: [4, 3], // Maintain a 4:3 aspect ratio
    };

    const result = await launchImageLibraryAsync(options); // Reemplaza 'URL_DE_TU_IMAGEN' con la URL de la imagen que deseas subir
    const blob = await result.blob();

    const imageRef = storage.ref().child('images/' + name);
    const uploadTask = imageRef.put(blob);

    uploadTask.on('state_changed', (snapshot) => {
      // Handle upload progress if needed
    }, (error) => {
      console.error('Error uploading image:', error);
    }, async () => {
      const downloadURL = await imageRef.getDownloadURL();
      setUrlIMG(downloadURL);
    });
  };

/*


      const response = await uploadBytes(imageRef, uri); // Upload the image to Firebase Storage
      const imageUrl = response.metadata.fullPath;
      console.log ("imageURl:", imageUrl);
      if (imageUrl.state === 'success') {
        console.log('Image uploaded successfully');
      } else {
        console.error('Error uploading image:', imageUrl.error);
        return; // Handle error appropriately
      }


      const downloadURL = await getDownloadURL(imageUrl); // Get the download URL

      setUrlIMG(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };
  */