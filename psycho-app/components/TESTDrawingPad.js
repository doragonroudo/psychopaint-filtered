import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

import html from './web_components/test/canvas.js'

class TESTDrawingPad extends Component {

  constructor(props) {
    super(props)
    this.webview = null
  }

  onMessage = (e) => {
    const message = e.nativeEvent.data
    const msgArray = message.split("|")
    console.log('Recieved >', message)

    if (msgArray[0] === '_saveCanvas') {
      this.props.back()
    }
  }

  render() {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        source={{ html: html }}
        javaScriptEnabled={true}
        onLoad={() => {/* do something */}}
        onMessage={this.onMessage}
        scrollEnabled={false}
      />
    );
  }

}

export default TESTDrawingPad;
