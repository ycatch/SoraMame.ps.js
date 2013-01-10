
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
var JOSI_TEN = 263;
var DEF_FUNC = 264;
var DEF_CLASS = 265;
var DEF_CLASS_INIT = 266;
var IF = 267;
var THEN = 268;
var ELSE = 269;
var LOOP = 270;
var NEW = 271;
var RET = 272;
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
      0,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   34,   39,   39,   38,   22,   23,   39,
     35,   36,   20,   18,   31,   19,   39,   21,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   30,   39,
     32,   25,   33,   39,   37,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   28,   39,   29,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   26,   24,   27,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,   39,   39,   39,   39,
     39,   39,   39,   39,   39,   39,    1,    2,    3,    4,
      5,    6,    7,    8,    9,   10,   11,   12,   13,   14,
     15,   16,   17,   39
  ];

var YYBADCH = 39;
var YYMAXLEX = 274;
var YYTERMS = 39;
var YYNONTERMS = 21;

var yyaction = [
     44,   45,   46,   47,   48,  122,  123,  124,  225,  226,
    172,  173,  172,  166,   31,   32,  125,   72,   93,   73,
     94,  100,  101,  102,  103,   40,  109,  110,   49,    0,
    104,  114,   89,   89,   88,-32766,-32766,-32766,-32766,-32766,
     41,   42,   74,   95,   96,   95,   96,  124,   35,  141,
    144,   94,   95,   96,   31,   32,  125,  118,  120,   30,
  -32766,-32766,  121,  126,  132,  150,  223,  185,  221,  175,
    174,  219,  136,   71,   83,   86,   97,   98,   99,  105,
    106,  112,   36,   91,  117,  133,  139,  196,  107,  119,
     74,  212,    0,    0,    0,    0,  127,    0,   82,    0,
    129,  140,    0,   75,    0,  193,    0,    0,    0,    0,
      0,    0,   52,    0,   53,    0,   38,   39,   54,   57,
     56,   55,   37,    0,  148,  146,  145,  143,  142,   90,
    151,  149,  147,    0,  113,  115,  138,  177,  181,  182,
    179,  183,  178,  180,  191,  189,  192,    0,  130,   51,
      0,  224,  186,  131,    0,   58,   76,   50,   34,   43,
      0,  128,  108,  135,    0,    0,    0,    0,    0,    0,
    134
  ];

var YYLAST = 171;

var yycheck = [
     18,   19,   20,   21,   22,   23,   24,   25,    2,    3,
      4,    4,    4,    5,   32,   33,   34,    9,   10,   11,
     12,   18,   19,   20,   21,   19,    6,    7,   25,    0,
      7,    7,   26,   26,   26,   18,   19,   20,   21,   22,
     34,   35,    8,   37,   38,   37,   38,   25,   28,   26,
     26,   12,   37,   38,   32,   33,   34,    4,    4,   25,
     18,   19,    4,    4,    4,   26,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,   25,   27,    6,    6,    6,    6,   27,   37,
      8,   36,   -1,   -1,   -1,   -1,   13,   -1,   14,   -1,
     15,   15,   -1,   16,   -1,   17,   -1,   -1,   -1,   -1,
     -1,   -1,   23,   -1,   24,   -1,   25,   25,   25,   25,
     25,   25,   25,   -1,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   -1,   27,   27,   27,   27,   27,   27,
     27,   27,   27,   27,   27,   27,   27,   -1,   28,   28,
     -1,   29,   29,   29,   -1,   30,   30,   30,   30,   30,
     -1,   31,   31,   31,   -1,   -1,   -1,   -1,   -1,   -1,
     37
  ];

var yybase = [
      0,  124,   55,  123,  132,  -18,  -18,  -18,  -18,  -18,
    -18,  -18,  -18,  -18,  -18,  -18,  -18,  -18,  -18,  110,
    111,  112,  113,  114,  115,  116,   56,  117,  118,  119,
     87,   96,   95,    8,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,   42,
     42,   34,   82,   17,   17,   17,    3,   22,   22,   22,
     88,   20,   70,   73,   66,   58,   15,   71,   76,   65,
      7,   63,   39,   23,   61,  107,   24,  108,   74,   75,
     75,   84,   29,   72,  103,   69,   67,  102,  101,  128,
     57,   97,   91,   92,   77,  129,  100,   78,   53,   52,
     54,   82,   99,   81,   59,   83,  130,   85,  127,   64,
    120,  121,   89,   90,   93,   94,  106,   98,   60,  105,
    122,   79,  125,  133,   62,   68,  126,  109,   80,   86,
    104,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,  -18,  -18,  -18,  -18,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    8,    8,    8,    8,    8,    8,    8,    8,    8,
      8,    8,    6,    6,    6,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,  -18,  -18,    3,    3,  -18,  -18,  -18,    0,    0,
      0,    0,    7,    0,    7,    7,    7,    7,    0,    7,
      7,    7,    0,    7,    0,    0,  131,  131,    0,  131
  ];

var YY2TBLSTATE = 88;

var yydefault = [
      2,32767,32767,32767,32767,   15,   45,   16,   17,   18,
     19,   62,   54,   55,   46,   59,   56,   57,   58,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,    1,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,   47,
     48,   24,   64,   49,   50,   51,32767,   61,   52,   53,
  32767,   66,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   35,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   64,32767,32767,32767,32767,32767,   44,32767,32767,
     68,   32,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   70,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,    2,    2,    2,    2,    2,    2,    2,    2,    2,
      2,    2
  ];



var yygoto = [
      5,   12,   13,   85,   87,    1,    7,    8,    9,   10,
     67,   11,    2,  116,   59,   60,   63,   64,   65,    5,
     14,    3,   68,   69,   15,   16,   17,   18,    4,   70,
     70,   70,   70,   70,   70,   70,   70,   70,   70,   70,
    190,    0,    0,   70,   61,   61,   61,   61,   61,   61,
     61,   61,   61,   61,   61,  137,    0,    0,   61,   62,
    157,  157,  157,  157,  157,  157,  157,  157,  157,  157,
    157,    0,    0,    0,  157,    0,    0,    0,    0,    0,
      0,    0,   77,   78,   79,   81,   19,   20,   21,   22,
     23,   24,   25,   26,   27,   28,   29,  195,    0,    0,
      0,   66,    0,    0,  195,  195,  195,  195,  195
  ];

var YYGLAST = 109;

var yygcheck = [
     15,   15,   15,   17,   17,   15,   15,   15,   15,   15,
     15,   15,   15,    4,   15,   15,   15,   15,   15,   15,
     15,   15,   15,   15,   15,   15,   15,   15,   15,   16,
     16,   16,   16,   16,   16,   16,   16,   16,   16,   16,
     11,   -1,   -1,   16,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,    4,   -1,   -1,   14,   14,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,   -1,   -1,   -1,    5,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,   16,   16,   16,   16,    2,    2,    2,    2,
      2,    2,    2,    2,    2,    2,    2,   19,   -1,   -1,
     -1,   14,   -1,   -1,   19,   19,   19,   19,   19
  ];

var yygbase = [
      0,    0,  -55,    0,  -21,   41,    0,    0,    0,    0,
      0,  -42,    0,    0,   25,  -30,   10,  -86,    0,   27,
      0
  ];

var yygdefault = [
  -32768,   92,   33,  155,  156,  215,  158,  159,  160,  161,
    162,  163,  164,  165,  111,    6,   80,   84,  188,  194,
    217
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    3,    4,    4,    4,    4,    4,
      5,    5,    5,    5,    6,    7,    7,    7,    7,    8,
      9,    9,   10,   10,   10,   11,   11,   18,   18,   12,
     12,   13,   16,   16,   19,   17,   17,   15,   15,   15,
     15,   15,   15,   15,   15,   15,   15,   15,   15,   15,
     15,   15,   15,   15,   15,   15,   14,   14,   14,   14,
     14,   14,   14,   20,   20
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    1,    3,    4,    4,    4,    4,
      1,    2,    3,    4,    1,    5,    7,    6,    8,    5,
      5,    6,    4,    5,    7,    8,    9,    4,    2,    8,
     18,    2,    1,    2,    4,    3,    5,    3,    3,    3,
      3,    3,    4,    4,    3,    3,    4,    4,    4,    4,
      3,    2,    2,    1,    1,    1,    2,    2,    4,    5,
      5,    8,    6,    1,    1
  ];

var YYSTATES = 195;
var YYNLSTATES = 152;
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
        case 15:
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 16:
{ yyval = yyastk[yysp-(4-1)]  + '+=' + yyastk[yysp-(4-4)];} break;
        case 17:
{ yyval = yyastk[yysp-(4-1)]  + '-=' + yyastk[yysp-(4-4)];} break;
        case 18:
{ yyval = yyastk[yysp-(4-1)]  + '*=' + yyastk[yysp-(4-4)];} break;
        case 19:
{ yyval = yyastk[yysp-(4-1)]  + '/=' + yyastk[yysp-(4-4)];} break;
        case 20:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 21:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 22:
{ yyval = yyastk[yysp-(3-1)] + '.' + lib_dic.get_method(yyastk[yysp-(3-1)], yyastk[yysp-(3-3)], '');} break;
        case 23:
{ yyval = yyastk[yysp-(4-1)] + '.' + lib_dic.get_method(yyastk[yysp-(4-1)], yyastk[yysp-(4-4)], yyastk[yysp-(4-3)]);} break;
        case 24:
{yyval = yyastk[yysp-(1-1)] + ';';} break;
        case 25:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 26:
{yyval = lib_dic.get_types(yyastk[yysp-(7-4)]) + ' ' + lib_dic.get_comm(yyastk[yysp-(7-2)],'') + '{\n' + yyastk[yysp-(7-6)] + '}';} break;
        case 27:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(6-3)],yyastk[yysp-(6-2)]) + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 28:
{yyval = lib_dic.get_types(yyastk[yysp-(8-5)]) + ' ' + lib_dic.get_comm(yyastk[yysp-(8-3)],yyastk[yysp-(8-2)]) + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
        case 29:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)]) + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 30:
{yyval = lib_dic.get_types(yyastk[yysp-(5-2)]) + '()' + ' {\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 31:
{yyval = lib_dic.get_types(yyastk[yysp-(6-3)]) + '(' + yyastk[yysp-(6-2)] + ') ' + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 32:
{ yyval = yyastk[yysp-(4-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(4-4)]) + '();'; } break;
        case 33:
{yyval = yyastk[yysp-(5-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(5-5)]) + '(' + yyastk[yysp-(5-4)] + ');'; } break;
        case 34:
{ yyval = yyastk[yysp-(7-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(7-4)]) + '[' + yyastk[yysp-(7-6)] + '];'; } break;
        case 35:
{yyval = lib_dic.get_comm(yyastk[yysp-(8-1)],yyastk[yysp-(8-3)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 36:
{yyval = lib_dic.get_comm(yyastk[yysp-(9-1)],yyastk[yysp-(9-3)]) + ' {\n' + yyastk[yysp-(9-7)] + '} \n' + yyastk[yysp-(9-9)]; } break;
        case 37:
{yyval = 'else {\n' + yyastk[yysp-(4-3)] +'}'; } break;
        case 38:
{yyval = 'else ' + yyastk[yysp-(2-2)] ; } break;
        case 39:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 40:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}'; } break;
        case 41:
{yyval = 'return ' + yyastk[yysp-(2-1)] + ';'; } break;
        case 43:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 44:
{ yyval = yyastk[yysp-(4-2)]; } break;
        case 45:
{ yyval = yyastk[yysp-(3-3)]; } break;
        case 46:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)]; } break;
        case 47:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 48:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 49:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 50:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 51:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 52:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 53:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 54:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 55:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 56:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 57:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 58:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 59:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 60:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 61:
{yyval = '-' + yyastk[yysp-(2-2)];} break;
        case 62:
{yyval = '!' + yyastk[yysp-(2-2)];} break;
        case 66:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)]);} break;
        case 67:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)]);} break;
        case 68:
{yyval = lib_dic.get_types(yyastk[yysp-(4-4)]) + " " + lib_dic.get_vars(yyastk[yysp-(4-2)]);
			 lib_dic.set_vars_type(lib_dic.get_vars(yyastk[yysp-(4-2)]), lib_dic.get_types(yyastk[yysp-(4-4)]));} break;
        case 69:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)]) + "." + lib_dic.get_property(lib_dic.get_vars(yyastk[yysp-(5-2)]), yyastk[yysp-(5-5)]);} break;
        case 70:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)]) + '[' + yyastk[yysp-(5-4)] + ']';} break;
        case 71:
{yyval = lib_dic.get_vars(yyastk[yysp-(8-2)]) + '[' + yyastk[yysp-(8-4)] + ']' 
			 + "." + lib_dic.get_property(lib_dic.get_vars(yyastk[yysp-(8-2)]), yyastk[yysp-(8-8)]);} break;
        case 72:
{yyval = lib_dic.get_types(yyastk[yysp-(6-4)]) + '[] ' + lib_dic.get_vars(yyastk[yysp-(6-2)]);
			 lib_dic.set_vars_type(lib_dic.get_vars(yyastk[yysp-(6-2)]), lib_dic.get_types(yyastk[yysp-(6-4)]))} break;
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


