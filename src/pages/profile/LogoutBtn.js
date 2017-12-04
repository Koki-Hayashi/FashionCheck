import React from 'react'
import { View, Button, StyleSheet } from 'react-native'

import PropTypes from "prop-types";

export default class LogoutBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: {}
		}
	}

	render() {
		const { logout } = this.props;
		return <View style={styles.logoutContainer}>
			<Button title="Log out" onPress={logout} />
		</View>
	}
}

LogoutBtn.propTypes = {
	logout: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	logoutContainer: {

	}
});