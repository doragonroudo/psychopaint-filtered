// Library
import React from 'react';
import { Alert } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment'
import axios from 'axios'

import HTPDrawingPad from '../../components/HTPDrawingPad';
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
      loadingMsg: '0/0'
    };
  }

  setLoading = (loading) => {
    console.log('loading set to:', loading)
    this.setState({loading: loading})
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
        this.showHouseInstruction();
      }
    );
  }

  componentWillUnmount() {
    this.changeScreenOrientation('landscape');
  }

  navigateTo = (screen, result) => {
    this.props.navigation.navigate(screen, {
      result: result
    })
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

  showHouseInstruction = () => {
    // set timeout to avoid loading spinner issue
    setTimeout(() => {
      Alert.alert('จงวาดบ้าน', '', [
        {
          text: 'ตกลง',
          onPress: () => {
            this.setState({ drawing: 'house' });
          },
        },
      ]);
    }, 100)
  };

  showTreeInstruction = () => {
    // set timeout to avoid loading spinner issue
    setTimeout(() => {
      Alert.alert('จงวาดต้นไม้', '', [
        {
          text: 'ตกลง',
          onPress: () => {
            this.setState({ drawing: 'tree', redraw: false });
            this.changeScreenOrientation('portrait');
          },
        },
      ]);
    }, 100)
  };

  showPersonInstruction = () => {
    // set timeout to avoid loading spinner issue
    setTimeout(() => {
      Alert.alert('จงวาดคน', '', [
        {
          text: 'ตกลง',
          onPress: () => {
            this.setState({ drawing: 'person', redraw: false });
            this.changeScreenOrientation('portrait');
          },
        },
      ]);
    }, 100)
  };

  showOppositeSexInstruction = () => {
    // set timeout to avoid loading spinner issue
    setTimeout(() => {
      Alert.alert('จงวาดคนเพศตรงข้ามกับรูปที่แล้ว', '', [
        {
          text: 'ตกลง',
          onPress: () => {
            this.setState({ drawing: 'oppositesex', redraw: false });
            this.changeScreenOrientation('portrait');
          },
        },
      ]);
    }, 100)
  };

  showNextInstruction = () => {
    return new Promise((resolve, reject) => {

      // set timeout to avoid loading spinner issue
      setTimeout(() => {
        Alert.alert('สำหรับนักจิตวิทยา', '', [
          { text: 'วาดใหม่', style: 'cancel', onPress: () => {
            this.setState({ redraw: true })
            resolve(false)
          } },
          {
            text: 'บันทึก',
            onPress: () => {
              if (this.state.drawing == 'house') {
                this.showTreeInstruction();
                resolve(false)
              } else if (this.state.drawing == 'tree') {
                this.showPersonInstruction();
                resolve(false)
              } else if (this.state.drawing == 'person') {
                this.showOppositeSexInstruction();
                resolve(false)
              } else {
                resolve(true)
              }
            },
          },
        ],
        { cancelable: false });
      }, 100)

    })
  };

  showError = (message, drawingData) => {
    // set timeout to avoid loading spinner issue
    setTimeout(() => {
      Alert.alert('เกิดข้อผิดพลาด', message, [
        {
          text: 'ลองอีกครั้ง',
          onPress: () => this._handleRetry(drawingData)
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
          console.log(res);
          return {
            status: 'success',
            url: res.data.url
          }
      })
      .catch(err => {
          //handle error
          console.log(err);
          return {
            status: 'fail'
          }
      });
  }

  getPredictionFromApi = (data) => {
    return axios({
      method: 'post',
      url: '__FILTERED__',
      data: data,
      headers: {'Content-Type': 'application/json' }
      })
      .then((res) => {
          //handle success
          console.log(res);
          return {
            status: 'success',
            result: res.result
          }
      })
      .catch(err => {
          //handle error
          console.log(err);
          return {
            status: 'fail',
            error: err
          }
      });
  }

  _handleRetry = (drawingData) => {
    // set loading screen on
    this.setLoading(true)
    this.setLoadingMessage('0%')
    this.getImgUrlFromApi(this.state.house.img)
    .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3000)))
    .then( house => {
      if (house.status === 'success') {
        this.setLoadingMessage('20%')
        this.getImgUrlFromApi(this.state.tree.img)
        .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3000)))
        .then( tree => {
          if (tree.status === 'success') {
            this.setLoadingMessage('40%')
            this.getImgUrlFromApi(this.state.person.img)
            .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3000)))
            .then( person => {
              if (person.status === 'success') {
                this.setLoadingMessage('60%')
                this.getImgUrlFromApi(this.state.oppositesex.img).then( oppositesex => {
                  if (oppositesex.status === 'success') {
                    this.setLoadingMessage('80%')
                    // if all image url succesfully retrieved

                    this.getPredictionFromApi({
                      drawing_info: {
                        house: {
                          height: this.state.house.canvas_height,
                          width: this.state.house.canvas_width,
                          url: house.url,
                          time_start_drawing: this.state.house.time_start_drawing,
                          time_end_drawing: this.state.house.time_end_drawing,
                          strokes: this.state.house.strokes,
                        },
                        tree: {
                          height: this.state.tree.canvas_height,
                          width: this.state.tree.canvas_width,
                          url: tree.url,
                          time_start_drawing: this.state.tree.time_start_drawing,
                          time_end_drawing: this.state.tree.time_end_drawing,
                          strokes: this.state.tree.strokes,
                        },
                        person: {
                          height: this.state.person.canvas_height,
                          width: this.state.person.canvas_width,
                          url: person.url,
                          time_start_drawing: this.state.person.time_start_drawing,
                          time_end_drawing: this.state.person.time_end_drawing,
                          strokes: this.state.person.strokes,
                        },
                        oppositesex: {
                          height: this.state.oppositesex.canvas_height,
                          width: this.state.oppositesex.canvas_width,
                          url: oppositesex.url,
                          time_start_drawing: this.state.oppositesex.time_start_drawing,
                          time_end_drawing: this.state.oppositesex.time_end_drawing,
                          strokes: this.state.oppositesex.strokes,
                        },
                      },
                      personal_info: this.props.route.params
                    }).then( prediction => {
                      if ( prediction.status == 'success') {
                        this.setLoadingMessage('100%')
                        console.log('got result');
                        // set loading screen off
                        this.setLoading(false)
                        this.navigateTo('HTPResult', prediction.result)
                      } else {
                        this.setLoading(false)
                        this.showError(`การเชื่อมต่อกับฐานข้อมูลขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Model: ${prediction.error})`, drawingData)
                      }
                    })

                  } else {
                    this.setLoading(false)
                    this.showError('การเชื่อมต่อกับฐานข้อมูลรูปภาพขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Axios #4)', drawingData)
                  }
                })
              } else {
                this.setLoading(false)
                this.showError('การเชื่อมต่อกับฐานข้อมูลรูปภาพขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Axios #3)', drawingData)
              }
            })
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
  }

  _handleDrawFinish = (drawingData) => {
    this.showNextInstruction().then(isFinised => {
      if (!isFinised) {
        this.setState({
          [this.state.drawing]: drawingData,
          drawing_key: Math.random().toString(36).substr(2, 9)
        })
      } else {
        this.setState({
          [this.state.drawing]: drawingData,
          drawing: 'finished'
        }, () => {
            // set loading screen on
            this.setLoading(true)
            this.setLoadingMessage('0%')
            // this is for fake sending data
            /*
            setTimeout(() => {
              this.setLoadingMessage('100%')
              // set loading screen off
              this.setLoading(false)
              this.navigateTo('HTPResult', 'bipolar')
            }, 2500)
            */

          this.getImgUrlFromApi(this.state.house.img)
          .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3000)))
          .then( house => {
            if (house.status === 'success') {
              this.setLoadingMessage('20%')
              this.getImgUrlFromApi(this.state.tree.img)
              .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3000)))
              .then( tree => {
                if (tree.status === 'success') {
                  this.setLoadingMessage('40%')
                  this.getImgUrlFromApi(this.state.person.img)
                  .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3000)))
                  .then( person => {
                    if (person.status === 'success') {
                      this.setLoadingMessage('60%')
                      this.getImgUrlFromApi(this.state.oppositesex.img).then( oppositesex => {
                        if (oppositesex.status === 'success') {
                          this.setLoadingMessage('80%')
                          // if all image url succesfully retrieved
                          this.getPredictionFromApi({
                            drawing_info: {
                              house: {
                                height: this.state.house.canvas_height,
                                width: this.state.house.canvas_width,
                                url: house.url,
                                time_start_drawing: this.state.house.time_start_drawing,
                                time_end_drawing: this.state.house.time_end_drawing,
                                strokes: this.state.house.strokes,
                              },
                              tree: {
                                height: this.state.tree.canvas_height,
                                width: this.state.tree.canvas_width,
                                url: tree.url,
                                time_start_drawing: this.state.tree.time_start_drawing,
                                time_end_drawing: this.state.tree.time_end_drawing,
                                strokes: this.state.tree.strokes,
                              },
                              person: {
                                height: this.state.person.canvas_height,
                                width: this.state.person.canvas_width,
                                url: person.url,
                                time_start_drawing: this.state.person.time_start_drawing,
                                time_end_drawing: this.state.person.time_end_drawing,
                                strokes: this.state.person.strokes,
                              },
                              oppositesex: {
                                height: this.state.oppositesex.canvas_height,
                                width: this.state.oppositesex.canvas_width,
                                url: oppositesex.url,
                                time_start_drawing: this.state.oppositesex.time_start_drawing,
                                time_end_drawing: this.state.oppositesex.time_end_drawing,
                                strokes: this.state.oppositesex.strokes,
                              },
                            },
                            personal_info: this.props.route.params
                          }).then( prediction => {
                            if ( prediction.status == 'success') {
                              this.setLoadingMessage('100%')
                              console.log('got result');
                              // set loading screen off
                              this.setLoading(false)
                              this.navigateTo('HTPResult', prediction.result)
                            } else {
                              this.setLoading(false)
                              this.showError(`การเชื่อมต่อกับฐานข้อมูลขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Model: ${prediction.error})`, drawingData)
                            }
                          })

                        } else {
                          this.setLoading(false)
                          this.showError('การเชื่อมต่อกับฐานข้อมูลรูปภาพขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Axios #4)', drawingData)
                        }
                      })
                    } else {
                      this.setLoading(false)
                      this.showError('การเชื่อมต่อกับฐานข้อมูลรูปภาพขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Axios #3)', drawingData)
                    }
                  })
                } else {
                  this.setLoading(false)
                  this.showError('การเชื่อมต่อกับฐานข้อมูลรูปภาพขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Axios #2)', drawingData)
                }
              })
            } else {
              this.setLoading(false)
              this.showError('การเชื่อมต่อกับฐานข้อมูลรูปภาพขัดข้อง กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต (Axios #1)', drawingData)
            }
          }) // */
        })


      }
    })
  }

  render() {
    if (this.state.drawing != 'null') {
      return (
        <React.Fragment>
          <Spinner
            visible={this.state.loading}
            textContent={`กำลังบันทึกข้อมูล... (${this.state.loadingMsg})`}
            textStyle={{color: "#FFF"}}
          />
          <HTPDrawingPad
            next={this._handleDrawFinish}
            key={this.state.drawing_key}
          />
        </React.Fragment>
      );
    }
    return <></>;
  }
}
