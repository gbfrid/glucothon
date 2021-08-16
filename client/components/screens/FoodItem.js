import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../../config.js";
import {
  Center,
  FormControl,
  Input,
  Stack,
  Slider,
  Box,
  Select,
  VStack,
  CheckIcon,
  Button,
  HStack,
  useToast,
  Image,
  Text,
  Popover
} from "native-base";

class FoodItem extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
      selectedNumber: "1",
    };
    this.updateServingSize = this.updateServingSize.bind(this);
    this.addToMeal = this.addToMeal.bind(this);
  }

  componentDidMount() {
    this.setState({
      item: this.props.route.params.item,
    });
  }

  updateServingSize(nutrientValue, itemValue) {
    const updated = nutrientValue * parseInt(itemValue, 10);
    return updated;
  }

  addToFirebase(mealsRef, item) {
    mealsRef.doc().set({
      userId: this.props.route.params.user.id,
      items: [item],
      open: true,
    });
  }

  async addToMeal(item) {
    const mealsRef = db.collection("meals");
    const userId = this.props.route.params.user.id.toString();
    try {
      const snapshot = await mealsRef
        .where("userId", "==", userId)
        .where("open", "==", true)
        .get();
      if (snapshot.empty) {
        console.log("making new meal");
        this.addToFirebase(mealsRef, item);
      } else {
        let items = {};
        let id = "";
        snapshot.forEach((doc) => {
          id = doc.id;
          items = doc.data().items;
        });
        items.push(this.state.item);

        await mealsRef.doc(id).update({ items: items });
      }

      this.props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    // console.log(this.props.route.params.user);
    return (
      <View>
        <Center>
          <Button onPress={() => this.addToMeal(this.state.item)}>
            Add To Meal
          </Button>

          <Text fontSize="6xl">{this.state.item.name}</Text>

          <View>
            <Image
              size={"2xl"}
              alt='some food'
              source={{ uri: this.state.item.imageUrl }}
            />
            <Center>
            <Text fontSize="2xl">Carbs: {this.state.item.carbs}</Text>
            <Text fontSize="2xl">Fat: {this.state.item.fat}</Text>
            <Text fontSize="2xl">Protein: {this.state.item.protein}</Text>
            <Text fontSize="2xl">Sugar: {this.state.item.sugar}</Text>
            <Text fontSize="2xl">Fiber: {this.state.item.fiber}</Text>
            <Text fontSize="2xl">
              Net Carbs:{" "}
              {(this.state.item.carbs - this.state.item.fiber).toFixed(1)}
            </Text>
            </Center>
          </View>

          <View>
            <Text>

              <Stack>
              <Center>
                <Text>Serving</Text>
                <Text>Size</Text>
                </Center>
              </Stack>


              {
                <Picker
                style={{
                      height: 120,
                      width: 100,
                    }}
                  selectedValue={this.state.selectedNumber}
                  onValueChange={(itemValue) =>
                    this.setState({
                      item: {
                        ...this.state.item,
                        carbs: this.updateServingSize(
                          this.props.route.params.item.carbs,
                          parseInt(itemValue, 10)
                        ),
                        protein: this.updateServingSize(
                          this.props.route.params.item.protein,
                          parseInt(itemValue, 10)
                        ),
                        fat: this.updateServingSize(
                          this.props.route.params.item.fat,
                          parseInt(itemValue, 10)
                        ),
                        fiber: this.updateServingSize(
                          this.props.route.params.item.fiber,
                          parseInt(itemValue, 10)
                        ),
                        sugar: this.updateServingSize(
                          this.props.route.params.item.sugar,
                          parseInt(itemValue, 10)
                        ),
                        servingWeight: this.updateServingSize(
                          this.props.route.params.item.servingWeight,
                          parseInt(itemValue, 10)
                        ),
                        servingSize: this.updateServingSize(
                          this.props.route.params.item.servingSize,
                          parseInt(itemValue, 10)
                        ),
                      },
                      selectedNumber: itemValue,
                    })
                  }
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="6" value="6" />
                  <Picker.Item label="7" value="7" />
                  <Picker.Item label="8" value="8" />
                  <Picker.Item label="9" value="9" />
                  <Picker.Item label="10" value="10" />
                </Picker>
              }{" "}
              ({parseInt(this.state.item.servingWeight, 10)}g)
            </Text>
          </View>
        </Center>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   // serving: {
//   //   justifyContent: "center",
//   // },
//   // info: {
//   // flex: 1,
//   // justifyContent: "center",

//   // justifyContent: "flex-start"
//   // },
//   picker: {
//     height: 110,
//     width: 100,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default FoodItem;
