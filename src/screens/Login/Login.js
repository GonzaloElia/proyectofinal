import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native"
import React, {Component} from "react"
import { auth, storage } from "../../firebase/config"

class Login extends Component {

    constructor (props){
        super(props)
        this.state={
            mail:"",
            pass:"",
            username: "",
            users: [],
            logueado: false,
            errores: ''
        }
    }

    componentDidMount(){
      auth.onAuthStateChanged(user=>{
        if(user !== null){
          this.props.navigation.navigate("TabNavigation")
        }
      })
    }

    loguear(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
        .then(resp=> this.props.navigation.navigate("TabNavigation"))
        .catch( error => {
          this.setState({errores: error.message})
        })
    }

    buscar(text){

      //Filtramos dependiendo de que recibimos por parametro

      let usersFilter = this.state.users.filter(elm =>
          elm.email.toUpperCase().includes(text.toUpperCase())
          ||
          elm.usuario.toUpperCase().includes(text.toUpperCase()
        ))

      this.setState({
        mail: text,
        users: usersFilter
      })
    }

  render() {
    return (
      <View style={styles.contenedor}>
        <View style={styles.titulos}>
        <Text style={styles.maintitle}>InstaCar</Text>
        <Text style={styles.subtitle}>Tu red social favorita</Text>
        </View>
        <View style={styles.box}>

        <View style={styles.cajados}>
        <Text style={styles.err}>{this.state.errores}</Text>

        <View style={styles.loguearse}>

        <TextInput
            style={styles.inputuno}
            onChangeText={text => this.setState({email:text})}
            placeholder="Ingresa tu email"
            value={this.state.email}
            />

            <TextInput
              style={styles.inputdos}
              onChangeText={text => this.setState( {pass:text} )}
              placeholder="Ingresa tu password"
              value={this.state.pass}
              secureTextEntry= {true}
            />

                <TouchableOpacity style={styles.botonsubmit} onPress={()=> this.loguear(this.state.mail, this.state.pass)}>
                    <Text style={styles.submit}>Logueate</Text>
                </TouchableOpacity>

        </View>
        <View style={styles.agregar}>
        <Text style= {styles.cuentita}> Aun no tienes una cuenta?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>
                <Text style={styles.cuenta}> Crear cuenta</Text>
              </TouchableOpacity>
        </View>
        </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    allowContent : "center",
    paddingHorizontal: 20,
    // paddingBottom: 40
    //backgroundColor: 'black'
},
subtitle: {
  fontSize: 20,
  alignItems: 'center'
},
maintitle: {
  fontSize: 25,
  fontWeight: 'bold',
  alignItems: 'center'
},
box: {
  flex: 3,
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center'
},

titulos: {
textAlign: 'center',
paddingBottom: 30,
paddingTop: 30
},

err: {
  color: 'red',
  textAlign: 'center',
  marginBottom: 10
},

boxLog: {
  flex: 1,
  width: '100%',
  justifyContent: 'space-evenly',
  textAlign: 'center',
  alignItems:'center'
},

loguearse:{
  flex: 1,
  width: '100%',
  justifyContent: 'space-evenly',
  textAlign: 'center',
  alignItems:'center'
},

botonsubmit:{width: '40%'},

submit: {
  padding: 5,
  color: 'white',
  backgroundColor: 'green',
  borderRadius: 5,
  marginTop: 10,
  marginBottom: 60
},
agregar:{
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    textAlign: 'center',
    
},

inputuno:{
  width: '80%',
  borderWidth: 1,
  borderColor: '#CCCCCC',
  color: '#535353',
  borderRadius: 1,
  paddingLeft: 10,
  marginTop: 70,
  shadowOpacity: 20
},
cuentita:{
  fontWeight: 'bold',
},
cuenta:{
  textDecorationLine: "underline",
},
inputdos:{
  width: '80%',
  borderWidth: 1,
  borderColor: '#CCCCCC',
  color: '#535353',
  borderRadius: 1,
  paddingLeft: 5,
  shadowOpacity: 20,
  marginBottom: 30,
  marginTop: 30
  
}
})

export default Login