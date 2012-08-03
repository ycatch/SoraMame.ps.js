/* Soramame.ps.js から Processing.jsへの変換辞書
*/

function lib_dic() {

  this.num = 0;

  //変換候補データ - 命令
  //元データ ： 変換先データ
  this.commands = {
  	//Structure
	サイズ : 'size',
	初期設定する : 'setup',
	くり返し描画する : 'draw',
	もどる : 'return',
	
	//Environment
	コマ数 : 'frameRate',
	
	//2D Primitives
	テン : 'point',
	セン: 'line',
	マル : 'ellipse',
	サンカク : 'triangle',
	シカク : 'rect',
	円弧 : 'arc',
	四辺形 : 'quad',

	//Attributes
	輪郭幅 : 'strokeWeight',

	//Input - Mouse 
	クリック時 : 'mouseClicked',
	ドラッグ時 : 'mouseDragged',

	//Color
	//setting
	背景色 : 'background',
	輪郭色 : 'stroke',
	輪郭なし : 'noStroke',
	塗りつぶし色 : 'fill',
	塗りつぶしなし : 'noFill',

	//test
	test : '//SoraMame Script!'};

  //変換候補データ - 環境変数
  //元データ ： 変換先データ
  this.vars = {

	//Environment
	幅 : 'width',
	高さ : 'height',
	
	//Input - Mouse
	マウスX : 'mouseX',
	マウスY : 'mouseY',
	
	//test
	test : '//SoraMame Script!'};
}

lib_dic.prototype.get_comm = function(str, arg){
	var msg;
    if ( this.commands[str] === undefined ) {
		this.commands[str] = "func_" + this.num;
		this.num += 1;
	}
	msg = this.commands[str] + '(' + arg +')'; //function
	return msg;
}


lib_dic.prototype.get_vars = function(str, arg){
	var msg;
    if ( this.vars[str] === undefined ) {
		msg = str;
	} else {
		msg = this.vars[str]; //vars of environment
    }
	return msg;
}
