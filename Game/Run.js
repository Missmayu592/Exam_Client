import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, Animated, TouchableOpacity, Text, Alert, BackHandler } from "react-native";
import FastImage from "react-native-fast-image";
import Sound from 'react-native-sound';


const { height, width } = Dimensions.get("window");

function getRandomX() {
    return Math.random() * (width - 70); // Keep images within screen bounds
}

function Run() {

    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
    const soundRef = useRef(null);
    const sounRef2 = useRef(null);
    const rightVal = useRef(new Animated.Value(0)).current; // Animation value

    useEffect(() => {
        // Enable sound playback in silent mode (iOS)
        Sound.setCategory('Playback');

        // Load the sound file
        soundRef.current = new Sound(require('../assets/snake.mp3'), Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
                Alert.alert("Error", "Failed to load sound");
                return;
            }
        });

        return () => {
            if (soundRef.current) {
                soundRef.current.release(); // Release the sound when the component unmounts
            }
        };
    }, []);
    useEffect(() => {
        // Enable sound playback in silent mode (iOS)
        Sound.setCategory('Playback');

        // Load the sound file
        sounRef2.current = new Sound(require('../assets/cool.mp3'), Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
                Alert.alert("Error", "Failed to load sound");
                return;
            }
        });

        return () => {
            if (sounRef2.current) {
                sounRef2.current.release(); // Release the sound when the component unmounts
            }
        };
    }, []);

    const playSound = () => {
        if (soundRef.current) {
            soundRef.current.play((success) => {
                if (!success) {
                    console.log("Sound playback failed");
                }
            });
    
            // Stop the sound after 2 seconds
            setTimeout(() => {
                if (soundRef.current) {
                    soundRef.current.stop(); // Stop playback
                }
            }, 2000); // 2000 milliseconds = 2 seconds
        }
    };

    const playSound2 = () => {
        if (sounRef2.current) {
            sounRef2.current.play((success) => {
                if (!success) {
                    console.log("Sound playback failed2");
                }
            });
         
                if (sounRef2.current) {
                    sounRef2.current.stop(); // Stop playback
                }
            
        }
    };
    

    const rightMove = () => {
        playSound(); 
        Animated.timing(rightVal, {
            toValue: width - 150, // Moves to near the right edge
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };

    const leftMove = () => {
        playSound(); 
        Animated.timing(rightVal, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true
        }).start();
    };
    const [positions, setPositions] = useState({
        apple: getRandomX(),
        banana: getRandomX(),
        cactus: getRandomX(),
        orange: getRandomX(),
        dmd: getRandomX(),
        pi: getRandomX(),
        tree: getRandomX(),
        bird: getRandomX(),
    });

    const appleVal = useRef(new Animated.Value(-100)).current;
    const bananaVal = useRef(new Animated.Value(-100)).current;
    const cactusVal = useRef(new Animated.Value(-100)).current;
    const orangeVal = useRef(new Animated.Value(-100)).current;
    const dmdVal = useRef(new Animated.Value(-100)).current;
    const piVal = useRef(new Animated.Value(-100)).current;
    const treeVal = useRef(new Animated.Value(-100)).current;
    const birdVal = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const startAnimation = (animatedValue, key) => {
        const loopAnimation = () => {
            playSound2(),
            animatedValue.setValue(-100); // Reset position to top
            setPositions((prev) => ({
                ...prev,
                [key]: getRandomX(), // Assign new random left position
            }));

            Animated.timing(animatedValue, {
                toValue: height,
                duration: Math.random() * 5000 + 5000, // Randomize speed
                useNativeDriver: true,
            }).start(loopAnimation);
        };
        loopAnimation();
    };

    useEffect(() => {
        startAnimation(appleVal, "apple");
        startAnimation(bananaVal, "banana");
        startAnimation(cactusVal, "cactus");
        startAnimation(orangeVal, "orange");
        startAnimation(dmdVal, "dmd");
        startAnimation(piVal, "pi");
        startAnimation(treeVal, "tree"),
            startAnimation(birdVal, "bird")
           
    }, []);

    useEffect(() => {
        Animated.loop(
           
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0, // Fade out
                    duration: 500, // 500ms
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 1, // Fade in
                    duration: 500, // 500ms
                    useNativeDriver: true
                })
            ]),
          
        ).start();
        
    }, []);

  

    useEffect(() => {
        if (timeLeft === 0) return(
            //  Alert.alert("Your Scored:")
            console.log("Time up")
            //  BackHandler.exitApp()
        ) // Stop when timer reaches 0

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [timeLeft]);

    return (
        <View style={styles.container}>
            <FastImage
                source={require("../assets/Images/images.jpg")}
                style={styles.backgroundImage}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Animated.Text style={{
                fontSize: 20,
                color: 'gold',
                position: 'absolute',
                top: 0,
                right: 10,
                opacity: opacity
            }}>
                {timeLeft}
            </Animated.Text>
            <Animated.View style={[styles.animatedItem, { transform: [{ translateY: appleVal }], left: positions.apple }]}>
                <FastImage source={require("../assets/Images/apple.gif")} style={styles.appleImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <Animated.View style={[styles.animatedItem, { transform: [{ translateY: bananaVal }], left: positions.banana }]}>
                <FastImage source={require("../assets/Images/banana.gif")} style={styles.bananaImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <Animated.View style={[styles.animatedItem, { transform: [{ translateY: cactusVal }], left: positions.cactus }]}>
                <FastImage source={require("../assets/Images/cactus.gif")} style={styles.CImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <Animated.View style={[styles.animatedItem, { transform: [{ translateY: orangeVal }], left: positions.orange }]}>
                <FastImage source={require("../assets/Images/orange.gif")} style={styles.orangeImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <Animated.View style={[styles.animatedItem, { transform: [{ translateY: dmdVal }], left: positions.dmd }]}>
                <FastImage source={require("../assets/Images/dimond.gif")} style={styles.dmdImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <Animated.View style={[styles.animatedItem, { transform: [{ translateY: piVal }], left: positions.pi }]}>
                <FastImage source={require("../assets/Images/cat.gif")} style={styles.piImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <Animated.View style={[styles.animatedItem, { transform: [{ translateY: treeVal }], left: positions.tree }]}>
                <FastImage source={require('../assets/Images/tree.gif')} style={styles.treeImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <Animated.View style={[styles.animatedItem, { transform: [{ translateY: birdVal }], left: positions.bird }]} >
                <FastImage source={require('../assets/Images/bird.gif')} style={styles.treeImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <Animated.View style={[styles.animatedSnake, { transform: [{ translateX: rightVal }] }]}>
                <FastImage source={require("../assets/Images/snake1.gif")} style={styles.snakeImg} resizeMode={FastImage.resizeMode.contain} />
            </Animated.View>

            <TouchableOpacity onPress={rightMove} style={styles.animatedArrowR}>
                <FastImage source={require('../assets/Images/r.gif')} style={styles.r} resizeMode={FastImage.resizeMode.contain} />
            </TouchableOpacity>

            <TouchableOpacity onPress={leftMove} style={styles.animatedArrowL}>
                <FastImage source={require('../assets/Images/l.gif')} style={styles.l} resizeMode={FastImage.resizeMode.contain} />
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative", // Ensure child components are properly positioned
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    animatedItem: {
        position: "absolute",
        top: 0,
    },
    appleImg: {
        width: 70,
        height: 70,
    },
    bananaImg: {
        width: 70,
        height: 70,
    },
    CImg: {
        width: 70,
        height: 70,
    },
    orangeImg: {
        width: 50,
        height: 50,
    },
    dmdImg: {
        width: 50,
        height: 50,
    },
    piImg: {
        width: 70,
        height: 70,
    },
    snakeImg: {
        width: 100,
        height: 100,
    },
    treeImg: {
        width: 70,
        height: 70,
    },
    animatedSnake: {
        position: "absolute",
        bottom: 25,

    },
    animatedArrowR: {
        position: "absolute",
        bottom: 0,  // Move it above the bottom edge
        right: 20,   // Give some space from the edge
        padding: 10
    },
    animatedArrowL: {
        position: "absolute",
        bottom: 0,  // Same as the right arrow
        left: 20,    // Corrected 'Left' to 'left'
        padding: 10
    },

    r: {
        height: 40,
        width: 50
    },
    l: {
        height: 40,
        width: 50
    }
});

export default Run;
