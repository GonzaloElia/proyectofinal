import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"
import firebase from 'firebase'

class Comments extends Component {

  constructor(props){
    super(props)
    this.state={
      id:props.route.params.id,
      arrComments:[],
      data: {},
      comentario:""
    }
  }

  componentDidMount(){
    db
    .collection("posts")
    .doc(this.state.id)
    .onSnapshot(doc=>{
      this.setState({
        data: doc.data(),
        arrComments: doc.data().comments
      })
    })
  }

  // firebase.firestore.FieldValue.arrayUnion()
  // firebase.firestore.FieldValue.arrayRemove()

  enviarComentario(comentario){
    db
    .collection("posts")
    .doc(this.state.id)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        comment: comentario
      })
    })
    .catch(err=>console.log(err))
    
    this.setState({
      comentario: ""
    })
  }

  render() {
    return (
      <View>
        <Text>Comments</Text>
        <FlatList
          data={this.state.arrComments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({item}) => <Text>{item.comment}</Text>}
        />
        <View>
          <TextInput
            placeholder='Escribi tu comentario'
            style={styles.input}
            keyboardType='default'
            onChangeText={text => this.setState({comentario:text})}
            value={this.state.comentario}
          />
          <TouchableOpacity onPress={()=> this.enviarComentario(this.state.comentario)}>
            <Text>Enviar Comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  input:{
    height:32,
    borderWidth:1
  }
})

export default Comments