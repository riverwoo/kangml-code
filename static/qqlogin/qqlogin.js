(function(s) {
	var t = "",
		a = 0,
		g = [],
		y = [],
		z = 0,
		v = 0,
		n = [],
		u = [],
		o = true;

	function e() {
		return Math.round(Math.random() * 4294967295)
	}
	function j(D, E, A) {
		if (!A || A > 4) {
			A = 4
		}
		var B = 0;
		for (var C = E; C < E + A; C++) {
			B <<= 8;
			B |= D[C]
		}
		return (B & 4294967295) >>> 0
	}
	function b(B, C, A) {
		B[C + 3] = (A >> 0) & 255;
		B[C + 2] = (A >> 8) & 255;
		B[C + 1] = (A >> 16) & 255;
		B[C + 0] = (A >> 24) & 255
	}
	function x(D) {
		if (!D) {
			return ""
		}
		var A = "";
		for (var B = 0; B < D.length; B++) {
			var C = Number(D[B]).toString(16);
			if (C.length == 1) {
				C = "0" + C
			}
			A += C
		}
		return A
	}
	function w(B) {
		var C = "";
		for (var A = 0; A < B.length; A += 2) {
			C += String.fromCharCode(parseInt(B.substr(A, 2), 16))
		}
		return C
	}
	function c(D, A) {
		if (!D) {
			return ""
		}
		if (A) {
			D = l(D)
		}
		var C = [];
		for (var B = 0; B < D.length; B++) {
			C[B] = D.charCodeAt(B)
		}
		return x(C)
	}
	function l(D) {
		var C, E, B = [],
			A = D.length;
		for (C = 0; C < A; C++) {
			E = D.charCodeAt(C);
			if (E > 0 && E <= 127) {
				B.push(D.charAt(C))
			} else {
				if (E >= 128 && E <= 2047) {
					B.push(String.fromCharCode(192 | ((E >> 6) & 31)), String.fromCharCode(128 | (E & 63)))
				} else {
					if (E >= 2048 && E <= 65535) {
						B.push(String.fromCharCode(224 | ((E >> 12) & 15)), String.fromCharCode(128 | ((E >> 6) & 63)), String.fromCharCode(128 | (E & 63)))
					}
				}
			}
		}
		return B.join("")
	}
	function h(C) {
		g = new Array(8);
		y = new Array(8);
		z = v = 0;
		o = true;
		a = 0;
		var A = C.length;
		var D = 0;
		a = (A + 10) % 8;
		if (a != 0) {
			a = 8 - a
		}
		n = new Array(A + a + 10);
		g[0] = ((e() & 248) | a) & 255;
		for (var B = 1; B <= a; B++) {
			g[B] = e() & 255
		}
		a++;
		for (var B = 0; B < 8; B++) {
			y[B] = 0
		}
		D = 1;
		while (D <= 2) {
			if (a < 8) {
				g[a++] = e() & 255;
				D++
			}
			if (a == 8) {
				q()
			}
		}
		var B = 0;
		while (A > 0) {
			if (a < 8) {
				g[a++] = C[B++];
				A--
			}
			if (a == 8) {
				q()
			}
		}
		D = 1;
		while (D <= 7) {
			if (a < 8) {
				g[a++] = 0;
				D++
			}
			if (a == 8) {
				q()
			}
		}
		return n
	}
	function r(E) {
		var D = 0;
		var B = new Array(8);
		var A = E.length;
		u = E;
		if (A % 8 != 0 || A < 16) {
			return null
		}
		y = m(E);
		a = y[0] & 7;
		D = A - a - 10;
		if (D < 0) {
			return null
		}
		for (var C = 0; C < B.length; C++) {
			B[C] = 0
		}
		n = new Array(D);
		v = 0;
		z = 8;
		a++;
		var F = 1;
		while (F <= 2) {
			if (a < 8) {
				a++;
				F++
			}
			if (a == 8) {
				B = E;
				if (!f()) {
					return null
				}
			}
		}
		var C = 0;
		while (D != 0) {
			if (a < 8) {
				n[C] = (B[v + a] ^ y[a]) & 255;
				C++;
				D--;
				a++
			}
			if (a == 8) {
				B = E;
				v = z - 8;
				if (!f()) {
					return null
				}
			}
		}
		for (F = 1; F < 8; F++) {
			if (a < 8) {
				if ((B[v + a] ^ y[a]) != 0) {
					return null
				}
				a++
			}
			if (a == 8) {
				B = E;
				v = z;
				if (!f()) {
					return null
				}
			}
		}
		return n
	}
	function q() {
		for (var A = 0; A < 8; A++) {
			if (o) {
				g[A] ^= y[A]
			} else {
				g[A] ^= n[v + A]
			}
		}
		var B = k(g);
		for (var A = 0; A < 8; A++) {
			n[z + A] = B[A] ^ y[A];
			y[A] = g[A]
		}
		v = z;
		z += 8;
		a = 0;
		o = false
	}
	function k(A) {
		var B = 16;
		var G = j(A, 0, 4);
		var F = j(A, 4, 4);
		var I = j(t, 0, 4);
		var H = j(t, 4, 4);
		var E = j(t, 8, 4);
		var D = j(t, 12, 4);
		var C = 0;
		var J = 2654435769 >>> 0;
		while (B-- > 0) {
			C += J;
			C = (C & 4294967295) >>> 0;
			G += ((F << 4) + I) ^ (F + C) ^ ((F >>> 5) + H);
			G = (G & 4294967295) >>> 0;
			F += ((G << 4) + E) ^ (G + C) ^ ((G >>> 5) + D);
			F = (F & 4294967295) >>> 0
		}
		var K = new Array(8);
		b(K, 0, G);
		b(K, 4, F);
		return K
	}
	function m(A) {
		var B = 16;
		var G = j(A, 0, 4);
		var F = j(A, 4, 4);
		var I = j(t, 0, 4);
		var H = j(t, 4, 4);
		var E = j(t, 8, 4);
		var D = j(t, 12, 4);
		var C = 3816266640 >>> 0;
		var J = 2654435769 >>> 0;
		while (B-- > 0) {
			F -= ((G << 4) + E) ^ (G + C) ^ ((G >>> 5) + D);
			F = (F & 4294967295) >>> 0;
			G -= ((F << 4) + I) ^ (F + C) ^ ((F >>> 5) + H);
			G = (G & 4294967295) >>> 0;
			C -= J;
			C = (C & 4294967295) >>> 0
		}
		var K = new Array(8);
		b(K, 0, G);
		b(K, 4, F);
		return K
	}
	function f() {
		var A = u.length;
		for (var B = 0; B < 8; B++) {
			y[B] ^= u[z + B]
		}
		y = m(y);
		z += 8;
		a = 0;
		return true
	}
	function p(E, D) {
		var C = [];
		if (D) {
			for (var B = 0; B < E.length; B++) {
				C[B] = E.charCodeAt(B) & 255
			}
		} else {
			var A = 0;
			for (var B = 0; B < E.length; B += 2) {
				C[A++] = parseInt(E.substr(B, 2), 16)
			}
		}
		return C
	}
	s.TEA = {
		encrypt: function(D, C) {
			var B = p(D, C);
			var A = h(B);
			return x(A)
		},
		enAsBase64: function(F, E) {
			var D = p(F, E);
			var C = h(D);
			var A = "";
			for (var B = 0; B < C.length; B++) {
				A += String.fromCharCode(C[B])
			}
			return btoa(A)
		},
		decrypt: function(C) {
			var B = p(C, false);
			var A = r(B);
			return x(A)
		},
		initkey: function(A, B) {
			t = p(A, B)
		},
		bytesToStr: w,
		strToBytes: c,
		bytesInStr: x,
		dataFromStr: p
	};
	var d = {};
	d.PADCHAR = "=";
	d.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	d.getbyte = function(C, B) {
		var A = C.charCodeAt(B);
		if (A > 255) {
			throw "INVALID_CHARACTER_ERR: DOM Exception 5"
		}
		return A
	};
	d.encode = function(E) {
		if (arguments.length != 1) {
			throw "SyntaxError: Not enough arguments"
		}
		var B = d.PADCHAR;
		var G = d.ALPHA;
		var F = d.getbyte;
		var D, H;
		var A = [];
		E = "" + E;
		var C = E.length - E.length % 3;
		if (E.length == 0) {
			return E
		}
		for (D = 0; D < C; D += 3) {
			H = (F(E, D) << 16) | (F(E, D + 1) << 8) | F(E, D + 2);
			A.push(G.charAt(H >> 18));
			A.push(G.charAt((H >> 12) & 63));
			A.push(G.charAt((H >> 6) & 63));
			A.push(G.charAt(H & 63))
		}
		switch (E.length - C) {
		case 1:
			H = F(E, D) << 16;
			A.push(G.charAt(H >> 18) + G.charAt((H >> 12) & 63) + B + B);
			break;
		case 2:
			H = (F(E, D) << 16) | (F(E, D + 1) << 8);
			A.push(G.charAt(H >> 18) + G.charAt((H >> 12) & 63) + G.charAt((H >> 6) & 63) + B);
			break
		}
		return A.join("")
	};
	if (!window.btoa) {
		window.btoa = d.encode
	}
})(window);
$ = window.$ || {};
$pt = window.$pt || {};
$.RSA = $pt.RSA = function() {
	function g(z, t) {
		return new at(z, t)
	}
	function ai(aB, aC) {
		var t = "";
		var z = 0;
		while (z + aC < aB.length) {
			t += aB.substring(z, z + aC) + "\n";
			z += aC
		}
		return t + aB.substring(z, aB.length)
	}
	function s(t) {
		if (t < 16) {
			return "0" + t.toString(16)
		} else {
			return t.toString(16)
		}
	}
	function ag(aC, aF) {
		if (aF < aC.length + 11) {
			uv_alert("Message too long for RSA");
			return null
		}
		var aE = new Array();
		var aB = aC.length - 1;
		while (aB >= 0 && aF > 0) {
			var aD = aC.charCodeAt(aB--);
			aE[--aF] = aD
		}
		aE[--aF] = 0;
		var z = new ae();
		var t = new Array();
		while (aF > 2) {
			t[0] = 0;
			while (t[0] == 0) {
				z.nextBytes(t)
			}
			aE[--aF] = t[0]
		}
		aE[--aF] = 2;
		aE[--aF] = 0;
		return new at(aE)
	}
	function M() {
		this.n = null;
		this.e = 0;
		this.d = null;
		this.p = null;
		this.q = null;
		this.dmp1 = null;
		this.dmq1 = null;
		this.coeff = null
	}
	function p(z, t) {
		if (z != null && t != null && z.length > 0 && t.length > 0) {
			this.n = g(z, 16);
			this.e = parseInt(t, 16)
		} else {
			uv_alert("Invalid RSA public key")
		}
	}
	function X(t) {
		return t.modPowInt(this.e, this.n)
	}
	function q(aB) {
		var t = ag(aB, (this.n.bitLength() + 7) >> 3);
		if (t == null) {
			return null
		}
		var aC = this.doPublic(t);
		if (aC == null) {
			return null
		}
		var z = aC.toString(16);
		if ((z.length & 1) == 0) {
			return z
		} else {
			return "0" + z
		}
	}
	M.prototype.doPublic = X;
	M.prototype.setPublic = p;
	M.prototype.encrypt = q;
	var ax;
	var aj = 244837814094590;
	var aa = ((aj & 16777215) == 15715070);

	function at(z, t, aB) {
		if (z != null) {
			if ("number" == typeof z) {
				this.fromNumber(z, t, aB)
			} else {
				if (t == null && "string" != typeof z) {
					this.fromString(z, 256)
				} else {
					this.fromString(z, t)
				}
			}
		}
	}
	function h() {
		return new at(null)
	}
	function b(aD, t, z, aC, aF, aE) {
		while (--aE >= 0) {
			var aB = t * this[aD++] + z[aC] + aF;
			aF = Math.floor(aB / 67108864);
			z[aC++] = aB & 67108863
		}
		return aF
	}
	function az(aD, aI, aJ, aC, aG, t) {
		var aF = aI & 32767,
			aH = aI >> 15;
		while (--t >= 0) {
			var aB = this[aD] & 32767;
			var aE = this[aD++] >> 15;
			var z = aH * aB + aE * aF;
			aB = aF * aB + ((z & 32767) << 15) + aJ[aC] + (aG & 1073741823);
			aG = (aB >>> 30) + (z >>> 15) + aH * aE + (aG >>> 30);
			aJ[aC++] = aB & 1073741823
		}
		return aG
	}
	function ay(aD, aI, aJ, aC, aG, t) {
		var aF = aI & 16383,
			aH = aI >> 14;
		while (--t >= 0) {
			var aB = this[aD] & 16383;
			var aE = this[aD++] >> 14;
			var z = aH * aB + aE * aF;
			aB = aF * aB + ((z & 16383) << 14) + aJ[aC] + aG;
			aG = (aB >> 28) + (z >> 14) + aH * aE;
			aJ[aC++] = aB & 268435455
		}
		return aG
	}
	if (aa && (navigator.appName == "Microsoft Internet Explorer")) {
		at.prototype.am = az;
		ax = 30
	} else {
		if (aa && (navigator.appName != "Netscape")) {
			at.prototype.am = b;
			ax = 26
		} else {
			at.prototype.am = ay;
			ax = 28
		}
	}
	at.prototype.DB = ax;
	at.prototype.DM = ((1 << ax) - 1);
	at.prototype.DV = (1 << ax);
	var ab = 52;
	at.prototype.FV = Math.pow(2, ab);
	at.prototype.F1 = ab - ax;
	at.prototype.F2 = 2 * ax - ab;
	var af = "0123456789abcdefghijklmnopqrstuvwxyz";
	var ah = new Array();
	var aq, w;
	aq = "0".charCodeAt(0);
	for (w = 0; w <= 9; ++w) {
		ah[aq++] = w
	}
	aq = "a".charCodeAt(0);
	for (w = 10; w < 36; ++w) {
		ah[aq++] = w
	}
	aq = "A".charCodeAt(0);
	for (w = 10; w < 36; ++w) {
		ah[aq++] = w
	}
	function aA(t) {
		return af.charAt(t)
	}
	function B(z, t) {
		var aB = ah[z.charCodeAt(t)];
		return (aB == null) ? -1 : aB
	}
	function Z(z) {
		for (var t = this.t - 1; t >= 0; --t) {
			z[t] = this[t]
		}
		z.t = this.t;
		z.s = this.s
	}
	function o(t) {
		this.t = 1;
		this.s = (t < 0) ? -1 : 0;
		if (t > 0) {
			this[0] = t
		} else {
			if (t < -1) {
				this[0] = t + DV
			} else {
				this.t = 0
			}
		}
	}
	function c(t) {
		var z = h();
		z.fromInt(t);
		return z
	}
	function x(aF, z) {
		var aC;
		if (z == 16) {
			aC = 4
		} else {
			if (z == 8) {
				aC = 3
			} else {
				if (z == 256) {
					aC = 8
				} else {
					if (z == 2) {
						aC = 1
					} else {
						if (z == 32) {
							aC = 5
						} else {
							if (z == 4) {
								aC = 2
							} else {
								this.fromRadix(aF, z);
								return
							}
						}
					}
				}
			}
		}
		this.t = 0;
		this.s = 0;
		var aE = aF.length,
			aB = false,
			aD = 0;
		while (--aE >= 0) {
			var t = (aC == 8) ? aF[aE] & 255 : B(aF, aE);
			if (t < 0) {
				if (aF.charAt(aE) == "-") {
					aB = true
				}
				continue
			}
			aB = false;
			if (aD == 0) {
				this[this.t++] = t
			} else {
				if (aD + aC > this.DB) {
					this[this.t - 1] |= (t & ((1 << (this.DB - aD)) - 1)) << aD;
					this[this.t++] = (t >> (this.DB - aD))
				} else {
					this[this.t - 1] |= t << aD
				}
			}
			aD += aC;
			if (aD >= this.DB) {
				aD -= this.DB
			}
		}
		if (aC == 8 && (aF[0] & 128) != 0) {
			this.s = -1;
			if (aD > 0) {
				this[this.t - 1] |= ((1 << (this.DB - aD)) - 1) << aD
			}
		}
		this.clamp();
		if (aB) {
			at.ZERO.subTo(this, this)
		}
	}
	function P() {
		var t = this.s & this.DM;
		while (this.t > 0 && this[this.t - 1] == t) {
			--this.t
		}
	}
	function r(z) {
		if (this.s < 0) {
			return "-" + this.negate().toString(z)
		}
		var aB;
		if (z == 16) {
			aB = 4
		} else {
			if (z == 8) {
				aB = 3
			} else {
				if (z == 2) {
					aB = 1
				} else {
					if (z == 32) {
						aB = 5
					} else {
						if (z == 4) {
							aB = 2
						} else {
							return this.toRadix(z)
						}
					}
				}
			}
		}
		var aD = (1 << aB) - 1,
			aG, t = false,
			aE = "",
			aC = this.t;
		var aF = this.DB - (aC * this.DB) % aB;
		if (aC-- > 0) {
			if (aF < this.DB && (aG = this[aC] >> aF) > 0) {
				t = true;
				aE = aA(aG)
			}
			while (aC >= 0) {
				if (aF < aB) {
					aG = (this[aC] & ((1 << aF) - 1)) << (aB - aF);
					aG |= this[--aC] >> (aF += this.DB - aB)
				} else {
					aG = (this[aC] >> (aF -= aB)) & aD;
					if (aF <= 0) {
						aF += this.DB;
						--aC
					}
				}
				if (aG > 0) {
					t = true
				}
				if (t) {
					aE += aA(aG)
				}
			}
		}
		return t ? aE : "0"
	}
	function S() {
		var t = h();
		at.ZERO.subTo(this, t);
		return t
	}
	function am() {
		return (this.s < 0) ? this.negate() : this
	}
	function H(t) {
		var aB = this.s - t.s;
		if (aB != 0) {
			return aB
		}
		var z = this.t;
		aB = z - t.t;
		if (aB != 0) {
			return aB
		}
		while (--z >= 0) {
			if ((aB = this[z] - t[z]) != 0) {
				return aB
			}
		}
		return 0
	}
	function k(z) {
		var aC = 1,
			aB;
		if ((aB = z >>> 16) != 0) {
			z = aB;
			aC += 16
		}
		if ((aB = z >> 8) != 0) {
			z = aB;
			aC += 8
		}
		if ((aB = z >> 4) != 0) {
			z = aB;
			aC += 4
		}
		if ((aB = z >> 2) != 0) {
			z = aB;
			aC += 2
		}
		if ((aB = z >> 1) != 0) {
			z = aB;
			aC += 1
		}
		return aC
	}
	function v() {
		if (this.t <= 0) {
			return 0
		}
		return this.DB * (this.t - 1) + k(this[this.t - 1] ^ (this.s & this.DM))
	}
	function ar(aB, z) {
		var t;
		for (t = this.t - 1; t >= 0; --t) {
			z[t + aB] = this[t]
		}
		for (t = aB - 1; t >= 0; --t) {
			z[t] = 0
		}
		z.t = this.t + aB;
		z.s = this.s
	}
	function Y(aB, z) {
		for (var t = aB; t < this.t; ++t) {
			z[t - aB] = this[t]
		}
		z.t = Math.max(this.t - aB, 0);
		z.s = this.s
	}
	function u(aG, aC) {
		var z = aG % this.DB;
		var t = this.DB - z;
		var aE = (1 << t) - 1;
		var aD = Math.floor(aG / this.DB),
			aF = (this.s << z) & this.DM,
			aB;
		for (aB = this.t - 1; aB >= 0; --aB) {
			aC[aB + aD + 1] = (this[aB] >> t) | aF;
			aF = (this[aB] & aE) << z
		}
		for (aB = aD - 1; aB >= 0; --aB) {
			aC[aB] = 0
		}
		aC[aD] = aF;
		aC.t = this.t + aD + 1;
		aC.s = this.s;
		aC.clamp()
	}
	function m(aF, aC) {
		aC.s = this.s;
		var aD = Math.floor(aF / this.DB);
		if (aD >= this.t) {
			aC.t = 0;
			return
		}
		var z = aF % this.DB;
		var t = this.DB - z;
		var aE = (1 << z) - 1;
		aC[0] = this[aD] >> z;
		for (var aB = aD + 1; aB < this.t; ++aB) {
			aC[aB - aD - 1] |= (this[aB] & aE) << t;
			aC[aB - aD] = this[aB] >> z
		}
		if (z > 0) {
			aC[this.t - aD - 1] |= (this.s & aE) << t
		}
		aC.t = this.t - aD;
		aC.clamp()
	}
	function ac(z, aC) {
		var aB = 0,
			aD = 0,
			t = Math.min(z.t, this.t);
		while (aB < t) {
			aD += this[aB] - z[aB];
			aC[aB++] = aD & this.DM;
			aD >>= this.DB
		}
		if (z.t < this.t) {
			aD -= z.s;
			while (aB < this.t) {
				aD += this[aB];
				aC[aB++] = aD & this.DM;
				aD >>= this.DB
			}
			aD += this.s
		} else {
			aD += this.s;
			while (aB < z.t) {
				aD -= z[aB];
				aC[aB++] = aD & this.DM;
				aD >>= this.DB
			}
			aD -= z.s
		}
		aC.s = (aD < 0) ? -1 : 0;
		if (aD < -1) {
			aC[aB++] = this.DV + aD
		} else {
			if (aD > 0) {
				aC[aB++] = aD
			}
		}
		aC.t = aB;
		aC.clamp()
	}
	function E(z, aC) {
		var t = this.abs(),
			aD = z.abs();
		var aB = t.t;
		aC.t = aB + aD.t;
		while (--aB >= 0) {
			aC[aB] = 0
		}
		for (aB = 0; aB < aD.t; ++aB) {
			aC[aB + t.t] = t.am(0, aD[aB], aC, aB, 0, t.t)
		}
		aC.s = 0;
		aC.clamp();
		if (this.s != z.s) {
			at.ZERO.subTo(aC, aC)
		}
	}
	function R(aB) {
		var t = this.abs();
		var z = aB.t = 2 * t.t;
		while (--z >= 0) {
			aB[z] = 0
		}
		for (z = 0; z < t.t - 1; ++z) {
			var aC = t.am(z, t[z], aB, 2 * z, 0, 1);
			if ((aB[z + t.t] += t.am(z + 1, 2 * t[z], aB, 2 * z + 1, aC, t.t - z - 1)) >= t.DV) {
				aB[z + t.t] -= t.DV;
				aB[z + t.t + 1] = 1
			}
		}
		if (aB.t > 0) {
			aB[aB.t - 1] += t.am(z, t[z], aB, 2 * z, 0, 1)
		}
		aB.s = 0;
		aB.clamp()
	}
	function F(aJ, aG, aF) {
		var aP = aJ.abs();
		if (aP.t <= 0) {
			return
		}
		var aH = this.abs();
		if (aH.t < aP.t) {
			if (aG != null) {
				aG.fromInt(0)
			}
			if (aF != null) {
				this.copyTo(aF)
			}
			return
		}
		if (aF == null) {
			aF = h()
		}
		var aD = h(),
			z = this.s,
			aI = aJ.s;
		var aO = this.DB - k(aP[aP.t - 1]);
		if (aO > 0) {
			aP.lShiftTo(aO, aD);
			aH.lShiftTo(aO, aF)
		} else {
			aP.copyTo(aD);
			aH.copyTo(aF)
		}
		var aL = aD.t;
		var aB = aD[aL - 1];
		if (aB == 0) {
			return
		}
		var aK = aB * (1 << this.F1) + ((aL > 1) ? aD[aL - 2] >> this.F2 : 0);
		var aS = this.FV / aK,
			aR = (1 << this.F1) / aK,
			aQ = 1 << this.F2;
		var aN = aF.t,
			aM = aN - aL,
			aE = (aG == null) ? h() : aG;
		aD.dlShiftTo(aM, aE);
		if (aF.compareTo(aE) >= 0) {
			aF[aF.t++] = 1;
			aF.subTo(aE, aF)
		}
		at.ONE.dlShiftTo(aL, aE);
		aE.subTo(aD, aD);
		while (aD.t < aL) {
			aD[aD.t++] = 0
		}
		while (--aM >= 0) {
			var aC = (aF[--aN] == aB) ? this.DM : Math.floor(aF[aN] * aS + (aF[aN - 1] + aQ) * aR);
			if ((aF[aN] += aD.am(0, aC, aF, aM, 0, aL)) < aC) {
				aD.dlShiftTo(aM, aE);
				aF.subTo(aE, aF);
				while (aF[aN] < --aC) {
					aF.subTo(aE, aF)
				}
			}
		}
		if (aG != null) {
			aF.drShiftTo(aL, aG);
			if (z != aI) {
				at.ZERO.subTo(aG, aG)
			}
		}
		aF.t = aL;
		aF.clamp();
		if (aO > 0) {
			aF.rShiftTo(aO, aF)
		}
		if (z < 0) {
			at.ZERO.subTo(aF, aF)
		}
	}
	function O(t) {
		var z = h();
		this.abs().divRemTo(t, null, z);
		if (this.s < 0 && z.compareTo(at.ZERO) > 0) {
			t.subTo(z, z)
		}
		return z
	}
	function L(t) {
		this.m = t
	}
	function W(t) {
		if (t.s < 0 || t.compareTo(this.m) >= 0) {
			return t.mod(this.m)
		} else {
			return t
		}
	}
	function al(t) {
		return t
	}
	function K(t) {
		t.divRemTo(this.m, null, t)
	}
	function I(t, aB, z) {
		t.multiplyTo(aB, z);
		this.reduce(z)
	}
	function av(t, z) {
		t.squareTo(z);
		this.reduce(z)
	}
	L.prototype.convert = W;
	L.prototype.revert = al;
	L.prototype.reduce = K;
	L.prototype.mulTo = I;
	L.prototype.sqrTo = av;

	function C() {
		if (this.t < 1) {
			return 0
		}
		var t = this[0];
		if ((t & 1) == 0) {
			return 0
		}
		var z = t & 3;
		z = (z * (2 - (t & 15) * z)) & 15;
		z = (z * (2 - (t & 255) * z)) & 255;
		z = (z * (2 - (((t & 65535) * z) & 65535))) & 65535;
		z = (z * (2 - t * z % this.DV)) % this.DV;
		return (z > 0) ? this.DV - z : -z
	}
	function f(t) {
		this.m = t;
		this.mp = t.invDigit();
		this.mpl = this.mp & 32767;
		this.mph = this.mp >> 15;
		this.um = (1 << (t.DB - 15)) - 1;
		this.mt2 = 2 * t.t
	}
	function ak(t) {
		var z = h();
		t.abs().dlShiftTo(this.m.t, z);
		z.divRemTo(this.m, null, z);
		if (t.s < 0 && z.compareTo(at.ZERO) > 0) {
			this.m.subTo(z, z)
		}
		return z
	}
	function au(t) {
		var z = h();
		t.copyTo(z);
		this.reduce(z);
		return z
	}
	function Q(t) {
		while (t.t <= this.mt2) {
			t[t.t++] = 0
		}
		for (var aB = 0; aB < this.m.t; ++aB) {
			var z = t[aB] & 32767;
			var aC = (z * this.mpl + (((z * this.mph + (t[aB] >> 15) * this.mpl) & this.um) << 15)) & t.DM;
			z = aB + this.m.t;
			t[z] += this.m.am(0, aC, t, aB, 0, this.m.t);
			while (t[z] >= t.DV) {
				t[z] -= t.DV;
				t[++z]++
			}
		}
		t.clamp();
		t.drShiftTo(this.m.t, t);
		if (t.compareTo(this.m) >= 0) {
			t.subTo(this.m, t)
		}
	}
	function an(t, z) {
		t.squareTo(z);
		this.reduce(z)
	}
	function A(t, aB, z) {
		t.multiplyTo(aB, z);
		this.reduce(z)
	}
	f.prototype.convert = ak;
	f.prototype.revert = au;
	f.prototype.reduce = Q;
	f.prototype.mulTo = A;
	f.prototype.sqrTo = an;

	function j() {
		return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
	}
	function y(aG, aH) {
		if (aG > 4294967295 || aG < 1) {
			return at.ONE
		}
		var aF = h(),
			aB = h(),
			aE = aH.convert(this),
			aD = k(aG) - 1;
		aE.copyTo(aF);
		while (--aD >= 0) {
			aH.sqrTo(aF, aB);
			if ((aG & (1 << aD)) > 0) {
				aH.mulTo(aB, aE, aF)
			} else {
				var aC = aF;
				aF = aB;
				aB = aC
			}
		}
		return aH.revert(aF)
	}
	function ao(aB, t) {
		var aC;
		if (aB < 256 || t.isEven()) {
			aC = new L(t)
		} else {
			aC = new f(t)
		}
		return this.exp(aB, aC)
	}
	at.prototype.copyTo = Z;
	at.prototype.fromInt = o;
	at.prototype.fromString = x;
	at.prototype.clamp = P;
	at.prototype.dlShiftTo = ar;
	at.prototype.drShiftTo = Y;
	at.prototype.lShiftTo = u;
	at.prototype.rShiftTo = m;
	at.prototype.subTo = ac;
	at.prototype.multiplyTo = E;
	at.prototype.squareTo = R;
	at.prototype.divRemTo = F;
	at.prototype.invDigit = C;
	at.prototype.isEven = j;
	at.prototype.exp = y;
	at.prototype.toString = r;
	at.prototype.negate = S;
	at.prototype.abs = am;
	at.prototype.compareTo = H;
	at.prototype.bitLength = v;
	at.prototype.mod = O;
	at.prototype.modPowInt = ao;
	at.ZERO = c(0);
	at.ONE = c(1);
	var n;
	var V;
	var ad;

	function d(t) {
		V[ad++] ^= t & 255;
		V[ad++] ^= (t >> 8) & 255;
		V[ad++] ^= (t >> 16) & 255;
		V[ad++] ^= (t >> 24) & 255;
		if (ad >= N) {
			ad -= N
		}
	}
	function U() {
		d(new Date().getTime())
	}
	if (V == null) {
		V = new Array();
		ad = 0;
		var J;
		if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
			var G = window.crypto.random(32);
			for (J = 0; J < G.length; ++J) {
				V[ad++] = G.charCodeAt(J) & 255
			}
		}
		while (ad < N) {
			J = Math.floor(65536 * Math.random());
			V[ad++] = J >>> 8;
			V[ad++] = J & 255
		}
		ad = 0;
		U()
	}
	function D() {
		if (n == null) {
			U();
			n = ap();
			n.init(V);
			for (ad = 0; ad < V.length; ++ad) {
				V[ad] = 0
			}
			ad = 0
		}
		return n.next()
	}
	function aw(z) {
		var t;
		for (t = 0; t < z.length; ++t) {
			z[t] = D()
		}
	}
	function ae() {}
	ae.prototype.nextBytes = aw;

	function l() {
		this.i = 0;
		this.j = 0;
		this.S = new Array()
	}
	function e(aD) {
		var aC, z, aB;
		for (aC = 0; aC < 256; ++aC) {
			this.S[aC] = aC
		}
		z = 0;
		for (aC = 0; aC < 256; ++aC) {
			z = (z + this.S[aC] + aD[aC % aD.length]) & 255;
			aB = this.S[aC];
			this.S[aC] = this.S[z];
			this.S[z] = aB
		}
		this.i = 0;
		this.j = 0
	}
	function a() {
		var z;
		this.i = (this.i + 1) & 255;
		this.j = (this.j + this.S[this.i]) & 255;
		z = this.S[this.i];
		this.S[this.i] = this.S[this.j];
		this.S[this.j] = z;
		return this.S[(z + this.S[this.i]) & 255]
	}
	l.prototype.init = e;
	l.prototype.next = a;

	function ap() {
		return new l()
	}
	var N = 256;

	function T(aC, aB, z) {
		aB = "F20CE00BAE5361F8FA3AE9CEFA495362FF7DA1BA628F64A347F0A8C012BF0B254A30CD92ABFFE7A6EE0DC424CB6166F8819EFA5BCCB20EDFB4AD02E412CCF579B1CA711D55B8B0B3AEB60153D5E0693A2A86F3167D7847A0CB8B00004716A9095D9BADC977CBB804DBDCBA6029A9710869A453F27DFDDF83C016D928B3CBF4C7";
		z = "3";
		var t = new M();
		t.setPublic(aB, z);
		return t.encrypt(aC)
	}
	return {
		rsa_encrypt: T
	}
}();
$.Encryption = $pt.Encryption = function() {
	var hexcase = 1;
	var b64pad = "";
	var chrsz = 8;
	var mode = 32;

	function md5(s) {
		return hex_md5(s)
	}
	function hex_md5(s) {
		return binl2hex(core_md5(str2binl(s), s.length * chrsz))
	}
	function str_md5(s) {
		return binl2str(core_md5(str2binl(s), s.length * chrsz))
	}
	function hex_hmac_md5(key, data) {
		return binl2hex(core_hmac_md5(key, data))
	}
	function b64_hmac_md5(key, data) {
		return binl2b64(core_hmac_md5(key, data))
	}
	function str_hmac_md5(key, data) {
		return binl2str(core_hmac_md5(key, data))
	}
	function core_md5(x, len) {
		x[len >> 5] |= 128 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd)
		}
		if (mode == 16) {
			return Array(b, c)
		} else {
			return Array(a, b, c, d)
		}
	}
	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
	}
	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
	}
	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
	}
	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t)
	}
	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
	}
	function core_hmac_md5(key, data) {
		var bkey = str2binl(key);
		if (bkey.length > 16) {
			bkey = core_md5(bkey, key.length * chrsz)
		}
		var ipad = Array(16),
			opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 909522486;
			opad[i] = bkey[i] ^ 1549556828
		}
		var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
		return core_md5(opad.concat(hash), 512 + 128)
	}
	function safe_add(x, y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 65535)
	}
	function bit_rol(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt))
	}
	function str2binl(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32)
		}
		return bin
	}
	function binl2str(bin) {
		var str = "";
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask)
		}
		return str
	}
	function binl2hex(binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 15) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 15)
		}
		return str
	}
	function binl2b64(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 255) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 255) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 255);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) {
					str += b64pad
				} else {
					str += tab.charAt((triplet >> 6 * (3 - j)) & 63)
				}
			}
		}
		return str
	}
	function hexchar2bin(str) {
		var arr = [];
		for (var i = 0; i < str.length; i = i + 2) {
			arr.push("\\x" + str.substr(i, 2))
		}
		arr = arr.join("");
		eval("var temp = '" + arr + "'");
		return temp
	}
	function __monitor(mid, probability) {
		if (Math.random() > (probability || 1)) {
			return
		}
		try {
			var url = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + mid;
			var s = document.createElement("img");
			s.src = url
		} catch (e) {}
	}
	function getEncryption(ps, uin, vcode) {
		salt = uin2hex(uin);
		vcode = vcode || "";
		ps = ps || "";
		var md5Pwd = md5(ps),
			h1 = hexchar2bin(md5Pwd),
			s2 = md5(h1 + salt),
			rsaH1 = $pt.RSA.rsa_encrypt(h1),
			rsaH1Len = (rsaH1.length / 2).toString(16),
			hexVcode = TEA.strToBytes(vcode.toUpperCase(), true),
			vcodeLen = Number(hexVcode.length / 2).toString(16);
		while (vcodeLen.length < 4) {
			vcodeLen = "0" + vcodeLen
		}
		while (rsaH1Len.length < 4) {
			rsaH1Len = "0" + rsaH1Len
		}
		TEA.initkey(s2);
		var saltPwd = TEA.enAsBase64(rsaH1Len + rsaH1 + TEA.strToBytes(salt) + vcodeLen + hexVcode);
		TEA.initkey("");
		setTimeout(function() {
			__monitor(488358, 1)
		}, 0);
		return saltPwd.replace(/[\/\+=]/g, function(a) {
			return {
				"/": "-",
				"+": "*",
				"=": "_"
			}[a]
		})
	}
	function getRSAEncryption(password, vcode) {
		var str1 = md5(password);
		var str2 = str1 + vcode.toUpperCase();
		var str3 = $.RSA.rsa_encrypt(str2);
		return str3
	}
	return {
		getEncryption: getEncryption,
		getRSAEncryption: getRSAEncryption,
		md5: md5
	}
}();
function uin2hex(str) {
    var maxLength = 16;
    str = parseInt(str);
    var hex = str.toString(16);
    var len = hex.length;
    for (var i = len; i < maxLength; i++) {
        hex = "0" + hex
    }
    var arr = [];
    for (var j = 0; j < maxLength; j += 2) {
        arr.push("\\x" + hex.substr(j, 2))
    }
    var result = arr.join("");
    eval('result="' + result + '"');
    return result
}
function getmd5(u,p,code) {
	var p=$.Encryption.getEncryption(p,u,code);
	return p
}
