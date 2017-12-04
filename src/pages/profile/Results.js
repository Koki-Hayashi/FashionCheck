import React from "react";

import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import * as colors from "../../styles/colors";
import {radio_props} from "../../compoents/selectcategories/SelectCategories";

export default class Results extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		}
	}


	renderItem = ({ item }) => {
		const sum = item.positiveLabel + item.negativeLabel;
		let categoryName = '';
		for (const x in radio_props) {
			if (x === item.categoryId) {
				categoryName = radio_props[x].label;
				break;
			}
		}
		return (
			<View style={styles.itemContainer}>
				<Image
					style={styles.image}
					source={{ uri: `data:image/gif;base64,${item.base64}` }}
				/>
				<View style={styles.resultContainer}>
					<Text style={styles.category}>{categoryName}</Text>
					<View style={styles.detailContainer}>
						<Image
							style={styles.icon}
							source={require('../../../icons/Security_Approved.png')}
						/>
						<Text style={styles.ratio}>{isNaN(Math.round(item.positiveLabel / sum * 100)) ? 0 : Math.round(item.positiveLabel / sum * 100)} %</Text>
					</View>
					<View style={styles.detailContainer}>
						<Image
							style={styles.icon}
							source={require('../../../icons/deniedIcon.png')}
						/>
						<Text style={styles.ratio}>{isNaN(Math.round(item.negativeLabel / sum * 100)) ? 0 : Math.round(item.negativeLabel / sum * 100)} %</Text>
					</View>

				</View>

			</View>
		)
	};

	render() {
		const { data } = this.props;

		return (<View style={styles.listContainer}>
			<FlatList
				data={data}
				renderItem={this.renderItem
				}
			/>
		</View>
		)
	}
}

const styles = StyleSheet.create({
	listContainer: {
		flex: 5,
		borderWidth: 0.5,
		borderColor: colors.black,
		marginHorizontal: 10,
		marginBottom: 70
	},
	itemContainer: {
		flexDirection: 'row',
		borderWidth: 0.5,
		borderColor: colors.mid_gray,
		paddingHorizontal: 10
	},
	image: {
		flex: 0.9,
	},
	resultContainer: {
		flex: 1,
		justifyContent: 'space-around'
	},
	category: {
		alignSelf: 'center',
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10
	},
	detailContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	icon: {
		height: 50,
		width: 50
	},
	ratio: {
		fontSize: 20
	}
});