import { Image, Text, View } from 'react-native';

const Home = () => {
 
  return (
    <>
      <View style={mascotasNuevas}>
        <Text style={h1b}>Que es adoptapp?</Text>
        <Text style={BlancoText}>Adoptap es una aplicacion para que puedan conseguir un compañero , un integrante más {"\n"}
        de la familia, en el caso de perdida de una animal poder aportar informacion para su busqueda, {"\n"}
        tenes un negocio?, compartilo con la comunidad y expendite!, sumate!
        </Text>
        {/* Aquí puedes incluir tu componente GridDeImagenes */}
      </View>

      <View>
        <Image source={require('../assets/salvaAdopta.jpg')} style={foto2} />
        <Text style={h1}>Requisitos para adoptar una mascota</Text>
        <Text style={ulStyle}>
          <Text style={liStyle}>1.- Ser mayor de 21 años. {"\n"}</Text>
          <Text style={liStyle}>2.- Amar a las mascotas y poder dedicarle el tiempo que necesite. {"\n"}</Text>
          <Text style={liStyle}>3.- Querer sumar un integrante a tu vida por el resto de la suya, sin importar los cambios que se presenten. {"\n"}</Text>
          <Text style={liStyle}>4.- Estar bien predispuesto: te pedimos cargues tu solicitud, {"\n"}
                  realices una entrevista con el especialistas y respondas a nuestro contacto. {"\n"}</Text>
          <Text style={liStyle}>5.- Comprometerse con el cuidado, la salud y la castración de la mascota. {"\n"}</Text>
        </Text>
      </View>

      <View style={carta}>
        <View style={donar}>
          <Text style={h1b}>DONACIONES PARA FUNDACIONES</Text>
          <Text style={BlancoText}>Todo lo recaudado sera enviado {"\n"}
             a distintas asociaciones {"\n"}
            para mejorarle la vida a nuestros amigos peluditos
          </Text>
          <Image source={require('../assets/pebi.jpg')} style={{ width: 100, height: 100 }} />
        </View>
      </View>
    </>
  );
}

//Estilos

const seccion2 = {

  display:'flex',
  alignItems: "center",
  justifyContent: "center",

}

const mascotasNuevas = {
  backgroundImage: "url(/perros.jpg)",
  filter: "brightness(1)",
 

}

const donar = {
  backgroundImage: "url(/huellitas.png)",
  filter: "brightness(-6)",
  border: "black 2px solid"

}

const carta = {
  border: "1px solid #ccc",
 
  padding: "10px",
  textAlign: "center",
  justifyContent: "center",
  marginLeft: "20px",
  marginBottom: "20px",
  marginTop: "20px",
  paddingBottom: "20px",
  backgroundColor: "grey"
  

}


const h1 = {
  textAlign: "center",
  paddingTop: "20px",
 
}

const h1b = {
  textAlign: "center",
  paddingTop: "20px",
  
 
}

const BlancoText = {
  
  textAlign: "center",
  
}

const liStyle = {
  margin: '0 10px',
  
  paddingTop: "10px",
  marginBottom: "10px",
};

const ulStyle = {
 
  display: 'flex'
};

const foto2 = {
  
 
  marginLeft: "50px",
  display: 'flex',

}



export default Home;