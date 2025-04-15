// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import RNFS from 'react-native-fs';
// import Pdf from 'react-native-pdf';

// const DocumentViewer = ({ route }) => {
//   const { path } = route.params;
//   const [textContent, setTextContent] = useState('');

//   useEffect(() => {
//     console.log('Opening file:', path);

//     if (path.endsWith('.txt')) {
//       RNFS.readFile(path, 'utf8')
//         .then(data => setTextContent(data))
//         .catch(err => {
//           console.log('Error loading txt:', err.message);
//           setTextContent('Error loading file');
//         });
//     }
//   }, [path]);

//   if (path.endsWith('.pdf')) {
//     return (
//       <Pdf
//         source={{ uri: path.startsWith('file://') ? path : 'file://' + path }}
//         style={{ flex: 1 }}
//         onError={err => console.log('PDF load error:', err.message)}
//       />
//     );
//   }

//   return (
//     <ScrollView style={{ padding: 10 }}>
//       <Text selectable>{textContent}</Text>
//     </ScrollView>
//   );
// };

// export default DocumentViewer;

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import RNFS from "react-native-fs";

const DocumentViewer = ({ route }) => {
  const { path } = route.params;
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const text = await RNFS.readFile(path, 'utf8');
        setContent(text);
      } catch (err) {
        console.error("Error reading file:", err);
        Alert.alert("Error", "Failed to load file.");
      }
    };

    loadContent();
  }, [path]);

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 16 }}>{content}</Text>
    </ScrollView>
  );
};

export default DocumentViewer;

