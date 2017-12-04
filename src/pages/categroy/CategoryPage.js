import React from "react";
import {Button, StyleSheet, View} from "react-native";
import {SelectCategories} from "../../compoents/selectcategories/SelectCategories";

import pageEnum from "../../pages/pageEnum";
import {black} from "../../styles/colors";

export default class CategoryPage extends React.Component {

	constructor() {
		super();
		this.state = {
			categoryID : 0,
			buttonJudgeDisabled : false,
		};
		this._onCategorySelected = this._onCategorySelected.bind(this);
		this._onJudgeSelected = this._onJudgeSelected.bind(this);
	}

	componentDidMount() {
		console.log('Category Page');
	}


	_onCategorySelected(updatedCategoryID) {
		console.log("Category selected " + updatedCategoryID);
		console.log("Setting buttonJudgeDisabled to  " + false);
		this.setState({categoryID : updatedCategoryID, buttonJudgeDisabled: false});
	}

	_onJudgeSelected() {
		console.log("Start selected");
		this.props.setCategoryId(this.state.categoryID);
		this.props.changePage(pageEnum.judge)
	}

	render() {
		return (
			<View style={styles.rectangleContainer}>
				<SelectCategories
						categoryID={this.state.categoryID}
						onCategorySelected={this._onCategorySelected}/>
				<Button style={styles.judgeButton}
						onPress={this._onJudgeSelected}
						title="Judge!"
						color='black'
						disabled={this.state.buttonJudgeDisabled}
				/>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	rectangleContainer: {
		paddingTop: 30,
		paddingBottom: 10,
		flex: 0.8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
    },
	judgeButton: {
		marginTop: 100,
		backgroundColor: black,
	},
})