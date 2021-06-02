import React, { Component } from 'react';
import TESTDrawingPad from '../components/TESTDrawingPad'

class TESTDrawScreen extends Component {

  back = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <TESTDrawingPad back={this.back}/>
    );
  }

}

export default TESTDrawScreen;
