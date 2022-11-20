import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"

class Profile extends Component {

    constructor(){
        super()
        this.state={
            comments:[],
            loading:true
        }
    }

    componentDidMount(){
        db.collection("comments").onSnapshot(
            docs => {
                let allComments = []
                docs.forEach(doc => {
                    allComments.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                
                this.setState({
                    comments: allComments,
                    loading:false
                })
            }
        )
    }

    signOut(){
        auth.signOut()
    }

    render() {
        return (
        <View>
            <Text>Profile</Text>
            <TouchableOpacity onPress={()=> this.signOut()}>
                <Text>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
        )
    }
    }
export default Profile