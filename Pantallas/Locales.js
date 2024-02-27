import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from './Firebase/Config';
import { ScrollView } from 'react-native-gesture-handler';

const Locales = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection("Locales").get();
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
    <TouchableOpacity onPress={() => navigation.navigate('CrearPublicacionLocal')} style={styles.button}>
          <Text style={styles.buttonText}>Crear Publicación</Text>
    </TouchableOpacity>
    <ScrollView style={styles.container}>

    


      {data.map((local) => (
        
        <View style={styles.carta}>
              <Image style={styles.img} source={{ uri: local.img }} />
              <Text style={styles.text}>Nombre local: {local.name}</Text>
            
              <Text style={styles.text}>Domicilio: {local.domicilio}</Text>

              <Text style={styles.text}>Telefono: {local.telefono}</Text>
              <Text style={styles.text}>descripcion: {local.descripcion}</Text>
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

export default Locales;