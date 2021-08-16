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
  FlatList,
  LogBox
} from "react-native";
import { connect } from "react-redux";
import { fetchItems } from "../../store/items";
import { db } from "../../../config.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  SearchBar } from "react-native-ios-kit";
import { Box, Center, NativeBaseProvider, Button } from "native-base";

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

  capitalize(word) {
    let capArr = []
    let wordArr = word.split(' ');
    wordArr.forEach(part => {
      let capitalized = part[0].toUpperCase() + part.slice(1)
      capArr.push(capitalized)
    })
    return capArr.join(' ')
  }


  async componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
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
    items = items.common.slice(0, 27);
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
      name: this.capitalize(item.food_name),
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
        <Button
        width='50%'
        onPress={this.searchHandler}>
          Find Food
        </Button>


        <View style={styles.cols}>
          {this.state.items &&
            this.state.items.map((item, i) => {
              return (
                <View key={i}>
                  <Text>{this.capitalize(item.food_name)}</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.pressHandler(item)}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: item.photo.thumb }}
                    />

                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
  },
  cols: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    maxHeight: 500,
    width: '100%'

  },
  text: {
    color: "rgb(59,108,212)",
    fontSize: 20,
    fontWeight: "100",
    textAlign: "center",
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
