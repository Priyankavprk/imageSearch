/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Dimensions, FlatList, Image, Platform, StyleSheet, ScrollView, Text, TextInput, View} from 'react-native';
const {height, width} = Dimensions.get('window');
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state ={
       searchText: null,
    }
  }

  encodeAuthorization() {
    var clientId = '53081-1a518-cca29-a5d0a-4fbb4-90906';
    var clientSecret = '18439-9c151-c78fe-b9a68-d0435-148e0';

    if (!clientId || !clientSecret) {
        $('#collapseAuthentication').collapse('show');
        alert('Client id and/or client secret are missing in the API key section, with out these you wont be able to contact the API.');
        return;
    }
    return 'Basic ' + window.btoa(clientId + ':' + clientSecret);
}

  searchImage (searchText) {
    let authorization = this.encodeAuthorization();
    return fetch(`https://api.shutterstock.com/v2/images/search?query=${searchText}`, {
      headers: {
        Authorization: authorization,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        })
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  showImage () {
    let images = [];
    this.state.dataSource.forEach((data, i) => {
        images.push(
          <Image
           style={{width: 250, height: 250, marginBottom: 10 }}
           source={{uri: data.assets.large_thumb.url}}
           key={`${i}`}
         />
        )
    })
    return images;
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{flexDirection: 'row', marginTop: 20}}>
      <TextInput
        style={{height: 40, width: width * 0.8, borderColor: 'gray', borderWidth: 1, marginRight: 20}}
        onChangeText={(text) => this.setState({searchText: text})}
        value={this.state.searchText ? this.state.searchText : ''}
      />
      <Button
        onPress={() => this.searchImage(this.state.searchText)}
        title="Search"
        color="#841584"
       />
       </View>
       <View style={{marginTop: 20}}>
       <ScrollView>
       {
         this.state.dataSource &&
          this.showImage()
       }
       </ScrollView>
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
