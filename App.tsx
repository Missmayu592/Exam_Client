
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import OnlineShopping from './TaskComponent/OnlineShopping';
import Play_Video from './Audio_Vedio/Play_Video';
import Play_Audio from './Audio_Vedio/Play_Audio';
import PermissionFV from './Audio_Vedio/PermissionFV';
import GetPermission from './Audio_Vedio/GetPermission';
import PermissionScreen from './Audio_Vedio/PermissionScreen';
import ShowVedio from './Audio_Vedio/ShowVedio';
import MoveItems from './Game/MoveItems';
import Animation from './ComponentsProject/Animation';
import Welcome from './Game/Welcome';
import Run from './Game/Run';
import PlayBoard from './Game/PlayBoard';
import MusicAdd from './Game/MusicAdd';
import ViewQuestion from './ComponentsProject/ViewQuestion';
import Exam from './ComponentsProject/Exam';
import Screen from './ComponentsProject/Screen';

import Login from './ComponentsProject/Login';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {


  return (
    
    <NavigationContainer >
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Next" component={Screen} options={{ headerShown: false }} />
      <Stack.Screen name="Exam" component={Exam} options={{ headerShown: false }} />
      <Stack.Screen name="View" component={ViewQuestion} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  // <Animation />
 
  // <NavigationContainer>
  //   <Stack.Navigator initialRouteName='Home'>
  //      <Stack.Screen name='Home' component={Welcome} options={{headerShown: false}} />
  //      <Stack.Screen name='dashboard'component={PlayBoard} options={{headerShown: false}} />
  //      <Stack.Screen name='Run' component={Run} options={{headerShown: false}} />
  //   </Stack.Navigator>

  // </NavigationContainer>
  // <MusicAdd />
  // <MoveItems />
  // <OnlineShopping />
  // <Play_Video />
  // <Play_Audio/>
  // <PermissionFV />
  // <GetPermission />
  // <PermissionScreen />
  // <ShowVedio />

  
    
  );
}

export default App;
