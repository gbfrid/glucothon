import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { fetchItem } from "../store/item";

class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      text: '',
      carbs: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.pressHandler = this.pressHandler.bind(this);
  }
  // const [text, setText] = useState('')

  async pressHandler() {
    await this.props.fetchItem(this.state.text)
    const item = this.props.item
    const nutrientsList = item.foods[0].foodNutrients
    console.log(item)
    nutrientsList.forEach(nutrient => {
      if (nutrient.nutrientName === "Carbohydrate, by difference") {
        this.setState({
          carbs: nutrient.value
        })
      }
    })
  }

  handleChange(textValue) {
    this.setState({
      text: textValue,
    });
  }

  render() {
    return (
      <View>
        <TextInput
          name='text'
          value={this.state.text}
          style={{ fontSize: 42, color: 'steelblue' }}
          placeholder="Enter A Food"
          onChangeText={this.handleChange}
        />

        <Button
          title={"Find Food"}
          onPress={this.pressHandler}
        />
        <Text style={styles.text}>{`${this.state.carbs} Carbs`}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  text: {
    color: 'rgb(59,108,212)',
    fontSize: 42,
    fontWeight: '100',
    textAlign: 'center',
  },
})

const mapState = (state) => {
  return {
    item: state.item
  }
}


const mapDispatch = (dispatch) => {
  return {
    fetchItem: (item) => dispatch(fetchItem(item))
  };
};

export default connect(mapState, mapDispatch)(Home);
