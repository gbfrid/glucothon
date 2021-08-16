import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { db } from "../../../config.js";
import {
  Center,
  Stack,
  Box,
  Select,
  VStack,
  Button,
  HStack,
  useToast,
  Image,
  Text,
} from "native-base";

const History = (props) => {
  const [mealHistoryArray, setMealHistory] = useState([]);

  React.useEffect(() => {
    const onTab = props.navigation.addListener("focus", async () => {
      const mealsRef = db.collection("meals");
      const userId = props.user.id.toString();
      try {
        const snapshot = await mealsRef.where("userId", "==", userId).get();
        let items = {};
        snapshot.forEach((doc) => {
          items = doc.data();
        });
        setMealHistory(items);
      } catch (error) {
        console.log(error);
      }
    });
    return onTab;
  }, [props.navigation]);
  const { mealType, insulinDose, preBG } = mealHistoryArray;
  let carbTotal = 0;
  if (mealHistoryArray.items) {
    mealHistoryArray.items.forEach((item) => {
      carbTotal += item.carbs - item.fiber;
    });
  }
  return (
    <View>
      <HStack space={3}>
        <VStack>
          <Text>Meal</Text>
          <Text>{mealType}</Text>
        </VStack>

        <VStack>
          <Text>Net Carbs</Text>
          <Text>{carbTotal}</Text>
        </VStack>

        <VStack>
          <Text>Insulin</Text>
          <Text>{insulinDose} units</Text>
        </VStack>

        <VStack>
          <Text>Premeal BG</Text>
          <Text>{preBG}</Text>
        </VStack>

      </HStack>
    </View>
  );
};

export default History;
