import {ncInit, ncMain} from './modules/main';
import ncUser from './modules/user';
import ncPost from './modules/post';
import ncCountry from './modules/country';

let appOptions = {
	//url from which will take interfaceManifest json file
	interfaceManifestURL: '/framework/test/app/manifest.json',
	//routes for client-side
	siteManifest: {
		//routie route desription: controller name, real controller is function preffixed with 'nc', ncMain, ncPublication
		'': ncMain,
		'user/:param?': ncUser,
		'post/:param?': ncPost,
		'country/:param?': ncCountry,
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
