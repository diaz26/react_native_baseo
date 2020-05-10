import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class ModalError extends Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.viewModal}>
                    <Modal
                        style={ styles.modal }
                        animationType="slide"
                        transparent={true}
                    >
                        <Text style={styles.modalText}> { this.props.msg } </Text>
                        <Button
                            icon={
                                <Icon
                                    name="cancel"
                                    size={80}
                                    color="red"
                                />
                            }
                            type="clear"
                            onPress={() => {
                                this.props.closeModal(false)
                            }}
                        />
                    </Modal>
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    modal: {
        height:'auto', 
        width:'auto' , 
        alignItems:'center', 
        backgroundColor: "white",
        borderRadius: 10, 
        borderColor:'black'
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#E4F1FE'
    }
});

