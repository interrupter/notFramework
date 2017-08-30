const
	//interface
	OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY = ['_id', 'id', 'ID'],
	DEFAULT_FILTER = {},
	DEFAULT_PAGE_NUMBER = 1,
	DEFAULT_PAGE_SIZE = 10,
	//property
	META_RETURN_TO_ROOT = Symbol('returnToRoot'),
	META_PROXY = Symbol('proxy'),
	//record
	META_ACTIVE = Symbol('active'),
	META_INTERFACE = Symbol('interface'),
	META_CHANGE = Symbol('change'),
	META_CHANGE_NESTED = Symbol('change.nested'),
	META_SAL = [
		'getAttr',
		'getAttrs',
		'isProperty',
		'isRecord',
		'getManifest',
		'setAttr',
		'setAttrs',
		'getData',
		'setData',
		'getJSON',
		'__setPassive',
		'__setActive',
		'__isActive',
		'on',
		'off',
		'trigger'
	],
	META_MAP_TO_INTERFACE = [
		'getActionsCount',
		'getActions',
		'setFindBy',
		'resetFilter',
		'setFilter',
		'getFilter',
		'setSorter',
		'getSorter',
		'resetSorter',
		'setPageNumber',
		'setPageSize',
		'setPager',
		'resetPager',
		'getPager',
		'addFormFieldType',
		'addFormField',
		'getFieldTypes',
		'getActionFormFields'
	],
	DEFAULT_ACTION_PREFIX = '$';

export {
	OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY,
	DEFAULT_FILTER,
	DEFAULT_PAGE_NUMBER,
	DEFAULT_PAGE_SIZE,
	META_RETURN_TO_ROOT,
	META_PROXY,
	META_INTERFACE,
	META_ACTIVE,
	META_CHANGE,
	META_CHANGE_NESTED,
	META_SAL,
	META_MAP_TO_INTERFACE,
	DEFAULT_ACTION_PREFIX
};
