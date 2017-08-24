import 'babel-polyfill/dist/polyfill';

/*
	Common functions
*/
import notCommon from './common';
/*
	framework wide parser for data access
*/
import notPath from './notPath';
import notRouter from './notRouter';

import notAPI from './api';
/*
	basic event handlers and core data modifiers
*/
import notBase from './notBase';
/*
	smarter image control
*/
import notImage from './template/notImage';
/*
	application main infrastructure setter
*/
import notApp from './notApp';
/*
	user controllers
*/
import notController from './notController';

import {
	CRUDController,
	CRUDCreate,
	CRUDDelete,
	CRUDDetails,
	CRUDList,
	CRUDUpdate
} from './CRUD';

/*
	templating and common structures
*/

import notRenderer from './template/notRenderer'; // only parsing and replacing
import notTemplateCache from './template/notTemplateCache'; // only parsing and replacing
import notTemplateProcessors from './template/notTemplateProcessors'; // only parsing and replacing
import notTemplateProcessorsLib from './template/notTemplateProcessorsLib'; // only parsing and replacing
import notComponent from './template/notComponent'; // smarter with bindings for events, actualy proxy

import notForm from './components/notForm';
import notTable from './components/notTable';
import notDetails from './components/notDetails';
import notScroll from './components/notScroll';

import notRecord from './record'; //	wrapper for data with server<->view live interactions
import {
	notRecordInterface
} from './record'; //	how to interact with data on server

notTemplateProcessors.add(notTemplateProcessorsLib);

export {
	notCommon,
	notPath,
	notBase,
	notImage,
	notApp,
	notAPI,
	notController,
	CRUDController,
	CRUDCreate,
	CRUDDelete,
	CRUDDetails,
	CRUDList,
	CRUDUpdate,
	notTemplateProcessors,
	notTemplateProcessorsLib,
	notTemplateCache,
	notRenderer,
	notComponent,
	notForm,
	notScroll,
	notRouter,
	notTable,
	notDetails,
	notRecord,
	notRecordInterface
};
