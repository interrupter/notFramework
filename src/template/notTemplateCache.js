import notCommon from '../common';
import notBase from '../notBase';
import OPTS from './options';
const META_CACHE = Symbol('cache');

class notTemplateCache extends notBase{

	constructor() {
		super();
		this[META_CACHE] = {};
		this.setWorking('loading', []);
		this.hideTemplates();
		this.register();
		return this;
	}

	hideTemplates(){
		let t = document.createElement('style');
		t.innerHTML = OPTS.TEMPLATE_TAG + '{display: none;}';
		document.head.appendChild(t);
	}

	register() {
		notCommon.register('templateCache', this);
	}

	load(map) {
		this.setWorking('loading', []);
		for (var i in map) {
			this.loadOne(i, map[i]);
		}
	}

	loadOne(key, url, callback) {
		var oRequest = new XMLHttpRequest();
		oRequest.open('GET', url);
		oRequest.addEventListener('load', function(response) {
			var div = document.createElement('DIV');
			div.dataset.notTemplateName = key;
			div.dataset.notTemplateURL = url;
			div.innerHTML = response.srcElement.responseText;
			this.setOne(key, div);
			callback && callback(key, url, div);

		}.bind(this));
		oRequest.send();
	}

	ifAllLoaded(){
		if (this.getWorking('loading').length === 0) {
			this.trigger('loaded');
		}
	}

	setOne(key, element) {
		if(element instanceof HTMLElement){
			this[META_CACHE][key] = element;
		}else{
			this.addFromText(key, element);	
		}
	}

	get(key) {
		return this[META_CACHE].hasOwnProperty(key) ? this[META_CACHE][key].cloneNode(true) : null;
	}

	getNames(){
		return Object.keys(this[META_CACHE]);
	}

	getByURL(url) {
		for (var i in this[META_CACHE]) {
			if (this[META_CACHE][i].src == url) {
				return this.get(i);
			}
		}
		return null;
	}
	/*----------------------------------------------------------------------------*/
	//	New API
	/*----------------------------------------------------------------------------*/

	setLoaded(key){
		let t = this.getWorking('loading').indexOf(key);
		if (t > -1) {
			this.getWorking('loading').splice(t, 1);
		}
		this.getWorking('loaded').push('key');
	}

	wrap(key, url, innerHTML){
		var cont = document.createElement(OPTS.TEMPLATE_TAG);
		cont.name = key;
		cont.src = url;
		cont.innerHTML = innerHTML;
		return cont;
	}

	parseLib(text){
		let cont = document.createElement('div');
		let result = {};
		cont.innerHTML = text;
		let notTemplatesElements = cont.querySelectorAll(OPTS.TEMPLATE_TAG);
		for(let elId =0; elId< notTemplatesElements.length; elId++){
			let el = notTemplatesElements[elId];
			if (el.parentNode === cont){
				if (el.attributes.name && el.attributes.name.value){
					result[el.attributes.name.value] = el;
				}
			}
		}
		return result;
	}

	addLib(lib){
		for(let t in lib){
			this.setOne(t, lib[t]);
		}
		return this;
	}

	addFromURL(key, url) {
		return new Promise((resolve, reject)=> {
			if (this.get(key)){
				resolve(this.get(key));
			}else{
				//that.setLoading(key, url);
				notCommon.getHTML(url)
					.then((templateInnerHTML)=>{
						let templateContEl = this.wrap(key, url, templateInnerHTML);
						this.setOne(key, templateContEl);
						resolve(this.get(key));
					}).catch(()=>{
						notCommon.error('error loading template', key, url);
						reject(...arguments);
					});
			}
		});
	}

	addLibFromURL(url) {
		return new Promise((resolve, reject) => {
			notCommon.getHTML(url)
				.then((templatesHTML)=>{
					let templates = this.parseLib(templatesHTML);
					this.addLib(templates);
					resolve(templates);
				}).catch((e)=>{
					notCommon.error('error loading templates lib', url,e);
					reject(...arguments);
				});
		});
	}

	addFromDocument(selectorOrElement){
		let el = (typeof selectorOrElement === 'string')?document.querySelector(selectorOrElement):selectorOrElement;
		if (el.attributes.name && el.attributes.name.value){
			if (el.tagName.toLowerCase() === OPTS.TEMPLATE_TAG.toLowerCase()){
				this.setOne(el.attributes.name.value, el);
			}
		}
		return this;
	}

	addFromText(key, templateInnerHTML){
		let templateContEl = this.wrap(key, '', templateInnerHTML);
		this.setOne(key, templateContEl);
		return this;
	}
}

export default new notTemplateCache();
