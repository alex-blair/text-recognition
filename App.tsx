/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
// import Header from './src/Header';
import { StyleSheet, Text, TouchableOpacity, View, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {};

interface State {
  canDetectText: boolean;
  textBlocks: string[],
  analyseText: boolean;
}
export default class App extends Component<Props> {
  public camera: RNCamera;

  state = {
    canDetectText: false,
    textBlocks: [],
    analyseText: false,
  };

  // private camera?: RNCamera | null;
  render() {
    console.log('###', this.state.textBlocks)
    console.log('### Made it to intial render')
    return (
    <View style={styles.container}>{this.state.analyseText ? this.renderPhotoWithText() : this.renderCamera()}</View>
    );
  }

  private takePicture = async function() {
    if (this.camera) {
      this.setState({analyseText: true})
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log('### Photo', data.uri);
    }
  };

  private renderTextBlocks = () => {
    return (
      <View style={styles.textContainer} pointerEvents="none">
        {this.state.textBlocks.map(this.renderTextBlock)}
      </View>
    )
  }

  private renderTextBlock = ({ bounds, value } : {bounds: any, value: any}) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  );

  private textRecognized = (object: any) => {
    if(this.state.analyseText) {
      return;
    }
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };


  private toggle = (value: any) => () => this.setState(prevState => ({ [value]: !prevState[value]}));

  private renderCamera = () => {
    const { canDetectText } = this.state;
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        trackingEnabled
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }
        onTextRecognized={canDetectText ? this.textRecognized : undefined}
      >
        <View
          style={{
            flex: 0.5,
          }}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
        </View>
        {!!canDetectText && this.renderTextBlocks()}
      </RNCamera>
    );
  }

  private renderPhotoWithText = () => {
    console.log('### Text in photo text render', this.state.textBlocks)
    console.log('### Made it to photo text render' )
    return this.renderTextBlocks()
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
