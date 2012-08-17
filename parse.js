
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
var WORD = 259;
var COMMENT = 260;
var JOSI = 261;
var JOSI_HA = 262;
var JOSI_NO = 263;
var JOSI_WO = 264;
var DEF_FUNC = 265;
var DEF_CLASS = 266;
var DEF_CLASS_INIT = 267;
var IF = 268;
var THEN = 269;
var ELSE = 270;
var LOOP = 271;
var NEW = 272;
var UMINUS = 273;

  
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
      0,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   31,   35,   35,   35,   21,   22,   35,
     32,   33,   19,   17,   28,   18,   35,   20,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   27,   35,
     29,   24,   30,   35,   34,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   25,   23,   26,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
     35,   35,   35,   35,   35,   35,    1,    2,    3,    4,
      5,    6,    7,   35,    8,    9,   10,   11,   12,   13,
     14,   15,   16,   35
  ];

var YYBADCH = 35;
var YYMAXLEX = 274;
var YYTERMS = 35;
var YYNONTERMS = 19;

var yyaction = [
     45,   46,   47,  109,  110,  111,  199,  200,  156,  104,
     29,   30,  112,  156,  150,   43,   44,    0,   66,   83,
     67,   84,   39,   91,   92,   93,   94,  175,  129,   80,
     48,  191,  124,   95,   79,   40,   41,   90,   85,  111,
     43,   44,  198,   85,   29,   30,  112,-32766,-32766,-32766,
    167,  120,  126,   28,   43,   44,  168,  157,  158,   73,
     76,   86,   87,   88,   89,   96,   97,  102,  108,  113,
    117,  121,   50,   36,  107,   37,  100,   85,   90,    0,
      0,    0,    0,    0,  114,    0,  119,    0,  116,  125,
      0,   68,    0,    0,    0,    0,    0,    0,    0,   51,
      0,   38,   52,   55,   53,   35,   54,    0,  136,  132,
    131,   81,   80,  127,  128,  130,  133,  134,  135,    0,
    164,   98,  103,  105,  123,  118,  160,  165,  162,  166,
    161,  163,  171,  170,  172,    0,   34,   78,   56,   49,
     42,    0,   99,  115
  ];

var YYLAST = 144;

var yycheck = [
     19,   20,   21,   22,   23,   24,    2,    3,    4,    6,
     29,   30,   31,    4,    5,   17,   18,    0,    9,   10,
     11,   12,   18,   17,   18,   19,   20,    6,   25,   25,
     24,   33,    6,    6,   25,   31,   32,    8,   34,   24,
     17,   18,    4,   34,   29,   30,   31,   19,   20,   21,
      4,   28,   25,   24,   17,   18,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,   22,   24,    6,   24,    7,   34,    8,   -1,
     -1,   -1,   -1,   -1,   13,   -1,   14,   -1,   15,   15,
     -1,   16,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   23,
     -1,   24,   24,   24,   24,   24,   24,   -1,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   -1,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   -1,   27,   27,   27,   27,
     27,   -1,   28,   28
  ];

var yybase = [
      0,   -2,   23,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,  100,   94,  101,
    102,  103,  104,  105,   99,  106,  107,  108,   75,   80,
     82,  -19,  -19,    9,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,   29,   70,   28,
     28,   28,    6,   15,   15,   15,   55,   58,   46,   53,
     56,   62,   52,   27,   95,   96,    3,   97,   43,   59,
     61,   61,   17,   57,   86,   60,   88,   89,  109,   69,
     54,   81,   49,   51,   77,   63,  113,   90,   68,   64,
     38,   70,   85,   21,   65,   71,  115,   73,  112,   50,
     76,   78,   79,   84,   91,   66,   92,  111,   72,   93,
     67,  110,   98,   26,   74,   83,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,  -19,  -19,
    -19,  -19,  -19,  -19,  -19,  -19,  -19,  -19,  -19,  -19,
    -19,  -19,  -19,  -19,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    9,    4,    4,    4,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    6,    6,  -19,  -19,  -19,    0,
      0,    0,    0,   87,   87,   87,   87,   87,   87,   87,
      0,  114,  114,    0,  114
  ];

var YY2TBLSTATE = 78;

var yydefault = [
      2,32767,32767,   14,   39,   15,   16,   17,   18,   56,
     48,   49,   40,   53,   50,   51,   52,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   41,   42,    1,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   22,   58,   43,
     44,   45,32767,   55,   46,   47,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,   60,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   58,32767,32767,32767,32767,32767,   38,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,   32,32767,
  32767,32767,32767,32767,32767,32767,    2,    2,    2,    2,
      2,    2,    2,    2,    2,    2,    2
  ];



var yygoto = [
      3,   10,   11,  174,  174,  174,  174,    5,    6,    7,
      8,   63,    9,    1,  106,   31,   32,   59,   60,   61,
      3,   12,   64,   65,   13,   14,   15,   16,    2,   57,
     57,   57,   57,   57,   57,   57,   57,   57,   57,   57,
     70,   71,   72,   75,   77,   57,   58,  142,  142,  142,
    142,  142,  142,  142,  142,  142,  142,  142,  122,    0,
      0,    0,    0,  142,   17,   18,   19,   20,   21,   22,
     23,   24,   25,   26,   27,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
     62
  ];

var YYGLAST = 91;

var yygcheck = [
     14,   14,   14,   17,   17,   17,   17,   14,   14,   14,
     14,   14,   14,   14,    4,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   13,
     13,   13,   13,   13,   13,   13,   13,   13,   13,   13,
     15,   15,   15,   16,   16,   13,   13,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    4,   -1,
     -1,   -1,   -1,    5,    2,    2,    2,    2,    2,    2,
      2,    2,    2,    2,    2,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     13
  ];

var yygbase = [
      0,    0,  -62,    0,  -20,   30,    0,    0,    0,    0,
      0,    0,    0,   12,  -28,  -26,  -37,  -66,    0
  ];

var yygdefault = [
  -32768,   82,   33,  140,  141,  194,  143,  144,  145,  146,
    147,  148,  149,  101,    4,   69,   74,  173,  196
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    4,    4,    4,    4,    4,    5,
      5,    5,    6,    7,    7,    7,    7,    8,    9,    9,
     10,   10,   11,   11,   12,   12,   15,   15,   17,   16,
     16,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     13,   13,   18,   18
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    3,    4,    4,    4,    4,    1,
      2,    3,    1,    5,    7,    6,    8,    5,    5,    6,
      4,    5,    8,   12,    8,   18,    1,    2,    4,    3,
      5,    3,    3,    3,    3,    3,    4,    4,    3,    3,
      4,    4,    4,    4,    3,    2,    2,    1,    1,    1,
      2,    4,    1,    1
  ];

var YYSTATES = 172;
var YYNLSTATES = 137;
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
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 20:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 21:
{ yyval = yyastk[yysp-(3-1)] + '.' + lib_dic.get_comm(yyastk[yysp-(3-3)], '');} break;
        case 22:
{yyval = yyastk[yysp-(1-1)] + ';';} break;
        case 23:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 24:
{yyval = lib_dic.get_types(yyastk[yysp-(7-4)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(7-2)],'') + '{\n' + yyastk[yysp-(7-6)] + '}';} break;
        case 25:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(6-3)],yyastk[yysp-(6-2)]) + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 26:
{yyval = lib_dic.get_types(yyastk[yysp-(8-5)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(8-3)],yyastk[yysp-(8-2)]) + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
        case 27:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 28:
{yyval = lib_dic.get_types(yyastk[yysp-(5-2)],'') + '()' + ' {\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 29:
{yyval = lib_dic.get_types(yyastk[yysp-(6-3)],'') + '(' + yyastk[yysp-(6-2)] + ') ' + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 30:
{ yyval = yyastk[yysp-(4-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(4-4)],'') + '();'; } break;
        case 31:
{yyval = yyastk[yysp-(5-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(5-5)],'') + '(' + yyastk[yysp-(5-4)] + ');'; } break;
        case 32:
{yyval = lib_dic.get_comm(yyastk[yysp-(8-1)],yyastk[yysp-(8-3)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 33:
{yyval = lib_dic.get_comm(yyastk[yysp-(12-1)],yyastk[yysp-(12-3)]) + ' {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}'; } break;
        case 34:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 35:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}'; } break;
        case 37:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 38:
{ yyval = yyastk[yysp-(4-2)]; } break;
        case 39:
{ yyval = yyastk[yysp-(3-3)]; } break;
        case 40:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)]; } break;
        case 41:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 42:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 43:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 44:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 45:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 46:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 47:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 48:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 49:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 50:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 51:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 52:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 53:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 54:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 55:
{yyval = '-' + yyastk[yysp-(2-2)];} break;
        case 56:
{yyval = '!' + yyastk[yysp-(2-2)];} break;
        case 60:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '');} break;
        case 61:
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


