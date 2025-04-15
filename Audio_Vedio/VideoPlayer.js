import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure you have this installed
import Slider from '@react-native-community/slider';

const VideoPlayer = ({ route }) => {
  const { path } = route.params;
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => setPaused(prev => !prev);

  const handleReplay = () => {
    videoRef.current.seek(0);
    setPaused(false);
  };

  const handleForward = () => {
    videoRef.current.seek(currentTime + 10);
  };

  const handleRewind = () => {
    videoRef.current.seek(currentTime - 10);
  };

  const onProgress = (data) => setCurrentTime(data.currentTime);
  const onLoad = (data) => setDuration(data.duration);

  const onSlide = (value) => {
    videoRef.current.seek(value);
    setCurrentTime(value);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: path }}
        style={styles.video}
        paused={paused}
        resizeMode="contain"
        onProgress={onProgress}
        onLoad={onLoad}
      />
       
      <View style={styles.controls}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#888"
          thumbTintColor="#fff"
          onValueChange={onSlide}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleRewind}>
            <Icon name="play-back" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={togglePlayPause}>
            <Icon name={paused ? 'play-circle' : 'pause-circle'} size={50} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForward}>
            <Icon name="play-forward" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleReplay} style={styles.replayButton}>
          <Text style={styles.replayText}>Replay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center' },
  video: {
    width: width,
    height: height * 0.6,
  },
  controls: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    alignItems: 'center',
    marginTop: 10,
  },
  slider: {
    width: '90%',
  },
  replayButton: {
    marginTop: 15,
  },
  replayText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default VideoPlayer;
