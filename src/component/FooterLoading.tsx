import React from 'react';
import { Box } from './Box';
import { ActivityIndicator } from 'react-native';

export interface FooterLoadingProps {
	isLoading: boolean;
}

export const FooterLoading: React.FC<FooterLoadingProps> = ({
	isLoading,
}: FooterLoadingProps) => {
	return isLoading ? (
		<Box
			position={'absolute'}
			bottom={8}
			width={'100%'}
			justifyContent={'center'}
			height={20}>
			<ActivityIndicator size="small" color="#C3223A" />
		</Box>
	) : null;
};
