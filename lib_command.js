/* Soramame.ps.js から Processing.jsへの変換辞書
*/

function lib_command() {

  //変換候補データ
  //元データ ： [関数=true グローバル変数=false, 変換先データ]
  this.dic = {
  	//Structure
	サイズ : [true, 'size'],
	設定する : [true, 'setup'],
	くり返し描画する : [true, 'draw'],

	//Environment
	幅 : [false, 'width'],
	高さ : [false, 'height'],
	コマ数 : [true, 'frameRate'],
	
	//2D Primitives
	テン : [true, 'point'],
	セン: [true, 'line'],
	マル : [true, 'ellipse'],
	サンカク : [true, 'triangle'],
	シカク : [true, 'rect'],
	円弧 : [true, 'arc'],
	四辺形 : [true, 'quad'],

	//Attributes
	輪郭幅 : [true, 'strokeWeight'],

	//Mouse 
	クリック時 : [true, 'mouseClicked'],
	ドラッグ時 : [true, 'mouseDragged'],
	マウスX : [false, 'mouseX'],
	マウスY : [false, 'mouseY'],

	//Color
	//setting
	背景色 : [true, 'background'],
	輪郭色 : [true, 'stroke'],
	輪郭なし : [true, 'noStroke'],
	塗りつぶし色 : [true, 'fill'],
	塗りつぶしなし : [true, 'noFill'],

	//test
	test : [false, '//SoraMame Script!']};
}

lib_command.prototype.get = function(str,arg){
	var msg;
    if ( this.dic[str] === undefined ) {
		msg = str;
	} else {
		if(this.dic[str][0]) {
			msg = this.dic[str][1] + '(' + arg +')'; //function
		} else {
			msg = this.dic[str][1]; //global vars
		}
    }
	return msg;
}