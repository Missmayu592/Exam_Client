import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, PermissionsAndroid, 
  Alert, Platform, Image, SafeAreaView 
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import { Linking } from 'react-native';

const PermissionScreen = () => {
  const [files, setFiles] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const soundRef = useRef(null);

  // Function to request permissions
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          // Android 13+ (API 33+)
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
            Alert.alert('Permission Denied', 'Please enable media access in settings.');
            return false;
          }
        } else if (Platform.Version >= 30) {
          // Android 11-12 (API 30-32)
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
          // Android 10 and below
          const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);

          if (result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED) {
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

  // Open app settings
  const openAppSettings = () => {
    Linking.openSettings();
  };

  // Function to fetch files from storage
  const getFiles = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access storage without permission.');
      return;
    }

    // Use different storage paths to check
    const possiblePaths = [
      RNFS.ExternalStorageDirectoryPath,   // "/storage/emulated/0/"
      RNFS.DownloadDirectoryPath,          // "/storage/emulated/0/Download"
      RNFS.ExternalCachesDirectoryPath,    // App-specific external storage
    ];

    for (let path of possiblePaths) {
      try {
        console.log(`Checking path: ${path}`);
       Alert.alert("Location", JSON.stringify(path));
        const result = await RNFS.readDir(path);
        console.log('Files found:', result);

        const mediaFiles = result.filter(file => 
          file.isFile() &&
          (file.name.endsWith('.mp4') || file.name.endsWith('.mkv') ||
           file.name.endsWith('.mp3') || file.name.endsWith('.wav') ||
           file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png') || file.name.endsWith('.avif') || file.name.endsWith('.pdf'))
        );

        if (mediaFiles.length > 0) {
          setFiles(mediaFiles);
          return;
        }
      } catch (error) {
        console.error(`Error reading storage at ${path}:`, error);
      }
    }

    Alert.alert('No Files Found', 'No media files found in accessible storage locations.');
  };

  useEffect(() => {
    requestPermission().then(granted => {
      if (granted) {
        getFiles();
      }
    });
  }, []);

  // Play Audio Function
  const playAudio = (path) => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
    }

    soundRef.current = new Sound(path, '', (error) => {
      if (error) {
        console.error('Error loading sound:', error);
        return;
      }
      soundRef.current.play();
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Media Files:</Text>

      {files.length === 0 ? (
        <Text style={{ textAlign: 'center', color: 'gray' }}>No media files found</Text>
      ) : (
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
          ListFooterComponent={() => (
            <View>
              {selectedVideo && (
                <Video
                  source={{ uri: `file://${selectedVideo}` }}
                  style={{ width: '100%', height: 300, marginTop: 10 }}
                  controls
                />
              )}

              {files.map((file) =>
                file.name.endsWith('.jpg') ||
                file.name.endsWith('.jpeg') ||
                file.name.endsWith('.png') ? (
                  <Image
                    key={file.path}
                    source={{ uri: `file://${file.path}` }}
                    style={{ width: 100, height: 100, marginTop: 10 }}
                    resizeMode="cover"
                  />
                ) : null
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default PermissionScreen;
