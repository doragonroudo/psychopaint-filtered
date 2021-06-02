import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { Styles } from '../../utils/Styles'

class CLKResultScreen extends Component {

  componentDidMount() {
    this.changeScreenOrientation('landscape')
  }

  changeScreenOrientation = (orientation) => {
    if (orientation == 'landscape')
      return ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    else
      return ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
  };

  back = () => {
    this.props.navigation.goBack()
  }

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen)
  }

  backToMain = () => {
    this.props.navigation.popToTop()
  }

  render() {
    return (
      <View style={Styles.containerCentered}>
        <Image
          style={Styles.imageMode}
          source={require("../../assets/icon/CDT_crop.png")}
        ></Image>
        <Text style={Styles.header3}>ขอบคุณสำหรับการทำแบบทดสอบ</Text>
          <View style={Styles.containerColumn}>
            <TouchableOpacity onPress={() => this.backToMain()}>
              <Text style={Styles.buttonBlue}>{"กลับสู่หน้าหลัก"}</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }

}

export default CLKResultScreen;
