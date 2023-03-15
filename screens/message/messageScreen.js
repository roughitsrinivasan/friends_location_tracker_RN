import React, { Component, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, SafeAreaView, StatusBar, Image, BackHandler, Dimensions } from "react-native";
import MapView, { Marker, Callout, Circle  } from 'react-native-maps';
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
import { TransitionPresets } from 'react-navigation-stack';

class MessageScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

   

    name = this.props.navigation.getParam('name');
    latitude = this.props.navigation.getParam('latitude');
    longtiude = this.props.navigation.getParam('longitude');

    state = {
        showBottomSheet: false,
        latitude: this.latitude,
        longitude: this.longtiude
    }

    
    

    render() {
       
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <Message navigation={this.props.navigation} />
                </View>
              

            </SafeAreaView>
        )
    }

   

    header() {
        return (
            <View style={styles.headerContainerStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Text style={{
                    ...Fonts.blackColor18Bold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                {this.name}'s location
                </Text>
                {/* <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => this.setState({ showBottomSheet: true })}
                /> */}
            </View>
        )
    }
}

const Message = ({ navigation }) => {


        return (

            <View style={styles.container}>
        
        <StatusBar style="auto" />
        <MapView style={styles.map}
                initialRegion={{
                    latitude: 12.930088541002087,  
                    longitude: 80.14177710504552,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    
                }}    
                showUserLocation={true}

                >
                <Marker
                coordinate={{ latitude: 12.930088541002087, longitude: 80.14177710504552}}
                pinColor="red"
                draggable={true}
                onDragStart={(e) => {
                    console.log("Drag Start", e.nativeEvent.coordinate);
                }}
                onDragEnd={(e) => {
                    console.log("Drag End", e.nativeEvent.coordinate);
                }}
                >
                <Callout>
                    <Text>{this.name}</Text>
                </Callout>
                </Marker>
                </MapView>
                {/* <Circle
                center={{ latitude: 12.938516574275933, longitude: 80.13928801586894}}
                radius={100}
                /> */}
            </View>
            // <FlatList
            //     data={messagesList}
            //     keyExtractor={(item) => `${item.id}`}
            //     renderItem={renderItem}
            //     showsVerticalScrollIndicator={false}
            //     contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
            // />
        )
    }

    // function addMessage({ message }) {

    //     const oldMessages = messagesList;
    //     let date = Date();
    //     let hour = (new Date(date)).getHours();
    //     let minute = (new Date(date)).getMinutes();
    //     let AmPm = hour >= 12 ? 'PM' : 'AM';
    //     let finalhour = hour >= 12 ? (hour - 12) : hour;

    //     const newMessage = {
    //         id: messagesList.length + 1,
    //         message: message,
    //         time: `${finalhour}:${minute} ${AmPm}`,
    //         isSender: true,
    //         isSeen: false,
    //     }

    //     oldMessages.push(newMessage);
    //     setMessagesList(oldMessages);
    // }

    // function typeMessage() {
    //     const [message, setMessage] = useState('');
    //     return (
    //         <View style={styles.bottomContainerStyle}>
    //             <View style={styles.textFieldContainerStyle}>
    //                 <TextInput
    //                     selectionColor={Colors.whiteColor}
    //                     value={message}
    //                     onChangeText={setMessage}
    //                     placeholder='Type a Message'
    //                     style={{ ...Fonts.whiteColor14Regular }}
    //                     placeholderTextColor={Colors.whiteColor}
    //                 />
    //             </View>
    //             <View style={styles.sendButtonStyle}>
    //                 <MaterialCommunityIcons name="send" size={24} color={Colors.primaryColor}
    //                     onPress={() => {
    //                         if (message != '') {
    //                             addMessage({ message: message })
    //                             setMessage('');
    //                         }
    //                     }}
    //                 />
    //             </View>
    //         </View>
    //     )
    // }

    // return <View style={{ flex: 1, }}>
    //     {messages()}
    //     {typeMessage()}
    // </View>
// }

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
          map: {
            marginTop: 55,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            elevation: 3.0
        
          },
    headerContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
    },
    messageContainerStyle: {
        borderTopRightRadius: Sizes.fixPadding - 5.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 6.0,
    },
    bottomContainerStyle: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding,
    },
    textFieldContainerStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 40.0,
        justifyContent: 'center',
        flex: 1,
        paddingLeft: Sizes.fixPadding,
    },
    sendButtonStyle: {
        height: 40.0,
        width: 40.0,
        borderRadius: 20.0,
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding,
    },
    propertyImageContentStyle: {
        borderRadius: Sizes.fixPadding,
        height: 160.0,
        width: 130.0,
        backgroundColor: Colors.whiteColor,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 50,
        borderColor: 'rgba(128, 128, 128, 0.2)',
        borderWidth: 1.5,
        elevation: 3.0
    },
    viewMoreButtonStyle: {
        height: 31.0,
        width: 95.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomSheetContentStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    }
})

MessageScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(MessageScreen);