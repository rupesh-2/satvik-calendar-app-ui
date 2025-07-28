import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { Reminder } from "../store/useUserPrefsStore";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id", // Replace with your Expo project ID
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
};

export const scheduleLocalNotification = async (
  title: string,
  body: string,
  trigger: Notifications.NotificationTriggerInput
) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger,
    });
    return true;
  } catch (error) {
    console.error("Error scheduling notification:", error);
    return false;
  }
};

export const schedulePanchangReminder = async (reminder: Reminder) => {
  const { date, time, title } = reminder;

  // Parse the date and time
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const triggerDate = new Date(year, month - 1, day, hour, minute);

  // Don't schedule if the date is in the past
  if (triggerDate <= new Date()) {
    return false;
  }

  return await scheduleLocalNotification(
    title,
    `Today is ${reminder.tithi}. Don't forget your spiritual practices!`,
    {
      date: triggerDate,
    }
  );
};

export const cancelNotification = async (identifier: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier);
    return true;
  } catch (error) {
    console.error("Error canceling notification:", error);
    return false;
  }
};

export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return true;
  } catch (error) {
    console.error("Error canceling all notifications:", error);
    return false;
  }
};

export const getNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  return status;
};

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status;
};
