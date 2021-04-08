import React from 'react';
import {
  Image,
  View
} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// SCREENS
import LoadingScreen from '../Screens/loading';
import LoginScreen from '../Screens/auth/login';
import RegisterScreen from '../Screens/auth/register';
import Home from '../Screens/home';
import MyReviews from '../Screens/myReviews';
import Profile from '../Screens/profile'
import InboxDropdown from '../Screens/inboxDropdown';
import AdvanceSearch from '../Screens/advanceSearch';
import RootPage from '../Screens/rootPage';
import PaymentScreen from '../Screens/paymentScreen';
import TransactionPage from '../Screens/transactionPage';
import Payments from '../Screens/payments';
import EditProfile from '../Screens/profile/editProfile';
import PostRoot from '../Screens/root/post';
import LeftDrawer from '../Screens/leftDrawer';
import RightDrawer from '../Screens/rightDrawer';
import MySales from '../Screens/mySales';
import MyShopping from '../Screens/myShopping';
import MyRequests from '../Screens/myRequests';
import MyRoots from '../Screens/MyRoots';
import EditRequest from '../Screens/editRequest';
import BuyersRequests from '../Screens/buyersRequests';
import MyFavorites from '../Screens/MyFavorites';
import Inbox from '../Screens/inbox';
import SellerRequest from '../Screens/sellerRequest'
import Notifications from '../Screens/notifications'
import ChatList from '../Screens/Chat/chat-list'
import ChatScreen from '../Screens/Chat/chatScreen';
import AddButton from '../Screens/Add';
import Icon from 'react-native-vector-icons/FontAwesome';
import OrderDetails from '../Screens/myShopping/details';
import ProfileRequire from '../Screens/profileRequire';
import SearchBar from '../components/SearchIcon';

import ChatIcon from '../Screens/chatIcon'
const MyRequestStackNavigator = createStackNavigator({
  MyRequests,
  EditRequest,
}, {
  initialRouteName: 'MyRequests',
  headerMode: 'none'
})
// SWITCH FOR POST ROOT, EDIT PROFILE REQUIRE 
const postRootSwitchNavigator = createSwitchNavigator(
  {
    ProfileRequire,
    EditProfile,
    PostRoot,
  },
  {
    headerMode: 'none',
    initialRouteName: 'ProfileRequire',
  }
);
const HomeStackNavigator = createStackNavigator({
  Home,
  Profile,
  MyReviews,
  MyRequests: MyRequestStackNavigator,
  BuyersRequests,
  EditRequest,
  AddRequest: EditRequest,
  InboxDropdown,
  AdvanceSearch,
  Payments,
  PostRoot:PostRoot,
  EditProfile,
  MySales,
  MyShopping,
  MyFavorites,
  Inbox,
  SellerRequest,
  Notifications,
  RootPage,
  PaymentScreen,
  MyRoots,
  OrderDetails,
  ChatList
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
})
// TAB NAVIGATOR INSIDE DRAWER
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      tabBarLabel: <View />,
      tabBarIcon: ({ focused }) => {
        let iconName = focused
          ? require("../assets/icons/home-icon.png")
          : require("../assets/icons/home-icon.png");
        return <Image style={{ height: 24, width: 26 }} source={iconName} />;
      }
    }
  },
  Search: {
    screen: () => null, // Empty screen
    navigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
       return  <SearchBar navigation={navigation}/> // Plus button component
      },
      tabBarLabel : 'hide'
    })
  },
  AddScreen : {
    screen: () => null, // Empty screen
    navigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
       return  <AddButton navigation={navigation}/> // Plus button component
      },
      tabBarLabel : 'hide'
    })
  },
  Notification: {
    screen: Notifications,
    navigationOptions: {
      tabBarLabel: <View />,
      tabBarIcon: ({ focused }) => {
        let iconName = focused
          ? require("../assets/icons/bell-icon.png")
          : require("../assets/icons/bell-icon.png");
        return <Image style={{ height: 28, width: 26 }} source={iconName} />;
      }
    }
  },
  ChatList: {
    screen: () => null ,
    navigationOptions: ({navigation}) =>({
      tabBarIcon: (props) => {
        return <ChatIcon navigation = {navigation} />;
      },
      tabBarLabel: 'hide'
    })
  }
},
  {
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#000',
      labelStyle: {
        fontSize: 14,
      },
      style: {
        height: 60,
        paddingTop: 5,
        paddingBottom: 5
      },
      showLabel : false
    },
});
// MAIN SCREENS DRAWER NAVIGATOR
const MainDrawerNavigator = createDrawerNavigator({
  Home : TabNavigator,
}, {
  contentComponent: LeftDrawer,
  drawerType: 'front',
  drawerWidth: '70%'
}
);
const MainStackNavigator = createStackNavigator({
  MainDrawerNavigator,
  ChatList,
  ChatScreen,
}, {
  initialRouteName: 'MainDrawerNavigator',
  headerMode: 'none'
})
// AUTH STACK NAVIGATOR
const AuthStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
});
// SWITCH FOR LOADING, AUTH AND MAIN SCREENS
const switchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Auth: AuthStackNavigator,
    App: MainStackNavigator,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Loading'
  }
);
export default createAppContainer(switchNavigator);