
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
      0,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
      5,    5,    5,    5,    5,    5,    1,    2,    3,    5,
      4,    5
  ];

var YYBADCH = 5;
var YYMAXLEX = 262;
var YYTERMS = 5;
var YYNONTERMS = 4;

var yyaction = [
      7,    9,    8,    0
  ];

var YYLAST = 4;

var yycheck = [
      2,    3,    4,    0
  ];

var yybase = [
      0,   -2,    3
  ];

var YY2TBLSTATE = 0;

var yydefault = [
      2,    1,32767
  ];



var yygoto = [
  ];

var YYGLAST = 0;

var yygcheck = [
  ];

var yygbase = [
      0,    0,    0,    0
  ];

var yygdefault = [
  -32768,    2,    1,    6
  ];

var yylhs = [
      0,    1,    2,    2,    3,    3,    3
  ];

var yylen = [
      1,    1,    0,    2,    1,    1,    1
  ];

var YYSTATES = 7;
var YYNLSTATES = 3;
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
{ return yyastk[yysp-(1-1)]; } break;
        case 2:
{ yyval = '';} break;
        case 3:
{ yyval = yyastk[yysp-(2-1)] + yyastk[yysp-(2-2)]+ '\n'; } break;
        case 4:
{ yyval = "N:" + yyastk[yysp-(1-1)] + '\n';} break;
        case 5:
{ yyval = "W:" + yyastk[yysp-(1-1)] + '\n'; } break;
        case 6:
{ yyval = "S:" + yyastk[yysp-(1-1)] + '\n'; } break;
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


