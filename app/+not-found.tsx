import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const generateWeekDates = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = [];
  for (let i = 0; i < 14; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    days.push(nextDay);
  }
  return days;
};

const generateTimeSlots = () => {
  const slots = [];
  const start = new Date();
  start.setHours(8, 0, 0, 0);
  const end = new Date();
  end.setHours(20, 0, 0, 0);

  while (start < end) {
    slots.push(new Date(start));
    start.setMinutes(start.getMinutes() + 30);
  }
  return slots;
};

const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Missing info', 'Please select both date and time.');
      return;
    }

    const formatted = `${selectedDate.toDateString()} at ${selectedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    Alert.alert('Appointment Booked', `Your appointment is set for ${formatted}`);
  };

  const weekDays = generateWeekDates();
  const timeSlots = generateTimeSlots();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pick a Day</Text>
      <FlatList
        horizontal
        data={weekDays}
        keyExtractor={(item) => item.toISOString()}
        contentContainerStyle={styles.weekRow}
        renderItem={({ item }) => {
          const isSelected = selectedDate?.toDateString() === item.toDateString();
          return (
            <TouchableOpacity
              style={[styles.dateItem, isSelected && styles.selected]}
              onPress={() => {
                setSelectedDate(item);
                setSelectedTime(null);
              }}
            >
              <Text style={styles.dateText}>
                {item.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {selectedDate && (
        <>
          <Text style={styles.header}>Available Times</Text>
          <FlatList
            data={timeSlots}
            keyExtractor={(item) => item.toISOString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={styles.timeGrid}
            renderItem={({ item }) => {
              const isSelected = selectedTime?.getTime() === item.getTime();
              return (
                <TouchableOpacity
                  style={[styles.timeSlot, isSelected && styles.selected]}
                  onPress={() => setSelectedTime(item)}
                >
                  <Text style={styles.timeText}>
                    {item.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}

      {selectedDate && selectedTime && (
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Text style={styles.bookText}>Book Appointment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  weekRow: {
    marginBottom: 20,
  },
  dateItem: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#ff6347',
  },
  dateText: {
    color: '#333',
  },
  timeGrid: {
    gap: 12,
  },
  timeSlot: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#eee',
    margin: 6,
    flex: 1,
    alignItems: 'center',
  },
  timeText: {
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  bookText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
