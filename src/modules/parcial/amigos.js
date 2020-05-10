import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Modal } from 'react-native';
import { allProducts, searchProduct } from "../productos/service";
import { Button, Image, SearchBar, Avatar, Divider } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackgrounImageBaseo from "../general/backgrounImageBaseo";

export default class Amigos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amigos: [
                {
                    id: 1,
                    nombres: 'Leonardo',
                    apellidos: 'Jimienez',
                    edad: 30,
                    amigos_comun: '12',
                    foto: 'borrador.jpg'
                },
                {
                    id: 2,
                    nombres: 'Carlos Alberto',
                    apellidos: 'Gomez',
                    edad: 25,
                    amigos_comun: '3',
                    foto: 'cinta.jpg'
                },
                {
                    id: 3,
                    nombres: 'Erick',
                    apellidos: 'Vergara',
                    edad: 19,
                    amigos_comun: '17',
                    foto: 'lapicero.jpg'
                },
                {
                    id: 4,
                    nombres: 'Julian',
                    apellidos: 'Ramirez',
                    edad: 23,
                    amigos_comun: '1',
                    foto: 'marcador.jpg'
                }
            ],
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={{ alignItems:"center", borderBottomWidth: 1, borderBottomColor:'white' }} >
                    <Text style={{ fontSize:23, marginBottom: 15, marginTop:10 }}> FACEFET - AMIGOS </Text>
                </View>
                <ScrollView style={styles.scroll}>
                    <FlatList
                        data={this.state.amigos}
                        renderItem={({ item }) => (
            
                            <View style={styles.item}>
                                <View style={{ height:'40px', width:'40px', flex:1 }}>
                                    <Avatar
                                        rounded
                                        source={require('../../../assets/' + item.foto )}
                                        style={{ width: 40, height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: 2, alignItems:'center', justifyContent:"center" }}>
                                    <Text style={styles.title}>{item.nombres}</Text>
                                    <Text style={styles.title}>{item.apellidos}</Text>
                                    <Text style={{ fontSize:14 }}>{`${item.edad} años`}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        icon = {
                                            <MaterialCommunityIcons name="account-group" color={"#000"} size={20} />
                                        }
                                        title = {item.amigos_comun }
                                        type="clear"
                                    />
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
        fontSize: 16,
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

