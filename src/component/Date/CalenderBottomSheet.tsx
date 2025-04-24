import React from 'react';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars/src';
import { DateData } from 'react-native-calendars/src/types';
import { Box, Pressable, Button } from '@/component';

export interface CalendarModelProps {
	isVisible: boolean;
	disabled?: boolean;
	selectedDate: string;
	onClose:() => void;
	setDate:() => void;
	handleDateChange:(date: DateData) => void;
	handleOnClen?:()=>void;
	minDate:string
	maxDate:string
}

export const CalenderBottomSheet: React.FC<CalendarModelProps> = ({
	isVisible,
	handleOnClen,
	onClose,
	setDate,
	selectedDate,
	handleDateChange,
	minDate,
	maxDate,
}) => (
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
		swipeDirection={['down']}
		style={{
			justifyContent: 'flex-end',
			margin: 0,
		}}
	>
		<Box
			flex={1}
			justifyContent="flex-end"
		>
			<Pressable onPress={onClose} flex={1} />
			<Box
				borderTopLeftRadius={12}
				borderTopRightRadius={12}
				padding="r"
				backgroundColor="white"
				width="100%"
			>
				<Calendar
					onDayPress={handleDateChange}
					markedDates={{
						[selectedDate]: { selected: true, selectedColor: '#0E1724' },
					}}
					minDate={minDate}
					maxDate={maxDate}
				/>

				<Box
					flexDirection={'row'}
					alignSelf={'center'}
					marginTop={'ls'}
					marginHorizontal={'r'}
				>
					<Box flex={0.5}>
						<Button
							label={'Clear'}
							onPress={handleOnClen}
						/>
					</Box>
					<Box width={15} />
					<Box  flex={0.5}>
						<Button
							label={'Select'}
							onPress={setDate}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	</Modal>
);
