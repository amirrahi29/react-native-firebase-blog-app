import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'

const ProductDetailsScreen = ({route}) => {

    useEffect(() => {
        console.log(route.params.productData);
    }, []);

    return (
        <View>
            <Image source={{uri:route.params.productData.photo}} style={{height:300,width:'100%',marginTop:0}} />
            <Text style={{color:'black',fontSize:24}}>{route.params.productData.title}</Text>
            <Text style={{color:'grey',fontSize:18}}>{route.params.productData.description}</Text>
            <Text style={{color:'black',fontSize:18}}>Added by: {route.params.productData.email}</Text>
        </View>
    )
}

export default ProductDetailsScreen