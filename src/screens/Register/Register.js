import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"

class Register extends Component {

  constructor(){
      super()
      this.state={
        email:"",
        password:"",
        username: "",
        error:""
      }
  }

  componentDidMount(){
    auth.onAuthStateChanged(user=>{
      if(user !== null){
        this.props.navigation.navigate("TabNavigation")
      }
    })
  }

  registrar(email, password, username){
    auth.createUserWithEmailAndPassword(email, password)
    .then(resp=> {
      db.collection('users').add({
        owner: email,
        username: username,
        createdAt: Date.now()
    })
    .then(()=> {
        this.setState({
            email: '',
            password:'',
            username:""
        })
        this.props.navigation.navigate('TabNavigation')
    })
    })
    .catch(err=>this.setState({error:err.message}))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.caja}>
        <Text style={styles.subtitulo}>Complete los pasos para registrarse</Text>
        <TextInput
            style={styles.perinput}
            placeholder="Escribi tu nombre de usuario"
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
        />
        <TextInput
            style={styles.sdoinput}
            placeholder="Escribi tu email"
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
        />
        <TextInput
            style={styles.terinput}
            placeholder="Escribi tu contraseña"
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />
        <View>
            <TouchableOpacity style={styles.submit} onPress={()=>this.registrar(this.state.email, this.state.password, this.state.username)}>
                <Text style={styles.textregi}>Registrar usuario</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={styles.pregunta}>Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")}>
                <Text style={styles.botonlogin}>Logueate</Text>
            </TouchableOpacity>
        </View>
        {
          this.state.error !== "" ?
          <Text>{this.state.error}</Text>:
          ""
        }
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
},
caja: {
    height: '95%',
    width: '95%',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingBottom: 15
},
  subtitulo: {
    fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: 50
  },
  submit: {
    padding: 5,
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 60
  },
  perinput:{
  width: '80%',
  borderWidth: 1,
  borderColor: '#CCCCCC',
  color: '#535353',
  borderRadius: 1,
  paddingLeft: 10,
  marginTop: 70,
  shadowOpacity: 20  },

  textregi:{
    color: 'white'
  },
  botonlogin:{
    textDecorationLine: 'underline'
  },

  sdoinput:{
  width: '80%',
  borderWidth: 1,
  borderColor: '#CCCCCC',
  color: '#535353',
  borderRadius: 1,
  paddingLeft: 10,
  marginTop: 20,
  shadowOpacity: 20
  },

  pregunta:{
    fontWeight: 'bold',
  },

  terinput:{
  width: '80%',
  borderWidth: 1,
  borderColor: '#CCCCCC',
  color: '#535353',
  borderRadius: 1,
  paddingLeft: 10,
  marginTop: 20,
  shadowOpacity: 20
  }
})

export default Register