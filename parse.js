
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
      0,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   31,   37,   37,   37,   21,   22,   37,
     32,   33,   19,   17,   28,   18,   37,   20,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   27,   37,
     29,   24,   30,   37,   34,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   35,   37,   36,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   25,   23,   26,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,    1,    2,    3,    4,
      5,    6,    7,   37,    8,    9,   10,   11,   12,   13,
     14,   15,   16,   37
  ];

var YYBADCH = 37;
var YYMAXLEX = 274;
var YYTERMS = 37;
var YYNONTERMS = 19;

var yyaction = [
     45,   46,   47,   48,   49,  114,  115,  116,  208,  209,
    162,  107,   30,   31,  117,  162,  156,   92,-32766,-32766,
     69,   86,   70,   87,   41,   93,   94,   95,   96,   99,
    135,   83,   50,   29,  102,  103,   82,   42,   43,    0,
     88,   97,  111,  130,  113,   88,-32766,-32766,-32766,-32766,
  -32766,  116,  118,  123,  174,  205,   30,   31,  117,  173,
    132,  164,  163,   36,  127,   68,   76,   79,   89,   90,
     91,   98,  105,  125,   52,  181,  110,   53,  138,   92,
     57,   88,  206,    0,    0,  119,    0,    0,  121,  131,
      0,   71,    0,    0,    0,    0,    0,    0,    0,    0,
     56,   55,   37,   38,   39,   40,   54,    0,  139,  140,
    141,   84,  133,  142,  134,  136,   83,  137,    0,  124,
    100,  106,  108,  129,  166,  170,  171,  168,  172,  167,
    169,  177,  176,  178,    0,   35,   81,   58,   51,   44,
      0,  126,  101,  120,    0,    0,    0,    0,    0,  197,
      0,  112,    0,  122,    0,  207
  ];

var YYLAST = 156;

var yycheck = [
     17,   18,   19,   20,   21,   22,   23,   24,    2,    3,
      4,    6,   29,   30,   31,    4,    5,    8,   17,   18,
      9,   10,   11,   12,   18,   17,   18,   19,   20,    4,
     25,   25,   24,   24,    6,    7,   25,   31,   32,    0,
     34,    6,    4,    6,    4,   34,   17,   18,   19,   20,
     21,   24,    4,    4,    4,    4,   29,   30,   31,    4,
     25,    4,    4,   35,    4,    4,    4,    4,    4,    4,
      4,    4,    4,   14,   22,    6,    6,   23,   25,    8,
     24,   34,   36,   -1,   -1,   13,   -1,   -1,   15,   15,
     -1,   16,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     24,   24,   24,   24,   24,   24,   24,   -1,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   -1,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   -1,   27,   27,   27,   27,   27,
     -1,   28,   28,   28,   -1,   -1,   -1,   -1,   -1,   33,
     -1,   34,   -1,   35,   -1,   36
  ];

var yybase = [
      0,   46,  116,  113,  -17,  -17,  -17,  -17,  -17,  -17,
    -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,   98,   99,
    100,  101,  102,  103,  104,   93,  105,  106,  107,   75,
     77,   76,    1,    1,   11,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    9,
     71,   29,   29,   29,    8,   27,   27,   27,   28,   62,
     65,   55,   58,   63,   25,   50,   35,   94,   95,    5,
     96,   47,   66,   67,   67,   39,   64,   86,   61,   87,
     89,  108,   57,   78,   79,   80,   81,   68,  112,   90,
     70,   38,  117,   40,   71,   92,   69,   48,   72,  115,
     73,  111,   51,  118,   52,   54,   82,   56,   53,   83,
     49,   84,  119,  110,   59,   85,   60,  109,   97,   37,
     74,   88,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,  -17,  -17,  -17,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,   11,   11,   11,   11,   11,   11,   11,   11,   11,
     11,   11,    6,    6,    6,  -17,  -17,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    8,    8,  -17,  -17,  -17,    0,    0,    0,
      0,    0,   91,   91,   91,   91,   91,   91,   91,    0,
    114,  114,    0,  114
  ];

var YY2TBLSTATE = 81;

var yydefault = [
      2,32767,32767,32767,   14,   39,   15,   16,   17,   18,
     56,   48,   49,   40,   53,   50,   51,   52,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,   41,   42,    1,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,   22,
     58,   43,   44,   45,32767,   55,   46,   47,   60,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,   58,32767,32767,32767,32767,32767,
     38,32767,32767,   61,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,   32,32767,32767,32767,32767,32767,
  32767,32767,    2,    2,    2,    2,    2,    2,    2,    2,
      2,    2,    2
  ];



var yygoto = [
      4,   11,   12,  180,  180,  180,  180,    1,    6,    7,
      8,    9,   65,   10,    2,  109,   32,   33,   61,   62,
     63,    4,   13,   66,   67,   14,   15,   16,   17,    3,
     59,   59,   59,   59,   59,   59,   59,   59,   59,   59,
     59,   73,   74,   75,   78,   80,   59,   60,  148,  148,
    148,  148,  148,  148,  148,  148,  148,  148,  148,    0,
      0,  128,    0,    0,  148,   18,   19,   20,   21,   22,
     23,   24,   25,   26,   27,   28,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,   64
  ];

var YYGLAST = 94;

var yygcheck = [
     14,   14,   14,   17,   17,   17,   17,   14,   14,   14,
     14,   14,   14,   14,   14,    4,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     13,   13,   13,   13,   13,   13,   13,   13,   13,   13,
     13,   15,   15,   15,   16,   16,   13,   13,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,   -1,
     -1,    4,   -1,   -1,    5,    2,    2,    2,    2,    2,
      2,    2,    2,    2,    2,    2,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   13
  ];

var yygbase = [
      0,    0,  -67,    0,  -20,   30,    0,    0,    0,    0,
      0,    0,    0,   12,  -29,  -28,  -39,  -69,    0
  ];

var yygdefault = [
  -32768,   85,   34,  146,  147,  200,  149,  150,  151,  152,
    153,  154,  155,  104,    5,   72,   77,  179,  202
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    4,    4,    4,    4,    4,    5,
      5,    5,    6,    7,    7,    7,    7,    8,    9,    9,
     10,   10,   11,   11,   12,   12,   15,   15,   17,   16,
     16,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     13,   13,   13,   13,   13,   18,   18
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    3,    4,    4,    4,    4,    1,
      2,    3,    1,    5,    7,    6,    8,    5,    5,    6,
      4,    5,    8,   12,    8,   18,    1,    2,    4,    3,
      5,    3,    3,    3,    3,    3,    4,    4,    3,    3,
      4,    4,    4,    4,    3,    2,    2,    1,    1,    1,
      2,    4,    5,    5,    6,    1,    1
  ];

var YYSTATES = 180;
var YYNLSTATES = 143;
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
        case 63:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '[' + yyastk[yysp-(5-4)] + ']';} break;
        case 64:
{yyval = lib_dic.get_types(yyastk[yysp-(6-4)], '') + '[] ' + lib_dic.get_vars(yyastk[yysp-(6-2)], '');} break;
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


