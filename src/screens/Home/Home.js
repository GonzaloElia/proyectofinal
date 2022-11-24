import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"
import Post from '../../components/Post/Post'

class Home extends Component {
    constructor(){
        super()
        this.state={
            allPosts: []
        }
    }

    componentDidMount(){
        db.collection('posts')
        .limit(15)
        .onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                allPosts: posteos
            })
        })
    }
  
    render() {
        return (
        <ScrollView styles={styles.container}>
            <FlatList
                data={this.state.allPosts}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
            />
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#90EE90'
    }
})

export default Home