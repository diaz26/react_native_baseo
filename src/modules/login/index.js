import React, { Component } from 'react';
import { StyleSheet, View, Text, ToastAndroid, Platform} from 'react-native';
import { Button, Input, Icon, Image } from 'react-native-elements';
import { login } from "./service";
import BackgrounImageBaseo from "../general/backgrounImageBaseo";
import ValidationComponent from 'react-native-form-validator';
import {AsyncStorage} from 'react-native';


export default class Login extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contrasena: '',
        }
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('token')
        console.log(token)
        if (token !== undefined && token !== null) {
            this.props.navigation.push('Inicio')
        }
    }

    async ingresar() {
        await this.forceUpdate()
        await this.validate({
            usuario: { required: true},
            contrasena: {required: true},
        });

        if (this.isFormValid()) {
            const data = {
                email: this.state.usuario,
                pass: this.state.contrasena
            }
            const resp = await login(data);
            if (resp.status == 'success') {
                this.props.navigation.push('Inicio')
            }
        }
    }

    closeModal = (status) => {
        this.setState({ openModal: status })
    }

    render() {
        return (
            <View style={styles.content}>
                <BackgrounImageBaseo />
                <Input
                    ref = 'usuario'
                    value={this.state.usuario}
                    placeholder='Usuario / e-mail'
                    onChangeText={(usuario) => this.setState({ usuario })}
                    rightIcon={
                        <Icon
                            size={24}
                            color='black'
                            name='account-circle'
                        />
                    }
                />
                { this.isFieldInError('usuario') && this.getErrorsInField('usuario').map((errorMessage, index) => <Text key={index} style={styles.errorRequired}>{ formValidation.required}</Text>) }
                <Input
                    ref = 'contrasena'
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={(contrasena) => this.setState({ contrasena })}
                    rightIcon={
                        <Icon
                            size={24}
                            color='black'
                            name='vpn-key'
                        />
                    }
                />
                { this.isFieldInError('contrasena') && this.getErrorsInField('contrasena').map((errorMessage, index) => <Text key={index} style={styles.errorRequired}>{formValidation.required}</Text>) }
                <View style={styles.viewButton}>
                    <Button
                        icon={
                            <Icon
                                name="done"
                                size={25}
                                color="black"
                            />
                        }
                        raised
                        type="clear"
                        titleStyle={{ color: '#000000' }}
                        buttonStyle={styles.boton}
                        onPress={() => this.ingresar()}
                        title='Ingresa' />

                </View>
                <View style={styles.viewButton}>
                    <Button
                        icon={
                            <Icon
                                name="event-note"
                                size={25}
                                color="black"
                            />
                        }
                        onPress={() => this.props.navigation.navigate('Regístrate')}
                        raised
                        type="clear"
                        titleStyle={{ color: '#000000' }}
                        buttonStyle={styles.boton}
                        title='Regístrate' />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorRequired: {
        color: "red",
        fontSize: 13,
        paddingLeft: 8
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E4F1FE'
    },
    boton: {
        borderColor: '#000000',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        backgroundColor: 'transparent',
        height: 35,
        width: 150
    },
    viewButton: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 10
    }
});

const formValidation = {
    required: 'El campo es requerido!'
}

