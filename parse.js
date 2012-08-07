
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
var UMINUS = 267;

  
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
      0,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   26,   29,   29,   29,   15,   16,   29,
     27,   28,   13,   11,   23,   12,   29,   14,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   22,   29,
     24,   19,   25,   29,   18,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   20,   17,   21,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,    1,    2,    3,    4,
      5,    6,    7,   29,    8,    9,   10,   29
  ];

var YYBADCH = 29;
var YYMAXLEX = 268;
var YYTERMS = 29;
var YYNONTERMS = 13;

var yyaction = [
    125,  126,   96,   97,   63,   64,   65,   66,    0,  104,
     23,   72,   17,   15,   16,   75,   70,   55,   55,   28,
     29,   30,   73,   74,   24,   25,   97,   90,   58,   59,
     15,   16,   75,   26,   27,   52,-32766,-32766,-32766,   60,
     62,   55,   26,   27,   71,   61,   44,  120,   77,   32,
    119,   33,   79,    0,    0,   78,   36,   98,    0,    0,
      0,    0,   22,   21,   20,   19,   34,   35,    0,   56,
     81,   80,    0,   67,   69,   76,   99,  101,    0,   31,
     18,    0,   68
  ];

var YYLAST = 83;

var yycheck = [
      2,    3,    5,    5,   11,   12,   13,   14,    0,    4,
     12,    9,   19,   24,   25,   26,   18,   20,   20,   13,
     14,   15,   16,   17,   26,   27,    5,    6,    7,    8,
     24,   25,   26,   11,   12,    5,   13,   14,   15,   18,
      5,   20,   11,   12,    5,    5,    5,    5,   10,   16,
     28,   17,   20,   -1,   -1,   20,   19,   21,   -1,   -1,
     -1,   -1,   19,   19,   19,   19,   19,   19,   -1,   20,
     20,   20,   -1,   21,   21,   21,   21,   21,   -1,   22,
     22,   -1,   23
  ];

var yybase = [
      0,   22,   31,   31,   31,   31,   31,   31,   31,   31,
     31,   31,   31,   31,   31,   47,   48,   -2,   -2,   -2,
     -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,
     -2,   -2,   -2,   -2,   -2,   -2,   -2,    6,    6,   36,
     55,   54,   56,   21,   -7,   23,   23,   23,  -11,  -11,
    -11,   -3,   35,   52,   53,   40,   40,    8,   30,   49,
     41,   58,   32,   46,   45,   44,   43,    5,   39,    2,
     42,   57,   51,   33,   34,   37,   38,   50,    0,    0,
      0,    0,    0,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,   -2,   -2,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,   21,   21,   21,   21,    0,    0,    6,    6,    6,
      0,    0,    0,    0,    0,   59,   59
  ];

var YY2TBLSTATE = 55;

var yydefault = [
      2,32767,    9,   23,   10,   11,   12,   13,   40,   32,
     33,   24,   34,   35,   36,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   25,   26,32767,
  32767,32767,32767,    1,32767,   27,   28,   29,   39,   30,
     31,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,   18,32767,    2,    2,
      2,    2
  ];



var yygoto = [
     10,    2,    3,    4,    5,    6,    7,   48,    8,    1,
     37,   38,   45,   46,   47,   11,   49,   50,   12,   13,
     14,   87,   87,   87,   87,   87,   39,   40,   41,   42,
    103,   54
  ];

var YYGLAST = 32;

var yygcheck = [
      8,    8,    8,    8,    8,    8,    8,    8,    8,    8,
      8,    8,    8,    8,    8,    8,    8,    8,    8,    8,
      8,    5,    5,    5,    5,    5,    2,    2,    2,    2,
     11,   10
  ];

var yygbase = [
      0,    0,  -52,    0,    0,  -18,    0,    0,  -16,    0,
    -25,  -21,    0
  ];

var yygdefault = [
  -32768,   57,   43,   85,   86,  123,   88,   89,    9,   51,
     53,  102,  124
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    4,
      4,    4,    4,    4,    5,    5,    6,    6,    7,    7,
      9,    9,   11,   10,   10,    8,    8,    8,    8,    8,
      8,    8,    8,    8,    8,    8,    8,    8,    8,    8,
      8,    8,    8,   12,   12
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    4,
      5,    5,    5,    5,    2,    1,    5,    6,    8,   12,
      1,    2,    4,    3,    5,    3,    3,    3,    3,    3,
      4,    4,    3,    3,    4,    4,    4,    3,    2,    2,
      2,    1,    1,    1,    1
  ];

var YYSTATES = 102;
var YYNLSTATES = 82;
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
        case 9:
{ yyval = lib_dic.get_vars(yyastk[yysp-(4-2)], '') + '=' + yyastk[yysp-(4-4)];} break;
        case 10:
{ yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '+=' + yyastk[yysp-(5-5)];} break;
        case 11:
{ yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '-=' + yyastk[yysp-(5-5)];} break;
        case 12:
{ yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '*=' + yyastk[yysp-(5-5)];} break;
        case 13:
{ yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '/=' + yyastk[yysp-(5-5)];} break;
        case 14:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 15:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 16:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 17:
{yyval = yyastk[yysp-(6-2)] + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],'') + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 18:
{yyval = 'if (' + yyastk[yysp-(8-3)] + ') {' + yyastk[yysp-(8-7)] + '}' } break;
        case 19:
{yyval = 'if (' + yyastk[yysp-(12-3)] + ') {' + yyastk[yysp-(12-7)] + '} else {' + yyastk[yysp-(12-11)] +'}' } break;
        case 21:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 22:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 23:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 24:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 25:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 26:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 27:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 28:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 29:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 30:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 31:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 32:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 33:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 34:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 35:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 36:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 37:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 38:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '')} break;
        case 39:
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 40:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
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


