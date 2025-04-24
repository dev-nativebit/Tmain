import React, {useMemo, useState} from 'react';
import {Box} from '@/component/Box';
import {Pressable} from './Pressable';
import {Button} from './Button';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {DeviceHelper} from '@/helper/DeviceHelper';

export interface CalendarModelProps {
	isVisible: boolean;
	selectedDate: string;
	onClose:() => void;
	handleDateChange:(date: Date) => void;
}

export const CalendarModel: React.FC<CalendarModelProps> = ({
	isVisible,
	onClose,
	selectedDate,
	handleDateChange,
}) => {
	const [state, setState] = useState('idle');
	const [selectedDates, setSelectedDates] = useState<Date>(new Date());

	useMemo(() => {
		if (selectedDate){
			setSelectedDates(new Date(selectedDate));
		}

	}, [selectedDate]);
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
				<Pressable onPress={onClose} flex={0.6} />
				<Box
					borderTopLeftRadius={12}
					borderTopRightRadius={12}
					flex={0.5}
					backgroundColor={'white'}
				>
					<Box
						backgroundColor={'grayGrey'}
						height={'1.5%'}
						width={'10%'}
						marginTop={'s'}
						borderRadius={5}
						alignSelf={'center'}
					/>
					<Box flex={1}>
						<DatePicker
							date={selectedDates}
							mode={'date'}
							style={{
								width:DeviceHelper.width(),
								marginTop:20,
							}}
							onStateChange={setState}
							onDateChange={(date) =>{
								setSelectedDates(date);
							}} />
					</Box>

					<Box marginHorizontal={'r'}>
						<Button
							label={'Confirm'}
							fontSize={18}
							disabled={state === 'spinning'}
							onPress={() =>{
								handleDateChange(selectedDates);
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
