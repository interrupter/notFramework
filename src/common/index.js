import CommonNetwork from './net.js';
import CommonLogs from './logs.js';
import CommonShorts from './shorts.js';
import CommonObjects from './objects.js';
import CommonStrings from './strings.js';
import CommonFunctions from './functions.js';
import CommonDOM from './dom.js';
import CommonApp from './app.js';

/*
	список того что нужно подключить как общие
*/
var notCommon = Object.assign({}, CommonObjects);

notCommon.extendWith(CommonNetwork);
notCommon.extendWith(CommonStrings);
notCommon.extendWith(CommonLogs);
notCommon.extendWith(CommonShorts);
notCommon.extendWith(CommonFunctions);
notCommon.extendWith(CommonDOM);
notCommon.extendWith(CommonApp);

export default notCommon;
