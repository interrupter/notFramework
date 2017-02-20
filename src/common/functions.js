var CommonFunctions = {
	pipe: function(data/* feed data */, funcs/* functions array */) {
		let result;
		for(let func of funcs){
			result = func(result || data);
		}
		return result;
	},
};

export default CommonFunctions;
