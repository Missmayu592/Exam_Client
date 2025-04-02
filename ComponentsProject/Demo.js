
import Styles from "../Helper/Styles";
import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";

function Demo(){
    return(
        <View style={Styles.container}>
        <Text style={Styles.text}>Hello, React Native!</Text>
        
        <TouchableOpacity style={Styles.button}>
            <Text style={Styles.buttonText}>Click Me</Text>
        </TouchableOpacity>
    </View>
    )
}


export default Demo;