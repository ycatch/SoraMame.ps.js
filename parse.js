
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
var YYNONTERMS = 17;

var yyaction = [
     37,   38,   39,   90,   91,   92,  157,  158,   92,  121,
     19,   20,   93,   19,   20,   93,   30,  121,  112,   70,
     71,   35,   36,   68,-32766,-32766,-32766,   76,   94,   31,
     32,   66,   72,  120,   77,   78,   79,   80,   35,   36,
     72,   25,   81,    0,   83,  129,   84,   68,  132,   97,
     62,   74,  156,   82,  150,   95,   99,   86,   89,   41,
    122,    0,    0,    0,    0,   40,    0,    0,    0,   43,
      0,    0,   26,   27,   28,   29,   34,   42,   45,   44,
      0,   98,   67,  102,  101,  100,    0,   83,   85,   87,
     96,  126,  123,  125,    0,   46,   33,   24,   23,    0,
     88
  ];

var YYLAST = 101;

var yycheck = [
     13,   14,   15,   16,   17,   18,    2,    3,   18,    5,
     23,   24,   25,   23,   24,   25,   12,    5,    6,    7,
      8,   11,   12,   19,   13,   14,   15,    4,    9,   25,
     26,   19,   28,    5,   11,   12,   13,   14,   11,   12,
     28,   18,    5,    0,   20,    4,   22,   19,    4,   10,
      5,    5,    5,    5,   27,    5,   19,    5,    5,   17,
     20,   -1,   -1,   -1,   -1,   16,   -1,   -1,   -1,   18,
     -1,   -1,   18,   18,   18,   18,   18,   18,   18,   18,
     -1,   19,   19,   19,   19,   19,   -1,   20,   20,   20,
     20,   20,   20,   20,   -1,   21,   21,   21,   21,   -1,
     22
  ];

var yybase = [
      0,   27,   10,   10,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   10,   10,   10,   10,   51,
     61,  -13,  -13,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
      4,    4,    4,    4,    4,    4,    4,   71,   40,   72,
     70,   73,   12,   23,   23,   11,   11,   11,  -10,  -10,
    -10,   28,   37,   24,   69,   67,   46,   48,   48,   43,
     45,   63,   47,   62,   77,   68,   52,   54,   55,   56,
     57,   66,   75,   41,   53,   44,   58,   19,   50,   76,
     49,   42,   59,   60,   65,   74,   39,   64,    0,    0,
      0,    0,    0,    0,  -13,  -13,  -13,  -13,  -13,  -13,
    -13,  -13,  -13,  -13,  -13,  -13,  -13,  -13,  -13,  -13,
    -13,  -13,    4,    4,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
     12,   12,   12,   12,   12,    0,    0,    0,  -13,  -13,
    -13,    0,    0,    0,    0,    0,    0,   78,   78
  ];

var YY2TBLSTATE = 66;

var yydefault = [
      2,32767,   10,   27,   11,   12,   13,   14,   49,   27,
     16,   41,   42,   28,   46,   43,   44,   45,   28,32767,
  32767,   34,   35,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,    1,32767,   51,   36,   37,   38,   48,   39,
     40,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,   15,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,   21,32767,    2,    2,
      2,    2,    2
  ];



var yygoto = [
     12,  134,  136,    3,   13,    2,    4,    5,    6,    7,
     58,    8,    1,    9,   10,   21,   22,   55,   56,   57,
     59,   60,   14,   15,   16,   17,   18,   54,   54,  108,
    108,  108,  108,  108,  108,   47,   48,   49,   50,   51,
     64,   65,  128,    0,    0,    0,    0,    0,    0,    0,
      0,   53,   53,   53,   53,   53,   53
  ];

var YYGLAST = 57;

var yygcheck = [
     10,    4,    4,   10,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   10,   10,    9,    9,    5,
      5,    5,    5,    5,    5,    2,    2,    2,    2,    2,
     12,   12,   14,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
     -1,    9,    9,    9,    9,    9,    9
  ];

var yygbase = [
      0,    0,  -63,    0,  -22,  -18,    0,    0,    0,    4,
    -20,    0,  -27,    0,  -19,    0,    0
  ];

var yygdefault = [
  -32768,   69,   52,  106,  107,  153,  109,  110,  111,  154,
     11,   61,   63,   73,  127,   75,  155
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    3,
      4,    4,    4,    4,    4,    4,    4,    5,    5,    6,
      6,    7,    7,    8,   11,   11,   14,   12,   12,   13,
     15,   15,   15,   15,   10,   10,   10,   10,   10,   10,
     10,   10,   10,   10,   10,   10,   10,   10,   10,   10,
     10,   10,   10,    9,   16,   16
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    1,
      3,    4,    4,    4,    4,    3,    5,    2,    1,    5,
      6,    8,   12,    4,    1,    2,    4,    3,    5,    4,
      3,    3,    5,    5,    3,    3,    3,    3,    3,    4,
      4,    3,    3,    4,    4,    4,    4,    3,    2,    2,
      1,    1,    1,    2,    1,    1
  ];

var YYSTATES = 129;
var YYNLSTATES = 103;
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
{ yyval = lib_dic.get_comm(yyastk[yysp-(4-2)],yyastk[yysp-(4-1)]) + ' {\n' + yyastk[yysp-(4-4)] + '}' } break;
        case 25:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 26:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 27:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 28:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 29:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 30:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 31:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 32:
{ yyval = yyastk[yysp-(5-1)] + ';' + yyastk[yysp-(5-5)] } break;
        case 33:
{ yyval = yyastk[yysp-(5-1)] + ';' + yyastk[yysp-(5-5)] } break;
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
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 49:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
        case 53:
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


