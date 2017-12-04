import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import LogoutBtn from "./LogoutBtn";

import PropTypes from "prop-types";

export default class UserProf extends React.Component {
  render() {
    const {name, photoUrl, logout} = this.props;

	return (
			<View style={styles.profContainer}>
			  <Image
					  style={styles.profImg}
					  source={{uri: photoUrl}}
			  />
			  <Text style={styles.profText}>{name}</Text>
			  <LogoutBtn logout={logout}/>
			</View>
	)
  }
}

UserProf.propTypes = {
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  profContainer: {
    flex: 2,
	flexDirection: 'row',
	justifyContent: 'space-around',
	alignItems: 'center'
  },
  profImg: {
    justifyContent: 'center',
	width: 75,
	height: 75,
	borderRadius: 50
  },
  profText: {
	justifyContent: 'center',
	fontSize: 30
  }
});
