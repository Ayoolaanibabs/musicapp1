import { notification } from "antd";
import { NotificationType } from "../interfaces/NotificationType.interface";

function padTo2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}

function convertMsToMinutesSeconds(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`;
}

export const sendNotification = (type: NotificationType, message: string): void => {
  notification[type]({
    message,
  });
};

export default convertMsToMinutesSeconds;
