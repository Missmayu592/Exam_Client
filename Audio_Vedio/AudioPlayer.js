import React from 'react';
import { View, Text, Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { useTrackPlayerEvents, TrackPlayerEvents } from 'react-native-track-player';

const AudioPlayer = ({ route }) => {
  const { path } = route.params;

  React.useEffect(() => {
    const setup = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'trackId',
        url: path,
        title: 'Audio File',
        artist: 'Unknown'
      });
      await TrackPlayer.play();
      
      
    };

    setup();

    return () => {
      TrackPlayer.reset();
      TrackPlayer.addEventListener('playback-error', (error) => {
        console.log('Playback Error:', error);
        Alert.alert('Playback Error:', error)
      });

    };
  }, []);

  return (
    <View><Text>Playing Audio...</Text></View>
  );
};

export default AudioPlayer;