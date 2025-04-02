import React, { useEffect, useState } from "react";
import { View, Text, FlatList, PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const FileScanner = () => {
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  // Request Storage Permission
  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          scanMediaFiles();
        } else {
          console.log("Storage permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // iOS Permission
      const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (result !== RESULTS.GRANTED) {
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }
      scanMediaFiles();
    }
  };

  // Scan for Audio & Video Files
  const scanMediaFiles = async () => {
    const mediaDirectories = [
      RNFS.ExternalStorageDirectoryPath + "/Music",       // Common music folder
      RNFS.ExternalStorageDirectoryPath + "/Movies",      // Common video folder
      RNFS.ExternalStorageDirectoryPath + "/Download",    // Downloaded media
      RNFS.ExternalStorageDirectoryPath + "/DCIM",        // Camera videos
    ];

    let foundFiles = [];

    for (const path of mediaDirectories) {
      try {
        const files = await RNFS.readDir(path);
        files.forEach(file => {
          if (file.isFile() && (file.name.endsWith(".mp3") || file.name.endsWith(".mp4") || file.name.endsWith(".wav") || file.name.endsWith(".mkv"))) {
            foundFiles.push(file.path);
          }
        });
      } catch (error) {
        console.log("Error accessing:", path, error);
      }
    }

    setMediaFiles(foundFiles);
  };

  return (
    <View>
      <Text>Audio & Video Files:</Text>
      <FlatList
        data={mediaFiles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default FileScanner;
