import React from 'react';
import { Box, Text } from './index';
import { fonts } from '@/style';
export interface ErrorMessageProps {
	errorMessage: string;
}

export const ErrorMessages: React.FC<ErrorMessageProps> = ({
	errorMessage,
}: ErrorMessageProps) => {
	return (
		<Box marginTop="ss">
			<Text
				fontFamily={fonts.regular}
				fontSize={12}
				color={'red'}
				lineHeight={16}
				marginTop={'es'}>
				{errorMessage}
			</Text>
		</Box>
	);
};
