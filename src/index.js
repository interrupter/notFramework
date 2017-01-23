/*
	Common functions
*/
import notCommon from './notCommon';
/*
	framework wide parser for data access
*/
import notPath from './notPath';
/*
	basic event handlers and core data modifiers
*/
import notBase from './notBase';
/*
	smarter image control
*/
import notImage from './notImage';
/*
	application main infrastructure setter
*/
import notApp from './notApp';
/*
	daddy for user controllers
*/
import notController from './notController';
/*
	templating and common structures
*/
import notTemplateProcessors from './notTemplateProcessors'; // registry of processors
import notTemplateProcessorsLib from './notTemplateProcessorsLib';// default processors
import notTemplateCache from './notTemplateCache'; // caching all the templates, and cloning for use
import notTemplate from './notTemplate'; // only parsing and replacing
import notComponent from './notComponent'; // smarter with bindings for events, actualy proxy
import notForm from './notForm';
import notTable from './notTable';
import notView from './notView';

import notRecordInterface from './notRecordInterface'; //	how to interact with data on server
import notRecord from './notRecord'; //	wrapper for data with server<->view live interactions

notTemplateProcessors.add(notTemplateProcessorsLib);

export {
	notCommon,
	notPath,
	notBase,
	notImage,
	notApp,
	notController,
	notTemplateProcessors,
	notTemplateProcessorsLib,
	notTemplateCache,
	notTemplate,
	notComponent,
	notForm,
	notTable,
	notView,
	notRecordInterface,
	notRecord
};
