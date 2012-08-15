
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
      5,    6,    7,    8,    9,   10,   11,   12,   31,   31
  ];

var YYBADCH = 31;
var YYMAXLEX = 270;
var YYTERMS = 31;
var YYNONTERMS = 17;

var yyaction = [
     42,   43,   44,   98,   99,  100,  179,  180,   81,  142,
     17,   18,  101,  142,  135,   63,   76,   77,   36,   82,
     83,   84,   85,    0,   93,   73,   31,   40,   41,   72,
    100,   37,   38,   87,   78,   17,   18,  101,   78,   40,
     41,  117,   86,  171,-32766,-32766,-32766,   40,   41,  155,
    109,  113,   96,   90,  103,   91,   97,  102,  106,  115,
    110,  178,  141,   66,   69,   79,   80,   73,    0,   78,
      0,    0,   46,  108,    0,  105,  114,    0,    0,    0,
      0,    0,    0,    0,   47,    0,   35,   34,   50,   48,
     51,   32,   49,   33,    0,  121,  122,  123,  119,  118,
    116,   74,  120,    0,  144,   88,   92,   94,  112,  107,
    143,  147,  145,  146,  151,  150,  152,    0,   30,   71,
     52,   45,   39,    0,   89,  104
  ];

var YYLAST = 126;

var yycheck = [
     15,   16,   17,   18,   19,   20,    2,    3,    5,    5,
     25,   26,   27,    5,    6,    7,    8,    9,   14,   13,
     14,   15,   16,    0,    4,   21,   20,   13,   14,   21,
     20,   27,   28,    5,   30,   25,   26,   27,   30,   13,
     14,   21,    4,   29,   15,   16,   17,   13,   14,    4,
     24,    4,    4,    4,   10,    5,    5,    5,    5,   21,
      5,    5,    5,    5,    5,    5,    5,   21,   -1,   30,
     -1,   -1,   18,   11,   -1,   12,   12,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   19,   -1,   20,   20,   20,   20,
     20,   20,   20,   20,   -1,   21,   21,   21,   21,   21,
     21,   21,   21,   -1,   22,   22,   22,   22,   22,   22,
     22,   22,   22,   22,   22,   22,   22,   -1,   23,   23,
     23,   23,   23,   -1,   24,   24
  ];

var yybase = [
      0,   14,   26,   34,   34,   34,   34,   34,   34,   34,
     34,   34,   34,   34,   34,   34,   34,   72,   68,  -15,
    -15,   88,   89,   90,   82,   91,   87,   92,   93,   94,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    8,   29,   29,   29,    6,    6,    6,
     10,   10,   10,   58,   57,   59,   38,   83,   84,   20,
     85,   39,   61,   28,   28,   23,   60,   80,    3,   79,
     95,   49,   71,   73,   67,   66,   50,   99,   48,   51,
     56,   78,   45,   52,   44,  101,   63,   98,   54,   65,
     69,   70,   77,   81,   53,   74,   97,   62,   75,   55,
     96,   86,   47,   64,   76,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,  -15,  -15,  -15,  -15,  -15,
    -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,
    -15,    4,    4,    0,    0,    8,    8,    8,    8,    8,
      8,    8,    8,    8,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,  -15,  -15,
    -15,    0,    0,    0,    0,    0,    0,   46,   46,   46,
      0,  100,  100,    0,  100
  ];

var YY2TBLSTATE = 71;

var yydefault = [
      2,32767,32767,   12,   32,   13,   14,   15,   16,   49,
     41,   42,   33,   46,   43,   44,   45,32767,32767,   34,
     35,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,    1,   36,   37,   38,   24,   51,32767,
     48,   39,   40,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,   53,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,   31,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   25,32767,32767,
  32767,32767,32767,32767,32767,    2,    2,    2,    2,    2,
      2,    2,    2,    2
  ];



var yygoto = [
     10,   11,   21,   22,   23,   24,   25,   26,   27,   28,
     29,  154,  154,   65,    3,    5,    6,    7,    8,   60,
      9,    1,   95,   19,   20,   54,   55,   56,   12,   61,
     62,   13,   14,   15,   16,    2,   57,   57,   57,   57,
     57,   57,   57,   57,   57,   58,  129,  129,  129,  129,
    129,  129,  129,  129,  129,   68,   70,    0,    0,    0,
      0,    0,    0,  111,    0,    0,    0,    0,   57,    0,
      0,    0,    0,    0,    0,    0,    0,    0,  129,    0,
      0,    0,    0,    0,    0,    0,   59
  ];

var YYGLAST = 87;

var yygcheck = [
     12,   12,    2,    2,    2,    2,    2,    2,    2,    2,
      2,   15,   15,   13,   12,   12,   12,   12,   12,   12,
     12,   12,    4,   12,   12,   12,   12,   12,   12,   12,
     12,   12,   12,   12,   12,   12,   11,   11,   11,   11,
     11,   11,   11,   11,   11,   11,    5,    5,    5,    5,
      5,    5,    5,    5,    5,   14,   14,   -1,   -1,   -1,
     -1,   -1,   -1,    4,   -1,   -1,   -1,   -1,   11,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    5,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   11
  ];

var yygbase = [
      0,    0, -113,    0,   -8,   25,    0,    0,    0,    0,
      0,   15,  -17,  -50,  -18,  -53,    0
  ];

var yygdefault = [
  -32768,   75,   53,  127,  128,  174,  130,  131,  132,  133,
    134,  175,    4,   64,   67,  153,  176
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    4,    4,    4,    4,    4,    5,    5,    6,
      6,    6,    6,    7,    8,    9,    9,   10,   10,   13,
     13,   15,   14,   14,   12,   12,   12,   12,   12,   12,
     12,   12,   12,   12,   12,   12,   12,   12,   12,   12,
     12,   12,   12,   11,   11,   16,   16
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    3,    4,    4,    4,    4,    2,    1,    5,
      7,    6,    8,    5,    1,    8,   12,    8,   18,    1,
      2,    4,    3,    5,    3,    3,    3,    3,    3,    4,
      4,    3,    3,    4,    4,    4,    4,    3,    2,    2,
      1,    1,    1,    2,    4,    1,    1
  ];

var YYSTATES = 153;
var YYNLSTATES = 124;
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
        case 12:
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 13:
{ yyval = yyastk[yysp-(4-1)]  + '+=' + yyastk[yysp-(4-4)];} break;
        case 14:
{ yyval = yyastk[yysp-(4-1)]  + '-=' + yyastk[yysp-(4-4)];} break;
        case 15:
{ yyval = yyastk[yysp-(4-1)]  + '*=' + yyastk[yysp-(4-4)];} break;
        case 16:
{ yyval = yyastk[yysp-(4-1)]  + '/=' + yyastk[yysp-(4-4)];} break;
        case 17:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 18:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 19:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 20:
{yyval = lib_dic.get_types(yyastk[yysp-(7-4)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(7-2)],'') + '{\n' + yyastk[yysp-(7-6)] + '}';} break;
        case 21:
{yyval = 'void ' + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],yyastk[yysp-(6-2)]) + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 22:
{yyval = lib_dic.get_types(yyastk[yysp-(8-5)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(8-3)],yyastk[yysp-(8-2)]) + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
        case 23:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 24:
{yyval = yyastk[yysp-(1-1)] + ';';} break;
        case 25:
{yyval = lib_dic.get_comm(yyastk[yysp-(8-1)],yyastk[yysp-(8-3)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 26:
{yyval = lib_dic.get_comm(yyastk[yysp-(12-1)],yyastk[yysp-(12-3)]) + ' {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}'; } break;
        case 27:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 28:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}'; } break;
        case 30:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 31:
{ yyval = yyastk[yysp-(4-2)]; } break;
        case 32:
{ yyval = yyastk[yysp-(3-3)]; } break;
        case 33:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)]; } break;
        case 34:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 35:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 36:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 37:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 38:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 39:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 40:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 41:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 42:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 43:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 44:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 45:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 46:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 47:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 48:
{yyval = '-' + yyastk[yysp-(2-2)];} break;
        case 49:
{yyval = '!' + yyastk[yysp-(2-2)];} break;
        case 53:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '');} break;
        case 54:
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


