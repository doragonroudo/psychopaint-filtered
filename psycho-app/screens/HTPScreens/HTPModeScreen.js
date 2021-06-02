import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

import { stylesModeScreen  } from '../../utils/Styles'
import { Avatar, Card, Button } from '@ui-kitten/components';

class HTPModeScreen extends Component {

  back = () => {
    this.props.navigation.goBack()
  }

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen)
  }

  render() {
    return (
      <SafeAreaView style={stylesModeScreen.container}>
        <View style={stylesModeScreen.headContainer}>
          <Text style={stylesModeScreen.fontInfo}>House Tree Person</Text>
        </View>
        <View style={stylesModeScreen.rowInfoContainer}>
          <Card style={stylesModeScreen.card} onPress={() => this.navigateTo('TESTDraw')}>
            <Avatar style={{width:150,height:150}} source={require('../../assets/testMode.png')}/>
            <Text style={stylesModeScreen.fontHeader}>ทดสอบการวาด</Text>
            </Card>
            <Card style={stylesModeScreen.card} onPress={() => this.navigateTo('HTPInfo')}>
              <Avatar style={{width:150,height:150}} source={require('../../assets/drawMode.png')}/>
              <Text style={stylesModeScreen.fontHeader}>เริ่มทำแบบทดสอบ</Text>
            </Card>
        </View>
        <View style={stylesModeScreen.rowButtonContainer}>
          <Button 
              style={stylesModeScreen.buttonBack}
              appearance='outline' 
              status='primary'
              onPress={ () => this.back() }
            >
              <Text style={stylesModeScreen.fontHeader}>ย้อนกลับ</Text>
            </Button>
        </View>      
      </SafeAreaView>
      // <View style={Styles.containerCentered}>
      //   <Image
      //     style={Styles.imageMode}
      //     source={require("../../assets/icon/HTP_crop.png")}
      //   ></Image>
      //   <Text style={Styles.header3}>HOUSE-TREE-PERSON</Text>
      //   <View style={Styles.containerColumn}>
      //     <TouchableOpacity onPress={() => this.navigateTo('TESTDraw')}>
      //       <Text style={Styles.buttonBlue}>ทดลองวาด</Text>
      //     </TouchableOpacity>
      //     <TouchableOpacity onPress={() => this.navigateTo('HTPInfo')}>
      //       <Text style={Styles.buttonBlue}>เริ่มทำ</Text>
      //     </TouchableOpacity>
      //   </View>
      //   <View style={Styles.containerColumn}>
      //     <TouchableOpacity onPress={() => this.back()}>
      //       <Text style={Styles.buttonBlue}>{"กลับหน้าหลัก"}</Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>
    );
  }

}

export default HTPModeScreen;