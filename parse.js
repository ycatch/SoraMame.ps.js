
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
    129,  130,   75,    0,-32766,-32766,-32766,   16,   17,   76,
     26,  106,   64,   65,   66,   67,   39,   29,   30,   20,
     77,  129,  130,   27,   28,-32766,-32766,-32766,-32766,-32766,
  -32766,   26,   68,  122,   29,   30,   72,   38,   31,   32,
     33,   73,   74,   75,   27,   28,   80,  128,   16,   17,
     76,  129,  130,   98,   79,-32766,-32766,-32766,   54,   63,
     36,   26,   99,   92,   60,   61,   35,   57,   34,   23,
     25,    0,    0,   24,   27,   28,   57,   22,   40,   37,
     70,   58,   81,   82,   83,   62,  101,  103,  100,   78,
     71,   69,    0,   21
  ];

var YYLAST = 94;

var yycheck = [
      2,    3,   18,    0,    6,    7,    8,   23,   24,   25,
     12,    4,   11,   12,   13,   14,   18,   11,   12,   18,
      9,    2,    3,   25,   26,    6,    7,    8,   13,   14,
     15,   12,    5,   27,   11,   12,    5,   18,   13,   14,
     15,   16,   17,   18,   25,   26,   19,    5,   23,   24,
     25,    2,    3,    5,   10,    6,    7,    8,    5,    5,
     17,   12,    5,    6,    7,    8,   16,   19,   21,   18,
     18,   -1,   -1,   18,   25,   26,   19,   18,   18,   18,
     22,   19,   19,   19,   19,   28,   20,   20,   20,   20,
     20,   20,   -1,   21
  ];

var yybase = [
      0,    6,   23,   23,   23,   23,   23,   23,   23,   23,
     23,   23,   23,   23,   23,   23,   19,   -2,   25,   25,
     49,   49,   49,   49,   49,   49,   49,   49,   49,   49,
     49,   49,   49,   49,   49,   49,   49,   49,   49,   49,
     49,   68,   66,   69,   67,   57,   15,   15,   15,    1,
    -16,  -16,  -16,   48,   27,   71,   70,   54,   54,    3,
     53,   62,   42,   72,   59,   51,   55,   52,   63,    7,
     31,   11,   47,   50,   43,   61,   60,   64,   44,   65,
      0,    0,    0,    0,    0,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     57,   57,    0,    0,   57,   57,   57,   57,   57,   57,
     57,   57,   57,   57,   57,   57,   57,   57,   57,   57,
     57,   57,   57,   57,   57,   57,   57,   57,   57,    0,
     25,   25,   25,    0,    0,    0,    0,    0,    0,   58,
     58
  ];

var YY2TBLSTATE = 57;

var yydefault = [
      2,32767,    9,   23,   10,   11,   12,   13,   40,   32,
     33,   24,   37,   34,   35,   36,32767,32767,   25,   26,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,    1,   27,   28,   29,32767,
     39,   30,   31,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,   18,32767,
      2,    2,    2,    2
  ];



var yygoto = [
     10,  105,   56,    2,    3,    4,    5,    6,    7,   50,
      8,    1,   18,   19,   46,   47,   48,   11,   51,   52,
     12,   13,   14,   15,    0,   49,   49,   49,   49,   49,
     89,   89,   89,   89,   89,   41,   42,   43,   44
  ];

var YYGLAST = 39;

var yygcheck = [
      9,   12,   11,    9,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    9,   -1,    8,    8,    8,    8,    8,
      5,    5,    5,    5,    5,    2,    2,    2,    2
  ];

var yygbase = [
      0,    0,  -45,    0,    0,  -11,    0,    0,  -16,  -17,
      0,  -56,  -52,    0
  ];

var yygdefault = [
  -32768,   59,   45,   87,   88,  125,   90,   91,  126,    9,
     53,   55,  104,  127
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    3,    4,
      4,    4,    4,    4,    5,    5,    6,    6,    7,    7,
     10,   10,   12,   11,   11,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    9,    9,    9,    9,    9,    9,
      9,    9,    9,    9,    8,   13,   13
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    1,    3,
      4,    4,    4,    4,    2,    1,    5,    6,    8,   12,
      1,    2,    4,    3,    5,    3,    3,    3,    3,    3,
      4,    4,    3,    3,    4,    4,    4,    4,    3,    2,
      2,    1,    1,    1,    2,    1,    1
  ];

var YYSTATES = 105;
var YYNLSTATES = 84;
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
{ yyval = yyastk[yysp-(4-1)] + '==' + yyastk[yysp-(4-4)]; } break;
        case 38:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 39:
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 40:
{yyval = '!' + yyastk[yysp-(2-2)]} break;
        case 44:
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


