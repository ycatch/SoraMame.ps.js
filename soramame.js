function nadesico(source){
  // ������������
  this.source = source;

  // ����
  this.josi = [
    "�Ǥʤ����", "�ˤĤ���", "�ʤ��", "�ޤǤ�", "�ޤǤ�", "���餤", "�ʤΤ�",
    "�Ȥ���", "�Ȥ�", "�ʤ�", "����", "�ޤ�", "����", "����", "���", "�ۤ�",
    "�ʤ�", "�ä�", "�Ǥ�", "��", "��", "��", "��", "��", "��", "��", "��", "��"
  ];

  // ʸ�����ƥ��
  this.string_literal = [["��", "��"], ["��", "��"], ["��", "��"], ['"', '"'], ["��", "��"], ["`", "`"]];

  // ʸ�ν�ü����
  this.CRLF = ["\n", "\r", "��"];

  // ñ�̵���
  this.unit = [
    "�᡼�ȥ�", "�ɥå�", "����", "�Ĥ�", "����", "��", "��", "��", "��", "��", 
    "px", "pt", "cm", "mm", "m", "kg", "g"
  ];

  // ����¾
  this.yylval;
  this.Escreen = document.getElementById("screen");
  this.debug_clean();
}


nadesico.prototype.yylex = function(){
  var retval = WORD;

  // ʸ�ν�ü���ɤ����Ф�
  while(this.isCRLF(this.source.charAt(0))){
    this.source = this.source.substring(1);
  }

  // 1ʸ����Ф�
  var line = this.source;
  var l = this.CRLF.length;
  for(var i = 0; i < l; i++){
    var CRLF = this.CRLF[i];
    var p = this.source.indexOf(CRLF);
    if(p > 0){
      line = this.source.substring(0, p);
    }
  }

  // ʸ����
  var l = this.string_literal.length;
  for(var i = 0; i < l; i++){
    var sl = this.string_literal[i];
    if(line.charAt(0) != sl[0]){
      continue;
    }

    // ʸ�������Ф�
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


  // ����
  var l = this.josi.length;
  for(var i = 0; i < l; i++){
    var josi = this.josi[i];
    p = line.indexOf(josi);
    if(p > 0){
      line = line.substring(0, p);
      break;
    } else if(p < 0){
      continue;
    }

    // �������Ф�
    this.source = this.source.substring(josi.length);
    this.yylval = josi;
    switch(josi){
    case "��":
      return "=".charCodeAt(0);
    default:
      return JOSI;
    }
  }


  // ����
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

    // ñ��
    var line = line.substring(i);;
    var l = this.unit.length;
    for(var i = 0; i < l; i++){
      var unit = this.unit[i];
      p = line.indexOf(unit);
      if(p != 0){
        continue;
      }

      // ñ�̤��ɤ����Ф�
      this.source = this.source.substring(unit.length);
      break;
    }

    return NUMBER;
  }


  // �黻��
  var c = this.isoperator(line.charAt(0));
  if(c){
    this.source = this.source.substring(1);
    this.yylval = c;
    return c.charCodeAt(0);
  }


  // ñ��
  var token = line.match(/^[^0123456789+-\/%^()���������������������ܡݡߡ��ࡿ�󡰡ʡ�]+/);
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


nadesico.prototype.isCRLF = function(c){
  var l = this.CRLF.length;
  for(var i = 0; i < l; i++){
    if(c == this.CRLF[i]){
      return true;
    }
  }
  return false;
}


nadesico.prototype.isdigit = function(c){
  if('0' <= c && c <= '9'){
    return c;
  }
  if('��' <= c && c <= '��'){
    return this.zen2han(c);
  }
  if(c == '.'){
    return c;
  }
  return false;
}


nadesico.prototype.isoperator = function(c){
  switch(c){
  case "+":
  case "-":
  case "*":
  case "/":
  case "^":
  case "(":
  case ")":
    return c;

  case "��":
  case "��":
  case "��":
  case "��":
  case "��":
  case "��":
  case "��":
  case "��":
  case "��":
  case "��":
    return this.zen2han(c);
  }

  switch(c.charCodeAt(0)){
  case 65288:
    return c;
    return this.zen2han(c);
  }

  return false;
}


nadesico.prototype.zen2han = function(c){
  var hankaku = "0123456789+-**//%^()";
  var zenkaku = "���������������������ܡݡߡ��ࡿ�󡰡ʡ�";
  return hankaku.charAt(zenkaku.indexOf(c));
}


nadesico.prototype.debug = function(str){
  this.Escreen.innerHTML += str+"<br />\n";
}


nadesico.prototype.debug_clean = function(){
  this.Escreen.innerHTML = '';
}
