import React from 'react';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Box } from './Box';
import { DeviceHelper } from '@/helper/DeviceHelper';
import { Pressable } from './Pressable';
import { useTheme } from '@shopify/restyle';
import { Theme, theme } from '@/style';

export interface ToggleButtonProps {
	onPress: () => void;
	isOn: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
	isOn,
	onPress,
}: ToggleButtonProps) => {
	const { colors } = useTheme<Theme>();
	const offset = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateX: offset.value }],
	}));

	React.useEffect(() => {
		if (isOn) {
			offset.value = withTiming(20, { duration: 170, easing: Easing.linear });
		} else {
			offset.value = withTiming(0, { duration: 170, easing: Easing.linear });
		}
	}, [isOn]);

	return (
		<Pressable
			onPress={onPress}
			style={{
				backgroundColor: isOn
					? theme.colors.blueGreen
					: theme.colors.bluegray300,
			}}
			height={DeviceHelper.calculateHeightRatio(26)}
			borderRadius={20}
			flexDirection="row"
			alignItems="center"
			width={DeviceHelper.calculateWidthRatio(47)}
			overflow="hidden">
			<Animated.View style={[animatedStyles]}>
				<Box
					height={DeviceHelper.calculateWidthRatio(20)}
					width={DeviceHelper.calculateWidthRatio(20)}
					borderRadius={DeviceHelper.calculateWidthRatio(13)}
					marginStart="ss"
					justifyContent="center"
					style={{
						backgroundColor: isOn
							? theme.colors.white
							: theme.colors.white,
					}}
				/>
			</Animated.View>
		</Pressable>
	);
};
