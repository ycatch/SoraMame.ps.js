
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
var YYNONTERMS = 17;

var yyaction = [
     41,   42,   43,   97,   98,   99,  176,  177,   90,  140,
     17,   18,  100,  140,  133,   62,   74,   75,   35,   80,
     81,   82,   83,    0,   84,   71,   30,   39,   40,   70,
     99,   36,   37,  139,   76,   17,   18,  100,   76,   39,
     40,  114,   89,  168,-32766,-32766,-32766,   39,   40,   92,
    108,   95,  112,  152,  102,  175,   65,   77,   78,   79,
     85,   86,   96,  101,  105,  109,   49,   88,    0,   76,
      0,    0,  107,    0,  104,  113,    0,    0,    0,    0,
      0,    0,   45,    0,   46,    0,   48,   31,   32,   33,
     34,   47,   50,    0,  121,  117,   72,  115,  116,  118,
    119,   71,  120,    0,  142,   87,   91,   93,  111,  106,
    141,  144,  143,  148,  147,  149,    0,   29,   69,   51,
     44,   38,    0,  103
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
      4,    4,    8,   29,   29,   29,    6,    6,    6,   10,
     10,   10,   51,   28,   56,   20,   83,   84,   85,   39,
     53,   55,   55,   23,   52,   75,   54,   76,   94,   38,
     67,   68,   69,   70,    3,   98,   45,   47,   57,   50,
     77,   49,   58,   44,   99,   62,   97,   64,   65,   71,
     72,   74,   78,   59,   79,   96,   61,   81,   60,   95,
     86,   48,   63,   73,    0,    0,    0,    0,    0,    0,
      0,    0,    0,  -15,  -15,  -15,  -15,  -15,  -15,  -15,
    -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,  -15,    4,
      4,    0,    0,    8,    8,    8,    8,    8,    8,    8,
      8,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,  -15,  -15,  -15,    0,    0,
      0,    0,    0,    0,   80,   80,   80,    0,   43,   43,
     43
  ];

var YY2TBLSTATE = 69;

var yydefault = [
      2,32767,32767,   12,   31,   13,   14,   15,   16,   48,
     40,   41,   32,   45,   42,   43,   44,32767,32767,   33,
     34,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,    1,   35,   36,   37,   23,   50,32767,   47,
     38,   39,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,   52,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,   30,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,   24,32767,32767,32767,
  32767,32767,32767,32767,    2,    2,    2,    2,    2,    2,
      2,    2
  ];



var yygoto = [
     10,   11,   21,   22,   23,   24,   25,   26,   27,   28,
    151,  151,   64,    3,    5,    6,    7,    8,   59,    9,
      1,   94,   19,   20,   53,   54,   55,   12,   60,   61,
     13,   14,   15,   16,    2,   56,   56,   56,   56,   56,
     56,   56,   56,   57,  127,  127,  127,  127,  127,  127,
    127,  127,   67,   68,    0,    0,    0,    0,    0,    0,
      0,  110,    0,    0,    0,    0,   56,    0,    0,    0,
      0,    0,    0,    0,    0,  127,    0,    0,    0,    0,
      0,    0,    0,   58
  ];

var YYGLAST = 84;

var yygcheck = [
     12,   12,    2,    2,    2,    2,    2,    2,    2,    2,
     15,   15,   13,   12,   12,   12,   12,   12,   12,   12,
     12,    4,   12,   12,   12,   12,   12,   12,   12,   12,
     12,   12,   12,   12,   12,   11,   11,   11,   11,   11,
     11,   11,   11,   11,    5,    5,    5,    5,    5,    5,
      5,    5,   14,   14,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,    4,   -1,   -1,   -1,   -1,   11,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,    5,   -1,   -1,   -1,   -1,
     -1,   -1,   -1,   11
  ];

var yygbase = [
      0,    0, -112,    0,   -8,   23,    0,    0,    0,    0,
      0,   14,  -17,  -50,  -19,  -53,    0
  ];

var yygdefault = [
  -32768,   73,   52,  125,  126,  171,  128,  129,  130,  131,
    132,  172,    4,   63,   66,  150,  173
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      3,    3,    4,    4,    4,    4,    4,    5,    5,    6,
      6,    6,    7,    8,    9,    9,   10,   10,   13,   13,
     15,   14,   14,   12,   12,   12,   12,   12,   12,   12,
     12,   12,   12,   12,   12,   12,   12,   12,   12,   12,
     12,   12,   11,   11,   16,   16
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      1,    1,    3,    4,    4,    4,    4,    2,    1,    5,
      7,    8,    5,    1,    8,   12,    8,   18,    1,    2,
      4,    3,    5,    3,    3,    3,    3,    3,    4,    4,
      3,    3,    4,    4,    4,    4,    3,    2,    2,    1,
      1,    1,    2,    4,    1,    1
  ];

var YYSTATES = 150;
var YYNLSTATES = 122;
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
{yyval = lib_dic.get_types(yyastk[yysp-(8-5)],'') + ' ' + lib_dic.get_comm(yyastk[yysp-(8-3)],yyastk[yysp-(8-2)]) + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
        case 22:
{yyval = 'class ' + lib_dic.get_types(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 24:
{yyval = 'if (' + yyastk[yysp-(8-3)] + ') {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 25:
{yyval = 'if (' + yyastk[yysp-(12-3)] + ') {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}'; } break;
        case 26:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}'; } break;
        case 27:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}'; } break;
        case 29:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 30:
{ yyval = yyastk[yysp-(4-2)]; } break;
        case 31:
{ yyval = yyastk[yysp-(3-3)]; } break;
        case 32:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)]; } break;
        case 33:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 34:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 35:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 36:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 37:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 38:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 39:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 40:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 41:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 42:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 43:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 44:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 45:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 46:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 47:
{yyval = '-' + yyastk[yysp-(2-2)];} break;
        case 48:
{yyval = '!' + yyastk[yysp-(2-2)];} break;
        case 52:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '');} break;
        case 53:
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


