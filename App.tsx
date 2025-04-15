// 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PermissionScreen from './Audio_Vedio/PermissionScreen';
import AudioPlayer from './Audio_Vedio/AudioPlayer';
import VideoPlayer from './Audio_Vedio/VideoPlayer';
import ImageViewer from './Audio_Vedio/ImageViewer';
import DocumentViewer from './Audio_Vedio/DocumentViewer';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {


  return (

    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
        <Stack.Screen name="AudioPlayer" component={AudioPlayer} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="ImageViewer" component={ImageViewer} />
        <Stack.Screen name="DocumentViewer" component={DocumentViewer} /> 
      </Stack.Navigator>
    </NavigationContainer>






  );
}

export default App;



