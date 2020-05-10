import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import { Button, Image } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackgrounImageBaseo from "../general/backgrounImageBaseo";

export default class Carrito extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            itemTemp: null,
            total: (this.props.route.params !== undefined && this.props.route.params.data !== undefined) ? this.props.route.params.data.costo : 0,
            carrito: (this.props.route.params !== undefined && this.props.route.params.data !== undefined) ? [{
                ...this.props.route.params.data, cantidad: 1, valor: this.props.route.params.data.costo }]: [],
            loading: false,
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.route.params !== this.props.route.params) {
            if (this.props.route.params.data !== undefined) {

                /** BUSCAR SI YA EXISTE EL REGISTRO */
                let result = this.state.carrito.find((e) => e.code == this.props.route.params.data.code)
                if (result === undefined || result === null) {
                    await this.agregar(this.props.route.params.data)
                }
            }
        }
        
    }

    async agregar(item) {
        let result = this.state.carrito.find((prod) => prod.id == item.id )
        if (result !== undefined && result !== null) {
            await this.state.carrito.forEach(producto => {
                if (producto.id == item.id) {
                    producto.cantidad ++
                    producto.code = item.code
                    producto.valor = producto.costo * producto.cantidad
                }
            });
        } else {
            let carritoTemporal = this.state.carrito
            item.cantidad = 1
            item.agregar = false
            item.valor = item.costo
            carritoTemporal.push(item)
            await this.setState({ productos: carritoTemporal })
        }

        this.calcularTotal()
        this.setState({ 
            refresh: !this.state.refresh
        })
    }

    async restar(item) {
        let result = this.state.carrito.find((prod) => prod.id == item.id )
        if (result !== null && result.cantidad == 1) {
            let nuevosCarrito = [];
            await this.state.carrito.forEach(e => {
                if (e.id != item.id) {
                    nuevosCarrito.push(e)
                }
            });
            await this.setState({
                carrito: nuevosCarrito
            })

        } else {
            await this.state.carrito.forEach(e => {
                if (e.id == item.id) {
                    e.cantidad --
                    e.valor = e.costo * e.cantidad
                }
            });
        }
        this.setState({ 
            refresh: !this.state.refresh
        })
        this.calcularTotal()
    }

    async calcularTotal() {
        this.setState({total: 0})
        let totalTem = 0;
        await this.state.carrito.forEach(producto => {
            totalTem += producto.valor;
        });
        this.setState({ total: totalTem })
    }

    render() {
        return (
            <View style={styles.mainView}>
                <BackgrounImageBaseo />
                    <View>
                        <Text style={{ fontSize: 16, alignSelf:"center", marginTop:10, marginBottom:10 }}> { `TOTAL: $ ${this.state.total}` } </Text>
                        <View style={{ flex:1, flexDirection:"row", borderTopWidth:2, borderColor:"#fff", paddingTop:5, borderBottomWidth: 2, paddingBottom:5 }}>
                            <View style={{ flex: 3, alignItems:"center" }}>
                                <Text style={ styles.bold }>PRODUCTO</Text>
                            </View>
                            <View style={{ flex: 2, alignItems:"center" }}>
                                <Text style={ styles.bold }>VALOR</Text>
                            </View>
                            <View style={{ flex: 2, alignItems:"flex-start" }}>
                                <Text style={ styles.bold }>CANTIDAD</Text>
                            </View>
                        </View>
                    </View>
                    
                <ScrollView style={styles.scroll}>
                    <FlatList
                        extraData={this.state.refresh}
                        data={this.state.carrito}
                        renderItem = { ({item}) => (
                            <View style={styles.item}>
                                <View style={{ height:'40px', width:'40px', flex:1 }}>
                                    <Image
                                        source={require('../../../assets/' + item.imagen )}
                                        style={{ width: 40, height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: 2, alignItems:"center" , justifyContent: "center"}}>
                                    <Text style={styles.title, styles.title}>{item.nombre}</Text>
                                </View>
                                <View style={{ flex: 2, alignItems:"center" , justifyContent: "center"}}>
                                    <Text style={styles.title}>{`$ ${item.valor}`}</Text>
                                </View>
                                <View style={{ flex:2, flexDirection:'row-reverse' }}>
                                    <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
                                        <Button
                                            icon={
                                                <MaterialCommunityIcons name="plus" color={"green"} size={20} onPress={ async() => { this.agregar(item) } } />
                                            }
                                            type="clear"
                                        />
                                    </View>
                                    <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
                                        <Text style={{ fontSize:18 }}> { item.cantidad } </Text>
                                    </View>
                                    <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
                                        <Button
                                            icon={
                                                <MaterialCommunityIcons name="minus" color={"red"} size={20} onPress={ async() => { this.restar(item) } } />
                                            }
                                            type="clear"
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => String(item.id)}
                    />
                </ScrollView>
                {this.state.total > 0 && 
                    <View style={{ position:"absolute", right:8, bottom:15 }}>
                        <Button
                            buttonStyle={{ backgroundColor:'#fff', borderRadius: '50%' }}
                            onPress={() => this.props.navigation.navigate('PedidoActual', {
                                total: this.state.total,
                                productos: this.state.carrito
                            })}
                            icon={
                                <MaterialCommunityIcons name="cash-multiple" color={"#A4D2FF"} size={25} />
                            }
                            titleStyle={{ color:'#A4D2FF', fontSize:11 }}
                            title=" PAGAR"
                            type="solid"
                        />
                    
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
    },
    item: {
        flex:1,
        flexDirection:'row',
        borderColor:"#fff",
        padding: 5,
        marginHorizontal: 16,
        margin:5
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
    }
});


