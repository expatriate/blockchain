var animate = (function() {
  function F(a) {
    return Array.isArray(a) ? a : Array.prototype.slice.call(a);
  }
  var k = function(a) {
      var c = a.length;
      return function d() {
        for (var e = arguments.length, f = Array(e), g = 0; g < e; g++)
          f[g] = arguments[g];
        return f.length < c
          ? function() {
              for (var a = arguments.length, c = Array(a), e = 0; e < a; e++)
                c[e] = arguments[e];
              return d.apply(void 0, f.concat(c));
            }
          : a.apply(void 0, f);
      };
    },
    r = function() {
      for (var a = arguments.length, c = Array(a), b = 0; b < a; b++)
        c[b] = arguments[b];
      return function(a) {
        return c.reduce(function(a, b) {
          return b(a);
        }, a);
      };
    },
    t = function(a) {
      return function() {
        return !a.apply(void 0, arguments);
      };
    },
    G = {
      linear: function(a, c, b, d) {
        return c + (a / d) * b;
      },
      easeInQuad: function(a, c, b, d) {
        return b * (a /= d) * a + c;
      },
      easeInCubic: function(a, c, b, d) {
        return b * (a /= d) * a * a + c;
      },
      easeInQuart: function(a, c, b, d) {
        return b * (a /= d) * a * a * a + c;
      },
      easeInQuint: function(a, c, b, d) {
        return b * (a /= d) * a * a * a * a + c;
      },
      easeInSine: function(a, c, b, d) {
        return -b * Math.cos((a / d) * (Math.PI / 2)) + b + c;
      },
      easeInExpo: function(a, c, b, d) {
        return 0 == a ? c : b * Math.pow(2, 10 * (a / d - 1)) + c;
      },
      easeInCirc: function(a, c, b, d) {
        return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c;
      },
      easeInElastic: function(a, c, b, d) {
        var e =
          4 >= arguments.length || void 0 === arguments[4] ? 500 : arguments[4];
        if (0 == a) return c;
        if (1 == (a /= d)) return c + b;
        var e = d * (1 - Math.min(e, 999) / 1e3),
          f = b < Math.abs(b) ? e / 4 : (e / (2 * Math.PI)) * Math.asin(b / b);
        return (
          -(
            b *
            Math.pow(2, 10 * --a) *
            Math.sin((2 * (a * d - f) * Math.PI) / e)
          ) + c
        );
      },
      easeInBack: function(a, c, b, d) {
        return b * (a /= d) * a * (2.70158 * a - 1.70158) + c;
      },
      easeOutQuad: function(a, c, b, d) {
        return -b * (a /= d) * (a - 2) + c;
      },
      easeOutCubic: function(a, c, b, d) {
        return b * ((a = a / d - 1) * a * a + 1) + c;
      },
      easeOutQuart: function(a, c, b, d) {
        return -b * ((a = a / d - 1) * a * a * a - 1) + c;
      },
      easeOutQuint: function(a, c, b, d) {
        return b * ((a = a / d - 1) * a * a * a * a + 1) + c;
      },
      easeOutSine: function(a, c, b, d) {
        return b * Math.sin((a / d) * (Math.PI / 2)) + c;
      },
      easeOutExpo: function(a, c, b, d) {
        return a == d ? c + b : b * (-Math.pow(2, (-10 * a) / d) + 1) + c;
      },
      easeOutCirc: function(a, c, b, d) {
        return b * Math.sqrt(1 - (a = a / d - 1) * a) + c;
      },
      easeOutElastic: function(a, c, b, d) {
        var e =
          4 >= arguments.length || void 0 === arguments[4] ? 500 : arguments[4];
        if (0 == a) return c;
        if (1 == (a /= d)) return c + b;
        e = d * (1 - Math.min(e, 999) / 1e3);
        return (
          b *
            Math.pow(2, -10 * a) *
            Math.sin(
              (2 *
                (a * d -
                  (b < Math.abs(b)
                    ? e / 4
                    : (e / (2 * Math.PI)) * Math.asin(b / b))) *
                Math.PI) /
                e
            ) +
          b +
          c
        );
      },
      easeOutBack: function(a, c, b, d) {
        return b * ((a = a / d - 1) * a * (2.70158 * a + 1.70158) + 1) + c;
      },
      easeOutBounce: function(a, c, b, d) {
        return (a /= d) < 1 / 2.75
          ? 7.5625 * b * a * a + c
          : a < 2 / 2.75
            ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c
            : a < 2.5 / 2.75
              ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c
              : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c;
      },
      easeInOutQuad: function(a, c, b, d) {
        return 1 > (a /= d / 2)
          ? (b / 2) * a * a + c
          : (-b / 2) * (--a * (a - 2) - 1) + c;
      },
      easeInOutCubic: function(a, c, b, d) {
        return 1 > (a /= d / 2)
          ? (b / 2) * a * a * a + c
          : (b / 2) * ((a -= 2) * a * a + 2) + c;
      },
      easeInOutQuart: function(a, c, b, d) {
        return 1 > (a /= d / 2)
          ? (b / 2) * a * a * a * a + c
          : (-b / 2) * ((a -= 2) * a * a * a - 2) + c;
      },
      easeInOutQuint: function(a, c, b, d) {
        return 1 > (a /= d / 2)
          ? (b / 2) * a * a * a * a * a + c
          : (b / 2) * ((a -= 2) * a * a * a * a + 2) + c;
      },
      easeInOutSine: function(a, c, b, d) {
        return (-b / 2) * (Math.cos((Math.PI * a) / d) - 1) + c;
      },
      easeInOutExpo: function(a, c, b, d) {
        return 0 == a
          ? c
          : a == d
            ? c + b
            : 1 > (a /= d / 2)
              ? (b / 2) * Math.pow(2, 10 * (a - 1)) + c
              : (b / 2) * (-Math.pow(2, -10 * --a) + 2) + c;
      },
      easeInOutCirc: function(a, c, b, d) {
        return 1 > (a /= d / 2)
          ? (-b / 2) * (Math.sqrt(1 - a * a) - 1) + c
          : (b / 2) * (Math.sqrt(1 - (a -= 2) * a) + 1) + c;
      },
      easeInOutElastic: function(a, c, b, d) {
        var e =
          4 >= arguments.length || void 0 === arguments[4] ? 500 : arguments[4];
        if (0 == a) return c;
        if (2 == (a /= d / 2)) return c + b;
        var e = d * (1 - Math.min(e, 999) / 1e3) * 1.5,
          f = b < Math.abs(b) ? e / 4 : (e / (2 * Math.PI)) * Math.asin(b / b);
        return 1 > a
          ? -0.5 *
              b *
              Math.pow(2, 10 * --a) *
              Math.sin((2 * (a * d - f) * Math.PI) / e) +
              c
          : b *
              Math.pow(2, -10 * --a) *
              Math.sin((2 * (a * d - f) * Math.PI) / e) *
              0.5 +
              b +
              c;
      },
      easeInOutBack: function(a, c, b, d) {
        var e = 1.70158;
        return 1 > (a /= d / 2)
          ? (b / 2) * a * a * (((e *= 1.525) + 1) * a - e) + c
          : (b / 2) * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + c;
      }
    },
    y = function(a) {
      return a[0];
    },
    H = function(a) {
      return a.reduce(function(a, b) {
        return a.concat(b);
      });
    },
    n = (function() {
      return Array.prototype.includes
        ? function(a, c) {
            return a.includes(c);
          }
        : function(a, c) {
            return a.some(function(a) {
              return a === c;
            });
          };
    })(),
    z = function(a) {
      for (
        var c = arguments.length, b = Array(1 < c ? c - 1 : 0), d = 1;
        d < c;
        d++
      )
        b[d - 1] = arguments[d];
      var e = H(b);
      return a.filter(function(a) {
        return t(n)(e, a);
      });
    },
    q = (function() {
      return Array.from
        ? function(a) {
            return Array.from(a.keys());
          }
        : function(a) {
            var c = [];
            a.forEach(function(a, d) {
              return c.push(d);
            });
            return c;
          };
    })(),
    I = (function() {
      var a = function(a) {
        var b = new Map();
        Object.keys(a).forEach(function(d) {
          return b.set(d, a[d]);
        });
        return b;
      };
      return function(c) {
        return c instanceof Map ? c : a(c);
      };
    })(),
    h = (function() {
      try {
        if (!new Map(new Map().set(null, null)).size) throw Error();
      } catch (a) {
        return function(a) {
          var b = new Map();
          a.forEach(function(a, c) {
            return b.set(c, a);
          });
          return b;
        };
      }
      return function(a) {
        return new Map(a);
      };
    })(),
    J = function(a) {
      return /^#/.test(a);
    },
    A = function(a) {
      return /^rgb/.test(a);
    },
    K = (function() {
      var a = function(a) {
          return 7 > a.length
            ? a.split("").reduce(function(a, b) {
                return a + b + b;
              })
            : a;
        },
        c = function(a) {
          return a.match(/[\d\w]{2}/g).map(function(a) {
            return parseInt(a, 16);
          });
        };
      return function(b) {
        if (A(b)) return b;
        b = r(a, c)(b);
        return "rgb(" + b[0] + ", " + b[1] + ", " + b[2] + ")";
      };
    })(),
    B = function(a) {
      a =
        "string" == typeof a
          ? /^[\#.]?[\w-]+$/.test(a)
            ? "." == a[0]
              ? document.getElementsByClassName(a.slice(1))
              : "#" == a[0]
                ? document.getElementById(a.slice(1))
                : document.getElementsByTagName(a)
            : document.querySelectorAll(a)
          : a;
      return Array.isArray(a)
        ? a
        : a.nodeType
          ? [a]
          : a instanceof NodeList || a instanceof HTMLCollection
            ? [].concat(F(a))
            : a.get();
    },
    m = new Map();
  "el delay begin complete loop direction".split(" ").forEach(function(a) {
    return m.set(a, null);
  });
  m.set("duration", 1e3);
  m.set("easing", "easeOutElastic");
  var L = (function() {
      var a = q(m).filter(function(a) {
          return m.get(a);
        }),
        c = function(b) {
          return a.every(function(a) {
            return b.has(a);
          });
        },
        b = function(b) {
          var c = h(b);
          a.forEach(function(a) {
            c.has(a) || c.set(a, m.get(a));
          });
          return c;
        };
      return function(a) {
        return c(a) ? a : b(a);
      };
    })(),
    M = (function() {
      var a = k(function(a, b) {
          return Array.isArray(a.get(b));
        }),
        c = function(b) {
          return p(b).every(a(b));
        },
        b = function(b) {
          return p(b).filter(t(a(b)));
        };
      return function(a) {
        if (c(a)) return a;
        var e = h(a);
        b(e).forEach(function(a) {
          return e.set(a, [C.get(a), e.get(a)]);
        });
        return e;
      };
    })(),
    N = (function() {
      var a = function(a) {
          return /\D$/.test(a);
        },
        c = k(function(b, c) {
          return a(c) || /scale/.test(b)
            ? c
            : /rotate|skew/.test(b)
              ? c + "deg"
              : c + "px";
        }),
        b = function(b, c) {
          return c.every(function(c) {
            return b.get(c).every(a);
          });
        };
      return function(a) {
        var e = p(a).filter(u);
        if (b(a, e)) return a;
        var f = h(a);
        e.forEach(function(b) {
          return f.set(b, a.get(b).map(c(b)));
        });
        return f;
      };
    })(),
    O = (function() {
      var a = k(function(a, b) {
          return a.get(b).some(J);
        }),
        c = function(b) {
          return !D(b).some(a(b));
        },
        b = function(b) {
          return D(b).filter(a(b));
        };
      return function(a) {
        if (c(a)) return a;
        var e = h(a);
        b(a).forEach(function(a) {
          return e.set(a, e.get(a).map(K));
        });
        return e;
      };
    })(),
    E = function(a) {
      var c = h(a);
      v(a).forEach(function(a) {
        return c.set(
          a,
          c
            .get(a)
            .slice()
            .reverse()
        );
      });
      return c;
    },
    P = r(
      I,
      L,
      M,
      N,
      O,
      function(a) {
        var c = h(a);
        c.set("el", B(a.get("el")));
        return c;
      },
      function(a) {
        return "reverse" == a.get("direction") ? E(a) : a;
      }
    ),
    v = (function() {
      var a = q(m),
        c = function(b) {
          return t(n)(a, b);
        };
      return function(a) {
        return q(a).filter(c);
      };
    })(),
    R = (function() {
      var a = r(y, A),
        c = k(function(b, c) {
          var e = b.get(c).map(Q),
            f = e[0],
            g = e[1],
            e = new Map();
          e.set("prop", c);
          e.set("from", f);
          e.set("to", g);
          e.set("isTransformFunction", u(c));
          e.set("isColor", a(b.get(c)));
          /\d$/.test(b.get("easing"))
            ? ((f = b.get("easing").split(" ")),
              (g = f[1]),
              e.set("easing", f[0]),
              e.set("frequency", g))
            : e.set("easing", b.get("easing"));
          return e;
        });
      return function(a, d) {
        return v(a).map(c(a));
      };
    })(),
    p = (function() {
      var a = function(a) {
        return n(w, a);
      };
      return function(c) {
        return q(c).filter(a);
      };
    })(),
    D = function(a) {
      return z(v(a), p(a));
    },
    w = "opacity translateX translateY scale rotate scaleX scaleY rotateX rotateY perspective skewX skewY translateZ rotateZ scaleZ".split(
      " "
    ),
    C = new Map();
  w.forEach(function(a) {
    return C.set(a, n(["opacity", "scale", "scaleX", "scaleY"], a) ? 1 : 0);
  });
  var u = (function() {
      var a = w.filter(function(a) {
        return "opacity" != a;
      });
      return function(c) {
        return n(a, c);
      };
    })(),
    S = function(a) {
      var c = p(a);
      if (c.length) {
        var b = [];
        c.some(u) && b.push("transform");
        n(c, "opacity") && b.push("opacity");
        var d = b.join();
        a.get("el").forEach(function(a) {
          a.style.willChange || (a.style.willChange = d);
        });
      }
    },
    T = function(a, c) {
      return c.reduce(function(b, c, e) {
        return b + a[e - 1] + c;
      });
    },
    Q = (function() {
      var a = /-?\d*\.?\d+/g;
      return function(c) {
        var b = new Map();
        b.set(
          "digits",
          ("string" == typeof c ? c : String(c)).match(a).map(Number)
        );
        b.set("others", ("string" == typeof c ? c : String(c)).split(a));
        return b;
      };
    })(),
    U = k(function(a, c, b) {
      var d = b
        .get("to")
        .get("digits")
        .map(function(d, f) {
          var g = b.get("from").get("digits")[f];
          if (g == d) return g;
          var h = d - g,
            g = G[b.get("easing")](
              c,
              g,
              h,
              a.get("duration"),
              b.get("frequency")
            );
          return b.get("isColor") ? Math.round(g) : g;
        });
      return T(d, b.get("to").get("others"));
    }),
    V = k(function(a, c) {
      var b = a.get(c.get("prop"));
      return y(b.slice(-1));
    }),
    W = (function() {
      var a = void 0;
      return k(function(c, b, d) {
        var e = void 0;
        c.forEach(function(a, c) {
          a.get("isTransformFunction")
            ? (e || (e = []), e.push(a.get("prop") + "(" + b[c] + ")"))
            : "opacity" == a.get("prop")
              ? (d.style.opacity = b[c])
              : d.setAttribute(a.get("prop"), b[c]);
        });
        e &&
          (a ||
            (a =
              "transform" in document.body.style
                ? "transform"
                : "-webkit-transform"),
          (d.style[a] = e.join(" ")));
      });
    })(),
    X = (function() {
      var a = function(a, b) {
        b.get("begin") && b.get("begin")(b.get("el"));
        requestAnimationFrame(a);
      };
      return function(c, b) {
        return b.get("delay")
          ? setTimeout(function() {
              return a(c, b);
            }, b.get("delay"))
          : a(c, b);
      };
    })(),
    Y = function(a) {
      return x(
        (function() {
          if ("alternate" == a.get("direction")) return E(a);
          if ("reverse" == a.get("direction")) {
            var c = h(a);
            c["delete"]("direction");
            return c;
          }
          return a;
        })()
      );
    },
    l = new Map(),
    Z = (function() {
      var a = 0;
      return function(c) {
        var b = a++,
          d = h(l);
        d.set(b, c);
        l = d;
        return b;
      };
    })(),
    x = function(a) {
      var c = P(a),
        b = R(c),
        d = Z(c.get("el")),
        e = new Map();
      S(c);
      X(function g(a) {
        if (l.has(d)) {
          e.has("start") || e.set("start", a);
          e.set("elapsed", a - e.get("start"));
          a = e.get("elapsed") < c.get("duration");
          var k = b.map(a ? U(c, e.get("elapsed")) : V(c));
          l.get(d).forEach(W(b, k));
          a
            ? requestAnimationFrame(g)
            : ((a = h(l)),
              a["delete"](d),
              (l = a),
              c.get("complete") && c.get("complete")(c.get("el")),
              c.get("loop") && Y(c));
        }
      }, c);
    };
  x.stop = function(a) {
    var c = B(a),
      b = h(l);
    b.forEach(function(a, e) {
      var f = z(a, c);
      f.length ? b.set(e, f) : b["delete"](e);
    });
    l = b;
  };
  return x;
})();
"undefined" != typeof module && module.exports && (module.exports = animate);
var stickyElements = (function() {
  "use strict";
  var t = {};
  (t.classCallCheck = function(t, s) {
    if (!(t instanceof s))
      throw new TypeError("Cannot call a class as a function");
  }),
    (t.createClass = (function() {
      function t(t, s) {
        for (var i = 0; i < s.length; i++) {
          var e = s[i];
          (e.enumerable = e.enumerable || !1),
            (e.configurable = !0),
            "value" in e && (e.writable = !0),
            Object.defineProperty(t, e.key, e);
        }
      }
      return function(s, i, e) {
        return i && t(s.prototype, i), e && t(s, e), s;
      };
    })());
  var s = (function() {
      function s(i) {
        var e =
          arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        t.classCallCheck(this, s),
          (this.el = i),
          this.setOpts(e),
          this.setEvents();
      }
      return (
        t.createClass(s, [
          {
            key: "setOpts",
            value: function(t) {
              (this.pointer = t.pointer),
                (this.positions = {}),
                (this.isGripped = !1),
                (this.stickiness = {}),
                (this.grip = { x: 0, y: 0 }),
                (this.duration = t.duration || 450),
                this.setStickiness(t);
            }
          },
          {
            key: "setEvents",
            value: function() {
              var t = this,
                s = this.el,
                i = ["enter", "leave", "move"];
              s._stickyEvents &&
                (i.map(function(i) {
                  t.pointer
                    ? s.removeEventListener(
                        "pointer" + i,
                        s._stickyEvents[i],
                        !1
                      )
                    : s.removeEventListener(
                        "mouse" + i,
                        s._stickyEvents[i],
                        !1
                      );
                }),
                (s._stickyEvents = void 0)),
                (s._stickyEvents = {
                  enter: function(s) {
                    return t.onEnter(s);
                  },
                  leave: function(s) {
                    return t.onLeave(s);
                  },
                  move: function(s) {
                    console.log(s)
                    return t.onMove(s);
                  }
                }),
                i.map(function(i) {
                  t.pointer
                    ? s.addEventListener("pointer" + i, s._stickyEvents[i], !1)
                    : s.addEventListener("mouse" + i, s._stickyEvents[i], !1);
                });
            }
          },
          {
            key: "setStickiness",
            value: function(t) {
              var s = {
                  1: 10,
                  2: 6.6,
                  3: 4.5,
                  4: 3.2,
                  5: 2.4,
                  6: 1.9,
                  7: 1.6,
                  8: 1.4,
                  9: 1.3,
                  10: 1.2,
                  0: 0
                },
                i = { stickiness: { x: 3, y: 3 } };
              (t.stickiness || 0 === t.stickiness) &&
                ("number" == typeof t.stickiness &&
                  (i.stickiness = { x: t.stickiness, y: t.stickiness }),
                (t.stickiness.x || 0 === t.stickiness.x) &&
                  (i.stickiness.x = t.stickiness.x),
                (t.stickiness.y || 0 === t.stickiness.y) &&
                  (i.stickiness.y = t.stickiness.y)),
                (this.stickiness.x = s[Math.min(10, i.stickiness.x)]),
                (this.stickiness.y = s[Math.min(10, i.stickiness.y)]);
            }
          },
          {
            key: "getPositions",
            value: function(t, s) {
              var i = 0 !== this.stickiness.x ? t / this.stickiness.x : 0,
                e = 0 !== this.stickiness.y ? s / this.stickiness.y : 0;
              return { posx: i, posy: e };
            }
          },
          {
            key: "onEnter",
            value: function(t) {
              var s = this.el,
                i = s.offsetWidth,
                e = s.offsetHeight,
                n = $(s).offset().left,
                o = $(s).offset().top,
                r = window.pageYOffset || document.documentElement.scrollTop,
                a = {
                  width: i,
                  height: e,
                  centerx: n + i / 2,
                  centery: o + e / 2 - r
                };
              this.positions = a;
            }
          },
          {
            key: "onLeave",
            value: function(t) {
              if (this.lastGripped) {
                var s = new Date().getTime();
                if (s - this.lastGripped < 30) return;
              }
              var i = this.el;
              animate.stop(i);
              var e = this.getPositions(
                  this.positions.deltax,
                  this.positions.deltay
                ),
                n = e.posx,
                o = e.posy;
              this.isGripped &&
                ((this.lastGripped = new Date().getTime()),
                animate({
                  el: i,
                  translateX: [n, 0],
                  translateY: [o, 0],
                  duration: this.duration
                })),
                (this.isGripped = !1);
            }
          },
          {
            key: "onMove",
            value: function(t) {
              var s = this.el;
              animate.stop(s);
              var i = t.clientX,
                e = t.clientY,
                n = {
                  x:
                    Math.abs(this.positions.deltax) <
                    this.positions.width / this.grip.x,
                  y:
                    Math.abs(this.positions.deltay) <
                    this.positions.height / this.grip.y
                };
                //console.log(t)
              if (
                (n.x && n.y && (this.isGripped = !0),
                (this.positions.deltax = -(this.positions.centerx - i)),
                (this.positions.deltay = -(this.positions.centery - e)),
                this.isGripped)
              ) {
                var o = this.getPositions(
                    this.positions.deltax,
                    this.positions.deltay
                  ),
                  r = o.posx,
                  a = o.posy;
                s.style.transform = "translate3d(" + r + "px, " + a + "px, 0)";
              }
            }
          }
        ]),
        s
      );
    })(),
    i = (function() {
      return function(t, i) {
        for (
          var e = [], n = [].slice.call(document.querySelectorAll(t)), o = 0;
          o < n.length;
          o++
        )
          e.push(new s(n[o], i));
        return e;
      };
    })();
  return i;
})();
