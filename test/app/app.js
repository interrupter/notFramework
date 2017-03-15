import {ncInit, ncMain} from './modules/main';
import ncUser from './modules/user';
import ncPost from './modules/post';
import ncCountry from './modules/country';

let appOptions = {
	//url from which will take interfaceManifest json file
	manifestURL: '/framework/test/app/manifest.json',
	router:{
		root:'/framework/test/app/',
		//routes for client-side
		manifest: [
			{
				paths: ['main/(\.*)\/', 'main'],
				controller: ncMain
			},
			{
				paths: ['user/(\.*)\/(\.*)\/', 'user/(\.*)\/'],
				controller: ncUser
			},
			{
				paths: ['post'],
				controller: ncPost
			},
			{
				paths: ['country'],
				controller: ncCountry
			}
		],
		index: 'main/hello_kitty'
	},
	//base controller, executed on every site page before any other controller
	initController: ncInit,
	//form auto generation
	forms: {
		//common is for profile
		//associated object is options for generator object
		//default generator notForm
		common: {
			templateUrl: '/framework/test/templates/lib.html'
		}
	},
	paths:{
		common: '/framework/test/templates/common',
		modules: '/framework/test/app/modules'
	}
};

notFramework.notCommon.startApp(()=> new notFramework.notApp(appOptions));
