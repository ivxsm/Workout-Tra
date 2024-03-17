import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import exercises from './assets/data/exercises.json';
import ExerciseListItem from './src/comp/ExerciseListItems';

export default function App() {
  return (
    <View style={styles.container} >
      <FlatList 
      data={exercises}
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
    paddingTop: 70,
    backgroundColor:'gainsboro'
  },
});
