import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { fetchItem } from "../../store/item";
import { db } from "../../../config.js";

class Home extends React.Component {
  constructor({ route, navigation }) {
    super();
    this.state = {
      text: "",
      user: "",
      nutrients: {
        carbs: 0,
        fiber: 0,
        sugars: 0,
        protein: 0,
        fat: 0,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.pressHandler = this.pressHandler.bind(this);
  }

  addToFirebase(usersRef, user) {
    usersRef.doc(user.id).set({
      name: user.name,
      firstName: user.givenName,
      email: user.email,
      photoUrl: user.photoUrl,
    });
  }

  async componentDidMount() {
    const usersRef = db.collection("users");
    const { user } = this.props.route.params;
    this.setState({
      ...this.state,
      user: user,
    });
    try {
      const fireBaseUser = (await usersRef.doc(user.id).get()).data();
      if (!fireBaseUser) {
        this.addToFirebase(usersRef, user);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // setNutrients(nutrientsList) {
  //   nutrientsList.forEach((nutrient) => {
  //     switch (nutrient.nutrientId) {
  //       case 1005:
  //         return this.setState({
  //           ...this.state,
  //           nutrients: {
  //             ...this.state.nutrients,
  //             carbs: nutrient.value,
  //           },
  //         });
  //       case 2000:
  //         return this.setState({
  //           ...this.state,
  //           nutrients: {
  //             ...this.state.nutrients,
  //             sugars: nutrient.value,
  //           },
  //         });
  //       case 1079:
  //         return this.setState({
  //           ...this.state,
  //           nutrients: {
  //             ...this.state.nutrients,
  //             fiber: nutrient.value,
  //           },
  //         });
  //       case 1003:
  //         return this.setState({
  //           ...this.state,
  //           nutrients: {
  //             ...this.state.nutrients,
  //             protein: nutrient.value,
  //           },
  //         });
  //       case 1004:
  //         return this.setState({
  //           ...this.state,
  //           nutrients: {
  //             ...this.state.nutrients,
  //             fat: nutrient.value,
  //           },
  //         });
  //       default:
  //         return 0;
  //     }
  //   });
  // }

  async pressHandler() {
    await this.props.fetchItem();
    const item = this.props.item;
    // const nutrientsList = item.foods[0].foodNutrients;
    console.log(item);
    // this.setNutrients(nutrientsList);
  }

  handleChange(textValue) {
    this.setState({
      text: textValue,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          name="text"
          value={this.state.text}
          style={{ fontSize: 42, color: "steelblue" }}
          placeholder="Enter A Food"
          onChangeText={this.handleChange}
        />

        <Button title={"Find Food"} onPress={this.pressHandler} />
        {/* <View>
          <Text>{`${this.state.nutrients.carbs}g Carb`}</Text>
          <Text>{`${this.state.nutrients.sugars}g Sugar`}</Text>
          <Text>{`${this.state.nutrients.fiber}g Fiber`}</Text>
          <Text>{`${this.state.nutrients.fat}g Fat`}</Text>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "rgb(59,108,212)",
    fontSize: 20,
    fontWeight: "100",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const mapState = (state) => {
  return {
    item: state.item,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchItem: (item) => dispatch(fetchItem(item)),
  };
};

export default connect(mapState, mapDispatch)(Home);
