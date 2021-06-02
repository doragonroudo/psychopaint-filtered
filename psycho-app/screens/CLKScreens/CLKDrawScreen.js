// Library
import React from 'react';
import { Alert } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment'
import axios from 'axios'

import CLKDrawingPad from '../../components/CLKDrawingPad';
import { db } from '../../functions/FirebaseConfig'

// Class Component
//<NavigationBar navigation={this.props.navigation} route={this.props.route}"/>
export default class HTPDrawScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      drawing: 'null', // house, tree, person, oppositesex
      redraw: false,
      loading: false,
      drawing_key: Math.random().toString(36).substr(2, 9),
      backgroundImage: null,
      loadingMsg: '0/0'
    };
  }

  setLoading = (loading) => {
    console.log('loading set to:', loading)
    return this.setState({loading: loading})
  }

  setLoadingMessage = (msg) => {
    return this.setState({loadingMsg: msg})
  }

  componentDidMount() {
    // console.log(this.props.route.params.first_name);
    let id = moment(new Date()).format('YYYYMMDD_HHmmss') + '_' + Math.random().toString(36).substr(2, 9);
    this.setState(
      {
        uniqueId: id,
      },
      () => {
        this.changeScreenOrientation('landscape');
        this.showNumberInstruction();
      }
    );
  }

  componentWillUnmount() {
    this.changeScreenOrientation('landscape');
  }

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen)
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

  showNumberInstruction = () => {
    // set timeout to avoid loading spinner issue
    setTimeout(() => {
      Alert.alert('จงเขียนเลขบนนาฬิกา', '', [
        {
          text: 'ตกลง',
          onPress: () => {
            this.setState({ drawing: 'number' });
          },
        },
      ]);
    }, 100)
  };

  showHandInstruction = () => {
    // set timeout to avoid loading spinner issue
    setTimeout(() => {
      Alert.alert('จงวาดเข็มของนาฬิกาบอกเวลา 11.10 น.', '', [
        {
          text: 'ตกลง',
          onPress: () => {
            this.setState({ drawing: 'hand' });
          },
        },
      ]);
    }, 100)
  };

  showError = (message, drawingData) => {
    // set timeout to avoid loading spinner issue
    setTimeout(() => {
      Alert.alert('เกิดข้อผิดพลาด', message, [
        {
          text: 'ลองอีกครั้ง',
          onPress: () => this._handleDrawFinish(drawingData)
        },
      ]);
    }, 100)
  };

  getImgUrlFromApi = (base64) => {
    let bodyFormData = new FormData();
    bodyFormData.append('img', base64);
    return axios({
      method: 'post',
      url: '__FILTERED__',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
          //handle success
          console.log(res.data.url);
          return {
            status: 'success',
            url: res.data.url
          }
      })
      .catch(err => {
          //handle error
          console.log(err);
          return {
            status: 'fail',
            error: err.message
          }
      });
  }

  _handleDrawFinish = (drawingData) => {

    console.log(this.state.drawing, 'base64 is', drawingData.img)

    this.setState({
      [this.state.drawing]: drawingData
    }, () => {
      if (this.state.drawing === 'number') {
        this.showHandInstruction()
      } else {
        this.setState({
          drawing: 'finished'
        }, () => {
          // set loading screen on
          const {number, hand} = this.state
          /*
          // tester
          this.getImgUrlFromApi(number.img)
          .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3000)))
          .then(result1 => {
            console.log('1 in 1', result1);
            this.getImgUrlFromApi(hand.img).then(result2 => {
              console.log('1 in 2', result1);
              console.log('2', result2);
            })
          })
          */

          this.setLoading(true)
          this.setLoadingMessage('0%')
          this.getImgUrlFromApi(number.img)
          .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3000)))
          .then( numberResponse => {
            if (numberResponse.status === 'success') {
              this.setLoadingMessage('33%')
              this.getImgUrlFromApi(hand.img).then( handResponse => {
                if (handResponse.status === 'success') {
                  this.setLoadingMessage('66%')
                  // if all image url succesfully retrieved
                  console.log('numberResponse url is', numberResponse.url)
                  console.log('handResponse url is', handResponse.url)
                  let drawingRef = db.database().ref('/RewriteCDT/' + this.state.uniqueId)
                  drawingRef.set({
                    drawing_info: {
                      number: {
                        height: number.canvas_height,
                        width: number.canvas_width,
                        url: numberResponse.url,
                        time_start_drawing: number.time_start_drawing,
                        time_end_drawing: number.time_end_drawing,
                        strokes: number.strokes,
                      },
                      hand: {
                        height: hand.canvas_height,
                        width: hand.canvas_width,
                        url: handResponse.url,
                        time_start_drawing: hand.time_start_drawing,
                        time_end_drawing: hand.time_end_drawing,
                        strokes: hand.strokes,
                      },
                    },
                    personal_info: this.props.route.params,
                    label_info:{
                      person: 0
                    }
                  }).then( () => {
                    this.setLoadingMessage('100%')
                    console.log('Database updated');
                    // set loading screen off
                    this.setLoading(false)
                    this.navigateTo('CLKResult')
                  }).catch(error => {
                    console.log('error', error);
                    this.setLoading(false)
                    this.showError(`การเชื่อมต่อกับฐานข้อมูลขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Firebase: ${error.message})`, drawingData)
                  });
                } else {
                  this.setLoading(false)
                  this.showError('การเชื่อมต่อกับฐานข้อมูลรูปภาพขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Axios #2)', drawingData)
                }
              })
            } else {
              this.setLoading(false)
              this.showError('การเชื่อมต่อกับฐานข้อมูลรูปภาพขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Axios #1)', drawingData)
            }
          })
        })

      }
    })

  }

  /*
  <CLKDrawingPad
    next={this._handleDrawFinish}
    key={this.state.drawing_key}
    img={this.state.backgroundImage}
  />
  */

  render() {
    if (this.state.drawing != 'null') {
      return (
        <React.Fragment>
          <Spinner
            visible={this.state.loading}
            textContent={`กำลังบันทึกข้อมูล... (${this.state.loadingMsg})`}
            textStyle={{color: "#FFF"}}
          />
          <CLKDrawingPad
            next={this._handleDrawFinish}
          />
        </React.Fragment>
      );
    }
    return <></>;
  }
}
