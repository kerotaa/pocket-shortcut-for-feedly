!function(document, window, undefined) {
	var KRTCreateShortcut;

	KRTCreateShortcut = function(_configs) {
		var _self = this;
		this._input = document.querySelector(_configs.input),
		this._output = document.querySelector(_configs.output),
		this._button = document.querySelector(_configs.button);

		this._button.addEventListener('click', function(event) {
			event.preventDefault();
			_self._create();
		}, false);

		this._output.addEventListener('click', function(event) {
			this.focus();
			this.select();
		});

		return {};
	};

	KRTCreateShortcut._regrex = {
		"o": /var\so\s*=\s*(\[[^\]]+\])/,
		"s": /if\s*\(\s*s\s*==\s*([^\)]+)\s*\)/,
		"v": /return\sv\+'([^']+)'/
	};

	KRTCreateShortcut._template = (function() {/*
		(function(){var h=document,b=h.querySelector(".selectedEntry");if(b){var g=b.querySelector("a.title"),n=function(d,a,c,j,k){var l=<%o%>;j=j||0;var b=0;a=a||[];c=c||0;k=k||0;var h={'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'\/':47,':':58,'?':63,'=':61,'-':45,'_':95,'&':38,'$':36,'!':33,'.':46};if(!k||0==k)d=l[0]+d;for(var e=0;e<d.length;e++){var f=h[d[e]]?h[d[e]]:d.charCodeAt(e);1*!f&&(f=3);f*=l[j]+f*l[b%l.length];a[c]=(a[c]?a[c]+f:f)+k+b;var g=f%50;if(a[g]){var m=a[c];a[c]=a[g];a[g]=m}b+=f;c=50==c?0:c+1;j=j==l.length-1?0:j+1}if(<%s%>==k){d="";for(e=0;e<a.length;e++)d+=String.fromCharCode(a[e]%25+97);l=function(){};return d+"<%v%>"}return n(b+ "",a,c,j,k+1)},b=g.href,g=g.textContent,p=n(b),m=h.createElement("script");m.type="text/javascript";m.src="https://getpocket.com/b/r4.js?h="+p+"&u="+encodeURIComponent(b)+"&t="+encodeURIComponent(g);n=p=function(){};(h.getElementsByTagName("head")[0]||h.documentElement).appendChild(m)}})();
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(^[\s\t]+)|([\s\t]+$)/g, '');

	KRTCreateShortcut._banner = '\
// ==UserScript==\n\
// @ShortcutManager\n\
// @name Add Pocket on Feedly\n\
// @namespace 4cEyiXLEOEsH\n\
// @key Shift+p\n\
// @include http://cloud.feedly.com/*\n\
// ==/UserScript==\n\
';

	KRTCreateShortcut._convert = function(input) {
		var mat,
			cls = KRTCreateShortcut,
			res = cls._template;

		for(var key in cls._regrex) {
			mat = input.match(cls._regrex[key]);
			if (!mat) return null;
			res = res.replace('<%' + key + '%>', mat[1]);
		}

		return cls._banner + res;
	};

	KRTCreateShortcut._getVal = function(elem) {
		console.log("elem:", elem);
		return elem.value || elem.textContent || elem.innerText;
	};

	KRTCreateShortcut._setVal = function(elem, val) {
		switch(elem.tagName) {
			case 'input':
			case 'textarea':
				elem.value = val;
				break;
			default:
				elem[elem.textContent ? 'textContent' : 'innerText'] = val;
				break;
		}
	};

	KRTCreateShortcut.prototype._create = function() {
		var cls = KRTCreateShortcut,
			input = cls._getVal(this._input),
			output = cls._convert(input);
		cls._setVal(this._output, output);
	};

	var configs = {
		"input": "#krtdemo_input",
		"output": "#krtdemo_output",
		"button": "#krtdemo_button"
	};

	window.addEventListener('load', function() {
		new KRTCreateShortcut( configs );
	}, false);

}(document, window);