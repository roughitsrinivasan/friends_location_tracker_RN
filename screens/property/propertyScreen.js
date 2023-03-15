import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import CollapsingToolbar from "../../component/sliverAppBarScreen";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import GoogleMap from "../../component/googleMapScreen";
import { Snackbar } from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { SharedElement } from 'react-navigation-shared-element';

const nearestPlacesList = [
    {
        id: '1',
        place: 'RailwayStation',
        isExpandable: false,
        more: [
            {
                id: '1',
                name: 'Santa Cruise Railway Station',
                time: '8 min | 2.5 km',
            },
            {
                id: '2',
                name: 'Manhattan Railway Station',
                time: '14 min | 4.0 km',
            },
        ],
    },
    {
        id: '2',
        place: 'Airport',
        isExpandable: false,
        more: [
            {
                id: '1',
                name: 'LaGuardia Airport',
                time: '8 min | 2.5 km',
            },
        ],
    },
    {
        id: '3',
        place: 'Hospitals',
        isExpandable: false,
        more: [
            {
                id: '1',
                name: 'Presbyterian Hospital',
                time: '8 min | 2.5 km',
            },
            {
                id: '2',
                name: 'Lenox Hill Hospital',
                time: '14 min | 4.0 km',
            },
            {
                id: '3',
                name: 'Mount Sinai Hospital',
                time: '20 min | 6.0 km',
            },
        ],
    },
    {
        id: '4',
        place: 'Banks',
        isExpandable: false,
        more: [
            {
                id: '1',
                name: 'Kotak Mahindra Bank',
                time: '5 min | 1.5 km',
            },
        ],
    },
];

// const propertyPhotosList = [
//     {
//         id: '1',
//         photo: require('../../assets/images/bedroom-1.jpg')
//     },
//     {
//         id: '2',
//         photo: require('../../assets/images/bedroom-2.jpg')
//     },
//     {
//         id: '3',
//         photo: require('../../assets/images/kitchen.jpg')
//     },
//     {
//         id: '4',
//         photo: require('../../assets/images/bathroom-1.png')
//     },
//     {
//         id: '5',
//         photo: require('../../assets/images/bathroom-2.jpg')
//     },
//     {
//         id: '6',
//         photo: require('../../assets/images/parking.jpg')
//     },
// ];

// const projectAminitiesList = [
//     {
//         id: '1',
//         aminities: 'Garden',
//     },
//     {
//         id: '2',
//         aminities: 'Jogging Track',
//     },
//     {
//         id: '3',
//         aminities: 'Power Backup',
//     },
//     {
//         id: '4',
//         aminities: 'Complete RCC Structure',
//     },
//     {
//         id: '5',
//         aminities: 'Design Door Frames',
//     },
//     {
//         id: '6',
//         aminities: 'PVC Concealed wiring',
//     },
// ];

class PropertyScreen extends Component {

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

   

    propertyImage = this.props.navigation.getParam('properyImage');
    propertyName = this.props.navigation.getParam('propertyName');
    propertyAddress = this.props.navigation.getParam('propertyAddress');
    propertyAmount = this.props.navigation.getParam('propertyAmount');
    latitude = this.props.navigation.getParam('latitude');
    longitude = this.props.navigation.getParam('longitude');

    state = {
        expanded: false,
        nearestPlacesChangableList: nearestPlacesList,
        showSnackBar: false,
        isInWishList: false,
        latitude: this.latitude,
        longitude: this.longitude,
        name: this.propertyName
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons name="arrow-back" size={24}
                            color={Colors.whiteColor}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    rightItem={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showSnackBar: true, isInWishList: !this.state.isInWishList })}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}
                        >
                            <MaterialIcons
                                name={this.state.isInWishList ? "favorite" : "favorite-border"}
                                size={24}
                                color={Colors.whiteColor} />
                            <MaterialIcons name="share" size={24} color={Colors.whiteColor}
                                style={{ marginLeft: Sizes.fixPadding }}
                            />
                        </TouchableOpacity>
                    }
                    borderBottomRadius={20}
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={358}
                    src={this.propertyImage}>
                    <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
                        {this.propertyInfo()}
                        {/* {this.title({ title: 'Description' })}
                        {this.dummyText()} */}
                        {/* {this.title({ title: 'Photos' })} */}
                        {/* {this.photos()} */}
                        {this.title({ title: 'Location' })}
                        {this.mapInfo()}
                        {/* {this.title({ title: 'Project Amenities' })} */}
                        {/* {this.aminities()} */}
                        {/* {this.nearestPlaces()} */}
                    </View>
                </CollapsingToolbar>
                {this.contactOwnerInfo()}
                {/* <Snackbar
                    style={styles.snackBarStyle}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.isInWishList ? 'Added to shortlist' : 'Removed from shortlist'}
                </Snackbar> */}
            </SafeAreaView>
        )
    }

    contactOwnerInfo() {
        return (
            <View style={styles.ownerInfoContentStyle}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                    }}>
                        <Image
                            source={require('../../assets/images/contact.png')}
                            style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                        />
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor16Bold }}>
                                {this.propertyName}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                            {this.propertyAddress}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('Message', {name: this.state.name, latitude: this.state.latitude, longitude: this.state.longitude })}
                        style={styles.ownerContactContentStyle}>
                        <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                            Direction
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    // handleNearestPlacesUpdate({ id, isExpanded }) {
    //     const newList = this.state.nearestPlacesChangableList.map((property) => {
    //         if (property.id === id) {
    //             const updatedItem = { ...property, isExpandable: isExpanded };
    //             return updatedItem;
    //         }
    //         return property;
    //     });
    //     this.setState({ nearestPlacesChangableList: newList })

    // }

    // nearestPlaces() {
    //     return (
    //         <View>
    //             {this.state.nearestPlacesChangableList.map((item) => (
    //                 <View key={item.id} style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
    //                     <Collapse
    //                         onToggle={(isExpanded) => this.handleNearestPlacesUpdate({ id: item.id, isExpanded })}
    //                     >
    //                         <CollapseHeader>
    //                             <View
    //                                 style={{
    //                                     flexDirection: 'row',
    //                                     justifyContent: 'space-between',
    //                                     marginVertical: Sizes.fixPadding - 8.0
    //                                 }}>
    //                                 <Text style={{ ...Fonts.blackColor14Bold }}>
    //                                     {item.place}({item.more.length})
    //                                 </Text>
    //                                 <MaterialIcons
    //                                     name={item.isExpandable ? "keyboard-arrow-up" : "keyboard-arrow-down"}
    //                                     size={24} color={Colors.primaryColor}
    //                                 />
    //                             </View>
    //                         </CollapseHeader>
    //                         <CollapseBody>
    //                             <View style={{ marginVertical: Sizes.fixPadding - 5.0 }}>
    //                                 {item.more.map((item) => (
    //                                     <View key={item.id}
    //                                         style={{
    //                                             flexDirection: 'row',
    //                                             justifyContent: 'space-between',
    //                                             marginVertical: Sizes.fixPadding - 7.0,
    //                                         }}>
    //                                         <Text style={{ ...Fonts.grayColor12Medium }}>
    //                                             {item.name}
    //                                         </Text>
    //                                         <Text style={{ ...Fonts.grayColor12Medium }}>
    //                                             {item.time}
    //                                         </Text>
    //                                     </View>
    //                                 ))}
    //                             </View>
    //                         </CollapseBody>
    //                     </Collapse>
    //                 </View>
    //             ))}
    //         </View>
    //     )
    // }

    // aminities() {
    //     return (
    //         <View style={{ marginTop: Sizes.fixPadding - 8.0, paddingBottom: Sizes.fixPadding - 5.0 }}>
    //             {
    //                 projectAminitiesList.map((item) => (
    //                     <View key={item.id}>
    //                         <View style={styles.aminitiesContentStyle}>
    //                             <MaterialIcons name="check-circle" size={20} color={Colors.primaryColor} />
    //                             <Text style={{ ...Fonts.blackColor14Regular, marginLeft: 2.0, marginTop: 1.5 }}>
    //                                 {item.aminities}
    //                             </Text>
    //                         </View>
    //                     </View>
    //                 ))
    //             }
    //         </View>
    //     )
    // }

    mapInfo() {
        return (
            <View style={styles.mapStyle}>
                <GoogleMap
                    latitude={12.936535070963554}
                    longitude={80.12765795772663}
                    height={600}
                    pinColor={Colors.primaryColor}
                />
            </View>
        )
    }

    // photos() {
    //     const renderItem = ({ item }) => (
    //         <TouchableOpacity
    //             activeOpacity={0.9}
    //             style={{ overflow: 'hidden' }}
    //             onPress={() => this.props.navigation.navigate('ImageFullView', { image: item.photo, id: item.id })}
    //         >
    //             <SharedElement id={item.id}>
    //                 <Image
    //                     source={item.photo}
    //                     style={styles.propertyPhotosStyle}
    //                     resizeMode="cover"
    //                 />
    //             </SharedElement>
    //         </TouchableOpacity>
    //     )
    //     return (
    //         <FlatList
    //             horizontal
    //             data={propertyPhotosList}
    //             keyExtractor={(item) => `${item.id}`}
    //             renderItem={renderItem}
    //             showsHorizontalScrollIndicator={false}
    //             contentContainerStyle={{
    //                 paddingLeft: Sizes.fixPadding * 2.0,
    //                 paddingTop: Sizes.fixPadding - 5.0
    //             }}
    //         />
    //     )
    // }

    // dummyText() {
    //     return (
    //         <Text style={{
    //             ...Fonts.blackColor12Regular, marginHorizontal: Sizes.fixPadding * 2.0,
    //             textAlign: 'justify'
    //         }}>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies mi id faucibus odio lobortis vitae, ante malesuada mauris. Nulla quis orci, libero turpis morbi diam. Non placerat est consectetur hendrerit sem fringilla leo. Urna posuere aliquet justo, vitae at pharetra. Euismod sagittis malesuada mattis commodo faucibus purus convallis.
    //         </Text>
    //     )
    // }

    title({ title }) {
        return (
            <Text style={{
                ...Fonts.blackColor18Bold,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding
            }}>
                {title}
            </Text>
        )
    }

    propertyInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor18Bold, marginTop: Sizes.fixPadding }}>
                    {this.propertyName}
                </Text>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', marginTop: Sizes.fixPadding
                }}>
                    <View>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            {this.propertyAddress}
                        </Text>
                        {/* <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            5000ft2
                        </Text> */}
                    </View>
                    {/* <View style={styles.propertyAmountContentStyle}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {this.propertyAmount}$
                        </Text>
                    </View> */}
                </View>
                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Sizes.fixPadding
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor22Bold }}>6</Text>
                        <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding - 20 }}>
                            Bedrooms
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor22Bold }}>4</Text>
                        <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding - 20 }}>
                            Bathrooms
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor22Bold }}>2</Text>
                        <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding - 20 }}>
                            Kitchens
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor22Bold }}>3</Text>
                        <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding - 20 }}>
                            Parkings
                        </Text>
                    </View>

                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    propertyAmountContentStyle: {
        borderWidth: 1.0,
        alignItems: 'center',
        height: 34.0,
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(128, 128, 128, 0.5)',
    },
    propertyPhotosStyle: {
        width: 120.0,
        height: 150.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 8.0
    },
    mapStyle: {
        borderRadius: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding - 5.0,
        overflow: 'hidden',
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    aminitiesContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding - 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    ownerInfoContentStyle: {
        position: 'absolute',
        bottom: 0.0,
        height: 70.0,
        backgroundColor: Colors.whiteColor,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: 'rgba(128, 128, 128, 0.2)',
        borderTopWidth: 1.0,
        elevation: 2.0,
    },
    ownerContactContentStyle: {
        height: 31.0,
        width: 78.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 60.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    }
})

PropertyScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(PropertyScreen);