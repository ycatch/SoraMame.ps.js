
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
     45,   46,   47,  111,  112,  113,  202,  203,  158,   95,
     29,   30,  114,  158,  152,   43,   44,    0,   66,   84,
     67,   85,   39,   91,   92,   93,   94,  108,  128,   81,
     48,  193,  126,  105,   80,   40,   41,   90,   86,  113,
     43,   44,   89,   86,   29,   30,  114,-32766,-32766,-32766,
     88,  122,  131,   28,  100,  101,   43,   44,   87,   75,
     73,   77,  123,  169,  170,  201,  119,  115,  109,  103,
     97,  159,  160,  200,   96,   50,   36,  177,   34,  110,
     90,   86,    0,    0,    0,    0,  116,    0,  121,    0,
    118,  127,    0,   68,    0,    0,    0,    0,    0,    0,
      0,   51,    0,   35,   53,   55,   52,   38,   37,   54,
      0,  136,  134,  133,  132,  130,  129,   82,  138,  137,
     81,  135,    0,  162,   98,  104,  106,  125,  120,  166,
    167,  164,  168,  163,  165,  173,  172,  174,    0,   79,
     56,   49,   42,    0,   99,  117
  ];

var YYLAST = 146;

var yycheck = [
     19,   20,   21,   22,   23,   24,    2,    3,    4,    6,
     29,   30,   31,    4,    5,   17,   18,    0,    9,   10,
     11,   12,   18,   17,   18,   19,   20,    6,   25,   25,
     24,   33,    6,    6,   25,   31,   32,    8,   34,   24,
     17,   18,    4,   34,   29,   30,   31,   19,   20,   21,
      4,   28,   25,   24,    6,    7,   17,   18,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,   22,   24,    6,   27,   34,
      8,   34,   -1,   -1,   -1,   -1,   13,   -1,   14,   -1,
     15,   15,   -1,   16,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,   23,   -1,   24,   24,   24,   24,   24,   24,   24,
     -1,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   -1,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   -1,   27,
     27,   27,   27,   -1,   28,   28
  ];

var yybase = [
      0,   -2,   23,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   97,  103,  104,
    105,  106,  107,  108,  102,  109,  110,  111,   77,   80,
     85,  -19,  -19,    9,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,   29,   72,   28,
     28,   28,    6,   15,   15,   15,   56,   46,   59,   67,
     57,   66,   60,    3,   98,   48,   99,   27,  100,   47,
     38,   70,   70,   17,   54,   92,   55,   91,   90,   51,
     68,   79,   52,   84,   83,   65,  115,   89,   21,   64,
     45,   69,   72,   88,   71,   63,   73,  117,   75,  114,
     61,   53,   78,   82,   81,   87,   96,   62,   86,  113,
     74,   94,   58,  112,  101,   26,   76,   93,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    -19,  -19,  -19,  -19,  -19,  -19,  -19,  -19,  -19,  -19,
    -19,  -19,  -19,  -19,  -19,  -19,    9,    9,    9,    9,
      9,    9,    9,    9,    9,    9,    9,    4,    4,    4,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    6,    6,  -19,  -19,
    -19,    0,    0,    0,    0,   95,   95,   95,   95,   95,
     95,   95,    0,  116,    0,  116,    0,  116
  ];

var YY2TBLSTATE = 79;

var yydefault = [
      2,32767,32767,   14,   39,   15,   16,   17,   18,   56,
     48,   49,   40,   53,   50,   51,   52,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   41,   42,    1,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   22,   58,   43,
     44,   45,32767,   55,   46,   47,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,   60,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,   58,32767,32767,32767,32767,32767,   38,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
     32,32767,32767,32767,32767,32767,32767,32767,    2,    2,
      2,    2,    2,    2,    2,    2,    2,    2,    2
  ];



var yygoto = [
      3,   10,   11,  176,  176,  176,  176,    5,    6,    7,
      8,   63,    9,    1,  107,   31,   32,   59,   60,   61,
      3,   12,   64,   65,   13,   14,   15,   16,    2,   57,
     57,   57,   57,   57,   57,   57,   57,   57,   57,   57,
     70,   71,   72,   76,   78,   57,   58,  144,  144,  144,
    144,  144,  144,  144,  144,  144,  144,  144,    0,  124,
      0,    0,    0,  144,   17,   18,   19,   20,   21,   22,
     23,   24,   25,   26,   27,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,   62
  ];

var YYGLAST = 92;

var yygcheck = [
     14,   14,   14,   17,   17,   17,   17,   14,   14,   14,
     14,   14,   14,   14,    4,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   13,
     13,   13,   13,   13,   13,   13,   13,   13,   13,   13,
     15,   15,   15,   16,   16,   13,   13,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,   -1,    4,
     -1,   -1,   -1,    5,    2,    2,    2,    2,    2,    2,
      2,    2,    2,    2,    2,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,   13
  ];

var yygbase = [
      0,    0,  -64,    0,  -20,   30,    0,    0,    0,    0,
      0,    0,    0,   12,  -28,  -26,  -38,  -66,    0
  ];

var yygdefault = [
  -32768,   83,   33,  142,  143,  196,  145,  146,  147,  148,
    149,  150,  151,  102,    4,   69,   74,  175,  198
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    4,    4,    4,    4,    4,    5,
      5,    5,    6,    7,    7,    7,    7,    8,    9,    9,
     10,   10,   11,   11,   12,   12,   15,   15,   17,   16,
     16,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     13,   13,   13,   18,   18
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    3,    4,    4,    4,    4,    1,
      2,    3,    1,    5,    7,    6,    8,    5,    5,    6,
      4,    5,    8,   12,    8,   18,    1,    2,    4,    3,
      5,    3,    3,    3,    3,    3,    4,    4,    3,    3,
      4,    4,    4,    4,    3,    2,    2,    1,    1,    1,
      2,    4,    5,    1,    1
  ];

var YYSTATES = 175;
var YYNLSTATES = 139;
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
        case 62:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + "." + lib_dic.get_vars(yyastk[yysp-(5-5)], '');} break;
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


