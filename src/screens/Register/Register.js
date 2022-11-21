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
      <View>
        <Text>Register</Text>
        <TextInput
            style={styles.input}
            placeholder="Escribi tu nombre de usuario"
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
        />
        <TextInput
            style={styles.input}
            placeholder="Escribi tu email"
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
        />
        <TextInput
            style={styles.input}
            placeholder="Escribi tu contraseña"
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />
        <View>
            <TouchableOpacity onPress={()=>this.registrar(this.state.email, this.state.password, this.state.username)}>
                <Text>Registrar usuario</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text>Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")}>
                <Text>Logueate</Text>
            </TouchableOpacity>
        </View>
        {
          this.state.error !== "" ?
          <Text>{this.state.error}</Text>:
          ""
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1
  }
})

export default Register