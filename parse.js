
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
     37,   37,   37,   33,   37,   37,   37,   21,   22,   37,
     34,   35,   19,   17,   30,   18,   37,   20,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   29,   37,
     31,   24,   32,   37,   36,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   27,   37,   28,   37,   37,   37,   37,   37,   37,
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
var YYNONTERMS = 20;

var yyaction = [
     46,   47,   48,   49,   50,  120,  121,  122,  220,  221,
    169,    0,  169,  163,   31,   32,  123,   71,   92,   72,
     93,   73,  102,  131,   42,  170,   70,   98,   99,  100,
    101,   88,  192,   87,   51,  107,  108,   30,  112,   43,
     44,  139,   94,  122,   94,-32766,-32766,-32766,-32766,-32766,
     31,   32,  123,   93,-32766,-32766,   37,  142,   81,   84,
     95,   96,   97,  103,  104,  110,  148,  116,  118,  119,
    124,  130,  134,  171,  172,  216,  182,  218,   74,  189,
    137,  115,  126,  208,   73,  132,   94,  117,    0,    0,
    125,    0,   80,    0,  127,  138,    0,    0,    0,    0,
      0,    0,    0,   54,    0,   55,    0,   56,   40,   39,
     38,   57,   58,   59,   41,    0,  149,   88,   89,  140,
    141,  143,  144,  145,  146,  147,    0,  136,  105,  186,
    188,  177,  175,  180,  176,   90,  174,  178,  179,  111,
    113,    0,   53,  128,    0,  183,  129,  219,    0,   45,
     36,   60,   86,   52,    0,  106,  133
  ];

var YYLAST = 157;

var yycheck = [
     17,   18,   19,   20,   21,   22,   23,   24,    2,    3,
      4,    0,    4,    5,   31,   32,   33,    9,   10,   11,
     12,    8,    6,    6,   18,    4,    4,   17,   18,   19,
     20,   25,    6,   25,   24,    6,    7,   24,    6,   33,
     34,   25,   36,   24,   36,   17,   18,   19,   20,   21,
     31,   32,   33,   12,   17,   18,   27,   25,    4,    4,
      4,    4,    4,    4,    4,    4,   25,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,   16,   26,
      6,    6,   30,   35,    8,   36,   36,   36,   -1,   -1,
     13,   -1,   14,   -1,   15,   15,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   22,   -1,   23,   -1,   24,   24,   24,
     24,   24,   24,   24,   24,   -1,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   -1,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   -1,   27,   27,   -1,   28,   28,   28,   -1,   29,
     29,   29,   29,   29,   -1,   30,   30
  ];

var yybase = [
      0,  118,   48,  117,  126,  -17,  -17,  -17,  -17,  -17,
    -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,  110,
    111,  112,  108,  107,  106,  105,  109,  104,  103,   53,
     62,   87,   88,   37,   37,    8,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    6,
      6,   13,   76,   28,   28,   28,   10,   19,   19,   19,
     29,   54,   57,   69,   65,   21,   55,   60,   70,   72,
     41,   16,  102,  113,   32,  114,   50,   58,   59,   59,
     78,   11,   56,   93,   22,   94,   95,  121,   86,   85,
     84,   90,   61,  120,   96,   75,   63,   51,   64,   76,
     97,   26,   66,   77,   52,   79,  124,   71,  116,  115,
     81,   82,   83,   89,   98,   99,   67,  100,  119,   17,
    122,   49,   73,   68,  123,  101,   74,   80,   91,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,  -17,  -17,  -17,  -17,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    8,
      8,    8,    8,    8,    8,    8,    8,    8,    8,    8,
      6,    6,    6,  -17,  -17,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,   10,   10,  -17,  -17,  -17,    0,    0,    0,    0,
      0,   92,   92,   92,   92,   92,   92,   92,   92,   92,
      0,    0,  125,  125,    0,  125
  ];

var YY2TBLSTATE = 86;

var yydefault = [
      2,32767,32767,32767,32767,   14,   43,   15,   16,   17,
     18,   60,   52,   53,   44,   57,   54,   55,   56,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,   45,   46,    1,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   23,   62,   47,   48,   49,32767,   59,   50,   51,
     64,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
     34,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,   62,
  32767,32767,32767,32767,32767,   42,32767,32767,   65,   31,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,   67,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,    2,
      2,    2,    2,    2,    2,    2,    2,    2,    2,    2
  ];



var yygoto = [
      5,   12,   13,   76,   77,   78,   79,    1,    7,    8,
      9,   10,   67,   11,    2,  187,   33,   34,   63,   64,
     65,    5,   14,    3,   68,   69,   15,   16,   17,   18,
      4,   61,   61,   61,   61,   61,   61,   61,   61,   61,
     61,   61,  191,  191,  191,  191,  191,   61,   62,  155,
    155,  155,  155,  155,  155,  155,  155,  155,  155,  155,
    114,   83,   85,    0,    0,  155,   19,   20,   21,   22,
     23,   24,   25,   26,   27,   28,   29,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,   66,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    135
  ];

var YYGLAST = 111;

var yygcheck = [
     14,   14,   14,   15,   15,   15,   15,   14,   14,   14,
     14,   14,   14,   14,   14,   11,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   13,   13,   13,   13,   13,   13,   13,   13,   13,
     13,   13,   18,   18,   18,   18,   18,   13,   13,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      4,   16,   16,   -1,   -1,    5,    2,    2,    2,    2,
      2,    2,    2,    2,    2,    2,    2,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   13,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
      4
  ];

var yygbase = [
      0,    0,  -73,    0,   24,   30,    0,    0,    0,    0,
      0,  -65,    0,   12,  -30,  -68,  -27,    0,  -33,    0
  ];

var yygdefault = [
  -32768,   91,   35,  153,  154,  211,  156,  157,  158,  159,
    160,  161,  162,  109,    6,   75,   82,  185,  190,  213
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    4,    4,    4,    4,    4,    5,
      5,    5,    5,    6,    7,    7,    7,    7,    8,    9,
      9,   10,   10,   10,   11,   11,   17,   17,   12,   12,
     15,   15,   18,   16,   16,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   13,   13,   13,   13,   13,   13,
     19,   19
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    3,    4,    4,    4,    4,    1,
      2,    3,    4,    1,    5,    7,    6,    8,    5,    5,
      6,    4,    5,    7,    8,    9,    4,    2,    8,   18,
      1,    2,    4,    3,    5,    3,    3,    3,    3,    3,
      4,    4,    3,    3,    4,    4,    4,    4,    3,    2,
      2,    1,    1,    1,    2,    4,    5,    5,    8,    6,
      1,    1
  ];

var YYSTATES = 190;
var YYNLSTATES = 150;
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
{ yyval = yyastk[yysp-(3-1)] + '.' + lib_dic.get_method(yyastk[yysp-(3-1)], yyastk[yysp-(3-3)], '');} break;
        case 22:
{ yyval = yyastk[yysp-(4-1)] + '.' + lib_dic.get_method(yyastk[yysp-(4-1)], yyastk[yysp-(4-4)], yyastk[yysp-(4-3)]);} break;
        case 23:
{yyval = yyastk[yysp-(1-1)] + ';';} break;
        case 24:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 25:
{yyval = lib_dic.get_types(yyastk[yysp-(7-4)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(7-2)],'') + '{\n' + yyastk[yysp-(7-6)] + '}';} break;
        case 26:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(6-3)],yyastk[yysp-(6-2)]) + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 27:
{yyval = lib_dic.get_types(yyastk[yysp-(8-5)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(8-3)],yyastk[yysp-(8-2)]) + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
        case 28:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 29:
{yyval = lib_dic.get_types(yyastk[yysp-(5-2)],'') + '()' + ' {\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 30:
{yyval = lib_dic.get_types(yyastk[yysp-(6-3)],'') + '(' + yyastk[yysp-(6-2)] + ') ' + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 31:
{ yyval = yyastk[yysp-(4-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(4-4)],'') + '();'; } break;
        case 32:
{yyval = yyastk[yysp-(5-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(5-5)],'') + '(' + yyastk[yysp-(5-4)] + ');'; } break;
        case 33:
{ yyval = yyastk[yysp-(7-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(7-4)],'') + '[' + yyastk[yysp-(7-6)] + '];'; } break;
        case 34:
{yyval = lib_dic.get_comm(yyastk[yysp-(8-1)],yyastk[yysp-(8-3)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 35:
{yyval = lib_dic.get_comm(yyastk[yysp-(9-1)],yyastk[yysp-(9-3)]) + ' {\n' + yyastk[yysp-(9-7)] + '} \n' + yyastk[yysp-(9-9)]; } break;
        case 36:
{yyval = 'else {\n' + yyastk[yysp-(4-3)] +'}'; } break;
        case 37:
{yyval = 'else ' + yyastk[yysp-(2-2)] ; } break;
        case 38:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 39:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}'; } break;
        case 41:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 42:
{ yyval = yyastk[yysp-(4-2)]; } break;
        case 43:
{ yyval = yyastk[yysp-(3-3)]; } break;
        case 44:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)]; } break;
        case 45:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 46:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 47:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 48:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 49:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 50:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 51:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 52:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 53:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 54:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 55:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 56:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 57:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 58:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 59:
{yyval = '-' + yyastk[yysp-(2-2)];} break;
        case 60:
{yyval = '!' + yyastk[yysp-(2-2)];} break;
        case 64:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '');} break;
        case 65:
{yyval = lib_dic.get_types(yyastk[yysp-(4-4)], '') + " " + lib_dic.get_vars(yyastk[yysp-(4-2)], '');
			 lib_dic.set_vars_type(lib_dic.get_vars(yyastk[yysp-(4-2)], ''), lib_dic.get_types(yyastk[yysp-(4-4)], ''));} break;
        case 66:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + "." + lib_dic.get_property(lib_dic.get_vars(yyastk[yysp-(5-2)], ''), yyastk[yysp-(5-5)]);} break;
        case 67:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '[' + yyastk[yysp-(5-4)] + ']';} break;
        case 68:
{yyval = lib_dic.get_vars(yyastk[yysp-(8-2)], '') + '[' + yyastk[yysp-(8-4)] + ']' 
			 + "." + lib_dic.get_property(lib_dic.get_vars(yyastk[yysp-(8-2)], ''), yyastk[yysp-(8-8)]);} break;
        case 69:
{yyval = lib_dic.get_types(yyastk[yysp-(6-4)], '') + '[] ' + lib_dic.get_vars(yyastk[yysp-(6-2)], '');
			 lib_dic.set_vars_type(lib_dic.get_vars(yyastk[yysp-(6-2)], ''), lib_dic.get_types(yyastk[yysp-(6-4)], ''))} break;
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
          yyerror("SoraMame: syntax error");
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


