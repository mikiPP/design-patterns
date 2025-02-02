export interface NotificationChannel {
  send(message: string): void;
}

export class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Sending email: ${message}`);
  }
}

export class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}

export class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Sending push notification: ${message}`);
  }
}

export abstract class BaseNotification {
  protected channel: NotificationChannel;

  constructor(channel: NotificationChannel) {
    this.channel = channel;
  }

  // We could use the set channel here because is the same for all other classes
  // I did in the other way, because the  implemented solution is more open to extension.
  // setChannel(channel: NotificationChannel){
  // 	this.channel = channel;
  // }

  abstract setChannel(channel: NotificationChannel): void;

  abstract notify(message: string): void;
}

export class AlertNotification extends BaseNotification {
  notify(message: string): void {
    console.log('\nAlert notification');
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

export class ReminderNotification extends BaseNotification {
  notify(message: string): void {
    console.log('\nReminder notification:');
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

export class PushNotification extends BaseNotification {
  override notify(message: string): void {
    console.log('\nPush notification:');
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

function main() {
  const alert = new AlertNotification(new EmailChannel());

  alert.notify('Security Alert: Not allowed access detected.');

  alert.setChannel(new SMSChannel());
  alert.notify('Security Alert: Not allowed access detected.');
  // Export the classes to be used in the test file
  const reminder = new ReminderNotification(new SMSChannel());
  reminder.notify('Reminder: your medical date is tomorrow');

  reminder.setChannel(new PushNotificationChannel());
  reminder.notify('Reminder: your medical date is tomorrow');

  const push = new PushNotification(new PushNotificationChannel());
  push.notify('New update available, click here to install');
}

main();
