import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native"
import React, {Component} from "react"
import { auth } from "../../firebase/config"

class Login extends Component {

    constructor (props){
        super(props)
        this.state={
            mail:"",
            pass:"",
            username: "",
            users: [],
            logueado: false
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
        .catch(err=>console.log(err))
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
      <View>
        <Text>Login</Text>
        <View>
            <TextInput
            style={styles.input}
            onChangeText={text => this.setState({email:text})}
            placeholder="Ingresa tu email"
            value={this.state.mail}
            />

            <TextInput
              style={styles.input}
              onChangeText={text => this.setState( {pass:text} )}
              placeholder="Ingresa tu password"
              value={this.state.pass}
              secureTextEntry= {true}
            />

            <View>
                <TouchableOpacity onPress={()=> this.loguear(this.state.mail, this.state.pass)}>
                    <Text>Loguearme</Text>
                </TouchableOpacity>
            </View>
            <View>
              <Text>Aun no tienes cuenta?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>
                <Text>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
  }
})

export default Login