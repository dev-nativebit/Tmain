import React, {useCallback, useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import { Linking } from 'react-native';
import { Box } from './Box';
import { Text } from './Text';
import { fonts } from '@/style';
import { Pressable } from './Pressable';
import {SvgIcon} from "@/assets/SvgIcon";
import {DeviceHelper} from "@/helper";
import {RootState, useAppSelector} from "@/redux/root.store";

export const ForceUpdateFullScreen: React.FC = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [isForceUpdate, setIsForceUpdate] = useState(false);
	const forceUpdateResult = useAppSelector((state:RootState) => state.loginDetail.forceUpdate);

	useMemo(() => {
		if (forceUpdateResult?.isSuccess){
			const forceUpdate = forceUpdateResult.getValue();
			setModalVisible(forceUpdate.isUpdateRequired());
			setIsForceUpdate(forceUpdate?.isForceUpdate());
		}
	}, [forceUpdateResult]);

	const handleOnNotNow = useCallback(() => {
		if (!isForceUpdate) {
			setModalVisible(false);
		}
	}, [isForceUpdate]);

	const onUpdate = () => {
		try {
			Linking.openURL('https://drive.google.com/drive/folders/1Oe99T9NZE53RFySF4lDwGNp0MkHF-bpB?usp=sharing');
		} catch (e) {
			// showErrorMessage(e?.toString());
		}
	};


	return (
		<Modal
			isVisible={isModalVisible}
			onModalHide={() => handleOnNotNow}
			onBackButtonPress={handleOnNotNow}
			animationInTiming={500}
			animationOutTiming={700}
			backdropTransitionOutTiming={0}
			animationIn="slideInUp"
			style={{ margin: 0 }}>
			<Box
				backgroundColor="white"
				alignItems="center"
				borderRadius={0}
				flex={1}
				justifyContent="center"
				paddingVertical="sr">
				<SvgIcon
					name={'updateApp'}
					height={DeviceHelper.height()/2}
					width={DeviceHelper.width()}
				/>
				<Text
					color="black"
					fontSize={14}
					fontFamily={fonts.bold}
					textAlign="center"
					paddingHorizontal="sr">
					{'This update includes some great new features and improvements, so we highly recommend you update to the latest version as soon as possible'}
				</Text>

				<Pressable
					onPress={onUpdate}
					marginEnd="s"
					paddingVertical="es"
					backgroundColor="primary"
					borderRadius={5}
					width="60%"
					marginTop="r"
					alignItems="center"
					justifyContent="center"
				>
					<Text
						color="white"
						fontFamily={fonts.medium}
						fontSize={18}
						textAlign="center">
						{'Install New Version'}
					</Text>
				</Pressable>
				{!isForceUpdate && (
					<Pressable
						marginTop="r"
						paddingVertical="ss"
						onPress={handleOnNotNow}>
						<Text fontSize={16} color="black" fontFamily={fonts.medium}>
							{'Not now'}
						</Text>
					</Pressable>
				)}
			</Box>
		</Modal>
	);
};
