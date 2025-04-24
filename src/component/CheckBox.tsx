import React from 'react';
import { Box } from './Box';
import { Pressable } from './Pressable';
import { DeviceHelper } from '@/helper/DeviceHelper';
import { fonts, Theme } from '@/style';
import { Text } from './Text';
import { ResponsiveValue } from '@shopify/restyle';
import { Image } from "@/component/Image";
import { Images } from "@/assets";

export interface CheckBoxProps {
	label: string;
	onSelected: () => void;
	isSelect: boolean;
	onPressLabel2?: () => void;
	marginTop?: ResponsiveValue<keyof Theme['spacing'], Theme['breakpoints']>
}
export const CheckBox: React.FC<CheckBoxProps> = ({
	label,
	onSelected,
	isSelect,
	marginTop = 'r',
}: CheckBoxProps) => {
	return (
		<Pressable
			onPress={onSelected}
			flexDirection={'row'}
			alignItems={'center'}
			flexWrap={'wrap'}>
			<Box alignItems={'center'}>
				<Text
					marginEnd={'sr'}
					color={isSelect ? 'blue' : 'gray'}
					fontFamily={fonts.regular}
					opacity={isSelect ? 1 : 0.6}
					fontSize={14}>
					{label}
				</Text>
			</Box>
			<Box
				width={DeviceHelper.calculateWidthRatio(21)}
				height={DeviceHelper.calculateWidthRatio(21)}
				borderRadius={2}
				borderColor={'cadetGray'}
				alignItems={'center'}
				justifyContent={'center'}
				borderWidth={2}>
				{isSelect && (
					<Box
						width={DeviceHelper.calculateWidthRatio(21)}
						height={DeviceHelper.calculateWidthRatio(21)}
						backgroundColor={'green'}
						alignItems={'center'}
						justifyContent={'center'}
						borderRadius={5}>
							<Image height={21} width={21} source={Images.check} tintColor={'#fff'}/>
					</Box>
				)}
			</Box>
		</Pressable>
	);
};
