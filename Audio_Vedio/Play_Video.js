import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from "react-native";
import Video from 'react-native-video';

function Play_Video() {

    // Video Playlist (Local & Online)
    const videoList = [
        { id: '1', uri: require('../assets/cartoon_V.mp4'), title: 'Hello Song' , singer: 'Arjit Singh'}, // Local Video
        { id: '2', uri: require('../assets/ss.mp4'), title: 'Melody Tune' , singer: 'Arjit Singh'}, // Local Video
        { id: '3', uri: require('../assets/smll.mp4'), title: 'Instrumental Beats' , singer: 'Mailika Singh'}, // Local Video
        { id: '4', uri: require('../assets/large.mp4'), title: 'Classical Music', singer: 'Arman Mailik ' }, // Local Video
        { id: '5', uri: require('../assets/fun.mp4'), title: 'Function Video Song' , singer: 'Camera/10/03/2025'}, // Local Video
        // { id: '6', uri: require('../assets/ss.mp4'), title: 'Melody Tune' , singer: 'Arjit Singh'}, // Local Video
        // { id: '7', uri: require('../assets/smll.mp4'), title: 'Instrumental Beats' , singer: 'Mailika Singh'}, // Local Video
        // { id: '8', uri: require('../assets/large.mp4'), title: 'Classical Music', singer: 'Arman Mailik ' } // Local Video
    ];

    const [selectedVideo, setSelectedVideo] = useState(null); // Initially No Video

    return (
        <View style={styles.container}>

            {/* Video Player (Only Show When Selected) */}
            {selectedVideo ? (
                <Video
                    source={selectedVideo}
                    style={styles.video}
                    controls={true}
                    resizeMode="contain"
                />
            ) : (
                <Text style={styles.placeholderText}>Select a video to play</Text>
            )}

            {/* Playlist */}
            <FlatList
                data={videoList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => setSelectedVideo(item.uri)}
                    >
                        <Video
                            source={item.uri}
                            style={styles.listVideo}
                            resizeMode="cover"
                            muted={true} // No sound for preview
                        />
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.text2}>{item.singer}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'black' },
    placeholderText: { fontSize: 20, color: 'gray', marginBottom: 20 },
    video: { width: '90%', height: '90%', marginBottom: 20,  },

    listItem: {
        flexDirection: 'row', // Arrange video and text side by side
        alignItems: 'center', // Center items vertically
        padding: 2,
        margin:5,
        borderRadius: 5,
        width: '90%',
        // borderWidth: 1,  // Add border thickness
        backgroundColor: '#0f2310', // Set border color
    
    },

    listVideo: {
        width: 200, 
        height: 80, 
        borderRadius: 10, 
        margin: 10,
      
    }, 

    text: { 
        color: 'white', 
        fontSize: 16, 
        flexShrink: 1 
    },
     text2: { 
        color: 'grey', 
        fontSize: 12, 
        flexShrink: 1 
    },

});


export default Play_Video;
