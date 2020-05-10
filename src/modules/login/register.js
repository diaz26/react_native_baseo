import React, { Component } from 'react';
import { StyleSheet, View, Text, Picker, ScrollView, Modal } from 'react-native';
import { Button, Input, Icon, Image } from 'react-native-elements';
import { registerCreate, agregarUsuario } from "./service";
import ModalError from "../general/modalError";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            respuesta: { msg:'ex' },
            loading: true,
            visible: true,
            generos: {},
            nombres: '',
            apellidos: '',
            identificacion: '',
            genero_id: '0',
            email: '',
            contrasena: '',
            nombresValidate: null,
            apellidosValidate: null,
            identificacionValidate: null,
            genero_idValidate: null,
            emailValidate: null,
            contrasenaValidate: null,
        }
    }

    async componentDidMount() {
        const data = await registerCreate();
        this.setState({
            generos: (data === undefined) ? {} : data
        })
    }

    registrar = async () => {

        await this.setState(() => ({ nombresValidate: (this.state.nombres == '' || this.state.nombres === null) ? 'El campo es requerido' : null }));
        await this.setState(() => ({ apellidosValidate: (this.state.apellidos == '' || this.state.apellidos === null) ? 'El campo es requerido' : null }));
        await this.setState(() => ({ identificacionValidate: (this.state.identificacion == '' || this.state.identificacion === null) ? 'El campo es requerido' : null }));
        await this.setState(() => ({ genero_idValidate: (this.state.genero_id == '' || this.state.genero_id == '0') ? 'El campo es requerido' : null }));
        await this.setState(() => ({ emailValidate: (this.state.email == '' || this.state.email === null) ? 'El campo es requerido' : null }));
        await this.setState(() => ({ contrasenaValidate: (this.state.contrasena == '' || this.state.contrasena === null) ? 'El campo es requerido' : null }));

        if (!this.state.nombresValidate && !this.state.apellidosValidate && !this.state.identificacionValidate && !this.state.genero_idValidate && !this.state.emailValidate && !this.state.contrasenaValidate) {
            const data = {
                nombres: this.state.nombres,
                apellidos: this.state.apellidos,
                identificacion: this.state.identificacion,
                genero_id: this.state.genero_id,
                email: this.state.email,
                contrasena: this.state.contrasena,
                rol_id: 1
            }
            const resp = await agregarUsuario(data);
            if (resp.status == 'success') {
                this.props.navigation.push('Inicio')
            } else {
                await this.setState({ respuesta: resp, openModal: true, contrasena: null })
            }
        }
    }

    closeModal = (status) => {
        this.setState({ openModal: status })
    }

    render() {
        let elementos = Object.entries(this.state.generos);
        let generosItems = elementos.map((data, index) => {
            return <Picker.Item key={index} value={data[1].id} label={data[1].nombre} />
        });
        if (this.state.openModal) {
            return (
                <ModalError msg={ this.state.respuesta.msg } closeModal={this.closeModal} />
            );
        } else {
            return (
                <View style={styles.content}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/icon.png')}
                            style={{ width: 70, height: 70 }}
                        />
                    </View>
                    <Input
                        placeholder='NOMBRES'
                        value={this.state.nombres}
                        onChangeText={(nombres) => this.setState({ nombres })}
                        rightIcon={
                            <Icon
                                size={24}
                                color='black'
                                name='person'
                            />
                        }
                    />
                    {!!this.state.nombresValidate && (
                        <Text style={styles.errorRequired}>{this.state.nombresValidate}</Text>
                    )}
                    <Input
                        placeholder='APELLIDOS'
                        value={this.state.apellidos}
                        onChangeText={(apellidos) => this.setState({ apellidos })}
                        rightIcon={
                            <Icon
                                size={24}
                                color='black'
                                name='people'
                            />
                        }
                    />
                    {!!this.state.apellidosValidate && (
                        <Text style={styles.errorRequired}>{this.state.apellidosValidate}</Text>
                    )}
                    <Input
                        placeholder='IDENTIFICACIÓN'
                        value={this.state.identificacion}
                        onChangeText={(identificacion) => this.setState({ identificacion })}
                        rightIcon={
                            <Icon
                                size={24}
                                color='black'
                                name='folder-shared'
                            />
                        }
                    />
                    {!!this.state.identificacionValidate && (
                        <Text style={styles.errorRequired}>{this.state.identificacionValidate}</Text>
                    )}
    
                    <Picker
                        style={{ backgroundColor: '#E4F1FE', height: 40, margin: 10, borderRadius: 5 }}
                        selectedValue={this.state.genero_id}
                        onValueChange={value => {
                            if (value != "0")
                                this.setState({ genero_id: value })
                        }}
                        >
                        <Picker.Item label="SELECCIONE EL GÉNERO" value="0" />
                        {generosItems}
                    </Picker>
                    {!!this.state.genero_idValidate && (
                        <Text style={styles.errorRequired}>{this.state.genero_idValidate}</Text>
                    )}
                    <Input
                        placeholder='EMAIL O USUARIO'
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        rightIcon={
                            <Icon
                                size={24}
                                color='black'
                                name='account-circle'
                            />
                        }
                    />
                    {!!this.state.emailValidate && (
                        <Text style={styles.errorRequired}>{this.state.emailValidate}</Text>
                    )}
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex:7 }}>
                            <Input
                                placeholder='CONTRASEÑA'
                                onChangeText={(contrasena) => this.setState({ contrasena })}
                                secureTextEntry={this.state.visible}
                            />
    
                        </View>
                        <View style={{ flex:1 }}>
                            <Button
                                iconRight={true}
                                icon={
                                    <Icon
                                        name="remove-red-eye"
                                        size={25}
                                        color="black"
                                    />
                                }
                                type="clear"
                                onPress={() => this.setState({ visible: !this.state.visible })}
                            />
                        </View>
    
                    </View>
    
                    {!!this.state.contrasenaValidate && (
                        <Text style={styles.errorRequired}>{this.state.contrasenaValidate}</Text>
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
                            onPress={() => this.registrar()}
                            title='REGISTRARME' />
    
                    </View>
                    <View style={styles.viewButton}>
                    <Button
                        icon={
                            <Icon
                                name="account-circle"
                                size={25}
                                color="black"
                            />
                        }
                        onPress={() => this.props.navigation.navigate('Ingresa')}
                        raised
                        type="outline"
                        titleStyle={{ color: '#000000' }}
                        buttonStyle={styles.boton}
                        title='INGRESAR' />
                    </View>
                </View>
            );

        }
    }
}

const styles = StyleSheet.create({
    errorRequired: {
        color: "red",
        fontSize: 13,
        paddingLeft: 10
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
    },
});

