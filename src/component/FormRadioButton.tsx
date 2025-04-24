import {fonts, theme} from '@/style';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Text} from '@/component/Text';
import { Box } from "@/component/Box";
import { LabelValuePair } from "@/component/Types";

interface FormRadioButtonProps {
	selected: string;
	onPress: (value:string) => void;
	disabled?:boolean
	option:LabelValuePair[]
	label:string
	isRequired: boolean;
}

export const FormRadioButton: React.FC<FormRadioButtonProps> = ({
	selected,
	onPress,
	disabled =false ,
	option,
	label,
	isRequired
}) => {
	return (
		<Box marginStart={'es'} paddingBottom={"sr"}>
			<Text
				fontSize={14}
				fontFamily={fonts.regular}
				lineHeight={16}
				color={'slateGray'}
				paddingBottom={'s'}
				letterSpacing={0.15}
			>
				{label}
				{isRequired && <Text color={'red'}>{'*'}</Text>}
			</Text>
		<Box flexDirection={'row'} >
			{option.map((value,index) => {
				return(
					<TouchableOpacity
						onPress={() =>{
							onPress(value.value as string)
						}}
						style={{
							paddingStart:index === 0 ? 4 :10
						}}
						disabled={disabled}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<View
								style={{
									width: 20,
									height: 20,
									borderRadius: 10,
									borderWidth: 2,
									borderColor: selected
										? theme.colors.black
										: disabled ? theme.colors.grey : theme.colors.slateGray,
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								{selected === value.value && (
									<View
										style={{
											width: 12,
											height: 12,
											borderRadius: 6,
											backgroundColor: theme.colors.primary,
										}}
									/>
								)}
							</View>
							<Text
								color={disabled? 'grey' : 'black'}
								paddingStart={'s'}
								fontFamily={fonts.medium}
								fontSize={14}
							>
								{value.label}
							</Text>
						</View>
					</TouchableOpacity>
				)
			})}
		</Box>
		</Box>
	);
};
