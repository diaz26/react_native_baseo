import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import { products, searchProduct } from "../productos/service";
import { Button, Input, Icon, Image, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading:false,
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

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <SearchBar
                    containerStyle = {{ backgroundColor: '#E4F1FE', borderColor: '#E4F1FE' }}
                    inputContainerStyle = {{ backgroundColor: '#fff', borderColor: '#E4F1FE', borderRadius:10 }}
                    placeholder="Buscar..."
                    showLoading={this.state.loading}
                    onChangeText={ (search) => { this.updateSearch(search) }}
                    value={this.state.search}
                />
                <FlatList
                    data={this.state.productos}
                    renderItem={({ item }) => 
                    <View style={styles.item}>
                        <View style={{ height:'40px', width:'40px', flex:1 }}>
                            <Image
                                source={require('../../../assets/' + item.imagen )}
                                style={{ width: 40, height: 40 }}
                            />
                        </View>
                        <View style={{ flex: 2, alignItems:'center', justifyContent:"center" }}>
                            <Text style={styles.title}>{item.nombre}</Text>
                        </View>
                        <View style={{ flex: 2, alignItems:'center', justifyContent:"center" }}>
                            <Text style={styles.title}>{`$ ${item.costo}`}</Text>
                        </View>
                        <View style={{ flex:2, flexDirection:'row-reverse' }}>
                            <View style={{ flex:1 }}>
                                <Button
                                    icon={
                                        <MaterialCommunityIcons name="cart" color={"#000"} size={20} />
                                    }
                                    type="clear"
                                />
                            </View>
                            <View style={{ flex:1 }}>
                                <Button
                                    icon={
                                        <MaterialCommunityIcons name="eye" color={"#000"} size={20} />
                                    }
                                    type="clear"
                                />
                            </View>
                        </View>
                    </View>
                    }
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
});
