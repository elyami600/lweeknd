import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About LongWeekend</Text>
      <Text style={styles.description}>
        LongWeekend is a platform that connects customers with barbershops, enabling seamless online bookings, real-time service discovery, and social engagement. 
      </Text>
      <Text style={styles.footer}>© 2025 LongWeeknd. All Rights Reserved.</Text>
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
  },
});

export default AboutScreen;
