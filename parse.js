
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
var YYNONTERMS = 19;

var yyaction = [
     46,   47,   48,   49,   50,  117,  118,  119,  212,  213,
    165,    0,  165,  159,   31,   32,  120,   71,   88,   72,
     89,   94,   99,  133,   42,   92,   91,   95,   96,   97,
     98,   85,  112,   84,   51,  104,  105,   30,  109,   43,
     44,  135,   90,  119,   90,-32766,-32766,-32766,-32766,-32766,
     31,   32,  120,-32766,-32766,   81,   37,  138,   78,   70,
    100,  113,  116,  121,  126,  130,  107,   93,  101,  177,
    209,  167,  166,  115,   54,  137,  185,   56,   45,   94,
    201,    0,  114,   90,    0,  122,    0,  128,    0,  134,
    124,    0,   73,    0,    0,    0,    0,    0,    0,    0,
     55,    0,   57,   40,   39,   58,   41,   59,   38,    0,
    136,   86,  139,  144,  145,  142,  141,  140,  143,   85,
      0,  182,  102,  108,  110,  132,  127,  169,  173,  174,
    171,  175,  170,  172,  181,  180,    0,   53,  125,    0,
    211,  210,  178,    0,   83,   60,   52,   36,    0,  123,
    103,  129
  ];

var YYLAST = 152;

var yycheck = [
     17,   18,   19,   20,   21,   22,   23,   24,    2,    3,
      4,    0,    4,    5,   31,   32,   33,    9,   10,   11,
     12,    8,    6,    6,   18,    4,    4,   17,   18,   19,
     20,   25,    6,   25,   24,    6,    7,   24,    6,   33,
     34,   25,   36,   24,   36,   17,   18,   19,   20,   21,
     31,   32,   33,   17,   18,    4,   27,   25,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,   22,   25,    6,   24,   29,    8,
     35,   -1,   36,   36,   -1,   13,   -1,   14,   -1,   15,
     15,   -1,   16,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     23,   -1,   24,   24,   24,   24,   24,   24,   24,   -1,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     -1,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   -1,   27,   27,   -1,
     28,   28,   28,   -1,   29,   29,   29,   29,   -1,   30,
     30,   30
  ];

var yybase = [
      0,  113,   45,  114,  121,  -17,  -17,  -17,  -17,  -17,
    -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,  101,
    102,  103,  104,  105,  106,  107,  100,  108,  109,   95,
     76,   78,   81,   36,   36,    8,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    6,
      6,   13,   71,   28,   28,   28,   10,   19,   19,   19,
     29,   54,   21,   58,   68,   51,   64,   65,   16,   96,
     97,   32,   98,   47,   63,   56,   56,   11,   22,   86,
     55,   85,   50,  118,   67,   84,   80,   79,   82,   62,
     49,   87,   26,   57,   46,   69,   71,   92,   70,   59,
     72,  119,   75,  117,   66,  111,  110,   52,   77,   53,
     83,   91,   90,   60,   93,  112,  116,   73,   88,   61,
    115,   99,   17,   74,   89,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,  -17,  -17,  -17,
    -17,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    8,    8,    8,    8,    8,
      8,    8,    8,    8,    8,    8,    6,    6,    6,  -17,
    -17,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,   10,   10,  -17,
    -17,  -17,    0,    0,    0,    0,    0,   94,   94,   94,
     94,   94,   94,   94,    0,  120,  120,    0,  120
  ];

var YY2TBLSTATE = 83;

var yydefault = [
      2,32767,32767,32767,32767,   14,   40,   15,   16,   17,
     18,   57,   49,   50,   41,   54,   51,   52,   53,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,   42,   43,    1,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   22,   59,   44,   45,   46,32767,   56,   47,   48,
     61,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,   59,32767,32767,32767,
  32767,32767,   39,32767,32767,   62,   30,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   33,32767,32767,
  32767,32767,32767,32767,32767,    2,    2,    2,    2,    2,
      2,    2,    2,    2,    2,    2
  ];



var yygoto = [
      5,   12,   13,  184,  184,  184,  184,    1,    7,    8,
      9,   10,   67,   11,    2,  111,   33,   34,   63,   64,
     65,    5,   14,    3,   68,   69,   15,   16,   17,   18,
      4,   61,   61,   61,   61,   61,   61,   61,   61,   61,
     61,   61,   75,   76,   77,   80,   82,   61,   62,  151,
    151,  151,  151,  151,  151,  151,  151,  151,  151,  151,
      0,    0,  131,    0,    0,  151,   19,   20,   21,   22,
     23,   24,   25,   26,   27,   28,   29,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,   66
  ];

var YYGLAST = 96;

var yygcheck = [
     14,   14,   14,   17,   17,   17,   17,   14,   14,   14,
     14,   14,   14,   14,   14,    4,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   13,   13,   13,   13,   13,   13,   13,   13,   13,
     13,   13,   15,   15,   15,   16,   16,   13,   13,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
     -1,   -1,    4,   -1,   -1,    5,    2,    2,    2,    2,
      2,    2,    2,    2,    2,    2,    2,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   13
  ];

var yygbase = [
      0,    0,  -69,    0,  -21,   30,    0,    0,    0,    0,
      0,    0,    0,   12,  -30,  -29,  -40,  -71,    0
  ];

var yygdefault = [
  -32768,   87,   35,  149,  150,  204,  152,  153,  154,  155,
    156,  157,  158,  106,    6,   74,   79,  183,  206
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    4,    4,    4,    4,    4,    5,
      5,    5,    6,    7,    7,    7,    7,    8,    9,    9,
     10,   10,   10,   11,   11,   12,   12,   15,   15,   17,
     16,   16,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   13,   13,   13,   13,   13,   18,   18
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    3,    4,    4,    4,    4,    1,
      2,    3,    1,    5,    7,    6,    8,    5,    5,    6,
      4,    5,    7,    8,   12,    8,   18,    1,    2,    4,
      3,    5,    3,    3,    3,    3,    3,    4,    4,    3,
      3,    4,    4,    4,    4,    3,    2,    2,    1,    1,
      1,    2,    4,    5,    5,    6,    1,    1
  ];

var YYSTATES = 183;
var YYNLSTATES = 146;
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
{ yyval = yyastk[yysp-(7-1)] + ' = new ' + lib_dic.get_types(yyastk[yysp-(7-4)],'') + '[' + yyastk[yysp-(7-6)] + '];'; } break;
        case 33:
{yyval = lib_dic.get_comm(yyastk[yysp-(8-1)],yyastk[yysp-(8-3)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 34:
{yyval = lib_dic.get_comm(yyastk[yysp-(12-1)],yyastk[yysp-(12-3)]) + ' {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}'; } break;
        case 35:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 36:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}'; } break;
        case 38:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 39:
{ yyval = yyastk[yysp-(4-2)]; } break;
        case 40:
{ yyval = yyastk[yysp-(3-3)]; } break;
        case 41:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)]; } break;
        case 42:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 43:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 44:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 45:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 46:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 47:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 48:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 49:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 50:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 51:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 52:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 53:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 54:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 55:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 56:
{yyval = '-' + yyastk[yysp-(2-2)];} break;
        case 57:
{yyval = '!' + yyastk[yysp-(2-2)];} break;
        case 61:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '');} break;
        case 62:
{yyval = lib_dic.get_types(yyastk[yysp-(4-4)], '') + " " + lib_dic.get_vars(yyastk[yysp-(4-2)], '');} break;
        case 63:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + "." + lib_dic.get_vars(yyastk[yysp-(5-5)], '');} break;
        case 64:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '[' + yyastk[yysp-(5-4)] + ']';} break;
        case 65:
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


