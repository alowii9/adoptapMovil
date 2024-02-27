import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {

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
    <Button title="Cerrar sesión" onPress={cerrarSesion} />
  );
};



export default Logout;