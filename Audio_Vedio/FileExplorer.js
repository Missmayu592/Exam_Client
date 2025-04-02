// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, PermissionsAndroid, Alert, Platform } from 'react-native';
// import RNFS from 'react-native-fs';
// import Video from 'react-native-video';
// import Sound from 'react-native-sound';
// import { Linking } from 'react-native';

// const FileExplorer = () => {
//   const [files, setFiles] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [selectedAudio, setSelectedAudio] = useState(null);
//   const soundRef = React.useRef(null);

//   // ✅ Request Permissions
//   const requestPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         if (Platform.Version >= 33) {
//           // Android 13+ (API 33+)
//           const result = await PermissionsAndroid.requestMultiple([
//             PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//             PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
//             PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//           ]);

//           if (
//             result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED &&
//             result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] === PermissionsAndroid.RESULTS.GRANTED &&
//             result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             return true;
//           } else {
//             Alert.alert('Permission Denied', 'Please enable media access in settings.');
//             return false;
//           }
//         } else if (Platform.Version >= 30) {
//           // Android 11-12 (API 30-32): Request "All Files Access"
//           const result = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE
//           );

//           if (result === PermissionsAndroid.RESULTS.GRANTED) {
//             return true;
//           } else {
//             Alert.alert(
//               "Permission Needed",
//               "Please grant 'All File Access' manually in settings.",
//               [{ text: "Open Settings", onPress: openAppSettings }, { text: "Cancel", style: "cancel" }]
//             );
//             return false;
//           }
//         } else {
//           // Android 10 and below
//           const result = await PermissionsAndroid.requestMultiple([
//             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           ]);

//           if (
//             result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             return true;
//           } else {
//             Alert.alert('Permission Denied', 'Please allow storage access in settings.');
//             return false;
//           }
//         }
//       } catch (err) {
//         console.warn('Permission request error:', err);
//         return false;
//       }
//     }
//     return false;
//   };

//   // ✅ Open App Settings if Permission is Denied
//   const openAppSettings = () => {
//     Linking.openSettings();
//   };

//   // ✅ Fetch Files from Storage
//   const getFiles = async () => {
//     const hasPermission = await requestPermission();
//     if (!hasPermission) {
//       Alert.alert('Permission Denied', 'Cannot access storage without permission.');
//       return;
//     }

//     const mediaDirs = [
//       `${RNFS.ExternalStorageDirectoryPath}/DCIM`,         // Photos
//       `${RNFS.ExternalStorageDirectoryPath}/Pictures`,     // Other Images
//       `${RNFS.ExternalStorageDirectoryPath}/Movies`,       // Videos
//       `${RNFS.ExternalStorageDirectoryPath}/Music`,        // Audio
//       `${RNFS.ExternalStorageDirectoryPath}/Download`,     // Downloaded files
//     ];

//     try {
//       let mediaFiles = [];
//       for (const dir of mediaDirs) {
//         const result = await RNFS.readDir(dir);
//         const filteredFiles = result.filter(file =>
//           file.isFile() &&
//           (file.name.endsWith('.mp4') || file.name.endsWith('.mkv') ||  // Videos
//             file.name.endsWith('.mp3') || file.name.endsWith('.wav') || // Audio
//             file.name.endsWith('.jpg') || file.name.endsWith('.png') || // Images
//             file.name.endsWith('.jpeg') || file.name.endsWith('.gif'))
//         );
//         mediaFiles = [...mediaFiles, ...filteredFiles];
//       }
//       setFiles(mediaFiles);
//     } catch (error) {
//       console.error('Error reading storage:', error);
//     }
//   };

//   useEffect(() => {
//     requestPermission().then(granted => {
//       if (granted) {
//         getFiles();
//       }
//     });
//   }, []);

//   // ✅ Play Audio Function
//   const playAudio = (path) => {
//     if (soundRef.current) {
//       soundRef.current.stop();
//       soundRef.current.release();
//     }

//     soundRef.current = new Sound(path, '', (error) => {
//       if (error) {
//         console.error('Error loading sound:', error);
//         return;
//       }
//       soundRef.current.play();
//     });
//   };

//   return (
//     <View style={{ flex: 1, padding: 10 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Media Files:</Text>
//       <FlatList
//         data={files}
//         keyExtractor={(item) => item.path}
//         numColumns={2}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={{
//               flex: 1,
//               padding: 10,
//               margin: 5,
//               backgroundColor: '#ddd',
//               borderRadius: 5,
//               alignItems: 'center'
//             }}
//             onPress={() => {
//               if (item.name.endsWith('.mp4') || item.name.endsWith('.mkv')) {
//                 setSelectedVideo(item.path);
//                 setSelectedAudio(null);
//               } else if (item.name.endsWith('.mp3') || item.name.endsWith('.wav')) {
//                 setSelectedAudio(item.path);
//                 playAudio(item.path);
//               }
//             }}
//           >
//             {item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.jpeg') || item.name.endsWith('.gif') ? (
//               <Image source={{ uri: `file://${item.path}` }} style={{ width: 100, height: 100, borderRadius: 5 }} />
//             ) : (
//               <Text>{item.name}</Text>
//             )}
//           </TouchableOpacity>
//         )}
//       />

//       {selectedVideo && (
//         <Video
//           source={{ uri: `file://${selectedVideo}` }}
//           style={{ width: '100%', height: 300, marginTop: 10 }}
//           controls
//         />
//       )}
//     </View>
//   );
// };

// export default FileExplorer;



import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, PermissionsAndroid, Alert, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import { Linking } from 'react-native';

const FileExplorer = () => {
  const [files, setFiles] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const soundRef = React.useRef(null);

  // ✅ Request Permissions Based on Android Version
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
          // Android 11-12 (API 30-32): Request "All Files Access"
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

          if (
            result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
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

  // ✅ Open App Settings if Permission is Denied
  const openAppSettings = () => {
    Linking.openSettings();
  };

  // ✅ Fetch Files from Any Storage Location
  const getFiles = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access storage without permission.');
      return;
    }

    const storagePaths = [
      `${RNFS.ExternalStorageDirectoryPath}/DCIM`,         // Camera Photos
      `${RNFS.ExternalStorageDirectoryPath}/Pictures`,     // Other Images
      `${RNFS.ExternalStorageDirectoryPath}/Movies`,       // Videos
      `${RNFS.ExternalStorageDirectoryPath}/Music`,        // Audio
      `${RNFS.ExternalStorageDirectoryPath}/Download`,     // Downloads Folder
      `${RNFS.ExternalStorageDirectoryPath}/DCIM/Screenshots`,
      `${RNFS.ExternalStorageDirectoryPath}/DCIM/Camera`,
      `${RNFS.ExternalStorageDirectoryPath}/Videos`,
      `${RNFS.ExternalStorageDirectoryPath}/DCIM/Camera`,
      `${RNFS.ExternalStorageDirectoryPath}`,              // Root Storage
    ];

    try {
      let mediaFiles = 
      // Alert.alert("Location", JSON.stringify(storagePaths));
      
      console.warn("Location: ", storagePaths)

      for (const path of storagePaths) {
        const result = await RNFS.readDir(path);
        const filteredFiles = result.filter(file =>
          file.isFile() &&
          (file.name.endsWith('.mp4') || file.name.endsWith('.mkv') ||  // Videos
            file.name.endsWith('.mp3') || file.name.endsWith('.wav') || // Audio
            file.name.endsWith('.jpg') || file.name.endsWith('.png') || // Images
            file.name.endsWith('.jpeg') || file.name.endsWith('.gif')) ||
            file.name.endsWith('.avif')
          
        );
        mediaFiles = [...mediaFiles, ...filteredFiles];
      }
      setFiles(mediaFiles);
    } catch (error) {
      console.error('Error reading storage:', error);
    }
  };

  useEffect(() => {
    requestPermission().then(granted => {
      if (granted) {
        getFiles();
      }
    });
  }, []);

  // ✅ Play Audio Function
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
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Media Files:</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.path}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 10,
              margin: 5,
              backgroundColor: '#ddd',
              borderRadius: 5,
              alignItems: 'center'
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
            {item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.jpeg') || item.name.endsWith('.gif') ? (
              <Image source={{ uri: `file://${item.path}` }} style={{ width: 100, height: 100, borderRadius: 5 }} />
            ) : (
              <Text>{item.name}</Text>
            )}
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

export default FileExplorer;

