
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
     45,   46,   47,   48,   49,  121,  122,  123,  224,  225,
    170,  171,  170,  164,   16,   17,  124,   71,   92,   72,
     93,    0,   73,  104,   73,   41,   94,   95,  100,  101,
    102,  103,   88,   88,   87,   34,  109,  110,  114,  218,
     42,   43,  140,   94,   95,   94,   95,-32766,-32766,-32766,
  -32766,-32766,  123,   93,-32766,-32766,   70,  143,   36,   16,
     17,  124,   82,   85,   96,   97,   98,  149,   99,  105,
    106,  112,  118,  120,  125,  131,  135,  184,  172,  173,
    220,  222,   56,   90,  195,  117,  132,  138,   40,  211,
     74,  133,  119,    0,    0,    0,  126,    0,   81,    0,
    139,  128,    0,    0,  192,    0,    0,    0,    0,    0,
      0,   51,    0,   52,    0,   39,   38,   37,   54,   55,
     53,    0,  146,  144,  142,  141,   89,  150,  148,  147,
    145,    0,  178,  182,  177,  179,  190,  188,  191,  107,
    176,  180,  181,  115,  137,  113,    0,   35,  129,    0,
    130,  185,  223,    0,   33,   44,   50,   57,   75,    0,
    108,  127,  134
  ];

var YYLAST = 163;

var yycheck = [
     18,   19,   20,   21,   22,   23,   24,   25,    2,    3,
      4,    4,    4,    5,   32,   33,   34,    9,   10,   11,
     12,    0,   16,    7,   16,   19,   37,   38,   18,   19,
     20,   21,   26,   26,   26,   25,    6,    7,    7,    4,
     34,   35,   26,   37,   38,   37,   38,   18,   19,   20,
     21,   22,   25,   12,   18,   19,    4,   26,   28,   32,
     33,   34,    4,    4,    4,    4,    4,   26,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,   25,   27,    6,    6,    6,    6,   25,   36,
      8,   37,   37,   -1,   -1,   -1,   13,   -1,   14,   -1,
     15,   15,   -1,   -1,   17,   -1,   -1,   -1,   -1,   -1,
     -1,   23,   -1,   24,   -1,   25,   25,   25,   25,   25,
     25,   -1,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   -1,   27,   27,   27,   27,   27,   27,   27,   27,
     27,   27,   27,   27,   27,   27,   -1,   28,   28,   -1,
     29,   29,   29,   -1,   30,   30,   30,   30,   30,   -1,
     31,   31,   31
  ];

var yybase = [
      0,  122,  121,   53,  131,  113,  114,  115,  105,  106,
    107,  108,   56,  109,  110,  111,   93,   94,  -18,  -18,
    -18,  -18,  -18,  -18,  -18,  -18,  -18,  -18,  -18,  -18,
    -18,  -18,    8,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,   36,   36,
     82,   82,   29,   29,   29,   10,   27,   27,   27,   87,
     30,   58,   61,   62,   74,  -11,   59,   66,   73,   75,
      7,   41,   16,  112,  118,   31,  116,   64,   65,   65,
     84,   21,   60,  100,   52,   35,   99,   98,  119,  124,
     92,   91,   90,   63,   67,  125,   97,   79,   68,   55,
     69,   82,  104,   78,   70,   83,  130,   86,  126,   76,
    120,   88,   89,   95,   57,   96,  103,   71,  102,  123,
     80,  127,   54,   77,   72,  128,  117,   81,   85,  101,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,  -18,  -18,  -18,  -18,    8,    8,    8,    8,
      8,    8,    8,    8,    8,    8,    8,    6,    6,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,  -18,
    -18,   10,   10,  -18,  -18,  -18,    0,    0,    0,    0,
      7,    0,    7,    7,    7,    7,    0,    7,    7,    7,
      7,    0,    0,    0,  129,  129,    0,  129
  ];

var YY2TBLSTATE = 87;

var yydefault = [
      2,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,   14,   45,
     15,   16,   17,   18,   62,   54,   55,   46,   59,   56,
     57,   58,    1,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,   47,   48,
     24,   64,   49,   50,   51,32767,   61,   52,   53,32767,
     66,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
     35,32767,32767,32767,32767,32767,32767,32767,   32,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   64,32767,32767,32767,32767,32767,   44,32767,32767,
     68,32767,32767,32767,32767,32767,32767,32767,32767,32767,
     70,32767,32767,32767,32767,32767,32767,32767,32767,32767,
      2,    2,    2,    2,    2,    2,    2,    2,    2,    2,
      2
  ];



var yygoto = [
     25,   26,    5,    6,    7,    8,    9,   10,   11,   12,
     13,   14,   15,   84,   86,  189,    0,    0,   18,    1,
      2,   20,   21,   22,   23,   66,   24,    3,    0,   58,
     59,   62,   63,   64,   27,   67,   68,   28,   29,   30,
     31,    4,   69,   69,   69,   69,   69,   69,   69,   69,
     69,   69,   69,   60,   60,   60,   60,   60,   60,   60,
     60,   60,   60,   60,  194,  116,    0,    0,    0,   69,
      0,  194,  194,  194,  194,  194,    0,    0,    0,    0,
     60,   61,    0,    0,    0,  156,  156,  156,  156,  156,
    156,  156,  156,  156,  156,  156,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,  136,   76,   77,
     78,   79,  156,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,   65
  ];

var YYGLAST = 124;

var yygcheck = [
     14,   14,    2,    2,    2,    2,    2,    2,    2,    2,
      2,    2,    2,   17,   17,   10,   -1,   -1,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   -1,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   15,   15,   15,   15,   15,   15,   15,   15,
     15,   15,   15,   13,   13,   13,   13,   13,   13,   13,
     13,   13,   13,   13,   19,    4,   -1,   -1,   -1,   15,
     -1,   19,   19,   19,   19,   19,   -1,   -1,   -1,   -1,
     13,   13,   -1,   -1,   -1,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,    4,   15,   15,
     15,   15,    5,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   13
  ];

var yygbase = [
      0,    0, -138,    0,   32,   80,    0,    0,    0,    0,
    -66,    0,    0,   48,  -16,   37,    0,  -75,    0,   -5,
      0
  ];

var yygdefault = [
  -32768,   91,   32,  154,  155,  214,  157,  158,  159,  160,
    161,  162,  163,  111,   19,   80,  174,   83,  187,  193,
    216
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    4,    4,    4,    4,    4,    5,
      5,    5,    5,    5,    6,    7,    7,    7,    7,    8,
      9,    9,   16,   16,   16,   10,   10,   18,   18,   11,
     11,   12,   15,   15,   19,   17,   17,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   13,   13,   13,   13,
     13,   13,   13,   20,   20
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    1,    3,    4,    4,    4,    4,    1,
      2,    3,    4,    1,    1,    5,    7,    6,    8,    5,
      5,    6,    2,    3,    5,    8,    9,    4,    2,    8,
     18,    2,    1,    2,    4,    3,    5,    3,    3,    3,
      3,    3,    4,    4,    3,    3,    4,    4,    4,    4,
      3,    2,    2,    1,    1,    1,    2,    2,    4,    5,
      5,    8,    6,    1,    1
  ];

var YYSTATES = 194;
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
{ yyval = 'new ' + lib_dic.get_types(yyastk[yysp-(2-2)]) + '()'; } break;
        case 33:
{yyval = 'new ' + lib_dic.get_types(yyastk[yysp-(3-3)]) + '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 34:
{ yyval = 'new ' + lib_dic.get_types(yyastk[yysp-(5-2)]) + '[' + yyastk[yysp-(5-4)] + ']'; } break;
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


