import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ExerciseListItem({ item } : any) {
  return (
    <Link href={`/${item.name}`} asChild>
    <Pressable style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseSubtitle}>
        <Text style={styles.subVal}>{item.muscle}</Text> |{'  '}
        <Text style={styles.subVal}>{item.equipment}</Text>
      </Text>
    </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    gap: 5,
    marginHorizontal: 3,
    // shadow styling
    shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.2,
shadowRadius: 1.41,
elevation: 2,
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
});