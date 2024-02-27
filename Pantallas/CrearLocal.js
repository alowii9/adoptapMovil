import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import db from './Firebase/Config';
import ImagePicker from 'react-native-image-picker';




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
      title: 'Seleccionar Imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicke(options, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const refArchivoIMG = ref(storage, `posteos/${response.fileName}`);
          await uploadFile(refArchivoIMG, response.uri);
          const url = await getDownloadURL(refArchivoIMG);
          setUrlIMG(url);
        }
      });
    };
  




  const crearPublicacionMascota = async () => {
    const publicacion = {
      name,
      domicilio,
      Telefono,
      descripcion,
      img: urlIMG,
    };

    if( !name || !edad || !domicilio || !raza || !descripcion  ) {
      MSJERROR();
   

  }else{
    await addDoc(collection(db, 'mascotas'), publicacion);
    MSJOK();
    navigation.navigate('MascotasEnAdopcion');
  }

  };





  const MSJOK = () => {
    alert('Publicación creada con éxito!');
  };

  const MSJERROR = () => {
    alert('Error al crear la publicación. Verifica los campos.');
  };

/*
  useEffect(() => {
    if (name !== '') {
      window.location.reload();
    }
  }, [name]);
*/
 







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
      <Button title='Subir Imagen' onPress={handleImageUpload} ></Button>
      {urlIMG && <Image source={{ uri: urlIMG }} style={styles.imagePreview} />}
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

export default CrearLocal;