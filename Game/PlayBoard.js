import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View, Text, Dimensions,BackHandler, Alert } from "react-native";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window"); // Get screen width

function PlayBoard() {
    const navigation = useNavigation();
    const games = [
        { id: 1, name: "Snake Game", image: require("../assets/Images/snake.gif"), hero: "Run" },
        { id: 2, name: "Fruit Catch", image: require("../assets/Images/bird.gif"), hero: "Run" },
        { id: 3, name: "Chess", image: require("../assets/Images/dice.gif"), hero: "Run" },
        { id: 4, name: "Car Racing", image: require("../assets/Images/car.gif"), hero: "Run" },
    ];

    const Open = (val) => {
         Alert.alert(
              "Confirm App",
              "Do you really want to play game?",
              [
                {
                  text: "Yes",
                  onPress: () =>  navigation.replace(val),
                  style: "cancel",
                 
                },
                {
                  text: "No",
                  onPress: () => navigation.replace('dashboard')
                }
              ],
              { cancelable: false }
            );
        
    };

    return (
        <View style={styles.container}>
            {/* Centered Title */}
            <Text style={styles.title}>Fun Games</Text>

            {/* Grid Layout */}
            <View style={styles.grid}>
                {games.map((game) => (
                    <Animated.View key={game.id} style={styles.gameContainer}>
                        <FastImage source={game.image} resizeMode={FastImage.resizeMode.contain} style={styles.img} />
                        <Text style={styles.text}>{game.name}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => Open(game.hero)}>
                            <Text style={styles.buttonText}>Play</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
        color: "orange",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    gameContainer: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        margin: 10, // Space between grid items
        width: width / 2.5, // Dynamic width adjustment
        flexGrow: 1, // Allows it to expand when needed
        flexShrink: 1, // Prevents overflow
    },
    img: {
        width: 90,
        height: 90,
    },
    text: {
        fontSize: 16,
        color: "black",
        marginVertical: 8,
        textAlign: "center",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "green",
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 15,
        marginTop: 8,
    },
    buttonText: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
    },
});

export default PlayBoard;
