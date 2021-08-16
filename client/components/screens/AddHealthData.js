import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { db } from "../../../config.js";
// import { TextField, Button, SegmentedControl } from "react-native-ios-kit";
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
  useToast
} from "native-base";

function AddHealthData(props) {
  const toast = useToast()
  const [BG, setBG] = useState(100);
  const [units, setUnits] = useState(0);

  const [mealType, setMealType] = useState("");

  const mealsRef = db.collection("meals");

  const { userId, mealId } = props.route.params;
  async function handlePress() {
    await mealsRef.doc(mealId).update({
      preBG: BG,
      insulinDose: units,
      mealType: mealType,
      open: false,
    });
    toast.show({
      title: "Meal Logged!",
      status: 'success',
      height: 70,
      width: 250
    })
    props.navigation.navigate("Home");
  }

  return (
    <View>
      <Center>
        <Stack mx={5} space={4} alignItems="center" w="100%">
          <HStack>
            <Text>Bloog Sugar</Text>
            <Box mx={5} w="200">
              <Slider
                maxValue={400}
                defaultValue={100}
                colorScheme="cyan"
                onChange={(v) => {
                  setBG(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </Box>
            <Text>{BG} mg/dL</Text>
          </HStack>
        </Stack>

        <Stack mx={5} space={4} alignItems="center" w="100%">
          <HStack>
          <Text>Insulin Dose</Text>
          <Box mx={5} w="200">
            <Slider
              defaultValue={0}
              colorScheme="cyan"
              onChange={(v) => {
                setUnits(Math.floor(v));
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Box>
          <Text>{units} units</Text>

          </HStack>
        </Stack>

        <VStack alignItems="center" space={4}>
          <Select
            selectedValue={mealType}
            minWidth={200}
            placeholder="Select Meal"
            onValueChange={(itemValue) => setMealType(itemValue)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="Breakfast" value="Breakfast" />
            <Select.Item label="Lunch" value="Lunch" />
            <Select.Item label="Dinner" value="Dinner" />
            <Select.Item label="Snack" value="Snack" />
            <Select.Item label="Dessert" value="Dessert" />
          </Select>
        </VStack>

        <Button onPress={handlePress}>Enter Meal</Button>
      </Center>
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