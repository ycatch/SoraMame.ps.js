
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
      0,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   23,   26,   26,   26,   12,   13,   26,
     24,   25,   10,    8,   20,    9,   26,   11,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   19,   26,
     21,   16,   22,   26,   15,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   17,   14,   18,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,   26,   26,   26,   26,
     26,   26,   26,   26,   26,   26,    1,    2,    3,    4,
      5,    6,    7,   26,   26,   26,   26,   26
  ];

var YYBADCH = 26;
var YYMAXLEX = 268;
var YYTERMS = 26;
var YYNONTERMS = 12;

var yyaction = [
    111,  112,   57,   85,-32766,-32766,-32766,   23,    0,   26,
     27,   26,   27,   64,   69,   52,   28,   29,   30,   66,
     67,   24,   25,   85,   78,   54,  105,   15,   16,   68,
     15,   16,   68,   55,   84,   52,   58,   59,   60,   61,
     62,   90,   63,   42,   17,  106,   52,   65,   56,   50,
     33,   35,   32,   31,    0,    0,    0,   19,    0,    0,
      0,   22,   34,   20,   36,   21,    0,   70,    0,   86,
     87,    0,   18
  ];

var YYLAST = 73;

var yycheck = [
      2,    3,    5,    5,   10,   11,   12,    9,    0,    8,
      9,    8,    9,   15,   17,   17,   10,   11,   12,   13,
     14,   23,   24,    5,    6,    7,   25,   21,   22,   23,
     21,   22,   23,   15,    5,   17,    8,    9,   10,   11,
     18,    4,   20,    5,   16,    5,   17,    5,    5,    5,
     14,   16,   13,   19,   -1,   -1,   -1,   16,   -1,   -1,
     -1,   16,   16,   16,   16,   16,   -1,   17,   -1,   18,
     18,   -1,   19
  ];

var yybase = [
      0,    1,    3,    3,    3,    3,    3,    3,    3,    3,
      3,    3,    3,    3,    3,   46,   35,   -2,   -2,   -2,
     -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,
     -2,   -2,   -2,   -2,   -2,   -2,   -2,    6,    6,   51,
     52,   18,   28,   -6,   -6,   -6,    9,    9,    9,   29,
     -3,   22,   43,    8,   44,   38,   53,   50,   41,   47,
     49,   45,   37,   42,   40,   34,   39,   36,   48,    0,
      0,    0,    6,    6,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,   -2,   -2,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
     18,   18,    0,    0,    6,    6,    6
  ];

var YY2TBLSTATE = 46;

var yydefault = [
      2,32767,    8,   20,    9,   10,   11,   12,   37,   29,
     30,   21,   31,   32,   33,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   22,   23,32767,
  32767,    1,32767,   24,   25,   26,   36,   27,   28,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,    2,
      2
  ];



var yygoto = [
     10,    2,    3,    4,    5,    6,    7,   46,    8,    1,
     37,   38,   43,   44,   45,   11,   47,   48,   12,   13,
     14,   76,   76,   76,   39,   40,   89
  ];

var YYGLAST = 27;

var yygcheck = [
      7,    7,    7,    7,    7,    7,    7,    7,    7,    7,
      7,    7,    7,    7,    7,    7,    7,    7,    7,    7,
      7,    5,    5,    5,    2,    2,    9
  ];

var yygbase = [
      0,    0,  -45,    0,    0,  -18,    0,  -16,    0,  -23,
      0,    0
  ];

var yygdefault = [
  -32768,   53,   41,   74,   75,  109,   77,    9,   49,   88,
     51,  110
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    4,    4,
      4,    4,    4,    5,    5,    6,    6,    8,    8,    9,
     10,   10,    7,    7,    7,    7,    7,    7,    7,    7,
      7,    7,    7,    7,    7,    7,    7,    7,    7,    7,
     11,   11
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    4,    5,
      5,    5,    5,    2,    1,    5,    6,    1,    2,    4,
      3,    5,    3,    3,    3,    3,    3,    4,    4,    3,
      3,    4,    4,    4,    3,    2,    2,    2,    1,    1,
      1,    1
  ];

var YYSTATES = 89;
var YYNLSTATES = 71;
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
        case 8:
{ yyval = lib_dic.get_vars(yyastk[yysp-(4-2)], '') + '=' + yyastk[yysp-(4-4)];} break;
        case 9:
{ yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '+=' + yyastk[yysp-(5-5)];} break;
        case 10:
{ yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '-=' + yyastk[yysp-(5-5)];} break;
        case 11:
{ yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '*=' + yyastk[yysp-(5-5)];} break;
        case 12:
{ yyval = lib_dic.get_vars(yyastk[yysp-(5-2)], '') + '/=' + yyastk[yysp-(5-5)];} break;
        case 13:
{ yyval = lib_dic.get_comm(yyastk[yysp-(2-2)], yyastk[yysp-(2-1)]);} break;
        case 14:
{ yyval = lib_dic.get_comm(yyastk[yysp-(1-1)],'');} break;
        case 15:
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(5-2)],'') + '{\n' + yyastk[yysp-(5-4)] + '}';} break;
        case 16:
{yyval = yyastk[yysp-(6-2)] + ' ' + lib_dic.get_comm(yyastk[yysp-(6-3)],'') + '{\n' + yyastk[yysp-(6-5)] + '}';} break;
        case 18:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 19:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 20:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 21:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 22:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 23:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 24:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 25:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 26:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 27:
{ yyval = yyastk[yysp-(4-1)] + '&&' + yyastk[yysp-(4-4)]; } break;
        case 28:
{ yyval = yyastk[yysp-(4-1)] + '||' + yyastk[yysp-(4-4)]; } break;
        case 29:
{ yyval = yyastk[yysp-(3-1)] + '<' + yyastk[yysp-(3-3)]; } break;
        case 30:
{ yyval = yyastk[yysp-(3-1)] + '>' + yyastk[yysp-(3-3)]; } break;
        case 31:
{ yyval = yyastk[yysp-(4-1)] + '<=' + yyastk[yysp-(4-4)]; } break;
        case 32:
{ yyval = yyastk[yysp-(4-1)] + '>=' + yyastk[yysp-(4-4)]; } break;
        case 33:
{ yyval = yyastk[yysp-(4-1)] + '!=' + yyastk[yysp-(4-4)]; } break;
        case 34:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 35:
{yyval = lib_dic.get_vars(yyastk[yysp-(2-2)], '')} break;
        case 36:
{yyval = '-' + yyastk[yysp-(2-2)]} break;
        case 37:
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


