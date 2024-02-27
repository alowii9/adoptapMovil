 //Pantallas
import Home from './Pantallas/Home';
import Logout from './Pantallas/Logout';
import Login from './Pantallas/Login';

import MascotasEnAdopcion from './Pantallas/mascotasEnAdopcion';
import CrearPublicacionMascotaAd from './Pantallas/CrearPublicacionMascotaAd';

import mascotasPerdidas from './Pantallas/mascotasPerdidas';
import CrearPublicacionMascotaPer from './Pantallas/CrearPublicacionMascotaPer';

import Locales from './Pantallas/Locales';
import CrearLocal from './Pantallas/CrearLocal';

import Donaciones from './Pantallas/Donaciones';


//import de react
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './Pantallas/DrawerContent';
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//variables que inicia mi menu hamburguesa
const Drawer = createDrawerNavigator();


const App = () => {

  



  return (
    <NavigationContainer>
      <Drawer.Navigator
       initialRouteName="Login" 
       drawerStyle={drawer} 

       >
      
        <Drawer.Screen name="Home" component={Home} />
       
        <Drawer.Screen name="MascotasEnAdopcion" component={MascotasEnAdopcion} options={drawer}/>
        <Drawer.Screen name="mascotasPerdidas" component={mascotasPerdidas} options={drawer}/>
        <Drawer.Screen name="Locales" component={Locales} options={drawer}/>
        <Drawer.Screen name="Donaciones" component={Donaciones} options={drawer}/>


        <Drawer.Screen name="Logout" component={Logout} options={logout}/>

        <Drawer.Screen name="CrearPublicacionMascotaAd" component={CrearPublicacionMascotaAd} 
        options={{
          drawerItemStyle:{display: 'none'},
        }}
        />
        <Drawer.Screen name="CrearPublicacionMascotaPer" component={CrearPublicacionMascotaPer}
        options={{
          drawerItemStyle:{display: 'none'},
        }}/>
        <Drawer.Screen name="CrearLocal" component={CrearLocal}
        options={{
          drawerItemStyle:{display: 'none'},
        }}
        />  
         <Drawer.Screen name="Login" component={Login} 
       options={{
        drawerItemStyle:{display: 'none'},
      }}
       />

      </Drawer.Navigator>
    </NavigationContainer>
    
    
     
   
   
  );
}

const drawer = {
  backgroundColor: '#f0f0f0',
  width: 200,
  paddingTop: "20px",
}

const logout = {
  drawerContentStyle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
};



export default App;
