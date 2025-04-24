import React from 'react';
import { Pressable, Text } from '@/component';
import { fonts } from '@/style';

export interface MultiSelectedCellProps {
	onMultiselected: () => void;
	label: string;
	isSelect: boolean;
	isSingleSelect: boolean;
}
export const MultiSelectedCell: React.FC<MultiSelectedCellProps> = ({
	onMultiselected,
	label,
	isSelect,
	isSingleSelect,
}: MultiSelectedCellProps) => (
	<Pressable
		onPress={onMultiselected}
		backgroundColor={isSelect ? 'antiFlashWhite4' : 'antiFlashWhite2'}
		borderRadius={10}
		width={'90%'}
		flexDirection={'row'}
		marginHorizontal={'s'}
		marginTop={'sr'}
		paddingVertical={'srr'}
		justifyContent={'center'}
		borderWidth={1}
		borderColor={isSelect ? 'pacificBlue' : 'antiFlashWhite2'}
	>
		<Text
			fontFamily={fonts.medium}
			fontSize={14}
			fontWeight={'500'}
			lineHeight={16.8}
			color={'peacoat'}
			textAlign={'center'}
		>
			{label}
		</Text>
	</Pressable>
);
