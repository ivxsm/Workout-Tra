import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import ExerciseListItem from '../comp/ExerciseListItems';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client from '../graphqlClient';


const url = 'https://ciudadojeda.stepzen.net/api/eerie-indri/__graphql';

const exercisesQuery = gql`
query exercises($muscle: String, $name: String) {
  exercises(muscle: $muscle, name: $name) {
    muscle
    name
    equipment
  }
}
`;

export default function ExercisesScreen() {
  
  const {data , isLoading , error} = useQuery({
    queryKey:[ 'exercises'],
    queryFn: async () => {
      return client.request(exercisesQuery);
    },
  })


  if(isLoading){
    return <ActivityIndicator/>
  }

  if(error){
    return <Text>Error: {error.message}</Text>
  }

  return (
    <View style={styles.container} >
      <FlatList 
      data={data?.exercises}
      keyExtractor={(item , index) => item.name + index}
      renderItem={({item}) => <ExerciseListItem item={item} />}
      contentContainerStyle={{gap: 5}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'ghostwhite'
  },
});
