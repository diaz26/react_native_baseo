import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button, Input, Icon, Image } from 'react-native-elements';
import { login } from "./service";
import ModalError from "../general/modalError";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            respuesta: {},
            openModal: false,
            usuario: '',
            contrasena: '',
            validateUser: null,
            validatePass: null
        }
    }

    ingresar = async () => {
        // this.props.navigation.navigate('Inicio')
        await this.setState(() => ({ validateUser: (this.state.usuario === '') ? 'El campo es requerido' : null }));
        await this.setState(() => ({ validatePass: (this.state.contrasena === '') ? 'El campo es requerido' : null }));
        if (! this.state.validateUser && ! this.state.validatePass) {
            const data = {
                email: this.state.usuario,
                pass: this.state.contrasena
            }
            const resp = await login(data);
            if (resp.status == 'success') {
                this.props.navigation.navigate('Inicio')
            } else {
                await this.setState({ respuesta: resp, openModal: true, contrasena: '' })
            }
            
        }
    }

    closeModal = (status) => {
        this.setState({ openModal: status })
    }

    render() {
        if (this.state.openModal) {
            return (
                <ModalError msg={ this.state.respuesta.msg } closeModal={this.closeModal} />
            );
        }
        return (
            <View style={styles.content}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/icon.png')}
                        style={{ width: 70, height: 70 }}
                    />
                </View>

                <Input
                    value={this.state.usuario}
                    placeholder='USUARIO'
                    onChangeText={(usuario) => this.setState({ usuario })}
                    rightIcon={
                        <Icon
                            size={24}
                            color='black'
                            name='account-circle'
                        />
                    }
                />
                {!!this.state.validateUser && (
                    <Text style={styles.errorRequired}>{this.state.validateUser}</Text>
                )}
                <Input
                    placeholder='CONTRASEÑA'
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
                {!!this.state.validatePass && (
                    <Text style={styles.errorRequired}>{this.state.validatePass}</Text>
                )}
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
                        type="outline"
                        titleStyle={{ color: '#000000' }}
                        buttonStyle={styles.boton}
                        onPress={() => this.ingresar()}
                        title='INGRESA' />

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
                        type="outline"
                        titleStyle={{ color: '#000000' }}
                        buttonStyle={styles.boton}
                        title='REGÍSTRATE' />
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
        backgroundColor: '#E4F1FE',
        height: 35,
        width: 200
    },
    viewButton: {
        alignItems: 'center',
        marginTop: 10
    }
});

