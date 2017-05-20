/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from "react-native"

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AddFeeling extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="plus" size={25} color={tintColor} />
    }
  };
  
  sentimentButtonPressed(newSection) {
    this.props.changeFeelingSection(newSection)
  }

  feelingButtonPressed(feelingName, sentiment) {
    this.props.wordSelected(feelingName, sentiment)
    this.props.navigation.navigate('DescribeFeeling')
  }

  maxWidthOfButton(minWidth) {
    const { width } = Dimensions.get('window')    
    const threeColumnWidth = (width / 3) - 20

    if(threeColumnWidth < minWidth) {
      return (width / 2) - 20
    } else {
      return threeColumnWidth
    }
  }

  getButtonStyle() {

    const minWidth = 110

    const baseStyle = { 
        padding: 10,
        height: 45, 
        overflow: 'hidden', 
        backgroundColor: 'white',
        margin: 4,
        elevation: 2,
        minWidth: minWidth
      }

    console.log(this.maxWidthOfButton())

    return { ...baseStyle, width: this.maxWidthOfButton(minWidth) }
  }
  
  render() {

    const wordsToDisplay = this.props["feelingWords" + this.props.showingSection]

    return (
      <View style={styles.container}>
      <Text style={styles.title}>
      How Do You Feel?
      </Text>
      <View style={styles.sentimentButtonContainer}>
      
      <Button
        containerStyle={styles.positiveButtonContainerStyle}
        style={styles.sentimentButtonTextStyle}
        onPress={this.sentimentButtonPressed.bind(this, 'Positive')}>
        Positive
      </Button>
      <Button
        containerStyle={styles.negativeButtonContainerStyle}
        style={styles.sentimentButtonTextStyle}
        onPress={this.sentimentButtonPressed.bind(this, 'Negative')}>
        Negative
      </Button>
      </View>

      <ScrollView style={styles.feelingButtonsScrollView}>
        <View style={styles.feelingButtonsContainer}>
        { wordsToDisplay ? 
          wordsToDisplay.map((word, index) => 
            <Button key={`feeling-button-${index}`} containerStyle={this.getButtonStyle.bind(this)()}
                    style={styles.feelingButtonTextStyle}
                    onPress={this.feelingButtonPressed.bind(this, word, this.props.showingSection)}>{word}</Button>
          )
          : null
        }
      </View>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 0.2
  },
  positiveButtonContainerStyle: {
    padding:10,
    height:45, 
    overflow:'hidden', 
    borderRadius:30, 
    backgroundColor: '#8dc73f',
    flex: 0.5,
    margin: 10
  },
  negativeButtonContainerStyle: {
    padding:10,
    height:45, 
    overflow:'hidden', 
    borderRadius:30, 
    backgroundColor: '#c74c3f',
    flex: 0.5,
    margin: 10
  },
  feelingButtonTextStyle: {
    fontSize: 16 , 
    fontWeight: 'normal',
    color: '#5f5963'
  },
  sentimentButtonTextStyle: {
    fontSize: 20, 
    fontWeight: 'normal',
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "stretch"
  },
  sentimentButtonContainer: {
    flexDirection: 'row',
    flex: 0.2
  },
  feelingButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    flex: 0.1
  },
  feelingButtonsScrollView: {
    flex: 0.7
  }
})
