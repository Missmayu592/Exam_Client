import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const ImageViewer = ({ route }) => {
  const { path } = route.params;

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: 'file://' + path }} style={styles.image} resizeMode="contain" /> */}
      <FastImage
        source={{ uri: 'file://' + path }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  image: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
});

export default ImageViewer;