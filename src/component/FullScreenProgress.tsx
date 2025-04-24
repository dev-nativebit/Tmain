import React from 'react';
import { ActivityIndicator, Animated, Modal } from 'react-native';
import { Box } from './Box';
import { DeviceHelper } from '@/helper/DeviceHelper';

export const refFullScreenProgress = React.createRef<FullScreenProgress>();

export const showFullScreenProgress = (): void => {
	if (refFullScreenProgress) {
		refFullScreenProgress?.current?.showModal();
		refFullScreenProgress?.current?.setMessage(
			"Please wait a moment, we're loading the best experience for you!",
		);
	}
};

export const hideFullScreenProgress = (): void => {
	if (refFullScreenProgress) {
		refFullScreenProgress?.current?.hideModal();
	}
};

export const setMessageFullScreenProgress = (message: string): void => {
	if (refFullScreenProgress) {
		refFullScreenProgress?.current?.setMessage(message);
	}
};

export class FullScreenProgress extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			modalVisible: false,
			fadeAnim: new Animated.Value(0),
			message:
        "Please wait a moment, we're loading the best experience for you!",
		};
	}

	_animation(): Animated.CompositeAnimation {
		return Animated.loop(
			Animated.sequence([
				Animated.timing(this.state.fadeAnim, {
					toValue: 1, // Final opacity set to 1
					duration: 1000, // Animation duration in milliseconds
					useNativeDriver: true, // Enable native driver for better performance
				}),
				Animated.timing(this.state.fadeAnim, {
					toValue: 0, // Final opacity set to 0
					duration: 1000, // Animation duration in milliseconds
					useNativeDriver: true, // Enable native driver for better performance
				}),
			]),
			{
				iterations: -1, // Loop indefinitely
			},
		);
	}

	showModal(): void {
		this.setState({
			modalVisible: true,
		});

		// this._animation().start();
	}

	hideModal(): void {
		setTimeout(() => {
			this.setState({
				modalVisible: false,
				message: '',
			});
			this._animation().stop();
		}, 1000);
	}

	setMessage(message: string): void {
		this.setState({ message: message });
	}

	render(): React.ReactNode {
		const { modalVisible, fadeAnim } = this.state;
		return (
			<Box>
				<Modal
					animationType="fade"
					transparent
					visible={modalVisible}
					onRequestClose={() => {
						this.hideModal();
					}}>
					<Box
						backgroundColor="blackTrans"
						borderRadius={5}
						alignItems="center"
						opacity={0.97}
						justifyContent="center"
						width={DeviceHelper.width()}
						height={DeviceHelper.height()}>
						{/* <Animated.View */}
						{/*  style={{ */}
						{/*    opacity: fadeAnim, */}
						{/*  }}> */}
						{/*  <Image */}
						{/*    height={DeviceHelper.calculateHeightRatio(100)} */}
						{/*    width={DeviceHelper.width() / 1.5} */}
						{/*    source={Images.splash_logo} */}
						{/*  /> */}
						{/* </Animated.View> */}
						{/* <Box bottom={50} position={'absolute'} width={'100%'} height={30}> */}
						<ActivityIndicator size="large" color={'#f17616'} />
						{/* </Box> */}
						{/* <Text */}
						{/*  fontSize={16} */}
						{/*  fontFamily={fonts.regular} */}
						{/*  marginTop={'l'} */}
						{/*  color={'white'} */}
						{/*  marginHorizontal={'r'} */}
						{/*  textAlign={'center'}> */}
						{/*  {this.state.message} */}
						{/* </Text> */}
					</Box>
				</Modal>
			</Box>
		);
	}
}
