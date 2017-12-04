import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {radio_props} from "../../compoents/selectcategories/SelectCategories";
import SwipeCards from "react-native-swipe-cards";
import Spinner from "react-native-loading-spinner-overlay";
import * as colors from "../../styles/colors";
import {getPhotoObjectsByCategoryId} from "../../firebase/firebaseImgService";

class Card extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		let categoryName = '';
		for (const x in radio_props) {
			if (x === this.props.categoryId)
				categoryName = radio_props[x].label

		}
		return (
			<View style={styles.card}>
				<Text>{categoryName}</Text>
				<Image
					style={styles.thumbnail}
					source={{ uri: `data:image/gif;base64,${this.props.base64}` }}
				/>
			</View>
		)
	}
}

class NoMoreCards extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.noMoreCards}>
				
					<Image style={{ heigh: 260, width: 230, alignSelf: 'stretch', resizeMode: 'contain' }}
						source={require('../../../icons/finish_judge.png')}
					/>
				
			</View>
		)
	}
}


export default class SwipeImages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
			outOfCards: false,
			loading: false
		}
		this.handleYup = this.handleYup.bind(this);
		this.handleNope = this.handleNope.bind(this);
		this.handleMaybe = this.handleMaybe.bind(this);
	}

	componentDidMount() {
		this.setState({ loading: true })
		getPhotoObjectsByCategoryId(this.props.categoryId, this.props.userId).then(data => this.setState({ cards: data })).then(() => this.setState({ loading: false }))

	}

	handleYup(card) {
		this.props.onPositiveSelected(card.id);
	}

	handleNope(card) {
		this.props.onNegativeSelected(card.id);
	}

	handleMaybe(card) {
		this.props.onMaybeSelected(card.id);
	}

	cardRemoved(index) {
		console.log(`The index is ${index}`);

		let CARD_REFRESH_LIMIT = 3

		// if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
		// 	console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

		// 	if (!this.state.outOfCards) {
		// 		console.log(`Adding ${cards2.length} more cards`)

		// 		this.setState({
		// 			cards: this.state.cards.concat(cards2),
		// 			outOfCards: true
		// 		})
		// 	}

		// }

	}



	render() {
		return (
			this.state.loading ? <Spinner visible={true} overlayColor={colors.orange}><View style={{
				flex: 1, flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}><Image source={require('../../../icons/logo1.png')} style={{ width: 300, resizeMode: 'contain' }} /><Text style={{ color: 'white' }}>Loading images...</Text></View></Spinner> : <SwipeCards
					cards={this.state.cards}
					loop={false}
					renderCard={(cardData) => <Card {...cardData} />}
					showYup={true}
					showNope={true}
					showMaybe={true}
					hasMaybeAction={true}
					smoothTransition={true}
					handleYup={this.handleYup}
					handleNope={this.handleNope}
					handleMaybe={this.handleMaybe}
					cardRemoved={this.cardRemoved.bind(this)}
					yupStyle={swipeCardsStyleSheet.yupStyle}
					nopeStyle={swipeCardsStyleSheet.nopeStyle}
					maybeStyle={swipeCardsStyleSheet.maybeStyle}
					renderNoMoreCards={() => <NoMoreCards />}
				/>
		)
	}
}
const swipeCardsStyleSheet = StyleSheet.create({
	yupStyle: {
		borderColor: 'green',
		borderWidth: 2,
		position: 'absolute',
		top: 100,
		borderRadius: 5,
		right: 0,
	},
	maybeStyle: {
		borderColor: 'blue',
		borderWidth: 2,
		position: 'absolute',
		padding: 20,
		top: 100,
		borderRadius: 5,
		right: 20,
	},
	nopeStyle: {
		borderColor: 'red',
		borderWidth: 2,
		position: 'absolute',
		top: 100,
		padding: 20,
		borderRadius: 5,
		left: 0,
	},
})


const styles = StyleSheet.create({
	card: {
		alignItems: 'center',
		borderRadius: 5,
		overflow: 'hidden',
		borderColor: 'grey',
		backgroundColor: 'white',
		borderWidth: 1,
		elevation: 1,
	},
	thumbnail: {
		width: 300,
		height: 300,
	},
	text: {
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10
	},
	noMoreCards: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})


