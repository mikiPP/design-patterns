import { jest } from '@jest/globals';
import {
  AlertNotification,
  EmailChannel,
  NotificationChannel,
  PushNotification,
  PushNotificationChannel,
  ReminderNotification,
  SMSChannel,
} from './bridge';

describe('Bridge Pattern Tests', () => {
  let emailChannel: NotificationChannel;
  let smsChannel: NotificationChannel;
  let pushChannel: NotificationChannel;

  beforeEach(() => {
    emailChannel = new EmailChannel();
    smsChannel = new SMSChannel();
    pushChannel = new PushNotificationChannel();
  });

  it('should send alert notification via email', () => {
    const alert = new AlertNotification(emailChannel);
    const consoleSpy = jest.spyOn(console, 'log');

    alert.notify('Security Alert: Not allowed access detected.');

    expect(consoleSpy).toHaveBeenCalledWith('\nAlert notification');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sending email: Security Alert: Not allowed access detected.',
    );
  });

  it('should send alert notification via SMS', () => {
    const alert = new AlertNotification(smsChannel);
    const consoleSpy = jest.spyOn(console, 'log');

    alert.notify('Security Alert: Not allowed access detected.');

    expect(consoleSpy).toHaveBeenCalledWith('\nAlert notification');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sending SMS: Security Alert: Not allowed access detected.',
    );
  });

  it('should send reminder notification via SMS', () => {
    const reminder = new ReminderNotification(smsChannel);
    const consoleSpy = jest.spyOn(console, 'log');

    reminder.notify('Reminder: your medical date is tomorrow');

    expect(consoleSpy).toHaveBeenCalledWith('\nReminder notification:');
    expect(consoleSpy).toHaveBeenCalledWith('Sending SMS: Reminder: your medical date is tomorrow');
  });

  it('should send reminder notification via push notification', () => {
    const reminder = new ReminderNotification(pushChannel);
    const consoleSpy = jest.spyOn(console, 'log');

    reminder.notify('Reminder: your medical date is tomorrow');

    expect(consoleSpy).toHaveBeenCalledWith('\nReminder notification:');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sending push notification: Reminder: your medical date is tomorrow',
    );
  });

  it('should send push notification via push notification channel', () => {
    const push = new PushNotification(pushChannel);
    const consoleSpy = jest.spyOn(console, 'log');

    push.notify('New update available, click here to install');

    expect(consoleSpy).toHaveBeenCalledWith('\nPush notification:');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sending push notification: New update available, click here to install',
    );
  });

  it('should change channel and send alert notification via SMS', () => {
    const alert = new AlertNotification(emailChannel);
    alert.setChannel(smsChannel);
    const consoleSpy = jest.spyOn(console, 'log');

    alert.notify('Security Alert: Not allowed access detected.');

    expect(consoleSpy).toHaveBeenCalledWith('\nAlert notification');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sending SMS: Security Alert: Not allowed access detected.',
    );
  });
});
