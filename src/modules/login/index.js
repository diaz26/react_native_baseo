import React, { Component } from 'react';
import { StyleSheet, View, Text, Content, Card } from 'react-native';
import { Button, Input, Icon, Image } from 'react-native-elements';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contrasena: '',
            validateUser: null,
            validatePass: null
        }
    }

     ingresar = async() => {
        if (this.state.usuario === '') {
            await this.setState(() => ({ validateUser: 'El campo es requerido' }));
        } else {
            await this.setState(() => ({ validateUser: null }));
        }

        if (this.state.contrasena === '') {
            await this.setState(() => ({ validatePass: 'El campo es requerido' }));
        } else {
            await this.setState(() => ({ validatePass: null }));
        }
        
        if (this.state.validateUser === null && this.state.validatePass === null) {
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        return (
            <View style={ styles.content }>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/icon.png')}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
                
                <Input
                    placeholder='USUARIO'
                    onChangeText={ (usuario) => this.setState({usuario} ) }
                    rightIcon={
                        <Icon
                            size={24}
                            color='black'
                            name='account-circle'
                        />
                    }
                />
                {!!this.state.validateUser && (
                  <Text style={styles.errorRequired }>{this.state.validateUser}</Text>
                )}
                <Input
                    placeholder='CONTRASEÑA'
                    secureTextEntry={true}
                    onChangeText={ (contrasena) => this.setState({contrasena} ) }
                    rightIcon={
                        <Icon
                            size={24}
                            color='black'
                            name='vpn-key'
                        />
                    }
                />
                {!!this.state.validatePass && (
                  <Text style={styles.errorRequired }>{this.state.validatePass}</Text>
                )}
                <View style={ styles.viewButton }>
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
                        titleStyle = {{ color: '#000000' }}
                        buttonStyle = { styles.boton }
                        onPress={() => this.ingresar()}
                        title='INGRESA' />

                </View>
                <View style={ styles.viewButton }>
                    <Button
                        icon={
                            <Icon
                                name="event-note"
                                size={25}
                                color="black"
                                />
                        }
                        onPress = { () => this.props.navigation.navigate('Regístrate') }
                        raised
                        type="outline"
                        titleStyle = {{ color: '#000000' }}
                        buttonStyle = { styles.boton }
                        title='REGÍSTRATE' />
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorRequired: {
        color: "red", 
        fontSize:13,
        paddingLeft:8
    },
    textCenter:{
        textAlign: 'center',
        width: '100%'
    },
    content:{
        flex:1,
        justifyContent:'center',
        margin: 10,
        backgroundColor: '#E4F1FE'
    },
    boton:{
        borderColor: '#000000', 
        backgroundColor: '#E4F1FE', 
        height:35,
        width:200
    },
    body:{
        paddingVertical:20
    },
    viewButton: {
        alignItems: 'center', 
        marginTop:10
    }
});

