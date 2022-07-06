import { notification } from 'antd';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function convertMsToMinutesSeconds(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const sendNotification = (type: NotificationType, message: string) => {
  notification[type]({
    message,
  });
};

export default convertMsToMinutesSeconds;
