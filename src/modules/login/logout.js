import React, { Component } from 'react';
import { View } from 'react-native';
import {AsyncStorage} from 'react-native';
import { logout } from './service'

export default class Logout extends Component {
    constructor(props) {
        super(props);
    }

    async logout() {
        await logout()
    }

    render() {
        this.logout()
        return (
            <View>{this.props.navigation.push('Ingresa')}</View> 
        );
    }
}
