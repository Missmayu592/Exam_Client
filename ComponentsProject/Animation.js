import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import React, { useEffect, useRef } from 'react';

// Get screen width
const { width } = Dimensions.get('window');

function Animation() {
    // Animation Refs
    const birdAnim = useRef(new Animated.Value(0)).current;  
    const tigerXAnim = useRef(new Animated.Value(0)).current; 

    // Define movement range (keep inside screen)
    const moveDistance = width;

    useEffect(() => {

        Animated.loop(
            Animated.timing(birdAnim, {
                toValue: moveDistance, // Move right (max)
                duration: 30000,
                useNativeDriver: true,
            })
        ).start();

        setTimeout(() => {
            Animated.loop(
                Animated.timing(tigerXAnim, {
                    toValue: moveDistance,
                    duration: 9000,
                    useNativeDriver: true,
                })
            ).start();
        }, 1000) // No loop, stops at border

    }, []);

    return (
        <View style={styles.container}>


            <Animated.View style={{ transform: [{ translateX: birdAnim }] }}>
                <FastImage
                    source={require('../assets/Images/bird.gif')}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </Animated.View>


            <View style={styles.rowContainer}>
                <FastImage
                    source={require('../assets/Images/tree.gif')}
                    style={styles.tree}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <FastImage
                    source={require('../assets/Images/coc.gif')}
                    style={styles.coc}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>


            <Animated.View style={{ transform: [{ translateX: tigerXAnim }] }}>
                <FastImage
                    source={require('../assets/Images/tiger.gif')}
                    style={styles.tiger}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'start',
        justifyContent: 'start',
        backgroundColor: '#fff',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    bird: {
        width: 60,
        height: 60
    },
    tree: {
        width: 200,
        height: 200,
    },
    tiger: {
        width: 200,
        height: 200,
    },
    coc: {
        width: 200,
        height: 200,
    },
});

export default Animation;
