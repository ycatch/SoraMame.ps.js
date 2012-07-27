/* Soramame.ps.js から Processing.jsへの変換辞書
*/

function lib_global_vars() {

  this.dic = {
	//Mouse 
	マウスX : 'mouseX',
	マウスY : 'mouseY',

	//test
	test : '//SoraMame!'};
}

lib_global_vars.prototype.get = function(str){
	var msg;
    if ( this.dic[str] === undefined ) {
		msg = str;
	} else {
    	msg = this.dic[str];
    }
	return msg;
}