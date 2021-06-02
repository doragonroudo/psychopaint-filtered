import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

import html from './web_components/clk/canvas.js'

class CLKDrawingPad extends Component {

  constructor(props) {
    super(props)
    this.webview = null
    this.state = {
      strokes: [],
      canvas_width: null,
      canvas_height: null,
      time_start_drawing: null,
      time_end_drawing: null,
      isSavable: false,
    }
  }
/*
  componentWillReceiveProps(nextProps) {
    console.log('Recieved new props', nextProps.img);
    this.setState({
      strokes: [],
      canvas_width: null,
      canvas_height: null,
      time_start_drawing: null,
      time_end_drawing: null,
      backgroundImage: null
    })
  }
*/
  returnDrawingDataToParent = (base64img) => {
    this.props.next({
      strokes: this.state.strokes,
      canvas_width: this.state.canvas_width,
      canvas_height: this.state.canvas_height,
      time_start_drawing: this.state.time_start_drawing,
      time_end_drawing: this.state.time_end_drawing,
      img: base64img
    })
    // clear state
    this.setState({
      strokes: [],
      canvas_width: null,
      canvas_height: null,
      time_start_drawing: null,
      time_end_drawing: null,
      backgroundImage: null
    })
  }
/*
  checkForBackground() {
    console.log('checkForBackground');
    if(this.state.backgroundImage !== null) {
      console.log('im sending image');
      this.webview.postMessage('sendBackgroundImage|' + this.state.backgroundImage)
    }
  }
*/
  onMessage = (e) => {
    const message = e.nativeEvent.data
    const msgArray = message.split("|")
    console.log('Recieved >', message)

    if (msgArray[0] === '_saveCanvas' && this.state.isSavable) { // _saveCanvas|base64img
      this.setState({ isSavable: false }, () => {
        this.returnDrawingDataToParent(msgArray[1])
      })
    } else if (msgArray[0] === '_clearCanvas') { // _clearCanvas
      this.resetAllStates()
    } else if (msgArray[0] === '_canvasSize') { // _canvasSize|123,456
      // save canvas size
      this.setState({
        canvas_width: msgArray[1].split(",")[0],
        canvas_height: msgArray[1].split(",")[1]
      }, () => console.log('canvas size saved'))

    } else if (msgArray[0] === '_strokeBegin') { // _strokeBegin|pen|12:34:56:789

      this.setState(prevState => ({
        ...prevState,
        strokes: [...prevState.strokes, {
          points: [],
          type: msgArray[1],
          time_start: msgArray[2],
          time_end: null
        }],
        isSavable: true
      }), () => {
        // check if is first stroke to add time start drawing
        let strokes = [...this.state.strokes]
        let strokeIndex = strokes.length - 1
        if (strokeIndex === 0) {
          this.setState({
            time_start_drawing: msgArray[2]
          })
        }
      })

    } else if (msgArray[0] === '_strokeUpdate') { // _strokeUpdate|459,473

      // create new 'strokes' -> add 'point'
      let strokes = [...this.state.strokes]
      let strokeIndex = strokes.length - 1
      strokes[strokeIndex] = {
        ...strokes[strokeIndex],
        points: [
          ...strokes[strokeIndex].points,
          {
            x: msgArray[1].split(",")[0],
            y: msgArray[1].split(",")[1]
          }
        ]
      }

      // add strokes to state
      this.setState({
        strokes: strokes
      })
    } else if (msgArray[0] === '_strokeEnd') { // _strokeEnd|14:18:10:449

      let strokes = [...this.state.strokes]
      let strokeIndex = strokes.length - 1
      strokes[strokeIndex] = {
        ...strokes[strokeIndex],
        time_end: msgArray[1]
      }

      // add strokes to state
      this.setState({
        strokes: strokes,
        time_end_drawing: msgArray[1]
      })
    }
  }

  render() {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        source={{ html: html }}
        javaScriptEnabled={true}
        onLoad={() => {/*this.checkForBackground()*/}}
        onMessage={this.onMessage}
        scrollEnabled={false}
      />
    );
  }

}

export default CLKDrawingPad;
