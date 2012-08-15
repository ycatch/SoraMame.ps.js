
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
var IF = 264;
var THEN = 265;
var ELSE = 266;
var LOOP = 267;
var NEW = 268;
var UMINUS = 269;

  
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
      0,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   28,   32,   32,   32,   18,   19,   32,
     29,   30,   16,   14,   25,   15,   32,   17,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   24,   32,
     26,   21,   27,   32,   31,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   22,   20,   23,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,   32,   32,   32,   32,
     32,   32,   32,   32,   32,   32,    1,    2,    3,    4,
      5,    6,    7,    8,    9,   10,   11,   12,   13,   32
  ];

var YYBADCH = 32;
var YYMAXLEX = 270;
var YYTERMS = 32;
var YYNONTERMS = 18;

var yyaction = [
     42,   43,   44,  100,  101,  102,  183,  184,  112,  145,
     18,   19,  103,  145,  138,   65,   78,   79,  102,   36,
     40,   41,    0,   18,   19,  103,   75,   40,   41,   95,
     74,   88,   37,   38,  115,   80,  175,   92,  111,   80,
     84,   85,   86,   87,-32766,-32766,-32766,  119,   98,  117,
     40,   41,  159,  105,  104,   99,   93,   83,  145,   68,
    108,   89,   82,  144,   81,  182,   71,   48,  125,   31,
     80,    0,    0,  110,    0,  107,  116,    0,   64,    0,
      0,    0,    0,    0,    0,   47,    0,    0,   45,   32,
     33,   34,   35,   49,   52,   17,   51,   50,    0,  123,
    122,  121,  120,  118,   76,   75,  124,    0,  155,   90,
     94,   96,  114,  109,  147,  151,  149,  148,  150,  154,
    156,    0,   73,   53,   46,   39,    0,   91,  106
  ];

var YYLAST = 129;

var yycheck = [
     16,   17,   18,   19,   20,   21,    2,    3,    5,    5,
     26,   27,   28,    5,    6,    7,    8,    9,   21,   15,
     14,   15,    0,   26,   27,   28,   22,   14,   15,    4,
     22,    4,   28,   29,    4,   31,   30,    4,   25,   31,
     14,   15,   16,   17,   16,   17,   18,   22,    4,   22,
     14,   15,    4,   10,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,   20,   22,   24,
     31,   -1,   -1,   11,   -1,   12,   12,   -1,   13,   -1,
     -1,   -1,   -1,   -1,   -1,   19,   -1,   -1,   21,   21,
     21,   21,   21,   21,   21,   21,   21,   21,   -1,   22,
     22,   22,   22,   22,   22,   22,   22,   -1,   23,   23,
     23,   23,   23,   23,   23,   23,   23,   23,   23,   23,
     23,   -1,   24,   24,   24,   24,   -1,   25,   25
  ];

var yybase = [
      0,    6,   13,   36,   36,   36,   36,   36,   36,   36,
     36,   36,   36,   36,   36,   36,   36,   65,   76,   75,
    -16,  -16,   91,   92,   93,   94,   95,   90,   85,   96,
     97,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    8,   28,   28,   28,   74,   67,
     67,   -3,   -3,   -3,   53,   54,   58,   61,   27,   86,
     87,   25,   88,   39,   57,   56,   56,   22,   59,   82,
     52,   81,   45,   33,   68,   69,   70,   71,   51,  101,
     44,   50,   60,   80,   48,   49,   43,  103,   63,  100,
     66,   47,   72,   73,   79,   78,   55,   77,   99,   62,
     84,    3,   98,   89,   30,   64,   46,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,  -16,  -16,  -16,
    -16,  -16,  -16,  -16,  -16,  -16,  -16,  -16,  -16,  -16,
    -16,  -16,  -16,    4,    4,    4,    0,    0,    8,    8,
      8,    8,    8,    8,    8,    8,    8,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,  -16,  -16,  -16,   26,   26,   26,    0,    0,    0,
     83,   83,   83,   83,    0,  102,  102,    0,  102
  ];

var YY2TBLSTATE = 73;

var yydefault = [
      2,32767,32767,   13,   34,   14,   15,   16,   17,   51,
     43,   44,   35,   48,   45,   46,   47,32767,32767,32767,
     36,   37,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,    1,   38,   39,   40,   20,   53,
  32767,   50,   41,   42,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,   55,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,   33,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,   27,
  32767,32767,32767,32767,32767,32767,32767,    2,    2,    2,
      2,    2,    2,    2,    2,    2
  ];



var yygoto = [
      3,   10,   11,   22,   23,   24,   25,   26,   27,   28,
     29,   30,  158,  158,   67,    5,    6,    7,    8,   61,
      9,    1,   97,   20,   21,   55,   56,   57,    3,   12,
     62,   63,   13,   14,   15,   16,    2,   58,   58,   58,
     58,   58,   58,   58,   58,   58,   59,  131,  131,  131,
    131,  131,  131,  131,  131,  131,   70,   72,    0,    0,
      0,    0,    0,    0,  113,    0,    0,    0,    0,   58,
      0,    0,    0,    0,    0,    0,    0,    0,    0,  131,
      0,    0,    0,    0,    0,    0,    0,    0,   60,  152
  ];

var YYGLAST = 90;

var yygcheck = [
     13,   13,   13,    2,    2,    2,    2,    2,    2,    2,
      2,    2,   16,   16,   14,   13,   13,   13,   13,   13,
     13,   13,    4,   13,   13,   13,   13,   13,   13,   13,
     13,   13,   13,   13,   13,   13,   13,   12,   12,   12,
     12,   12,   12,   12,   12,   12,   12,    5,    5,    5,
      5,    5,    5,    5,    5,    5,   15,   15,   -1,   -1,
     -1,   -1,   -1,   -1,    4,   -1,   -1,   -1,   -1,   12,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    5,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   12,    5
  ];

var yygbase = [
      0,    0, -114,    0,   -9,   25,    0,    0,    0,    0,
      0,    0,   15,  -17,  -51,  -19,  -54,    0
  ];

var yygdefault = [
  -32768,   77,   54,  129,  130,  178,  132,  133,  134,  135,
    136,  137,  179,    4,   66,   69,  157,  180
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    4,    4,    4,    4,    4,    5,    5,
      6,    7,    7,    7,    7,    8,    9,   10,   10,   11,
     11,   14,   14,   16,   15,   15,   13,   13,   13,   13,
     13,   13,   13,   13,   13,   13,   13,   13,   13,   13,
     13,   13,   13,   13,   13,   12,   12,   17,   17
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    1,    3,    4,    4,    4,    4,    2,    1,
      1,    5,    7,    6,    8,    5,    4,    8,   12,    8,
     18,    1,    2,    4,    3,    5,    3,    3,    3,    3,
      3,    4,    4,    3,    3,    4,    4,    4,    4,    3,
      2,    2,    1,    1,    1,    2,    4,    1,    1
  ];

var YYSTATES = 157;
var YYNLSTATES = 126;
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
        case 13:
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 14:
{ yyval = yyastk[yysp-(4-1)]  + '+=' + yyastk[yysp-(4-4)];} break;
        case 15:
{ yyval = yyastk[yysp-(4-1)]  + '-=' + yyastk[yysp-(4-4)];} break;
        case 16:
{ yyval = yyastk[yysp-(4-1)]  + '*=' + yyastk[yysp-(4-4)];} break;
        case 17:
{ yyval = yyastk[yysp-(4-1)]  + '/=' + yyastk[yysp-(4-4)];} break;
        case 18:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 19:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 20:
{yyval = yyastk[yysp-(1-1)] + ';';} break;
        case 21:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 22:
{yyval = lib_dic.get_types(yyastk[yysp-(7-4)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(7-2)],'') + '{\n' + yyastk[yysp-(7-6)] + '}';} break;
        case 23:
{yyval = 'void ' + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],yyastk[yysp-(6-2)]) + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 24:
{yyval = lib_dic.get_types(yyastk[yysp-(8-5)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(8-3)],yyastk[yysp-(8-2)]) + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
        case 25:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 26:
{ yyval = yyastk[yysp-(4-1)] + ' = new ' + yyastk[yysp-(4-4)]; } break;
        case 27:
{yyval = lib_dic.get_comm(yyastk[yysp-(8-1)],yyastk[yysp-(8-3)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 28:
{yyval = lib_dic.get_comm(yyastk[yysp-(12-1)],yyastk[yysp-(12-3)]) + ' {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}'; } break;
        case 29:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 30:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}'; } break;
        case 32:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 33:
{ yyval = yyastk[yysp-(4-2)]; } break;
        case 34:
{ yyval = yyastk[yysp-(3-3)]; } break;
        case 35:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)]; } break;
        case 36:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 37:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 38:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 39:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 40:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 41:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 42:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 43:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 44:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 45:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 46:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 47:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 48:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 49:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 50:
{yyval = '-' + yyastk[yysp-(2-2)];} break;
        case 51:
{yyval = '!' + yyastk[yysp-(2-2)];} break;
        case 55:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '');} break;
        case 56:
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


