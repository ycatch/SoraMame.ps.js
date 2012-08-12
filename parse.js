
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
      0,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   26,   30,   30,   30,   16,   17,   30,
     27,   28,   14,   12,   23,   13,   30,   15,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   22,   30,
     24,   19,   25,   30,   29,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   20,   18,   21,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,   30,   30,   30,   30,
     30,   30,   30,   30,   30,   30,    1,    2,    3,    4,
      5,    6,    7,   30,    8,    9,   10,   11,   30
  ];

var YYBADCH = 30;
var YYMAXLEX = 269;
var YYTERMS = 30;
var YYNONTERMS = 15;

var yyaction = [
    141,  142,   31,   32,-32766,-32766,-32766,   31,   32,  141,
    142,   27,    0,-32766,-32766,-32766,   82,   41,  134,  118,
     27,   17,   18,   83,   28,   29,   40,   33,   34,   35,
     80,   81,   82,   28,   29,   79,  140,   17,   18,   83,
    141,  142,   74,   84,-32766,-32766,-32766,  110,  101,   63,
     64,   27,   57,-32766,-32766,-32766,   67,   87,   68,   86,
    109,   77,   60,   73,   28,   29,   69,   70,   71,   72,
     37,   65,   36,   21,    0,   60,   38,   61,   25,   26,
     30,   24,   42,   39,   23,    0,   88,   89,   90,   91,
      0,  111,  114,  115,   75,   85,  112,   78,    0,   22,
      0,   76
  ];

var YYLAST = 102;

var yycheck = [
      2,    3,   12,   13,    6,    7,    8,   12,   13,    2,
      3,   13,    0,    6,    7,    8,   19,   19,   28,    4,
     13,   24,   25,   26,   26,   27,   19,   14,   15,   16,
     17,   18,   19,   26,   27,    5,    5,   24,   25,   26,
      2,    3,    5,    9,    6,    7,    8,    5,    6,    7,
      8,   13,    5,   14,   15,   16,    5,   20,    4,   10,
      5,    5,   20,   11,   26,   27,   12,   13,   14,   15,
     17,   29,   22,   19,   -1,   20,   18,   20,   19,   19,
     19,   19,   19,   19,   19,   -1,   20,   20,   20,   20,
     -1,   21,   21,   21,   21,   21,   21,   21,   -1,   22,
     -1,   23
  ];

var yybase = [
      0,  -10,   -5,   -5,   -5,   -5,   -5,   -5,   -5,   -5,
     -5,   -5,   -5,   -5,   -5,   -5,   -5,    7,   -2,   13,
     13,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   38,   38,   38,   38,   38,   38,   38,
     38,   38,   38,   70,   72,   75,   74,   71,   42,   54,
     39,   39,   39,   -3,   -3,   -3,   55,   37,   73,   76,
     51,   51,   12,   47,   57,   31,   52,   77,   56,   65,
     62,   59,   60,   66,   67,   15,   30,   61,   34,   50,
     53,   58,   64,   63,   68,   49,   69,    0,    0,    0,
      0,    0,    0,   13,   13,   13,   13,   13,   13,   13,
     13,   13,   13,   13,   13,   13,   13,   13,   13,   42,
     42,    0,    0,   42,   42,   42,   42,   42,   42,   42,
     42,   42,   42,   42,   42,   42,   42,   42,   42,   42,
     42,   42,   42,   42,   42,   42,   42,   42,   42,   42,
      0,    0,   13,   13,   13,    0,    0,    0,    0,    0,
     78,   78
  ];

var YY2TBLSTATE = 60;

var yydefault = [
      2,32767,   10,   27,   11,   12,   13,   14,   44,   16,
     36,   37,   28,   41,   38,   39,   40,32767,32767,   29,
     30,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,    1,32767,
     31,   32,   33,   43,   34,   35,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,   24,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   15,32767,32767,
  32767,32767,32767,32767,32767,   21,32767,    2,    2,    2,
      2,    2
  ];



var yygoto = [
     11,   59,    0,    2,    3,    4,    5,    6,    7,   53,
      8,    1,    9,   19,   20,   50,   51,   52,   12,   54,
     55,   13,   14,   15,   16,    0,   66,   66,   66,   66,
     66,   66,   49,   49,   49,   49,   49,   49,    0,  117,
     97,   97,   97,   97,   97,   97,   43,   44,   45,   46,
     47
  ];

var YYGLAST = 51;

var yygcheck = [
     10,   12,   -1,   10,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   -1,   13,   13,   13,   13,
     13,   13,    9,    9,    9,    9,    9,    9,   -1,   13,
      5,    5,    5,    5,    5,    5,    2,    2,    2,    2,
      2
  ];

var yygbase = [
      0,    0,  -41,    0,    0,   -3,    0,    0,    0,  -11,
    -18,    0,  -60,  -17,    0
  ];

var yygdefault = [
  -32768,   62,   48,   95,   96,  137,   98,   99,  100,  138,
     10,   56,   58,  116,  139
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      4,    4,    4,    4,    4,    4,    4,    5,    5,    6,
      6,    7,    7,    8,   11,   11,   13,   12,   12,   10,
     10,   10,   10,   10,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   10,   10,   10,    9,   14,
     14
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      3,    4,    4,    4,    4,    3,    5,    2,    1,    5,
      6,    8,   12,    5,    1,    2,    4,    3,    5,    3,
      3,    3,    3,    3,    4,    4,    3,    3,    4,    4,
      4,    4,    3,    2,    2,    1,    1,    1,    2,    1,
      1
  ];

var YYSTATES = 115;
var YYNLSTATES = 92;
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
        case 10:
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 11:
{ yyval = yyastk[yysp-(4-1)]  + '+=' + yyastk[yysp-(4-4)];} break;
        case 12:
{ yyval = yyastk[yysp-(4-1)]  + '-=' + yyastk[yysp-(4-4)];} break;
        case 13:
{ yyval = yyastk[yysp-(4-1)]  + '*=' + yyastk[yysp-(4-4)];} break;
        case 14:
{ yyval = yyastk[yysp-(4-1)]  + '/=' + yyastk[yysp-(4-4)];} break;
        case 15:
{yyval = lib_dic.get_types(yyastk[yysp-(3-3)], '') + " " + yyastk[yysp-(3-1)] ;} break;
        case 16:
{yyval = lib_dic.get_types(yyastk[yysp-(5-3)], '') + " " + yyastk[yysp-(5-1)] + '=' + yyastk[yysp-(5-5)];} break;
        case 17:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 18:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 19:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 20:
{yyval = yyastk[yysp-(6-2)] + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],'') + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 21:
{yyval = 'if (' + yyastk[yysp-(8-3)] + ') {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 22:
{yyval = 'if (' + yyastk[yysp-(12-3)] + ') {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}' } break;
        case 23:
{ yyval = lib_dic.get_comm(yyastk[yysp-(5-2)],yyastk[yysp-(5-1)]) + ' {\n' + yyastk[yysp-(5-4)] + '}' } break;
        case 25:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 26:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 27:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 28:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 29:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 30:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 31:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 32:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 33:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 34:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 35:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 36:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 37:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 38:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 39:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 40:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 41:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 42:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 43:
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 44:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
        case 48:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '')} break;
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


