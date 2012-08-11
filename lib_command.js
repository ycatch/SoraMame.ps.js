/* Soramame.ps.js から Processing.jsへの変換辞書
*/

function lib_dic() {

  this.func_num = 0;
  this.vars_num = 0;
  this.type_num = 0;
  
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

	//attributes
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

	//Typography
	//Loading & Displaying
	もじ表示 : 'text',

	//attributes
	もじサイズ : 'textSize',
	
	//test
	test : '//SoraMame Script!'};

  //変換候補データ - 環境変数
  //元データ ： 変換先データ
  this.vars = {

    //Structure
	正 : 'true',
	否 : 'false',

	//Environment
	幅 : 'width',
	高さ : 'height',
	
	//Input - Mouse
	マウスX : 'mouseX',
	マウスY : 'mouseY',
	マウスx : 'mouseX',
	マウスy : 'mouseY',
	
	//test
	test : '//SoraMame Script!'};

  //変換候補データ - データ型命
  //元データ ： 変換先データ
  this.types = {

	//Primitive
	整数型 : 'int',
	実数型 : 'float',
	文字型 : 'char',	
	正否型 : 'boolean',
	カラー型 : 'color',
	
	//test
	test : '//SoraMame Script!'};
}

lib_dic.prototype.get_comm = function(str, arg){
	var msg;
    if ( this.commands[str] === undefined ) {
		this.commands[str] = "func_" + this.func_num;
		this.func_num += 1;
	}
	msg = this.commands[str] + '(' + arg +')'; //function
	return msg;
}

lib_dic.prototype.get_vars = function(str, arg){
	var msg;
    if ( this.vars[str] === undefined ) {
		//msg = str;
		this.vars[str] = "vars_" + this.vars_num;
		this.vars_num += 1;
	}
	msg = this.vars[str]; //vars of environment
	return msg;
}

lib_dic.prototype.get_types= function(str, arg){
	var msg;
    if ( this.types[str] === undefined ) {
		this.types[str] = "type_" + this.type_num;
		this.type_num += 1;
	}
	msg = this.types[str]; //Data types
	return msg;
}