import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Snackbar } from 'react-native-paper';

// const nearByPropertyList = [
//     {
//         id: '1',
//         properyImage: require('../../assets/images/house/house_1.jpg'),
//         propertyName: 'Sky View House',
//         propertyAddress: 'Opera Street, New York',
//         propertyAmount: '360000',
//         isFavourit: false,
//     },
//     {
//         id: '2',
//         properyImage: require('../../assets/images/house/house_2.jpg'),
//         propertyName: 'Vraj House',
//         propertyAddress: 'Yogi Street, New York',
//         propertyAmount: '920000',
//         isFavourit: false,
//     },
//     {
//         id: '3',
//         properyImage: require('../../assets/images/house/house_3.jpg'),
//         propertyName: 'Yogi Villa',
//         propertyAddress: 'Opera Street, New York',
//         propertyAmount: '490000',
//         isFavourit: false,
//     },
//     {
//         id: '4',
//         properyImage: require('../../assets/images/house/house_5.jpg'),
//         propertyName: 'Sky View House',
//         propertyAddress: 'Opera Street, New York',
//         propertyAmount: '300000',
//         isFavourit: false,
//     },
//     {
//         id: '5',
//         properyImage: require('../../assets/images/house/house_6.jpg'),
//         propertyName: 'Sky View House',
//         propertyAddress: 'Opera Street, New York',
//         propertyAmount: '360000',
//         isFavourit: false,
//     },
// ];

const featuredPropertyList = [
    {
        id: '1',
        properyImage: require('../../assets/images/contact.png'),
        propertyName: 'Sanjai Kumar',
        propertyAddress: 'Munnuadhi st,chitlapakkam,chennai',
        // propertyAmount: '360000',
        latitude: 17.8866,
        longitude: 89.5542455,
        isFavourit: false,
    },
    {
        id: '2',
        properyImage: require('../../assets/images/contact.png'),
        propertyName: 'Rajalingam',
        propertyAddress: 'Yogi Street, New York',
        // propertyAmount: '920000',
        latitude: 17.8866,
        longitude: 89.5542455,
        isFavourit: false,
    },
    {
        id: '3',
        properyImage: require('../../assets/images/contact.png'),
        propertyName: 'Sanjey T.S',
        propertyAddress: 'Opera Street, New York',
        // propertyAmount: '490000',
        latitude: '17.8866',
        longitude: '89.5542455',
        isFavourit: false,
    },
    {
        id: '4',
        properyImage: require('../../assets/images/contact.png'),
        propertyName: 'Prakash',
        propertyAddress: 'Opera Street, New York',
        // propertyAmount: '300000',
        latitude: '17.8866',
        longitude: '89.5542455',
        isFavourit: false,
    },
    {
        id: '5',
        properyImage: require('../../assets/images/contact.png'),
        propertyName: 'Taher',
        propertyAddress: 'Opera Street, New York',
        // propertyAmount: '360000',
        latitude: 17.8866,
        longitude: 89.5542455,
        isFavourit: false,
    },
];

const { width } = Dimensions.get('screen');

class HomeScreen extends Component {

    state = {
        isBuy: true,
        // nearbyProperyChangableList: nearByPropertyList,
        featuredPropertyChangableList: featuredPropertyList,
        showSnackBar: false,
        isInWishList: false,
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                             {/* {this.title({ title: 'Friend list' })} */}
                            {this.Register()}
                           
                            {/* {this.featuredProperties()} */}
                            {this.title({ title: 'Friend List' })}
                        </>
                    }
                    data={this.state.featuredPropertyChangableList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={this.renderItem}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0, }}
                    showsVerticalScrollIndicator={false}
                />
                {/* <Snackbar
                    style={styles.snackBarStyle}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.isInWishList ? 'Removed from shortlist' : 'Added to shortlist'}
                </Snackbar> */}
            </View>
        )
    }

    handleFeaturedPropertyUpdate({ id }) {
        const newList = this.state.featuredPropertyChangableList.map((property) => {
            if (property.id === id) {
                const updatedItem = { ...property, isFavourit: !property.isFavourit };
                return updatedItem;
            }
            return property;
        });
        this.setState({ featuredPropertyChangableList: newList })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.navigate('Property',
                {
                    properyImage: item.properyImage,
                    propertyName: item.propertyName,
                    propertyAddress: item.propertyAddress,
                    propertyAmount: item.propertyAmount,
                    latitude: item.latitude,
                    longitude: item.longitude,
                })}
            style={styles.featuredPropertyContentStyle}>
            <Image
                source={item.properyImage}
                resizeMode="cover"
                style={styles.featuredPropertyImageStyle}
            />
            {/* <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.handleFeaturedPropertyUpdate({ id: item.id })
                    this.setState({ isInWishList: item.isFavourit, showSnackBar: true })
                }}
                style={styles.addToFavouriteContainerStyle}>
                <MaterialIcons
                    name={item.isFavourit ? "favorite" : "favorite-border"}
                    size={16}
                    color={Colors.grayColor}
                />
            </TouchableOpacity> */}
            <View style={styles.featuredPropertyInfoContentStyle}>
                <View style={{ width: width / 1.9, }}>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {item.propertyName}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                        {item.propertyAddress}
                    </Text>
                </View>
                {/* <View style={styles.featuredPropertyAmountContentStyle}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.propertyAmount}$
                    </Text>
                </View> */}
            </View>
        </TouchableOpacity>
    )

    // handleNearByPropertyUpdate({ id }) {
    //     const newList = this.state.nearbyProperyChangableList.map((property) => {
    //         if (property.id === id) {
    //             const updatedItem = { ...property, isFavourit: !property.isFavourit };
    //             return updatedItem;
    //         }
    //         return property;
    //     });
    //     this.setState({ nearbyProperyChangableList: newList })

    // }

    // nearbyProperties() {
    //     const renderItem = ({ item }) => (
    //         <TouchableOpacity
    //             activeOpacity={0.9}
    //             onPress={() => this.props.navigation.navigate('Property',
    //                 {
    //                     properyImage: item.properyImage,
    //                     propertyName: item.propertyName,
    //                     propertyAddress: item.propertyAddress,
    //                     propertyAmount: item.propertyAmount,
    //                 })}
    //             style={styles.nearByPropertContentStyle}>
    //             <Image source={item.properyImage}
    //                 resizeMode="cover"
    //                 style={styles.nearByPropertyImageStyle}
    //             />
    //             <TouchableOpacity
    //                 activeOpacity={0.9}
    //                 onPress={() => {
    //                     this.handleNearByPropertyUpdate({ id: item.id })
    //                     this.setState({ isInWishList: item.isFavourit, showSnackBar: true })
    //                 }}
    //                 style={styles.addToFavouriteContainerStyle}>
    //                 <MaterialIcons
    //                     name={item.isFavourit ? "favorite" : "favorite-border"}
    //                     size={16}
    //                     color={Colors.grayColor}
    //                 />
    //             </TouchableOpacity>
    //             <View style={{ marginHorizontal: Sizes.fixPadding }}>
    //                 <Text style={{ ...Fonts.blackColor14SemiBold, marginTop: Sizes.fixPadding }}>
    //                     {item.propertyName}
    //                 </Text>
    //                 <Text
    //                     numberOfLines={1}
    //                     style={{ ...Fonts.grayColor12Medium, marginVertical: Sizes.fixPadding - 5.0 }}
    //                 >
    //                     {item.propertyAddress}
    //                 </Text>
    //                 <Text style={{ ...Fonts.blackColor16SemiBold }}>
    //                     {item.propertyAmount}$
    //                 </Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    //     return (
    //         < FlatList
    //             horizontal
    //             data={this.state.nearbyProperyChangableList}
    //             keyExtractor={(item) => `${item.id}`}
    //             renderItem={renderItem}
    //             contentContainerStyle={{
    //                 paddingLeft: Sizes.fixPadding * 2.0,
    //                 paddingBottom: Sizes.fixPadding + 5.0
    //             }}
    //             showsHorizontalScrollIndicator={false}
    //         />
    //     )
    // }

    title({ title }) {
        return (
            <Text style={{
                ...Fonts.blackColor18SemiBold, marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding - 5.0
            }}>
                {title}
            </Text>
        )
    }

    Register() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.props.navigation.navigate('Register');
                }}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(255, 118, 117, 0.8)', 'rgba(255, 118, 117, 0.6)', 'rgba(255, 118, 117, 0.4)',]}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Medium }}>
                        Add friend location
                    </Text>
                </LinearGradient>
            </TouchableOpacity >
        )
    }


    // buyAndRentButton() {
    //     return (
    //         <View style={styles.buyAndRentButtonContainerStyle}>
    //             <TouchableOpacity
    //                 activeOpacity={0.9}
    //                 onPress={() => this.setState({ isBuy: true })}
    //                 style={{
    //                     ...styles.buyAndRentButtonStyle,
    //                     backgroundColor: this.state.isBuy ? Colors.primaryColor : Colors.whiteColor,
    //                     borderColor: this.state.isBuy ? null : Colors.primaryColor,
    //                     borderWidth: this.state.isBuy ? 0.0 : 1.0,

    //                 }}>
    //                 <Text style={this.state.isBuy ? { ...Fonts.whiteColor16Bold } : { ...Fonts.primaryColor16Medium }}>
    //                     Buy
    //                 </Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 activeOpacity={0.9}
    //                 onPress={() => this.setState({ isBuy: false })}
    //                 style={{
    //                     ...styles.buyAndRentButtonStyle,
    //                     backgroundColor: this.state.isBuy ? Colors.whiteColor : Colors.primaryColor,
    //                     borderColor: this.state.isBuy ? Colors.primaryColor : null,
    //                     borderWidth: this.state.isBuy ? 1.0 : 0.0,
    //                 }}>
    //                 <Text style={this.state.isBuy ? { ...Fonts.primaryColor16Medium } : { ...Fonts.whiteColor16Bold }}>
    //                     Rent
    //                 </Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    header() {
        return (
            <View style={styles.headerStyle}>
                <View style={styles.headerContentStyle}>
                    <Text style={{ ...Fonts.primaryColor18Bold }}>Find Location</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <MaterialIcons name="search" size={24} color={Colors.primaryColor}
                            onPress={() => this.props.navigation.navigate('Search')}
                        />
                        <MaterialIcons name="notifications" size={24} color={Colors.primaryColor}
                            style={{ marginLeft: Sizes.fixPadding + 5.0 }}
                            onPress={() => this.props.navigation.navigate('Notification')}
                        /> */}
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 60.0,
        elevation: 5.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center'
    },
    headerContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buyAndRentButtonContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding * 2.0,
    },
    buyAndRentButtonStyle: {
        flex: 0.47,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addToFavouriteContainerStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        position: 'absolute',
        right: 10.0,
        top: 10.0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nearByPropertyImageStyle: {
        width: 160.0,
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0
    },
    nearByPropertContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        width: 160.0,
        height: 203.0,
        borderRadius: Sizes.fixPadding + 5.0,
        marginRight: Sizes.fixPadding * 2.0
    },
    featuredPropertyContentStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    featuredPropertyImageStyle: {
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        width: '100%',
        height: 220.0,
    },
    featuredPropertyInfoContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    featuredPropertyAmountContentStyle: {
        borderWidth: 1.0,
        alignItems: 'center',
        height: 30.0,
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(128, 128, 128, 0.5)',
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 50.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding + 10.0,
        height: 56.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})

export default withNavigation(HomeScreen);