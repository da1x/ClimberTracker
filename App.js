import React from "react";
import { Text, View } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

//Redux
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
//import { PersistGate } from "redux-persist/integration/react";

//Icons
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//Screens
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import BoulderScreen from "./src/screens/BoulderScreen";
import LeadScreen from "./src/screens/LeadScreen";
import SpeedScreen from "./src/screens/SpeedScreen";
import SettingScreen from "./src/screens/SettingScreen";

// Stack Navigator - Main route is LoginScreen
const MainStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: "Home"
  }
);

const MainNavigator = createBottomTabNavigator({
  Home: MainStack,
  Boulder: BoulderScreen,
  Lead: LeadScreen,
  Speed: SpeedScreen,
  Settings: SettingScreen
});

MainStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name={`ios-home`} size={25} color={tintColor} />
  )
};

BoulderScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name={`hand-rock-o`} size={25} color={tintColor} />
  )
};

LeadScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Entypo name={`flow-line`} size={25} color={tintColor} />
  )
};

SpeedScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name={`ios-timer`} size={25} color={tintColor} />
  )
};

SettingScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name={`ios-settings`} size={25} color={tintColor} />
  )
};

const AppNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
    Login: LoginScreen
  },
  {
    initialRouteName: "Main"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/*<PersistGate loading={null} persistor={persistor}>*/}
        <AppContainer />
        {/*</PersistGate>*/}
      </Provider>
    );
  }
}
