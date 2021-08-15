import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { fetchItems } from "../../store/items";
import { db } from "../../../config.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, SearchBar } from "react-native-ios-kit";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      user: {},
      items: [],
      item: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
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
    // console.log(this.props)
    const usersRef = db.collection("users");
    const { user } = this.props;
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

  async searchHandler() {
    await this.props.fetchItems(this.state.text);
    let items = await this.props.items;
    items = items.common.slice(0, 10);
    this.setState({
      items: items,
    });
  }

  async pressHandler(item) {
    const carbs = await item.full_nutrients.find((item) => {
      return item.attr_id === 205;
    });
    const sugar = await item.full_nutrients.find((item) => {
      return item.attr_id === 269;
    });
    const protein = await item.full_nutrients.find((item) => {
      return item.attr_id === 203;
    });
    const fat = await item.full_nutrients.find((item) => {
      return item.attr_id === 204;
    });
    const fiber = await item.full_nutrients.find((item) => {
      return item.attr_id === 291;
    });
    let parsedItem = {
      name: item.food_name,
      servingSize: item.serving_qty,
      imageUrl: item.photo.thumb,
      servingWeight: item.serving_weight_grams,
      carbs: carbs.value.toFixed(1),
      sugar: sugar.value.toFixed(1),
      fiber: fiber.value.toFixed(1),
      protein: protein.value.toFixed(1),
      fat: fat.value.toFixed(1),
    };

    this.setState({
      ...this.state,
      item: parsedItem,
    });
    this.props.navigation.navigate("FoodItem", {
      item: this.state.item,
      user: this.state.user,
    });
  }

  handleChange(textValue) {
    this.setState({
      text: textValue,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          value={this.state.text}
          onValueChange={this.handleChange}
          withCancel
          animated
          placeholder="Search For Food..."
        />

        {/* <TextInput
          name="text"
          value={this.state.text}
          style={{ fontSize: 42, color: "steelblue" }}
          placeholder="Enter A Food"
          onChangeText={this.handleChange}
        /> */}

        <Button inline rounded onPress={this.searchHandler}>
          Find Food
        </Button>
        <ScrollView>
          {this.state.items &&
            this.state.items.map((item, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.pressHandler(item)}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: item.photo.thumb }}
                    />
                    <Text>{item.food_name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
  },
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
    items: state.items,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchItems: (food) => dispatch(fetchItems(food)),
  };
};

export default connect(mapState, mapDispatch)(Home);
