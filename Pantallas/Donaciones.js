
import React from "react";
import { View, Text, Image, TextInput, Button, Linking } from 'react-native';

const Donaciones = () => {

return (
<>

<View >
<Text style={h1}>DONACIONES {"\n"}</Text>



<Text style={h1}>Cómo puedo donar ? {"\n"}</Text>



<Text style={h1}> HACIENDO UNA DONACION PUNTUAL {"\n"} </Text>  

<Text style={p}>
    Es muy simple, sólo tenés que hacer click eligiendo el monto que querés donar: {"\n"}

    $100, $200, $500 o $1000 {"\n"}

    
    


    También podés donar el monto que desees vía cuenta bancaria a nuestra caja de ahorro{"\n"}

    Banco MONTOTO {"\n"}
    SUCURSAL: BALVANERA 2323 {"\n"}
    CUENTA: 316-1231241541 {"\n"}
    CBU: 03403165 082313123123 {"\n"}
    CUIL 27-13529010-1{"\n"}
    CUIL 27-18327952-7 {"\n"}

    SUMATE AYUDANDONOS A AYUDAR{"\n"}
   todas las donaciones son de forma voluntaria, ningun adminstrador te pedira que dones por obligacion
   
</Text>
<Button title='Donar' onPress={() => Linking.openURL('https://ceneka.net/adoptapp')} ></Button>


</View>





</>


)

}

//Estilos

const h1 = {
    textAlign: "center",
    color: "black",
    paddingTop: "20px",

}

const p = {

    textAlign: "center",
    color: "black",

    fontWeight: "bold",
    paddingBottom: "20px",
}

const foto2 = {
    width: 330,
    heigth: 330,
    position: 'relative',
    
    

    
    
  }




export default Donaciones;