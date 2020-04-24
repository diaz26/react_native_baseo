import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import { products, searchProduct } from "../productos/service";
import { Button, Input, Icon, Image, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Carrito extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            total: 0,
            carrito: [],
            loading: false,
            productos: [],
            productosIniciales: [],
        }
    }

    async componentDidMount() {
        const data = await products();
        await this.setState({
            productos: (data === undefined) ? [] : data,
            productosIniciales: (data === undefined) ? [] : data
        })
        await this.state.productos.forEach(producto => {
            producto.cantidad = 1
            producto.valor = producto.costo
        });
        this.calcularTotal()
    }

    async agregar(item) {
        let encuentra = false
        await this.state.productos.forEach(producto => {
            if (producto.id == item.id) {
                encuentra = true
                producto.cantidad ++
                producto.valor = producto.costo * producto.cantidad
            }
        });
        if (! encuentra) {
            let carritoTemporal = this.state.productos
            item.cantidad = 1
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
        let result = this.state.productos.find((prod) => prod.id = item.id )
        if (result !== null && result.cantidad == 1) {
            console.log('si', result)
            let carritoTemporal = this.state.productos
            this.setState({productos: []})

            await carritoTemporal.forEach(e => {
                if (e.id != item.id) {
                    this.state.productos.push(e)
                }
            });
        } else {
            console.log('no')
            this.state.productos.forEach(e => {
                if (e.id == item.id) {
                    e.cantidad --
                    e.valor = e.costo * e.cantidad
                }
            });
        }
        console.log(this.state.productos)
        this.setState({ 
            refresh: !this.state.refresh
        })
        this.calcularTotal()
    }

    async calcularTotal() {
        this.setState({total: 0})
        await this.state.productos.forEach(producto => {
            this.setState({ total: this.state.total + producto.valor })
        });
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={{ flex:1, alignItems: "center", marginBottom:10, marginTop:10 }}>
                    <Text style={{ fontSize: 20 }}> { `Total: $ ${this.state.total}` } </Text>
                </View>

                <View style={{ flex: 1, flexDirection:"row", marginBottom:10, marginTop:10 }}>
                    <View style={{ flex: 3, alignItems:"center" }}>
                        <Text style={ styles.bold }>Producto</Text>
                    </View>
                    <View style={{ flex: 2, alignItems:"center" }}>
                        <Text style={ styles.bold }>Valor</Text>
                    </View>
                    <View style={{ flex: 2, alignItems:"flex-start" }}>
                        <Text style={ styles.bold }>Cantidad</Text>
                    </View>
                </View>
                <FlatList
                    extraData={this.state.refresh}
                    data={this.state.productos}
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
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#E4F1FE'
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
        fontSize: 18,
        fontWeight:"bold"
    }
});


