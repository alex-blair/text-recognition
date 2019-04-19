import React, { Component } from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
// import Header from './src/Header';
import { StyleSheet, Text, TouchableOpacity, View, Slider } from 'react-native';
import { RNCamera, TrackedTextFeature } from 'react-native-camera';

type Props = {};

interface State {
  canDetectText: boolean;
  textBlocks: TrackedTextFeature[];
  analyseText: boolean;
}

export default class App extends Component<Props, State> {
  public camera: any;

  state: State = {
    canDetectText: false,
    textBlocks: [],
    analyseText: false,
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.analyseText ? this.renderPhotoWithText() : this.renderCamera()}
      </View>
    );
  }

  private takePicture = async () => {
    if (this.camera) {
      this.setState({ analyseText: true });
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      // console.log('### Photo', data.uri);
    }
  };

  private renderTextBlocks = () => {
    return (
      <View style={styles.textContainer} pointerEvents="none">
        {this.state.textBlocks.map(this.renderTextBlock)}
      </View>
    );
  };

  private renderTextBlock = (textBlock: TrackedTextFeature) => {
    const { value, bounds } = textBlock;
    return (

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
    )
  }

  private textRecognized = (response: { textBlocks: TrackedTextFeature[] }) => {
    if (this.state.analyseText) {
      return;
    }
    const { textBlocks } = response;
    this.setState({ textBlocks });
  };

  private toggleCanDetectText = () =>
    this.setState(prevState => ({ canDetectText: !prevState.canDetectText }));

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
          />
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggleCanDetectText} style={styles.flipButton}>
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
        />
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
  };

  private renderPhotoWithText = () => {
    return this.renderTextBlocks();
  };
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
