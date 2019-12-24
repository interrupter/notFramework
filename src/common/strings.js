var CommonStrings = {
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	lowerFirstLetter(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
	},
	escapeHtml(unsafe) {
		return unsafe
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}
};

export default CommonStrings;
