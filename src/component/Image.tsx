// @ts-ignore
import React from 'react';
import {
	BorderProps,
	layout,
	LayoutProps,
	spacing,
	SpacingProps,
	useRestyle,
	PositionProps,
	shadow,
	ShadowProps, composeRestyleFunctions, BackgroundColorProps, OpacityProps, backgroundColor, opacity,
} from '@shopify/restyle';
import { Image as RNImage, ImagePropsBase } from 'react-native';
import { Theme } from '@/style';

type RestyleProps = BorderProps<Theme> &
BackgroundColorProps<Theme> &
LayoutProps<Theme> &
SpacingProps<Theme> &
ShadowProps<Theme> &
PositionProps<Theme> &
OpacityProps<Theme>;

export type ImageProps = RestyleProps & ImagePropsBase;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>( [
	spacing,
	backgroundColor,
	spacing,
	layout,
	shadow,
	opacity,
]);


export const Image = ({ ...rest }: ImageProps): JSX.Element => {
	const imageProps: ImagePropsBase = rest as ImagePropsBase;
	const restyleProps: RestyleProps = rest as RestyleProps;
	const props = useRestyle(restyleFunctions, restyleProps);
	// @ts-ignore
	return <RNImage {...imageProps} {...props}/>;
};
