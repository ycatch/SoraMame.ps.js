
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
      0,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   11,   19,   19,
     17,   18,    9,    7,   16,    8,   19,   10,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   15,   19,
     19,   12,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   13,   19,   14,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,   19,   19,   19,   19,
     19,   19,   19,   19,   19,   19,    1,    2,    3,    4,
      5,    6
  ];

var YYBADCH = 19;
var YYMAXLEX = 262;
var YYTERMS = 19;
var YYNONTERMS = 11;

var yyaction = [
     49,   50,   23,   35,   24,    0,    5,    6,   21,   32,
      7,    8,    9,    5,    6,    3,   38,   46,   22,   25,
     34,    2,   10,   19,    0,    0,    4
  ];

var YYLAST = 27;

var yycheck = [
      2,    3,   14,    5,   16,    0,    7,    8,    5,    6,
      9,   10,   11,    7,    8,   17,    4,   18,    5,    5,
      5,   12,   15,   13,   -1,   -1,   15
  ];

var yybase = [
      0,   -1,   -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,
     -2,    6,    6,    6,    3,    1,    1,   15,  -12,   13,
      5,    9,   11,   12,   14,    7,    0,    1,   10,   10,
     10,   10,   10,   10,   10,   10,   10,    1,    1,    1,
     10,    0,    0,   10
  ];

var YY2TBLSTATE = 18;

var yydefault = [
      2,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,    7,   13,   14,    1,   15,   16,32767,32767,32767,
  32767,    9,32767,32767,32767,32767
  ];



var yygoto = [
      1,   12,   15,   16,   43,   44,   45,   13,   31,   37
  ];

var YYGLAST = 10;

var yygcheck = [
      6,    6,    6,    6,    6,    6,    6,    6,    5,    8
  ];

var yygbase = [
      0,    0,    0,    0,    0,   -6,   -3,    0,   -8,    0,
      0
  ];

var yygdefault = [
  -32768,   20,   14,   29,   30,   47,   11,   17,   36,   18,
     48
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3,    4,    5,    5,
      7,    7,    8,    9,    9,    6,    6,    6,    6,    6,
      6,    6,    6,   10,   10
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1,    3,    2,    1,
      1,    2,    4,    3,    5,    3,    3,    3,    3,    3,
      3,    1,    1,    1,    1
  ];

var YYSTATES = 43;
var YYNLSTATES = 26;
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
{ return commands.dic['test'] + '\n' + yyastk[yysp-(1-1)]; } break;
        case 2:
{ yyval = '';} break;
        case 3:
{ yyval = yyastk[yysp-(2-1)] + yyastk[yysp-(2-2)]+ '\n';} break;
        case 4:
{ yyval = yyastk[yysp-(1-1)] + ';' } break;
        case 5:
{ yyval = yyastk[yysp-(1-1)] + ';' } break;
        case 7:
{ yyval = yyastk[yysp-(3-1)] + '=' + yyastk[yysp-(3-3)];} break;
        case 8:
{ yyval = commands.get(yyastk[yysp-(2-2)]) + '(' + yyastk[yysp-(2-1)] + ')';} break;
        case 9:
{ yyval = commands.get(yyastk[yysp-(1-1)]) + '()';} break;
        case 11:
{ yyval = yyastk[yysp-(2-1)] + ',' + yyastk[yysp-(2-2)];} break;
        case 12:
{ yyval = yyastk[yysp-(4-2)] } break;
        case 13:
{ yyval = yyastk[yysp-(3-3)] } break;
        case 14:
{ yyval = yyastk[yysp-(5-1)] + ',' + yyastk[yysp-(5-5)] } break;
        case 15:
{ yyval = yyastk[yysp-(3-1)] + '+' + yyastk[yysp-(3-3)]; } break;
        case 16:
{ yyval = yyastk[yysp-(3-1)] + '-' + yyastk[yysp-(3-3)]; } break;
        case 17:
{ yyval = yyastk[yysp-(3-1)] + '*' + yyastk[yysp-(3-3)]; } break;
        case 18:
{ yyval = yyastk[yysp-(3-1)] + '/' + yyastk[yysp-(3-3)]; } break;
        case 19:
{ yyval = yyastk[yysp-(3-1)] + '%' + yyastk[yysp-(3-3)]; } break;
        case 20:
{ yyval = '(' + yyastk[yysp-(3-2)] + ')'; } break;
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


