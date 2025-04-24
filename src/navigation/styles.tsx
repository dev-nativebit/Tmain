import { Theme, theme } from '@/style';
import { useTheme } from '@shopify/restyle';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

	tabBarItemContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,

	},

	tabBarIconFocused: {
		width: 22,
		height: 22,
		tintColor: theme.colors.primaryColor,
	},
});
