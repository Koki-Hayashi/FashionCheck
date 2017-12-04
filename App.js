import React from "react";
import TabNavigator from "./src/navigator/TabNavigator";
import LifeBar from "./src/compoents/lifebar/LifeBar";
import {AuthSession} from "expo";
import {Alert, AppState, StyleSheet, View} from "react-native";
import pageEnum from "./src/pages/pageEnum";
import * as pages from "./src/pages";
import * as colors from "./src/styles/colors";
import {update} from "./src/firebase/firebaseUserService";

console.disableYellowBox = true; // shut up warnings at the screen bottom

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			login: false,
			currentPageEnum: pageEnum.login,
			userId: '',
			categoryId: '',
			life: 10
		};
		this.setCategoryId = this.setCategoryId.bind(this);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.saveLifeIfInactive.bind(this))
	};

	componentDidMount() {
		console.log('HelloWorldApp');
		AppState.addEventListener('change', this.saveLifeIfInactive.bind(this));
	}

	saveLifeIfInactive(nextState) {
		const { login, userId, life } = this.state;

		if (nextState === 'active' || !login) {
			return;
		}

		console.log('saving to firebase...');
		update(userId, { life: life })
	}

	setCategoryId(Id) {
		console.log('Categroy ID updated [' + Id + ']');
		this.setState({ categoryId: Id });
	}

	changePage(pageEnum) {
		console.log('changePage to ' + pageEnum.id);
		this.setState({ currentPageEnum: pageEnum });
	}

	incrementLife() {
		const { life } = this.state;
		if (life > 10) return;

		this.setState({
			life: life + 0.1
		});
	}

	decrementLife() {
		const { life } = this.state;
		if (life < 0) return;

		this.setState({
			life: life - 1
		});
	}

	init(user) {
		this.setState({ login: true, userId: user.id, life: user.life })
	}

	logout() {
		const { login, userId, life } = this.state;
		update(userId, { life: life })
		AuthSession.dismiss();
		this.setState({ login: false, userId: '' });
		this.changePage(pageEnum.login)
	}

	selectPageObj(currentPageEnum) {

		const { userId } = this.state;

		let selected;

		switch (currentPageEnum.id) {
			case pageEnum.home.id:
				selected = <pages.HomePage
					changePage={this.changePage.bind(this)}
					key={currentPageEnum.id}
				/>;
				break;

			case pageEnum.judge.id:
				selected = <pages.JudgePage key={currentPageEnum.id} categoryId={this.state.categoryId} userId={this.state.userId} incrementLife={this.incrementLife.bind(this)} />;
				break;

			case pageEnum.feedback.id:
				if (this.state.life <= 0) {
					Alert.alert('You need more life! You can get it by judging photos.');
					selected = <pages.HomePage
						changePage={this.changePage.bind(this)}
						key={currentPageEnum.id}
					/>;
				} else {
					selected = <pages.FeedbackPage key={currentPageEnum.id} decrementLife={this.decrementLife.bind(this)} changePage={this.changePage.bind(this)} userId={userId} />;
				}
				break;

			case pageEnum.profile.id:
				selected = <pages.ProfilePage key={currentPageEnum.id} userId={userId} logout={this.logout.bind(this)} />;
				break;

			case pageEnum.category.id:
				selected = <pages.CategoryPage
					changePage={this.changePage.bind(this)}
					setCategoryId={this.setCategoryId}
					key={currentPageEnum.id}
				/>;
				break;

			default:
				selected = <pages.LoginPage key={currentPageEnum.id} changePage={this.changePage.bind(this)} init={this.init.bind(this)} />; // as default
		}

		return selected;
	}

	render() {
		const { currentPageEnum, life } = this.state;

		return <View style={styles.main}>
			<View style={styles.main}>
				{this.selectPageObj(currentPageEnum)}
			</View>
			{(currentPageEnum.id !== pageEnum.login.id) &&
				<View style={styles.rest}>
					<View style={styles.lifeBar}>
						<LifeBar life={life} key="lifeBar" />
					</View>
					<View style={styles.nav}>
						<TabNavigator key="tabNavigator" onTabClick={this.changePage.bind(this)} />
					</View>
				</View>
			}
		</View>
	}
}

const styles = StyleSheet.create({
	app: {
		flex: 1
	},
	main: {
		flex: 10,
		backgroundColor: colors.orange
	},
	rest: {
		flex: 1
	},
	lifeBar: {
		flex: 1
	},
	nav: {
		flex: 10
	}
});
