import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import CreatePollLayout from '../../components/createPollLayout';
import { colors } from '../../styles/colors';
import { usePoll } from '../../components/pollContext';

// Set spanish language for calendar
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ],
  monthNamesShort: [
    'Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'
  ],
  dayNames: [
    'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'
  ],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const monthNames = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

function formatDateToYYYYMMDD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatTime(date: Date): string {
  let h = date.getHours();
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${mm} ${ampm}`;
}

export default function EndDate() {
  const router = useRouter();
  const { state, dispatch } = usePoll();
  const [endDate, setEndDate] = useState(state.endDate || null);

  const initialDate = state.endDate ? new Date(state.endDate) : new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedTime, setSelectedTime] = useState<Date>(initialDate);


  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(selectedTime.getHours() % 12 || 12);
  const [selectedMinute, setSelectedMinute] = useState(selectedTime.getMinutes());
  const [isAM, setIsAM] = useState(selectedTime.getHours() < 12);



  const handleBack = () => router.back();
  const handleNext = () => router.push('/(create-poll)/preferences');

  const handleTimeSelect = () => {
    const hour = isAM ? selectedHour : selectedHour + 12;
    const newTime = new Date(selectedDate);
    newTime.setHours(hour, selectedMinute);
    setSelectedTime(newTime);
    setShowTimePicker(false);
  };

  const isNextEnabled = selectedDate > new Date() || 
    (selectedDate.getDate() === new Date().getDate() && 
     selectedTime > new Date());


     useEffect(() => {
      const combined = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      dispatch({ type: 'SET_END_DATE', payload: combined });
    }, [selectedDate, selectedTime, dispatch]);

  const renderTimePicker = () => (
    <Modal transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.timePickerContainer}>
          <View style={styles.timePickerHeader}>
            <Text style={styles.timePickerTitle}>Selecciona la hora</Text>
          </View>
          
          <View style={styles.timePickerContent}>
            <ScrollView style={styles.hoursContainer}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={[
                    styles.timeButton,
                    selectedHour === hour && styles.selectedTimeButton
                  ]}
                  onPress={() => setSelectedHour(hour)}
                >
                  <Text style={[
                    styles.timeButtonText,
                    selectedHour === hour && styles.selectedTimeButtonText
                  ]}>
                    {hour}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView style={styles.minutesContainer}>
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <TouchableOpacity
                  key={minute}
                  style={[
                    styles.timeButton,
                    selectedMinute === minute && styles.selectedTimeButton
                  ]}
                  onPress={() => setSelectedMinute(minute)}
                >
                  <Text style={[
                    styles.timeButtonText,
                    selectedMinute === minute && styles.selectedTimeButtonText
                  ]}>
                    {String(minute).padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.ampmContainer}>
              <TouchableOpacity
                style={[styles.ampmButton, isAM && styles.selectedAmpmButton]}
                onPress={() => setIsAM(true)}
              >
                <Text style={[styles.ampmText, isAM && styles.selectedAmpmText]}>AM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ampmButton, !isAM && styles.selectedAmpmButton]}
                onPress={() => setIsAM(false)}
              >
                <Text style={[styles.ampmText, !isAM && styles.selectedAmpmText]}>PM</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.timePickerFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowTimePicker(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleTimeSelect}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <CreatePollLayout
      title="Selecciona el día y hora en que tu votación termina"
      progress={5/7}
      onBack={handleBack}
      onNext={handleNext}
      isNextEnabled={isNextEnabled}
    >
      <View style={styles.inner}>
        {/* Día */}
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.inputText}>
            {`${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
          </Text>
        </TouchableOpacity>

        {/* Hora */}
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.inputText}>{formatTime(selectedTime)}</Text>
        </TouchableOpacity>

        {/* Calendario Modal */}
        {showCalendar && (
          <Modal transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.calendarContainer}>
                <Calendar
                  current={formatDateToYYYYMMDD(selectedDate)}
                  minDate={formatDateToYYYYMMDD(new Date())}
                  onDayPress={day => {
                    const nd = new Date(
                      day.year,
                      day.month - 1,
                      day.day,
                      selectedTime.getHours(),
                      selectedTime.getMinutes()
                    );
                    setSelectedDate(nd);
                    setShowCalendar(false);
                  }}
                  markedDates={{
                    [formatDateToYYYYMMDD(selectedDate)]: {
                      selected: true,
                      selectedColor: colors.primary,
                    }
                  }}
                  enableSwipeMonths
                  theme={{
                    backgroundColor: '#fff',
                    calendarBackground: '#fff',
                    textSectionTitleColor: '#666',
                    selectedDayTextColor: '#fff',
                    todayTextColor: colors.primary,
                    dayTextColor: '#333',
                    textDisabledColor: '#ccc',
                    dotColor: colors.primary,
                    arrowColor: colors.primary,
                    monthTextColor: '#333',
                    textDayFontSize: 14,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 12,
                  }}
                />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setShowCalendar(false)}
                >
                  <Text style={styles.closeText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* Time Picker Modal */}
        {showTimePicker && renderTimePicker()}
      </View>
    </CreatePollLayout>
  );
}

const styles = StyleSheet.create({
  inner: { paddingVertical: 20 },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  inputText: { fontSize: 16, color: '#333' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  timePickerContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  timePickerHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  timePickerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 200,
  },
  hoursContainer: {
    flex: 1,
    maxWidth: 80,
    maxHeight: 200,
  },
  minutesContainer: {
    flex: 1,
    maxWidth: 80,
    maxHeight: 200,
  },
  timeButton: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginVertical: 3,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    width: 60,
    height: 32,
    justifyContent: 'center',
  },
  selectedTimeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeButtonText: {
    color: '#fff',
  },
  ampmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    flexDirection: 'row',
    gap: 10,
  },
  ampmButton: {
    padding: 10,
    marginHorizontal: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 40,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAmpmButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ampmText: {
    fontSize: 10,
    color: '#333',
  },
  selectedAmpmText: {
    color: '#fff',
  },
  timePickerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  confirmButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeBtn: {
    marginTop: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  closeText: { color: '#fff', fontSize: 14 },
});
