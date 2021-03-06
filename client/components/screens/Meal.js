import React, { useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
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
  ZStack
} from "native-base";

function Meal(props) {
  const [mealItemArray, setMealItems] = useState([]);
  const [mealId, setMealId] = useState("");
  const{width,height} = Dimensions.get('window');


  React.useEffect(() => {
    const onTab = props.navigation.addListener("focus", async () => {
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
    if (!mealItemArray) {
      alert('Add some items to your meal!')
    } else {
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

  }
  return (
    <View>
      <ZStack>
      <ScrollView height={height - 176}>
        <Stack space={2} >
          {!mealItemArray ? (
            <Center style={{margin: 150}}>
               <Text fontSize='md'>No items in meal</Text>
            </Center>

          ) : (
            mealItemArray.map((item, index) => {
              return (
                <HStack space={1} key={index} style={{backgroundColor: '#e0ffff'}}>
                  <Image
                    alt="Text"
                    source={{ uri: item.imageUrl }}
                    size={"lg"}
                  />
                  <VStack style={{width: "25%"}}>
                    <Center>
                      <Text underline fontSize="md"> {item.name}</Text>
                      <Text>Qty: {item.servingSize}</Text>
                    </Center>
                  </VStack>
                  <VStack style={{width: "20%"}}>
                    <Center>
                      <Text underline>Net Carbs</Text>
                      <Text>{(item.carbs - item.fiber).toFixed(1)}</Text>
                    </Center>
                  </VStack>
                  <VStack style={{width: "10%"}}>
                    <Center>
                      <Text underline>Fat</Text>
                      <Text>{item.fat}</Text>
                    </Center>
                  </VStack>
                  <VStack style={{width: "15%"}}>
                    <Center>
                      <Text underline>Protein</Text>
                      <Text>{item.protein}</Text>
                    </Center>
                  </VStack>
                </HStack>
              );
            })
          )}
        </Stack>
      </ScrollView>
      <Center>
      <Button
        style={{position:'absolute', top: height - 276, left: width - 306, opacity: 0.7}}
        height={20}
        width={200}
        onPress={pressHandler}
      >
        Add Health Data
      </Button>
      </Center>
      </ZStack>
    </View>
  );
}

const mapState = (state) => {
  return {
    meal: state.meal,
  };
};

export default connect(mapState, null)(Meal);
