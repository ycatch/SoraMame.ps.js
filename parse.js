
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
     29,   29,   29,   25,   29,   29,   29,   15,   16,   29,
     26,   27,   13,   11,   22,   12,   29,   14,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   21,   29,
     23,   18,   24,   29,   28,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   29,   29,   29,   29,   29,   29,   29,
     29,   29,   29,   19,   17,   20,   29,   29,   29,   29,
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
var YYNONTERMS = 14;

var yyaction = [
    125,  126,   26,   27,-32766,-32766,-32766,-32766,-32766,-32766,
     23,    0,   62,   63,   64,   65,   34,  103,  118,   17,
     70,  125,  126,   24,   25,-32766,-32766,-32766,  125,  126,
    124,   23,-32766,-32766,-32766,   26,   27,   35,   23,   96,
     89,   58,   59,   52,   24,   25,   28,   29,   30,   71,
     72,   24,   25,   55,   95,   66,   15,   16,   73,   15,
     16,   73,   60,   61,   74,   33,   76,   32,   55,   77,
     20,   19,   21,    0,    0,   36,    0,   22,    0,   56,
     79,   78,   80,    0,   97,   67,   69,   75,   98,  100,
      0,   31,   18,    0,   68
  ];

var YYLAST = 95;

var yycheck = [
      2,    3,   11,   12,    6,    7,    8,   13,   14,   15,
     12,    0,   11,   12,   13,   14,   18,    4,   27,   18,
      5,    2,    3,   25,   26,    6,    7,    8,    2,    3,
      5,   12,    6,    7,    8,   11,   12,   18,   12,    5,
      6,    7,    8,    5,   25,   26,   13,   14,   15,   16,
     17,   25,   26,   19,    5,    5,   23,   24,   25,   23,
     24,   25,   28,    5,    9,   17,   10,   16,   19,   19,
     18,   18,   18,   -1,   -1,   18,   -1,   18,   -1,   19,
     19,   19,   19,   -1,   20,   20,   20,   20,   20,   20,
     -1,   21,   21,   -1,   22
  ];

var yybase = [
      0,   -9,   24,   24,   24,   24,   24,   24,   24,   24,
     24,   24,   24,   24,   24,   -2,   19,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   33,   33,   64,
     68,   67,   69,   34,    1,   -6,   -6,   -6,   36,   36,
     36,   49,   50,   65,   66,   58,   58,   11,   38,   60,
     25,   71,   53,   52,   54,   59,   62,   13,   15,   55,
     70,   51,   48,   57,   61,   56,   63,    0,    0,    0,
      0,    0,   33,   33,   33,   33,   33,   33,   33,   33,
     33,   33,   33,   33,   33,   33,   34,   34,   34,   34,
     34,   34,   34,   34,   34,   34,   34,   34,   34,   34,
     34,   34,   34,   34,   34,   34,   34,   34,    0,    0,
     34,   34,   34,   34,    0,    0,   33,   33,   33,    0,
      0,    0,    0,    0,   72,   72
  ];

var YY2TBLSTATE = 55;

var yydefault = [
      2,32767,    9,   23,   10,   11,   12,   13,   39,   32,
     33,   24,   34,   35,   36,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   25,   26,32767,
  32767,32767,32767,    1,32767,   27,   28,   29,   38,   30,
     31,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,   18,32767,    2,    2,    2,
      2
  ];



var yygoto = [
     10,    2,    3,    4,    5,    6,    7,   48,    8,    1,
     37,   38,   45,   46,   47,   11,   49,   50,   12,   13,
     14,   44,   44,   44,   44,   44,   86,   86,   86,   86,
     86,   39,   40,   41,   42,   54,  102
  ];

var YYGLAST = 37;

var yygcheck = [
      9,    9,    9,    9,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    9,    9,    9,    9,    9,    9,
      9,    8,    8,    8,    8,    8,    5,    5,    5,    5,
      5,    2,    2,    2,    2,   11,   12
  ];

var yygbase = [
      0,    0,  -46,    0,    0,  -13,    0,    0,  -18,  -16,
      0,  -21,  -15,    0
  ];

var yygdefault = [
  -32768,   57,   43,   84,   85,  121,   87,   88,  122,    9,
     51,   53,  101,  123
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    4,
      4,    4,    4,    4,    5,    5,    6,    6,    7,    7,
     10,   10,   12,   11,   11,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    8,   13,   13
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    3,
      4,    4,    4,    4,    2,    1,    5,    6,    8,   12,
      1,    2,    4,    3,    5,    3,    3,    3,    3,    3,
      4,    4,    3,    3,    4,    4,    4,    3,    2,    2,
      1,    1,    1,    2,    1,    1
  ];

var YYSTATES = 102;
var YYNLSTATES = 81;
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
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 10:
{ yyval = yyastk[yysp-(4-1)]  + '+=' + yyastk[yysp-(4-4)];} break;
        case 11:
{ yyval = yyastk[yysp-(4-1)]  + '-=' + yyastk[yysp-(4-4)];} break;
        case 12:
{ yyval = yyastk[yysp-(4-1)]  + '*=' + yyastk[yysp-(4-4)];} break;
        case 13:
{ yyval = yyastk[yysp-(4-1)]  + '/=' + yyastk[yysp-(4-4)];} break;
        case 14:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 15:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 16:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 17:
{yyval = yyastk[yysp-(6-2)] + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],'') + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 18:
{yyval = 'if (' + yyastk[yysp-(8-3)] + ') {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 19:
{yyval = 'if (' + yyastk[yysp-(12-3)] + ') {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}' } break;
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
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 39:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
        case 43:
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


