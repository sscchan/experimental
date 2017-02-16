//////////////////////////////////////////////////////////////////////////////////////////
// GeoLocationTracker.js
// ------------------
//
// This component is used to encapsulate the code for obtaining the geoLocation of
// the device.
//
//////////////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { View, Text, AppState } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

class GeoLocationTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };

    // watchID is returned from geolocation.watchPosition
    // we need to keep it to "un-track" when the component unmounts
    this.watchID = null;
    this.intervalId = null;
  }

  componentDidMount() {
    // Obtain an initial geolcation
    // setInterval(() => navigator.geolocation.getCurrentPosition(this.handlePositionUpdate), 5000);
    this.intervalId = BackgroundTimer.setInterval(()=> navigator.geolocation.getCurrentPosition(this.handlePositionUpdate), 5000);    
    this.startLocationWatch();

  }

  startLocationWatch() {
    // Start tracking our geolocation
    this.watchID = navigator.geolocation.watchPosition(this.handlePositionUpdate, this.handlePositionUpdateFail, {
      enableHighAccuracy: true,
      distanceFilter: 1,
      maximumAge: 0
    });
  }

  componentWillUnmount() {
    // Stop tracking our geolocation
    navigator.geolocation.clearWatch(this.watchID);
    BackgroundTimer.clearInterval(this.intervalId);
  }

  // handler for when the system provide the application with
  // new GPS location
  handlePositionUpdate = (newPosition) => {
    const newCoordinates = {
      latitude: newPosition.coords.latitude,
      longitude: newPosition.coords.longitude,
      altitude: newPosition.coords.altitude
    };

    this.setState(newCoordinates);

    // call any event handler passed by the parent components
    if (this.props.onLocationChange) {
      this.props.onLocationChange(newCoordinates);
    }
  }

  handlePositionUpdateFail = (error) => {
    console.warn('handlePositionUpdateFail: ', error);
  }

  render() {
    return (
      <View>
        <Text> Lat: {this.state.latitude.toFixed(4)} Long: {this.state.longitude.toFixed(4)} </Text>
      </View>
    );
  }
}

GeoLocationTracker.propTypes = {
  onLocationChange: React.PropTypes.func
};

export default GeoLocationTracker;
