
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
     42,   43,   44,   92,   93,   94,  168,  169,  134,  135,
     18,   19,   95,  135,  126,   72,   73,   74,   35,   40,
     41,   94,   40,   41,   70,   70,   18,   19,   95,   68,
     78,   36,   37,  103,   75,  161,   83,    0,   75,   79,
     80,   81,   82,-32766,-32766,-32766,   30,   40,   41,   90,
    107,  145,  109,  100,  167,   63,   76,   77,   84,   87,
     91,  104,   46,   39,  136,   86,   75,   97,    0,  102,
      0,  108,   99,    0,    0,    0,    0,    0,    0,    0,
     47,    0,   51,   49,   50,   31,   32,   33,   34,   48,
      0,  111,  114,  110,   69,  112,  113,  115,    0,   85,
     88,   96,  106,  101,  142,  137,  140,  139,  141,    0,
     29,   67,   52,   45,   38,    0,   98
  ];

var YYLAST = 117;

var yycheck = [
     15,   16,   17,   18,   19,   20,    2,    3,    5,    5,
     25,   26,   27,    5,    6,    7,    8,    9,   14,   13,
     14,   20,   13,   14,   21,   21,   25,   26,   27,   21,
      4,   27,   28,   24,   30,   29,    5,    0,   30,   13,
     14,   15,   16,   15,   16,   17,   20,   13,   14,    4,
      4,    4,   21,    5,    5,    5,    5,    5,    5,    5,
      5,    5,   18,   20,   22,   24,   30,   10,   -1,   11,
     -1,   12,   12,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     19,   -1,   20,   20,   20,   20,   20,   20,   20,   20,
     -1,   21,   21,   21,   21,   21,   21,   21,   -1,   22,
     22,   22,   22,   22,   22,   22,   22,   22,   22,   -1,
     23,   23,   23,   23,   23,   -1,   24
  ];

var yybase = [
      0,    6,    9,   34,   34,   34,   34,   34,   34,   34,
     34,   34,   34,   34,   34,   34,   34,   34,   63,   64,
    -15,  -15,   42,   82,   83,   81,   84,   85,   86,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    8,   26,   26,   28,   28,   28,    1,
      1,    1,    3,   31,   77,   78,   79,   36,   52,   53,
     53,   37,   50,   51,   73,   49,   72,   87,   54,   65,
     66,   67,   68,   70,   91,   45,   55,   43,   57,   92,
     60,   90,   44,   61,   69,   62,   47,   74,   48,   75,
     89,   58,   71,   56,   88,   80,   46,   59,   76,    0,
      0,    0,    0,    0,    0,    0,    0,  -15,  -15,  -15,
    -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,
    -15,  -15,  -15,  -15,    4,    4,    0,    0,    8,    8,
      8,    8,    8,    8,    8,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,  -15,  -15,  -15,    0,    0,    0,    0,    0,
     41,   41,   41
  ];

var YY2TBLSTATE = 67;

var yydefault = [
      2,32767,32767,   11,   30,   12,   13,   14,   15,   47,
     17,   39,   40,   31,   44,   41,   42,   43,32767,32767,
     32,   33,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,    1,32767,   49,   34,   35,   36,   46,
     37,   38,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   16,32767,32767,
     29,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   22,32767,32767,32767,32767,32767,32767,32767,    2,
      2,    2,    2,    2,    2,    2
  ];



var yygoto = [
     11,   12,   22,   23,   24,   25,   26,   27,   28,   65,
     66,  144,    3,    5,    6,    7,    8,   59,    9,    1,
     89,   10,   20,   21,   56,   57,   58,   13,   60,   61,
     14,   15,   16,   17,    2,   54,   54,   54,   54,   54,
     54,   54,   55,  121,  121,  121,  121,  121,  121,  121,
      0,    0,    0,    0,    0,    0,    0,    0,  105,    0,
      0,    0,    0,    0,    0,    0,   54,    0,    0,    0,
      0,    0,    0,    0,  121,    0,    0,    0,    0,    0,
     54
  ];

var YYGLAST = 81;

var yygcheck = [
     11,   11,    2,    2,    2,    2,    2,    2,    2,   13,
     13,   14,   11,   11,   11,   11,   11,   11,   11,   11,
      4,   11,   11,   11,   11,   11,   11,   11,   11,   11,
     11,   11,   11,   11,   11,   10,   10,   10,   10,   10,
     10,   10,   10,    5,    5,    5,    5,    5,    5,    5,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   10,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,    5,   -1,   -1,   -1,   -1,   -1,
     10
  ];

var yygbase = [
      0,    0, -107,    0,   -9,   21,    0,    0,    0,    0,
     13,  -18,    0,  -60,  -51,    0
  ];

var yygdefault = [
  -32768,   71,   53,  119,  120,  164,  122,  123,  124,  125,
    165,    4,   62,   64,  143,  166
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    4,    4,    4,    4,    4,    4,    4,    5,    5,
      6,    6,    7,    7,    8,    8,    9,   12,   12,   14,
     13,   13,   11,   11,   11,   11,   11,   11,   11,   11,
     11,   11,   11,   11,   11,   11,   11,   11,   11,   11,
     11,   10,   15,   15
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    3,    4,    4,    4,    4,    3,    5,    2,    1,
      5,    6,    8,   12,    8,   18,    5,    1,    2,    4,
      3,    5,    3,    3,    3,    3,    3,    4,    4,    3,
      3,    4,    4,    4,    4,    3,    2,    2,    1,    1,
      1,    2,    1,    1
  ];

var YYSTATES = 142;
var YYNLSTATES = 116;
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
{yyval = lib_dic.get_types(yyastk[yysp-(3-3)], '') + " " + yyastk[yysp-(3-1)] ;} break;
        case 17:
{yyval = lib_dic.get_types(yyastk[yysp-(5-3)], '') + " " + yyastk[yysp-(5-1)] + '=' + yyastk[yysp-(5-5)];} break;
        case 18:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 19:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 20:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 21:
{yyval = yyastk[yysp-(6-2)] + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],'') + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 22:
{yyval = 'if (' + yyastk[yysp-(8-3)] + ') {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 23:
{yyval = 'if (' + yyastk[yysp-(12-3)] + ') {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}' } break;
        case 24:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 25:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}' } break;
        case 26:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 28:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 29:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 30:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 31:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 32:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 33:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 34:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 35:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 36:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 37:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 38:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 39:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 40:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 41:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 42:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 43:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 44:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 45:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 46:
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 47:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
        case 51:
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


