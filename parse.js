
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
     35,   36,   37,   89,   90,   91,  162,  163,  101,  130,
     18,   19,   92,  130,  121,   71,   72,   28,   33,   34,
     91,-32766,-32766,-32766,   69,   18,   19,   92,   67,  129,
     29,   30,   75,   73,  155,   33,   34,   73,   80,    0,
     76,   77,   78,   79,   69,   87,  100,   23,   33,   34,
    104,  139,   94,  106,  161,   62,   74,   81,   84,   88,
     97,   39,   68,   40,   73,    0,   99,   32,  105,   96,
      0,    0,    0,    0,    0,    0,    0,    0,   44,   43,
     24,   25,   26,   27,   41,   42,    0,  111,  107,  108,
    109,  110,    0,  132,   82,   85,   93,  103,   98,  131,
    135,  134,  136,    0,   22,   66,   45,   38,   31,    0,
     83,   95
  ];

var YYLAST = 112;

var yycheck = [
     14,   15,   16,   17,   18,   19,    2,    3,    5,    5,
     24,   25,   26,    5,    6,    7,    8,   13,   12,   13,
     19,   14,   15,   16,   20,   24,   25,   26,   20,    5,
     26,   27,    4,   29,   28,   12,   13,   29,    5,    0,
     12,   13,   14,   15,   20,    4,   23,   19,   12,   13,
      4,    4,    9,   20,    5,    5,    5,    5,    5,    5,
      5,   17,   20,   18,   29,   -1,   10,   19,   11,   11,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   19,   19,
     19,   19,   19,   19,   19,   19,   -1,   20,   20,   20,
     20,   20,   -1,   21,   21,   21,   21,   21,   21,   21,
     21,   21,   21,   -1,   22,   22,   22,   22,   22,   -1,
     23,   23
  ];

var yybase = [
      0,    6,   23,   36,   36,   36,   36,   36,   36,   36,
     36,   36,   36,   36,   36,   36,   36,   36,   66,   60,
    -14,  -14,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,   78,   72,   77,   79,
     80,   81,    8,   28,   28,    7,    7,    7,    1,    1,
      1,   24,   33,   73,   74,   75,   35,   51,   52,   52,
     39,   50,   42,   49,   82,   53,   61,   62,   63,   64,
     68,   86,   41,   54,   48,   43,   88,   58,   85,   44,
     45,   65,   59,   47,   69,   55,   70,   84,   56,   71,
      3,   83,   76,   46,   57,   67,    0,    0,    0,    0,
      0,    0,    0,  -14,  -14,  -14,  -14,  -14,  -14,  -14,
    -14,  -14,  -14,  -14,  -14,  -14,  -14,  -14,  -14,  -14,
      4,    4,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    8,    8,
      8,    8,    8,    8,    0,    0,    0,  -14,  -14,  -14,
      0,    0,    0,    0,    0,   87,   87,   87
  ];

var YY2TBLSTATE = 66;

var yydefault = [
      2,32767,32767,   10,   28,   11,   12,   13,   14,   45,
     16,   37,   38,   29,   42,   39,   40,   41,32767,32767,
     30,   31,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,    1,32767,   47,   32,   33,   34,   44,   35,
     36,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,   15,32767,32767,   27,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,   21,32767,
  32767,32767,32767,32767,32767,32767,    2,    2,    2,    2,
      2,    2
  ];



var yygoto = [
     11,   12,   64,   65,  138,    3,    5,    6,    7,    8,
     58,    9,    1,   54,   10,   20,   21,   55,   56,   57,
     13,   59,   60,   14,   15,   16,   17,    2,   86,  117,
    117,  117,  117,  117,  117,  117,    0,   53,   53,   53,
     53,   53,   53,   53,   46,   47,   48,   49,   50,   51,
      0,    0,    0,    0,    0,    0,    0,   53,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,  102
  ];

var YYGLAST = 73;

var yygcheck = [
     10,   10,   12,   12,   13,   10,   10,   10,   10,   10,
     10,   10,   10,    9,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   10,   10,   10,    4,    5,
      5,    5,    5,    5,    5,    5,   -1,    9,    9,    9,
      9,    9,    9,    9,    2,    2,    2,    2,    2,    2,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,    9,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,   -1,    4
  ];

var yygbase = [
      0,    0,  -62,    0,    6,  -17,    0,    0,    0,   -9,
    -18,    0,  -66,  -57,    0
  ];

var yygdefault = [
  -32768,   70,   52,  115,  116,  158,  118,  119,  120,  159,
      4,   61,   63,  137,  160
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      4,    4,    4,    4,    4,    4,    4,    5,    5,    6,
      6,    7,    7,    8,    8,   11,   11,   13,   12,   12,
     10,   10,   10,   10,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   10,   10,   10,   10,    9,
     14,   14
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      3,    4,    4,    4,    4,    3,    5,    2,    1,    5,
      6,    8,   12,    8,   18,    1,    2,    4,    3,    5,
      3,    3,    3,    3,    3,    4,    4,    3,    3,    4,
      4,    4,    4,    3,    2,    2,    1,    1,    1,    2,
      1,    1
  ];

var YYSTATES = 136;
var YYNLSTATES = 112;
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
{ return lib_dic.commands['test'] + '\n' + yyastk[yysp-(1-1)]; } break;
        case 2:
{ yyval = '';} break;
        case 3:
{ yyval = yyastk[yysp-(2-1)] + yyastk[yysp-(2-2)]+ '\n';} break;
        case 4:
{ yyval = yyastk[yysp-(1-1)] + ';' } break;
        case 5:
{ yyval = yyastk[yysp-(1-1)] + ';' } break;
        case 10:
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 11:
{ yyval = yyastk[yysp-(4-1)]  + '+=' + yyastk[yysp-(4-4)];} break;
        case 12:
{ yyval = yyastk[yysp-(4-1)]  + '-=' + yyastk[yysp-(4-4)];} break;
        case 13:
{ yyval = yyastk[yysp-(4-1)]  + '*=' + yyastk[yysp-(4-4)];} break;
        case 14:
{ yyval = yyastk[yysp-(4-1)]  + '/=' + yyastk[yysp-(4-4)];} break;
        case 15:
{yyval = lib_dic.get_types(yyastk[yysp-(3-3)], '') + " " + yyastk[yysp-(3-1)] ;} break;
        case 16:
{yyval = lib_dic.get_types(yyastk[yysp-(5-3)], '') + " " + yyastk[yysp-(5-1)] + '=' + yyastk[yysp-(5-5)];} break;
        case 17:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 18:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 19:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 20:
{yyval = yyastk[yysp-(6-2)] + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],'') + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 21:
{yyval = 'if (' + yyastk[yysp-(8-3)] + ') {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 22:
{yyval = 'if (' + yyastk[yysp-(12-3)] + ') {\n' + yyastk[yysp-(12-7)] + '} else {\n' + yyastk[yysp-(12-11)] +'}' } break;
        case 23:
{ yyval = lib_dic.get_comm(yyastk[yysp-(8-5)],yyastk[yysp-(8-2)]) + ' {\n' + yyastk[yysp-(8-7)] + '}' } break;
        case 24:
{ yyval = lib_dic.get_comm(yyastk[yysp-(18-15)],yyastk[yysp-(18-4)] + ';' + yyastk[yysp-(18-8)] + ';' + yyastk[yysp-(18-12)]) + ' {\n' + yyastk[yysp-(18-17)] + '}' } break;
        case 26:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 27:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 28:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 29:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 30:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 31:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 32:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 33:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 34:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 35:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 36:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 37:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 38:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 39:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 40:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 41:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 42:
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 43:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 44:
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 45:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
        case 49:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '')} break;
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


