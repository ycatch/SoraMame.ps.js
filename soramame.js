function soramame(source){
  // ソースコード
  this.source = source;

  // 文の終端記号
  this.CRLF0 = ["\n", "\r", "。"];

  // 文の終端記号
  var pat_CRLF = "(。|\n|\r)+";
  var pat_CRLF2 = "。";
  this.CRLF = new RegExp("^" + pat_CRLF);
  this.CRLF3 = new RegExp(pat_CRLF);

  //行コメント
　　var pat_comment_line = "\/\/";
  this.comment_line = new RegExp("^" + pat_comment_line);
  
  //ブロックコメント-開始
　　var pat_comment_block_start = "\/\*";
  this.comment_block_start = new RegExp("^" + pat_comment_block_start);

  //ブロックコメント-終了
　　var pat_comment_block_end = "\/\*";
  this.comment_block_end = new RegExp("^" + pat_comment_block_end);
  
  //予約語 - 登録時は、parse.jsy も修正すること
　　var pat_yoyaku = "^---|^===|^[\+]{3}|^もし|^ならば|^ちがえば|^あいだ|^くりかえし|^新しい|^新しく";
  this.yoyaku = new RegExp(pat_yoyaku);
  
  // 助詞  
  var pat_josi = "[はのをとにで]";	//助詞の判定用
  var pat_josi2 = "はのをとにで";	//助詞以外の判定用
  this.josi = new RegExp("^" + pat_josi);

  // 文字列リテラル
  var pat_kakko = "(「.*」|『.*』)";
  var pat_kakko2 = "「」『』";
  this.string_literal = new RegExp("^" + pat_kakko);
  
  // 数字
  var pat_num2 = "0123456789０１２３４５６７８９";
 
  // 16進表示の数字
 　var par_num_hex = "#([0-9]|[a-f]|[A-F])+"
  this.num_hex = new RegExp("^" + par_num_hex);
 
 　// 記号
  var pat_symbol2 = "\*=\+\-\/%^\(\)\[\\]{}@!&|<>\.,:＝＋－×＊÷／％＾（）［］｛｝．、：＠！＆｜＜＞";
  
  // 空白
  var pat_space2 = " 　"

  //単語(識別子)
  var pat_word1 = "[^" + pat_josi2 + pat_kakko2 + pat_symbol2 + pat_CRLF2 + pat_num2 + pat_comment_block_start + pat_comment_block_end + "]";
  var pat_word2 = "[^" + pat_josi2 + pat_kakko2 + pat_symbol2 + pat_CRLF2 + pat_space2 + pat_comment_block_start + pat_comment_block_end + "]";
  this.word = new RegExp("^" + pat_word1 + pat_word2 + "*");
  
  // その他
  this.yylval;
  this.Escreen = document.getElementById("screen");
  this.debug_clean();
}


soramame.prototype.yylex = function(){
  var retval = WORD;

    // 文の終端を読み飛ばす
  while(this.isCRLF(this.source.charAt(0))){
    this.source = this.source.substring(1);
  }
  
/*   // 文の終端を読み飛ばす
  var p = this.source.match(this.CRCF);
  if (p != null) {
	this.source = this.source.substring(p[0].length);
  } */

  //スペース(全角、半角)とタブを読み飛ばす
  p = this.source.match(/^[\s　]+/);
  if (p != null) {
	this.source = this.source.substring(p[0].length);
  }

  // 1文を取り出す
  var line = this.source;
  var l = this.CRLF0.length;
  for(var i = 0; i < l; i++){
    var CRLF0 = this.CRLF0[i];
    var p = this.source.indexOf(CRLF0);
    if(p > 0){
      line = this.source.substring(0, p);
    }
  }

  //行コメント
  p = line.match(this.comment_line);
  if (p != null) {
    var index = line.indexOf("\n");
	if (index != "-1") {
		line = line.substr(0, index);
	}
	this.source = this.source.substr(line.length);
	this.yylval= line + "";
	return COMMENT;
  }
  
  // 文字列
  p = line.match(this.string_literal);
  if (p != null) {
  	var bracket = "'";
    if (p[0].substring(0,1) == "『") {
		bracket = '"';
	}
	var line = bracket + p[0].substring(1, p[0].length - 1) + bracket;
	
	this.source = this.source.substring(p[0].length);
    this.yylval = line + "";
	return STRING;
  }
  
  // 予約語
  p = line.match(this.yoyaku);
  if (p != null) {
	var yoyaku = p[0];
	this.source = this.source.substring(yoyaku.length);
    this.yylval = yoyaku + "";
	var yoyaku_token;
	switch(this.yylval){
		case '---':
			yoyaku_token = DEF_FUNC;
			break;
		case '===':
			yoyaku_token = DEF_CLASS;
			break;
		case '+++':
			yoyaku_token = DEF_CLASS_INIT;
			break;
		case 'もし':
			yoyaku_token = IF;
			break;
		case 'ならば':
			yoyaku_token = THEN;
			break;
		case 'ちがえば':
			yoyaku_token = ELSE;
			break;
		case 'あいだ':
			yoyaku_token = LOOP;
			break;
		case 'くりかえし':
			yoyaku_token = LOOP;
			break;
		case '新しい':
			yoyaku_token = NEW;
			break;
		case '新しく':
			yoyaku_token = NEW;
			break;
		}
	return yoyaku_token;
  }
  
  // 助詞
  p = line.match(this.josi);
  if (p != null) {
	var josi = p[0];
	this.source = this.source.substring(josi.length);
    this.yylval = josi + "";
	var yoyaku_token;
	switch(this.yylval){
		case 'は':
			yoyaku_token = JOSI_HA;
			break;
		/*case 'の':
			yoyaku_token = JOSI_NO;
			break; */
		case 'を':
			yoyaku_token = JOSI_WO;
			break;
		default:
			yoyaku_token = JOSI;
			break;
	}
	return yoyaku_token;
  }

  // 数字
  if(this.isdigit(line.charAt(0))){
    var token = '';
    var l = line.length;
    for(var i = 0; i < l; i++){
      var c = this.isdigit(line.charAt(i));
      if(!c){
        break;
      }
      token += c;
    }
    this.source = this.source.substring(i);
    this.yylval = token - 0;
	return NUMBER;
  }

  // 16進表記の数値
  p = line.match(this.num_hex);
  if (p != null) {
	var line = p[0];	
	this.source = this.source.substring(p[0].length);
    this.yylval = line + "";
	return NUMBER;
  }
  
  // 記号
  var c = this.issymbol(line.charAt(0));
  if(c){
    this.source = this.source.substring(1);
    this.yylval = c;
    return c.charCodeAt(0);
  }


  // 単語
  var token = line.match(this.word);
  if(token != null){
    token = String(token[0]);
  } else {
    token = "";
  }
  if(token){
    this.source = this.source.substring(token.length);
  } else {
    token = line;
    this.source = this.source.substring(line.length);
  }
  this.yylval = token;
  if(!token){
    retval = 0;
  }
  return retval;
  /*
  this.debug("line = "+line);
  this.debug("token.length = "+token.length);
  this.debug("this.source = "+this.source);
  this.debug("this.source = "+this.source);
  */
}

soramame.prototype.isCRLF = function(c){
  var l = this.CRLF0.length;
  for(var i = 0; i < l; i++){
    if(c == this.CRLF0[i]){
      return true;
    }
  }
  return false;
}

soramame.prototype.isdigit = function(c){
  if('0' <= c && c <= '9'){
    return c;
  }
  if('０' <= c && c <= '９'){
    return this.zen2han(c);
  }
  if(c == '.'){
    return c;
  }
  if(c == '．'){
    return this.zen2han(c);
  }
  return false;
}


soramame.prototype.issymbol = function(c){
  switch(c){
  case "=":
  case "+":
  case "-":
  case "*":
  case "/":
  case "^":
  case "(":
  case ")":
  case "[":
  case "]":
  case "{":
  case "}":
  case ",":
  case ":":
  case "@":
  case "!":
  case "&":
  case "|":
  case "<":
  case ">":
    return c;

  case "＝":
  case "＋":
  case "－":
  case "×":
  case "＊":
  case "÷":
  case "／":
  case "％":
  case "＾":
  case "（":
  case "）":
  case "［":
  case "］":
  case "｛":
  case "｝":
  case "、":
  case "：":
  case "＠":
  case "！":
  case "＆":
  case "｜":
  case "＜":
  case "＞":
  return this.zen2han(c);
  }

  switch(c.charCodeAt(0)){
  case 65288:
    return c;
    return this.zen2han(c);
  }

  return false;
}


soramame.prototype.zen2han = function(c){
  var hankaku = "0123456789=+-**//%^()[]{}.,:@!&|<>";
  var zenkaku = "０１２３４５６７８９＝＋－×＊÷／％＾（）［］｛｝．、：＠！＆｜＜＞";
  return hankaku.charAt(zenkaku.indexOf(c));
}


soramame.prototype.debug = function(str){
  str = str.replace(/\</g, "&lt");
  str = str.replace(/\>/g, "&gt");
  this.Escreen.innerHTML += str+"<br />\n";
}


soramame.prototype.debug_clean = function(){
  this.Escreen.innerHTML = '';
}
