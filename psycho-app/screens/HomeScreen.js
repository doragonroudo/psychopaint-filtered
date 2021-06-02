import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

import { Styles, Icon } from '../utils/Styles'
// images
import CDTColor from '../assets/icon/CDT_color.png';
import CDTGray from '../assets/icon/CDT_gray2.png';
import HTPColor from '../assets/icon/HTP_color.png';
import HTPGray from '../assets/icon/HTP_gray2.png';

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'none',
      modalVisible: false,
    }
  }

  changeMode = (mode) => {
    this.setState({
      mode: mode
    })
  }

  navigateByMode = () => {
    if (this.state.mode === 'CLK') {
      this.props.navigation.navigate('CLKMode')
    } else if (this.state.mode === 'HTP') {
      this.props.navigation.navigate('HTPMode')
    }
    this.setState({
      mode: 'none'
    })
  }

  render() {
    return (
      <View style={Styles.containerCentered}>

        <View style={Styles.iconContainer}>
          <Ionicons
            name={Icon.INFO}
            size={32}
            color="black"
            onPress={() => {
              this.setState({ modalVisible: !this.state.modalVisible });
            }}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          backdropColor="black"
          visible={this.state.modalVisible}>
          <View style={Styles.modalContainer}>
            <Text style={Styles.modalText}>กรุณาเลือกแบบทดสอบแล้วกด
              <Text style={{color:"#9bc588"}}> เริ่มต้น</Text> เพื่อเริ่มทำแบบทดสอบ</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible });
              }}>
              <Text style={Styles.buttonGreen}>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Text style={Styles.header1}>WELCOME TO PSYCHO PAINT!</Text>
        <Text style={Styles.header2}>กรุณาเลือกแบบทดสอบ</Text>
        <View style={Styles.containerColumn}>
          <TouchableOpacity onPress={() => this.changeMode('CLK')}>
            <Image style={Styles.imageTest} source={this.state.mode === 'CLK' ? CDTColor : CDTGray}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeMode('HTP')}>
            <Image style={Styles.imageTest} source={this.state.mode === 'HTP' ? HTPColor : HTPGray}></Image>
          </TouchableOpacity>
        </View>
        {
          this.state.mode !== 'none' ?
            (
              <TouchableOpacity onPress={() => this.navigateByMode()}>
                <Text style={Styles.buttonGreen}>เริ่มต้น</Text>
              </TouchableOpacity>
            ) : ( /* for making the ui not jumpy */
              <Text style={Styles.buttonTransparent}>เริ่มต้น</Text>
            )
        }
        <Text style={{color: '#bbb', position: 'absolute', bottom: 0, left: 0, margin: 5}}>version 2.0.0(1.0.2) - new_pad_for_collecting_data</Text>
      </View>
    );
  }

}

export default HomeScreen;
