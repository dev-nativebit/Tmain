class StringUtils {
	getInitialsUpToTwoWords(name: string): string {
		// Split the name into words
		const words = name.split(' ');

		// Take the first character of each word
		const initials = words.slice(0, 2).map(word => word.charAt(0));

		// Join the initials together
		return initials.join('').toUpperCase();
	}
}

export const stringUtils = new StringUtils();
