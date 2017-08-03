var BigEval = function() {
    this.err = 0, this.errMsg = "", this.errBR = "IMPROPER_BRACKETS", this.errMS = "MISSING_OPERATOR_AT_", this.errMN = "MISSING_OPERAND_AT_", this.errIC = "INVALID_CHAR_AT_", this.errFN = "INVALID_FUNCTION_", this.errVD = "UNDEFINED_VARIABLE_", this.errFL = "FUNCTION_LIMIT_EXCEEDED_BY_", this.order = ["!", "@", "\\/*%", "+-", "&", "^", "|"];
    var r = this.CONSTANT = {};
    r.PI = Math.PI, r.PI_2 = r.PI / 2, r.LOG2E = Math.LOG2E, r.DEG = r.PI / 180, r.E = Math.E, r.INFINITY = "Infinity", r.NaN = "NaN"
};
BigEval.prototype.exec = function(r) {
    if (this.err = 0, this.errMsg = "", this.validate(r), this.err) return this.errMsg;
    r = r.replace(/\*\*/g, "@");
    var t = /[a-z0-9][ \t]+[a-z0-9\.]/gi;
    if (t.exec(r)) return this.err = 1, this.errMsg = this.errMS + t.lastIndex;
    var e = /[\+\-\\\/\*\@\%\&\^\|][ \t]*([\\\/\*\@\!\%\&\^\|\)]|$)/g;
    return e.exec(r) ? (this.err = 1, this.errMsg = this.errMN + e.lastIndex) : (r = this.plusMinus(r.replace(/[ \t]/g, "")), r = this.solve(r), "+" == r.charAt(0) && (r = r.slice(1)), r)
}, BigEval.prototype.solve = function(r) {
    var t = r.charAt(0);
    if (!t.match(/[a-z0-9\.\+\-\(]/i)) return this.err = 1, this.errMsg = this.errIC;
    r = this.addPlusSign(r);
    for (var e, i, s, h = r.indexOf("("); - 1 != h;) {
        for (var n = 1, a = h + 1; a < r.length; a++)
            if ("(" == r[a]) n++;
            else if (")" == r[a] && (n--, 0 == n)) {
            e = a;
            break
        }
        if (r.charAt(h - 1).match(/[a-z0-9_]/i) ? (i = r.slice(0, h).match(/[a-z0-9_]+$/i), s = this.solve(r.slice(h + 1, e)), s = this.solveFunc(s, i[0]) + "", r = r.slice(0, h - i[0].length) + s + r.slice(e + 1)) : r = r.slice(0, h) + this.solve(r.slice(h + 1, e)) + r.slice(e + 1), this.err) return this.errMsg;
        h = r.indexOf("(")
    }
    if (-1 != r.indexOf(",")) return this.addPlusSign(r);
    for (var o, l, u, c, p, f, g, d, N = 0, a = 0; a < this.order.length; a++)
        for (f = this.order[a], "+-" == f && (r = this.plusMinus(r), N = 1), o = this.leastIndexOf(r, f, 1); o > 0;)
            if (l = r.slice(0, o).match(/[\-\+]*(\de\-|\de\+|[a-z0-9_\.])+$/i), u = r.slice(o + 1).match(/[\-\+]*(\de\-|\de\+|[a-z0-9_\.])+/i), null == u && (u = [""]), null != l)
                if (N || l[0].match(/[\-\+]/) && (l[0] = l[0].slice(1)), N && "e" == l[0].charAt(l[0].length - 1) && l[0].charAt(l[0].length - 2).match(/\d/)) o = this.leastIndexOf(r, f, o + 1);
                else {
                    if (p = r.charAt(o), g = this.parseVar(this.plusMinus(l[0])), d = this.parseVar(this.plusMinus(u[0])), this.err) return this.errMsg;
                    "!" == p ? ("+" != l[0].charAt(0) && "-" != l[0].charAt(0) || (l[0] = l[0].slice(1)), g = this.parseVar(l[0]), c = this.fac(g) + "", u = [""]) : ("/" == p || "\\" == p ? c = this.div(g, d) : "*" == p ? c = this.mul(g, d) : "+" == p ? c = this.add(g, d) : "-" == p ? c = this.sub(g, d) : "@" == p ? c = this.pow(g, d) : "%" == p ? c = this.mod(g, d) : "&" == p ? c = this.and(g, d) : "^" == p ? c = this.xor(g, d) : "|" == p && (c = this.or(g, d)), c = this.addPlusSign(c + "")), r = r.slice(0, o - l[0].length) + c + r.slice(o + u[0].length + 1), o = this.leastIndexOf(r, f, 1)
                }
    else o = this.leastIndexOf(r, f, o + 1);
    return r = this.addPlusSign(r), this.parseVar(r)
}, BigEval.prototype.validate = function(r) {
    for (var t = [], e = 0; e < r.length; e++)
        if ("(" == r[e]) t.push(0);
        else if (")" == r[e]) {
        if (!(t.length > 0)) {
            this.makeError(this.errBR);
            break
        }
        t.pop()
    }
    0 == this.err && 0 != t.length && this.makeError(this.errBR)
}, BigEval.prototype.solveFunc = function(r, t) {
    var e, i = r.split(","),
        s = 0,
        h = 0;
    if ("function" == typeof this[t]) h = 1;
    else if ("function" == typeof Math[t]) e = Math[t], s = 1;
    else {
        if ("function" != typeof window[t]) return this.makeError(this.errFN + t), 0;
        e = window[t]
    }
    for (var n = 0; n < i.length; n++) i[n] = s ? Number(this.solve(i[n])) : this.solve(i[n]);
    return 1 == i.length ? h ? this[t].call(this, i[0]) : e(i[0]) : 2 == i.length ? h ? this[t].call(this, i[0], i[1]) : e(i[0], i[1]) : 3 == i.length ? h ? this[t].call(this, i[0], i[1], i[2]) : e(i[0], i[1], i[2]) : 4 == i.length ? h ? this[t].call(this, i[0], i[1], i[2], i[3]) : e(i[0], i[1], i[2], i[3]) : this.makeError(this.errFL + t)
}, BigEval.prototype.parseVar = function(r) {
    var t;
    if (t = r.match(/^[\+\-]?[a-z][a-z0-9_]*$/i)) {
        var e = "";
        return "-" != t[0].charAt(0) && "+" != t[0].charAt(0) || (e = t[0].slice(0, 1), t[0] = t[0].slice(1)), "undefined" != typeof this.CONSTANT[t[0].toUpperCase()] ? e + this.CONSTANT[t[0].toUpperCase()] : "undefined" != typeof this.CONSTANT[t[0]] ? e + this.CONSTANT[t[0]] : this.makeError(this.errVD + t[0])
    }
    return r
}, BigEval.prototype.leastIndexOf = function(r, t, e) {
    for (var i, s = -1, h = 0; h < t.length; h++) i = r.indexOf(t[h], e), -1 != i && (-1 == s ? s = i : s > i && (s = i));
    return s
}, BigEval.prototype.plusMinus = function(r) {
    return r.replace(/\+\+/g, "+").replace(/\+\-/g, "-").replace(/\-\+/g, "-").replace(/\-\-/g, "+")
}, BigEval.prototype.addPlusSign = function(r) {
    return "-" != r.charAt(0) && "+" != r.charAt(0) && (r = "+" + r), r
}, BigEval.prototype.makeError = function(r) {
    return this.err = 1, this.errMsg = r
}, BigEval.prototype.add = function(r, t) {
    return Number(r) + Number(t)
}, BigEval.prototype.sub = function(r, t) {
    return Number(r) - Number(t)
}, BigEval.prototype.mul = function(r, t) {
    return Number(r) * Number(t)
}, BigEval.prototype.div = function(r, t) {
    return Number(r) / Number(t)
}, BigEval.prototype.pow = function(r, t) {
    return Math.pow(Number(r), Number(t))
}, BigEval.prototype.fac = function(r) {
    var t = "1";
    r = Number(r);
    for (var e = 2; r >= e; e++) t = this.mul(t, e);
    return t
}, BigEval.prototype.mod = function(r, t) {
    return Number(r) % Number(t)
}, BigEval.prototype.and = function(r, t) {
    return Number(r) & Number(t)
}, BigEval.prototype.xor = function(r, t) {
    return Number(r) ^ Number(t)
}, BigEval.prototype.or = function(r, t) {
    return Number(r) | Number(t)
}, "undefined" != typeof module && module.exports && "undefined" != typeof exports && (module.exports = BigEval);