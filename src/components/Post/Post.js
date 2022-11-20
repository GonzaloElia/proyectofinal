import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'


class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            isMyLike: false,
            likesCount: props.data.likes.length
        }
    }

    componentDidMount(){
        let myLike = this.props.data.likes.includes(auth.currentUser.email)
        if(myLike){
            this.setState({
                isMyLike:true
            })
        }
    }

    like(){
        db
        .collection("posts")
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(resp=>{
            this.setState({
                isMyLike:true,
                likesCount: this.state.likesCount +1
            })
        })
        .catch(err=>console.log(err))
    }

    unlike(){
        db
        .collection("posts")
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp=>{
            this.setState({
                isMyLike:false,
                likesCount: this.state.likesCount -1
            })
        })
        .catch(err=>console.log(err))
    }

  render() {
    return (
      <View>
        <View>
            <Text>{this.props.data.description}</Text>
        </View>

        <View>
            <Text>{this.state.likesCount}</Text>
            {
            this.state.isMyLike ?
            <TouchableOpacity onPress={()=> this.unlike()}>
                <FontAwesome name='heart' color='red' size={32} />
            </TouchableOpacity>
                :
            <TouchableOpacity onPress={()=> this.like()}>
                <FontAwesome name='heart-o' color='red' size={32} />
            </TouchableOpacity>
            }
        </View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Comments")}>
            <Text>Agregar Comentario</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default Post