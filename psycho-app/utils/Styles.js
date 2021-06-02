import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native"; // for screen width/height
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

var screenWidth = Dimensions.get('window').width; //full width
var screenHeight = Dimensions.get('window').height; //full height


export const Color = {
  DARKER: '#012c37',
  DARK: '#8480F5',
  LIGHT: '#ede7f6',
  YELLOW: '#ffa726',
  GREEN: '#08baba',
  FONT_COLOR: 'white',
  FONT_COLOR_BLUE: '#4747D1',
  FONT_COLOR_GRAY: '#363636',
  FONT_COLOR_PURPLE: '#432C7A',
  FONT_COLOR_GREEN: '#B8D088',
  BLUE: '#007dff',
  WHITE: 'white',
  BLACK: 'black',
  RED: 'red',
  TRANSPARENT: 'rgba(0,0,0,0.0)',
  LIGHT_GRAY: '#c7c3bd',
}

export const Icon = {
  HOME: 'ios-home',
  CLOCK: 'ios-alarm',
  INFO: 'ios-information-circle-outline',
  CLOSE: 'ios-close-circle-outline'
}


export const Styles = StyleSheet.create({
  containerCentered: {
    backgroundColor: Color.WHITE,
    width: screenWidth,
    minHeight: screenHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerCenteredBlueBackground: {
    backgroundColor: Color.FONT_COLOR_BLUE,
    width: screenWidth,
    minHeight: screenHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 10
  },
  containerColumnSpread: {
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    marginVertical: 5,
  },
  scrollViewContainer: {
    backgroundColor: Color.WHITE,
    width: screenWidth,
    minHeight: screenHeight - RFPercentage(10),
    alignItems: 'center',
    borderRadius: 70,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0
  },
  scrollView: {
    // paddingTop: RFPercentage()
    // marginTop: RFPercentage
  },
  text1: {
    fontFamily: 'Prompt-Light'
  },
  text2: {
    fontFamily: 'Arial Round MT Bold'
  },
  text3: {
    fontFamily: 'Pridi'
  },
  text4: {
    fontFamily: 'Mitr-Light'
  },
  header1: {
    color: Color.FONT_COLOR_GRAY,
    fontSize: RFPercentage(3),
    fontFamily: 'Arial Round MT Bold'
  },
  header2: {
    color: '#90ACFF',
    fontSize: RFPercentage(3.6),
    fontFamily: 'FC-Iconic-Bold',
    marginBottom:20
  },
  header3: {
    color: Color.FONT_COLOR_PURPLE,
    fontSize: RFPercentage(3.6),
    fontFamily: 'FC-Iconic-Bold',
    padding: 5,
    margin: 10
  },
  header3_recolor: {
    color: '#90ACFF',
    fontSize: RFPercentage(3.6),
    fontFamily: 'FC-Iconic-Bold',
    padding: 5,
    margin: 10
  },
  header4: {
    color: Color.WHITE,
    fontSize: RFPercentage(4.6),
    fontFamily: 'Pridi',
    paddingVertical: 5,
    paddingHorizontal: RFPercentage(4.6),
  },
  imageTest: {
    height: screenHeight / 3,
    width: screenWidth / 2,
    resizeMode: 'contain'
  },
  imageMode: {
    height: screenHeight / 3.2,
    width: screenWidth / 2,
    resizeMode: 'contain'
  },
  buttonGreen: {
    color: Color.WHITE,
    fontSize: RFPercentage(3),
    fontFamily: "FC-Iconic-Bold",
    width: RFPercentage(17),
    padding:8,
    backgroundColor: Color.FONT_COLOR_GREEN,
    borderRadius: 25,
    textAlign: 'center',
    margin: 20,
    overflow: 'hidden' /* for fixing ios display problem*/
  },
  buttonBlue: {
    color: Color.WHITE,
    fontSize: RFPercentage(3),
    fontFamily: "FC-Iconic-Bold",
    width: RFPercentage(20),
    padding: 5,
    backgroundColor: Color.DARK,
    borderRadius: 22,
    textAlign: 'center',
    margin: 5,
    overflow: 'hidden' /* for fixing ios display problem*/
  },
  buttonGray: {
    color: Color.WHITE,
    fontSize: RFPercentage(2.5),
    fontFamily: "Pridi",
    width: RFPercentage(20),
    backgroundColor: Color.LIGHT_GRAY,
    borderRadius: 20,
    textAlign: 'center',
    margin: 5,
    overflow: 'hidden' /* for fixing ios display problem*/
  },
  buttonTransparent: {
    color: Color.WHITE,
    fontSize: RFPercentage(3),
    fontFamily: "FC-Iconic-Bold",
    width: RFPercentage(17),
    padding:8,
    backgroundColor: Color.WHITE,
    borderRadius: 25,
    textAlign: 'center',
    margin: 20,
    overflow: 'hidden' /* for fixing ios display problem*/
  },
  textInput: {
    backgroundColor: Color.LIGHT,
    borderRadius: 30,
    width: screenWidth / 3,
    height: screenHeight / 15,
    paddingHorizontal: 15,
    color: '#000',
    fontSize: RFPercentage(1.8)
  },
  textInputError: {
    backgroundColor: '#fee2e2',
    borderColor: "#E22E17",
    borderWidth: 1.25,
    borderRadius: 30,
    width: screenWidth / 3,
    height: screenHeight / 15,
    paddingHorizontal: 15,
    color: '#000',
    fontSize: RFPercentage(1.8)
  },
  textForm: {
    color: Color.FONT_COLOR_BLUE,
    fontSize: RFPercentage(2.2),
    width: screenWidth / 3,
    fontFamily: 'Pridi',
    paddingHorizontal: 5
  },
  textError: {
    color: Color.RED,
    fontFamily: "Mitr-Light",
    marginLeft: RFPercentage(1)
  },
  textErrorTransparent: {
    backgroundColor: Color.TRANSPARENT,
    color: Color.TRANSPARENT,
    fontFamily: "Mitr-Light",
    marginLeft: RFPercentage(1)
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: screenWidth / 6,
    height: screenHeight / 15,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: "Pridi",
    fontSize: RFPercentage(2)
  },
  iconContainer: {
    position: 'absolute',
    top: RFPercentage(10),
    right: RFPercentage(10),
  },

})

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#F8FAFF',
    borderColor: '#2A367A',
    borderRadius: 30,
    width: screenWidth / 3,
    height: screenHeight / 15,
    paddingHorizontal: 15,
    color: '#000',
    fontSize: RFPercentage(1.8)
  },
  inputAndroid: {
    backgroundColor: '#F8FAFF',
    borderRadius: 30,
    borderColor: '#2D70FF',
    width: screenWidth / 3,
    height: screenHeight / 15,
    paddingHorizontal: 15,
    color: '#000',
    fontSize: RFPercentage(1.8)
  },
  iconContainer: {
    top: RFPercentage(1.5),
    marginRight: 15
  },
});

export const pickerSelectStylesError = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fee2e2',
    borderColor: "#E22E17",
    borderWidth: 1.25,
    borderRadius: 30,
    width: screenWidth / 3,
    height: screenHeight / 15,
    paddingHorizontal: 15,
    color: '#000',
    fontSize: RFPercentage(1.8)
  },
  inputAndroid: {
    backgroundColor: '#fee2e2',
    borderColor: "#E22E17",
    borderWidth: 1.25,
    borderRadius: 30,
    width: screenWidth / 3,
    height: screenHeight / 15,
    paddingHorizontal: 15,
    color: '#000',
    fontSize: RFPercentage(1.8)
  },
  iconContainer: {
    top: RFPercentage(1.5),
    marginRight: 15
  },
});

export const stylesModeScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // padding: 20,
    width: screenWidth,
    height: screenHeight
  },
  headContainer:{
    flexDirection: 'row',
    width: RFPercentage(100),
    minHeight: screenHeight - RFPercentage(55),
    alignItems: 'flex-end',
    justifyContent:'center',
    // backgroundColor: '#111',
    // padding: 10
  },
  rowInfoContainer: {
    flexDirection: 'row',
    width: RFPercentage(100),
    height: RFPercentage(30),
    alignItems: 'center',
    justifyContent:'center',
    // backgroundColor: 'blue',
    padding: 10,
    paddingHorizontal:30,
    // shadowColor: '#c2cffc',
    shadowColor: "#5770fd",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 10,
    elevation: 7,
  },
  rowButtonContainer: {
    flexDirection: 'row',
    width: RFPercentage(100),
    height: RFPercentage(22),
    alignItems: 'center',
    padding: 30,
    alignItems: 'flex-end',
    // backgroundColor: 'teal'
  },
  card: {
    width:200,
    height:250,
    alignItems: 'center',
    justifyContent:'center',
    margin: 20,
    // backgroundColor: '#F2ECFE',
    borderRadius: 30
  },
  fontInfo:{
    // fontFamily: 'FC-Iconic-Bold',
    // fontSize: 49,
    fontFamily: 'Arial Round MT Bold',
    fontSize: 39,
    color: '#254EDB'
  },
  fontHeader:{
    fontFamily: 'FC-Iconic-Bold',
    fontSize: 25,
    color: '#3366FF',
    textAlign: 'center'
  },
  buttonBack:{
    borderRadius: 30,
    width: RFPercentage(15)
  },
})
