
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
      0,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   11,   20,   20,
     18,   19,    9,    7,   17,    8,   20,   10,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   16,   20,
     20,   13,   20,   20,   12,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   14,   20,   15,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,   20,   20,   20,   20,
     20,   20,   20,   20,   20,   20,    1,    2,    3,    4,
      5,    6
  ];

var YYBADCH = 20;
var YYMAXLEX = 262;
var YYTERMS = 20;
var YYNONTERMS = 12;

var yyaction = [
     80,   81,   63,   56,-32766,   33,-32766,    0,   46,   34,
     44,   31,   38,   39,   40,   41,    9,   47,    3,   10,
     11,   62,   12,   13,   14,   42,   68,   43,   10,   11,
     31,   76,   45,   30,   36,   77,   18,    5,    8,    7,
     35,   37,    0,    0,    0,    0,    0,    6,    0,   48,
      0,   65,   64,    0,   15,    4
  ];

var YYLAST = 56;

var yycheck = [
      2,    3,    5,    6,    6,    8,    8,    0,    5,   12,
     12,   14,    7,    8,    9,   10,   18,   14,   13,    7,
      8,    5,    9,   10,   11,   15,    4,   17,    7,    8,
     14,   19,    5,    5,    5,    5,    5,   13,   13,   13,
      8,    8,   -1,   -1,   -1,   -1,   -1,   13,   -1,   14,
     -1,   15,   15,   -1,   16,   16
  ];

var yybase = [
      0,   37,   36,   -2,   -2,   -2,   -2,   -2,   -2,   -2,
     -2,   -2,   -2,   -2,   -2,   -2,   12,   -3,    5,   21,
     21,   21,   21,   21,   21,   21,   13,   13,   16,   10,
      3,   29,    7,   32,   31,   33,   39,   28,   24,   34,
     26,   25,   22,   27,   30,   38,   35,    0,    0,    0,
     -3,   -3,   -3,   -3,   -3,   -3,   -3,   -3,   -3,   -3,
     -3,   -3,   -3,   -3,   -3,   13,    0,    0,   13,   13,
     13,   13,   13,   13,   13
  ];

var YY2TBLSTATE = 26;

var yydefault = [
      2,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,    1,32767,    8,
     20,    9,   10,   11,   12,   21,   22,   23,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,    2,    2
  ];



var yygoto = [
     20,   21,   22,   23,   24,   16,   26,   27,   73,   74,
     75,   25,   54,   54,    1,    2,   67,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,   54
  ];

var YYGLAST = 29;

var yygcheck = [
      7,    7,    7,    7,    7,    7,    7,    7,    7,    7,
      7,    7,    5,    5,    2,    2,    9,   -1,   -1,   -1,
     -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    5
  ];

var yygbase = [
      0,    0,  -33,    0,    0,   11,    0,   -4,    0,  -12,
      0,    0
  ];

var yygdefault = [
  -32768,   32,   17,   52,   53,   78,   55,   19,   28,   66,
     29,   79
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    3,    4,    4,
      4,    4,    4,    5,    5,    6,    6,    8,    8,    9,
     10,   10,    7,    7,    7,    7,    7,    7,    7,    7,
      7,   11,   11
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    1,    4,    5,
      5,    5,    5,    2,    1,    7,    8,    1,    2,    4,
      3,    5,    3,    3,    3,    3,    3,    3,    2,    1,
      1,    1,    1
  ];

var YYSTATES = 70;
var YYNLSTATES = 49;
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
{yyval = 'void ' + lib_dic.get_comm(yyastk[yysp-(7-4)],'') + '{\n' + yyastk[yysp-(7-6)] + '}';} break;
        case 16:
{yyval = yyastk[yysp-(8-4)] + ' ' + lib_dic.get_comm(yyastk[yysp-(8-5)],'') + '{\n' + yyastk[yysp-(8-7)] + '}';} break;
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
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
        case 28:
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


