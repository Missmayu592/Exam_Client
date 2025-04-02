import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { View, Text, FlatList, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import Sound from 'react-native-sound';


const PermissionFV = () => {
  const [files, setFiles] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const soundRef = React.useRef(null);

  const checkPermission = async (permission) => {
    const result = await PermissionsAndroid.check(permission);
    return result;
  };
  
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const videoGranted = await checkPermission(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO);
          const audioGranted = await checkPermission(PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO);
          const imageGranted = await checkPermission(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
  
          if (videoGranted && audioGranted && imageGranted) {
            return true;
          }
  
          const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ]);
  
          if (
            result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED &&
            result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] === PermissionsAndroid.RESULTS.GRANTED &&
            result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            return true;
          } else {
            Alert.alert('Permission Denied', 'Please allow media access in settings.');
            return false;
          }
        } else if (Platform.Version >= 30) {
          const manageGranted = await checkPermission(PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE);
          if (manageGranted) {
            return true;
          }
  
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE
          );
  
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          } else {
            Alert.alert(
              "Permission Needed",
              "Please grant 'All File Access' manually in settings.",
              [{ text: "Open Settings", onPress: openAppSettings }, { text: "Cancel", style: "cancel" }]
            );
            return false;
          }
        } else {
          const readGranted = await checkPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          const writeGranted = await checkPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
          
          if (readGranted && writeGranted) {
            return true;
          }
  
          const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
  
          if (
            result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
            result[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            return true;
          } else {
            Alert.alert('Permission Denied', 'Please allow storage access in settings.');
            return false;
          }
        }
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return false;
  };
  
  // Function to open app settings if permission is denied
  const openAppSettings = () => {
    Linking.openSettings();
  };
  // Scan the SD card for media files
  const getFiles = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access storage without permission.');
      return;
    }

    const mediaDir = RNFS.ExternalStorageDirectoryPath; // Gets /storage/emulated/0/

    try {
      const result = await RNFS.readDir(mediaDir);
      const mediaFiles = result
        .filter(file => file.isFile())
        .filter(file =>
          file.name.endsWith('.mp4') ||
          file.name.endsWith('.mkv') ||
          file.name.endsWith('.mp3') ||
          file.name.endsWith('.wav')
        );
      setFiles(mediaFiles);
    } catch (error) {
      console.error('Error reading storage:', error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    requestPermission().then((granted) => {
      if (!granted && Platform.Version >= 30) {
        Alert.alert(
          "Permission Needed",
          "Please grant 'All File Access' permission manually.",
          [
            { text: "Open Settings", onPress: openAppSettings },
            { text: "Cancel", style: "cancel" }
          ]
        );
      } else {
        getFiles();  // Fetch files only if permission is granted
      }
    });
  }, []);
  
  
  // Play Audio
  const playAudio = (path) => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
    soundRef.current = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Error loading sound:', error);
        return;
      }
      soundRef.current.play();
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Media Files:</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: '#ddd',
              borderRadius: 5,
            }}
            onPress={() => {
              if (item.name.endsWith('.mp4') || item.name.endsWith('.mkv')) {
                setSelectedVideo(item.path);
                setSelectedAudio(null);
              } else if (item.name.endsWith('.mp3') || item.name.endsWith('.wav')) {
                setSelectedAudio(item.path);
                playAudio(item.path);
              }
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedVideo && (
        <Video
          source={{ uri: `file://${selectedVideo}` }}
          style={{ width: '100%', height: 300, marginTop: 10 }}
          controls
        />
      )}
    </View>
  );
};

export default PermissionFV;
