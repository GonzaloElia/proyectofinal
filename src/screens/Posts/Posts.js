import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"

class Posts extends Component {

    constructor(){
        super()
        this.state={
            description:""
        }
    }

    enviarPost(text){
        db.collection("posts").add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: text,
            likes:[],
            comments:[]
        })
        .then(()=> this.setState({postValue:""}))
        .catch(err=>console.log(err))
    }

    render(){
        return (
            <View>
                <Text>Deja tu primer comentario</Text>
                <View>
                    <TextInput
                        placeholder='Dejanos tu descripcion'
                        value={this.state.description}
                        keyboardType='default'
                        onChangeText={text => this.setState({description: text})}
                        style={styles.input}
                    />
                    <View>
                        <TouchableOpacity onPress={()=> this.enviarPost(this.state.description)}>
                            <Text>Enviar posts</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }  
}

const styles = StyleSheet.create({
    input:{
        borderColor: "red",
        borderWidth:1,
        marginHorizontal:16,
        height:42
    }
})

export default Posts