import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"
import Camara from '../../components/Camara/Camara'

class Posts extends Component {

    constructor(){
        super()
        this.state={
            description:"",
            mostrarCamara:true,
            fotoUrl:"",
            username: ""
        }
    }

    enviarPost(text){
        db.collection("posts").add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: text,
            likes:[],
            comments:[],
            foto: this.state.fotoUrl
        })
        // db.collection("users").add({
        //     username: auth.currentUser.username
        // })
        .then(()=> this.setState({postValue:""}))
        .catch(err=>console.log(err))
    }

    cuandoSubaLaFoto(url){
        this.setState({
            fotoUrl: url,
            mostrarCamara: false
        })
    }

    render(){
        return (
            <View style={styles.container}>
                {
                    this.state.mostrarCamara ?
                    <Camara 
                        cuandoSubaLaFoto={(url)=> this.cuandoSubaLaFoto(url)}
                    /> :
                    <>
                        <TextInput
                        placeholder='Dejanos tu descripcion'
                        value={this.state.description}
                        keyboardType='default'
                        onChangeText={text => this.setState({description: text})}
                        style={styles.input}
                        />
                        <TouchableOpacity onPress={()=> this.enviarPost(this.state.description, this.state.foto)}>
                            <Text>Enviar posts</Text>
                        </TouchableOpacity>
                    </>

                }
            </View>
        )
    }  
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
        borderColor: "red",
        borderWidth:1,
        marginHorizontal:16,
        height:42
    }
})

export default Posts