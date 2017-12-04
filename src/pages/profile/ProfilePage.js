import React from "react";
import {StyleSheet, View} from "react-native";

import UserProf from "./UserProf";
import Results from "./Results";

import PropTypes from "prop-types";

import {find} from "../../firebase/firebaseUserService";

import {getImagesByUserId, getPhotoObjectByUserId} from "../../firebase/firebaseImgService";
import AdDisplay from "../../compoents/ads/AdDisplay";

export default class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: {
				name: '',
				photoUrl: '',
			},
			data: [],
			loading: false,
		}
	}

	componentDidMount() {
		console.log('Profile Page');
		this.setState({loading:true});
		getPhotoObjectByUserId(this.props.userId).then(data => this.setState({ data: data })).then(() => this.setState({loading:false}));

		const { userId } = this.props;
		find(userId).then(userInfo => {
			this.setState({ userInfo: userInfo })
		})

	}

	render() {
		
		const { name, photoUrl } = this.state.userInfo;
		const { logout } = this.props;
		const data = this.state.data;
		console.log("LOADING::" + this.state.loading);
		return <View style={styles.container}>
			{this.state.loading ? <UserProf name={"Loading..."} photoUrl={photoUrl} logout={logout} /> : <UserProf name={name} photoUrl={photoUrl} logout={logout} />}
			<Results data={data} />
			<AdDisplay data={data} />

		</View>
	}



}

ProfilePage.propTypes = {
	userId: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
};


const styles = StyleSheet.create({
	container: {
		flex: 1
	}


});

// const data = [
// 	{
// 		categoryId: 'category',
// 		photoUrl: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif',
// 		positiveLabel: 10,
// 		negativeLabel: 20
// 	}, {
// 		categoryId: 'category',
// 		photoUrl: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif',
// 		positiveLabel: 5,
// 		negativeLabel: 30
// 	}, {
// 		categoryId: 'test',
// 		photoUrl: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif',
// 		positiveLabel: 0,
// 		negativeLabel: 2
// 	}];

