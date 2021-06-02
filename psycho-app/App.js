import React from 'react'
import * as Font from 'expo-font'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

// components
import { Navigation } from './components/Navigation'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    this.loadFont().then(() => {
      this.setLandscape().then(() => {
        this.setState({loading: false})
      })
    })
  }

  setLandscape = () => {
    return ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  loadFont = () => {
    return Font.loadAsync({
      'Prompt-Light': require('./assets/fonts/Prompt-Light.ttf'),
      'Arial Round MT Bold': require('./assets/fonts/Arial-Rounded-MT-Bold_4291.ttf'),
      'Pridi': require('./assets/fonts/Pridi-Regular.ttf'),
      'Mitr-Light': require('./assets/fonts/Mitr-Light.ttf'),
      'FC-Iconic-Bold': require('./assets/fonts/FC-Iconic-Bold.ttf'),
      'FC-Iconic-Regular': require('./assets/fonts/FC-Iconic-Regular.ttf'),
      'FC-Iconic-Italic': require('./assets/fonts/FC-Iconic-Italic.ttf'),
      'FC-Iconic-Bold-Italic': require('./assets/fonts/FC-Iconic-Bold-Italic.ttf')
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <></>
      )
    }
    return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Navigation />
    </ApplicationProvider>
    )
  }
}
