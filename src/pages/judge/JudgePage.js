import React from "react";
import {StyleSheet} from "react-native";

import PropTypes from "prop-types";

import SwipeImages from "../../compoents/swipeimages/SwipeImages";
import judgeEnum from "./judgeEnum";
import {judgePhoto} from "../../firebase/firebaseImgService";

export default class JudgePage extends React.Component {
	constructor(props) {
		super(props);

		this._onPositiveSelected = this._onPositiveSelected.bind(this);
		this._onNegativeSelected = this._onNegativeSelected.bind(this);
		this._onMaybeSelected = this._onMaybeSelected.bind(this);
	}

	_onPositiveSelected(imageId) {
		console.log('UserID[' + this.props.userId + '] '
			+ 'CategoryId[' + this.props.categoryId + '] '
			+ 'Action[' + judgeEnum.yes.name + '] '
			+ 'imageId[' + imageId + '] ');
		this.props.incrementLife();
		judgePhoto(imageId, judgeEnum.yes);
	}

	_onNegativeSelected(imageId) {
		console.log('UserID[' + this.props.userId + '] '
			+ 'CategoryId[' + this.props.categoryId + '] '
			+ 'Action[' + judgeEnum.no.name + '] '
			+ 'imageId[' + imageId + '] ');
		this.props.incrementLife();
		judgePhoto(imageId, judgeEnum.no);
	}

	_onMaybeSelected(imageId) {
		console.log('UserID[' + this.props.userId + '] '
			+ 'CategoryId[' + this.props.categoryId + '] '
			+ 'Action[' + judgeEnum.maybe.name + '] '
			+ 'imageId[' + imageId + '] ');
		this.props.incrementLife();
		judgePhoto(imageId, judgeEnum.yes);
	}

	render() {
		const { userId } = this.props;
		console.log('userId : ', this.props.userId);
		return (
			<SwipeImages
				userId = {this.props.userId}
				categoryId={this.props.categoryId}
				onPositiveSelected={this._onPositiveSelected}
				onNegativeSelected={this._onNegativeSelected}
				onMaybeSelected={this._onMaybeSelected} />
		)
	}
}

JudgePage.propTypes = {
	incrementLife: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	size: {
		flex: 1
	},
});



