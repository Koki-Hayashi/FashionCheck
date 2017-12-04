import React from "react";
import PropTypes from "prop-types";

import {StyleSheet, Text, View} from "react-native";
import AnimatedBar from "react-native-animated-bar";

import * as colors from '../../styles/colors'

export default class LifeBar extends React.Component {

  render() {
		const {life} = this.props;
		const life_floor = Math.floor(life);
	return <View style={styles.container}>
	  <Text >{life_floor}</Text>
	  <AnimatedBar
			  progress={life_floor * 0.1}
			  duration={500}
			  height={20}
			  barColor={colors.green}
	  />
	</View>
  }
}

LifeBar.propTypes = {
  life: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    width: 350,
	justifyContent: 'center',
	bottom: 50,
	padding: 10
  }
});