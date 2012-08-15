
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
var UMINUS = 268;

  
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
      0,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   27,   31,   31,   31,   17,   18,   31,
     28,   29,   15,   13,   24,   14,   31,   16,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   23,   31,
     25,   20,   26,   31,   30,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   21,   19,   22,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   31,    1,    2,    3,    4,
      5,    6,    7,    8,    9,   10,   11,   12,   31
  ];

var YYBADCH = 31;
var YYMAXLEX = 269;
var YYTERMS = 31;
var YYNONTERMS = 16;

var yyaction = [
     41,   42,   43,   96,   97,   98,  173,  174,   89,  138,
     17,   18,   99,  138,  131,   61,   73,   74,   35,   79,
     80,   81,   82,    0,   83,   70,   30,   39,   40,   69,
     98,   36,   37,  137,   75,   17,   18,   99,   75,   39,
     40,  113,   88,  165,-32766,-32766,-32766,   39,   40,   91,
    107,   94,  111,  149,  101,  172,   64,   76,   77,   78,
     84,   85,   95,  100,  104,  108,   49,   87,    0,   75,
      0,    0,  106,    0,  103,  112,    0,    0,    0,    0,
      0,    0,   45,    0,   46,    0,   48,   31,   32,   33,
     34,   47,   50,    0,  120,  116,   71,  114,  115,  117,
    118,   70,  119,    0,  140,   86,   90,   92,  110,  105,
    139,  142,  141,  145,  144,  146,    0,   29,   68,   51,
     44,   38,    0,  102
  ];

var YYLAST = 124;

var yycheck = [
     15,   16,   17,   18,   19,   20,    2,    3,    5,    5,
     25,   26,   27,    5,    6,    7,    8,    9,   14,   13,
     14,   15,   16,    0,    4,   21,   20,   13,   14,   21,
     20,   27,   28,    5,   30,   25,   26,   27,   30,   13,
     14,   21,    4,   29,   15,   16,   17,   13,   14,    4,
     24,    4,    4,    4,   10,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,   20,   24,   -1,   30,
     -1,   -1,   11,   -1,   12,   12,   -1,   -1,   -1,   -1,
     -1,   -1,   18,   -1,   19,   -1,   20,   20,   20,   20,
     20,   20,   20,   -1,   21,   21,   21,   21,   21,   21,
     21,   21,   21,   -1,   22,   22,   22,   22,   22,   22,
     22,   22,   22,   22,   22,   22,   -1,   23,   23,   23,
     23,   23,   -1,   24
  ];

var yybase = [
      0,   14,   26,   34,   34,   34,   34,   34,   34,   34,
     34,   34,   34,   34,   34,   34,   34,   66,   46,  -15,
    -15,   88,   89,   82,   90,   87,   91,   92,   93,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    8,   29,   29,   29,    6,    6,   10,   10,
     10,   51,   28,   56,   20,   83,   84,   85,   39,   53,
     55,   55,   23,   52,   75,   54,   76,   94,   38,   67,
     68,   69,   70,    3,   98,   45,   47,   57,   50,   77,
     49,   58,   44,   99,   62,   97,   64,   65,   71,   72,
     74,   78,   59,   79,   96,   61,   81,   60,   95,   86,
     48,   63,   73,    0,    0,    0,    0,    0,    0,    0,
      0,    0,  -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,
    -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,    4,    4,
      0,    0,    8,    8,    8,    8,    8,    8,    8,    8,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,  -15,  -15,  -15,    0,    0,    0,
      0,    0,   80,   80,   80,    0,   43,   43,   43
  ];

var YY2TBLSTATE = 68;

var yydefault = [
      2,32767,32767,   11,   29,   12,   13,   14,   15,   46,
     38,   39,   30,   43,   40,   41,   42,32767,32767,   31,
     32,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,    1,   33,   34,   35,32767,   48,   45,   36,
     37,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,   50,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,   28,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,   22,32767,32767,32767,32767,
  32767,32767,32767,    2,    2,    2,    2,    2,    2,    2,
      2
  ];



var yygoto = [
     10,   11,   21,   22,   23,   24,   25,   26,   27,   28,
    148,  148,   63,    3,    5,    6,    7,    8,   58,    9,
      1,   93,   19,   20,   53,   54,   55,   12,   59,   60,
     13,   14,   15,   16,    2,   56,   56,   56,   56,   56,
     56,   56,   56,   57,  126,  126,  126,  126,  126,  126,
    126,  126,   66,   67,    0,    0,    0,    0,    0,    0,
    109,    0,    0,    0,    0,    0,   56,    0,    0,    0,
      0,    0,    0,    0,    0,  126,    0,    0,    0,    0,
      0,    0,   56
  ];

var YYGLAST = 83;

var yygcheck = [
     11,   11,    2,    2,    2,    2,    2,    2,    2,    2,
     14,   14,   12,   11,   11,   11,   11,   11,   11,   11,
     11,    4,   11,   11,   11,   11,   11,   11,   11,   11,
     11,   11,   11,   11,   11,   10,   10,   10,   10,   10,
     10,   10,   10,   10,    5,    5,    5,    5,    5,    5,
      5,    5,   13,   13,   -1,   -1,   -1,   -1,   -1,   -1,
      4,   -1,   -1,   -1,   -1,   -1,   10,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,    5,   -1,   -1,   -1,   -1,
     -1,   -1,   10
  ];

var yygbase = [
      0,    0, -111,    0,   -8,   23,    0,    0,    0,    0,
     14,  -17,  -49,  -18,  -52,    0
  ];

var yygdefault = [
  -32768,   72,   52,  124,  125,  168,  127,  128,  129,  130,
    169,    4,   62,   65,  147,  170
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    4,    4,    4,    4,    4,    5,    5,    6,    6,
      6,    7,    8,    8,    9,    9,   12,   12,   14,   13,
     13,   11,   11,   11,   11,   11,   11,   11,   11,   11,
     11,   11,   11,   11,   11,   11,   11,   11,   11,   11,
     10,   10,   15,   15
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    3,    4,    4,    4,    4,    2,    1,    5,    7,
      8,    5,    8,   12,    8,   18,    1,    2,    4,    3,
      5,    3,    3,    3,    3,    3,    4,    4,    3,    3,
      4,    4,    4,    4,    3,    2,    2,    1,    1,    1,
      2,    4,    1,    1
  ];

var YYSTATES = 148;
var YYNLSTATES = 121;
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
        case 11:
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 12:
{ yyval = yyastk[yysp-(4-1)]  + '+=' + yyastk[yysp-(4-4)];} break;
        case 13:
{ yyval = yyastk[yysp-(4-1)]  + '-=' + yyastk[yysp-(4-4)];} break;
        case 14:
{ yyval = yyastk[yysp-(4-1)]  + '*=' + yyastk[yysp-(4-4)];} break;
        case 15:
{ yyval = yyastk[yysp-(4-1)]  + '/=' + yyastk[yysp-(4-4)];} break;
        case 16:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 17:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 18:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 19:
{yyval = lib_dic.get_types(yyastk[yysp-(7-4)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(7-2)],'') + '{\n' + yyastk[yysp-(7-6)] + '}';} break;
        case 20:
{yyval = lib_dic.get_types(yyastk[yysp-(8-5)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(8-3)],yyastk[yysp-(8-2)]) + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
        case 21:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 22:
{yyval = 'if (' + yyastk[yysp-(8-3)] + ') {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 23:
{yyval = 'if (' + yyastk[yysp-(12-3)] + ') {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}' } break;
        case 24:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 25:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}' } break;
        case 27:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 28:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 29:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 30:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 31:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 32:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 33:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 34:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 35:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 36:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 37:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 38:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 39:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 40:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 41:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 42:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 43:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 44:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 45:
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 46:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
        case 50:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '')} break;
        case 51:
{yyval = lib_dic.get_types(yyastk[yysp-(4-4)], '') + " " + lib_dic.get_vars(yyastk[yysp-(4-2)], '')} break;
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


