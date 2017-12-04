import React from 'react'

import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import PropTypes from "prop-types";

import * as colors from '../styles/colors'

import pageEnum from '../pages/pageEnum'

export default class TabNavigator extends React.Component {
  onPressButton(pageEnum) {
	this.props.onTabClick(pageEnum);
  }

  render() {
	return <View style={styles.container}>
	  <View style={styles.btnContainer}>
		<TouchableOpacity style={styles.button} onPress={this.onPressButton.bind(this, pageEnum.home)}>
		  <Text>Home</Text>
		</TouchableOpacity>
	  </View>
	  <View style={styles.btnContainer}>
		<TouchableOpacity style={styles.button} onPress={this.onPressButton.bind(this, pageEnum.profile)}>
		  <Text>Profile</Text>
		</TouchableOpacity>
	  </View>
	</View>
  }
}

TabNavigator.propTypes = {
  onTabClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: colors.orange
  },
  btnContainer: {
	flex: 1
  },
  button: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
    backgroundColor: colors.lightBrown
  }
});


