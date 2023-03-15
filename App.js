import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import bottomTabBarScreen from "./component/bottomTabBarScreen";
import LoadingScreen from "./component/loadingScreen";
import addNewListingScreen from "./screens/addNewListing/addNewListingScreen";
// import loginScreen from "./screens/auth/loginScreen";
import registerScreen from "./screens/auth/registerScreen";
// import verificationScreen from "./screens/auth/verificationScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import imageFullViewScreen from "./screens/imageFullView/imageFullViewScreen";
import messageScreen from "./screens/message/messageScreen";
import myListingScreen from "./screens/myListing/myListingScreen";
import notificationScreen from "./screens/notification/notificationScreen";
import privacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import propertyScreen from "./screens/property/propertyScreen";
import searchScreen from "./screens/search/searchScreen";
import SplashScreen from "./screens/splashScreen";
import supportScreen from "./screens/support/supportScreen";
import termsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  mainFlow: createSharedElementStackNavigator(
    {
      Splash: SplashScreen,
      // Login: loginScreen,
      // Verification: verificationScreen,
      Register: registerScreen,
      BottomBar: bottomTabBarScreen,
      Search: searchScreen,
      Notification: notificationScreen,
      Property: propertyScreen,
      ImageFullView: imageFullViewScreen,
      Message: messageScreen,
      EditProfile: editProfileScreen,
      AddNewListing: addNewListingScreen,
      MyListing: myListingScreen,
      PrivacyPolicy: privacyPolicyScreen,
      TermsOfUse: termsOfUseScreen,
      Support: supportScreen,
    },
    {
      initialRouteName: 'BottomBar',
    }
  ),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
