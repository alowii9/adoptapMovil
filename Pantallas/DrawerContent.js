import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { getAuth, signOut } from 'firebase/auth';
import { Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DrawerContent = ({ navigation }) => {

  const auth = getAuth();
  const mover = useNavigation();
  
  const cerrarSesion = async () => {
    await  signOut(auth)
        .then(() => {
          mover.navigate('Login');
          MSJOKout();
                })
        .catch((error) => {
          console.error('Error al cerrar sesión:', error);
        });
    };
  
    const MSJOKout = () => {
      Alert.alert('session cerrada con éxito!');
    };
   







  return (
    <DrawerContentScrollView>
      <View style={container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        </View>
        <View style={container}>   
        <TouchableOpacity onPress={() => navigation.navigate('MascotasEnAdopcion')}>
          <Text>Mascotas En Adopcion</Text>
        </TouchableOpacity>
        </View>
        <View style={container}>   
        <TouchableOpacity onPress={() => navigation.navigate('mascotasPerdidas')}>
          <Text>Mascotas Perdidas</Text>
        </TouchableOpacity>
        </View>
        <View style={container}>   
        <TouchableOpacity onPress={() => navigation.navigate('Locales')}>
          <Text>Locales</Text>
        </TouchableOpacity>
        </View>
        <View style={container}>   
        <TouchableOpacity onPress={() => navigation.navigate('Donaciones')}>
          <Text>Donaciones</Text>
        </TouchableOpacity>
        </View>
        
        <View style={container}>   
        <TouchableOpacity onPress={() => {cerrarSesion}}>
          <Text>Logout</Text>
        </TouchableOpacity>
        </View>

        {/* Agrega más opciones de navegación aquí */}
     
    </DrawerContentScrollView>
  );
}

const container= {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  
}


export default DrawerContent;