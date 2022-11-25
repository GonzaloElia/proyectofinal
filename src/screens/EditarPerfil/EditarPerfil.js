import React, { Component } from 'react';
import { db, auth } from '../../firebase/config'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';

class EditarPerfil extends Component {
    constructor() {
        super()
        this.state = {
            password: '',
            newPassword: '',
            userName: '',
            miniBio: '',
            error: '',
            message:''
        }
    }

    reauthenticate = (password) => {
        const user = auth.currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    changePassword = () => {
        this.reauthenticate(this.state.password)
            .then(() => {
                auth.currentUser.updatePassword(this.state.newPassword)
                    .then(() => {
                        this.setState({ message: "Password changed" })
                    })
                    .catch((e) => { console.log(e); });
            })
            .catch((e) => { console.log(e) });
    }


    editarPerfil() {

        db.collection('users')
            .doc(this.props.route.params.id)
            .update({
                userName: this.state.userName,
                miniBio: this.state.miniBio,
            })
            .then(() => {
                this.props.navigation.navigate('Profile');
            })

        auth.currentUser.updatePassword(
            this.state.password
        ).then(() => {
            

        })
            .catch(error => console.log(error))

    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Editar datos</Text>
                <View style={styles.box}>
                    <Text style={styles.alert}>{this.state.error}</Text>

                    <TextInput
                        placeholder="Password Actual"
                        secureTextEntry={true}
                        onChangeText={text => { this.setState({ password: text }) }}
                        value={this.state.password}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="New password"
                        secureTextEntry={true}
                        onChangeText={text => { this.setState({ newPassword: text }) }}
                        value={this.state.newPassword}
                        style={styles.input}
                    />

                    <TouchableOpacity style={styles.submit} onPress={() => this.changePassword()}>
                        <Text style={styles.button}>Cambiar contraseña</Text>
                        <Text>{this.state.message}</Text>
                    </TouchableOpacity>

                    <TextInput
                        placeholder='username'
                        keyboardType='default'
                        onChangeText={text => this.setState({ userName: text })}
                        value={this.state.userName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='miniBio'
                        keyboardType='default'
                        onChangeText={text => this.setState({ miniBio: text })}
                        value={this.state.miniBio}
                        style={styles.input}
                    />




                    <TouchableOpacity style={styles.submit} onPress={() => this.editarPerfil()}>
                        <Text style={styles.button}>Editar</Text>
                    </TouchableOpacity>


                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        backgroundColor: '#1f2124'
    },
    campodetexto: {
        paddingLeft: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderLeftColor: '#000000',   
        color: '#535353',
        textAlign: 'center',
        margin: 5
    },
    box: {
        backgroundColor: '#90EE90',
        width: '80%',
        borderRadius: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '8%'
    },
    input: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%',
        height: '5%',
        padding: '5%',
        margin: '8%'
    },
    alert: {
        color: 'black'
    },
    button: {
    color: 'white'
    },
    submit: {
        padding: 5,
        color: 'white',
        backgroundColor: 'green',
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 60
      },
    text: {
        fontFamily: 'Oswald, sans-serif',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',   
    }
})

export default EditarPerfil;