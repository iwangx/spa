webpackJsonp([2], {
    264: function (t, e, n) {
        (function (e, a) {
            "use strict";
            function c(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            var o = n(70), r = n(44), s = n(271), i = c(s), u = n(270), l = c(u), f = e.createClass({
                displayName: "About",
                getInitialState: function () {
                    return {}
                },
                click: function () {
                    var t = this.props.actions;
                    t.test()
                },
                render: function () {
                    var t = this.props.todo;
                    this.props.actions;
                    return e.createElement("div", {
                        className: a(l["default"].style, l["default"].back, l["default"].aboutA),
                        onClick: this.click
                    }, t.name, e.createElement("div", {className: "c"}))
                }
            });
            t.exports = (0, o.connect)(function (t) {
                return {todo: t.about}
            }, function (t) {
                return {actions: (0, r.bindActionCreators)(i["default"], t)}
            })(f)
        }).call(e, n(5), n(273))
    }, 268: function (t, e, n) {
        e = t.exports = n(125)(), e.push([t.id, ".style-1yXWTCUy{color:#7c2845}.back-2QF7naWo{background:url(" + n(269) + ") no-repeat;height:265px;width:241px;-webkit-transform:translateZ(0);transform:translateZ(0)}.c{background:#ff0;height:50px;width:50px}.about-a-1OFd7HWC{background:#000}", ""]), e.locals = {
            style: "style-1yXWTCUy",
            style: "style-1yXWTCUy",
            back: "back-2QF7naWo",
            back: "back-2QF7naWo",
            "about-a": "about-a-1OFd7HWC",
            aboutA: "about-a-1OFd7HWC"
        }
    }, 269: function (t, e, n) {
        t.exports = n.p + "test-a1c66524.jpeg"
    }, 270: function (t, e, n) {
        var a = n(268);
        "string" == typeof a && (a = [[t.id, a, ""]]);
        n(126)(a, {});
        a.locals && (t.exports = a.locals)
    }, 271: function (t, e, n) {
        "use strict";
        var a = n(128);
        t.exports = {
            test: function () {
                return {type: a.TEST}
            }
        }
    }, 273: function (t, e) {
        function n() {
            function t(t) {
                n.each(t.split(" "), function (t) {
                    e[t] = !!t
                })
            }

            var e = {}, a = {}, c = "";
            return n.each([].slice.call(arguments), function (e) {
                switch (n.getType(e)) {
                    case"string":
                    case"number":
                        t(e);
                        break;
                    case"array":
                        t(n.apply(null, e));
                        break;
                    case"element":
                        t(n(e.className || ""));
                        break;
                    case"nodelist":
                        t(n.apply(null, [].slice.call(e)));
                        break;
                    case"jquery":
                        t(n.apply(null, e.get()));
                        break;
                    case"object":
                        a = n.extend(a, e)
                }
            }), e = n.extend(e, a), n.each(e, function (t, e) {
                t && (c += " " + e)
            }), c.substr(1)
        }

        n.setTo = function (t) {
            var e = n.getType(t);
            return "element" === e && (t = [t]), "jquery" === e && (t = t.get()), "nodelist" === e && (t = [].slice.call(t)), function () {
                var e = n.apply(null, arguments);
                n.each(t, function (t) {
                    t.className = e
                })
            }
        }, n.each = function (t, e) {
            var a = n.getType(t);
            if ("array" === a)for (var c = 0; c < t.length; c++)e(t[c], c);
            if ("object" === a)for (var o in t)e(t[o], o)
        }, n.getType = function (t) {
            var e = Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
            return "object" === e && t.jquery ? "jquery" : e.indexOf("element") > 1 ? "element" : e
        }, n.extend = function (t, e) {
            var a = {}, c = [t, e];
            return n.each(c, function (t) {
                n.each(t, function (e, n) {
                    t.hasOwnProperty(n) && (a[n] = e)
                })
            }), a
        }, "undefined" != typeof t && t.exports && (t.exports = n)
    }
});