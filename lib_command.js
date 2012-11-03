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
	
	//Control
	あいだ : 'while',
	くりかえし : 'for',
	もし : 'if',
	ならば : '', //Processing.jsでは該当語は省略される
	ちがえば : 'else', //SoraMame.ps.jsでは、parse.jsyで直接指定
	
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
	
	//Creating & Reading
	色指定する : 'color',

	//Typography
	//Loading & Displaying
	フォント読み込みする : 'loadFont',
	もじ表示する : 'text',
	フォント設定する : 'textFont',

	//attributes
	もじサイズ : 'textSize',

	//Math - Calculation
	ルート : 'sqrt',	
	距離 : 'dist',

	//Math - Trigonometry
	Sin : 'sin',	
	Cos : 'cos',

	//Math - Random
	乱数 : 'random',
	
	//test
	test : '//SoraMame Script!'};

  //変換候補データ - 環境変数
  //元データ ： 変換先データ
  this.vars = {

    //Structure
	これ : 'this',
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

	//定数 - Constants
	PI : 'PI',
	HALF_PI : 'HALF_PI',
	TWO_PI : 'TWO_PI',
	QUARTER_PI : 'QUARTER_PI',

	//test
	test : 'vars name'};

  //変換候補データ - データ型名
  //元データ ： 変換先データ
  this.types = {

	//Primitive
	整数型 : 'int',
	実数型 : 'float',
	文字型 : 'char',	
	正否型 : 'boolean',
	カラー型 : 'color',
	
	//Composite
	文字列型 : 'String',

	//Math
	Pベクトル型 : 'PVector',

	//Typography
	Pフォント型 : 'PFont',
	
	//test
	test : 'types'};
	
	//変換候補データ
	//データ型-プロパティ 
	this.type_property = {
	
	//Math
	PVector : '',
	PVector_x : 'x',
	PVector_y : 'y',
	PVector_z : 'z',
	PVector_取りだし : 'get',
	PVector_設定する : 'set',

	//test
	test : '//type_property'};
	
	//変換候補データ
	//変数名-データ型
	this.vars_type = {
	
	//test
	test : '//vars_type'};
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

lib_dic.prototype.set_vars_type = function(vars_name, type_name){
    if ( this.type_property[type_name] != undefined ) {
		this.vars_type[vars_name] = type_name;
	}
	return;
}

lib_dic.prototype.get_property = function(vars_name, property){
	var msg;
    if ( this.vars_type[vars_name] === undefined ) {
		msg = lib_dic.get_vars(property, '');
	} else {
		var keyword = this.vars_type[vars_name] + '_' + property;
		msg = this.type_property[keyword];
	}
	return msg;
}

lib_dic.prototype.get_method = function(vars_name, method, args){
	var msg;
    if ( this.vars_type[vars_name] === undefined ) {
		msg = lib_dic.get_comm(method, '');
	} else {
		var keyword = this.vars_type[vars_name] + '_' + method;
		msg = this.type_property[keyword] + '(' + args + ')';
	}
	return msg;
}