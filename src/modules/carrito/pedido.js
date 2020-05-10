import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Picker} from 'react-native';
import { Button, Image, Input, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackgrounImageBaseo from "../general/backgrounImageBaseo";
import { insertOrder, paramsOrder } from "./service";

export default class Pedido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            metodosPagos: [],
            direccion: '',
            cuenta: '',
            metodo_pago: '0',
            loading: false,
            total: props.route.params.total,
            productos: props.route.params.productos,
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.route.params !== this.props.route.params) {
            if (this.props.route.params.total !== undefined) {
                this.setState({
                    total: this.props.route.params.total,
                    productos: this.props.route.params.productos
                })
            }
        }
        
    }

    async componentDidMount() {
        const data = await paramsOrder();
        await this.setState({ user: data.user, metodosPagos: data.listas.metodosPagos })
    }

    async procesarPago() {
        let user = this.state.user;
        let data = {
            productos: this.state.productos,
            info: {
                ...user,
                total: this.state.total,
                direccion: this.state.direccion,
                metodo_pago: this.state.metodo_pago,
                cuenta: this.state.cuenta,
            }
        }
        const resp = await insertOrder(data)
        if (resp.status == 'success') {
            this.props.navigation.navigate('pedidos')
        }
        
    }

    render() {
        let elementos = Object.entries(this.state.metodosPagos);
        let metodosItems = elementos.map((data, index) => {
            return <Picker.Item key={index} value={data[1].id} label={data[1].nombre} />
        });
        return (
            <View style={styles.mainView}>
                <BackgrounImageBaseo />
                <View style={{ borderBottomWidth: 2, borderBottomColor: '#fff', height: 50, flexDirection:"row" }}>
                    <View style={{ flex:1, marginTop: 5, marginLeft: 10 }}>
                        <Button
                            buttonStyle={{ backgroundColor:'#fff', borderRadius: '50%' }}
                            onPress={ () => this.props.navigation.navigate('Carrito') }
                            icon={
                                <MaterialCommunityIcons name="keyboard-backspace" color={"#A4D2FF"} size={20} />
                            }
                            titleStyle={{ color:'#A4D2FF', fontSize:11 }}
                            title=" VOLVER"
                            type="solid"
                        />
                    </View>
                    <View style={{ paddingTop:15, marginLeft: 10 , flex:2 }}>
                        <Text style={{ fontSize: 16 }}> { `PEDIDO` } </Text>
                    </View>
                </View>
                
                <ScrollView style={styles.scroll}>
                    <View style={{ alignItems:"center", marginTop:5, marginBottom: 5, paddingBottom:5 , borderBottomWidth:1, borderBottomColor: '#fff'  }} >
                        <Text style={{ fontSize:17, fontWeight:"bold" }}> Información del pedido </Text>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.paramsText}>
                            <Text style={styles.bold}>Nombres: </Text>
                        </View>
                        <View style={styles.paramsVars}>
                            <Input 
                                disabled
                                inputContainerStyle= {{ height:30, width: 160, borderBottomWidth:1, borderBottomColor:'#fff' }}
                                value={this.state.user.nombres || ''} />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.paramsText}>
                            <Text style={styles.bold}>Apellidos: </Text>
                        </View>
                        <View style={styles.paramsVars}>
                            <Input 
                                disabled
                                inputContainerStyle= {{ height:30, width: 160, borderBottomWidth:1, borderBottomColor:'#fff' }}
                                value={this.state.user.apellidos || ''} />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.paramsText}>
                            <Text style={styles.bold}>Email: </Text>
                        </View>
                        <View style={styles.paramsVars}>
                            <Input 
                                disabled
                                inputContainerStyle= {{ height:30, width: 160, borderBottomWidth:1, borderBottomColor:'#fff' }}
                                value={this.state.user.email || ''} />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.paramsText}>
                            <Text style={styles.bold}>Identificación: </Text>
                        </View>
                        <View style={styles.paramsVars}>
                            <Input 
                                disabled
                                inputContainerStyle= {{ height:30, width: 160, borderBottomWidth:1, borderBottomColor:'#fff' }}
                                value={this.state.user.identificacion || ''} />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.paramsText}>
                            <Text style={styles.bold}>Direccion: </Text>
                        </View>
                        <View style={styles.paramsVars}>
                            <Input 
                                value={this.state.direccion}
                                maxLength={20}
                                onChangeText={(direccion) => this.setState({ direccion })}
                                inputContainerStyle= {{ height:30, width: 160, borderBottomWidth:1, borderBottomColor:'#fff' }}
                                placeholder="Dirección" />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.paramsText}>
                            <Text style={styles.bold}>Valor total: </Text>
                        </View>
                        <View style={styles.paramsVars}>
                            <Input 
                                disabled
                                value={ `$ ${this.state.total}` }
                                inputContainerStyle= {{ height:30, width: 160, borderBottomWidth:1, borderBottomColor:'#fff' }} />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.paramsText}>
                            <Text style={styles.bold}>Método de pago: </Text>
                        </View>
                        <View style={styles.paramsVars}>
                            <Picker
                                style={{ backgroundColor: 'transparent', height: 50, marginLeft: 7, borderRadius: 5, marginTop: 3, width:165 }}
                                selectedValue={this.state.metodo_pago}
                                onValueChange={metodo_pago => {
                                    if (metodo_pago != "0")
                                        this.setState({ metodo_pago })
                                }}
                                >
                                <Picker.Item label="Seleccione..." disabled value="0" />
                                {metodosItems}
                            </Picker>
                        </View>
                    </View>
                    <View style={{ flex:1, flexDirection:"row", marginTop:7 }}>
                        <View style={styles.paramsText}>
                            <Text style={styles.bold}>N° Cuenta o Email: </Text>
                        </View>
                        <View style={styles.paramsVars}>
                            <Input 
                                value={this.state.cuenta}
                                maxLength={17}
                                onChangeText={(cuenta) => this.setState({ cuenta })}
                                inputContainerStyle= {{ height:30, width: 160, borderBottomWidth:1, borderBottomColor:'#fff' }}
                                placeholder = "N° Cuenta o Email" />
                        </View>
                    </View>
                    <View style={styles.viewButton}>
                        <Button
                            icon={
                                <Icon
                                    name="done"
                                    size={25}
                                    color="black"
                                />
                            }
                            onPress={() => this.procesarPago()}
                            raised
                            disabled = { ( this.state.direccion == '' || this.state.metodo_pago == '0' || this.state.cuenta == '' ) }
                            type="outline"
                            titleStyle={{ color: '#000000', fontSize:17 }}
                            buttonStyle={styles.boton}
                            title='REALIZAR' />
                        </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
    },
    item: {
        flex:1,
        flexDirection:'row',
    },
    title: {
        fontSize: 18,
    },
    bold: {
        fontSize: 16,
        fontWeight:"bold"
    },
    mainView: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#E4F1FE',
    },
    paramsText: {
        flex: 2,
    },
    paramsVars: {
        flex: 3
    },
    viewButton: {
        alignItems: 'center',
        marginTop: 20
    },
    boton: {
        borderColor: '#000000',
        backgroundColor: '#E4F1FE',
        height: 35,
        width: 150
    },
});


