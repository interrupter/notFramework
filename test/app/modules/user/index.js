
class ncUser extends notFramework.notController {
	constructor(app){
		super(app);
		this.setViews({
			default: {
				common: false,
            	name: 'default',
            	placeId: 'content'
			}
		});
		return this;
	}
}

export default ncUser;
