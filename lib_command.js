/* Soramame.ps.js から Processing.jsへの変換辞書
*/

function lib_command() {

  this.dic = {
  	//Structure
	サイズ : 'size',

	//2D Primitives
	テン : 'point',
	セン: 'line',
	マル : 'ellipse',
	サンカク : 'triangle',
	シカク : 'rect',
	円弧 : 'arc',
	四辺形 : 'quad',

	//Mouse 
	マウスX : 'mouseX',
	マウスY : 'mouseY',

	//test
	test : '//SoraMame Script!'};
}

lib_command.prototype.get = function(str){
	var msg;
    if ( this.dic[str] === undefined ) {
		msg = '"' + str + '"' + 'は、定義されていない命令です。';
	} else {
    	msg = this.dic[str];
    }
	return msg;
}