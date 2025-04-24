import messaging, { firebase, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { DeviceHelper } from '@/helper/DeviceHelper';
import { Storage } from '@/core';
import { navigate, Routes } from '@/navigation/AppNavigation';

// TODO: once we have api, then place this enum over there in API file.
export const enum ModuleType {}

interface NotificationPayload {
	id: string; // processInstanceId
	moduleType: string;
	data: any;
}
interface NotificationData {
	message?: string;
	subTitle?: string;
	title?: string;
	[key: string]: any;
}


/**
 * @param notificationPayload - notification payload which we will get from remote notification.
 */
export const handleNotificationRedirection = (
	notificationPayload: NotificationPayload,
	safeNavigate?: any,
): void => {
	const { moduleType, id } = notificationPayload;
	console.log('notificationPayload ==>>', notificationPayload);
	console.log('moduleType ==>>', moduleType);
	console.log('id ==>>', id);
	switch (moduleType) {
		case 'DiscussionChat': // Example case, adjust based on your actual module types
			navigate({
				screenName: Routes.DiscussionChat,
				params: {
					id: id,
				},
			});
			break;
		case 'CloseDiscussionChat': // Example case, adjust based on your actual module types
			navigate({
				screenName: Routes.CloseDiscussionChat,
				params: {
					id: id,
				},
			});
			break;
		case 'NewDeal': // Example case, adjust based on your actual module types
			navigate({
				screenName: Routes.DealDigestDetailScreen,
				params: {
					id: id,
				},
			});
			break;
			// Add more cases as needed for different module types
		default:
			console.warn('Unhandled module type:', moduleType);
	}
	// redirectionApiCall(parseInt(id));
};
class PushNotificationHelper {
	init(safeNavigate: any): void {
		firebase.messaging().setAutoInitEnabled(true);
		this.configureNotification(safeNavigate);
		if (DeviceHelper.isIos()) {
			setTimeout(() => {
				this.setupIOSNotification();
				this.subscribe();
			}, 2000);
		}
		this.setUpNotification();
	}

	// eslint-disable-next-line
  createNotificationChanel(
		remoteMessage: FirebaseMessagingTypes.RemoteMessage,
	) {
		if (!DeviceHelper.isIos()) {
			PushNotification.createChannel(
				{
					channelId: remoteMessage.messageId ?? '', // (required)
					channelName: `Custom channel - Counter: ${remoteMessage.messageId}`, // (required)
					channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
					soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
					importance: 4, // (optional) default: 4. Int value of the Android notification importance
					vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
				},
				// eslint-disable-next-line
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
			);
		}
	}

	// eslint-disable-next-line
  async setUpNotification() {
		const defaultAppMessaging = firebase.messaging();

		if (!defaultAppMessaging.isDeviceRegisteredForRemoteMessages) {
			await defaultAppMessaging.registerDeviceForRemoteMessages();
		}

		const token = await defaultAppMessaging.getToken();
		console.log('FCM_TOKEN is', token);
		await Storage.setItemAsync(Storage.keys.fcmToken, token);

		// TODO:: Call api for update device token

		// messaging().onNotificationOpenedApp(remoteMessage => {
		// 	this.handleNotification(remoteMessage, 'background');
		// });

		// messaging()
		// 	.getInitialNotification()
		// 	.then(remoteMessage => {
		// 		if (remoteMessage) {
		// 			this.handleNotification(remoteMessage, 'background');
		// 		}
		// 	});

	}

	// eslint-disable-next-line
  getDataOfMessageFromNotification(
		remoteMessage: FirebaseMessagingTypes.RemoteMessage,
	): NotificationData {
		let data: NotificationData;

		// if (remoteMessage.notification) {
		// 	const { notification } = remoteMessage;
		// 	const subTitle =
		// 	typeof remoteMessage?.data?.subTitle === 'string'
		// 		? remoteMessage.data.subTitle
		// 		: '';
		// 	data = {
		// 		message: notification?.body,
		// 		subTitle: subTitle,
		// 		title: notification?.title,
		// 	};
		// } else {
		data = remoteMessage.data as NotificationData;
		if (data?.data && typeof data.data === 'string') {
			data = JSON.parse(data.data);
		}
		// }

		return data;
	}

	generateRandom32BitIntegerId(): number {
		// Generate a random integer between -2^31 and 2^31 - 1
		return Math.floor(Math.random() * 4294967296) - 2147483648;
	}


	handleNotification(
		remoteMessage: FirebaseMessagingTypes.RemoteMessage,
		state: 'foreground' | 'background' | 'quit',
	) {
		const data = this.getDataOfMessageFromNotification(remoteMessage);

		console.log(`Notification received in ${state} state:`, remoteMessage);
		console.log('Notification Data:', data);

		const subTitleOptions = {};
		subTitleOptions[DeviceHelper.ios() ? 'subtitle' : 'subText'] = data?.subTitle ?? '';

		PushNotification.localNotification({
			/* Android Only Properties */
			id: this.generateRandom32BitIntegerId(),
			vibration: 300,
			priority: 'high',
			importance: 'high',
			largeIcon: 'ic_launcher',
			smallIcon: 'ic_notification',
			bigLargeIcon: 'ic_launcher',
			// subText: data?.subTitle ?? '',
			/* iOS and Android properties */
			title: data?.title ?? '',
			message: data?.message ?? '',
			channelId: remoteMessage?.messageId ?? '',
			bigPictureUrl: data?.image ?? '',
			userInfo: { data: remoteMessage.data },
			autoCancel: true,
			ignoreInForeground: false,
			soundName: 'default',
			...subTitleOptions,
		});
	}

	showNotification = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
		// const notificationData = remoteMessage?.data;
		// const type = notificationData?.type;
		// const arrayOfAllowrdNotification = [
		// 	'DiscussionChat',
		// 	'CloseDiscussionChat',
		// ];
		// // TODO :: Make it false after every setup done
		return  true;//type ? arrayOfAllowrdNotification.includes(type) : true;
	};

	async setupIOSNotification() {
		firebase
			.messaging()
			.hasPermission()
			.then(enable => {
				if (enable) {
					this.requestForNotification();
				} else {
					firebase
						.messaging()
						.requestPermission()
						.then(() => {
							this.requestForNotification();
						})
					// eslint-disable-next-line
            .catch(error => {
							// TODO:: Show error if required.
						});
				}
			});
	}

	requestForNotification() {
		PushNotificationIOS.requestPermissions().then(permission => {
			if (permission.alert) {
				this.getFcmToken();
			}
		});
	}

	// eslint-disable-next-line
  getFcmToken() {
		try {
			firebase
				.messaging()
				.getToken()
				.then(async fcmToken => {
					if (fcmToken) {
						await Storage.setItemAsync(Storage.keys.fcmToken, fcmToken);

						//TODO:: Call api for update device token

						/* if (accountStore.isLogin) {
              profileFactory.getLoggedInProfile();
            }*/
					}
				});
		} catch (error) {
			console.error('getFcmToken', error);
		}
	}

	// eslint-disable-next-line
  subscribe() {
		// eslint-disable-next-line
    PushNotificationIOS.getInitialNotification().then(noti => {});
		// eslint-disable-next-line
    PushNotificationIOS.addEventListener('notification', noti => {});
	}

	// eslint-disable-next-line
  configureNotification(safeNavigate: any) {
		PushNotification.configure({
			onNotification(notification) {
				setTimeout(() => {
					if (notification.userInteraction) {
						let data = notification?.data;
						if (data?.data) {
							data = data.data;
						}
						console.log('data ====>>>', data);
						const notificationPayload = {
							id: data.id,
							moduleType: data.type ?? '',
							taskId: data?.taskId ?? '',
							requestId: data?.requestId ?? '',
							data: {},
						};
						handleNotificationRedirection(notificationPayload, safeNavigate);
					}
				}, 1000);
			},
		});
	}

	onMessageReceived(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
		console.log(
			'remoteMessage is received in foreground:',
			JSON.stringify(remoteMessage, null, 4),
		);
		this.createNotificationChanel(remoteMessage);
		this.handleNotification(remoteMessage, 'foreground');
	}

	registerOnMessageListener() {
		return messaging().onMessage(async remoteMessage => {
			this.onMessageReceived(remoteMessage);
		});
	}

	androidBackgroundHandler() {
		messaging().setBackgroundMessageHandler(async remoteMessage => {
			this.createNotificationChanel(remoteMessage);
			this.handleNotification(remoteMessage, 'background');
		});
	}
}

export const pushNotificationHelper = new PushNotificationHelper();
