import React, { useState, useEffect } from 'react';
    import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

    const App = () => {
      const [alarmTime, setAlarmTime] = useState('');
      const [currentTime, setCurrentTime] = useState('');
      const [alarmMessage, setAlarmMessage] = useState('');
      const [messageType, setMessageType] = useState('text');
      const [messageText, setMessageText] = useState('');
      const [recordedMessage, setRecordedMessage] = useState(null);

      useEffect(() => {
        const interval = setInterval(() => {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');
          setCurrentTime(`${hours}:${minutes}:${seconds}`);
          checkAlarm(now);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

      const checkAlarm = (now) => {
        if (!alarmTime) return;
        const [alarmHours, alarmMinutes] = alarmTime.split(':').map(Number);
        if (now.getHours() === alarmHours && now.getMinutes() === alarmMinutes) {
          setAlarmMessage('Wake up!');
          if (recordedMessage) {
            if (messageType === 'text') {
              alert(`Message: ${recordedMessage}`);
            } else if (messageType === 'voice') {
              alert(`Playing voice message: ${recordedMessage}`);
            } else if (messageType === 'video') {
              alert(`Playing video message: ${recordedMessage}`);
            }
            setRecordedMessage(null);
          }
          setTimeout(() => {
            setAlarmMessage('');
          }, 5000);
        }
      };

      const handleSetAlarm = () => {
        // Placeholder for setting alarm logic
      };

      const handleRecordMessage = () => {
        setRecordedMessage(messageText);
        setMessageText('');
      };

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Alarm Clock</Text>
          <View style={styles.inputContainer}>
            <Text>Set Alarm:</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={alarmTime}
              onChangeText={setAlarmTime}
            />
            <Button title="Set Alarm" onPress={handleSetAlarm} />
          </View>
          <View style={styles.messageContainer}>
            <Text>Message Type:</Text>
            <Picker
              selectedValue={messageType}
              onValueChange={(itemValue) => setMessageType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Text" value="text" />
              <Picker.Item label="Voice" value="voice" />
              <Picker.Item label="Video" value="video" />
            </Picker>
            <TextInput
              style={styles.messageInput}
              placeholder="Enter your message"
              value={messageText}
              onChangeText={setMessageText}
            />
            <Button title="Record Message" onPress={handleRecordMessage} />
          </View>
          <Text>Current Time: {currentTime}</Text>
          <Text style={styles.alarmMessage}>{alarmMessage}</Text>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginHorizontal: 10,
        width: 100,
      },
      messageContainer: {
        marginBottom: 20,
      },
      messageInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        width: 250,
      },
      alarmMessage: {
        marginTop: 20,
        fontWeight: 'bold',
        color: 'red',
      },
      picker: {
        width: 150,
        height: 50,
      }
    });

    export default App;
