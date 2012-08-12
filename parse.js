
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
      5,    6,    7,   29,    8,    9,   10,   29,   29
  ];

var YYBADCH = 29;
var YYMAXLEX = 269;
var YYTERMS = 29;
var YYNONTERMS = 15;

var yyaction = [
    136,  137,   79,    0,-32766,-32766,-32766,   17,   18,   80,
     27,  113,   31,   32,   76,   71,   41,-32766,-32766,-32766,
    104,  136,  137,   28,   29,-32766,-32766,-32766,  129,   84,
     83,   27,   31,   32,   59,  135,   56,   40,   33,   34,
     35,   77,   78,   79,   28,   29,   65,   74,   17,   18,
     80,  136,  137,   81,   37,-32766,-32766,-32766,   26,   66,
     38,   27,  105,   96,   62,   63,   67,   68,   69,   70,
     30,   24,   23,   21,   28,   29,   59,   42,   25,   39,
     73,   60,   85,   86,   87,   64,  109,  107,  106,   82,
     75,   72,    0,   36,   22
  ];

var YYLAST = 95;

var yycheck = [
      2,    3,   18,    0,    6,    7,    8,   23,   24,   25,
     12,    4,   11,   12,    5,    5,   18,   13,   14,   15,
      5,    2,    3,   25,   26,    6,    7,    8,   27,   19,
     10,   12,   11,   12,   19,    5,    5,   18,   13,   14,
     15,   16,   17,   18,   25,   26,    5,    5,   23,   24,
     25,    2,    3,    9,   16,    6,    7,    8,   18,    4,
     17,   12,    5,    6,    7,    8,   11,   12,   13,   14,
     18,   18,   18,   18,   25,   26,   19,   18,   18,   18,
     22,   19,   19,   19,   19,   28,   20,   20,   20,   20,
     20,   20,   -1,   21,   21
  ];

var yybase = [
      0,    1,   21,   21,   21,   21,   21,   21,   21,   21,
     21,   21,   21,   21,   21,   21,   21,   19,   -2,   25,
     25,   49,   49,   49,   49,   49,   49,   49,   49,   49,
     49,   49,   49,   49,   49,   49,   49,   49,   49,   49,
     49,   49,   49,   68,   67,   69,   66,   57,   55,    4,
      4,    4,  -16,  -16,  -16,   15,   10,   71,   70,   41,
     41,    3,   31,   62,   30,   73,   42,   54,   53,   60,
     40,   63,    7,    9,   52,   44,   72,   38,   43,   61,
     59,   64,   20,   65,    0,    0,    0,    0,    0,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   57,   57,    0,    0,   57,
     57,   57,   57,   57,   57,   57,   57,   57,   57,   57,
     57,   57,   57,   57,   57,   57,   57,   57,   57,   57,
     57,   57,   57,   57,   57,    0,    0,   25,   25,   25,
      0,    0,    0,    0,    0,   58,   58
  ];

var YY2TBLSTATE = 59;

var yydefault = [
      2,32767,    9,   26,   10,   11,   12,   13,   43,   15,
     35,   36,   27,   40,   37,   38,   39,32767,32767,   28,
     29,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,    1,32767,   30,
     31,   32,   42,   33,   34,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,   14,32767,32767,32767,32767,32767,
  32767,32767,   20,32767,    2,    2,    2,    2
  ];



var yygoto = [
     11,  112,   58,    2,    3,    4,    5,    6,    7,   52,
      8,    1,    9,   19,   20,   49,   50,   51,   12,   53,
     54,   13,   14,   15,   16,    0,   93,   93,   93,   93,
     93,   48,   48,   48,   48,   48,   43,   44,   45,   46
  ];

var YYGLAST = 40;

var yygcheck = [
      9,   13,   11,    9,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    9,   -1,    5,    5,    5,    5,
      5,    8,    8,    8,    8,    8,    2,    2,    2,    2
  ];

var yygbase = [
      0,    0,  -48,    0,    0,  -17,    0,    0,  -12,  -18,
      0,  -58,    0,  -54,    0
  ];

var yygdefault = [
  -32768,   61,   47,   91,   92,  132,   94,   95,  133,   10,
     55,   57,-32768,  111,  134
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    4,
      4,    4,    4,    4,    4,    4,    5,    5,    6,    6,
      7,    7,   12,   10,   10,   13,   11,   11,    9,    9,
      9,    9,    9,    9,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    9,    9,    9,    8,   14,   14
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    3,
      4,    4,    4,    4,    3,    5,    2,    1,    5,    6,
      8,   12,    5,    1,    2,    4,    3,    5,    3,    3,
      3,    3,    3,    4,    4,    3,    3,    4,    4,    4,
      4,    3,    2,    2,    1,    1,    1,    2,    1,    1
  ];

var YYSTATES = 109;
var YYNLSTATES = 88;
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
{yyval = lib_dic.get_types(yyastk[yysp-(3-3)], '') + " " + yyastk[yysp-(3-1)] ;} break;
        case 15:
{yyval = lib_dic.get_types(yyastk[yysp-(5-3)], '') + " " + yyastk[yysp-(5-1)] + '=' + yyastk[yysp-(5-5)];} break;
        case 16:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 17:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 18:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 19:
{yyval = yyastk[yysp-(6-2)] + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],'') + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 20:
{yyval = 'if (' + yyastk[yysp-(8-3)] + ') {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 21:
{yyval = 'if (' + yyastk[yysp-(12-3)] + ') {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}' } break;
        case 22:
{ yyval = lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '(' + yyastk[yysp-(5-1)] + ') {\n' + yyastk[yysp-(5-4)] + '}' } break;
        case 24:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 25:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 26:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 27:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 28:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 29:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 30:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 31:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 32:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 33:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 34:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 35:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 36:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 37:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 38:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 39:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 40:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 41:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 42:
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 43:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
        case 47:
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


