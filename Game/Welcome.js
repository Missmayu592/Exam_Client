import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import Sound from "react-native-sound";

const { width } = Dimensions.get('window'); // Get screen width

function Welcome() {
    const startVal = useRef(new Animated.Value(-150)).current; // Start off-screen left
    const navigation = useNavigation();
    const soundRef = useRef(null);

    useEffect(() => {
        // Load sound when component mounts
        Sound.setCategory('Playback');

        soundRef.current = new Sound(require('../assets/cool.mp3'), Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
                Alert.alert("Error", "Failed to load sound");
                return;
            }
            console.log("Sound loaded successfully");
            playSound(); 
        });

        return () => {
            if (soundRef.current) {
                soundRef.current.release();
            }
        };
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(startVal, {
                    toValue: width, // Move to right end of screen
                    duration: 2000, // Move slower (4 seconds)
                    useNativeDriver: true
                }),
                Animated.timing(startVal, {
                    toValue: -150, // Reset back to left
                    duration: 0, // Instantly reset
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    const playSound = () => {
        if (soundRef.current) {
            soundRef.current.setCurrentTime(0); // Reset sound to start
            soundRef.current.play((success) => {
                if (!success) {
                    console.log("Sound playback failed");
                }
            });

            // Stop the sound after 2 seconds
            setTimeout(() => {
                if (soundRef.current) {
                    soundRef.current.stop(); // Stop playback
                    console.log("Song")
                }
            }, 2000);
        } else {
            console.log("Sound not loaded yet.");
        }
    };

    const Start = () => {
        navigation.replace('dashboard');
    };

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateX: startVal }] }}>
                <FastImage
                    source={require('../assets/Images/meteor.gif')}
                    style={styles.starC}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </Animated.View>

            <FastImage
                source={require('../assets/Images/play.gif')}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
            />

            <Text style={styles.textCont}>Welcome to</Text>
            <Text style={styles.textCont}>Play Station</Text>

            <TouchableOpacity style={styles.btn} onPress={Start}>
                <Text style={styles.btnText}>Go</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starC: {
        width: 150,
        height: 100,
    },
    textCont: {
        color: 'white',
        fontSize: 25,
        padding: 2,
    },
    image: {
        width: 200,
        height: 200,
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        padding: 2,
        textAlign: 'center',
    },
    btn: {
        width: 70,
        backgroundColor: 'green',
        padding: 5,
        margin: 10,
        borderRadius: 5,
    }
});

export default Welcome;
