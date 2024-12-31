document.addEventListener('DOMContentLoaded', function () {
      const alarmTimeInput = document.getElementById('alarmTime');
      const setAlarmBtn = document.getElementById('setAlarmBtn');
      const currentTimeDisplay = document.getElementById('currentTime');
      const alarmMessage = document.getElementById('alarmMessage');
      const messageTypeSelect = document.getElementById('messageType');
      const messageTextarea = document.getElementById('messageText');
      const recordMessageBtn = document.getElementById('recordMessageBtn');
      const messageDisplay = document.getElementById('messageDisplay');
      let alarmInterval = null;
      let recordedMessage = null;
      let messageType = null;

      function updateCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
      }

      function checkAlarm() {
        const now = new Date();
        const alarmTime = alarmTimeInput.value;
        if (!alarmTime) return;

        const [alarmHours, alarmMinutes] = alarmTime.split(':').map(Number);
        if (now.getHours() === alarmHours && now.getMinutes() === alarmMinutes) {
          alarmMessage.textContent = 'Wake up!';
          clearInterval(alarmInterval);
          alarmInterval = null;

          // Display recorded message
          if (recordedMessage) {
            if (messageType === 'text') {
              messageDisplay.textContent = `Message: ${recordedMessage}`;
            } else if (messageType === 'voice') {
              messageDisplay.textContent = 'Playing voice message...';
              setTimeout(() => {
                messageDisplay.textContent = `Voice message: ${recordedMessage}`;
              }, 2000);
            } else if (messageType === 'video') {
              messageDisplay.textContent = 'Playing video message...';
              setTimeout(() => {
                messageDisplay.textContent = `Video message: ${recordedMessage}`;
              }, 2000);
            }
            recordedMessage = null;
            messageType = null;
          }

          setTimeout(() => {
            alarmMessage.textContent = '';
            messageDisplay.textContent = '';
          }, 5000);
        }
      }

      setAlarmBtn.addEventListener('click', function() {
        if (alarmInterval) {
          clearInterval(alarmInterval);
          alarmInterval = null;
        }
        alarmInterval = setInterval(checkAlarm, 1000);
      });

      recordMessageBtn.addEventListener('click', function() {
        messageType = messageTypeSelect.value;
        recordedMessage = messageTextarea.value;
        messageTextarea.value = '';
      });

      updateCurrentTime();
      setInterval(updateCurrentTime, 1000);
    });
