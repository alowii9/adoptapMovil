
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import db from "./Firebase/Config";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { Button,TextInput,Text, View,Alert , Image} from 'react-native';

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const app = getAuth();
const navegar = useNavigation();
const [botonTexto, setBotonTexto] = useState('Iniciar sesion');


const accion = () => {
    botonTexto === 'Registrarse'
      ? registrarUsuario()
      : iniciarSesion();
  };

  // Función para registrar un nuevo usuario
  const registrarUsuario = () => {
    createUserWithEmailAndPassword(app, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        MSJOKRegistro();
        navegar.navigate('Home');
      })
      .catch((error) => {
        MSJERROR();
      });
  };

  // Función para iniciar sesión
  const iniciarSesion = () => {
    signInWithEmailAndPassword(app, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        MSJOKLogin();
        navegar.navigate('Home');
      })
      .catch((error) => {
        MSJERROR();
      });
  };

  const cambiarTextoBoton = () => {
    setBotonTexto(botonTexto === 'Registrarse' ? 'Iniciar sesion' : 'Registrarse');
  };


const MSJOKLogin = () => {
    Alert.alert('Inicio de sesion con éxito!');
  };

  const MSJERROR = () => {
    Alert.alert('Error, Verifica los campos.');
  }; 

  const MSJOKRegistro = () => {
    Alert.alert('Cuenta creada con éxito!');
  };



return(
     
    
    <View style={styles.container} >
       <Image source={require('../assets/letras.png')}  style={styles.imagen}/>

        <Text> {botonTexto} </Text>
      <TextInput 
      style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
      style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={botonTexto} onPress={accion}/>
      <Button title="Cambiar Texto" onPress={cambiarTextoBoton} />

    </View>
    
  )


}

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
    imagen:{ 
      width: 350,
      height: 55,
      position: 'relative',
      marginBottom: 30,
      
    }

  };


export default Login;