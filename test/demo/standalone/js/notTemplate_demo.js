var dataSetSingle = new notFramework.notRecord({}, {
	title: 'this is title',
	body: 'this is body',
	new: function () {
		return true;
	}
});


var dataSetArray = [
	{
		title: 'title 1',
		body: 'body 1',
		authorName: 'me',
		new: true
	},
	{
		title: 'title 2',
		body: 'body 2',
		authorName: 'me',
		new: true
	},
	{
		title: 'title 3',
		body: 'body 3',
		authorName: 'me',
		old: function () {
			return true;
		}
	},
	{
		title: 'title 4',
		body: 'body 4',
		authorName: 'me'
	},
	{
		title: 'title 5',
		body: 'body 5',
		authorName: 'me',
		tags: ['some', 'tags']
	}
];

var dataComplex = {
	 title: 'complex data title',
	 complexData:{
		 title:{
			 title: 'Complex sub title'
		 },
		 items: dataSetArray
	 }
};

var dataForSelect = new notRecord({},{
	title: 'Select title',
	name: 'select',
	value: 3
});

var selectHelpers = {
	options: [
		{'_id': 0, 'title': 'option 0'},
		{'_id': 1, 'title': 'option 1'},
		{'_id': 2, 'title': 'option 2'},
		{'_id': 3, 'title': 'option 3'},
		{'_id': 4, 'title': 'option 4'},
		{'_id': 5, 'title': 'option 5'},
		{'_id': 6, 'title': 'option 6'},
		{'_id': 7, 'title': 'option 7'},
		{'_id': 8, 'title': 'option 8'},
	],
	reset: function(item){
		item.setAttr('value', '4');
	}
};

var helpers = {
	capitalize: function (item, index) {
		return item.toUpperCase(item.title);
	},
	fake:function(){
		alert('fake');
	},
	new: function () {
		return true;
	},
	reset: function(item){
		item.setAttr('title', 'default title');
		item.setAttr('name', 4);
	}
};

$(function () {
	var app = new notApp({
		//url from which will take interfaceManifest json file
		interfaceManifestURL: './js/manifest.json',
		siteManifest: {
			//routie route desription: controller name, real controller is function preffixed with 'nc', ncMain, ncPublication
			'': 'main',
		},
		//base controller, executed on every site page before any other controller
		initController: 'init',
		//form auto generation
		forms: {
			//common is for profile
			//associated object is options for generator object
			//default generator notForm
			common: {
				templateUrl: './templates/elements.html'
			}
		}
	}).exec();

	//var form = new notForm({});

	notTemplateCache.load({
		complexTemplate: './templates/complexTemplate.html',
		manyTemplate: './templates/manyTemplate.html',
		complexTemplatePart: './templates/complexTemplatePart.html',
		complexTemplatePart2: './templates/complexTemplatePart2.html',
	});
	notTemplateCache.onLoad = function(){
		var complexElementContent = (new notTemplate({
			templateURL: './templates/complexTemplate.html',
			data: dataComplex,
			helpers: helpers,
		})).execAndPut(document.getElementById('complexElement'));

		var complexElementContent = (new notTemplate({
			templateName: 'complexTemplate',
			data: dataComplex,
			helpers: helpers,
		})).execAndPut(document.getElementById('complexElement2'));
	};

	var singleElementContent = (new notTemplate({templateName: 'singleTemplate', data:dataSetSingle, helpers: helpers})).exec();
	console.log(singleElementContent);
	$('#singleElement').append(singleElementContent);

	var selectElementContent = (new notTemplate({templateName: 'selectTemplate', data:dataForSelect, helpers: selectHelpers})).exec();
	$('#selectElement').append(selectElementContent);


	var manyElementsContent = (new notTemplate({
		templateURL: './templates/templateMany.html',
		helpers: helpers,
		data: dataSetArray
	})).exec(
		function (manyElementsContent) {
			console.log(manyElementsContent);
			$('#manyElements').append(manyElementsContent);
		});





});
