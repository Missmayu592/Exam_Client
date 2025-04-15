import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

import {
  View, Text, FlatList, TouchableOpacity, Button, Alert, Platform, PermissionsAndroid, Linking
} from "react-native";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

const PermissionScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [currentPath, setCurrentPath] = useState(RNFS.ExternalStorageDirectoryPath);
  const [files, setFiles] = useState([]);
  const navigation = useNavigation();


  // Request storage permission
  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        if (Platform.Version >= 33) {
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
            setPermissionGranted(true);
            loadFiles(currentPath);
          } else {
            Alert.alert("Permission Denied", "Please enable media access in settings.");
          }
        }


        else if (Platform.Version >= 30) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE
          );
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionGranted(true);
            loadFiles(currentPath);
          } else {
            Alert.alert(
              "Permission Needed",
              "Please grant 'All File Access' manually in settings.",
              [{ text: "Open Settings", onPress: () => Linking.openSettings() }, { text: "Cancel", style: "cancel" }]
            );
          }
        } else {
          const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
          if (result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionGranted(true);
            loadFiles(currentPath);
          } else {
            Alert.alert("Permission Denied", "Please allow storage access in settings.");
          }
        }
      } catch (err) {
        console.error("Permission request error:", err);
      }
    }
  };

  
  // Function to load files and folders
  const loadFiles = async (path) => {
    try {
      const fileList = await RNFS.readDir(path);
  
      const updatedFiles = fileList.map((file) => {
        if (!file.isDirectory() && file.name.endsWith(".ans")) {
          const baseName = file.name.replace(/\.ans$/, ""); // remove `.ans`
          return {
            ...file,
            displayName: baseName + ".txt", // show `.txt` instead
          };
        }
        return {
          ...file,
          displayName: file.name,
        };
      });
  
      setFiles(updatedFiles);
      setCurrentPath(path);
    } catch (error) {
      console.error("Error reading files:", error);
      Alert.alert("Error", "Failed to read storage contents.");
    }
  };
  



  const openFolder = (folder) => {
    if (folder.isDirectory()) {
      loadFiles(folder.path);
    }
  };

  const openFile = async (file) => {
    if (!file || !file.path || !file.name) {
      Alert.alert("Invalid File", "File information is incomplete.");
      return;
    }
  
    const filePath = file.path;
    const extension = file.name.split(".").pop()?.toLowerCase();
  
    try {
      switch (extension) {
        case "mp3":
        case "aac":
        case "wav":
        case "ogg":
        case "wma":
        case "amr":
        case "m4a":
          navigation.navigate("AudioPlayer", { path: filePath });
          break;
  
        case "mp4":
        case "mkv":
          navigation.navigate("VideoPlayer", { path: filePath });
          break;
  
        case "jpg":
        case "jpeg":
        case "png":
        case "avif":
        case "gif":
          navigation.navigate("ImageViewer", { path: filePath });
          break;
  
        case "txt":
        case "pdf":
          navigation.navigate("DocumentViewer", { path: filePath });
          break;
  
        case "ans":
          const exists = await RNFS.exists(filePath);
          if (!exists) {
            Alert.alert("Error", "The .ans file does not exist.");
            return;
          }
  
          // ✅ Treat .ans file as readable text — NO COPY
          navigation.navigate("DocumentViewer", { path: filePath });
          break;
  
        default:
          Alert.alert("Unsupported", "This file type is not supported in the app.");
      }
    } catch (error) {
      console.error("openFile error:", error);
      Alert.alert("Error", `Failed to open file: ${error.message}`);
    }
  };
  
  
  
  


  //it is drectly open in default system application in phones

  // const openFile = async (file) => {
  //   try {
  //     const filePath = file.path; // Already absolute
  //     Alert.alert("Opening File : ", filePath)

  //     await FileViewer.open(filePath, { showOpenWithDialog: true });

  //   } catch (error) {
  //     console.error("File open error:", error);
  //     Alert.alert("Error", `Cannot open file: ${error.message}`);
  //   }
  // };

  // Handle back navigation
  const goBack = () => {
    if (currentPath !== RNFS.ExternalStorageDirectoryPath) {
      const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
      loadFiles(parentPath);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Current Path: {currentPath}</Text>

      {/* Back Button */}
      {currentPath !== RNFS.ExternalStorageDirectoryPath && <Button title="Go Back" onPress={goBack} />}

      {/* Request Permission Button */}
      {!permissionGranted ? (
        <Button title="Request Storage Permission" onPress={requestStoragePermission} />
      ) : (
        //here you can open self player not by phones default as per format type like .mp3,.mp4,.jpg,.avif,.txt,.pdf,.
        <FlatList
          data={files}
          keyExtractor={(item) => item.path}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => (item.isDirectory() ? openFolder(item) : openFile(item))}>
              <Text style={{ padding: 10, fontSize: 16, color: item.isDirectory() ? "blue" : "black" }}>
                {item.isDirectory() ? "📂 " : "📄 "} {item.displayName}
              </Text>
            </TouchableOpacity>
          )}
          onRefresh={() => loadFiles(currentPath)}
          refreshing={false} // Optional: you can use useState to control spinner
        />


      )}
    </View>
  );
};

export default PermissionScreen;