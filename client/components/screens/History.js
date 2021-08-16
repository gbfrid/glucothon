import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { db } from "../../../config.js";
import {
  Center,
  Stack,
  VStack,
  HStack,
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
        const snapshot = await mealsRef
          .where("userId", "==", userId)
          .where("open", "==", false)
          .get();
        let items = [];
        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setMealHistory(items);
      } catch (error) {
        console.log(error);
      }
    });
    return onTab;
  }, [props.navigation]);

  return (
    <View>
      {mealHistoryArray &&
        mealHistoryArray.map((meal, index) => {
          return (
            <HStack key={index} space={3}>
              <VStack>
                <Text underline>Meal</Text>
                <Text>{meal.mealType}</Text>
              </VStack>

              <VStack>
                <Text underline>Net Carbs</Text>
                <Text>{(meal.items[0].carbs = meal.items[0].fiber)}</Text>
              </VStack>

              <VStack>
                <Text underline>Insulin</Text>
                <Text>{meal.insulinDose} units</Text>
              </VStack>

              <VStack>
                <Text underline>Premeal BG</Text>
                <Text>{meal.preBG}</Text>
              </VStack>
            </HStack>
          );
        })}
    </View>
  );
};

export default History;
