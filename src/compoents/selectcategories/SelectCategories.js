import React from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import RadioForm from 'react-native-simple-radio-button'

import * as colors from '../../styles/colors'


export const radio_props = [

	{label: 'Engineer', value: 0 },
	{label: 'Hipster', value: 1 },
	{label: 'Rock and roll', value: 2 },
	{label: 'Hobo', value: 3 },
	{label: '20s', value: 4 },
	{label: 'Nerd', value: 5 },
	{label: 'Business', value: 6 },
	{label: 'Porno', value: 7 },
	{label: 'Celebrity', value: 8 },
	{label: 'Grandma', value: 9 },
	{label: '20 years old', value: 10 },
	// {label: '12', value: 12 },
	// {label: '13', value: 13 },
	// {label: '14', value: 14 },
	// {label: '15', value: 15 },
	// {label: '16', value: 16 },
	// {label: '17', value: 17 },
	// {label: '18', value: 18 },
	// {label: '19', value: 19 },
	// {label: '20', value: 20 },
	// {label: '21', value: 21 },
	// {label: '22', value: 22 },
	// {label: '23', value: 23 },
	// {label: '24', value: 24 },
	// {label: '25', value: 25 },
	// {label: '26', value: 26 },
	// {label: '27', value: 27 },
	// {label: '28', value: 28 },
	// {label: '29', value: 29 },
	// {label: '30', value: 30 },


];



export class SelectCategories extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<ScrollView>
				<RadioForm style={styles.item}
					radio_props={radio_props}
					initial={this.props.categoryID}
					onPress={(value) => { this.props.onCategorySelected(value) }}
					buttonColor={colors.radioButtonsColor}
					labelColor={colors.categorySelectRadioText}
				/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create ({
	item: {
	   flexDirection: 'column',
	   justifyContent: 'space-between',
	   alignItems: 'flex-start',
	   padding: 30,
	   margin: 2,
	   width:300,
	   borderColor: '#2a4944',
	   borderWidth: 1,
	   backgroundColor: colors.lightBrown
	}
 })