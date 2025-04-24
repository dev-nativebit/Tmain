import React from 'react';
import { Pressable as RNPressable, PressableProps } from 'react-native';
import {
	backgroundColor,
	BackgroundColorProps,
	border,
	BorderProps,
	layout,
	LayoutProps,
	position,
	shadow,
	ShadowProps,
	spacing,
	SpacingProps,
	useRestyle,
	PositionProps,
	opacity,
	OpacityProps, composeRestyleFunctions,
} from '@shopify/restyle';
import { Theme } from '@/style';

type RestyleProps =
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  OpacityProps<Theme>;

type PressableContainerProps = RestyleProps & PressableProps;


const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
	spacing,
	backgroundColor,
	spacing,
	layout,
	shadow,
	opacity,
	// @ts-ignore
	border,
]);

export const Pressable = ({ ...rest }: PressableContainerProps): JSX.Element => {
	const pressableProps: PressableProps = rest as PressableProps;
	const restyleProps: RestyleProps = rest as RestyleProps;
	const props = useRestyle(restyleFunctions, restyleProps);

	const { children } = pressableProps;
	return (
		<RNPressable {...props} {...pressableProps}>
			{children}
		</RNPressable>
	);
};
