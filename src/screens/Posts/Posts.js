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
            fotoUrl:""
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
                        <TouchableOpacity onPress={()=> this.enviarPost(this.state.description)}>
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