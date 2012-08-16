
/* 
 * Copyright 2012 Yutaka Kachi
 * This Software is licensed under the MIT License
 * 
 */

var buffer;
var token;
var toktype;

var YYERRTOK = 256;
var NUMBER = 257;
var STRING = 258;
var JOSI = 259;
var WORD = 260;
var COMMENT = 261;
var DEF_FUNC = 262;
var DEF_CLASS = 263;
var DEF_CLASS_INIT = 264;
var IF = 265;
var THEN = 266;
var ELSE = 267;
var LOOP = 268;
var NEW = 269;
var UMINUS = 270;

  
/*
  #define yyclearin (yychar = -1)
  #define yyerrok (yyerrflag = 0)
  #define YYRECOVERING (yyerrflag != 0)
  #define YYERROR  goto yyerrlab
*/


/** Debug mode flag **/
var yydebug = false;

/** lexical element object **/
var yylval = null;

/** Dialog window **/
var yywin = null;
var yydoc = null;

function yydocopen() {
  if (yywin == null) {
    yywin = window.open("", "yaccdiag", "resizable,status,width=600,height=400");
    yydoc = null;
  }
  if (yydoc == null)
    yydoc = yywin.document;
  yydoc.open();
}

function yyprintln(msg)
{
  if (yydoc == null)
    yydocopen();
  yydoc.write(msg + "<br>");
}

function yyflush()
{
  if (yydoc != null) {
    yydoc.close();
    yydoc = null;
    yywin = null;
  }
}



var yytranslate = [
      0,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   29,   33,   33,   33,   19,   20,   33,
     30,   31,   17,   15,   26,   16,   33,   18,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   25,   33,
     27,   22,   28,   33,   32,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   23,   21,   24,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,    1,    2,    3,    4,
      5,    6,    7,    8,    9,   10,   11,   12,   13,   14,
     33
  ];

var YYBADCH = 33;
var YYMAXLEX = 271;
var YYTERMS = 33;
var YYNONTERMS = 19;

var yyaction = [
     45,   46,   47,  106,  107,  108,  194,  195,  110,  154,
     29,   30,  109,  154,  147,   67,   82,   68,   83,  108,
     39,   43,   44,    0,   29,   30,  109,   79,   43,   44,
    153,   78,  193,   40,   41,  101,   84,  186,   93,  117,
     84,   89,   90,   91,   92,-32766,-32766,-32766,   43,   44,
     98,  104,  121,  170,  126,   72,   75,  123,   85,   86,
     87,   88,   94,   95,   99,  105,  114,  118,  154,  157,
     97,   84,   50,    0,    0,  111,    0,  116,    0,  122,
    113,    0,   66,    0,    0,    0,    0,    0,    0,    0,
     51,    0,   36,   28,   54,   53,   48,   35,   38,   37,
     52,   55,    0,  129,  127,  125,  124,   80,   79,  131,
    132,  133,  130,  128,    0,   96,  100,  102,  120,  115,
    156,  160,  161,  158,  162,  159,  166,  165,  167,    0,
     34,   77,   56,   49,   42,    0,  112
  ];

var YYLAST = 137;

var yycheck = [
     17,   18,   19,   20,   21,   22,    2,    3,    5,    5,
     27,   28,   29,    5,    6,    7,    8,    9,   10,   22,
     16,   15,   16,    0,   27,   28,   29,   23,   15,   16,
      5,   23,    5,   29,   30,    4,   32,   31,    4,   26,
     32,   15,   16,   17,   18,   17,   18,   19,   15,   16,
      4,    4,    4,    4,   23,    5,    5,   23,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,   24,
     26,   32,   20,   -1,   -1,   11,   -1,   12,   -1,   13,
     13,   -1,   14,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     21,   -1,   22,   22,   22,   22,   22,   22,   22,   22,
     22,   22,   -1,   23,   23,   23,   23,   23,   23,   23,
     23,   23,   23,   23,   -1,   24,   24,   24,   24,   24,
     24,   24,   24,   24,   24,   24,   24,   24,   24,   -1,
     25,   25,   25,   25,   25,   -1,   26
  ];

var yybase = [
      0,    6,   13,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   33,   96,   97,   98,
     99,  100,   45,  101,   95,  102,  103,  104,   68,   73,
     72,  -17,  -17,    8,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,   28,   28,   28,
     71,   74,   74,   -3,   -3,   -3,   63,   50,   54,   25,
     51,   58,   34,   91,   92,   31,   93,   39,   55,   57,
     57,   23,   53,   84,   56,   83,   82,  105,   46,   75,
     70,   77,   76,   59,  109,   81,   47,   60,   27,   90,
     49,    3,   64,  110,   67,  108,   52,   69,   78,   79,
     80,   89,   61,   86,  107,   65,   87,   62,  106,   94,
     48,   66,   88,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,  -17,  -17,  -17,  -17,  -17,
    -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,
    -17,    8,    8,    8,    8,    8,    8,    8,    8,    8,
      8,    8,    4,    4,    4,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,  -17,  -17,  -17,   26,   26,   26,    0,    0,    0,
     85,   85,   85,   85,   85,   85,    0,   44,   44,    0,
     44
  ];

var YY2TBLSTATE = 77;

var yydefault = [
      2,32767,32767,   14,   37,   15,   16,   17,   18,   54,
     46,   47,   38,   51,   48,   49,   50,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   39,   40,    1,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   41,   42,   43,
     21,   56,32767,   53,   44,   45,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,   58,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,   36,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,   30,32767,32767,32767,32767,
  32767,32767,32767,    2,    2,    2,    2,    2,    2,    2,
      2,    2,    2,    2
  ];



var yygoto = [
      3,   10,   11,  169,  169,  169,    0,    5,    6,    7,
      8,   63,    9,    1,    0,   31,   32,   57,   58,   59,
      3,   12,   64,   65,   13,   14,   15,   16,    2,   60,
     60,   60,   60,   60,   60,   60,   60,   60,   60,   60,
    103,   70,   71,   74,   76,   60,   61,  139,  139,  139,
    139,  139,  139,  139,  139,  139,  139,  139,    0,    0,
      0,    0,    0,  139,   17,   18,   19,   20,   21,   22,
     23,   24,   25,   26,   27,    0,    0,    0,    0,    0,
      0,    0,    0,  119,    0,    0,    0,    0,    0,   62,
      0,    0,    0,    0,    0,    0,  163
  ];

var YYGLAST = 97;

var yygcheck = [
     14,   14,   14,   17,   17,   17,   -1,   14,   14,   14,
     14,   14,   14,   14,   -1,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   13,
     13,   13,   13,   13,   13,   13,   13,   13,   13,   13,
      4,   15,   15,   16,   16,   13,   13,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,   -1,   -1,
     -1,   -1,   -1,    5,    2,    2,    2,    2,    2,    2,
      2,    2,    2,    2,    2,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,    4,   -1,   -1,   -1,   -1,   -1,   13,
     -1,   -1,   -1,   -1,   -1,   -1,    5
  ];

var yygbase = [
      0,    0,  -59,    0,    6,   30,    0,    0,    0,    0,
      0,    0,    0,   12,  -28,  -26,  -36,  -66,    0
  ];

var yygdefault = [
  -32768,   81,   33,  137,  138,  189,  140,  141,  142,  143,
    144,  145,  146,  190,    4,   69,   73,  168,  191
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    4,    4,    4,    4,    4,    5,
      5,    6,    7,    7,    7,    7,    8,    9,    9,   10,
     11,   11,   12,   12,   15,   15,   17,   16,   16,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   13,   13,
     18,   18
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    3,    4,    4,    4,    4,    2,
      1,    1,    5,    7,    6,    8,    5,    5,    6,    4,
      8,   12,    8,   18,    1,    2,    4,    3,    5,    3,
      3,    3,    3,    3,    4,    4,    3,    3,    4,    4,
      4,    4,    3,    2,    2,    1,    1,    1,    2,    4,
      1,    1
  ];

var YYSTATES = 168;
var YYNLSTATES = 134;
var YYINTERRTOK = 1;
var YYUNEXPECTED = 32767;
var YYDEFAULT = -32766;

/*
 * Parser entry point
 */

function yyparse()
{
  var yyastk = new Array();
  var yysstk = new Array();

  yystate = 0;
  yychar = -1;

  yysp = 0;
  yysstk[yysp] = 0;
  yyerrflag = 0;
  for (;;) {
    if (yybase[yystate] == 0)
      yyn = yydefault[yystate];
    else {
      if (yychar < 0) {
        if ((yychar = yylex()) <= 0) yychar = 0;
        yychar = yychar < YYMAXLEX ? yytranslate[yychar] : YYBADCH;
      }

      if (((yyn = yybase[yystate] + yychar) >= 0
	    && yyn < YYLAST && yycheck[yyn] == yychar
           || (yystate < YY2TBLSTATE
               && (yyn = yybase[yystate + YYNLSTATES] + yychar) >= 0
               && yyn < YYLAST && yycheck[yyn] == yychar))
	  && (yyn = yyaction[yyn]) != YYDEFAULT) {
        /*
         * >= YYNLSTATE: shift and reduce
         * > 0: shift
         * = 0: accept
         * < 0: reduce
         * = -YYUNEXPECTED: error
         */
        if (yyn > 0) {
          /* shift */
          yysp++;

          yysstk[yysp] = yystate = yyn;
          yyastk[yysp] = yylval;
          yychar = -1;
          
          if (yyerrflag > 0)
            yyerrflag--;
          if (yyn < YYNLSTATES)
            continue;
            
          /* yyn >= YYNLSTATES means shift-and-reduce */
          yyn -= YYNLSTATES;
        } else
          yyn = -yyn;
      } else
        yyn = yydefault[yystate];
    }
      
    for (;;) {
      /* reduce/error */
      if (yyn == 0) {
        /* accept */
        yyflush();
        return 0;
      }
      else if (yyn != YYUNEXPECTED) {
        /* reduce */
        yyl = yylen[yyn];
        yyval = yyastk[yysp-yyl+1];
        /* Following line will be replaced by reduce actions */
        switch(yyn) {
        case 1:
{ return lib_dic.commands['test'] + '\n' + yyastk[yysp-(1-1)]; } break;
        case 2:
{ yyval = '';} break;
        case 3:
{ yyval = yyastk[yysp-(2-1)] + yyastk[yysp-(2-2)]+ '\n';} break;
        case 4:
{ yyval = yyastk[yysp-(1-1)] + ';' } break;
        case 5:
{ yyval = yyastk[yysp-(1-1)] + ';' } break;
        case 14:
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 15:
{ yyval = yyastk[yysp-(4-1)]  + '+=' + yyastk[yysp-(4-4)];} break;
        case 16:
{ yyval = yyastk[yysp-(4-1)]  + '-=' + yyastk[yysp-(4-4)];} break;
        case 17:
{ yyval = yyastk[yysp-(4-1)]  + '*=' + yyastk[yysp-(4-4)];} break;
        case 18:
{ yyval = yyastk[yysp-(4-1)]  + '/=' + yyastk[yysp-(4-4)];} break;
        case 19:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 20:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 21:
{yyval = yyastk[yysp-(1-1)] + ';';} break;
        case 22:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 23:
{yyval = lib_dic.get_types(yyastk[yysp-(7-4)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(7-2)],'') + '{\n' + yyastk[yysp-(7-6)] + '}';} break;
        case 24:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(6-3)],yyastk[yysp-(6-2)]) + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 25:
{yyval = lib_dic.get_types(yyastk[yysp-(8-5)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(8-3)],yyastk[yysp-(8-2)]) + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
        case 26:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 27:
{yyval = lib_dic.get_types(yyastk[yysp-(5-2)],'') + '()' + ' {\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 28:
{yyval = lib_dic.get_types(yyastk[yysp-(6-3)],'') + '(' + yyastk[yysp-(6-2)] + ') ' + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 29:
{ yyval = yyastk[yysp-(4-1)] + ' = new ' + yyastk[yysp-(4-4)] + ';'; } break;
        case 30:
{yyval = lib_dic.get_comm(yyastk[yysp-(8-1)],yyastk[yysp-(8-3)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 31:
{yyval = lib_dic.get_comm(yyastk[yysp-(12-1)],yyastk[yysp-(12-3)]) + ' {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}'; } break;
        case 32:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 33:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}'; } break;
        case 35:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 36:
{ yyval = yyastk[yysp-(4-2)]; } break;
        case 37:
{ yyval = yyastk[yysp-(3-3)]; } break;
        case 38:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)]; } break;
        case 39:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 40:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 41:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 42:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 43:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 44:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 45:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 46:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 47:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 48:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 49:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 50:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 51:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 52:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 53:
{yyval = '-' + yyastk[yysp-(2-2)];} break;
        case 54:
{yyval = '!' + yyastk[yysp-(2-2)];} break;
        case 58:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '');} break;
        case 59:
{yyval = lib_dic.get_types(yyastk[yysp-(4-4)], '') + " " + lib_dic.get_vars(yyastk[yysp-(4-2)], '');} break;
        }
        /* Goto - shift nonterminal */
        yysp -= yyl;
        yyn = yylhs[yyn];
        if ((yyp = yygbase[yyn] + yysstk[yysp]) >= 0 && yyp < YYGLAST
            && yygcheck[yyp] == yyn)
          yystate = yygoto[yyp];
        else
          yystate = yygdefault[yyn];
          
        yysp++;

        yysstk[yysp] = yystate;
        yyastk[yysp] = yyval;
      }
      else {
        /* error */
        switch (yyerrflag) {
        case 0:
          yyerror("syntax error");
        case 1:
        case 2:
          yyerrflag = 3;
          /* Pop until error-expecting state uncovered */

          while (!((yyn = yybase[yystate] + YYINTERRTOK) >= 0
                   && yyn < YYLAST && yycheck[yyn] == YYINTERRTOK
                   || (yystate < YY2TBLSTATE
                       && (yyn = yybase[yystate + YYNLSTATES] + YYINTERRTOK) >= 0
                       && yyn < YYLAST && yycheck[yyn] == YYINTERRTOK))) {
            if (yysp <= 0) {
              yyflush();
              return 1;
            }
            yystate = yysstk[--yysp];
          }
          yyn = yyaction[yyn];
          yysstk[++yysp] = yystate = yyn;
          break;

        case 3:
          if (yychar == 0) {
            yyflush();
            return 1;
          }
          yychar = -1;
          break;
        }
      }
        
      if (yystate < YYNLSTATES)
        break;
      /* >= YYNLSTATES means shift-and-reduce */
      yyn = yystate - YYNLSTATES;
    }
  }
}


