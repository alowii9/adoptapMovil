import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import db from './Firebase/Config';
import { launchImageLibraryAsync, MediaTypeOptions,launchCameraAsync,requestCameraPermissionsAsync } from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Permissions } from 'react-native';

const CrearPublicacionMascotaPer = () => {
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
      await addDoc(collection(db, 'mascotasPerdidas'), publicacion);
      alert('Publicación creada con éxito!');
      navigation.navigate('mascotasPerdidas');
    } catch (error) {
      console.error('Error creating publication:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Crear Publicación de Mascota Perdida</Text>
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

export default CrearPublicacionMascotaPer;
