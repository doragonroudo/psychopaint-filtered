import React, { Component } from 'react';
import { RecyclerViewBackedScrollViewComponent, StyleSheet } from 'react-native';


var screenWidth = Dimensions.get('window').width; //full width
var screenHeight = Dimensions.get('window').height; //full height
import { Dimensions } from "react-native"; // for screen width/height
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

import { Input, Radio, SelectItem, Select, CheckBox, Button } from '@ui-kitten/components';
import { TouchableWithoutFeedback, KeyboardAvoidingView, View, Text, TextInput , 
  Image, TouchableOpacity, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
// import { CheckBox } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

import { Styles, pickerSelectStyles, pickerSelectStylesError } from '../../utils/Styles'
import { TouchableHighlight } from 'react-native-gesture-handler';

const jobList = [
      {
        label: 'นักเรียน/นิสิตนักศึกษา',
        value: 'student',
      },
      {
        label: 'ข้าราชการ',
        value: 'public_servant',
      },
      {
        label: 'พนักงานรัฐวิสาหกิจ',
        value: 'state_enterprise_employee',
      },
      {
        label: 'พนักงานบริษัท',
        value: 'company_employee',
      },
      {
        label: 'ค้าขาย/ธุรกิจส่วนตัว',
        value: 'private_business',
      },
      {
        label: 'รับจ้าง',
        value: 'employee',
      },
      {
        label: 'แม่บ้าน/พ่อบ้าน',
        value: 'housewife',
      },
      {
        label: 'อื่นๆ',
        value: 'other',
      },
    ]

const educationList = [
      {
        label: 'ประถมศึกษา',
        value: 'elementary',
      },
      {
        label: 'มัธยมศึกษา',
        value: 'high_school',
      },
      {
        label: 'อุดมศึกษา',
        value: 'university',
      },
      {
        label: 'อื่นๆ',
        value: 'other',
      }
    ]


class CLKInfoScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      birthDate: new Date(),
      name: null,
      age: null,
      education: 'none',
      job: 'none',
      sex: "male",
      sexMale: true,
      sexFemale: false,
      retired: true,
      retiredYes: true,
      retiredNo: false,
      agree: false,
      valid: false,
      isDatePickerVisible: false,
      dateInvalid: false,
      jobInvalid: false
    }
  }

  navigateToBack = (screen) =>{
    this.props.navigation.navigate(screen)
  }

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen, {
      name: this.state.name,
      age: this.state.age,
      education: this.state.education,
      job: this.state.job,
      sex: this.state.sex,
      retired: this.state.retired
    })
  }

  _handleDatePicked = (date) => {
    var a = moment(new Date());
    var b = moment(date);
    let age = a.diff(b, 'years');
    this.setState({
      birthDate: date,
      age: age.toString()
    }, () => {
      this.toggleDatePicker()
      // input validation
      if(moment(this.state.birthDate).isSame(moment(new Date()), 'day')) {
        this.setState({
          dateInvalid: true
        })
      } else {
        this.setState({
          dateInvalid: false
        })
      }
      // end input validation
    })
  }

  toggleDatePicker = () => {
    Keyboard.dismiss()
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible
    })
  }

  setSex = (sex) => {
    this.setState({
      sex: sex
    })
  }

  setRetired = (retired) => {
    this.setState({
      retired: retired
    })
  }

  validateFormBeforeNavigate = () => {
    let isValid = true
    // validation
    if(this.state.job != 'none' && this.state.education != 'none' && (this.state.name != null && this.state.name != '' )
    && (this.state.age != null && this.state.age != '') && this.state.agree != false) {
      isValid = true
    }else{
      isValid = false
    }
    // end validation

    if (isValid) {
      this.setState({ valid: true})
    }else{
      this.setState({ valid: false})
    } 
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
            <Text style={styles.fontInfo}>ข้อมูลส่วนตัว</Text>
        </View>
        <View style={styles.infoContainer}>  
          <View style={styles.rowInfoContainer}>
            <View style={styles.columnInfo}>
             <Text style={styles.fontHeader}>ชื่อ-นามสกุล</Text>
            </View>
            <View style={styles.columnInfo}>
              <Text style={styles.fontHeader}>อายุ</Text>
            </View>
          </View>
          <View style={styles.rowInfoContainer}>
            <View style={styles.columnInfo}>
                <Input
                  style={styles.textInput}
                  value={this.state.name}
                  status= {this.state.name != '' ? 'primary' : 'danger'}
                  placeholder='ชื่อ-นามสกุล'
                  onChangeText={nextValue => {
                    this.setState({name: nextValue},() => this.validateFormBeforeNavigate())
                  }}
              />
            {
              this.state.name == '' ?
                <Text style={styles.textError}>กรุณาระบุชื่อและนามสกุล</Text> :
                <Text style={{...styles.textError,color:'transparent'}}>กรุณาระบุชื่อและนามสกุล</Text>
            }
            </View>
            <View style={styles.columnInfo}>
                <Input
                  style={styles.textInput}
                  value={this.state.age}
                  status= {this.state.age != '' ? 'primary' : 'danger'}
                  keyboardType = 'decimal-pad'
                  placeholder='อายุ'
                  onChangeText={nextValue => {
                    this.setState({ age: nextValue},() => this.validateFormBeforeNavigate())
                  }}
              />
            {
              this.state.age == '' ?
                <Text style={styles.textError}>กรุณาระบุอายุ</Text> :
                <Text style={{...styles.textError,color:'transparent'}}>กรุณาระบุอายุ</Text>
            }
            </View>
          </View>

          <View style={styles.rowInfoContainer}>
          <View style={{ width: screenWidth /2.6,flexDirection:'row' }}>
              <View>
                <Text style={styles.fontHeader}>เพศ</Text>
              </View>
              <View style={{marginLeft:30}}>
                <Radio
                    // style={styles.radio}
                    status='primary'
                    checked={this.state.sexMale}
                    onChange={nextChecked => {
                        this.setState({
                          sexMale: true,
                          sexFemale: false,
                          sex: "male"
                        })
                    }}
                    >
                  <Text style={styles.fontCheck}>ชาย</Text>
              </Radio>
              <Radio
                    style={{ marginTop:10 }}
                    status='primary'
                    checked={this.state.sexFemale}
                    onChange={nextChecked => {
                      this.setState({
                        sexMale: false,
                        sexFemale: true,
                        sex: "female"
                      })
                    }}
                    >
                  <Text style={styles.fontCheck}>หญิง</Text>
              </Radio>
              </View>
            </View>
            
            <View style={{ width: screenWidth /2.6,flexDirection:'row' }}>
              <View>
                <Text style={styles.fontHeader}>เกษียรอายุ</Text>
              </View>
              <View style={{marginLeft:30}}>
                <Radio
                    // style={styles.radio}
                    status='primary'
                    checked={this.state.retiredYes}
                    onChange={nextChecked =>{
                        this.setState({
                          retiredYes: true,
                          retiredNo: false,
                          retired: true,
                        })
                    }}
                    >
                  <Text style={styles.fontCheck}>ใช่</Text>
              </Radio>
              <Radio
                    style={{ marginTop:10 }}
                    status='primary'
                    checked={this.state.retiredNo}
                    onChange={nextChecked =>{
                        this.setState({
                          retiredYes: false,
                          retiredNo: true,
                          retired: false,
                        })
                    }}
                    >
                  <Text style={styles.fontCheck}>ไม่ใช่</Text>
              </Radio>
              </View>
            </View>
          </View>
          
          <View style={{...styles.rowInfoContainer,marginTop: 15}}>
            <View style={styles.columnInfo}>
             <Text style={styles.fontHeader}>อาชีพ</Text>
            </View>
            <View style={styles.columnInfo}>
              <Text style={styles.fontHeader}>การศึกษา</Text>
            </View>
          </View>
          <View style={styles.rowInfoContainer}>
            <View style={styles.columnInfo}>
              <Select
                  style={{...styles.textInput}}
                  status='primary'
                  value={ this.state.job != 'none' ? this.state.job: undefined}
                  placeholder='อาชีพปัจจุบัน'
                  onSelect={index => {
                      this.setState({ job: jobList[index.row].label },() => this.validateFormBeforeNavigate())
                  }}
                  >
                    {
                      jobList.map(i => {
                        return(<SelectItem key={i} title={i.label}/>)
                      })
                    }
              </Select>
            {
              this.state.dateInvalid ?
                <Text style={styles.textError}>กรุณาระบุอาชีพ</Text> :
                <Text style={{...styles.textError,color:'transparent'}}>กรุณาระบุอาชีพ</Text>
            }
            </View>
            <View style={styles.columnInfo}>
              <Select
                style={{...styles.textInput}}
                status='primary'
                value={ this.state.education != 'none' ? this.state.education: undefined}
                placeholder='การศึกษา'
                onSelect={index => {
                    this.setState({ education: educationList[index.row].label },() => this.validateFormBeforeNavigate())            
                }}
                >
                  {
                    educationList.map(i => {
                      return(<SelectItem key={i} title={i.label}/>)
                    })
                  }
                </Select>
            {
              this.state.dateInvalid ?
                <Text style={styles.textError}>กรุณาระบุการศึกษา</Text> :
                <Text style={{...styles.textError,color:'transparent'}}>กรุณาระบุการศึกษา</Text>
            }
            </View>
          </View>
          <View style={styles.rowInfoContainer}>
            <View>
            <CheckBox
              checked={this.state.agree}
              onChange={nextChecked => {
                this.setState({ agree: !this.state.agree},() => this.validateFormBeforeNavigate())
              }}
              status='primary'
              >
                <Text style={styles.fontHeader}>ข้าพเจ้ายินยอมให้ข้อมูลในการทำแบบทดสอบ</Text>
            </CheckBox>
            </View>
          </View>
        </View>
        <View style={styles.rowMainContainer}>
              <View style={{width: screenWidth/2,alignItems:'flex-start'}}>
                <Button 
                  style={styles.buttonBack}
                  appearance='outline' 
                  status='primary'
                  onPress={ () => this.navigateToBack('CLKMode') }
                >
                  <Text style={styles.fontHeader}>ย้อนกลับ</Text>
                </Button>
              </View>
              <View style={{width: screenWidth/2.3,alignItems:'flex-end'}}>
                <Button 
                style={styles.buttonSubmit}
                status={ this.state.valid ? 'primary':'basic'}
                onPress ={() => {
                  if( this.state.valid ){
                    this.navigateTo('CLKDraw')
                  }
                }}
                >
                   <Text 
                   style={this.state.valid ? {...styles.fontHeader,color:'#fff'} :
                    {...styles.fontHeader,color:'#A7A7A7'}}          
                   >ยืนยัน</Text>
                </Button>
              </View>
          </View>   
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6E4FF',
    alignItems: 'center',
    padding: 20,
    width: screenWidth,
    height: screenHeight,
    
  },
  rowMainContainer: {
    flexDirection: 'row',
    width: screenWidth,
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff' , 
    height: RFPercentage(12), 
  },
  headContainer:{
    width: screenWidth,
    height: RFPercentage(12),
    flexDirection: 'row',
    // backgroundColor: '#000',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 20,
    paddingHorizontal: 40
  },
  infoContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    width: screenWidth,
    minHeight: screenHeight - RFPercentage(25),
    // paddingTop: 70,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowInfoContainer: {
    flexDirection: 'row',
    width: screenWidth/1.3,
    alignItems: 'center',
    // backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal:30
  },
  columnInfo: {
    flexDirection: 'column',
    width: screenWidth / 2.6,
    alignItems: 'flex-start',
  },
  fontInfo:{
    fontFamily: 'FC-Iconic-Bold',
    fontSize: RFPercentage(5),
    color: '#254EDB'
  },
  fontHeader:{
    fontFamily: 'FC-Iconic-Bold',
    fontSize: 25,
    color: '#3366FF'
  },
  fontCheck:{
    fontFamily: 'FC-Iconic-Regular',
    fontSize: 25,
    color: '#3366FF'
  },
  textInput: {
    // backgroundColor: '#fff',
    // borderColor: '#D6E4FF',
    // borderRadius: 30,
    width: screenWidth / 3,
    height: screenHeight / 20,
    paddingHorizontal: 25,
    color: '#000',
  },
  textError:{
    marginLeft:32,
    marginTop:10,
    fontFamily: 'FC-Iconic-Regular',
    fontSize: 18,
    color: '#FF846F'
  },
  buttonBack:{
    borderRadius: 30,
    width: RFPercentage(15)
  },
  buttonSubmit:{
    borderRadius: 30,
    width: RFPercentage(15)
  }
})

export default CLKInfoScreen;
