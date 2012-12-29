
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
var JOSI_TEN = 265;
var DEF_FUNC = 266;
var DEF_CLASS = 267;
var DEF_CLASS_INIT = 268;
var IF = 269;
var THEN = 270;
var ELSE = 271;
var LOOP = 272;
var NEW = 273;
var UMINUS = 274;

  
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
      0,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   33,   38,   38,   37,   21,   22,   38,
     34,   35,   19,   17,   30,   18,   38,   20,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   29,   38,
     31,   24,   32,   38,   36,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   27,   38,   28,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   25,   23,   26,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,    1,    2,    3,    4,
      5,    6,    7,   38,    8,   38,    9,   10,   11,   12,
     13,   14,   15,   16,   38
  ];

var YYBADCH = 38;
var YYMAXLEX = 275;
var YYTERMS = 38;
var YYNONTERMS = 20;

var yyaction = [
     44,   45,   46,   47,   48,  121,  122,  123,  222,  223,
    170,    0,  170,  164,   31,   32,  124,   71,   92,   72,
     93,  117,   73,  113,   40,   94,   95,   99,  100,  101,
    102,   88,  138,   87,   49,  103,  108,  109,   30,   41,
     42,  143,   94,   95,   94,   95,-32766,-32766,-32766,-32766,
  -32766,  123,   93,  140,-32766,-32766,  119,   35,   31,   32,
    124,  120,  125,  131,  220,  149,  183,  218,  173,  172,
    171,  216,  135,   70,   82,   85,   96,   97,   98,  104,
    105,  111,   90,   52,  132,  116,  193,  118,  209,   73,
    133,    0,    0,    0,    0,  126,    0,   81,    0,  128,
    139,    0,   74,    0,    0,    0,    0,    0,    0,    0,
     53,    0,   39,   55,   56,   38,   37,   36,   57,   54,
      0,  146,  144,  142,  141,   89,   88,  148,  150,  147,
    145,    0,  106,  112,  114,  137,  175,  179,  180,  177,
    181,  176,  178,  189,  187,  190,    0,  129,   51,    0,
    221,  184,  130,    0,   58,   75,   50,   34,   43,    0,
    127,  107,  134
  ];

var YYLAST = 163;

var yycheck = [
     17,   18,   19,   20,   21,   22,   23,   24,    2,    3,
      4,    0,    4,    5,   31,   32,   33,    9,   10,   11,
     12,    4,    8,    7,   18,   36,   37,   17,   18,   19,
     20,   25,    6,   25,   24,    7,    6,    7,   24,   33,
     34,   25,   36,   37,   36,   37,   17,   18,   19,   20,
     21,   24,   12,   25,   17,   18,    4,   27,   31,   32,
     33,    4,    4,    4,    4,   25,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,   26,   22,    6,    6,    6,   36,   35,    8,
     36,   -1,   -1,   -1,   -1,   13,   -1,   14,   -1,   15,
     15,   -1,   16,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     23,   -1,   24,   24,   24,   24,   24,   24,   24,   24,
     -1,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   -1,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   -1,   27,   27,   -1,
     28,   28,   28,   -1,   29,   29,   29,   29,   29,   -1,
     30,   30,   30
  ];

var yybase = [
      0,  124,   53,  123,  132,  -17,  -17,  -17,  -17,  -17,
    -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,  -17,  110,
    111,  112,  113,  114,  115,  116,   56,  117,  118,  119,
     86,   89,   90,    8,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,   37,
     37,   14,   81,   29,   29,   29,   10,   27,   27,   27,
     30,   70,   73,   65,   57,  -11,   66,   71,   76,   64,
     62,   40,   28,  106,  107,   16,  108,   74,   75,   75,
     83,   11,   72,  100,   69,   67,   99,   98,  128,   93,
     92,   91,   88,   77,  129,   97,   79,   17,   51,   52,
     81,  105,   80,   58,   82,  130,   84,  127,   63,  120,
    121,   61,   87,   95,   94,   96,  104,   59,  102,  122,
     78,  125,   54,   60,   68,  126,  109,   26,   85,  103,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,  -17,  -17,  -17,  -17,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      8,    8,    8,    8,    8,    8,    8,    8,    8,    8,
      8,    6,    6,    6,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    -17,  -17,   10,   10,  -17,  -17,  -17,    0,    0,    0,
      0,    0,  101,  101,  101,  101,    0,  101,  101,  101,
    101,  101,    0,    0,  131,  131,    0,  131
  ];

var YY2TBLSTATE = 87;

var yydefault = [
      2,32767,32767,32767,32767,   14,   43,   15,   16,   17,
     18,   60,   52,   53,   44,   57,   54,   55,   56,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,    1,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,   45,
     46,   23,   62,   47,   48,   49,32767,   59,   50,   51,
     64,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
     34,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
     62,32767,32767,32767,32767,32767,   42,32767,32767,   66,
     31,32767,32767,32767,32767,32767,32767,32767,32767,32767,
     68,32767,32767,32767,32767,32767,32767,32767,32767,32767,
      2,    2,    2,    2,    2,    2,    2,    2,    2,    2,
      2
  ];



var yygoto = [
      5,   12,   13,   84,   86,    1,    7,    8,    9,   10,
     67,   11,    2,  188,   59,   60,   63,   64,   65,    5,
     14,    3,   68,   69,   15,   16,   17,   18,    4,   61,
     61,   61,   61,   61,   61,   61,   61,   61,   61,   61,
    115,    0,    0,   61,   62,  156,  156,  156,  156,  156,
    156,  156,  156,  156,  156,  156,    0,    0,    0,  156,
     19,   20,   21,   22,   23,   24,   25,   26,   27,   28,
     29,  192,  192,  192,  192,  192,   77,   78,   79,   80,
      0,  136,    0,    0,    0,   66
  ];

var YYGLAST = 86;

var yygcheck = [
     14,   14,   14,   16,   16,   14,   14,   14,   14,   14,
     14,   14,   14,   11,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   13,
     13,   13,   13,   13,   13,   13,   13,   13,   13,   13,
      4,   -1,   -1,   13,   13,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,   -1,   -1,   -1,    5,
      2,    2,    2,    2,    2,    2,    2,    2,    2,    2,
      2,   18,   18,   18,   18,   18,   15,   15,   15,   15,
     -1,    4,   -1,   -1,   -1,   13
  ];

var yygbase = [
      0,    0,  -80,    0,    6,   26,    0,    0,    0,    0,
      0,  -68,    0,   10,  -30,    5,  -85,    0,   -5,    0
  ];

var yygdefault = [
  -32768,   91,   33,  154,  155,  212,  157,  158,  159,  160,
    161,  162,  163,  110,    6,   76,   83,  186,  191,  214
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    4,    4,    4,    4,    4,    5,
      5,    5,    5,    6,    7,    7,    7,    7,    8,    9,
      9,   10,   10,   10,   11,   11,   17,   17,   12,   12,
     15,   15,   18,   16,   16,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   13,   13,   13,   13,   13,   13,
     13,   19,   19
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    3,    4,    4,    4,    4,    1,
      2,    3,    4,    1,    5,    7,    6,    8,    5,    5,
      6,    4,    5,    7,    8,    9,    4,    2,    8,   18,
      1,    2,    4,    3,    5,    3,    3,    3,    3,    3,
      4,    4,    3,    3,    4,    4,    4,    4,    3,    2,
      2,    1,    1,    1,    2,    2,    4,    5,    5,    8,
      6,    1,    1
  ];

var YYSTATES = 192;
var YYNLSTATES = 151;
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
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '');} break;
        case 66:
{yyval = lib_dic.get_types(yyastk[yysp-(4-4)], '') + " " + lib_dic.get_vars(yyastk[yysp-(4-2)], '');
			 lib_dic.set_vars_type(lib_dic.get_vars(yyastk[yysp-(4-2)], ''), lib_dic.get_types(yyastk[yysp-(4-4)], ''));} break;
        case 67:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + "." + lib_dic.get_property(lib_dic.get_vars(yyastk[yysp-(5-2)], ''), yyastk[yysp-(5-5)]);} break;
        case 68:
{yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '[' + yyastk[yysp-(5-4)] + ']';} break;
        case 69:
{yyval = lib_dic.get_vars(yyastk[yysp-(8-2)], '') + '[' + yyastk[yysp-(8-4)] + ']' 
			 + "." + lib_dic.get_property(lib_dic.get_vars(yyastk[yysp-(8-2)], ''), yyastk[yysp-(8-8)]);} break;
        case 70:
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


