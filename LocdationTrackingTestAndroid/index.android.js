/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';

import LocationTracker from './src/components/LocationTracker.js';

export default class LocationTrackingTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationHistory: []
    };
  }

  handlePushToServer = () => {
    fetch('http://requestb.in/1kt81ds1', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(this.state.locationHistory)
    });
  }

  handleOnLocationChange = (newLocation) => {
    newLocation.time = new Date();
    newLocationHistory = this.state.locationHistory.slice();
    newLocationHistory.push(newLocation);
    this.setState({
      locationHistory: newLocationHistory
    });

    this.handlePushToServer();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>

        <Button
          onPress={this.handlePushToServer}
          title="POST Data to Server"
          color="#841584"
        />

        <LocationTracker onLocationChange={this.handleOnLocationChange} />
        <ScrollView>
        {this.state.locationHistory.slice().reverse().map((location,index) => {
            return <Text key={index}> {location.time.toString().substr(16, 20).slice(0,-11)}| Lat: {location.latitude.toFixed(5)} | Long: {location.longitude.toFixed(5)} | Alt: {location.altitude} </Text>;
        })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LocationTrackingTest', () => LocationTrackingTest);
