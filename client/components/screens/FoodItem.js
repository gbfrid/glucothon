import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";

class FoodItem extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
      selectedNumber: '1',
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.route.params.item,
    });
  }

  updateServingSize(value) {
    const updated = value * parseInt(this.state.selectedNumber, 10);
    return updated.toFixed(1)
  }
  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text>{this.state.item.name}</Text>

        <View style={styles.info}>
        <Image
          style={styles.image}
          source={{ uri: this.state.item.imageUrl }}
        />
        <Text>Carbs: {this.updateServingSize(this.state.item.carbs)}</Text>
        <Text>Fat: {this.updateServingSize(this.state.item.fat)}</Text>
        <Text>Protein: {this.updateServingSize(this.state.item.protein)}</Text>
        <Text>Sugar: {this.updateServingSize(this.state.item.sugar)}</Text>
        <Text>Fiber: {this.updateServingSize(this.state.item.fiber)}</Text>
        </View>

        <View style={styles.serving}>
          <Text>
            Serving Size:{" "}
            {
              <Picker
                style={styles.picker}
                selectedValue={this.state.selectedNumber}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    ...this.state,
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
            ({this.state.item.servingWeight * parseInt(this.state.selectedNumber, 10)}g)
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // serving: {
  //   justifyContent: "center",
  // },
  // info: {
    // flex: 1,
    // justifyContent: "center",

    // justifyContent: "flex-start"
  // },
  picker: {
    height: 110,
    width: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
  container: {
    flex:1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FoodItem;
