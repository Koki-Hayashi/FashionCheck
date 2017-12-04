import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {AuthSession} from "expo";
import googleApi from "../../google-services.json";
import * as colors from "../styles/colors";
import {fb_dark_blue, google_red} from "../styles/colors";
import pageEnum from "./pageEnum";
import {find, persist} from "../firebase/firebaseUserService";
import Spinner from "react-native-loading-spinner-overlay";

const FB_APP_ID = 'your facebooke app id'; // TODO
const GOOGLE_APP_ID = googleApi.client[0].oauth_client[0].client_id;

export default class LoginPage extends React.Component {

  constructor(props) {
	super(props);

	this.state = {
	  userInfo: null,
	  isLoading: false
	}
  }

  render() {
	const {isLoading} = this.state;

	const content = isLoading ?
			  <Spinner visible={true} overlayColor={colors.orange}><View style={{
				flex: 1, flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}><Image source={require('../../icons/logo3.png')} style={{ width: 250, resizeMode: 'contain' }} /><Text style={{color:'white'}}>Loading...</Text></View></Spinner>
			:
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
			  <Image source={require('../../icons/loading_page.png')} style={{width: 350, height: 600, bottom: 0}}/>
			  <View style={{position: 'absolute', bottom: 100}}>
				<TouchableOpacity activeOpacity={0.9} onPress={this._handlePressFacebook} style={[styles.inline, styles.facebookFrame, styles.fullWidthButton, styles.facebookButton]}>
				  <Icon name="facebook" size={30} color='white' style={styles.facebookButton}/>
				  <Text style={[styles.textFormat, styles.buttonBigText]}> Connect </Text>
				  <Text style={styles.facebookButton}> with Facebook </Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.9} onPress={this._handlePressGoogle} style={[styles.inline, styles.googleFrame, styles.fullWidthButton, styles.googleButton]}>
				  <Icon name="google" size={30} color="white" style={[styles.googleButton]}/>
				  <Text style={[styles.textFormat, styles.buttonBigText]}> Connect </Text>
				  <Text style={styles.googleButton}> with Google </Text>
				</TouchableOpacity>
			  </View>
			</View>;

	return (
			<View style={{flex: 1}}>
			  {content}
			</View>
	);
  }

  _handlePressGoogle = async () => {
	console.log("_handlePressGoogle");
	await this.setState({isLoading: true});

	const result = await Expo.Google.logInAsync({
	  androidClientId: GOOGLE_APP_ID,
	  iosClientId: '385661531510-o4vb7pb1k9epivkm77l3me8vbtuok5fa.apps.googleusercontent.com',
	  scopes: ['profile', 'email'],
	});

	if (result.type !== 'success') {
	  alert('Uh oh, something went wrong');
	  return;
	}

	const accessToken = result.accessToken;
	const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
	  headers: {Authorization: `Bearer ${accessToken}`},
	});
	const userInfo = await userInfoResponse.json();

	let user = await find(userInfo.id);
	if (!user.id) { // if not registered on firebase yet
	  user = this.persistUser(userInfo.id, userInfo.picture, userInfo.email, userInfo.given_name);
	}

	this.postLogin(user);
	await this.setState({isloading: false})
  };

  _handlePressFacebook = async () => {
	this.setState({isloading: true});
	let redirectUrl = AuthSession.getRedirectUrl();

	// You need to add this url to your authorized redirect urls on your Facebook app
	console.log({redirectUrl});

	// NOTICE: Please do not actually request the token on the client (see:
	// response_type=token in the authUrl), it is not secure. Request a code
	// instead, and use this flow:
	// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
	// The code here is simplified for the sake of demonstration. If you are
	// just prototyping then you don't need to concern yourself with this and
	// can copy this example, but be aware that this is not safe in production.

	const result = await AuthSession.startAsync({
	  authUrl: `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
	  `&client_id=${FB_APP_ID}` +
	  `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
	});

	if (result.type !== 'success') {
	  alert('Uh oh, something went wrong');
	  return;
	}

	const accessToken = result.params.access_token;
	const userInfoResponse = await fetch(
			`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
	);
	const userInfo = await userInfoResponse.json();

	let user = await find(userInfo.id);
	if (!user.id) { // if not registered on firebase yet
	  user = this.persistUser(userInfo.id, userInfo.picture.data.url, '', userInfo.name);
	}

	this.postLogin(user);
	this.setState({isloading: false})
  };

  persistUser(id, photoUrl, email, name) {
	console.log("persistUser");
	const userInfo = {
	  photoUrl: photoUrl,
	  email: email,
	  name: name,
	  id: id,
	  life: 10,
	};
	persist(id, userInfo);
	return userInfo;
  }

  postLogin(user) {
	console.log('post login');

	const {init, changePage} = this.props;

	init(user);
	changePage(pageEnum.home);
  }

}

const styles = StyleSheet.create({
  titleText: {
	fontSize: 50,
	position: 'absolute',
	textAlign: 'center',
	top: 100,
	color: '#FFDF00',
	fontWeight: '800',
  },
  fullWidthButton: {
	marginTop: 20,
	padding: 15,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center'
  },
  googleFrame: {
	marginTop: 30,
	borderColor: google_red,
	borderWidth: 2
  },
  googleButton: {
	marginRight: 10,
	backgroundColor: google_red,
	color: 'white'
  },
  facebookFrame: {
	marginTop: 30,
	borderColor: fb_dark_blue,
	borderWidth: 2
  },
  facebookButton: {
	marginRight: 10,
	backgroundColor: fb_dark_blue,
	color: 'white'
  },
  textFormat: {
	fontSize: 20,
	color: 'white'
  },
  buttonBigText: {
	fontWeight: 'bold'
  },
  inline: {
	flexDirection: 'row'
  },
  backgroundImage: {
	position: 'absolute',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	resizeMode: 'stretch',
	width: null,
	height: null,
  }
});