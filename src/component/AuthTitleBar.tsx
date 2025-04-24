import React from 'react';
import { Box } from '@/component/Box';
import { SvgIcon } from '@/assets/SvgIcon';
import { DeviceHelper } from '@/helper/DeviceHelper';
import { Text } from '@/component/Text';
import { fonts, Theme } from '@/style';
import { ResponsiveValue } from '@shopify/restyle';

export interface AuthTitleBarProps {
	title:string,
	message:string
	marginTop?: ResponsiveValue<keyof Theme['spacing'], Theme['breakpoints']>
	bottomSpec?:number
}

export const AuthTitleBar:React.FC<AuthTitleBarProps> = ({
	title,
	message,
	marginTop = 'el',
	bottomSpec = 80,
}:AuthTitleBarProps) =>{
	return (
		<Box>
			<Box marginTop={marginTop}>
				<SvgIcon
					height={DeviceHelper.calculateHeightRatio(50)}
					width={DeviceHelper.calculateWidthRatio(50)}
					name={'logo'} />
			</Box>
			<Box marginTop={'m'} justifyContent={'center'} alignItems={'center'}>
				<Text
					fontFamily={fonts.bold}
					fontSize={24}
					lineHeight={30}
					color={'gray29'}
				>
					{title}
				</Text>
				<Text
					fontFamily={fonts.regular}
					fontSize={16}
					marginTop={'sr'}
					textAlign={'center'}
					lineHeight={16}
					paddingHorizontal={'ls'}
					color={'slateGray'}
				>
					{message}
				</Text>
			</Box>
			<Box height={DeviceHelper.calculateHeightRatio(bottomSpec)} />
		</Box>
	);
};
