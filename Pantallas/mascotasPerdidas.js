import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from './Firebase/Config';
import { ScrollView } from 'react-native-gesture-handler';

const MascotasPerdidas = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection("mascotasPerdidas").get();
      const dataArr = [];
      snapshot.forEach((doc) => {
        dataArr.push({ id: doc.id, ...doc.data() });
      });
      setData(dataArr);
    };
    fetchData();
  }, []);

  return (
    <>
    <TouchableOpacity onPress={() => navigation.navigate('CrearPublicacionMascotaPer')} style={styles.button}>
          <Text style={styles.buttonText}>Crear Publicación</Text>
    </TouchableOpacity>
    <ScrollView style={styles.container}>

    


      {data.map((mascota) => (
        
        <View style={styles.carta} key={mascota.id}>
              <Image style={styles.img} source={{ uri: mascota.img }} />
              <Text style={styles.text}>Nombre mascota: {mascota.name}</Text>
              <Text style={styles.text}>Edad: {mascota.edad}</Text>
              <Text style={styles.text}>Raza: {mascota.raza}</Text>
              <Text style={styles.text}>Domicilio: {mascota.domicilio}</Text>
              <Text style={styles.text}>Telefono: {mascota.telefono}</Text>
              <Text style={styles.text}>descripcion: {mascota.descripcion}</Text>
          </View>
       
      ))}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    padding: 20,
  },
  carta: {
    border: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'grey',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'orange',
   
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },



});

export default MascotasPerdidas;