import { View , Text , StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import exercises from '../../assets/data/exercises.json';
import { useState } from "react";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from '../graphqlClient';



const exerciseQuery = gql` 
query exercises($name: String) {
  exercises(name: $name) {
    name
    instructions
    equipment
    muscle
  }
} `;


export default function ExerciseDetailsScreen() {
    const {name} = useLocalSearchParams();
    const {data , isLoading , error} = useQuery({
      queryKey:['exercises' , name],
      queryFn:() => graphqlClient.request(exerciseQuery, {name})
    });

    const [isInstructionExpanded, setInstructionExpanded] = useState(false);

    if(isLoading){ return <ActivityIndicator/>} 

    const exercise = data?.exercises[0];
    
    if(!exercise){
        <Text>Exercise not found</Text>
    }
    return (
        <ScrollView  contentContainerStyle={styles.cont}>
            <Stack.Screen options={{title:exercise.name}}/>
            <View style={styles.panell}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
             <Text style={styles.exerciseSubtitle}>
             <Text style={styles.subVal}>{exercise.muscle}</Text> |{'  '}
             <Text style={styles.subVal}>{exercise.equipment}</Text>
            </Text>
            </View>
            <View style={styles.panell}>
            <Text style={styles.dis} numberOfLines={isInstructionExpanded ? 0 : 3}>{exercise.instructions}</Text>
            <Text style={styles.seeMore} onPress={()=> setInstructionExpanded(!isInstructionExpanded)}>{isInstructionExpanded ?'See less':'See more'}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
   cont:{
    padding: 10,
    gap: 10,
   },
   panell : {
    backgroundColor: 'white',
    padding: 10,
   },    
   exerciseName: {
        fontSize: 20,
        fontWeight: '500',
      },
      exerciseSubtitle: {
        color: 'dimgray',
      },
      subVal : {
        textTransform:'capitalize',
      },
      dis:{
     fontFamily:'Arial' ,
      fontSize:16, lineHeight:20,
       backgroundColor:'white' ,
      },
        seeMore:{
            alignSelf:'center',
            padding:10,
            fontWeight:'600',
            color:'gray'
        }
  });