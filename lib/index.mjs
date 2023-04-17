var pt = (n, e, r) => {
  if (!e.has(n))
    throw TypeError("Cannot " + r);
};
var oe = (n, e, r) => (pt(n, e, "read from private field"), r ? r.call(n) : e.get(n)), j = (n, e, r) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, r);
}, je = (n, e, r, a) => (pt(n, e, "write to private field"), a ? a.call(n, r) : e.set(n, r), r);
var X = (n, e, r) => (pt(n, e, "access private method"), r);
import { v4 as an } from "uuid";
var mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Fi(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var mr = {}, Ci = {
  get exports() {
    return mr;
  },
  set exports(n) {
    mr = n;
  }
}, _r = {}, Ii = {
  get exports() {
    return _r;
  },
  set exports(n) {
    _r = n;
  }
};
/*! https://mths.be/punycode v1.4.1 by @mathias */
(function(n, e) {
  (function(r) {
    var a = e && !e.nodeType && e, o = n && !n.nodeType && n, u = typeof mt == "object" && mt;
    (u.global === u || u.window === u || u.self === u) && (r = u);
    var l, s = 2147483647, m = 36, p = 1, y = 26, g = 38, A = 700, O = 72, L = 128, _ = "-", Fe = /^xn--/, ce = /[^\x20-\x7E]/, xe = /[\x2E\u3002\uFF0E\uFF61]/g, ze = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, T = m - p, D = Math.floor, de = String.fromCharCode, pe;
    function ue(F) {
      throw new RangeError(ze[F]);
    }
    function $e(F, S) {
      for (var I = F.length, B = []; I--; )
        B[I] = S(F[I]);
      return B;
    }
    function Q(F, S) {
      var I = F.split("@"), B = "";
      I.length > 1 && (B = I[0] + "@", F = I[1]), F = F.replace(xe, ".");
      var N = F.split("."), Z = $e(N, S).join(".");
      return B + Z;
    }
    function me(F) {
      for (var S = [], I = 0, B = F.length, N, Z; I < B; )
        N = F.charCodeAt(I++), N >= 55296 && N <= 56319 && I < B ? (Z = F.charCodeAt(I++), (Z & 64512) == 56320 ? S.push(((N & 1023) << 10) + (Z & 1023) + 65536) : (S.push(N), I--)) : S.push(N);
      return S;
    }
    function ie(F) {
      return $e(F, function(S) {
        var I = "";
        return S > 65535 && (S -= 65536, I += de(S >>> 10 & 1023 | 55296), S = 56320 | S & 1023), I += de(S), I;
      }).join("");
    }
    function Ee(F) {
      return F - 48 < 10 ? F - 22 : F - 65 < 26 ? F - 65 : F - 97 < 26 ? F - 97 : m;
    }
    function ve(F, S) {
      return F + 22 + 75 * (F < 26) - ((S != 0) << 5);
    }
    function Ce(F, S, I) {
      var B = 0;
      for (F = I ? D(F / A) : F >> 1, F += D(F / S); F > T * y >> 1; B += m)
        F = D(F / T);
      return D(B + (T + 1) * F / (F + g));
    }
    function or(F) {
      var S = [], I = F.length, B, N = 0, Z = L, z = O, M, ee, fe, ye, V, G, k, le, Ie;
      for (M = F.lastIndexOf(_), M < 0 && (M = 0), ee = 0; ee < M; ++ee)
        F.charCodeAt(ee) >= 128 && ue("not-basic"), S.push(F.charCodeAt(ee));
      for (fe = M > 0 ? M + 1 : 0; fe < I; ) {
        for (ye = N, V = 1, G = m; fe >= I && ue("invalid-input"), k = Ee(F.charCodeAt(fe++)), (k >= m || k > D((s - N) / V)) && ue("overflow"), N += k * V, le = G <= z ? p : G >= z + y ? y : G - z, !(k < le); G += m)
          Ie = m - le, V > D(s / Ie) && ue("overflow"), V *= Ie;
        B = S.length + 1, z = Ce(N - ye, B, ye == 0), D(N / B) > s - Z && ue("overflow"), Z += D(N / B), N %= B, S.splice(N++, 0, Z);
      }
      return ie(S);
    }
    function sr(F) {
      var S, I, B, N, Z, z, M, ee, fe, ye, V, G = [], k, le, Ie, f;
      for (F = me(F), k = F.length, S = L, I = 0, Z = O, z = 0; z < k; ++z)
        V = F[z], V < 128 && G.push(de(V));
      for (B = N = G.length, N && G.push(_); B < k; ) {
        for (M = s, z = 0; z < k; ++z)
          V = F[z], V >= S && V < M && (M = V);
        for (le = B + 1, M - S > D((s - I) / le) && ue("overflow"), I += (M - S) * le, S = M, z = 0; z < k; ++z)
          if (V = F[z], V < S && ++I > s && ue("overflow"), V == S) {
            for (ee = I, fe = m; ye = fe <= Z ? p : fe >= Z + y ? y : fe - Z, !(ee < ye); fe += m)
              f = ee - ye, Ie = m - ye, G.push(
                de(ve(ye + f % Ie, 0))
              ), ee = D(f / Ie);
            G.push(de(ve(ee, 0))), Z = Ce(I, le, B == N), I = 0, ++B;
          }
        ++I, ++S;
      }
      return G.join("");
    }
    function vr(F) {
      return Q(F, function(S) {
        return Fe.test(S) ? or(S.slice(4).toLowerCase()) : S;
      });
    }
    function yr(F) {
      return Q(F, function(S) {
        return ce.test(S) ? "xn--" + sr(S) : S;
      });
    }
    if (l = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "1.4.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: me,
        encode: ie
      },
      decode: or,
      encode: sr,
      toASCII: yr,
      toUnicode: vr
    }, a && o)
      if (n.exports == a)
        o.exports = l;
      else
        for (pe in l)
          l.hasOwnProperty(pe) && (a[pe] = l[pe]);
    else
      r.punycode = l;
  })(mt);
})(Ii, _r);
var Nr = {}, Ti = {
  get exports() {
    return Nr;
  },
  set exports(n) {
    Nr = n;
  }
}, br = {};
function Ri(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
var Oi = function(n, e, r, a) {
  e = e || "&", r = r || "=";
  var o = {};
  if (typeof n != "string" || n.length === 0)
    return o;
  var u = /\+/g;
  n = n.split(e);
  var l = 1e3;
  a && typeof a.maxKeys == "number" && (l = a.maxKeys);
  var s = n.length;
  l > 0 && s > l && (s = l);
  for (var m = 0; m < s; ++m) {
    var p = n[m].replace(u, "%20"), y = p.indexOf(r), g, A, O, L;
    y >= 0 ? (g = p.substr(0, y), A = p.substr(y + 1)) : (g = p, A = ""), O = decodeURIComponent(g), L = decodeURIComponent(A), Ri(o, O) ? Ui(o[O]) ? o[O].push(L) : o[O] = [o[O], L] : o[O] = L;
  }
  return o;
}, Ui = Array.isArray || function(n) {
  return Object.prototype.toString.call(n) === "[object Array]";
}, Ar = function(n) {
  switch (typeof n) {
    case "string":
      return n;
    case "boolean":
      return n ? "true" : "false";
    case "number":
      return isFinite(n) ? n : "";
    default:
      return "";
  }
}, $i = function(n, e, r, a) {
  return e = e || "&", r = r || "=", n === null && (n = void 0), typeof n == "object" ? on(qi(n), function(o) {
    var u = encodeURIComponent(Ar(o)) + r;
    return Pi(n[o]) ? on(n[o], function(l) {
      return u + encodeURIComponent(Ar(l));
    }).join(e) : u + encodeURIComponent(Ar(n[o]));
  }).join(e) : a ? encodeURIComponent(Ar(a)) + r + encodeURIComponent(Ar(n)) : "";
}, Pi = Array.isArray || function(n) {
  return Object.prototype.toString.call(n) === "[object Array]";
};
function on(n, e) {
  if (n.map)
    return n.map(e);
  for (var r = [], a = 0; a < n.length; a++)
    r.push(e(n[a], a));
  return r;
}
var qi = Object.keys || function(n) {
  var e = [];
  for (var r in n)
    Object.prototype.hasOwnProperty.call(n, r) && e.push(r);
  return e;
};
br.decode = br.parse = Oi;
br.encode = br.stringify = $i;
(function(n, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var r = br;
  function a(l) {
    return encodeURIComponent(l);
  }
  function o(l) {
    return decodeURIComponent(l);
  }
  var u = {
    decode: r.decode,
    encode: r.encode,
    parse: r.parse,
    stringify: r.stringify,
    escape: a,
    unescape: o
  };
  Object.defineProperty(e, "decode", {
    enumerable: !0,
    get: function() {
      return r.decode;
    }
  }), Object.defineProperty(e, "encode", {
    enumerable: !0,
    get: function() {
      return r.encode;
    }
  }), Object.defineProperty(e, "parse", {
    enumerable: !0,
    get: function() {
      return r.parse;
    }
  }), Object.defineProperty(e, "stringify", {
    enumerable: !0,
    get: function() {
      return r.stringify;
    }
  }), e.default = u, e.escape = a, e.unescape = o, e = n.exports = u;
})(Ti, Nr);
(function(n, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var r = _r, a = Nr;
  function o(c) {
    return c && typeof c == "object" && "default" in c ? c : { default: c };
  }
  var u = /* @__PURE__ */ o(r), l = /* @__PURE__ */ o(a), s = {
    isString: function(c) {
      return typeof c == "string";
    },
    isObject: function(c) {
      return typeof c == "object" && c !== null;
    },
    isNull: function(c) {
      return c === null;
    },
    isNullOrUndefined: function(c) {
      return c == null;
    }
  }, m = u.default, p = s, y = Ce, g = sr, A = vr, O = or, L = _;
  function _() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
  }
  var Fe = /^([a-z0-9.+-]+:)/i, ce = /:[0-9]*$/, xe = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, ze = ["<", ">", '"', "`", " ", "\r", `
`, "	"], T = ["{", "}", "|", "\\", "^", "`"].concat(ze), D = ["'"].concat(T), de = ["%", "/", "?", ";", "#"].concat(D), pe = ["/", "?", "#"], ue = 255, $e = /^[+a-z0-9A-Z_-]{0,63}$/, Q = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, me = {
    javascript: !0,
    "javascript:": !0
  }, ie = {
    javascript: !0,
    "javascript:": !0
  }, Ee = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  }, ve = l.default;
  function Ce(c, x, d) {
    if (c && p.isObject(c) && c instanceof _)
      return c;
    var b = new _();
    return b.parse(c, x, d), b;
  }
  _.prototype.parse = function(c, x, d) {
    if (!p.isString(c))
      throw new TypeError("Parameter 'url' must be a string, not " + typeof c);
    var b = c.indexOf("?"), $ = b !== -1 && b < c.indexOf("#") ? "?" : "#", ae = c.split($), ne = /\\/g;
    ae[0] = ae[0].replace(ne, "/"), c = ae.join($);
    var C = c;
    if (C = C.trim(), !d && c.split("#").length === 1) {
      var Pe = xe.exec(C);
      if (Pe)
        return this.path = C, this.href = C, this.pathname = Pe[1], Pe[2] ? (this.search = Pe[2], x ? this.query = ve.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : x && (this.search = "", this.query = {}), this;
    }
    var J = Fe.exec(C);
    if (J) {
      J = J[0];
      var Ke = J.toLowerCase();
      this.protocol = Ke, C = C.substr(J.length);
    }
    if (d || J || C.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var gr = C.substr(0, 2) === "//";
      gr && !(J && ie[J]) && (C = C.substr(2), this.slashes = !0);
    }
    if (!ie[J] && (gr || J && !Ee[J])) {
      for (var se = -1, K = 0; K < pe.length; K++) {
        var Ze = C.indexOf(pe[K]);
        Ze !== -1 && (se === -1 || Ze < se) && (se = Ze);
      }
      var wr, he;
      se === -1 ? he = C.lastIndexOf("@") : he = C.lastIndexOf("@", se), he !== -1 && (wr = C.slice(0, he), C = C.slice(he + 1), this.auth = decodeURIComponent(wr)), se = -1;
      for (var K = 0; K < de.length; K++) {
        var Ze = C.indexOf(de[K]);
        Ze !== -1 && (se === -1 || Ze < se) && (se = Ze);
      }
      se === -1 && (se = C.length), this.host = C.slice(0, se), C = C.slice(se), this.parseHost(), this.hostname = this.hostname || "";
      var xr = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!xr)
        for (var R = this.hostname.split(/\./), K = 0, Y = R.length; K < Y; K++) {
          var qe = R[K];
          if (qe && !qe.match($e)) {
            for (var Te = "", Re = 0, lt = qe.length; Re < lt; Re++)
              qe.charCodeAt(Re) > 127 ? Te += "x" : Te += qe[Re];
            if (!Te.match($e)) {
              var He = R.slice(0, K), Be = R.slice(K + 1), ur = qe.match(Q);
              ur && (He.push(ur[1]), Be.unshift(ur[2])), Be.length && (C = "/" + Be.join(".") + C), this.hostname = He.join(".");
              break;
            }
          }
        }
      this.hostname.length > ue ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), xr || (this.hostname = m.toASCII(this.hostname));
      var ht = this.port ? ":" + this.port : "", bi = this.hostname || "";
      this.host = bi + ht, this.href += this.host, xr && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), C[0] !== "/" && (C = "/" + C));
    }
    if (!me[Ke])
      for (var K = 0, Y = D.length; K < Y; K++) {
        var Er = D[K];
        if (C.indexOf(Er) !== -1) {
          var ct = encodeURIComponent(Er);
          ct === Er && (ct = escape(Er)), C = C.split(Er).join(ct);
        }
      }
    var dt = C.indexOf("#");
    dt !== -1 && (this.hash = C.substr(dt), C = C.slice(0, dt));
    var qr = C.indexOf("?");
    if (qr !== -1 ? (this.search = C.substr(qr), this.query = C.substr(qr + 1), x && (this.query = ve.parse(this.query)), C = C.slice(0, qr)) : x && (this.search = "", this.query = {}), C && (this.pathname = C), Ee[Ke] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      var ht = this.pathname || "", Si = this.search || "";
      this.path = ht + Si;
    }
    return this.href = this.format(), this;
  };
  function or(c) {
    return p.isString(c) && (c = Ce(c)), c instanceof _ ? c.format() : _.prototype.format.call(c);
  }
  _.prototype.format = function() {
    var c = this.auth || "";
    c && (c = encodeURIComponent(c), c = c.replace(/%3A/i, ":"), c += "@");
    var x = this.protocol || "", d = this.pathname || "", b = this.hash || "", $ = !1, ae = "";
    this.host ? $ = c + this.host : this.hostname && ($ = c + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && ($ += ":" + this.port)), this.query && p.isObject(this.query) && Object.keys(this.query).length && (ae = ve.stringify(this.query));
    var ne = this.search || ae && "?" + ae || "";
    return x && x.substr(-1) !== ":" && (x += ":"), this.slashes || (!x || Ee[x]) && $ !== !1 ? ($ = "//" + ($ || ""), d && d.charAt(0) !== "/" && (d = "/" + d)) : $ || ($ = ""), b && b.charAt(0) !== "#" && (b = "#" + b), ne && ne.charAt(0) !== "?" && (ne = "?" + ne), d = d.replace(/[?#]/g, function(C) {
      return encodeURIComponent(C);
    }), ne = ne.replace("#", "%23"), x + $ + d + ne + b;
  };
  function sr(c, x) {
    return Ce(c, !1, !0).resolve(x);
  }
  _.prototype.resolve = function(c) {
    return this.resolveObject(Ce(c, !1, !0)).format();
  };
  function vr(c, x) {
    return c ? Ce(c, !1, !0).resolveObject(x) : x;
  }
  _.prototype.resolveObject = function(c) {
    if (p.isString(c)) {
      var x = new _();
      x.parse(c, !1, !0), c = x;
    }
    for (var d = new _(), b = Object.keys(this), $ = 0; $ < b.length; $++) {
      var ae = b[$];
      d[ae] = this[ae];
    }
    if (d.hash = c.hash, c.href === "")
      return d.href = d.format(), d;
    if (c.slashes && !c.protocol) {
      for (var ne = Object.keys(c), C = 0; C < ne.length; C++) {
        var Pe = ne[C];
        Pe !== "protocol" && (d[Pe] = c[Pe]);
      }
      return Ee[d.protocol] && d.hostname && !d.pathname && (d.path = d.pathname = "/"), d.href = d.format(), d;
    }
    if (c.protocol && c.protocol !== d.protocol) {
      if (!Ee[c.protocol]) {
        for (var J = Object.keys(c), Ke = 0; Ke < J.length; Ke++) {
          var gr = J[Ke];
          d[gr] = c[gr];
        }
        return d.href = d.format(), d;
      }
      if (d.protocol = c.protocol, !c.host && !ie[c.protocol]) {
        for (var Y = (c.pathname || "").split("/"); Y.length && !(c.host = Y.shift()); )
          ;
        c.host || (c.host = ""), c.hostname || (c.hostname = ""), Y[0] !== "" && Y.unshift(""), Y.length < 2 && Y.unshift(""), d.pathname = Y.join("/");
      } else
        d.pathname = c.pathname;
      if (d.search = c.search, d.query = c.query, d.host = c.host || "", d.auth = c.auth, d.hostname = c.hostname || c.host, d.port = c.port, d.pathname || d.search) {
        var se = d.pathname || "", K = d.search || "";
        d.path = se + K;
      }
      return d.slashes = d.slashes || c.slashes, d.href = d.format(), d;
    }
    var Ze = d.pathname && d.pathname.charAt(0) === "/", wr = c.host || c.pathname && c.pathname.charAt(0) === "/", he = wr || Ze || d.host && c.pathname, xr = he, R = d.pathname && d.pathname.split("/") || [], Y = c.pathname && c.pathname.split("/") || [], qe = d.protocol && !Ee[d.protocol];
    if (qe && (d.hostname = "", d.port = null, d.host && (R[0] === "" ? R[0] = d.host : R.unshift(d.host)), d.host = "", c.protocol && (c.hostname = null, c.port = null, c.host && (Y[0] === "" ? Y[0] = c.host : Y.unshift(c.host)), c.host = null), he = he && (Y[0] === "" || R[0] === "")), wr)
      d.host = c.host || c.host === "" ? c.host : d.host, d.hostname = c.hostname || c.hostname === "" ? c.hostname : d.hostname, d.search = c.search, d.query = c.query, R = Y;
    else if (Y.length)
      R || (R = []), R.pop(), R = R.concat(Y), d.search = c.search, d.query = c.query;
    else if (!p.isNullOrUndefined(c.search)) {
      if (qe) {
        d.hostname = d.host = R.shift();
        var Te = d.host && d.host.indexOf("@") > 0 ? d.host.split("@") : !1;
        Te && (d.auth = Te.shift(), d.host = d.hostname = Te.shift());
      }
      return d.search = c.search, d.query = c.query, (!p.isNull(d.pathname) || !p.isNull(d.search)) && (d.path = (d.pathname ? d.pathname : "") + (d.search ? d.search : "")), d.href = d.format(), d;
    }
    if (!R.length)
      return d.pathname = null, d.search ? d.path = "/" + d.search : d.path = null, d.href = d.format(), d;
    for (var Re = R.slice(-1)[0], lt = (d.host || c.host || R.length > 1) && (Re === "." || Re === "..") || Re === "", He = 0, Be = R.length; Be >= 0; Be--)
      Re = R[Be], Re === "." ? R.splice(Be, 1) : Re === ".." ? (R.splice(Be, 1), He++) : He && (R.splice(Be, 1), He--);
    if (!he && !xr)
      for (; He--; He)
        R.unshift("..");
    he && R[0] !== "" && (!R[0] || R[0].charAt(0) !== "/") && R.unshift(""), lt && R.join("/").substr(-1) !== "/" && R.push("");
    var ur = R[0] === "" || R[0] && R[0].charAt(0) === "/";
    if (qe) {
      d.hostname = d.host = ur ? "" : R.length ? R.shift() : "";
      var Te = d.host && d.host.indexOf("@") > 0 ? d.host.split("@") : !1;
      Te && (d.auth = Te.shift(), d.host = d.hostname = Te.shift());
    }
    return he = he || d.host && R.length, he && !ur && R.unshift(""), R.length ? d.pathname = R.join("/") : (d.pathname = null, d.path = null), (!p.isNull(d.pathname) || !p.isNull(d.search)) && (d.path = (d.pathname ? d.pathname : "") + (d.search ? d.search : "")), d.auth = c.auth || d.auth, d.slashes = d.slashes || c.slashes, d.href = d.format(), d;
  }, _.prototype.parseHost = function() {
    var c = this.host, x = ce.exec(c);
    x && (x = x[0], x !== ":" && (this.port = x.substr(1)), c = c.substr(0, c.length - x.length)), c && (this.hostname = c);
  };
  function yr(c, x) {
    for (var d = 0, b = c.length - 1; b >= 0; b--) {
      var $ = c[b];
      $ === "." ? c.splice(b, 1) : $ === ".." ? (c.splice(b, 1), d++) : d && (c.splice(b, 1), d--);
    }
    if (x)
      for (; d--; d)
        c.unshift("..");
    return c;
  }
  function F() {
    for (var c = "", x = !1, d = arguments.length - 1; d >= -1 && !x; d--) {
      var b = d >= 0 ? arguments[d] : "/";
      if (typeof b != "string")
        throw new TypeError("Arguments to path.resolve must be strings");
      if (!b)
        continue;
      c = b + "/" + c, x = b.charAt(0) === "/";
    }
    return c = yr(S(c.split("/"), function($) {
      return !!$;
    }), !x).join("/"), (x ? "/" : "") + c || ".";
  }
  function S(c, x) {
    if (c.filter)
      return c.filter(x);
    for (var d = [], b = 0; b < c.length; b++)
      x(c[b], b, c) && d.push(c[b]);
    return d;
  }
  var I = function(c) {
    function x() {
      var b = this || self;
      return delete c.prototype.__magic__, b;
    }
    if (typeof globalThis == "object")
      return globalThis;
    if (this)
      return x();
    c.defineProperty(c.prototype, "__magic__", {
      configurable: !0,
      get: x
    });
    var d = __magic__;
    return d;
  }(Object), B = (
    /** @type {formatImport}*/
    O
  ), N = (
    /** @type {parseImport}*/
    y
  ), Z = (
    /** @type {resolveImport}*/
    g
  ), z = (
    /** @type {UrlImport}*/
    L
  ), M = I.URL, ee = I.URLSearchParams, fe = /%/g, ye = /\\/g, V = /\n/g, G = /\r/g, k = /\t/g, le = 47;
  function Ie(c) {
    var x = (
      /** @type {URL|null} */
      c ?? null
    );
    return Boolean(x !== null && (x == null ? void 0 : x.href) && (x == null ? void 0 : x.origin));
  }
  function f(c) {
    if (c.hostname !== "")
      throw new TypeError('File URL host must be "localhost" or empty on browser');
    for (var x = c.pathname, d = 0; d < x.length; d++)
      if (x[d] === "%") {
        var b = x.codePointAt(d + 2) | 32;
        if (x[d + 1] === "2" && b === 102)
          throw new TypeError("File URL path must not include encoded / characters");
      }
    return decodeURIComponent(x);
  }
  function t(c) {
    return c.includes("%") && (c = c.replace(fe, "%25")), c.includes("\\") && (c = c.replace(ye, "%5C")), c.includes(`
`) && (c = c.replace(V, "%0A")), c.includes("\r") && (c = c.replace(G, "%0D")), c.includes("	") && (c = c.replace(k, "%09")), c;
  }
  var i = (
    /**
     * @type {domainToASCII}
     */
    function(x) {
      if (typeof x > "u")
        throw new TypeError('The "domain" argument must be specified');
      return new M("http://" + x).hostname;
    }
  ), h = (
    /**
     * @type {domainToUnicode}
     */
    function(x) {
      if (typeof x > "u")
        throw new TypeError('The "domain" argument must be specified');
      return new M("http://" + x).hostname;
    }
  ), v = (
    /**
     * @type {(url: string) => URL}
     */
    function(x) {
      var d = new M("file://"), b = F(x), $ = x.charCodeAt(x.length - 1);
      return $ === le && b[b.length - 1] !== "/" && (b += "/"), d.pathname = t(b), d;
    }
  ), w = (
    /**
     * @type {fileURLToPath & ((path: string | URL) => string)}
     */
    function(x) {
      if (!Ie(x) && typeof x != "string")
        throw new TypeError('The "path" argument must be of type string or an instance of URL. Received type ' + typeof x + " (" + x + ")");
      var d = new M(x);
      if (d.protocol !== "file:")
        throw new TypeError("The URL must be of scheme file");
      return f(d);
    }
  ), E = (
    /**
     * @type {(
     *   ((urlObject: URL, options?: URLFormatOptions) => string) &
     *   ((urlObject: UrlObject | string, options?: never) => string)
     * )}
     */
    function(x, d) {
      var b, $, ae;
      if (d === void 0 && (d = {}), !(x instanceof M))
        return B(x);
      if (typeof d != "object" || d === null)
        throw new TypeError('The "options" argument must be of type object.');
      var ne = (b = d.auth) != null ? b : !0, C = ($ = d.fragment) != null ? $ : !0, Pe = (ae = d.search) != null ? ae : !0, J = new M(x.toString());
      return ne || (J.username = "", J.password = ""), C || (J.hash = ""), Pe || (J.search = ""), J.toString();
    }
  ), U = {
    format: E,
    parse: N,
    resolve: Z,
    resolveObject: A,
    Url: z,
    URL: M,
    URLSearchParams: ee,
    domainToASCII: i,
    domainToUnicode: h,
    pathToFileURL: v,
    fileURLToPath: w
  };
  e.URL = M, e.URLSearchParams = ee, e.Url = z, e.default = U, e.domainToASCII = i, e.domainToUnicode = h, e.fileURLToPath = w, e.format = E, e.parse = N, e.pathToFileURL = v, e.resolve = Z, e.resolveObject = A, e = n.exports = U;
})(Ci, mr);
var W = {}, $n = mr, jt = W.ValidationError = function(e, r, a, o, u, l) {
  if (Array.isArray(o) ? (this.path = o, this.property = o.reduce(function(m, p) {
    return m + Pn(p);
  }, "instance")) : o !== void 0 && (this.property = o), e && (this.message = e), a) {
    var s = a.$id || a.id;
    this.schema = s || a;
  }
  r !== void 0 && (this.instance = r), this.name = u, this.argument = l, this.stack = this.toString();
};
jt.prototype.toString = function() {
  return this.property + " " + this.message;
};
var it = W.ValidatorResult = function(e, r, a, o) {
  this.instance = e, this.schema = r, this.options = a, this.path = o.path, this.propertyPath = o.propertyPath, this.errors = [], this.throwError = a && a.throwError, this.throwFirst = a && a.throwFirst, this.throwAll = a && a.throwAll, this.disableFormat = a && a.disableFormat === !0;
};
it.prototype.addError = function(e) {
  var r;
  if (typeof e == "string")
    r = new jt(e, this.instance, this.schema, this.path);
  else {
    if (!e)
      throw new Error("Missing error detail");
    if (!e.message)
      throw new Error("Missing error message");
    if (!e.name)
      throw new Error("Missing validator type");
    r = new jt(e.message, this.instance, this.schema, this.path, e.name, e.argument);
  }
  if (this.errors.push(r), this.throwFirst)
    throw new nr(this);
  if (this.throwError)
    throw r;
  return r;
};
it.prototype.importErrors = function(e) {
  typeof e == "string" || e && e.validatorType ? this.addError(e) : e && e.errors && Array.prototype.push.apply(this.errors, e.errors);
};
function Bi(n, e) {
  return e + ": " + n.toString() + `
`;
}
it.prototype.toString = function(e) {
  return this.errors.map(Bi).join("");
};
Object.defineProperty(it.prototype, "valid", { get: function() {
  return !this.errors.length;
} });
W.ValidatorResultError = nr;
function nr(n) {
  Error.captureStackTrace && Error.captureStackTrace(this, nr), this.instance = n.instance, this.schema = n.schema, this.options = n.options, this.errors = n.errors;
}
nr.prototype = new Error();
nr.prototype.constructor = nr;
nr.prototype.name = "Validation Error";
var sn = W.SchemaError = function n(e, r) {
  this.message = e, this.schema = r, Error.call(this, e), Error.captureStackTrace(this, n);
};
sn.prototype = Object.create(
  Error.prototype,
  {
    constructor: { value: sn, enumerable: !1 },
    name: { value: "SchemaError", enumerable: !1 }
  }
);
var Lt = W.SchemaContext = function(e, r, a, o, u) {
  this.schema = e, this.options = r, Array.isArray(a) ? (this.path = a, this.propertyPath = a.reduce(function(l, s) {
    return l + Pn(s);
  }, "instance")) : this.propertyPath = a, this.base = o, this.schemas = u;
};
Lt.prototype.resolve = function(e) {
  return $n.resolve(this.base, e);
};
Lt.prototype.makeChild = function(e, r) {
  var a = r === void 0 ? this.path : this.path.concat([r]), o = e.$id || e.id, u = $n.resolve(this.base, o || ""), l = new Lt(e, this.options, a, u, Object.create(this.schemas));
  return o && !l.schemas[u] && (l.schemas[u] = e), l;
};
var Oe = W.FORMAT_REGEXPS = {
  "date-time": /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
  date: /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
  time: /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,
  email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
  "ip-address": /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
  // TODO: A more accurate regular expression for "uri" goes:
  // [A-Za-z][+\-.0-9A-Za-z]*:((/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?)?#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])|/?%[0-9A-Fa-f]{2}|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*(#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?|/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)?)?
  uri: /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,
  "uri-reference": /^(((([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:?)?)|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?))#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(([A-Za-z][+\-.0-9A-Za-z]*)?%[0-9A-Fa-f]{2}|[!$&-.0-9;=@_~]|[A-Za-z][+\-.0-9A-Za-z]*[!$&-*,;=@_~])(%[0-9A-Fa-f]{2}|[!$&-.0-9;=@-Z_a-z~])*((([/?](%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?#|[/?])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?|([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)?|[A-Za-z][+\-.0-9A-Za-z]*:?)?$/,
  color: /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
  // hostname regex from: http://stackoverflow.com/a/1420225/5628
  hostname: /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
  "host-name": /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
  alpha: /^[a-zA-Z]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  "utc-millisec": function(n) {
    return typeof n == "string" && parseFloat(n) === parseInt(n, 10) && !isNaN(n);
  },
  regex: function(n) {
    var e = !0;
    try {
      new RegExp(n);
    } catch {
      e = !1;
    }
    return e;
  },
  style: /\s*(.+?):\s*([^;]+);?/,
  phone: /^\+(?:[0-9] ?){6,14}[0-9]$/
};
Oe.regexp = Oe.regex;
Oe.pattern = Oe.regex;
Oe.ipv4 = Oe["ip-address"];
W.isFormat = function(e, r, a) {
  if (typeof e == "string" && Oe[r] !== void 0) {
    if (Oe[r] instanceof RegExp)
      return Oe[r].test(e);
    if (typeof Oe[r] == "function")
      return Oe[r](e);
  } else if (a && a.customFormats && typeof a.customFormats[r] == "function")
    return a.customFormats[r](e);
  return !0;
};
var Pn = W.makeSuffix = function(e) {
  return e = e.toString(), !e.match(/[.\s\[\]]/) && !e.match(/^[\d]/) ? "." + e : e.match(/^\d+$/) ? "[" + e + "]" : "[" + JSON.stringify(e) + "]";
};
W.deepCompareStrict = function n(e, r) {
  if (typeof e != typeof r)
    return !1;
  if (Array.isArray(e))
    return !Array.isArray(r) || e.length !== r.length ? !1 : e.every(function(u, l) {
      return n(e[l], r[l]);
    });
  if (typeof e == "object") {
    if (!e || !r)
      return e === r;
    var a = Object.keys(e), o = Object.keys(r);
    return a.length !== o.length ? !1 : a.every(function(u) {
      return n(e[u], r[u]);
    });
  }
  return e === r;
};
function ji(n, e, r, a) {
  typeof r == "object" ? e[a] = Ht(n[a], r) : n.indexOf(r) === -1 && e.push(r);
}
function Li(n, e, r) {
  e[r] = n[r];
}
function _i(n, e, r, a) {
  typeof e[a] != "object" || !e[a] ? r[a] = e[a] : n[a] ? r[a] = Ht(n[a], e[a]) : r[a] = e[a];
}
function Ht(n, e) {
  var r = Array.isArray(e), a = r && [] || {};
  return r ? (n = n || [], a = a.concat(n), e.forEach(ji.bind(null, n, a))) : (n && typeof n == "object" && Object.keys(n).forEach(Li.bind(null, n, a)), Object.keys(e).forEach(_i.bind(null, n, e, a))), a;
}
W.deepMerge = Ht;
W.objectGetPath = function(e, r) {
  for (var a = r.split("/").slice(1), o; typeof (o = a.shift()) == "string"; ) {
    var u = decodeURIComponent(o.replace(/~0/, "~").replace(/~1/g, "/"));
    if (!(u in e))
      return;
    e = e[u];
  }
  return e;
};
function Ni(n) {
  return "/" + encodeURIComponent(n).replace(/~/g, "%7E");
}
W.encodePath = function(e) {
  return e.map(Ni).join("");
};
W.getDecimalPlaces = function(e) {
  var r = 0;
  if (isNaN(e))
    return r;
  typeof e != "number" && (e = Number(e));
  var a = e.toString().split("e");
  if (a.length === 2) {
    if (a[1][0] !== "-")
      return r;
    r = Number(a[1].slice(1));
  }
  var o = a[0].split(".");
  return o.length === 2 && (r += o[1].length), r;
};
W.isSchema = function(e) {
  return typeof e == "object" && e || typeof e == "boolean";
};
var Se = W, P = Se.ValidatorResult, Ge = Se.SchemaError, Jt = {};
Jt.ignoreProperties = {
  // informative properties
  id: !0,
  default: !0,
  description: !0,
  title: !0,
  // arguments to other properties
  additionalItems: !0,
  then: !0,
  else: !0,
  // special-handled properties
  $schema: !0,
  $ref: !0,
  extends: !0
};
var q = Jt.validators = {};
q.type = function(e, r, a, o) {
  if (e === void 0)
    return null;
  var u = new P(e, r, a, o), l = Array.isArray(r.type) ? r.type : [r.type];
  if (!l.some(this.testType.bind(this, e, r, a, o))) {
    var s = l.map(function(m) {
      if (m) {
        var p = m.$id || m.id;
        return p ? "<" + p + ">" : m + "";
      }
    });
    u.addError({
      name: "type",
      argument: s,
      message: "is not of a type(s) " + s
    });
  }
  return u;
};
function Xt(n, e, r, a, o) {
  var u = e.throwError, l = e.throwAll;
  e.throwError = !1, e.throwAll = !1;
  var s = this.validateSchema(n, o, e, r);
  return e.throwError = u, e.throwAll = l, !s.valid && a instanceof Function && a(s), s.valid;
}
q.anyOf = function(e, r, a, o) {
  if (e === void 0)
    return null;
  var u = new P(e, r, a, o), l = new P(e, r, a, o);
  if (!Array.isArray(r.anyOf))
    throw new Ge("anyOf must be an array");
  if (!r.anyOf.some(
    Xt.bind(
      this,
      e,
      a,
      o,
      function(m) {
        l.importErrors(m);
      }
    )
  )) {
    var s = r.anyOf.map(function(m, p) {
      var y = m.$id || m.id;
      return y ? "<" + y + ">" : m.title && JSON.stringify(m.title) || m.$ref && "<" + m.$ref + ">" || "[subschema " + p + "]";
    });
    a.nestedErrors && u.importErrors(l), u.addError({
      name: "anyOf",
      argument: s,
      message: "is not any of " + s.join(",")
    });
  }
  return u;
};
q.allOf = function(e, r, a, o) {
  if (e === void 0)
    return null;
  if (!Array.isArray(r.allOf))
    throw new Ge("allOf must be an array");
  var u = new P(e, r, a, o), l = this;
  return r.allOf.forEach(function(s, m) {
    var p = l.validateSchema(e, s, a, o);
    if (!p.valid) {
      var y = s.$id || s.id, g = y || s.title && JSON.stringify(s.title) || s.$ref && "<" + s.$ref + ">" || "[subschema " + m + "]";
      u.addError({
        name: "allOf",
        argument: { id: g, length: p.errors.length, valid: p },
        message: "does not match allOf schema " + g + " with " + p.errors.length + " error[s]:"
      }), u.importErrors(p);
    }
  }), u;
};
q.oneOf = function(e, r, a, o) {
  if (e === void 0)
    return null;
  if (!Array.isArray(r.oneOf))
    throw new Ge("oneOf must be an array");
  var u = new P(e, r, a, o), l = new P(e, r, a, o), s = r.oneOf.filter(
    Xt.bind(
      this,
      e,
      a,
      o,
      function(p) {
        l.importErrors(p);
      }
    )
  ).length, m = r.oneOf.map(function(p, y) {
    var g = p.$id || p.id;
    return g || p.title && JSON.stringify(p.title) || p.$ref && "<" + p.$ref + ">" || "[subschema " + y + "]";
  });
  return s !== 1 && (a.nestedErrors && u.importErrors(l), u.addError({
    name: "oneOf",
    argument: m,
    message: "is not exactly one from " + m.join(",")
  })), u;
};
q.if = function(e, r, a, o) {
  if (e === void 0)
    return null;
  if (!Se.isSchema(r.if))
    throw new Error('Expected "if" keyword to be a schema');
  var u = Xt.call(this, e, a, o, null, r.if), l = new P(e, r, a, o), s;
  if (u) {
    if (r.then === void 0)
      return;
    if (!Se.isSchema(r.then))
      throw new Error('Expected "then" keyword to be a schema');
    s = this.validateSchema(e, r.then, a, o.makeChild(r.then)), l.importErrors(s);
  } else {
    if (r.else === void 0)
      return;
    if (!Se.isSchema(r.else))
      throw new Error('Expected "else" keyword to be a schema');
    s = this.validateSchema(e, r.else, a, o.makeChild(r.else)), l.importErrors(s);
  }
  return l;
};
function Gt(n, e) {
  if (Object.hasOwnProperty.call(n, e))
    return n[e];
  if (e in n) {
    for (; n = Object.getPrototypeOf(n); )
      if (Object.propertyIsEnumerable.call(n, e))
        return n[e];
  }
}
q.propertyNames = function(e, r, a, o) {
  if (this.types.object(e)) {
    var u = new P(e, r, a, o), l = r.propertyNames !== void 0 ? r.propertyNames : {};
    if (!Se.isSchema(l))
      throw new Ge('Expected "propertyNames" to be a schema (object or boolean)');
    for (var s in e)
      if (Gt(e, s) !== void 0) {
        var m = this.validateSchema(s, l, a, o.makeChild(l));
        u.importErrors(m);
      }
    return u;
  }
};
q.properties = function(e, r, a, o) {
  if (this.types.object(e)) {
    var u = new P(e, r, a, o), l = r.properties || {};
    for (var s in l) {
      var m = l[s];
      if (m !== void 0) {
        if (m === null)
          throw new Ge('Unexpected null, expected schema in "properties"');
        typeof a.preValidateProperty == "function" && a.preValidateProperty(e, s, m, a, o);
        var p = Gt(e, s), y = this.validateSchema(p, m, a, o.makeChild(m, s));
        y.instance !== u.instance[s] && (u.instance[s] = y.instance), u.importErrors(y);
      }
    }
    return u;
  }
};
function qn(n, e, r, a, o, u) {
  if (this.types.object(n) && !(e.properties && e.properties[o] !== void 0))
    if (e.additionalProperties === !1)
      u.addError({
        name: "additionalProperties",
        argument: o,
        message: "is not allowed to have the additional property " + JSON.stringify(o)
      });
    else {
      var l = e.additionalProperties || {};
      typeof r.preValidateProperty == "function" && r.preValidateProperty(n, o, l, r, a);
      var s = this.validateSchema(n[o], l, r, a.makeChild(l, o));
      s.instance !== u.instance[o] && (u.instance[o] = s.instance), u.importErrors(s);
    }
}
q.patternProperties = function(e, r, a, o) {
  if (this.types.object(e)) {
    var u = new P(e, r, a, o), l = r.patternProperties || {};
    for (var s in e) {
      var m = !0;
      for (var p in l) {
        var y = l[p];
        if (y !== void 0) {
          if (y === null)
            throw new Ge('Unexpected null, expected schema in "patternProperties"');
          try {
            var g = new RegExp(p, "u");
          } catch {
            g = new RegExp(p);
          }
          if (g.test(s)) {
            m = !1, typeof a.preValidateProperty == "function" && a.preValidateProperty(e, s, y, a, o);
            var A = this.validateSchema(e[s], y, a, o.makeChild(y, s));
            A.instance !== u.instance[s] && (u.instance[s] = A.instance), u.importErrors(A);
          }
        }
      }
      m && qn.call(this, e, r, a, o, s, u);
    }
    return u;
  }
};
q.additionalProperties = function(e, r, a, o) {
  if (this.types.object(e)) {
    if (r.patternProperties)
      return null;
    var u = new P(e, r, a, o);
    for (var l in e)
      qn.call(this, e, r, a, o, l, u);
    return u;
  }
};
q.minProperties = function(e, r, a, o) {
  if (this.types.object(e)) {
    var u = new P(e, r, a, o), l = Object.keys(e);
    return l.length >= r.minProperties || u.addError({
      name: "minProperties",
      argument: r.minProperties,
      message: "does not meet minimum property length of " + r.minProperties
    }), u;
  }
};
q.maxProperties = function(e, r, a, o) {
  if (this.types.object(e)) {
    var u = new P(e, r, a, o), l = Object.keys(e);
    return l.length <= r.maxProperties || u.addError({
      name: "maxProperties",
      argument: r.maxProperties,
      message: "does not meet maximum property length of " + r.maxProperties
    }), u;
  }
};
q.items = function(e, r, a, o) {
  var u = this;
  if (this.types.array(e) && r.items) {
    var l = new P(e, r, a, o);
    return e.every(function(s, m) {
      var p = Array.isArray(r.items) ? r.items[m] || r.additionalItems : r.items;
      if (p === void 0)
        return !0;
      if (p === !1)
        return l.addError({
          name: "items",
          message: "additionalItems not permitted"
        }), !1;
      var y = u.validateSchema(s, p, a, o.makeChild(p, m));
      return y.instance !== l.instance[m] && (l.instance[m] = y.instance), l.importErrors(y), !0;
    }), l;
  }
};
q.minimum = function(e, r, a, o) {
  if (this.types.number(e)) {
    var u = new P(e, r, a, o);
    return r.exclusiveMinimum && r.exclusiveMinimum === !0 ? e > r.minimum || u.addError({
      name: "minimum",
      argument: r.minimum,
      message: "must be greater than " + r.minimum
    }) : e >= r.minimum || u.addError({
      name: "minimum",
      argument: r.minimum,
      message: "must be greater than or equal to " + r.minimum
    }), u;
  }
};
q.maximum = function(e, r, a, o) {
  if (this.types.number(e)) {
    var u = new P(e, r, a, o);
    return r.exclusiveMaximum && r.exclusiveMaximum === !0 ? e < r.maximum || u.addError({
      name: "maximum",
      argument: r.maximum,
      message: "must be less than " + r.maximum
    }) : e <= r.maximum || u.addError({
      name: "maximum",
      argument: r.maximum,
      message: "must be less than or equal to " + r.maximum
    }), u;
  }
};
q.exclusiveMinimum = function(e, r, a, o) {
  if (typeof r.exclusiveMaximum != "boolean" && this.types.number(e)) {
    var u = new P(e, r, a, o), l = e > r.exclusiveMinimum;
    return l || u.addError({
      name: "exclusiveMinimum",
      argument: r.exclusiveMinimum,
      message: "must be strictly greater than " + r.exclusiveMinimum
    }), u;
  }
};
q.exclusiveMaximum = function(e, r, a, o) {
  if (typeof r.exclusiveMaximum != "boolean" && this.types.number(e)) {
    var u = new P(e, r, a, o), l = e < r.exclusiveMaximum;
    return l || u.addError({
      name: "exclusiveMaximum",
      argument: r.exclusiveMaximum,
      message: "must be strictly less than " + r.exclusiveMaximum
    }), u;
  }
};
var Bn = function(e, r, a, o, u, l) {
  if (this.types.number(e)) {
    var s = r[u];
    if (s == 0)
      throw new Ge(u + " cannot be zero");
    var m = new P(e, r, a, o), p = Se.getDecimalPlaces(e), y = Se.getDecimalPlaces(s), g = Math.max(p, y), A = Math.pow(10, g);
    return Math.round(e * A) % Math.round(s * A) !== 0 && m.addError({
      name: u,
      argument: s,
      message: l + JSON.stringify(s)
    }), m;
  }
};
q.multipleOf = function(e, r, a, o) {
  return Bn.call(this, e, r, a, o, "multipleOf", "is not a multiple of (divisible by) ");
};
q.divisibleBy = function(e, r, a, o) {
  return Bn.call(this, e, r, a, o, "divisibleBy", "is not divisible by (multiple of) ");
};
q.required = function(e, r, a, o) {
  var u = new P(e, r, a, o);
  return e === void 0 && r.required === !0 ? u.addError({
    name: "required",
    message: "is required"
  }) : this.types.object(e) && Array.isArray(r.required) && r.required.forEach(function(l) {
    Gt(e, l) === void 0 && u.addError({
      name: "required",
      argument: l,
      message: "requires property " + JSON.stringify(l)
    });
  }), u;
};
q.pattern = function(e, r, a, o) {
  if (this.types.string(e)) {
    var u = new P(e, r, a, o), l = r.pattern;
    try {
      var s = new RegExp(l, "u");
    } catch {
      s = new RegExp(l);
    }
    return e.match(s) || u.addError({
      name: "pattern",
      argument: r.pattern,
      message: "does not match pattern " + JSON.stringify(r.pattern.toString())
    }), u;
  }
};
q.format = function(e, r, a, o) {
  if (e !== void 0) {
    var u = new P(e, r, a, o);
    return !u.disableFormat && !Se.isFormat(e, r.format, this) && u.addError({
      name: "format",
      argument: r.format,
      message: "does not conform to the " + JSON.stringify(r.format) + " format"
    }), u;
  }
};
q.minLength = function(e, r, a, o) {
  if (this.types.string(e)) {
    var u = new P(e, r, a, o), l = e.match(/[\uDC00-\uDFFF]/g), s = e.length - (l ? l.length : 0);
    return s >= r.minLength || u.addError({
      name: "minLength",
      argument: r.minLength,
      message: "does not meet minimum length of " + r.minLength
    }), u;
  }
};
q.maxLength = function(e, r, a, o) {
  if (this.types.string(e)) {
    var u = new P(e, r, a, o), l = e.match(/[\uDC00-\uDFFF]/g), s = e.length - (l ? l.length : 0);
    return s <= r.maxLength || u.addError({
      name: "maxLength",
      argument: r.maxLength,
      message: "does not meet maximum length of " + r.maxLength
    }), u;
  }
};
q.minItems = function(e, r, a, o) {
  if (this.types.array(e)) {
    var u = new P(e, r, a, o);
    return e.length >= r.minItems || u.addError({
      name: "minItems",
      argument: r.minItems,
      message: "does not meet minimum length of " + r.minItems
    }), u;
  }
};
q.maxItems = function(e, r, a, o) {
  if (this.types.array(e)) {
    var u = new P(e, r, a, o);
    return e.length <= r.maxItems || u.addError({
      name: "maxItems",
      argument: r.maxItems,
      message: "does not meet maximum length of " + r.maxItems
    }), u;
  }
};
function Di(n, e, r) {
  var a, o = r.length;
  for (a = e + 1, o; a < o; a++)
    if (Se.deepCompareStrict(n, r[a]))
      return !1;
  return !0;
}
q.uniqueItems = function(e, r, a, o) {
  if (r.uniqueItems === !0 && this.types.array(e)) {
    var u = new P(e, r, a, o);
    return e.every(Di) || u.addError({
      name: "uniqueItems",
      message: "contains duplicate item"
    }), u;
  }
};
q.dependencies = function(e, r, a, o) {
  if (this.types.object(e)) {
    var u = new P(e, r, a, o);
    for (var l in r.dependencies)
      if (e[l] !== void 0) {
        var s = r.dependencies[l], m = o.makeChild(s, l);
        if (typeof s == "string" && (s = [s]), Array.isArray(s))
          s.forEach(function(y) {
            e[y] === void 0 && u.addError({
              // FIXME there's two different "dependencies" errors here with slightly different outputs
              // Can we make these the same? Or should we create different error types?
              name: "dependencies",
              argument: m.propertyPath,
              message: "property " + y + " not found, required by " + m.propertyPath
            });
          });
        else {
          var p = this.validateSchema(e, s, a, m);
          u.instance !== p.instance && (u.instance = p.instance), p && p.errors.length && (u.addError({
            name: "dependencies",
            argument: m.propertyPath,
            message: "does not meet dependency required by " + m.propertyPath
          }), u.importErrors(p));
        }
      }
    return u;
  }
};
q.enum = function(e, r, a, o) {
  if (e === void 0)
    return null;
  if (!Array.isArray(r.enum))
    throw new Ge("enum expects an array", r);
  var u = new P(e, r, a, o);
  return r.enum.some(Se.deepCompareStrict.bind(null, e)) || u.addError({
    name: "enum",
    argument: r.enum,
    message: "is not one of enum values: " + r.enum.map(String).join(",")
  }), u;
};
q.const = function(e, r, a, o) {
  if (e === void 0)
    return null;
  var u = new P(e, r, a, o);
  return Se.deepCompareStrict(r.const, e) || u.addError({
    name: "const",
    argument: r.const,
    message: "does not exactly match expected constant: " + r.const
  }), u;
};
q.not = q.disallow = function(e, r, a, o) {
  var u = this;
  if (e === void 0)
    return null;
  var l = new P(e, r, a, o), s = r.not || r.disallow;
  return s ? (Array.isArray(s) || (s = [s]), s.forEach(function(m) {
    if (u.testType(e, r, a, o, m)) {
      var p = m && (m.$id || m.id), y = p || m;
      l.addError({
        name: "not",
        argument: y,
        message: "is of prohibited type " + y
      });
    }
  }), l) : null;
};
var Mi = Jt, Kt = {}, un = mr, ki = W;
Kt.SchemaScanResult = jn;
function jn(n, e) {
  this.id = n, this.ref = e;
}
Kt.scan = function(e, r) {
  function a(m, p) {
    if (!(!p || typeof p != "object")) {
      if (p.$ref) {
        var y = un.resolve(m, p.$ref);
        s[y] = s[y] ? s[y] + 1 : 0;
        return;
      }
      var g = p.$id || p.id, A = g ? un.resolve(m, g) : m;
      if (A) {
        if (A.indexOf("#") < 0 && (A += "#"), l[A]) {
          if (!ki.deepCompareStrict(l[A], p))
            throw new Error("Schema <" + A + "> already exists with different definition");
          return l[A];
        }
        l[A] = p, A[A.length - 1] == "#" && (l[A.substring(0, A.length - 1)] = p);
      }
      o(A + "/items", Array.isArray(p.items) ? p.items : [p.items]), o(A + "/extends", Array.isArray(p.extends) ? p.extends : [p.extends]), a(A + "/additionalItems", p.additionalItems), u(A + "/properties", p.properties), a(A + "/additionalProperties", p.additionalProperties), u(A + "/definitions", p.definitions), u(A + "/patternProperties", p.patternProperties), u(A + "/dependencies", p.dependencies), o(A + "/disallow", p.disallow), o(A + "/allOf", p.allOf), o(A + "/anyOf", p.anyOf), o(A + "/oneOf", p.oneOf), a(A + "/not", p.not);
    }
  }
  function o(m, p) {
    if (Array.isArray(p))
      for (var y = 0; y < p.length; y++)
        a(m + "/" + y, p[y]);
  }
  function u(m, p) {
    if (!(!p || typeof p != "object"))
      for (var y in p)
        a(m + "/" + y, p[y]);
  }
  var l = {}, s = {};
  return a(e, r), new jn(l, s);
};
var Ln = mr, _n = Mi, ir = W, Nn = Kt.scan, Dn = ir.ValidatorResult, zi = ir.ValidatorResultError, Sr = ir.SchemaError, Mn = ir.SchemaContext, kn = "/", re = function n() {
  this.customFormats = Object.create(n.prototype.customFormats), this.schemas = {}, this.unresolvedRefs = [], this.types = Object.create(Me), this.attributes = Object.create(_n.validators);
};
re.prototype.customFormats = {};
re.prototype.schemas = null;
re.prototype.types = null;
re.prototype.attributes = null;
re.prototype.unresolvedRefs = null;
re.prototype.addSchema = function(e, r) {
  var a = this;
  if (!e)
    return null;
  var o = Nn(r || kn, e), u = r || e.$id || e.id;
  for (var l in o.id)
    this.schemas[l] = o.id[l];
  for (var l in o.ref)
    this.unresolvedRefs.push(l);
  return this.unresolvedRefs = this.unresolvedRefs.filter(function(s) {
    return typeof a.schemas[s] > "u";
  }), this.schemas[u];
};
re.prototype.addSubSchemaArray = function(e, r) {
  if (Array.isArray(r))
    for (var a = 0; a < r.length; a++)
      this.addSubSchema(e, r[a]);
};
re.prototype.addSubSchemaObject = function(e, r) {
  if (!(!r || typeof r != "object"))
    for (var a in r)
      this.addSubSchema(e, r[a]);
};
re.prototype.setSchemas = function(e) {
  this.schemas = e;
};
re.prototype.getSchema = function(e) {
  return this.schemas[e];
};
re.prototype.validate = function(e, r, a, o) {
  if (typeof r != "boolean" && typeof r != "object" || r === null)
    throw new Sr("Expected `schema` to be an object or boolean");
  a || (a = {});
  var u = r.$id || r.id, l = Ln.resolve(a.base || kn, u || "");
  if (!o) {
    o = new Mn(r, a, [], l, Object.create(this.schemas)), o.schemas[l] || (o.schemas[l] = r);
    var s = Nn(l, r);
    for (var m in s.id) {
      var p = s.id[m];
      o.schemas[m] = p;
    }
  }
  if (a.required && e === void 0) {
    var y = new Dn(e, r, a, o);
    return y.addError("is required, but is undefined"), y;
  }
  var y = this.validateSchema(e, r, a, o);
  if (y) {
    if (a.throwAll && y.errors.length)
      throw new zi(y);
  } else
    throw new Error("Result undefined");
  return y;
};
function zn(n) {
  var e = typeof n == "string" ? n : n.$ref;
  return typeof e == "string" ? e : !1;
}
re.prototype.validateSchema = function(e, r, a, o) {
  var u = new Dn(e, r, a, o);
  if (typeof r == "boolean")
    r === !0 ? r = {} : r === !1 && (r = { type: [] });
  else if (!r)
    throw new Error("schema is undefined");
  if (r.extends)
    if (Array.isArray(r.extends)) {
      var l = { schema: r, ctx: o };
      r.extends.forEach(this.schemaTraverser.bind(this, l)), r = l.schema, l.schema = null, l.ctx = null, l = null;
    } else
      r = ir.deepMerge(r, this.superResolve(r.extends, o));
  var s = zn(r);
  if (s) {
    var m = this.resolve(r, s, o), p = new Mn(m.subschema, a, o.path, m.switchSchema, o.schemas);
    return this.validateSchema(e, m.subschema, a, p);
  }
  var y = a && a.skipAttributes || [];
  for (var g in r)
    if (!_n.ignoreProperties[g] && y.indexOf(g) < 0) {
      var A = null, O = this.attributes[g];
      if (O)
        A = O.call(this, e, r, a, o);
      else if (a.allowUnknownAttributes === !1)
        throw new Sr("Unsupported attribute: " + g, r);
      A && u.importErrors(A);
    }
  if (typeof a.rewrite == "function") {
    var L = a.rewrite.call(this, e, r, a, o);
    u.instance = L;
  }
  return u;
};
re.prototype.schemaTraverser = function(e, r) {
  e.schema = ir.deepMerge(e.schema, this.superResolve(r, e.ctx));
};
re.prototype.superResolve = function(e, r) {
  var a = zn(e);
  return a ? this.resolve(e, a, r).subschema : e;
};
re.prototype.resolve = function(e, r, a) {
  if (r = a.resolve(r), a.schemas[r])
    return { subschema: a.schemas[r], switchSchema: r };
  var o = Ln.parse(r), u = o && o.hash, l = u && u.length && r.substr(0, r.length - u.length);
  if (!l || !a.schemas[l])
    throw new Sr("no such schema <" + r + ">", e);
  var s = ir.objectGetPath(a.schemas[l], u.substr(1));
  if (s === void 0)
    throw new Sr("no such schema " + u + " located in <" + l + ">", e);
  return { subschema: s, switchSchema: r };
};
re.prototype.testType = function(e, r, a, o, u) {
  if (u !== void 0) {
    if (u === null)
      throw new Sr('Unexpected null in "type" keyword');
    if (typeof this.types[u] == "function")
      return this.types[u].call(this, e);
    if (u && typeof u == "object") {
      var l = this.validateSchema(e, u, a, o);
      return l === void 0 || !(l && l.errors.length);
    }
    return !0;
  }
};
var Me = re.prototype.types = {};
Me.string = function(e) {
  return typeof e == "string";
};
Me.number = function(e) {
  return typeof e == "number" && isFinite(e);
};
Me.integer = function(e) {
  return typeof e == "number" && e % 1 === 0;
};
Me.boolean = function(e) {
  return typeof e == "boolean";
};
Me.array = function(e) {
  return Array.isArray(e);
};
Me.null = function(e) {
  return e === null;
};
Me.date = function(e) {
  return e instanceof Date;
};
Me.any = function(e) {
  return !0;
};
Me.object = function(e) {
  return e && typeof e == "object" && !Array.isArray(e) && !(e instanceof Date);
};
var Zi = re, Zn;
Zn = Zi;
W.ValidatorResult;
W.ValidatorResultError;
W.ValidationError;
W.SchemaError;
const te = new Zn(), Vi = {
  id: "/Evidence",
  type: "object",
  properties: {
    name: { type: "string" },
    value: { type: "string" }
  },
  required: ["name", "value"]
};
te.addSchema(Vi, "/Evidence");
const Wi = {
  id: "/Evidences",
  type: "array",
  items: { $ref: "/Evidence" },
  minItems: 1
};
te.addSchema(Wi, "/Evidences");
const Hi = {
  id: "/ExtendedEvidences",
  oneOf: [
    { $ref: "/Evidences" },
    {
      type: "object",
      patternProperties: {
        ".+": { type: "String" }
      },
      minProperties: 1
    }
  ]
};
te.addSchema(Hi, "/ExtendedEvidences");
const Ji = {
  id: "/Instance",
  type: "object",
  properties: {
    className: { type: "string" },
    propertyName: { type: "string" },
    value: { type: "any" },
    dependencyContext: {
      type: "object",
      properties: {
        evidences: { $ref: "/Evidences" }
      }
    }
  },
  required: ["className", "propertyName", "value"]
};
te.addSchema(Ji, "/Instance");
const Xi = {
  id: "/InputInstances",
  type: "array",
  items: {
    type: "object",
    properties: {
      className: { type: "string" },
      propertyName: { type: "string" },
      value: { type: "any" }
    },
    required: ["className", "propertyName"],
    minItems: 1
  }
};
te.addSchema(Xi, "/InputInstances");
const Gi = {
  id: "/Instances",
  type: "array",
  items: { $ref: "/Instance" },
  minItems: 1
};
te.addSchema(Gi, "/Instances");
const Ki = {
  id: "/Context",
  type: "object",
  properties: {
    guid: { type: "string" },
    evidences: { $ref: "/Evidences" }
  },
  required: ["guid", "evidences"]
};
te.addSchema(Ki, "/Context");
const Yi = {
  id: "/InputContext",
  type: "object",
  properties: {
    evidences: { $ref: "/ExtendedEvidences" }
  },
  required: ["evidences"]
};
te.addSchema(Yi, "/InputContext");
const Qi = {
  id: "/RightsContexts",
  type: "Array",
  items: { $ref: "/Context" },
  minItems: 1
};
te.addSchema(Qi, "/RightsContexts");
const ea = {
  id: "/ProcessingContexts",
  type: "Array",
  items: { $ref: "/Context" },
  minItems: 0
};
te.addSchema(ea, "/ProcessingContexts");
const ra = {
  id: "/Requests",
  type: "Array",
  items: {
    type: "object",
    properties: {
      guid: { type: "string" },
      rightsContext: { type: "string" },
      processingContext: { type: "string" },
      instances: { $ref: "/Instances" }
    },
    required: ["guid", "rightsContext", "instances"]
  },
  minItems: 1
};
te.addSchema(ra, "/Requests");
const ta = {
  id: "RequestData",
  type: "object",
  properties: {
    processingContexts: { $ref: "/ProcessingContexts" },
    rightsContexts: { $ref: "/RightsContexts" },
    requests: { $ref: "/Requests" }
  },
  required: ["rightsContexts", "requests"]
};
te.addSchema(ta, "/RequestData");
const na = {
  id: "RequestInputData",
  type: "object",
  properties: {
    processingContext: { $ref: "/InputContext" },
    rightsContext: { $ref: "/InputContext" },
    instances: { $ref: "InputInstances" }
  },
  required: ["rightsContext", "instances"]
};
te.addSchema(na, "/RequestInputData");
class Ue {
  constructor(e) {
    this.rules = e, this.errors = [];
  }
  validate() {
    return this.errors = this.rules.filter(({ rule: e }) => !e).map(({ message: e }) => e), this.errors.length === 0;
  }
  validateWithThrowError() {
    const e = this.validate(), r = this.errors.join(`\r
`);
    if (e)
      return e;
    throw new Error(r);
  }
}
class Vn {
  /**
   * Evidence class
   *
   * @param {object} evidence - {name: 'name', value: 'value}
   * @param {string} evidence.name - evidence name
   * @param {string} evidence.value - evidence value
   */
  constructor({ name: e, value: r }) {
    Vn.validateEvidence({ name: e, value: r }), this.name = e, this.value = r;
  }
  static validateEvidence(e, r = !0) {
    const a = te.validate(e, { $ref: "/Evidence" }), o = new Ue([
      {
        rule: a.valid,
        message: 'Invalid "evidence" format/structure'
      }
    ]);
    return r ? o.validateWithThrowError() : o.validate();
  }
}
const tr = (n) => n != null && typeof n == "object", Yt = (n, e) => {
  const r = Object.keys(n), a = Object.keys(e);
  if (r.length !== a.length)
    return !1;
  for (const o of r) {
    const u = n[o], l = e[o], s = tr(u) && tr(l);
    if (s && !Yt(u, l) || !s && u !== l)
      return !1;
  }
  return !0;
}, Wn = (n, e, r) => n.reduce((a, o) => ({ ...a, [o[e]]: o[r] }), {}), _t = (n = {}, e = "name", r = "value") => Object.entries(n).reduce((a, [o, u]) => [...a, { [e]: o, [r]: u }], []), co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deepEqual: Yt,
  isObject: tr,
  makeArrayFromDictionary: _t,
  makeDictionary: Wn
}, Symbol.toStringTag, { value: "Module" }));
class Qt {
  /**
   * RPSValue class
   *
   * @param {string} className - required
   * @param {string} propertyName - required
   * @param {*} value - required, can be empty, but undefined is not valid
   * @param {object} dependencies - not required, e.g. {name: 'value', name2: 'value2'}
   *
   */
  constructor({ className: e, propertyName: r, value: a, dependencies: o = null } = {}) {
    Qt.validateValue({ className: e, propertyName: r, value: a }), this.className = e, this.propertyName = r, this.value = a, this.dependencies = tr(o) ? o : null, this.error = null, this.transformed = null;
  }
  get original() {
    return this.value;
  }
  setError(e) {
    this.error = e;
  }
  setTransformedValue(e) {
    this.transformed = e;
  }
  static validateValue(e, r = !0) {
    const { className: a, propertyName: o, value: u } = e, l = te.validate(e, { $ref: "/Instance" }), s = new Ue([
      {
        rule: !!a,
        message: 'Required property "className" is missing or empty'
      },
      {
        rule: !!o,
        message: 'Required property "propertyName" is missing or empty'
      },
      {
        rule: typeof u < "u",
        message: 'Required property "value" is undefined'
      },
      {
        rule: l.valid,
        message: 'Invalid "requestData" format/structure'
      }
    ]);
    return r ? s.validateWithThrowError() : s.validate();
  }
}
class Hn {
  /**
   * Context class with evidences as dictionary or list
   *
   * @param {object|object[]} evidences - Array of evidences like [{name: 'name', value: 'value}] or dictionary like {name: value}
   */
  constructor(e) {
    Hn.validateEvidences(e), this.evidences = e;
  }
  static validateEvidences(e, r = !0) {
    const a = te.validate(e, { $ref: "/ExtendedEvidences" }), o = new Ue([
      {
        rule: !!e,
        message: 'Required parameter "evidences" is missing'
      },
      {
        rule: a.valid,
        message: 'Invalid "evidences" format/structure'
      }
    ]);
    return r ? o.validateWithThrowError() : o.validate();
  }
}
var Nt = {}, ia = {
  get exports() {
    return Nt;
  },
  set exports(n) {
    Nt = n;
  }
}, Dr = {}, aa = {
  get exports() {
    return Dr;
  },
  set exports(n) {
    Dr = n;
  }
}, Jn = function(e, r) {
  return function() {
    for (var o = new Array(arguments.length), u = 0; u < o.length; u++)
      o[u] = arguments[u];
    return e.apply(r, o);
  };
}, oa = Jn, ar = Object.prototype.toString;
function en(n) {
  return ar.call(n) === "[object Array]";
}
function Dt(n) {
  return typeof n > "u";
}
function sa(n) {
  return n !== null && !Dt(n) && n.constructor !== null && !Dt(n.constructor) && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
}
function ua(n) {
  return ar.call(n) === "[object ArrayBuffer]";
}
function fa(n) {
  return typeof FormData < "u" && n instanceof FormData;
}
function la(n) {
  var e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(n) : e = n && n.buffer && n.buffer instanceof ArrayBuffer, e;
}
function ha(n) {
  return typeof n == "string";
}
function ca(n) {
  return typeof n == "number";
}
function Xn(n) {
  return n !== null && typeof n == "object";
}
function Br(n) {
  if (ar.call(n) !== "[object Object]")
    return !1;
  var e = Object.getPrototypeOf(n);
  return e === null || e === Object.prototype;
}
function da(n) {
  return ar.call(n) === "[object Date]";
}
function pa(n) {
  return ar.call(n) === "[object File]";
}
function ma(n) {
  return ar.call(n) === "[object Blob]";
}
function Gn(n) {
  return ar.call(n) === "[object Function]";
}
function va(n) {
  return Xn(n) && Gn(n.pipe);
}
function ya(n) {
  return typeof URLSearchParams < "u" && n instanceof URLSearchParams;
}
function ga(n) {
  return n.trim ? n.trim() : n.replace(/^\s+|\s+$/g, "");
}
function wa() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function rn(n, e) {
  if (!(n === null || typeof n > "u"))
    if (typeof n != "object" && (n = [n]), en(n))
      for (var r = 0, a = n.length; r < a; r++)
        e.call(null, n[r], r, n);
    else
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && e.call(null, n[o], o, n);
}
function Mt() {
  var n = {};
  function e(o, u) {
    Br(n[u]) && Br(o) ? n[u] = Mt(n[u], o) : Br(o) ? n[u] = Mt({}, o) : en(o) ? n[u] = o.slice() : n[u] = o;
  }
  for (var r = 0, a = arguments.length; r < a; r++)
    rn(arguments[r], e);
  return n;
}
function xa(n, e, r) {
  return rn(e, function(o, u) {
    r && typeof o == "function" ? n[u] = oa(o, r) : n[u] = o;
  }), n;
}
function Ea(n) {
  return n.charCodeAt(0) === 65279 && (n = n.slice(1)), n;
}
var we = {
  isArray: en,
  isArrayBuffer: ua,
  isBuffer: sa,
  isFormData: fa,
  isArrayBufferView: la,
  isString: ha,
  isNumber: ca,
  isObject: Xn,
  isPlainObject: Br,
  isUndefined: Dt,
  isDate: da,
  isFile: pa,
  isBlob: ma,
  isFunction: Gn,
  isStream: va,
  isURLSearchParams: ya,
  isStandardBrowserEnv: wa,
  forEach: rn,
  merge: Mt,
  extend: xa,
  trim: ga,
  stripBOM: Ea
}, fr = we;
function fn(n) {
  return encodeURIComponent(n).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var Kn = function(e, r, a) {
  if (!r)
    return e;
  var o;
  if (a)
    o = a(r);
  else if (fr.isURLSearchParams(r))
    o = r.toString();
  else {
    var u = [];
    fr.forEach(r, function(m, p) {
      m === null || typeof m > "u" || (fr.isArray(m) ? p = p + "[]" : m = [m], fr.forEach(m, function(g) {
        fr.isDate(g) ? g = g.toISOString() : fr.isObject(g) && (g = JSON.stringify(g)), u.push(fn(p) + "=" + fn(g));
      }));
    }), o = u.join("&");
  }
  if (o) {
    var l = e.indexOf("#");
    l !== -1 && (e = e.slice(0, l)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}, Aa = we;
function at() {
  this.handlers = [];
}
at.prototype.use = function(e, r, a) {
  return this.handlers.push({
    fulfilled: e,
    rejected: r,
    synchronous: a ? a.synchronous : !1,
    runWhen: a ? a.runWhen : null
  }), this.handlers.length - 1;
};
at.prototype.eject = function(e) {
  this.handlers[e] && (this.handlers[e] = null);
};
at.prototype.forEach = function(e) {
  Aa.forEach(this.handlers, function(a) {
    a !== null && e(a);
  });
};
var ba = at, Sa = {}, ot = {};
ot.byteLength = Ia;
ot.toByteArray = Ra;
ot.fromByteArray = $a;
var De = [], be = [], Fa = typeof Uint8Array < "u" ? Uint8Array : Array, vt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var lr = 0, Ca = vt.length; lr < Ca; ++lr)
  De[lr] = vt[lr], be[vt.charCodeAt(lr)] = lr;
be["-".charCodeAt(0)] = 62;
be["_".charCodeAt(0)] = 63;
function Yn(n) {
  var e = n.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = n.indexOf("=");
  r === -1 && (r = e);
  var a = r === e ? 0 : 4 - r % 4;
  return [r, a];
}
function Ia(n) {
  var e = Yn(n), r = e[0], a = e[1];
  return (r + a) * 3 / 4 - a;
}
function Ta(n, e, r) {
  return (e + r) * 3 / 4 - r;
}
function Ra(n) {
  var e, r = Yn(n), a = r[0], o = r[1], u = new Fa(Ta(n, a, o)), l = 0, s = o > 0 ? a - 4 : a, m;
  for (m = 0; m < s; m += 4)
    e = be[n.charCodeAt(m)] << 18 | be[n.charCodeAt(m + 1)] << 12 | be[n.charCodeAt(m + 2)] << 6 | be[n.charCodeAt(m + 3)], u[l++] = e >> 16 & 255, u[l++] = e >> 8 & 255, u[l++] = e & 255;
  return o === 2 && (e = be[n.charCodeAt(m)] << 2 | be[n.charCodeAt(m + 1)] >> 4, u[l++] = e & 255), o === 1 && (e = be[n.charCodeAt(m)] << 10 | be[n.charCodeAt(m + 1)] << 4 | be[n.charCodeAt(m + 2)] >> 2, u[l++] = e >> 8 & 255, u[l++] = e & 255), u;
}
function Oa(n) {
  return De[n >> 18 & 63] + De[n >> 12 & 63] + De[n >> 6 & 63] + De[n & 63];
}
function Ua(n, e, r) {
  for (var a, o = [], u = e; u < r; u += 3)
    a = (n[u] << 16 & 16711680) + (n[u + 1] << 8 & 65280) + (n[u + 2] & 255), o.push(Oa(a));
  return o.join("");
}
function $a(n) {
  for (var e, r = n.length, a = r % 3, o = [], u = 16383, l = 0, s = r - a; l < s; l += u)
    o.push(Ua(n, l, l + u > s ? s : l + u));
  return a === 1 ? (e = n[r - 1], o.push(
    De[e >> 2] + De[e << 4 & 63] + "=="
  )) : a === 2 && (e = (n[r - 2] << 8) + n[r - 1], o.push(
    De[e >> 10] + De[e >> 4 & 63] + De[e << 2 & 63] + "="
  )), o.join("");
}
var tn = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
tn.read = function(n, e, r, a, o) {
  var u, l, s = o * 8 - a - 1, m = (1 << s) - 1, p = m >> 1, y = -7, g = r ? o - 1 : 0, A = r ? -1 : 1, O = n[e + g];
  for (g += A, u = O & (1 << -y) - 1, O >>= -y, y += s; y > 0; u = u * 256 + n[e + g], g += A, y -= 8)
    ;
  for (l = u & (1 << -y) - 1, u >>= -y, y += a; y > 0; l = l * 256 + n[e + g], g += A, y -= 8)
    ;
  if (u === 0)
    u = 1 - p;
  else {
    if (u === m)
      return l ? NaN : (O ? -1 : 1) * (1 / 0);
    l = l + Math.pow(2, a), u = u - p;
  }
  return (O ? -1 : 1) * l * Math.pow(2, u - a);
};
tn.write = function(n, e, r, a, o, u) {
  var l, s, m, p = u * 8 - o - 1, y = (1 << p) - 1, g = y >> 1, A = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, O = a ? 0 : u - 1, L = a ? 1 : -1, _ = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, l = y) : (l = Math.floor(Math.log(e) / Math.LN2), e * (m = Math.pow(2, -l)) < 1 && (l--, m *= 2), l + g >= 1 ? e += A / m : e += A * Math.pow(2, 1 - g), e * m >= 2 && (l++, m /= 2), l + g >= y ? (s = 0, l = y) : l + g >= 1 ? (s = (e * m - 1) * Math.pow(2, o), l = l + g) : (s = e * Math.pow(2, g - 1) * Math.pow(2, o), l = 0)); o >= 8; n[r + O] = s & 255, O += L, s /= 256, o -= 8)
    ;
  for (l = l << o | s, p += o; p > 0; n[r + O] = l & 255, O += L, l /= 256, p -= 8)
    ;
  n[r + O - L] |= _ * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(n) {
  var e = ot, r = tn, a = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  n.Buffer = s, n.SlowBuffer = xe, n.INSPECT_MAX_BYTES = 50;
  var o = 2147483647;
  n.kMaxLength = o, s.TYPED_ARRAY_SUPPORT = u(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function u() {
    try {
      var f = new Uint8Array(1), t = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(f, t), f.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(s.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(s.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.byteOffset;
    }
  });
  function l(f) {
    if (f > o)
      throw new RangeError('The value "' + f + '" is invalid for option "size"');
    var t = new Uint8Array(f);
    return Object.setPrototypeOf(t, s.prototype), t;
  }
  function s(f, t, i) {
    if (typeof f == "number") {
      if (typeof t == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return g(f);
    }
    return m(f, t, i);
  }
  s.poolSize = 8192;
  function m(f, t, i) {
    if (typeof f == "string")
      return A(f, t);
    if (ArrayBuffer.isView(f))
      return L(f);
    if (f == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof f
      );
    if (k(f, ArrayBuffer) || f && k(f.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (k(f, SharedArrayBuffer) || f && k(f.buffer, SharedArrayBuffer)))
      return _(f, t, i);
    if (typeof f == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var h = f.valueOf && f.valueOf();
    if (h != null && h !== f)
      return s.from(h, t, i);
    var v = Fe(f);
    if (v)
      return v;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof f[Symbol.toPrimitive] == "function")
      return s.from(
        f[Symbol.toPrimitive]("string"),
        t,
        i
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof f
    );
  }
  s.from = function(f, t, i) {
    return m(f, t, i);
  }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
  function p(f) {
    if (typeof f != "number")
      throw new TypeError('"size" argument must be of type number');
    if (f < 0)
      throw new RangeError('The value "' + f + '" is invalid for option "size"');
  }
  function y(f, t, i) {
    return p(f), f <= 0 ? l(f) : t !== void 0 ? typeof i == "string" ? l(f).fill(t, i) : l(f).fill(t) : l(f);
  }
  s.alloc = function(f, t, i) {
    return y(f, t, i);
  };
  function g(f) {
    return p(f), l(f < 0 ? 0 : ce(f) | 0);
  }
  s.allocUnsafe = function(f) {
    return g(f);
  }, s.allocUnsafeSlow = function(f) {
    return g(f);
  };
  function A(f, t) {
    if ((typeof t != "string" || t === "") && (t = "utf8"), !s.isEncoding(t))
      throw new TypeError("Unknown encoding: " + t);
    var i = ze(f, t) | 0, h = l(i), v = h.write(f, t);
    return v !== i && (h = h.slice(0, v)), h;
  }
  function O(f) {
    for (var t = f.length < 0 ? 0 : ce(f.length) | 0, i = l(t), h = 0; h < t; h += 1)
      i[h] = f[h] & 255;
    return i;
  }
  function L(f) {
    if (k(f, Uint8Array)) {
      var t = new Uint8Array(f);
      return _(t.buffer, t.byteOffset, t.byteLength);
    }
    return O(f);
  }
  function _(f, t, i) {
    if (t < 0 || f.byteLength < t)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (f.byteLength < t + (i || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var h;
    return t === void 0 && i === void 0 ? h = new Uint8Array(f) : i === void 0 ? h = new Uint8Array(f, t) : h = new Uint8Array(f, t, i), Object.setPrototypeOf(h, s.prototype), h;
  }
  function Fe(f) {
    if (s.isBuffer(f)) {
      var t = ce(f.length) | 0, i = l(t);
      return i.length === 0 || f.copy(i, 0, 0, t), i;
    }
    if (f.length !== void 0)
      return typeof f.length != "number" || le(f.length) ? l(0) : O(f);
    if (f.type === "Buffer" && Array.isArray(f.data))
      return O(f.data);
  }
  function ce(f) {
    if (f >= o)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
    return f | 0;
  }
  function xe(f) {
    return +f != f && (f = 0), s.alloc(+f);
  }
  s.isBuffer = function(t) {
    return t != null && t._isBuffer === !0 && t !== s.prototype;
  }, s.compare = function(t, i) {
    if (k(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), k(i, Uint8Array) && (i = s.from(i, i.offset, i.byteLength)), !s.isBuffer(t) || !s.isBuffer(i))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (t === i)
      return 0;
    for (var h = t.length, v = i.length, w = 0, E = Math.min(h, v); w < E; ++w)
      if (t[w] !== i[w]) {
        h = t[w], v = i[w];
        break;
      }
    return h < v ? -1 : v < h ? 1 : 0;
  }, s.isEncoding = function(t) {
    switch (String(t).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, s.concat = function(t, i) {
    if (!Array.isArray(t))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (t.length === 0)
      return s.alloc(0);
    var h;
    if (i === void 0)
      for (i = 0, h = 0; h < t.length; ++h)
        i += t[h].length;
    var v = s.allocUnsafe(i), w = 0;
    for (h = 0; h < t.length; ++h) {
      var E = t[h];
      if (k(E, Uint8Array))
        w + E.length > v.length ? s.from(E).copy(v, w) : Uint8Array.prototype.set.call(
          v,
          E,
          w
        );
      else if (s.isBuffer(E))
        E.copy(v, w);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      w += E.length;
    }
    return v;
  };
  function ze(f, t) {
    if (s.isBuffer(f))
      return f.length;
    if (ArrayBuffer.isView(f) || k(f, ArrayBuffer))
      return f.byteLength;
    if (typeof f != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof f
      );
    var i = f.length, h = arguments.length > 2 && arguments[2] === !0;
    if (!h && i === 0)
      return 0;
    for (var v = !1; ; )
      switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return i;
        case "utf8":
        case "utf-8":
          return ee(f).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return i * 2;
        case "hex":
          return i >>> 1;
        case "base64":
          return V(f).length;
        default:
          if (v)
            return h ? -1 : ee(f).length;
          t = ("" + t).toLowerCase(), v = !0;
      }
  }
  s.byteLength = ze;
  function T(f, t, i) {
    var h = !1;
    if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((i === void 0 || i > this.length) && (i = this.length), i <= 0) || (i >>>= 0, t >>>= 0, i <= t))
      return "";
    for (f || (f = "utf8"); ; )
      switch (f) {
        case "hex":
          return yr(this, t, i);
        case "utf8":
        case "utf-8":
          return ve(this, t, i);
        case "ascii":
          return sr(this, t, i);
        case "latin1":
        case "binary":
          return vr(this, t, i);
        case "base64":
          return Ee(this, t, i);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return F(this, t, i);
        default:
          if (h)
            throw new TypeError("Unknown encoding: " + f);
          f = (f + "").toLowerCase(), h = !0;
      }
  }
  s.prototype._isBuffer = !0;
  function D(f, t, i) {
    var h = f[t];
    f[t] = f[i], f[i] = h;
  }
  s.prototype.swap16 = function() {
    var t = this.length;
    if (t % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var i = 0; i < t; i += 2)
      D(this, i, i + 1);
    return this;
  }, s.prototype.swap32 = function() {
    var t = this.length;
    if (t % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var i = 0; i < t; i += 4)
      D(this, i, i + 3), D(this, i + 1, i + 2);
    return this;
  }, s.prototype.swap64 = function() {
    var t = this.length;
    if (t % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var i = 0; i < t; i += 8)
      D(this, i, i + 7), D(this, i + 1, i + 6), D(this, i + 2, i + 5), D(this, i + 3, i + 4);
    return this;
  }, s.prototype.toString = function() {
    var t = this.length;
    return t === 0 ? "" : arguments.length === 0 ? ve(this, 0, t) : T.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(t) {
    if (!s.isBuffer(t))
      throw new TypeError("Argument must be a Buffer");
    return this === t ? !0 : s.compare(this, t) === 0;
  }, s.prototype.inspect = function() {
    var t = "", i = n.INSPECT_MAX_BYTES;
    return t = this.toString("hex", 0, i).replace(/(.{2})/g, "$1 ").trim(), this.length > i && (t += " ... "), "<Buffer " + t + ">";
  }, a && (s.prototype[a] = s.prototype.inspect), s.prototype.compare = function(t, i, h, v, w) {
    if (k(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), !s.isBuffer(t))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t
      );
    if (i === void 0 && (i = 0), h === void 0 && (h = t ? t.length : 0), v === void 0 && (v = 0), w === void 0 && (w = this.length), i < 0 || h > t.length || v < 0 || w > this.length)
      throw new RangeError("out of range index");
    if (v >= w && i >= h)
      return 0;
    if (v >= w)
      return -1;
    if (i >= h)
      return 1;
    if (i >>>= 0, h >>>= 0, v >>>= 0, w >>>= 0, this === t)
      return 0;
    for (var E = w - v, U = h - i, c = Math.min(E, U), x = this.slice(v, w), d = t.slice(i, h), b = 0; b < c; ++b)
      if (x[b] !== d[b]) {
        E = x[b], U = d[b];
        break;
      }
    return E < U ? -1 : U < E ? 1 : 0;
  };
  function de(f, t, i, h, v) {
    if (f.length === 0)
      return -1;
    if (typeof i == "string" ? (h = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, le(i) && (i = v ? 0 : f.length - 1), i < 0 && (i = f.length + i), i >= f.length) {
      if (v)
        return -1;
      i = f.length - 1;
    } else if (i < 0)
      if (v)
        i = 0;
      else
        return -1;
    if (typeof t == "string" && (t = s.from(t, h)), s.isBuffer(t))
      return t.length === 0 ? -1 : pe(f, t, i, h, v);
    if (typeof t == "number")
      return t = t & 255, typeof Uint8Array.prototype.indexOf == "function" ? v ? Uint8Array.prototype.indexOf.call(f, t, i) : Uint8Array.prototype.lastIndexOf.call(f, t, i) : pe(f, [t], i, h, v);
    throw new TypeError("val must be string, number or Buffer");
  }
  function pe(f, t, i, h, v) {
    var w = 1, E = f.length, U = t.length;
    if (h !== void 0 && (h = String(h).toLowerCase(), h === "ucs2" || h === "ucs-2" || h === "utf16le" || h === "utf-16le")) {
      if (f.length < 2 || t.length < 2)
        return -1;
      w = 2, E /= 2, U /= 2, i /= 2;
    }
    function c(ae, ne) {
      return w === 1 ? ae[ne] : ae.readUInt16BE(ne * w);
    }
    var x;
    if (v) {
      var d = -1;
      for (x = i; x < E; x++)
        if (c(f, x) === c(t, d === -1 ? 0 : x - d)) {
          if (d === -1 && (d = x), x - d + 1 === U)
            return d * w;
        } else
          d !== -1 && (x -= x - d), d = -1;
    } else
      for (i + U > E && (i = E - U), x = i; x >= 0; x--) {
        for (var b = !0, $ = 0; $ < U; $++)
          if (c(f, x + $) !== c(t, $)) {
            b = !1;
            break;
          }
        if (b)
          return x;
      }
    return -1;
  }
  s.prototype.includes = function(t, i, h) {
    return this.indexOf(t, i, h) !== -1;
  }, s.prototype.indexOf = function(t, i, h) {
    return de(this, t, i, h, !0);
  }, s.prototype.lastIndexOf = function(t, i, h) {
    return de(this, t, i, h, !1);
  };
  function ue(f, t, i, h) {
    i = Number(i) || 0;
    var v = f.length - i;
    h ? (h = Number(h), h > v && (h = v)) : h = v;
    var w = t.length;
    h > w / 2 && (h = w / 2);
    for (var E = 0; E < h; ++E) {
      var U = parseInt(t.substr(E * 2, 2), 16);
      if (le(U))
        return E;
      f[i + E] = U;
    }
    return E;
  }
  function $e(f, t, i, h) {
    return G(ee(t, f.length - i), f, i, h);
  }
  function Q(f, t, i, h) {
    return G(fe(t), f, i, h);
  }
  function me(f, t, i, h) {
    return G(V(t), f, i, h);
  }
  function ie(f, t, i, h) {
    return G(ye(t, f.length - i), f, i, h);
  }
  s.prototype.write = function(t, i, h, v) {
    if (i === void 0)
      v = "utf8", h = this.length, i = 0;
    else if (h === void 0 && typeof i == "string")
      v = i, h = this.length, i = 0;
    else if (isFinite(i))
      i = i >>> 0, isFinite(h) ? (h = h >>> 0, v === void 0 && (v = "utf8")) : (v = h, h = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var w = this.length - i;
    if ((h === void 0 || h > w) && (h = w), t.length > 0 && (h < 0 || i < 0) || i > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    v || (v = "utf8");
    for (var E = !1; ; )
      switch (v) {
        case "hex":
          return ue(this, t, i, h);
        case "utf8":
        case "utf-8":
          return $e(this, t, i, h);
        case "ascii":
        case "latin1":
        case "binary":
          return Q(this, t, i, h);
        case "base64":
          return me(this, t, i, h);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ie(this, t, i, h);
        default:
          if (E)
            throw new TypeError("Unknown encoding: " + v);
          v = ("" + v).toLowerCase(), E = !0;
      }
  }, s.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Ee(f, t, i) {
    return t === 0 && i === f.length ? e.fromByteArray(f) : e.fromByteArray(f.slice(t, i));
  }
  function ve(f, t, i) {
    i = Math.min(f.length, i);
    for (var h = [], v = t; v < i; ) {
      var w = f[v], E = null, U = w > 239 ? 4 : w > 223 ? 3 : w > 191 ? 2 : 1;
      if (v + U <= i) {
        var c, x, d, b;
        switch (U) {
          case 1:
            w < 128 && (E = w);
            break;
          case 2:
            c = f[v + 1], (c & 192) === 128 && (b = (w & 31) << 6 | c & 63, b > 127 && (E = b));
            break;
          case 3:
            c = f[v + 1], x = f[v + 2], (c & 192) === 128 && (x & 192) === 128 && (b = (w & 15) << 12 | (c & 63) << 6 | x & 63, b > 2047 && (b < 55296 || b > 57343) && (E = b));
            break;
          case 4:
            c = f[v + 1], x = f[v + 2], d = f[v + 3], (c & 192) === 128 && (x & 192) === 128 && (d & 192) === 128 && (b = (w & 15) << 18 | (c & 63) << 12 | (x & 63) << 6 | d & 63, b > 65535 && b < 1114112 && (E = b));
        }
      }
      E === null ? (E = 65533, U = 1) : E > 65535 && (E -= 65536, h.push(E >>> 10 & 1023 | 55296), E = 56320 | E & 1023), h.push(E), v += U;
    }
    return or(h);
  }
  var Ce = 4096;
  function or(f) {
    var t = f.length;
    if (t <= Ce)
      return String.fromCharCode.apply(String, f);
    for (var i = "", h = 0; h < t; )
      i += String.fromCharCode.apply(
        String,
        f.slice(h, h += Ce)
      );
    return i;
  }
  function sr(f, t, i) {
    var h = "";
    i = Math.min(f.length, i);
    for (var v = t; v < i; ++v)
      h += String.fromCharCode(f[v] & 127);
    return h;
  }
  function vr(f, t, i) {
    var h = "";
    i = Math.min(f.length, i);
    for (var v = t; v < i; ++v)
      h += String.fromCharCode(f[v]);
    return h;
  }
  function yr(f, t, i) {
    var h = f.length;
    (!t || t < 0) && (t = 0), (!i || i < 0 || i > h) && (i = h);
    for (var v = "", w = t; w < i; ++w)
      v += Ie[f[w]];
    return v;
  }
  function F(f, t, i) {
    for (var h = f.slice(t, i), v = "", w = 0; w < h.length - 1; w += 2)
      v += String.fromCharCode(h[w] + h[w + 1] * 256);
    return v;
  }
  s.prototype.slice = function(t, i) {
    var h = this.length;
    t = ~~t, i = i === void 0 ? h : ~~i, t < 0 ? (t += h, t < 0 && (t = 0)) : t > h && (t = h), i < 0 ? (i += h, i < 0 && (i = 0)) : i > h && (i = h), i < t && (i = t);
    var v = this.subarray(t, i);
    return Object.setPrototypeOf(v, s.prototype), v;
  };
  function S(f, t, i) {
    if (f % 1 !== 0 || f < 0)
      throw new RangeError("offset is not uint");
    if (f + t > i)
      throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(t, i, h) {
    t = t >>> 0, i = i >>> 0, h || S(t, i, this.length);
    for (var v = this[t], w = 1, E = 0; ++E < i && (w *= 256); )
      v += this[t + E] * w;
    return v;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(t, i, h) {
    t = t >>> 0, i = i >>> 0, h || S(t, i, this.length);
    for (var v = this[t + --i], w = 1; i > 0 && (w *= 256); )
      v += this[t + --i] * w;
    return v;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(t, i) {
    return t = t >>> 0, i || S(t, 1, this.length), this[t];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(t, i) {
    return t = t >>> 0, i || S(t, 2, this.length), this[t] | this[t + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(t, i) {
    return t = t >>> 0, i || S(t, 2, this.length), this[t] << 8 | this[t + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(t, i) {
    return t = t >>> 0, i || S(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(t, i) {
    return t = t >>> 0, i || S(t, 4, this.length), this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
  }, s.prototype.readIntLE = function(t, i, h) {
    t = t >>> 0, i = i >>> 0, h || S(t, i, this.length);
    for (var v = this[t], w = 1, E = 0; ++E < i && (w *= 256); )
      v += this[t + E] * w;
    return w *= 128, v >= w && (v -= Math.pow(2, 8 * i)), v;
  }, s.prototype.readIntBE = function(t, i, h) {
    t = t >>> 0, i = i >>> 0, h || S(t, i, this.length);
    for (var v = i, w = 1, E = this[t + --v]; v > 0 && (w *= 256); )
      E += this[t + --v] * w;
    return w *= 128, E >= w && (E -= Math.pow(2, 8 * i)), E;
  }, s.prototype.readInt8 = function(t, i) {
    return t = t >>> 0, i || S(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
  }, s.prototype.readInt16LE = function(t, i) {
    t = t >>> 0, i || S(t, 2, this.length);
    var h = this[t] | this[t + 1] << 8;
    return h & 32768 ? h | 4294901760 : h;
  }, s.prototype.readInt16BE = function(t, i) {
    t = t >>> 0, i || S(t, 2, this.length);
    var h = this[t + 1] | this[t] << 8;
    return h & 32768 ? h | 4294901760 : h;
  }, s.prototype.readInt32LE = function(t, i) {
    return t = t >>> 0, i || S(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
  }, s.prototype.readInt32BE = function(t, i) {
    return t = t >>> 0, i || S(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
  }, s.prototype.readFloatLE = function(t, i) {
    return t = t >>> 0, i || S(t, 4, this.length), r.read(this, t, !0, 23, 4);
  }, s.prototype.readFloatBE = function(t, i) {
    return t = t >>> 0, i || S(t, 4, this.length), r.read(this, t, !1, 23, 4);
  }, s.prototype.readDoubleLE = function(t, i) {
    return t = t >>> 0, i || S(t, 8, this.length), r.read(this, t, !0, 52, 8);
  }, s.prototype.readDoubleBE = function(t, i) {
    return t = t >>> 0, i || S(t, 8, this.length), r.read(this, t, !1, 52, 8);
  };
  function I(f, t, i, h, v, w) {
    if (!s.isBuffer(f))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (t > v || t < w)
      throw new RangeError('"value" argument is out of bounds');
    if (i + h > f.length)
      throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(t, i, h, v) {
    if (t = +t, i = i >>> 0, h = h >>> 0, !v) {
      var w = Math.pow(2, 8 * h) - 1;
      I(this, t, i, h, w, 0);
    }
    var E = 1, U = 0;
    for (this[i] = t & 255; ++U < h && (E *= 256); )
      this[i + U] = t / E & 255;
    return i + h;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(t, i, h, v) {
    if (t = +t, i = i >>> 0, h = h >>> 0, !v) {
      var w = Math.pow(2, 8 * h) - 1;
      I(this, t, i, h, w, 0);
    }
    var E = h - 1, U = 1;
    for (this[i + E] = t & 255; --E >= 0 && (U *= 256); )
      this[i + E] = t / U & 255;
    return i + h;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 1, 255, 0), this[i] = t & 255, i + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 2, 65535, 0), this[i] = t & 255, this[i + 1] = t >>> 8, i + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 2, 65535, 0), this[i] = t >>> 8, this[i + 1] = t & 255, i + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 4, 4294967295, 0), this[i + 3] = t >>> 24, this[i + 2] = t >>> 16, this[i + 1] = t >>> 8, this[i] = t & 255, i + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 4, 4294967295, 0), this[i] = t >>> 24, this[i + 1] = t >>> 16, this[i + 2] = t >>> 8, this[i + 3] = t & 255, i + 4;
  }, s.prototype.writeIntLE = function(t, i, h, v) {
    if (t = +t, i = i >>> 0, !v) {
      var w = Math.pow(2, 8 * h - 1);
      I(this, t, i, h, w - 1, -w);
    }
    var E = 0, U = 1, c = 0;
    for (this[i] = t & 255; ++E < h && (U *= 256); )
      t < 0 && c === 0 && this[i + E - 1] !== 0 && (c = 1), this[i + E] = (t / U >> 0) - c & 255;
    return i + h;
  }, s.prototype.writeIntBE = function(t, i, h, v) {
    if (t = +t, i = i >>> 0, !v) {
      var w = Math.pow(2, 8 * h - 1);
      I(this, t, i, h, w - 1, -w);
    }
    var E = h - 1, U = 1, c = 0;
    for (this[i + E] = t & 255; --E >= 0 && (U *= 256); )
      t < 0 && c === 0 && this[i + E + 1] !== 0 && (c = 1), this[i + E] = (t / U >> 0) - c & 255;
    return i + h;
  }, s.prototype.writeInt8 = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[i] = t & 255, i + 1;
  }, s.prototype.writeInt16LE = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 2, 32767, -32768), this[i] = t & 255, this[i + 1] = t >>> 8, i + 2;
  }, s.prototype.writeInt16BE = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 2, 32767, -32768), this[i] = t >>> 8, this[i + 1] = t & 255, i + 2;
  }, s.prototype.writeInt32LE = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 4, 2147483647, -2147483648), this[i] = t & 255, this[i + 1] = t >>> 8, this[i + 2] = t >>> 16, this[i + 3] = t >>> 24, i + 4;
  }, s.prototype.writeInt32BE = function(t, i, h) {
    return t = +t, i = i >>> 0, h || I(this, t, i, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[i] = t >>> 24, this[i + 1] = t >>> 16, this[i + 2] = t >>> 8, this[i + 3] = t & 255, i + 4;
  };
  function B(f, t, i, h, v, w) {
    if (i + h > f.length)
      throw new RangeError("Index out of range");
    if (i < 0)
      throw new RangeError("Index out of range");
  }
  function N(f, t, i, h, v) {
    return t = +t, i = i >>> 0, v || B(f, t, i, 4), r.write(f, t, i, h, 23, 4), i + 4;
  }
  s.prototype.writeFloatLE = function(t, i, h) {
    return N(this, t, i, !0, h);
  }, s.prototype.writeFloatBE = function(t, i, h) {
    return N(this, t, i, !1, h);
  };
  function Z(f, t, i, h, v) {
    return t = +t, i = i >>> 0, v || B(f, t, i, 8), r.write(f, t, i, h, 52, 8), i + 8;
  }
  s.prototype.writeDoubleLE = function(t, i, h) {
    return Z(this, t, i, !0, h);
  }, s.prototype.writeDoubleBE = function(t, i, h) {
    return Z(this, t, i, !1, h);
  }, s.prototype.copy = function(t, i, h, v) {
    if (!s.isBuffer(t))
      throw new TypeError("argument should be a Buffer");
    if (h || (h = 0), !v && v !== 0 && (v = this.length), i >= t.length && (i = t.length), i || (i = 0), v > 0 && v < h && (v = h), v === h || t.length === 0 || this.length === 0)
      return 0;
    if (i < 0)
      throw new RangeError("targetStart out of bounds");
    if (h < 0 || h >= this.length)
      throw new RangeError("Index out of range");
    if (v < 0)
      throw new RangeError("sourceEnd out of bounds");
    v > this.length && (v = this.length), t.length - i < v - h && (v = t.length - i + h);
    var w = v - h;
    return this === t && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(i, h, v) : Uint8Array.prototype.set.call(
      t,
      this.subarray(h, v),
      i
    ), w;
  }, s.prototype.fill = function(t, i, h, v) {
    if (typeof t == "string") {
      if (typeof i == "string" ? (v = i, i = 0, h = this.length) : typeof h == "string" && (v = h, h = this.length), v !== void 0 && typeof v != "string")
        throw new TypeError("encoding must be a string");
      if (typeof v == "string" && !s.isEncoding(v))
        throw new TypeError("Unknown encoding: " + v);
      if (t.length === 1) {
        var w = t.charCodeAt(0);
        (v === "utf8" && w < 128 || v === "latin1") && (t = w);
      }
    } else
      typeof t == "number" ? t = t & 255 : typeof t == "boolean" && (t = Number(t));
    if (i < 0 || this.length < i || this.length < h)
      throw new RangeError("Out of range index");
    if (h <= i)
      return this;
    i = i >>> 0, h = h === void 0 ? this.length : h >>> 0, t || (t = 0);
    var E;
    if (typeof t == "number")
      for (E = i; E < h; ++E)
        this[E] = t;
    else {
      var U = s.isBuffer(t) ? t : s.from(t, v), c = U.length;
      if (c === 0)
        throw new TypeError('The value "' + t + '" is invalid for argument "value"');
      for (E = 0; E < h - i; ++E)
        this[E + i] = U[E % c];
    }
    return this;
  };
  var z = /[^+/0-9A-Za-z-_]/g;
  function M(f) {
    if (f = f.split("=")[0], f = f.trim().replace(z, ""), f.length < 2)
      return "";
    for (; f.length % 4 !== 0; )
      f = f + "=";
    return f;
  }
  function ee(f, t) {
    t = t || 1 / 0;
    for (var i, h = f.length, v = null, w = [], E = 0; E < h; ++E) {
      if (i = f.charCodeAt(E), i > 55295 && i < 57344) {
        if (!v) {
          if (i > 56319) {
            (t -= 3) > -1 && w.push(239, 191, 189);
            continue;
          } else if (E + 1 === h) {
            (t -= 3) > -1 && w.push(239, 191, 189);
            continue;
          }
          v = i;
          continue;
        }
        if (i < 56320) {
          (t -= 3) > -1 && w.push(239, 191, 189), v = i;
          continue;
        }
        i = (v - 55296 << 10 | i - 56320) + 65536;
      } else
        v && (t -= 3) > -1 && w.push(239, 191, 189);
      if (v = null, i < 128) {
        if ((t -= 1) < 0)
          break;
        w.push(i);
      } else if (i < 2048) {
        if ((t -= 2) < 0)
          break;
        w.push(
          i >> 6 | 192,
          i & 63 | 128
        );
      } else if (i < 65536) {
        if ((t -= 3) < 0)
          break;
        w.push(
          i >> 12 | 224,
          i >> 6 & 63 | 128,
          i & 63 | 128
        );
      } else if (i < 1114112) {
        if ((t -= 4) < 0)
          break;
        w.push(
          i >> 18 | 240,
          i >> 12 & 63 | 128,
          i >> 6 & 63 | 128,
          i & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return w;
  }
  function fe(f) {
    for (var t = [], i = 0; i < f.length; ++i)
      t.push(f.charCodeAt(i) & 255);
    return t;
  }
  function ye(f, t) {
    for (var i, h, v, w = [], E = 0; E < f.length && !((t -= 2) < 0); ++E)
      i = f.charCodeAt(E), h = i >> 8, v = i % 256, w.push(v), w.push(h);
    return w;
  }
  function V(f) {
    return e.toByteArray(M(f));
  }
  function G(f, t, i, h) {
    for (var v = 0; v < h && !(v + i >= t.length || v >= f.length); ++v)
      t[v + i] = f[v];
    return v;
  }
  function k(f, t) {
    return f instanceof t || f != null && f.constructor != null && f.constructor.name != null && f.constructor.name === t.name;
  }
  function le(f) {
    return f !== f;
  }
  var Ie = function() {
    for (var f = "0123456789abcdef", t = new Array(256), i = 0; i < 16; ++i)
      for (var h = i * 16, v = 0; v < 16; ++v)
        t[h + v] = f[i] + f[v];
    return t;
  }();
})(Sa);
var Mr = {}, Pa = {
  get exports() {
    return Mr;
  },
  set exports(n) {
    Mr = n;
  }
}, H = Pa.exports = {}, _e, Ne;
function kt() {
  throw new Error("setTimeout has not been defined");
}
function zt() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? _e = setTimeout : _e = kt;
  } catch {
    _e = kt;
  }
  try {
    typeof clearTimeout == "function" ? Ne = clearTimeout : Ne = zt;
  } catch {
    Ne = zt;
  }
})();
function Qn(n) {
  if (_e === setTimeout)
    return setTimeout(n, 0);
  if ((_e === kt || !_e) && setTimeout)
    return _e = setTimeout, setTimeout(n, 0);
  try {
    return _e(n, 0);
  } catch {
    try {
      return _e.call(null, n, 0);
    } catch {
      return _e.call(this, n, 0);
    }
  }
}
function qa(n) {
  if (Ne === clearTimeout)
    return clearTimeout(n);
  if ((Ne === zt || !Ne) && clearTimeout)
    return Ne = clearTimeout, clearTimeout(n);
  try {
    return Ne(n);
  } catch {
    try {
      return Ne.call(null, n);
    } catch {
      return Ne.call(this, n);
    }
  }
}
var Ve = [], dr = !1, Qe, jr = -1;
function Ba() {
  !dr || !Qe || (dr = !1, Qe.length ? Ve = Qe.concat(Ve) : jr = -1, Ve.length && ei());
}
function ei() {
  if (!dr) {
    var n = Qn(Ba);
    dr = !0;
    for (var e = Ve.length; e; ) {
      for (Qe = Ve, Ve = []; ++jr < e; )
        Qe && Qe[jr].run();
      jr = -1, e = Ve.length;
    }
    Qe = null, dr = !1, qa(n);
  }
}
H.nextTick = function(n) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  Ve.push(new ri(n, e)), Ve.length === 1 && !dr && Qn(ei);
};
function ri(n, e) {
  this.fun = n, this.array = e;
}
ri.prototype.run = function() {
  this.fun.apply(null, this.array);
};
H.title = "browser";
H.browser = !0;
H.env = {};
H.argv = [];
H.version = "";
H.versions = {};
function We() {
}
H.on = We;
H.addListener = We;
H.once = We;
H.off = We;
H.removeListener = We;
H.removeAllListeners = We;
H.emit = We;
H.prependListener = We;
H.prependOnceListener = We;
H.listeners = function(n) {
  return [];
};
H.binding = function(n) {
  throw new Error("process.binding is not supported");
};
H.cwd = function() {
  return "/";
};
H.chdir = function(n) {
  throw new Error("process.chdir is not supported");
};
H.umask = function() {
  return 0;
};
(function(n) {
  function e() {
    var a = this || self;
    return delete n.prototype.__magic__, a;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return e();
  n.defineProperty(n.prototype, "__magic__", {
    configurable: !0,
    get: e
  });
  var r = __magic__;
  return r;
})(Object);
var ja = we, La = function(e, r) {
  ja.forEach(e, function(o, u) {
    u !== r && u.toUpperCase() === r.toUpperCase() && (e[r] = o, delete e[u]);
  });
}, ti = function(e, r, a, o, u) {
  return e.config = r, a && (e.code = a), e.request = o, e.response = u, e.isAxiosError = !0, e.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }, e;
}, yt, ln;
function ni() {
  if (ln)
    return yt;
  ln = 1;
  var n = ti;
  return yt = function(r, a, o, u, l) {
    var s = new Error(r);
    return n(s, a, o, u, l);
  }, yt;
}
var gt, hn;
function _a() {
  if (hn)
    return gt;
  hn = 1;
  var n = ni();
  return gt = function(r, a, o) {
    var u = o.config.validateStatus;
    !o.status || !u || u(o.status) ? r(o) : a(n(
      "Request failed with status code " + o.status,
      o.config,
      null,
      o.request,
      o
    ));
  }, gt;
}
var wt, cn;
function Na() {
  if (cn)
    return wt;
  cn = 1;
  var n = we;
  return wt = n.isStandardBrowserEnv() ? (
    // Standard browser envs support document.cookie
    function() {
      return {
        write: function(a, o, u, l, s, m) {
          var p = [];
          p.push(a + "=" + encodeURIComponent(o)), n.isNumber(u) && p.push("expires=" + new Date(u).toGMTString()), n.isString(l) && p.push("path=" + l), n.isString(s) && p.push("domain=" + s), m === !0 && p.push("secure"), document.cookie = p.join("; ");
        },
        read: function(a) {
          var o = document.cookie.match(new RegExp("(^|;\\s*)(" + a + ")=([^;]*)"));
          return o ? decodeURIComponent(o[3]) : null;
        },
        remove: function(a) {
          this.write(a, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function() {
      return {
        write: function() {
        },
        read: function() {
          return null;
        },
        remove: function() {
        }
      };
    }()
  ), wt;
}
var xt, dn;
function Da() {
  return dn || (dn = 1, xt = function(e) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
  }), xt;
}
var Et, pn;
function Ma() {
  return pn || (pn = 1, Et = function(e, r) {
    return r ? e.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : e;
  }), Et;
}
var At, mn;
function ka() {
  if (mn)
    return At;
  mn = 1;
  var n = Da(), e = Ma();
  return At = function(a, o) {
    return a && !n(o) ? e(a, o) : o;
  }, At;
}
var bt, vn;
function za() {
  if (vn)
    return bt;
  vn = 1;
  var n = we, e = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  return bt = function(a) {
    var o = {}, u, l, s;
    return a && n.forEach(a.split(`
`), function(p) {
      if (s = p.indexOf(":"), u = n.trim(p.substr(0, s)).toLowerCase(), l = n.trim(p.substr(s + 1)), u) {
        if (o[u] && e.indexOf(u) >= 0)
          return;
        u === "set-cookie" ? o[u] = (o[u] ? o[u] : []).concat([l]) : o[u] = o[u] ? o[u] + ", " + l : l;
      }
    }), o;
  }, bt;
}
var St, yn;
function Za() {
  if (yn)
    return St;
  yn = 1;
  var n = we;
  return St = n.isStandardBrowserEnv() ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function() {
      var r = /(msie|trident)/i.test(navigator.userAgent), a = document.createElement("a"), o;
      function u(l) {
        var s = l;
        return r && (a.setAttribute("href", s), s = a.href), a.setAttribute("href", s), {
          href: a.href,
          protocol: a.protocol ? a.protocol.replace(/:$/, "") : "",
          host: a.host,
          search: a.search ? a.search.replace(/^\?/, "") : "",
          hash: a.hash ? a.hash.replace(/^#/, "") : "",
          hostname: a.hostname,
          port: a.port,
          pathname: a.pathname.charAt(0) === "/" ? a.pathname : "/" + a.pathname
        };
      }
      return o = u(window.location.href), function(s) {
        var m = n.isString(s) ? u(s) : s;
        return m.protocol === o.protocol && m.host === o.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function() {
      return function() {
        return !0;
      };
    }()
  ), St;
}
var Ft, gn;
function st() {
  if (gn)
    return Ft;
  gn = 1;
  function n(e) {
    this.message = e;
  }
  return n.prototype.toString = function() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, n.prototype.__CANCEL__ = !0, Ft = n, Ft;
}
var Ct, wn;
function xn() {
  if (wn)
    return Ct;
  wn = 1;
  var n = we, e = _a(), r = Na(), a = Kn, o = ka(), u = za(), l = Za(), s = ni(), m = ut(), p = st();
  return Ct = function(g) {
    return new Promise(function(O, L) {
      var _ = g.data, Fe = g.headers, ce = g.responseType, xe;
      function ze() {
        g.cancelToken && g.cancelToken.unsubscribe(xe), g.signal && g.signal.removeEventListener("abort", xe);
      }
      n.isFormData(_) && delete Fe["Content-Type"];
      var T = new XMLHttpRequest();
      if (g.auth) {
        var D = g.auth.username || "", de = g.auth.password ? unescape(encodeURIComponent(g.auth.password)) : "";
        Fe.Authorization = "Basic " + btoa(D + ":" + de);
      }
      var pe = o(g.baseURL, g.url);
      T.open(g.method.toUpperCase(), a(pe, g.params, g.paramsSerializer), !0), T.timeout = g.timeout;
      function ue() {
        if (T) {
          var Q = "getAllResponseHeaders" in T ? u(T.getAllResponseHeaders()) : null, me = !ce || ce === "text" || ce === "json" ? T.responseText : T.response, ie = {
            data: me,
            status: T.status,
            statusText: T.statusText,
            headers: Q,
            config: g,
            request: T
          };
          e(function(ve) {
            O(ve), ze();
          }, function(ve) {
            L(ve), ze();
          }, ie), T = null;
        }
      }
      if ("onloadend" in T ? T.onloadend = ue : T.onreadystatechange = function() {
        !T || T.readyState !== 4 || T.status === 0 && !(T.responseURL && T.responseURL.indexOf("file:") === 0) || setTimeout(ue);
      }, T.onabort = function() {
        T && (L(s("Request aborted", g, "ECONNABORTED", T)), T = null);
      }, T.onerror = function() {
        L(s("Network Error", g, null, T)), T = null;
      }, T.ontimeout = function() {
        var me = g.timeout ? "timeout of " + g.timeout + "ms exceeded" : "timeout exceeded", ie = g.transitional || m.transitional;
        g.timeoutErrorMessage && (me = g.timeoutErrorMessage), L(s(
          me,
          g,
          ie.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
          T
        )), T = null;
      }, n.isStandardBrowserEnv()) {
        var $e = (g.withCredentials || l(pe)) && g.xsrfCookieName ? r.read(g.xsrfCookieName) : void 0;
        $e && (Fe[g.xsrfHeaderName] = $e);
      }
      "setRequestHeader" in T && n.forEach(Fe, function(me, ie) {
        typeof _ > "u" && ie.toLowerCase() === "content-type" ? delete Fe[ie] : T.setRequestHeader(ie, me);
      }), n.isUndefined(g.withCredentials) || (T.withCredentials = !!g.withCredentials), ce && ce !== "json" && (T.responseType = g.responseType), typeof g.onDownloadProgress == "function" && T.addEventListener("progress", g.onDownloadProgress), typeof g.onUploadProgress == "function" && T.upload && T.upload.addEventListener("progress", g.onUploadProgress), (g.cancelToken || g.signal) && (xe = function(Q) {
        T && (L(!Q || Q && Q.type ? new p("canceled") : Q), T.abort(), T = null);
      }, g.cancelToken && g.cancelToken.subscribe(xe), g.signal && (g.signal.aborted ? xe() : g.signal.addEventListener("abort", xe))), _ || (_ = null), T.send(_);
    });
  }, Ct;
}
var It, En;
function ut() {
  if (En)
    return It;
  En = 1;
  var n = we, e = La, r = ti, a = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  function o(m, p) {
    !n.isUndefined(m) && n.isUndefined(m["Content-Type"]) && (m["Content-Type"] = p);
  }
  function u() {
    var m;
    return (typeof XMLHttpRequest < "u" || typeof Mr < "u" && Object.prototype.toString.call(Mr) === "[object process]") && (m = xn()), m;
  }
  function l(m, p, y) {
    if (n.isString(m))
      try {
        return (p || JSON.parse)(m), n.trim(m);
      } catch (g) {
        if (g.name !== "SyntaxError")
          throw g;
      }
    return (y || JSON.stringify)(m);
  }
  var s = {
    transitional: {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1
    },
    adapter: u(),
    transformRequest: [function(p, y) {
      return e(y, "Accept"), e(y, "Content-Type"), n.isFormData(p) || n.isArrayBuffer(p) || n.isBuffer(p) || n.isStream(p) || n.isFile(p) || n.isBlob(p) ? p : n.isArrayBufferView(p) ? p.buffer : n.isURLSearchParams(p) ? (o(y, "application/x-www-form-urlencoded;charset=utf-8"), p.toString()) : n.isObject(p) || y && y["Content-Type"] === "application/json" ? (o(y, "application/json"), l(p)) : p;
    }],
    transformResponse: [function(p) {
      var y = this.transitional || s.transitional, g = y && y.silentJSONParsing, A = y && y.forcedJSONParsing, O = !g && this.responseType === "json";
      if (O || A && n.isString(p) && p.length)
        try {
          return JSON.parse(p);
        } catch (L) {
          if (O)
            throw L.name === "SyntaxError" ? r(L, this, "E_JSON_PARSE") : L;
        }
      return p;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function(p) {
      return p >= 200 && p < 300;
    },
    headers: {
      common: {
        Accept: "application/json, text/plain, */*"
      }
    }
  };
  return n.forEach(["delete", "get", "head"], function(p) {
    s.headers[p] = {};
  }), n.forEach(["post", "put", "patch"], function(p) {
    s.headers[p] = n.merge(a);
  }), It = s, It;
}
var Va = we, Wa = ut(), Ha = function(e, r, a) {
  var o = this || Wa;
  return Va.forEach(a, function(l) {
    e = l.call(o, e, r);
  }), e;
}, Tt, An;
function ii() {
  return An || (An = 1, Tt = function(e) {
    return !!(e && e.__CANCEL__);
  }), Tt;
}
var bn = we, Rt = Ha, Ja = ii(), Xa = ut(), Ga = st();
function Ot(n) {
  if (n.cancelToken && n.cancelToken.throwIfRequested(), n.signal && n.signal.aborted)
    throw new Ga("canceled");
}
var Ka = function(e) {
  Ot(e), e.headers = e.headers || {}, e.data = Rt.call(
    e,
    e.data,
    e.headers,
    e.transformRequest
  ), e.headers = bn.merge(
    e.headers.common || {},
    e.headers[e.method] || {},
    e.headers
  ), bn.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(o) {
      delete e.headers[o];
    }
  );
  var r = e.adapter || Xa.adapter;
  return r(e).then(function(o) {
    return Ot(e), o.data = Rt.call(
      e,
      o.data,
      o.headers,
      e.transformResponse
    ), o;
  }, function(o) {
    return Ja(o) || (Ot(e), o && o.response && (o.response.data = Rt.call(
      e,
      o.response.data,
      o.response.headers,
      e.transformResponse
    ))), Promise.reject(o);
  });
}, ge = we, ai = function(e, r) {
  r = r || {};
  var a = {};
  function o(y, g) {
    return ge.isPlainObject(y) && ge.isPlainObject(g) ? ge.merge(y, g) : ge.isPlainObject(g) ? ge.merge({}, g) : ge.isArray(g) ? g.slice() : g;
  }
  function u(y) {
    if (ge.isUndefined(r[y])) {
      if (!ge.isUndefined(e[y]))
        return o(void 0, e[y]);
    } else
      return o(e[y], r[y]);
  }
  function l(y) {
    if (!ge.isUndefined(r[y]))
      return o(void 0, r[y]);
  }
  function s(y) {
    if (ge.isUndefined(r[y])) {
      if (!ge.isUndefined(e[y]))
        return o(void 0, e[y]);
    } else
      return o(void 0, r[y]);
  }
  function m(y) {
    if (y in r)
      return o(e[y], r[y]);
    if (y in e)
      return o(void 0, e[y]);
  }
  var p = {
    url: l,
    method: l,
    data: l,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: m
  };
  return ge.forEach(Object.keys(e).concat(Object.keys(r)), function(g) {
    var A = p[g] || u, O = A(g);
    ge.isUndefined(O) && A !== m || (a[g] = O);
  }), a;
}, Ut, Sn;
function oi() {
  return Sn || (Sn = 1, Ut = {
    version: "0.23.0"
  }), Ut;
}
var Ya = oi().version, nn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(n, e) {
  nn[n] = function(a) {
    return typeof a === n || "a" + (e < 1 ? "n " : " ") + n;
  };
});
var Fn = {};
nn.transitional = function(e, r, a) {
  function o(u, l) {
    return "[Axios v" + Ya + "] Transitional option '" + u + "'" + l + (a ? ". " + a : "");
  }
  return function(u, l, s) {
    if (e === !1)
      throw new Error(o(l, " has been removed" + (r ? " in " + r : "")));
    return r && !Fn[l] && (Fn[l] = !0, console.warn(
      o(
        l,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), e ? e(u, l, s) : !0;
  };
};
function Qa(n, e, r) {
  if (typeof n != "object")
    throw new TypeError("options must be an object");
  for (var a = Object.keys(n), o = a.length; o-- > 0; ) {
    var u = a[o], l = e[u];
    if (l) {
      var s = n[u], m = s === void 0 || l(s, u, n);
      if (m !== !0)
        throw new TypeError("option " + u + " must be " + m);
      continue;
    }
    if (r !== !0)
      throw Error("Unknown option " + u);
  }
}
var eo = {
  assertOptions: Qa,
  validators: nn
}, si = we, ro = Kn, Cn = ba, In = Ka, ft = ai, ui = eo, hr = ui.validators;
function Pr(n) {
  this.defaults = n, this.interceptors = {
    request: new Cn(),
    response: new Cn()
  };
}
Pr.prototype.request = function(e) {
  typeof e == "string" ? (e = arguments[1] || {}, e.url = arguments[0]) : e = e || {}, e = ft(this.defaults, e), e.method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
  var r = e.transitional;
  r !== void 0 && ui.assertOptions(r, {
    silentJSONParsing: hr.transitional(hr.boolean),
    forcedJSONParsing: hr.transitional(hr.boolean),
    clarifyTimeoutError: hr.transitional(hr.boolean)
  }, !1);
  var a = [], o = !0;
  this.interceptors.request.forEach(function(A) {
    typeof A.runWhen == "function" && A.runWhen(e) === !1 || (o = o && A.synchronous, a.unshift(A.fulfilled, A.rejected));
  });
  var u = [];
  this.interceptors.response.forEach(function(A) {
    u.push(A.fulfilled, A.rejected);
  });
  var l;
  if (!o) {
    var s = [In, void 0];
    for (Array.prototype.unshift.apply(s, a), s = s.concat(u), l = Promise.resolve(e); s.length; )
      l = l.then(s.shift(), s.shift());
    return l;
  }
  for (var m = e; a.length; ) {
    var p = a.shift(), y = a.shift();
    try {
      m = p(m);
    } catch (g) {
      y(g);
      break;
    }
  }
  try {
    l = In(m);
  } catch (g) {
    return Promise.reject(g);
  }
  for (; u.length; )
    l = l.then(u.shift(), u.shift());
  return l;
};
Pr.prototype.getUri = function(e) {
  return e = ft(this.defaults, e), ro(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");
};
si.forEach(["delete", "get", "head", "options"], function(e) {
  Pr.prototype[e] = function(r, a) {
    return this.request(ft(a || {}, {
      method: e,
      url: r,
      data: (a || {}).data
    }));
  };
});
si.forEach(["post", "put", "patch"], function(e) {
  Pr.prototype[e] = function(r, a, o) {
    return this.request(ft(o || {}, {
      method: e,
      url: r,
      data: a
    }));
  };
});
var to = Pr, $t, Tn;
function no() {
  if (Tn)
    return $t;
  Tn = 1;
  var n = st();
  function e(r) {
    if (typeof r != "function")
      throw new TypeError("executor must be a function.");
    var a;
    this.promise = new Promise(function(l) {
      a = l;
    });
    var o = this;
    this.promise.then(function(u) {
      if (o._listeners) {
        var l, s = o._listeners.length;
        for (l = 0; l < s; l++)
          o._listeners[l](u);
        o._listeners = null;
      }
    }), this.promise.then = function(u) {
      var l, s = new Promise(function(m) {
        o.subscribe(m), l = m;
      }).then(u);
      return s.cancel = function() {
        o.unsubscribe(l);
      }, s;
    }, r(function(l) {
      o.reason || (o.reason = new n(l), a(o.reason));
    });
  }
  return e.prototype.throwIfRequested = function() {
    if (this.reason)
      throw this.reason;
  }, e.prototype.subscribe = function(a) {
    if (this.reason) {
      a(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(a) : this._listeners = [a];
  }, e.prototype.unsubscribe = function(a) {
    if (this._listeners) {
      var o = this._listeners.indexOf(a);
      o !== -1 && this._listeners.splice(o, 1);
    }
  }, e.source = function() {
    var a, o = new e(function(l) {
      a = l;
    });
    return {
      token: o,
      cancel: a
    };
  }, $t = e, $t;
}
var Pt, Rn;
function io() {
  return Rn || (Rn = 1, Pt = function(e) {
    return function(a) {
      return e.apply(null, a);
    };
  }), Pt;
}
var qt, On;
function ao() {
  return On || (On = 1, qt = function(e) {
    return typeof e == "object" && e.isAxiosError === !0;
  }), qt;
}
var Un = we, oo = Jn, Lr = to, so = ai, uo = ut();
function fi(n) {
  var e = new Lr(n), r = oo(Lr.prototype.request, e);
  return Un.extend(r, Lr.prototype, e), Un.extend(r, e), r.create = function(o) {
    return fi(so(n, o));
  }, r;
}
var ke = fi(uo);
ke.Axios = Lr;
ke.Cancel = st();
ke.CancelToken = no();
ke.isCancel = ii();
ke.VERSION = oi().version;
ke.all = function(e) {
  return Promise.all(e);
};
ke.spread = io();
ke.isAxiosError = ao();
aa.exports = ke;
Dr.default = ke;
(function(n) {
  n.exports = Dr;
})(ia);
const fo = /* @__PURE__ */ Fi(Nt);
var kr, Fr, zr, Cr, Zr;
const cr = class {
  /**
   * Generates new axios client with interceptors
   *
   * @param {object} config - axios config
   * @param {function} errorHandler - custom error handler
   *
   */
  constructor({ config: e = {}, errorHandler: r = () => {
  } }) {
    j(this, kr, (e) => {
      e.interceptors.request.use(oe(cr, zr)), e.interceptors.request.use(oe(cr, Zr)), e.interceptors.response.use(
        (r) => {
          var a;
          return oe(a = cr, Cr).call(a, r, "success");
        },
        (r) => {
          var a;
          return oe(a = cr, Cr).call(a, r, "error");
        }
      ), e.interceptors.request.use((r) => r, oe(this, Fr)), e.interceptors.response.use((r) => r, oe(this, Fr));
    });
    j(this, Fr, (e) => {
      const r = e || {}, a = r.response || {}, o = { ...r, ...a.data, status: a.status };
      return this.errorHandler(o), Promise.reject(o);
    });
    this.config = e, this.axiosClient = null, this.errorHandler = r;
  }
  create() {
    return this.axiosClient = fo.create(this.config), oe(this, kr).call(this, this.axiosClient), this.axiosClient;
  }
};
let Ye = cr;
kr = new WeakMap(), Fr = new WeakMap(), zr = new WeakMap(), Cr = new WeakMap(), Zr = new WeakMap(), j(Ye, zr, (e) => ({ ...e, metadata: { startTime: new Date() } })), j(Ye, Cr, (e, r = "success") => (e.config.metadata.endTime = new Date(), e.duration = e.config.metadata.endTime - e.config.metadata.startTime, r === "success" ? e : Promise.reject(e))), j(Ye, Zr, (e) => e);
var Ir, er;
class Bt {
  /**
   * TokenProvider class
   *
   * @param {object} params - an object with all data necessary to init TokenProvider, required
   * @param {string} params.identityServerHostName - authorization hostname, required
   * @param {string} params.clientId - configuration clientId, not required, but then must be passed into "generateToken(secrets)" or "getToken(secrets)"
   * @param {string} params.clientSecret - configuration clientSecret, not required, but then must be passed into "generateToken(secrets)" or "getToken(secrets)"
   * @param {string} params.token - token, not required
   * @param {string} params.tokenType - tokenType, not required
   * @param {string} params.authEndpoint - authorization endpoint, not required, default value: 'connect/token'
   *
   */
  constructor({
    identityServerHostName: e,
    clientId: r,
    clientSecret: a,
    token: o,
    tokenType: u,
    authEndpoint: l = "connect/token"
  } = {}) {
    j(this, Ir, void 0);
    j(this, er, void 0);
    const s = {
      baseURL: e,
      json: !0
    };
    this._validateTokenProvider(e), this.authEndpoint = l, this.token = o, this.tokenType = u, je(this, Ir, new Ye({ config: s }).create()), this.clientId = r, je(this, er, a);
  }
  get isAuthorized() {
    const { tokenType: e, token: r } = this;
    return e && r;
  }
  get _data() {
    return `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${oe(this, er)}`;
  }
  async getToken(e) {
    if (this.isAuthorized) {
      const { tokenType: r, token: a } = this;
      return { tokenType: r, token: a };
    } else
      return this.generateToken(e);
  }
  async generateToken(e) {
    e && this._setSecrets(e);
    try {
      this._validateGenerateToken(this);
      const r = await oe(this, Ir).post(this.authEndpoint, this._data), a = this._parseTokenInfo(r == null ? void 0 : r.data);
      return this._setTokenInfo(a), a;
    } catch (r) {
      return Promise.reject(r);
    }
  }
  _parseTokenInfo(e) {
    const {
      access_token: r,
      token: a,
      expires_in: o,
      expiresIn: u,
      token_type: l,
      tokenType: s,
      scope: m
    } = e || {};
    return {
      token: a || r,
      expiresIn: u || o,
      tokenType: s || l,
      scope: m
    };
  }
  _setTokenInfo(e) {
    const { token: r, tokenType: a } = e;
    this.token = r, this.tokenType = a;
  }
  clearTokenInfo() {
    this.token = void 0, this.tokenType = void 0;
  }
  _setSecrets({ clientSecret: e, clientId: r } = {}) {
    r && (this.clientId = r), e && je(this, er, e);
  }
  _validateTokenProvider(e) {
    new Ue([
      {
        rule: !!e,
        message: '"identityServerHostName" is required field, must be defined'
      }
    ]).validateWithThrowError();
  }
  _validateGenerateToken(e) {
    new Ue([
      {
        rule: !!e.clientId,
        message: '"clientId" is required field, must be defined'
      },
      {
        rule: !!oe(e, er),
        message: '"clientSecret" is required field, must be defined'
      }
    ]).validateWithThrowError();
  }
}
Ir = new WeakMap(), er = new WeakMap();
var Tr, pr, Rr, rr, Vr, li, Wr, hi, Hr, ci, Jr, di, Xr, pi, Gr, mi, Kr, vi;
const Xe = class {
  /**
   * EngineClient class
   *
   * @param {object} config - axios config, 'baseURL' property is required
   * @param {string} config.baseURL - Engine hostname, required
   * @param {function} errorHandler - custom error handler, not required
   * @param {boolean} returnOriginalResponse - if true, the original response will be returned by default, not required, default value: false
   * @param {TokenProvider} tokenProvider - external TokenProvider, not required if "authorizationParams" defined
   * @param {object} authorizationParams - params for build-in TokenProvider, not required if "tokenProvider" defined
   * @param {string} authorizationParams.identityServerHostName - authorization hostname, required
   * @param {string} authorizationParams.clientId - configuration clientId, not required, but then must be passed into "transform(requestsData, secrets)"
   * @param {string} authorizationParams.clientSecret - configuration clientSecret, not required, but then must be passed into "transform(requestsData, secrets)"
   * @param {string} authorizationParams.token - token, not required
   * @param {string} authorizationParams.tokenType - tokenType, not required
   * @param {string} authorizationParams.authEndpoint - authorization endpoint, not required, default value: 'connect/token'*
   */
  constructor({
    config: e = { baseURL: "", json: !0 },
    returnOriginalResponse: r = !1,
    errorHandler: a = () => {
    },
    tokenProvider: o,
    authorizationParams: u
  } = {}) {
    j(this, Vr);
    j(this, Tr, void 0);
    j(this, pr, void 0);
    j(this, Rr, !1);
    j(this, rr, !1);
    var l;
    X(l = Xe, Wr, hi).call(l, { config: e, tokenProvider: o, authorizationParams: u }), je(this, Rr, r), je(this, pr, o instanceof Bt ? o : new Bt(u)), je(this, Tr, new Ye({
      config: e,
      errorHandler: a
    }).create());
  }
  async transformPostRequest(e, r) {
    var o;
    const a = X(o = Xe, Gr, mi).call(o, r);
    return oe(this, Tr).post("transform", e, { headers: a });
  }
  /**
   * Transform request data
   *
   * @param {object} requestData - request data object, built with RequestBuilder
   * @param {{returnOriginal: boolean}} config - optional config of transform
   * @param {object} config.secrets - configuration secrets
   * @param {string} config.secrets.clientId - configuration clientId
   * @param {string} config.secrets.clientSecret - configuration clientSecret
   * @param {boolean} config.returnOriginal - if true, the original response will be returned
   *
   */
  async transform(e, r = {}) {
    var u, l;
    const { secrets: a = null, returnOriginal: o = !1 } = r || {};
    try {
      X(u = Xe, Xr, pi).call(u, e);
      const s = await oe(this, pr).getToken(a), m = await this.transformPostRequest(e, s);
      return je(this, rr, !1), oe(this, Rr) || o ? m : X(l = Xe, Kr, vi).call(l, m, e);
    } catch (s) {
      return X(this, Vr, li).call(this, s, e, r);
    }
  }
};
let Je = Xe;
Tr = new WeakMap(), pr = new WeakMap(), Rr = new WeakMap(), rr = new WeakMap(), Vr = new WeakSet(), li = function(e, r, a) {
  return e.status === 401 && !oe(this, rr) ? (je(this, rr, !0), oe(this, pr).clearTokenInfo(), this.transform(r, a)) : (je(this, rr, !1), Promise.reject(e));
}, Wr = new WeakSet(), hi = function({ tokenProvider: e, config: r, authorizationParams: a }) {
  new Ue([
    {
      rule: !!(r != null && r.baseURL),
      message: '"config.baseURL" is required field, must be defined'
    },
    {
      rule: e instanceof Bt || !!(a != null && a.identityServerHostName),
      message: `For external TokenProvider "tokenProvider" must be defined as instance of TokenProvider;
        For build-in TokenProvider "authorizationParams.identityServerHostName" is required field.`
    }
  ]).validateWithThrowError();
}, Hr = new WeakSet(), ci = function(e) {
  const { requests: r = [], processingContexts: a = [], rightsContexts: o = [] } = e || {}, u = (m, p) => m.find((y) => y.guid === p), l = Array.isArray(r) && r.every(({ processingContext: m, rightsContext: p }) => (typeof m > "u" || u(a, m)) && u(o, p));
  new Ue([{
    rule: l,
    message: '"requestData" contains requests with invalid processing/rights context references'
  }]).validateWithThrowError();
}, Jr = new WeakSet(), di = function(e) {
  const r = te.validate(e, { $ref: "/RequestData" });
  new Ue([
    {
      rule: r.valid,
      message: 'Invalid "requestData" format/structure'
    }
  ]).validateWithThrowError();
}, Xr = new WeakSet(), pi = function(e) {
  var r, a;
  X(r = Xe, Jr, di).call(r, e), X(a = Xe, Hr, ci).call(a, e);
}, Gr = new WeakSet(), mi = function({ tokenType: e, token: r }) {
  return {
    "Content-Type": "application/json",
    Authorization: `${e} ${r}`
  };
}, Kr = new WeakSet(), vi = function(e, r) {
  const { responses: a = [] } = (e == null ? void 0 : e.data) || {}, o = a.map((u) => {
    const l = r.requests.find(({ guid: s }) => s === u.request);
    return {
      ...u,
      instances: u.instances.map(({ className: s, propertyName: m, value: p, error: y }, g) => {
        const A = { className: s, propertyName: m, transformed: p, original: l.instances[g].value };
        return y ? { ...A, error: y } : A;
      })
    };
  });
  return {
    ...e,
    data: {
      responses: o
    }
  };
}, j(Je, Wr), j(Je, Hr), j(Je, Jr), j(Je, Xr), j(Je, Gr), j(Je, Kr);
var Or, Zt, Yr, yi, Ur, Vt, Qr, gi, $r, Wt, et, wi, rt, xi, tt, Ei, nt, Ai;
const Ae = class {
  constructor() {
    j(this, Or);
    this.rightsContextsDictionary = {}, this.processingContextsDictionary = {}, this.requests = [];
  }
  get rightsContexts() {
    var e;
    return X(e = Ae, Ur, Vt).call(e, this.rightsContextsDictionary);
  }
  get processingContexts() {
    var e;
    return X(e = Ae, Ur, Vt).call(e, this.processingContextsDictionary);
  }
  /**
   * Generates a Request
   *
   * @param {object[]} instances - Array of instances: [{className: 'className', propertyName: 'propertyName', value: 'value', dependencies(optional): {name: 'value'}}]
   * @param {object} rightsContext - Object of rightsContext with evidences: {evidences: {name: 'value'}}]
   * @param {object|undefined} processingContext - Object of processingContext with evidences: {evidences: {name: 'value'}}]
   *
   */
  addRequest({ instances: e, rightsContext: r, processingContext: a }) {
    var m, p;
    X(m = Ae, et, wi).call(m, { instances: e, rightsContext: r, processingContext: a });
    const o = X(this, Or, Zt).call(this, "rights", r), u = a ? X(this, Or, Zt).call(this, "processing", a) : void 0, l = X(p = Ae, rt, xi).call(p, e), s = this.requests.find((y) => y.rightsContext === o && y.processingContext === u);
    return s ? s.instances = [...s.instances, ...l] : this.requests.push({
      guid: an(),
      rightsContext: o,
      processingContext: u,
      instances: l
    }), this;
  }
  build() {
    var o;
    X(o = Ae, nt, Ai).call(o, this);
    const { rightsContexts: e, processingContexts: r, requests: a } = this;
    return { rightsContexts: e, processingContexts: r, requests: a };
  }
};
let Le = Ae;
Or = new WeakSet(), Zt = function(e, r) {
  var s;
  const a = X(s = Ae, Qr, gi).call(s, e, r == null ? void 0 : r.evidences), o = this[`${e}ContextsDictionary`], u = Object.entries(o).find(([m, p]) => Yt(a, p)), l = u ? u[0] : an();
  return u || (o[l] = a), l;
}, Yr = new WeakSet(), yi = function(e) {
  return _t(e);
}, Ur = new WeakSet(), Vt = function(e) {
  return Object.entries(e).reduce((r, [a, o]) => {
    var u;
    return [...r, { guid: a, evidences: X(u = Ae, Yr, yi).call(u, o) }];
  }, []);
}, Qr = new WeakSet(), gi = function(e, r) {
  if (Array.isArray(r) && r.length > 0)
    return Wn(r, "name", "value");
  if (tr(r) && Object.keys(r).length > 0)
    return r;
  throw new Error(`Empty evidences or invalid evidences structure in "${e}Context"`);
}, $r = new WeakSet(), Wt = function({ dependencyContext: e, evidences: r, dependencies: a }) {
  var u;
  const o = e || r || a;
  return o ? Array.isArray(o) && o.length > 0 ? { evidences: o } : tr(o) && Object.keys(o).length > 0 ? o.evidences && (Array.isArray(o.evidences) || tr(o.evidences)) ? X(u = Ae, $r, Wt).call(u, o) : { evidences: _t(o) } : null : null;
}, et = new WeakSet(), wi = function(e) {
  const r = te.validate(e, { $ref: "/RequestInputData" });
  new Ue([
    {
      rule: r.valid,
      message: "Invalid format/structure of input params"
    }
  ]).validateWithThrowError();
}, rt = new WeakSet(), xi = function(e) {
  var r;
  return X(r = Ae, tt, Ei).call(r, e), e.filter(({ value: a }) => typeof a < "u").map((a) => {
    var y;
    const { className: o, propertyName: u, value: l } = a, s = X(y = Ae, $r, Wt).call(y, a), m = { className: o, propertyName: u, value: l }, p = { ...m, dependencyContext: s };
    return s ? p : m;
  });
}, tt = new WeakSet(), Ei = function(e) {
  new Ue([
    {
      rule: e.some((a) => Qt.validateValue(a)),
      message: 'Must be at least one valid instance object in "instances"'
    }
  ]).validateWithThrowError();
}, nt = new WeakSet(), Ai = function({ rightsContexts: e, requests: r }) {
  new Ue([
    {
      rule: r.length > 0,
      message: 'Use "addRequest" method for generating request'
    },
    {
      rule: e.length > 0,
      message: '"rightsContexts" is empty'
    }
  ]).validateWithThrowError();
}, j(Le, Yr), j(Le, Ur), j(Le, Qr), j(Le, $r), j(Le, et), j(Le, rt), j(Le, tt), j(Le, nt);
export {
  Je as EngineClient,
  Hn as RPSContext,
  Vn as RPSEvidence,
  Qt as RPSValue,
  Le as RequestBuilder,
  Bt as TokenProvider,
  co as utils
};
//# sourceMappingURL=index.mjs.map
