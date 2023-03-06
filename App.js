// // import { StatusBar } from 'expo-status-bar';
// // // import * as React from "react";
// // // import { StyleSheet, Text, View, Dimensions } from 'react-native';
// // import MapView, { Marker, Callout, Circle  } from 'react-native-maps';
// // // import * as Location from "expo-location";


// // import React, { useState, useEffect } from 'react';
// // import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';

// // import * as Location from 'expo-location';



// // export default function App() {

  
// //   const [location, setLocation] = useState(null);
// //   const [errorMsg, setErrorMsg] = useState(null);



// //   const [status, requestPermission] = Location.useForegroundPermissions();
  
  

// //   React.useEffect(() => {
// //     (async () => {
      
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== 'granted') {
// //         setErrorMsg('Permission to access location was denied');
// //         return;
// //       }

// //       let location = await Location.getCurrentPositionAsync({});
// //       console.log(location);

// //       // setPin({
// //       //   latitude: location.coords.latitude,
// //       //   longitude: location.coords.longitude,
// //       // })
      
// //     })();
    
// //   }, []);


  
// //   const [pin, setPin] = React.useState({
// //     latitude: 13.406,
// //     longitude: 12.938516574275933,
// //   });
 

// //   return (
// //     <View style={styles.container}>
// //       <Text>{text}</Text>
// //       <StatusBar style="auto" />
// //       <MapView style={styles.map}
// //         initialRegion={{
// //           latitude: 12.938516574275933, 
// //           longitude: 80.13928801586894,
// //           latitudeDelta: 0.0922,
// //           longitudeDelta: 0.0421,
// //         }}    
// //         showUserLocation={true}
// //         onUserLocationChange={(e) =>{
// //           console.log("onUserLocationChange", e.nativeEvent.coordinate);
// //           setPin({
// //             latitude:e.nativeEvent.coordinate.latitude,
// //             longitude: e.nativeEvent.coordinate.longitude,
// //           })
// //         }}
// //      >
// //       <Marker
// //         coordinate={{ latitude:12.938516574275933, longitude: 80.13928801586894}}
// //         pinColor="red"
// //         draggable={true}
// //         onDragStart={(e) => {
// //           console.log("Drag Start", e.nativeEvent.coordinate);
// //         }}
// //         onDragEnd={(e) => {
// //           console.log("Drag End", e.nativeEvent.coordinate);
// //         }}
// //       >
// //         <Callout>
// //           <Text>call</Text>
// //         </Callout>
// //       </Marker>
// //       </MapView>
// //       <Circle
// //         center={{ latitude: 12.938516574275933, longitude: 80.13928801586894}}
// //         radius={100}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   map: {
// //     width: Dimensions.get("window").width,
// //     height: Dimensions.get("window").height,

// //   }
// // });


// import React, { Component , useState} from 'react';
// import { Dimensions, StyleSheet } from 'react-native';
// import MapView from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import { GOOGLE_MAP_KEY } from './googleapikey.js'


// const App = () => {

//   const [state, setState] = useState({
//     pickupCord: {
//       latitude: 12.968016232117783,
//       longitude:  80.13063735608604,
//       latitudeDelta: 0.0325,
//       longitudeDelta: 0.0654,
//     },
//     droplocationCors: {
//       latitude:12.967704155320403, 
//       longitude: 80.13481940773619,
//       latitudeDelta: 0.0461,
//       longitudeDelta: 0.0542
//     }
//   })

//   const { pickupCords, droplocationCors} = state
//   return (
//     <MapView
//       initialRegion={pickupCords}
//       style={StyleSheet.absoluteFill}
//     >

//     <MapViewDirections
//     origin={pickupCords}
//     destination={droplocationCors}
//     apikey= {GOOGLE_MAP_KEY}

//   />
//     </MapView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   }
// });


// export default App;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

//Screens
import ChooseLocation from './src/Screens/ChooseLocation';
import Home from './src/Screens/Home';


const App = () => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="chooseLocation" component={ChooseLocation} />
      </Stack.Navigator>
      <FlashMessage
        position="top"
      />
    </NavigationContainer>
  );
};

export default App;