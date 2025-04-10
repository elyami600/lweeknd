import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  let hour = 8;
  let minute = 0;

  while (hour < 20) {
    const time = `${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'}`;
    slots.push(time);
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }

  return slots;
};

const CalendarDataPicker: React.FC = () => {
  const today: string = getFormatedDate(new Date(), 'YYYY/MM/DD');
  const [date, setDate] = useState<string>(today);
  const [time, setTime] = useState<string>('');
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [openTimePicker, setOpenTimePicker] = useState<boolean>(false);

  const timeSlots = generateTimeSlots();

  const handleDateChange = (selectedDate: string): void => {
    setDate(selectedDate);
    setOpenDatePicker(false);
  };

  const handleTimeSelect = (selectedTime: string): void => {
    setTime(selectedTime);
    setOpenTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Booking</Text>

      <TouchableOpacity style={styles.selectionCard} onPress={() => setOpenDatePicker(true)}>
        <Text style={styles.cardTitle}>Date</Text>
        <Text style={styles.cardValue}>{date}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.selectionCard} onPress={() => setOpenTimePicker(true)}>
        <Text style={styles.cardTitle}>Time</Text>
        <Text style={styles.cardValue}>{time ? time : 'Select time'}</Text>
      </TouchableOpacity>

      {/* Confirmation */}
      {date && time && (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>📅 {date}</Text>
          <Text style={styles.summaryText}>⏰ {time}</Text>
        </View>
      )}

      {/* Date Picker Modal */}
      <Modal transparent visible={openDatePicker} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pick a Date</Text>
            <DatePicker
              mode="calendar"
              selected={date}
              onDateChange={handleDateChange}
              options={{
                backgroundColor: '#fff',
                mainColor: '#ff5a5f',
                textHeaderColor: '#ff5a5f',
                selectedTextColor: '#fff',
              }}
            />
            <Pressable style={styles.closeButton} onPress={() => setOpenDatePicker(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal transparent visible={openTimePicker} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={[styles.modalContent, { height: 400 }]}>
            <Text style={styles.modalTitle}>Pick a Time</Text>
            <FlatList
              data={timeSlots}
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.timeSlot}
                  onPress={() => handleTimeSelect(item)}
                >
                  <Text style={styles.timeSlotText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Pressable style={styles.closeButton} onPress={() => setOpenTimePicker(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarDataPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  selectionCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    color: '#888',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
  summary: {
    marginTop: 30,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#ff5a5f',
    fontWeight: '500',
  },
  timeSlot: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  timeSlotText: {
    fontSize: 16,
    color: '#333',
  },
});
