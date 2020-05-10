import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Modal, TouchableHighlight } from 'react-native';
import { allProducts, searchProduct } from "../productos/service";
import { Button, Image, SearchBar, Avatar, Divider } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { generateCode } from "../general/code";
import BackgrounImageBaseo from "../general/backgrounImageBaseo";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            openModal: false,
            itemView: {},
            loading: false,
            productos: [],
            productosIniciales: [],
        }
    }

    async componentDidMount() {
        
        const data = await allProducts();
        await this.setState({
            productos: (data === undefined) ? [] : data,
            productosIniciales: (data === undefined) ? [] : data
        })
    }

    async agregar(item) {
        this.setState({ openModal: false })
        item.code = await generateCode()
        this.props.navigation.navigate('Carrito', {
            data: item
        })
    }

    async updateSearch (search) {
        await this.setState({ search });
        if (this.state.search.length > 2) {
            await this.setState({ loading: true });

            const data = await searchProduct(this.state.search);
            await this.setState({
                productos: (data === undefined) ? [] : data,
            })
            await this.setState({ loading: false });
        } else {
            await this.setState({ productos: this.state.productosIniciales });
        }
    };

    async viewProduct (item) {
        await this.setState({
            openModal: true,
            itemView: item
        })
    }

    render() {
        if (this.state.openModal) {
            return (
                <View style={styles.modaContent}>
                    <View style={styles.viewModal}>
                        <Modal
                            style={ styles.modal }
                            animationType="slide"
                            transparent={true}
                            >
                            <View style={{ alignItems:"center", marginTop:7 }}>
                                <Image
                                    source={require('../../../assets/' + this.state.itemView.imagen )}
                                    style={{ width: 200, height: 200 }}
                                />
                            </View>
                            <View style={{ borderColor:'#A4D2FF', borderWidth:2, borderRadius:5, margin:10 }}>
                                <View style={styles.viewText}>
                                    <Text style={styles.textLeft}>Producto:</Text>
                                    <Text style = {styles.textRight}>{ this.state.itemView.nombre }</Text>
                                </View>
                                <View style={styles.viewText}>
                                    <Text style={styles.textLeft}>Costo:</Text>
                                    <Text style = {styles.textRight}>{ '$ ' + this.state.itemView.costo }</Text>
                                </View>
                                <View style={styles.viewText}>
                                    <Text style={styles.textLeft}>Vendedor:</Text>
                                    <Text style = {styles.textRight}>{ this.state.itemView.proveedor }</Text>
                                </View>
                                <View style={styles.viewText}>
                                    <Text style={styles.textLeft}>Ventas:</Text>
                                    <Text style = {styles.textRight}>{ this.state.itemView.ventas }</Text>
                                </View>
                            </View>

                            <View style={{ flex:1, flexDirection:"row", position:"absolute", bottom:7, alignItems:"center", alignSelf:"center" }}>
                                <View style = {{ flex: 1, marginRight: 5 }} >
                                    <Button 
                                        buttonStyle = {{ borderColor: '#C6C8C9', height:35 }}
                                        onPress = { () => this.setState({ openModal: false }) }
                                        icon = { <MaterialCommunityIcons name="close" color={"#C6C8C9"} size={17} /> }
                                        type="outline"
                                        title="CANCELAR"
                                        titleStyle= {{ color: '#C6C8C9', fontSize: 17 }}
                                    />
                                </View>
                                <View style = {{ flex: 1, marginLeft: 5 }} >
                                    <Button 
                                        buttonStyle = {{ borderColor: '#A4D2FF', height:35 }}
                                        onPress = {
                                            () => this.agregar(this.state.itemView)
                                        }
                                        icon = { <MaterialCommunityIcons name="cart" color={"#A4D2FF"} size={17} /> }
                                        type="outline"
                                        title="AGREGAR"
                                        titleStyle= {{ color: '#A4D2FF', fontSize: 17 }}
                                    />
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.mainView}>
                <BackgrounImageBaseo />
                <SearchBar
                    containerStyle = {{ backgroundColor: '#E4F1FE', borderBottomWidth: 0, borderTopWidth: 0 }}
                    inputContainerStyle = {{ backgroundColor: '#fff', borderColor: '#E4F1FE', borderRadius:10 }}
                    placeholder="Buscar..."
                    showLoading={this.state.loading}
                    onChangeText={ (search) => { this.updateSearch(search) }}
                    value={this.state.search}
                />
                <ScrollView style={styles.scroll}>
                    
                    <FlatList
                        data={this.state.productos}
                        renderItem={({ item }) => (
            
                            <View style={styles.item}>
                                <View style={{ height:'40px', width:'40px', flex:1 }}>
                                    <Avatar
                                        rounded
                                        source={require('../../../assets/' + item.imagen )}
                                        style={{ width: 40, height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: 2, alignItems:'center', justifyContent:"center" }}>
                                    <Text style={styles.title}>{item.nombre}</Text>
                                    <Text style={{ fontSize:12 }}> Ventas: { item.ventas } </Text>
                                </View>
                                <View style={{ flex: 2, alignItems:'center', justifyContent:"center" }}>
                                    <Text style={styles.title}>{`$ ${item.costo}`}</Text>
                                </View>
                                <View style={{ flex: 2, flexDirection:'row-reverse' }}>
                                    <View style={{ flex:1 }}>
                                        <Button
                                            onPress = {
                                                () => this.agregar(item)
                                            }
                                            icon={
                                                <MaterialCommunityIcons name="cart" color={"#000"} size={20} />
                                            }
                                            type="clear"
                                        />
                                    </View>
                                    <View style={{ flex:1 }}>
                                        <Button
                                            onPress = {
                                                () => this.viewProduct(item)
                                            }
                                            icon = {
                                                <MaterialCommunityIcons name="eye" color={"#000"} size={20} />
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
        borderBottomWidth: 2,
        padding: 5,
        marginHorizontal: 16,
        margin:5
    },
    title: {
        fontSize: 18,
    },
    modal: {
        height: 390,
        width: 270,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: '#E4F1FE'
    },
    viewModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        margin: 20,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },
    modaContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#E4F1FE'
    },
    viewText: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 3,
        marginTop: 3
    },
    textLeft: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
    },
    textRight: {
        flex: 1,
        marginLeft: 5
    },
    mainView: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#E4F1FE',
    }
});

