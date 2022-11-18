import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import {products} from "../../api/allProducts"
import Register from "../../screens/Register/Register"
import Login from '../../screens/Login/Login'

class ProductsAll extends Component {

    constructor(){
        super()
        this.state={
            info: products
        }
    }

    render() {
        return (
        <View>
            <Text>ProductsAll</Text>
            <Register/>
            <Login/>
        </View>
        )
    }
}

export default ProductsAll