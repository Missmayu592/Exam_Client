
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';

function ShowVedio(){

    const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
        ]);

        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Storage permission granted");
          fetchMediaFiles();
        } else {
          console.log("Storage permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const fetchMediaFiles = async () => {
    const dirs = [
      RNFS.ExternalStorageDirectoryPath, // "/storage/emulated/0/"
      RNFS.DownloadDirectoryPath,        // "/storage/emulated/0/Download"
    ];

    let files = [];
    for (let dir of dirs) {
      try {
        const result = await RNFS.readDir(dir);
        result.forEach(file => {
          if (file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
            files.push({ type: 'image', path: file.path });
          } else if (file.name.match(/\.(mp4|avi|mkv)$/i)) {
            files.push({ type: 'video', path: file.path });
          } else if (file.name.match(/\.(mp3|wav|m4a)$/i)) {
            files.push({ type: 'audio', path: file.path });
          }
        });
      } catch (error) {
        console.log("Error reading directory:", error);
      }
    }
    setMediaFiles(files);
  };

  return (
    <View>
      <Text>Media Files Location: </Text>
      <FlatList
        data={mediaFiles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {item.type === 'image' && <Image source={{ uri: 'file://' + item.path }} style={{ width: 100, height: 100 }} />}
            {item.type === 'video' && <Text>📹 Video: {item.path}</Text>}
            {item.type === 'audio' && <Text>🎵 Audio: {item.path}</Text>}
          </View>
        )}
      />
    </View>
  )
}

export default ShowVedio;