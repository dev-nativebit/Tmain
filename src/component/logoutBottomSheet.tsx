import React from 'react';
import { Box } from '@/component/Box';
import { Pressable } from '@/component/Pressable';
import { Text } from '@/component/Text';
import { fonts } from '@/style';
import Modal from 'react-native-modal';
import { Button } from '@/component/Button';

export interface LogoutBottomSheetProps {
	isVisible:boolean
	onClose: () => void
	onLogoutPress:() => void
	message:string
	positiveButtonLabel:string
	negativeButtonLabel:string
}

export const LogoutBottomSheet:React.FC<LogoutBottomSheetProps> = ({
	onClose, isVisible, onLogoutPress,negativeButtonLabel,positiveButtonLabel,message
}:LogoutBottomSheetProps) =>{
	return (
		<Modal
			testID="modal"
			isVisible={isVisible}
			onModalHide={onClose}
			onBackButtonPress={onClose}
			onSwipeComplete={onClose}
			animationInTiming={500}
			animationOutTiming={700}
			animationIn="slideInUp"
			backdropTransitionOutTiming={0}
			avoidKeyboard={true}
			swipeDirection={['down']}
			style={{
				justifyContent: 'flex-end',
				margin: 0,
			}}
		>
			<Box flex={1}>
				<Pressable onPress={onClose} flex={0.8} />
				<Box
					flex={0.3}
					backgroundColor={'white'}
					borderTopLeftRadius={15}
					borderTopRightRadius={15}
				>
					<Box
						height={5}
						width={36}
						borderRadius={10}
						marginTop={'s'}
						alignSelf={'center'}
						backgroundColor={'gray'}
					/>
					<Box
						marginTop={'sr'}
						paddingHorizontal={'r'}
						justifyContent={'space-between'}
					>
						<Text
							fontSize={20}
							fontFamily={fonts.medium}
							lineHeight={32}
							letterSpacing={0.15}
							marginTop={'r'}
							color={'dark'}
						>
							{message}
						</Text>
					</Box>
					<Box
						flexDirection={'row'}
						position={'absolute'}
						bottom={20}
						marginHorizontal={'r'}
					>
						<Box flex={0.50} marginEnd={'e6'}>
							<Button
								onPress={onLogoutPress}
								label={positiveButtonLabel}
								fontSize={18}
								fontFamily={fonts.medium}

							/>
						</Box>
						<Pressable
							onPress={onClose}
							flex={0.50}
							marginStart={'e6'}
							borderColor={'primaryColor'}
							borderRadius={8}
							alignItems={'center'}
							justifyContent={'center'}
							borderWidth={1}>
							<Text
								color={'gray'}
								fontSize={18}
								textAlign="center"
								lineHeight={18}
								letterSpacing={0.46}
								fontFamily={fonts.medium}
							>
								{negativeButtonLabel}
							</Text>
						</Pressable>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
