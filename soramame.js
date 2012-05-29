function soramame(source){
  // ソースコード
  this.source = source;

  // 助詞
  this.josi = [
	"は", "の", "に", "で", "を", "する",
	"◎", "●",
	"だけ", "しい",
  ];
  
  this.josi2 = new RegExp("^[◎|●|は|の|に|で|を|する]");

  // 文字列リテラル
  this.string_literal = [["「", "」"], ["『", "』"], ["”", "”"], ['"', '"'], ["‘", "‘"], ["`", "`"]];

  // 文の終端記号
  this.CRLF = ["\n", "\r", "。"];

  // 単位記号
  this.unit = [
    "メートル", "ドット", "つ目", "つめ", "個目", "個", "円", "つ", "本", "冊", 
    "px", "pt", "cm", "mm", "m", "kg", "g"
  ];

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

  // 1文を取り出す
  var line = this.source;
  var l = this.CRLF.length;
  for(var i = 0; i < l; i++){
    var CRLF = this.CRLF[i];
    var p = this.source.indexOf(CRLF);
    if(p > 0){
      line = this.source.substring(0, p);
    }
  }

  // 文字列
  var l = this.string_literal.length;
  for(var i = 0; i < l; i++){
    var sl = this.string_literal[i];
    if(line.charAt(0) != sl[0]){
      continue;
    }

    // 文字列を取り出す
    line = line.substring(1);
    var p = line.indexOf(sl[1]);
    var token = line;
    if(p > 0){
      token = line.substring(0, p);
      p += 2;
    } else {
      p = line.length;
    }
    this.source = this.source.substring(p);
    this.yylval = token;
    return STRING;
  }


  // 助詞
  var p = line.match(this.josi2);
  if (p != null) {
	var josi = p[0];
	line = line.substring(josi.length);
	this.source = this.source.substring(josi.length);
    this.yylval = josi + "";
	return JOSI;
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

    // 単位
    var line = line.substring(i);;
    var l = this.unit.length;
    for(var i = 0; i < l; i++){
      var unit = this.unit[i];
      p = line.indexOf(unit);
      if(p != 0){
        continue;
      }

      // 単位を読み飛ばす
      this.source = this.source.substring(unit.length);
      break;
    }

    return NUMBER;
  }


  // 演算子
  var c = this.isoperator(line.charAt(0));
  if(c){
    this.source = this.source.substring(1);
    this.yylval = c;
    return c.charCodeAt(0);
  }


  // 単語
  var token = line.match(/^[^0123456789+-\/%^(){},:０１２３４５６７８９＋－×＊÷／％＾（）｛｝、：]+/);
  if(token){
    token = String(token);
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
  var l = this.CRLF.length;
  for(var i = 0; i < l; i++){
    if(c == this.CRLF[i]){
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
  return false;
}


soramame.prototype.isoperator = function(c){
  switch(c){
  case "+":
  case "-":
  case "*":
  case "/":
  case "^":
  case "(":
  case ")":
  case "{":
  case "}":
  case ",":
  case ":":
    return c;

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
  case "｛":
  case "｝":
  case "、":
  case "：":
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
  var hankaku = "0123456789+-**//%^(){},:";
  var zenkaku = "０１２３４５６７８９＋－×＊÷／％＾（）｛｝、：";
  return hankaku.charAt(zenkaku.indexOf(c));
}


soramame.prototype.debug = function(str){
  this.Escreen.innerHTML += str+"<br />\n";
}


soramame.prototype.debug_clean = function(){
  this.Escreen.innerHTML = '';
}
