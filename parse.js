
/* Prototype file of JavaScript parser.
 * Written by MORI Koichiro
 * This file is PUBLIC DOMAIN.
 */

var buffer;
var token;
var toktype;

var YYERRTOK = 256;
var NUMBER = 257;
var STRING = 258;
var JOSI = 259;
var WORD = 260;

  
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
      0,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     12,   13,    8,    6,   14,    7,   14,    9,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   11,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   10,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,   14,   14,   14,   14,
     14,   14,   14,   14,   14,   14,    1,    2,    3,    4,
      5
  ];

var YYBADCH = 14;
var YYMAXLEX = 261;
var YYTERMS = 14;
var YYNONTERMS = 6;

var yyaction = [
     34,   36,    7,    8,   27,   14,    0,   25,   35,   33,
      5,   15,    9,   10,   11,    7,    8,   11,    0,    6
  ];

var YYLAST = 20;

var yycheck = [
      2,    3,    6,    7,    5,    4,    0,    1,    5,   13,
     12,    5,    8,    9,   10,    6,    7,   10,   -1,   11
  ];

var yybase = [
      0,    6,   -4,    9,    9,    3,    3,    3,    3,    3,
      3,    3,    4,    4,   -1,    8,    1,    7,    7,    0,
     -2,    4,    4,    4,   -2,   -2,   -2,   -2,   -2,   -2,
     -2
  ];

var YY2TBLSTATE = 12;

var yydefault = [
      1,32767,32767,    7,    5,32767,32767,32767,32767,32767,
  32767,32767,    9,   10,32767,   16,    3,   11,   12
  ];



var yygoto = [
      2,    4,   12,   13,   17,   18,   32
  ];

var YYGLAST = 7;

var yygcheck = [
      5,    5,    5,    5,    5,    5,    5
  ];

var yygbase = [
      0,    0,    0,    0,    0,   -5
  ];

var yygdefault = [
  -32768,    1,   21,   16,   23,    3
  ];

var yylhs = [
      0,    1,    1,    2,    2,    2,    2,    3,    4,    5,
      5,    5,    5,    5,    5,    5,    5,    5
  ];

var yylen = [
      1,    0,    2,    1,    3,    3,    1,    1,    1,    3,
      3,    3,    3,    3,    3,    1,    1,    1
  ];

var YYSTATES = 28;
var YYNLSTATES = 19;
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

      if ((yyn = yybase[yystate] + yychar) >= 0
          && yyn < YYLAST && yycheck[yyn] == yychar
          || (yystate < YY2TBLSTATE
              && (yyn = yybase[yystate + YYNLSTATES] + yychar) >= 0
              && yyn < YYLAST && yycheck[yyn] == yychar)) {
        yyn = yyaction[yyn];
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
        case 4:
{ alert(yyastk[yysp-(3-1)]) } break;
        case 5:
{ variables[yyastk[yysp-(3-1)]] = yyastk[yysp-(3-3)]; } break;
        case 6:
{ yyval = ""; } break;
        case 9:
{ yyval = yyastk[yysp-(3-1)] + yyastk[yysp-(3-3)]; } break;
        case 10:
{ yyval = yyastk[yysp-(3-1)] - yyastk[yysp-(3-3)]; } break;
        case 11:
{ yyval = yyastk[yysp-(3-1)] * yyastk[yysp-(3-3)]; } break;
        case 12:
{ yyval = yyastk[yysp-(3-1)] / yyastk[yysp-(3-3)]; } break;
        case 13:
{ yyval = Math.pow(yyastk[yysp-(3-1)], yyastk[yysp-(3-3)]); } break;
        case 14:
{ yyval = yyastk[yysp-(3-2)]; } break;
        case 15:
{ yyval = yyastk[yysp-(1-1)]; } break;
        case 16:
{ yyval = variables[yyastk[yysp-(1-1)]]; } break;
        case 17:
{ yyval = yyastk[yysp-(1-1)]; } break;
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


