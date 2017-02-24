var CommonStrings = {
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	lowerFirstLetter(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
	},
};

export default CommonStrings;
