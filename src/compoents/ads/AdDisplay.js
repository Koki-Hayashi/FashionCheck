import React, { Component } from 'react';
import { ScrollView, Image, Text, TouchableOpacity, View, Linking } from 'react-native';
import Modal from 'react-native-modal';

import styles from './app.style';

import adData from './ads.json';

import { radio_props } from '../../compoents/selectcategories/SelectCategories'

const redirectSite = 'https://www.ladenzeile.de/redirect';

export default class AdDisplay extends Component {
  constructor() {
    super();
    this.state = {
      visibleModal: false,
      rendered: false,
      data: [],
      categoryForAds: [],
    };
  }

  _handleOnPressed() {
    console.log('pressed');
    this.setState({ visibleModal: false, rendered: true }, () => console.log(this.state))

  }

  _redirectToWebPage(itemId) {
    console.log("Redirecting...");
    Linking.openURL(redirectSite + "/" + itemId);
  }

  _redirectToVMPage() {
    Linking.openURL('https://www.ladenzeile.de');
  }

  _renderModalContent = () => {

    let categoryNames = [];


    for (let i = 0; i < this.state.categoryForAds.length; i++) {

      let categoryName = '';
      for (const x in radio_props) {
        if (x === this.state.categoryForAds[i]) {
          categoryName = radio_props[x].label;
          categoryNames.push(categoryName)
        }
      }
    }

    let adsToDisplay = [];

    for (let i = 0; i < categoryNames.length; i++) {

      let categoryData = adData[categoryNames[i]];
      adsToDisplay = adsToDisplay.concat(categoryData)
    }

    return (
      <View style={styles.modalContent}>

        <View style = {{flexDirection: 'column'}}>
          <TouchableOpacity onPress={this._handleOnPressed.bind(this)}>
            {/* <View style={styles.button}>
            <Text>{'x'}</Text>
          </View> */}
            <Image style={{ width: 20, height: 20 }}
              source={require('../../../icons/close_button.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._redirectToVMPage.bind(this)}>
          <Image style={{ width: 300, height: 70 }}
            source={require('../../../icons/ladenzeile.png')}
          />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          {adsToDisplay.map((item, i) =>
            <View key={i}>
              <TouchableOpacity key={i} onPress={this._redirectToWebPage.bind(this, item.itemId)}>
                <Image style={{ width: 80, height: 80 }} source={{ uri: item.imageURL }} key={i} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <Text> You need these!</Text>
      </View>
    )
  };


  render() {

    const { data } = this.props;
    if (this.state.rendered) {

    } else {
      data.forEach(element => {
        if (element.negativeLabel > element.positiveLabel) {
          this.state.visibleModal = true;
          const categoryId = element.categoryId;
          if (this.state.categoryForAds.indexOf(categoryId) === -1) {
            const updatedCategoryForAds = this.state.categoryForAds;
            updatedCategoryForAds.push(categoryId);
            this.setState({ categoryForAds: updatedCategoryForAds })
          }
        }
      });
    }
    console.log(this.state.categoryForAds);
    return (

      <View>
        <Modal isVisible={this.state.visibleModal} style={styles.bottomModal} >
          {this._renderModalContent()}
        </Modal>
      </View>
    )
  }


}