import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";

const songs = [
    { id: "1", title: "Shape of You", artist: "Ed Sheeran", url: require("../assets/song.mp3") },
    { id: "2", title: "Blinding Lights", artist: "The Weeknd", url: require("../assets/cool.mp3") },
    { id: "3", title: "Levitating", artist: "Dua Lipa", url: require("../assets/sound.mp3") },
    { id: "4", title: "Stay", artist: "Justin Bieber", url: require("../assets/eating.mp3") }
];

const Play_Audio = () => {
    // const [currentSong, setCurrentSong] = useState(null);
    // const playbackState = usePlaybackState();

    // // Initialize the Track Player
    // useEffect(() => {
    //     async function setupPlayer() {
    //         await TrackPlayer.setupPlayer();
    //         await TrackPlayer.add(songs);
    //     }
    //     setupPlayer();
    // }, []);

    // // Play selected song
    // const playSong = async (song) => {
    //     setCurrentSong(song);
    //     await TrackPlayer.stop();  // Stop previous song
    //     await TrackPlayer.reset(); // Reset the queue
    //     await TrackPlayer.add({
    //         id: song.id,
    //         url: song.url,
    //         title: song.title,
    //         artist: song.artist
    //     });
    //     await TrackPlayer.play();
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🎵 Music Playlist</Text>

            Current Playing Song
            {/* {currentSong && (
                <Text style={styles.nowPlaying}>Now Playing: {currentSong.title} - {currentSong.artist}</Text>
            )}

            {/* Song List */}
            {/* <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => playSong(item)}>
                        <Text style={styles.songTitle}>{item.title}</Text>
                        <Text style={styles.artist}>{item.artist}</Text>
                    </TouchableOpacity>
                )}
           /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", padding: 20 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" },
    nowPlaying: { fontSize: 18, fontWeight: "bold", marginBottom: 20, color: "#ff5733" },
    
    listItem: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        elevation: 3
    },
    
    songTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
    artist: { fontSize: 14, color: "#777" }
});

export default Play_Audio;
