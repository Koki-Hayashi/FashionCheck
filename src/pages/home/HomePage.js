import React from 'react'
import { Text } from 'react-native'
import PropTypes from "prop-types";

import { Button, StyleSheet, View, Image } from 'react-native';

import pageEnum from '../../pages/pageEnum'

import * as colors from '../../styles/colors'

export default class HomePage extends React.Component {
  componentDidMount() {
	console.log('HomePage');
  }

  _onPressButton(pageEnum) {
	this.props.changePage(pageEnum)
  }

  render() {
	return (
			<View style={styles.container}>

			  <View style={styles.Text}>
				<Text style={{ textAlign: 'left' }}>I want to...</Text>
			  </View>

			  <View style={styles.button}>
				<Button
						onPress={this._onPressButton.bind(this, pageEnum.feedback)}
						title="Get Feedback"
						color='black'
				/>
				<Image style={styles.image}
					   source={require('../../../icons/mirror_icon.png')}
						//style={styles.ImageIconStyle}
				/>
			  </View>
			  <View style={styles.button}>
				<Image style={styles.image}
					   source={require('../../../icons/judge-law-icon.png')}
						//style={styles.ImageIconStyle}
				/>
				<Button
						onPress={this._onPressButton.bind(this, pageEnum.category)}
						title="Judge!"
						color='black'
				/>

			  </View>
			</View>
	);
  }
}

HomePage.propTypes = {
  changePage: PropTypes.func.isRequired
};

const styles = StyleSheet.create({

  container: {
	paddingTop: 120,
	alignItems: 'center',
	backgroundColor:colors.orange
  },
  button: {
	margin: 20,
	paddingTop: 40,
	marginBottom: 10,
	width: 230,
	height: 120,
	flexDirection: 'row',
	alignItems: 'flex-start',
	backgroundColor: colors.lightBrown
	// innerHeight:260
  },
  buttonText: {
	padding: 1,
	color: 'white'
  },
  image: {
	// flex: 1,
	backgroundColor: 'transparent',
	height: 50,
	width: 50,
	margin: 0
  }
});
