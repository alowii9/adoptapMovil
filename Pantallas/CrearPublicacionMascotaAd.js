import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import db from './Firebase/Config';
import { launchImageLibraryAsync, MediaTypeOptions,launchCameraAsync,requestCameraPermissionsAsync } from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Permissions } from 'react-native';

const CrearPublicacionMascotaAd = () => {
  const [name, setName] = useState('');
  const [edad, setEdad] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [raza, setRaza] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [urlIMG, setUrlIMG] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigation = useNavigation();
  const storage = getStorage();

// esta funcion abre mi galeria de fotos de mi dispositivo movil, elige la imagen, toma la url y solo se queda con el atributo uri 
//para que se almacene en mi firebase y despues me lo muestre en pantalla 

  const handleImageUpload = async () => {
    const options = {
      mediaType: MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: [4, 3],
    };

    const result = await launchImageLibraryAsync(options);

    if (result.cancelled) {
      console.log('User cancelled image picker');
      return;
    }

    const uri = result.assets[0].uri;
    const imageRef = ref(storage, `posteos/${uri}`);
    const response = await fetch(uri);
    const blob = await response.blob();
    const contentType = blob.type;

    const metadata = {
      contentType: contentType
    };

    const uploadTask = await uploadBytes(imageRef, blob, metadata);

    const downloadURL = await getDownloadURL(uploadTask.ref);
    setUrlIMG(downloadURL);
  };



/*
  Quise probar esta funcion que era para abrir la camara y usar una foto sacada con ella, pero no me abre en la aplicacion :z
// habia agregado un boton q llamaba a esta funcion , pero lo saque por no lo usaba

  const handleImageUpload2 = async () => {
    const options = {
      mediaType: MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: [4, 3],
    };
  
    const { status } = await requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera was denied');
      return;
    }
    
  
    const result = await launchCameraAsync(options);
  
    if (result.cancelled) {
      console.log('User cancelled camera');
      return;
    }
  
    const imageUri = result.assets[0].uri;
    const imageRef = ref(storage, `posteos/${imageUri.split('/').pop()}`); // Generate unique filename
  
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob(); // Could be inefficient for larger images
  
      const uploadTask = await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setUrlIMG(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

*/


// esta funcion compruebo los datos y creo mi publicacion en mi firebase de publicacion de mascotas



  const crearPublicacionMascota = async () => {
    if (!name || !edad || !domicilio || !raza || !descripcion) {
      alert('Error al crear la publicación. Verifica los campos.');
      return;
    }

    const publicacion = {
      name,
      edad,
      domicilio,
      raza,
      telefono,
      descripcion,
      img: urlIMG,
    };

    try {
      await addDoc(collection(db, 'mascotas'), publicacion);
      alert('Publicación creada con éxito!');
      navigation.navigate('MascotasEnAdopcion');
    } catch (error) {
      console.error('Error creating publication:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Crear Publicación de Mascota en Adopción</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={(text) => setEdad(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Domicilio"
        value={domicilio}
        onChangeText={(text) => setDomicilio(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Raza"
        value={raza}
        onChangeText={(text) => setRaza(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Telefono"
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={(text) => setDescripcion(text)}
      />
      <Image style={{ alignSelf: 'center', height: 200, width: 200 }} source={{ uri: urlIMG }} />
      <Button title='Subir Imagen' onPress={handleImageUpload} />
      
      <Button title="Crear Publicación" onPress={crearPublicacionMascota} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
};

export default CrearPublicacionMascotaAd;
