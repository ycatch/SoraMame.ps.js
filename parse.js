
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
var UMINUS = 262;

  
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
      0,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   22,   25,   25,   25,   11,   12,   25,
     23,   24,    9,    7,   19,    8,   25,   10,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   18,   25,
     20,   15,   21,   25,   14,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   16,   13,   17,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,   25,   25,   25,   25,
     25,   25,   25,   25,   25,   25,    1,    2,    3,    4,
      5,    6,   25
  ];

var YYBADCH = 25;
var YYMAXLEX = 263;
var YYTERMS = 25;
var YYNONTERMS = 12;

var yyaction = [
    113,  114,   67,   87,    0,   63,   23,   64,-32766,-32766,
  -32766,   92,   65,   71,   52,   28,   29,   30,   68,   69,
     24,   25,   87,   80,  108,   54,   15,   16,   70,   26,
     27,   55,   56,   52,   59,   60,   61,   62,   15,   16,
     70,   86,   17,   42,   26,   27,  107,   57,   51,   66,
     35,   32,   52,   58,   33,   22,    0,    0,    0,    0,
      0,   19,   34,   20,   36,   21,    0,   72,    0,   88,
     89,    0,   31,   18
  ];

var YYLAST = 74;

var yycheck = [
      2,    3,    5,    5,    0,   17,    8,   19,    9,   10,
     11,    4,   14,   16,   16,    9,   10,   11,   12,   13,
     22,   23,    5,    6,    5,    8,   20,   21,   22,    7,
      8,   14,    8,   16,    7,    8,    9,   10,   20,   21,
     22,    5,   15,    5,    7,    8,   24,    5,    5,    5,
     15,   12,   16,    8,   13,   15,   -1,   -1,   -1,   -1,
     -1,   15,   15,   15,   15,   15,   -1,   16,   -1,   17,
     17,   -1,   18,   18
  ];

var yybase = [
      0,   22,   37,   37,   37,   37,   37,   37,   37,   37,
     37,   37,   37,   37,   37,   47,   35,   -2,   -2,   -2,
     -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2,
     -2,   -2,   -2,   -2,   -2,   -2,   -2,    6,    6,   52,
     53,   17,   27,   -1,   -1,   -1,   18,   18,   18,   36,
    -12,   -3,   42,    4,   24,   38,   45,   55,   43,   46,
     48,   50,   40,    7,   44,   19,   54,   51,   39,   41,
     49,    0,    0,    0,    6,    6,    6,    6,    6,    6,
      6,    6,    6,    6,    6,    6,    6,    6,   -2,   -2,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
      0,    0,   17,   17,    0,    0,    6,    6,    6
  ];

var YY2TBLSTATE = 46;

var yydefault = [
      2,32767,    8,   20,    9,   10,   11,   12,   37,   29,
     30,   21,   31,   32,   33,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,   22,   23,32767,
  32767,    1,32767,   24,   25,   26,   36,   27,   28,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
  32767,    2,    2
  ];



var yygoto = [
     10,    2,    3,    4,    5,    6,    7,   46,    8,    1,
     37,   38,   43,   44,   45,   11,   47,   48,   12,   13,
     14,   78,   78,   78,   39,   40,   91
  ];

var YYGLAST = 27;

var yygcheck = [
      7,    7,    7,    7,    7,    7,    7,    7,    7,    7,
      7,    7,    7,    7,    7,    7,    7,    7,    7,    7,
      7,    5,    5,    5,    2,    2,    9
  ];

var yygbase = [
      0,    0,  -47,    0,    0,  -18,    0,  -16,    0,  -23,
      0,    0
  ];

var yygdefault = [
  -32768,   53,   41,   76,   77,  111,   79,    9,   49,   90,
     50,  112
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
      5,    5,    5,    2,    1,    7,    8,    1,    2,    4,
      3,    5,    3,    3,    3,    3,    3,    4,    4,    3,
      3,    4,    4,    4,    3,    2,    2,    2,    1,    1,
      1,    1
  ];

var YYSTATES = 91;
var YYNLSTATES = 73;
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


