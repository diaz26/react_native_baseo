import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Modal } from 'react-native';
import { Button, Avatar, Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            idPost: 1,
            postContent:'',
            user: {
                id: 31,
                nombres: 'Jeff',
                apellidos: 'Diaz Aya',
                edad: 20,
                foto: 'resma.jpg'
            },
            posts: []
        }
    }

    async addPost() {
        if (this.state.postContent !== '') {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1;
            let yyyy = today.getFullYear();
            let h = today.getHours();
            let m = today.getMinutes();

            let postTemps = this.state.posts;
            postTemps.push({
                id: this.state.idPost,
                date: `${dd}/${mm}/${yyyy} ${h}:${m}`,
                content: this.state.postContent,
                colorBoton: '#C6C8C9'
            })
            await this.setState({
                idPost: this.state.idPost + 1,
                posts: postTemps,
                refresh: !this.state.refresh,
                postContent: ''
            })
        }
    }

    async likePost(id) {
        let postTemps = this.state.posts;
        postTemps.forEach(post => {
            if (post.id == id) {
                post.colorBoton = (post.colorBoton == '#19A4E9') ? '#C6C8C9' : '#19A4E9'
            }
        });
        await this.setState({
            posts: postTemps,
            refresh: !this.state.refresh,
        })
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={{ alignItems:"center", borderBottomWidth: 1, borderBottomColor:'white' }} >
                    <Text style={{ fontSize:23, marginBottom: 15, marginTop:10 }}> FACEFET - PERFIL </Text>
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={{ alignItems:"center", marginTop:10 }}>
                        <Text style={{ fontSize:23, fontWeight: "bold", marginBottom: 20, marginTop:10 }}> Información personal </Text>
                        <Avatar
                            rounded
                            source={require('../../../assets/' + this.state.user.foto )}
                            style={{ width: 200, height: 200 }}
                        />
                    </View>
                    <View style={{ flexDirection:"row" }}>
                        <View style={{ flex:1, marginLeft:20 }}>
                            <Text style={{ marginTop:5, fontSize: 20, fontWeight:"bold" }}> Nombres: </Text>
                            <Text style={{ marginTop:5, fontSize: 20, fontWeight:"bold" }}> Apellidos: </Text>
                            <Text style={{ marginTop:5, fontSize: 20, fontWeight:"bold" }}> Edad: </Text>
                        </View>

                        <View style={{ flex:1 }}>
                            <Text style={{ marginTop:5, fontSize: 20 }}> { this.state.user.nombres } </Text>
                            <Text style={{ marginTop:5, fontSize: 20 }}> { this.state.user.apellidos } </Text>
                            <Text style={{ marginTop:5, fontSize: 20 }}> { this.state.user.edad + ' años' } </Text>
                        </View>
                    </View>
                    <View style={{ alignItems:"center", marginTop:10,  borderTopWidth: 1, borderTopColor:'white', borderBottomWidth: 1, borderBottomColor:'white' }}>
                        <Text style={{ fontSize:23, fontWeight: "bold", marginBottom: 20, marginTop:10 }}> Publicaciones </Text>
                    </View>
                    <View style={{ marginTop:10, borderBottomWidth: 1, borderBottomColor:'white' }}>
                        <Input 
                            placeholder="¿Qué estás pensando?" 
                            onChangeText={(postContent) => this.setState({ postContent })}
                            value={this.state.postContent}
                        />
                        <Button
                            disabled = { ( this.state.postContent == '' ) }
                            buttonStyle={{ marginTop: 5, width: 150, height: 30, borderBottomColor: '#fff', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#fff'  }}
                            onPress={ () => this.addPost() }
                            iconRight= {true}
                            icon = {
                                <MaterialCommunityIcons name="grease-pencil" color={"#A4D2FF"} size={20} />
                            }
                            title = 'PUBLICAR'
                            type = "outline"
                        />
                    </View>
                    <FlatList
                        data={this.state.posts}
                        extraData={this.state.refresh}
                        renderItem={({ item }) => (
            
                            <View style={styles.item}>
                                <Text style={{ fontSize: 12 }}> { 'Fecha: ' + item.date} </Text>
                                <View style={{ flexDirection:"row" }}>
                                    <View style={{ flex: 5, marginLeft: 5 }}>
                                        <Text style={styles.title}>{item.content}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Button
                                            onPress={ () => this.likePost(item.id) }
                                            icon = {
                                                <MaterialCommunityIcons name="thumb-up" color={item.colorBoton} size={20} />
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

