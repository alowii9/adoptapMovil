import React, { useState } from 'react';
import { View, Text, TextInput, Button,Image  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import db from './Firebase/Config';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';


const CrearLocal = () => {
  const [name, setName] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [urlIMG, setUrlIMG] = useState('');



  const navigation = useNavigation();
  const storage = getStorage()

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




  const crearPublicacionLocal = async () => {
    if (!name  || !domicilio || !Telefono || !descripcion) {
      alert('Error al crear la publicación. Verifica los campos.');
      return;
    }

    const publicacion = {
      name,
     
      domicilio,
     Telefono,
      descripcion,
      img: urlIMG,
    };

    try {
      await addDoc(collection(db, 'Locales'), publicacion);
      alert('Publicación creada con éxito!');
      navigation.navigate('Locales');
    } catch (error) {
      console.error('Error creating publication:', error);
    }
  };

 




  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Crear Publicación del Local</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => setName(text)}
      />
    
      <TextInput
        style={styles.input}
        placeholder="Domicilio"
        value={domicilio}
        onChangeText={(text) => setDomicilio(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Telefono"
        value={Telefono}
        onChangeText={(text) => setTelefono(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={(text) => setDescripcion(text)}
      />
      <Image style={{ alignSelf: 'center', height: 200, width: 200 }} source={{ uri: urlIMG }} />
      <Button title='Subir Imagen' onPress={handleImageUpload} ></Button>
    
      <Button title="Crear Publicación" onPress={crearPublicacionLocal} />
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

export default CrearLocal;