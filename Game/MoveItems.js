import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window");

function MoveItems() {
    const rightVal = useRef(new Animated.Value(0)).current;
    const leftVal = useRef(new Animated.Value(0)).current;

    const rightMove = () => {
        Animated.timing(rightVal, {
            toValue: width - 100, // Moves to near the right edge
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };

    const leftMove = () =>{
        Animated.timing(rightVal, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={rightMove}>
                <Text style={styles.right}>Right</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box} onPress={leftMove}>
                <Text style={styles.left}>Left</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.snakeAnimated, { transform: [{ translateX: rightVal }] }]}>
                <FastImage source={require("../assets/Images/snake1.gif")} resizeMode={FastImage.resizeMode.contain} style={styles.img} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    box: {
        borderRadius: 5,
        backgroundColor: "green",
        padding: 5,
        margin: 5,
    },
    right: {
        fontSize: 20,
        padding: 3,
        margin: 5,
        color: "white",
    },
    left: {
        fontSize: 20,
        padding: 3,
        margin: 5,
        color: "white",
    },
    img: {
        width: 100,
        height: 100,
    },
    snakeAnimated: {
        position: "absolute",
        bottom: 0,
        left: 0, 
    },
});

export default MoveItems;
