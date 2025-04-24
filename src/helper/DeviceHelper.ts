import { Dimensions, Platform } from 'react-native';
import DeviceInfo from "react-native-device-info";

export class DeviceHelper {
	static dimensions = Dimensions.get('window');

	static isMiniDevice(): boolean {
		return this.dimensions.height < 700;
	}

	static width(): number {
		return this.dimensions.width;
	}

	static height(): number {
		return this.dimensions.height;
	}

	static responsiveFontSize = (size: number): number => {
		const BASE_WIDTH = 390;
		const heightInDesign = 844;
		const scaleFactor = Math.min(this.dimensions.width / BASE_WIDTH, this.dimensions.height / heightInDesign);
		return Math.round(size * scaleFactor);
	};

	static calculateWidthRatio(size: number): number {
		const widthInDesign = 390;
		return (size * this.dimensions.width) / widthInDesign;
	}

	static calculateHeightRatio(size: number): number {
		const heightInDesign = 844;
		return (size * this.dimensions.height) / heightInDesign;
	}

	static calculateFontSize(size: number): number {
		return this.responsiveFontSize(size)
	}

	static ios(): boolean {
		return Platform.OS === 'ios';
	}

	static isIos(): boolean {
		return Platform.OS === 'ios';
	}

	static isAndroid(): boolean {
		return Platform.OS === 'android';
	}

	static device(): string {
		return this.ios() ? 'Ios' : 'Android';
	}
	static deviceOS(): string {
		return Platform.OS;
	}
}
