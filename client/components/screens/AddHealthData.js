import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { db } from "../../../config.js";
import { TextField, Button, SegmentedControl } from "react-native-ios-kit";
import { Picker } from "@react-native-picker/picker";

function AddHealthData(props) {
  // const pickerArray = Array.from(Array(101).keys());
  // console.log(pickerArray)
  const [BG, setBG] = useState("");
  const [units, setUnits] = useState("");
  const [mealType, setMealType] = useState("");
  const [selectedIndex, setIndex] = useState("");

  const mealsRef = db.collection("meals");

  const { userId, mealId } = props.route.params;
  console.log(BG, units, mealType);
  async function handlePress() {
    await mealsRef.doc(mealId).update({
      preBG: BG,
      insulinDose: units,
      mealType: mealType,
      open: false
    });
    props.navigation.navigate('Home')
  }
  return (
    <View>
      <Text>Hello</Text>
      <TextField
        // style={{height: 40}}
        placeholder="Before Meal Blood Glucose"
        onValueChange={(BG) => setBG(BG)}
        value={BG}
        type="number"
      />

      <SegmentedControl
        values={["Breakfast", "Lunch", "Dinner"]}
        selectedIndex={selectedIndex}
        onValueChange={(value, index) => {
          setIndex(index);
          setMealType(value);
        }}
        style={{ width: 222, alignSelf: "center" }}
      />
      <View>
        <Picker
          style={styles.picker}
          selectedValue={units}
          onValueChange={(units) => {
            setUnits(units);
          }}
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
      </View>
      <Button centered rounded onPress={handlePress}>
        Enter Meal
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 110,
    width: 100,
  },
});

export default AddHealthData;
