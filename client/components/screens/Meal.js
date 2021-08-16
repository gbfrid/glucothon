import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import { db } from "../../../config.js";
// import { Button } from "react-native-ios-kit";
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
} from "native-base";

function Meal(props) {
  const [mealItemArray, setMealItems] = useState([]);
  const [mealId, setMealId] = useState("");

  React.useEffect(() => {
    const onTab = props.navigation.addListener("focus", async () => {
      // console.log(props.user.id)
      const mealsRef = db.collection("meals");
      try {
        let mealArray;
        const mealSnapshot = await mealsRef
          .where("userId", "==", props.user.id)
          .where("open", "==", true)
          .get();
        mealSnapshot.forEach((doc) => {
          setMealId(doc.id);
          mealArray = doc.data().items;
        });
        setMealItems(mealArray);
      } catch (error) {
        console.log(error);
      }
    });
    return onTab;
  }, [props.navigation]);

  const pressHandler = () => {
    let carbTotal = 0;
    mealItemArray.forEach(item => {
      carbTotal += (item.carbs - item.fiber)
    })
    props.navigation.navigate("AddHealthData", {
      userId: props.user.id,
      mealId: mealId,
      carbTotal: carbTotal.toFixed(1)
    });
  }
  return (
    <View>
      <Center>
      <Button
        height={20}
        width='50%'
        onPress={pressHandler}
      >
        Add Health Data
      </Button>
      </Center>
      <ScrollView>
        <Stack space={2} >
          {!mealItemArray ? (
            <Text>No items in meal</Text>
          ) : (
            mealItemArray.map((item, index) => {
              return (
                <HStack space={4} key={index} style={{backgroundColor: '#e0ffff'}}>
                  <Image
                    alt="Text"
                    source={{ uri: item.imageUrl }}
                    size={"lg"}
                  />
                  <VStack>
                    <Center>
                      <Text fontSize="2xl"> {item.name}</Text>
                      <Text>Qty: {item.servingSize}</Text>
                    </Center>
                  </VStack>
                  <VStack>
                    <Center>
                      <Text>Net Carbs</Text>
                      <Text>{(item.carbs - item.fiber).toFixed(1)}</Text>
                    </Center>
                  </VStack>
                  <VStack>
                    <Center>
                      <Text>Fat</Text>
                      <Text>{item.fat}</Text>
                    </Center>
                  </VStack>
                  <VStack>
                    <Center>
                      <Text>Protein</Text>
                      <Text>{item.protein}</Text>
                    </Center>
                  </VStack>
                </HStack>
              );
            })
          )}
        </Stack>
      </ScrollView>
    </View>
  );
}

const mapState = (state) => {
  return {
    meal: state.meal,
  };
};

export default connect(mapState, null)(Meal);
