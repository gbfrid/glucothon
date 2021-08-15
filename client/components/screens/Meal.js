import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import { db } from "../../../config.js";
import { Button } from "react-native-ios-kit";


function Meal(props) {
  const [mealItemArray, setMealItems] = useState([]);
  const [mealId, setMealId] = useState('');

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
          setMealId(doc.id)
          mealArray = doc.data().items;
        });
        setMealItems(mealArray);
      } catch (error) {
        console.log(error);
      }
    });
    return onTab;
  }, [props.navigation]);

  return (
    <View>
       <Button
        inline
        rounded
         onPress={() => {
          props.navigation.navigate('AddHealthData', {
          userId: props.user.id,
          mealId: mealId
        })
      }}
        >
          Add Health Data
          </Button>
      <ScrollView>
        {!mealItemArray ? (
          <Text>No items in meal</Text>
        ) : (
          mealItemArray.map((item, index) => {
            return <Text key={index}>{item.name}</Text>;
          })
        )}
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



