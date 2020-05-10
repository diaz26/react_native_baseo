import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Dimensions } from 'react-native';

export default class backgrounImageBaseo extends Component {
    render() {
        return (
            <ImageBackground resizeMode = 'center' source = { require('../../../assets/icon.png')} style = { styles.image } />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        justifyContent: "center",
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        opacity: 0.15
    }
});

