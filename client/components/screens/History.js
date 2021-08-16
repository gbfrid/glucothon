import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { db } from "../../../config.js";
import { Center, Stack, VStack, HStack, Image, Text } from "native-base";

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
    <ScrollView>
      <Stack  space={2}>
      {mealHistoryArray &&
        mealHistoryArray.map((meal, index) => {
          return (
            <HStack
              space={1}
              key={index}
              style={{ backgroundColor: "#e0ffff" }}
            >
              <VStack style={{ width: "25%" }}>
                <Center>
                  <Text underline fontSize="md">
                    Meal
                  </Text>
                  <Text>{meal.mealType}</Text>
                </Center>
              </VStack>
              <VStack style={{ width: "20%" }}>
                <Center>
                  <Text underline>Net Carbs</Text>
                  <Text>{(meal.items[0].carbs - meal.items[0].fiber).toFixed(0)}</Text>
                </Center>
              </VStack>

              <VStack style={{ width: "20%" }}>
                <Center>
                  <Text underline>Insulin</Text>
                  <Text>{meal.insulinDose} units</Text>
                </Center>
              </VStack>

              <VStack style={{ width: "20%" }}>
                <Center>
                  <Text underline>Premeal BG</Text>
                  <Text>{meal.preBG}</Text>
                </Center>
              </VStack>
            </HStack>
          );
        })}
        </Stack>
    </ScrollView>
  );
};

export default History;
