/**
 * Change Photo - shows how to use the Camera/Camera Role
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
 'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
var Platform = require('react-native').Platform;
import ImagePicker from 'react-native-image-picker';

// App Components
import Button from '../components/button'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'


/* Component ==================================================================== */
class Camera extends Component {
  static componentName = 'Camera';

  constructor(props) {
    super(props);

    this.state = {
      imageSrc: null,
    }
  }

  /**
    * Launches the Camera ActionSheet
    */
  _openCamera = () => {
    let options = {
      title: 'Upload Photo',
      quality: 0.2,         // Drop the quality so the base64 isn't massive
      maxWidth: 500,        // We don't want it too big!
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,   // Won't be backed up to iCloud
        path: 'images',     // Documents/images
        cameraRoll: true,   // Save to camera roll
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        /*if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }*/

        this.setState({
          imageSrc: source
        });
      }
    });
  }

  // Done
  render = () => {
    let { imageSrc } = this.state;

    return (
      <View style={[AppStyles.container, AppStyles.containerCentered]}>
        {imageSrc &&
          <View>
            <Image source={imageSrc} style={styles.selectedPhoto} />

            <View style={[AppStyles.spacer_10]} />
          </View>
        }

        <Button
          text={'Take Photo'}
          onPress={()=>this._openCamera()} />
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  selectedPhoto: {
    height: 300,
    width: 300,
  }
});

/* Export Component ==================================================================== */
export default Camera