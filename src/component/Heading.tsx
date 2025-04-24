import React from "react";
import { Box } from "./Box.tsx";
import { Text } from "./Text.tsx";
import { fonts, theme } from "../style";

export interface HeadingProps {
	title: string;
}
export const Heading: React.FC<HeadingProps> = ({
	title,
}: HeadingProps) => {

	return (
		<Box >
			<Text
				style={{ color:theme.colors.seaBlue }}
				marginVertical={'s'}
				fontSize={30}
				textAlign={'left'}
				fontFamily={fonts.bold}>
				{title}
			</Text>

		</Box>
	);
};
