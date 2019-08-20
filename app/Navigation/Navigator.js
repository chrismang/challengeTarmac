import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Text } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import DetailsScreen from '../Screens/DetailsScreen';

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen }
},
{
  initialRouteName: "Home",
  defaultNavigationOptions: {
    headerTitle: <Text style={{ alignSelf:'center', marginLeft: 15, fontSize: 22, fontWeight: 'bold' }}>TARMAC</Text>
  }
});

export default createAppContainer(AppNavigator);