import React, { Component } from 'react';
import { StyleSheet, View, Text, Content, Card } from 'react-native';
import { Button, Input, Icon, Image } from 'react-native-elements';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contrasena: '',
            validateUser: null,
            validatePass: null
        }
    }

    ingresar = () => {
        if (this.state.usuario === '') {
            //this.state.validateUser = 'El campo es requerido';
            this.setState(() => ({ validateUser: 'El campo es requerido' }));
        } else {
            // this.state.validateUser = null;
            this.setState(() => ({ validateUser: null }));
        }

        if (this.state.contrasena === '') {
            // this.state.validatePass = 'El campo es requerido';
            this.setState(() => ({ validatePass: 'El campo es requerido' }));
        } else {
            //this.state.validatePass = null;
            this.setState(() => ({ validatePass: null }));
        }
        console.log(this.state.validateUser, this.state.validatePass);
        /*if (this.state.validateUser === null && this.state.validatePass === null) {
            this.props.navigation.navigate('Home')
        }*/
    }

    render() {
        return (
            <View style={ styles.content }>
                <Image
                    source={require('../../../assets/icon.png')}
                    style={{ width: 100, height: 100 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorRequired: {
        color: "red", 
        fontSize:9,
        justifyContent:'center'
    },
    textCenter:{
        textAlign: 'center',
        width: '100%'
    },
    content:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#E4F1FE'
    },
    boton:{
        borderColor: '#000000', 
        backgroundColor: '#E4F1FE', 
        height:40,
    },
    body:{
        
        paddingVertical:20
    }
});

