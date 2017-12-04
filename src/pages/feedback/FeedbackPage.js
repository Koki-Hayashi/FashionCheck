import React from "react";
import {Alert, Button, Image, StyleSheet, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {ImagePicker} from "expo";
import {SelectCategories} from "../../compoents/selectcategories/SelectCategories";
import {saveImage} from "../../firebase/firebaseImgService";
import pageEnum from "../pageEnum";

export default class FeedbackPage extends React.Component {


  componentDidMount() {
    console.log('Feedback Page');
  }

  constructor(props) {
    super(props);
    //console.disableYellowBox = true;
    this.state = {
      categoryID: 0,
      avatarSource: '',
      imageResult: {}
    };
    this._onCategorySelected = this._onCategorySelected.bind(this); //Binding to `this`
  }

  render() {
    return (

      <View style={styles.rectangleContainer}>

        <SelectCategories categoryID={this.state.categoryID} onCategorySelected={this._onCategorySelected} />


        <View style={styles.button}>
          <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: this.state.avatarSource }}
          />
          <TouchableOpacity onPress={this._pickImage}>
            <Image style={styles.image}
              source={require('../../../icons/album.png')}
              alignItems='flex-end'

            />

          </TouchableOpacity>


          <TouchableHighlight onPress={this._takePhoto}>
            <Image style={styles.image}
              source={require('../../../icons/camera.png')}
              alignItems='flex-end'

            />
          </TouchableHighlight>


        </View>

        <Button
          onPress={this._onDoneButton.bind(this)}
          title="Done"
          color="#000000"
        />
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ avatarSource: result.uri, imageResult: result });

    }
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
      this.setState({ avatarSource: pickerResult.uri, imageResult: pickerResult });
    }
  };

  _onDoneButton() {
    if (Object.keys(this.state.imageResult).length !== 0) {
      saveImage(this.state.imageResult, this.state.categoryID, this.props.userId)
      this.props.decrementLife();
      this.props.changePage(pageEnum.home)
    }
    else {
      Alert.alert('Please select/take image.')
    }
  }

  _onCategorySelected(updatedCategoryID) {
    console.log("Category selected " + updatedCategoryID);
    this.setState({ categoryID: updatedCategoryID });
  }

}

const styles = StyleSheet.create({

  // container: {
  //   paddingTop: 120,
  //   alignItems: 'flex-start',
  //   height: 200,
  //   width: 200,
  //   flexDirection: 'column'
  // },
  image: {
    // flex: 1,
    backgroundColor: 'transparent',
    height: 40,
    width: 40,
    margin: 0
  },

  button: {
    flexDirection: 'row'
  },

  rectangleContainer: {
    paddingTop: 80,
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    alignItems: 'flex-start',
    height: 200,
    width: 300,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

