import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Status = React.memo((props) => {
    // console.log("Rendering Status with ques:", props.ques);
    const circles = Array.from({ length: props.ques }, (_, index) => index + 1);
    // console.log("Number of Circles: ", circles.length);

    return (
        <View style={styles.main}>
            <Text style={styles.text}>Q{props.num}. {props.type}</Text>
            <View style={styles.circlesContainer}>
                {circles.map((num, index) => (
                    <View key={index} style={styles.block}>
                        <Text style={styles.num}>{num}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        borderWidth: 1,
        borderColor: '#004830',
        padding: 4,
        margin: 10,
        position: 'relative',
        borderRadius: 7,
        marginTop: 20,
    },
    text: {
        position: 'absolute',
        top: -18,
        left: 10,
        backgroundColor: '#016064',
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5,
        fontSize: 14,
        textAlign: 'center',
    },
    circlesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    block: {
        width: 19,
        height: 19,
        backgroundColor: 'red',
        borderRadius: 9.3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    num: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Status;
