import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Sound from 'react-native-sound';

function MusicAdd() {
    let sound;

    useEffect(() => {
        // Enable sound playback in silent mode (iOS)
        Sound.setCategory('Playback');

        // Load the sound file
        sound = new Sound(require('../assets/snake.mp3'), Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
                Alert.alert("Error", "Failed to load sound");
                return;
            }
        });

        return () => {
            if (sound) {
                sound.release(); // Release the sound when the component unmounts
            }
        };
    }, []);

    const playSound = () => {
        if (sound) {
            sound.play((success) => {
                if (!success) {
                    console.log("Sound playback failed");
                }
            });
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>Add Sound on Button Click</Text>
            <TouchableOpacity 
                style={{ padding: 10, backgroundColor: 'black', borderRadius: 5 }}  
                onPress={playSound}
            >
                <Text style={{ fontSize: 30, textAlign: 'center', color: 'white' }}>Play</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MusicAdd;
