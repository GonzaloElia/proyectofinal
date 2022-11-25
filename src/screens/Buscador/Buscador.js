import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from '../../firebase/config';


class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            result: [],
            input: '',
            search: false

        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let user = [];
                docs.forEach(doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    users: user
                })
                console.log(this.state)
            }
        )
    }


    searchUser(text) {
        console.log(this.state.users);
        console.log(this.state.result);

        let arrayFiltrado = this.state.users.filter
        (user => { if (user.data.username.toLowerCase().includes(text.toLowerCase())) {
                return user
            };
        }
        )
        this.setState({
            result: arrayFiltrado,
            search: true,
            input: text

        }, () => console.log(this.state.result))
    }

    render() {

        return (
            <View style={styles.containerPrincipal}>
                <Text style={styles.title}>Busca un usuario</Text>

                <TextInput
                    style={styles.boton}
                    keyboardType='default'
                    placeholder='Buscar'
                    onChangeText={text => this.searchUser(text)}
                    value={this.state.input}
                />

                {
                    this.state.result.length == 0 && this.state.search == true ?
                        <Text style={styles.message}> Usuario inexistente </Text> :

                        <View style={styles.container}>
                            <FlatList
                                style={styles.lista}
                                data={this.state.result}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) =>
                                    <>
                                        <TouchableOpacity style={styles.botoncito} onPress={() => this.props.navigation.navigate('OtroProfile', { email: item.data.owner })}>
                                            <Text style={styles.users}>{item.data.username}</Text>
                                        </TouchableOpacity>
                                    </>

                                }
                            />

                        </View>


                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containerPrincipal: {
        backgroundColor: '#DFCAA0',
        flex: 1
    },
    container: {
        marginTop: 0
    },
    title: {
        fontFamily: 'sans-serif',
        color: 'green',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#DFCAA0',
        marginBottom: 10,
        marginTop:40,
        marginRight:160
    },
    lista:{
        marginTop: 10
    },
    boton: {
        backgroundColor: 'white',
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        borderWidth: 1,
        borderRadius: 4,
        color: 'black',
        alignContent: 'center',
    },
    message: {
        color: 'red',
        marginTop: 30,
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 20,
        marginLeft: '0',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    botoncito:{
        marginLeft:40
    },

    

    users: {
        color: 'black',
        marginTop: 0,
        fontFamily: 'Raleway',
        fontSize: 24,
        marginLeft: '90',
        textAlign: 'left',
        textDecorationLine: 'underline'
    }
})


export default Buscador;