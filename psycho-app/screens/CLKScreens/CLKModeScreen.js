import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import { stylesModeScreen  } from '../../utils/Styles'
import { Avatar, Card, Button } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

class CLKModeScreen extends Component {

  back = () => {
    this.props.navigation.goBack()
  }

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen)
  }

  render() {
    return (
      <SafeAreaView style={stylesModeScreen.container}>
        <View >
        <View style={stylesModeScreen.headContainer}>
          <Text style={stylesModeScreen.fontInfo}>Clock Drawing Test</Text>
        </View>
        <View style={stylesModeScreen.rowInfoContainer}>
          <Card style={stylesModeScreen.card} onPress={() => this.navigateTo('TESTDraw')}>
            <Avatar style={{width:150,height:150}} source={require('../../assets/testMode.png')}/>
            <Text style={stylesModeScreen.fontHeader}>ทดสอบการวาด</Text>
            </Card>
            <Card style={stylesModeScreen.card} onPress={() => this.navigateTo('CLKInfo')}>
              <Avatar style={{width:150,height:150}} source={require('../../assets/drawMode.png')}/>
              <Text style={stylesModeScreen.fontHeader}>เริ่มทำแบบทดสอบ</Text>
            </Card>
        </View>
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
    );
  }
}
export default CLKModeScreen;
