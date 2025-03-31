import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barber Home</Text>
      <Text style={styles.stat}>Total Appointments: 15</Text>
      <Text style={styles.stat}>Upcoming: 5</Text>
      <Text style={styles.stat}>Completed: 8</Text>
      <Text style={styles.stat}>Canceled: 2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  stat: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeScreen;
