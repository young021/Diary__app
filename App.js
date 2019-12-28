import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';
import WriteScreen from './screens/WriteScreen';
import DetailScreen from './screens/DetailScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const BaseNavi = createBottomTabNavigator({

  
  MainScreen: {
    
    screen: MainScreen,
  },
  DetailScreen: {
    screen: DetailScreen,
  },
	WriteScreen: {
    screen: WriteScreen,
  },
    
  
});

const BaseNavi2 = createStackNavigator( 
  {
    Write : WriteScreen,   
    Tab: BaseNavi,         
    Detail : DetailScreen, 
  },
  {
    initialRouteName:'Tab', 

    mode : 'modal', 
    headerMode : 'none',
  }                     
                        
)

const MyNavi = createAppContainer(BaseNavi2) /////////////////////////



export default class  App extends React.Component {
  render(){
  return (
   
    <View style={styles.container}>
      <MyNavi/>
    </View>

  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});



