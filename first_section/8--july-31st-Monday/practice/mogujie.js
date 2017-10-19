define("module/variable", [], function() {
    return {
        ITEM_TAG: {
            4: "brand",
            8: "haitao"
        },
        ITEM_STATUS_MAP: ["", "alertable", "upcoming", "ongoing", "soldout", "unpay"],
        fastbuySiteUrl: "//qiang.mogujie.com",
        goodsExposureLogData: {
            acms: [],
            iids: [],
            index: [],
            cpcs: []
        }
    }
});
define("fastbuy/mCubeLoadData", [], function() {
    function a(a) {
        var i = a.find(".ajax_param"),
            t = {};
        return i.each(function() {
            var a = $(this),
                i = t[a.attr("param-name")];
            if (i) if (t[a.attr("param-name")] instanceof Array) t[a.attr("param-name")].push(a.val());
            else {
                var n = t[a.attr("param-name")];
                t[a.attr("param-name")] = [], t[a.attr("param-name")].push(n), t[a.attr("param-name")].push(a.val())
            } else t[a.attr("param-name")] = a.val()
        }), t
    }
    var i = {},
        t = navigator.userAgent,
        n = t.match(/Chrome\/([\d.]+)/),
        e = null,
        o = Date.now ||
            function() {
                return (new Date).getTime()
            }, r = 100, s = {
            isAjaxEnd: !1,
            initLoaderTimer: function(a) {
                var i = {
                    bottomHeight: 800
                };
                this.options = i, this.isLoading = !1;
                var t = this,
                    e = o(),
                    s = null;
                $(window).off("scroll.fastbuy").on("scroll.fastbuy", function() {
                    var i = o();
                    i - e > r && (e = i, t.isAllowAjax(a)), clearTimeout(s), s = setTimeout(function() {
                        if (n) t.isAllowAjax(a);
                        else {
                            var i = o();
                            i - e > r && (e = i, t.isAllowAjax(a))
                        }
                    }, 200)
                })
            },
            isAllowAjax: function(a) {
                var i = s;
                if (a.paging) {
                    var i = this;
                    if (!i.isLoading) {
                        var t = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                        t + $(window).height() > $(document).height() - i.options.bottomHeight && i.getGoodsAjax(a)
                    }
                }
            },
            getGoodsAjax: function(t) {
                if (t) {
                    var n = s;
                    n.isLoading = !0;
                    var o = t.paramContainer || $(".MCUBE_MOD_ID_XXX"),
                        r = t.url || o.find(".ajax_url").val(),
                        m = t.data || a(o),
                        u = t.success,
                        l = t.paging || !1,
                        d = [];
                    for (var f in m) d.push(m[f]);
                    if (e = d.join("_"), i[e]) {
                        n.isLoading = !1;
                        var m = i[e];
                        m.isOldAjax = !0, u && (t.paging = u(m), l = t.paging || !1), n.initLoaderTimer && n.initLoaderTimer(t)
                    } else $.ajax({
                        url: r,
                        data: m,
                        dataType: "jsonp",
                        type: "get",
                        success: function(a) {
                            i[e] = a, u && (t.paging = u(a), l = t.paging || !1), n.initLoaderTimer && n.initLoaderTimer(t)
                        },
                        complete: function() {
                            n.isLoading = !1
                        }
                    })
                }
            }
        };
    return s.getGoodsAjax
});
define("module/goodsFollowRecord", ["module/variable"], function(a) {
    $("body").on("click", ".item.upcoming a, .item.alertable a", function() {
        var o = $(this),
            t = o.data("rush-id");
        $.ajax({
            url: (a.fastbuySiteUrl || "") + "/jsonp/fastBuyFollowActionLet/1",
            data: {
                rushId: t,
                type: 1
            },
            dataType: "jsonp",
            type: "get"
        })
    })
});
define("module/lazy-load", function() {
    window.MoGu = window.MoGu || {};
    var e = navigator.userAgent;
    MoGu.isUseWebp = !1;
    var t = {
        imgKeyArr: ["80", "100", "160", "180", "200", "240", "280", "300", "320", "360", "400", "440", "480", "520", "540", "560", "600", "640"],
        imgKeyMap: {
            80: {
                "1:1": "80x80",
                "7:9": "80x103",
                "3:4": "80x107",
                "2:3": "80x120",
                999: "80x999"
            },
            100: {
                "1:1": "100x100",
                "7:9": "100x129",
                "3:4": "100x134",
                "2:3": "100x150",
                999: "100x999"
            },
            160: {
                "1:1": "160x160",
                "7:9": "160x206",
                "3:4": "160x214",
                "2:3": "160x240",
                999: "160x999"
            },
            180: {
                "1:1": "180x180",
                "7:9": "180x232",
                "3:4": "180x240",
                "2:3": "180x270",
                999: "180x999"
            },
            200: {
                "1:1": "200x200",
                "7:9": "200x258",
                "3:4": "200x268",
                "2:3": "200x300",
                999: "200x999"
            },
            240: {
                "1:1": "240x240",
                "7:9": "240x308",
                "3:4": "240x320",
                "2:3": "240x360",
                999: "240x999"
            },
            280: {
                "1:1": "280x280",
                "7:9": "280x360",
                "3:4": "280x374",
                "2:3": "280x420",
                999: "280x999"
            },
            300: {
                "1:1": "300x300",
                "7:9": "300x386",
                "3:4": "300x400",
                "2:3": "300x450",
                999: "300x999"
            },
            320: {
                "1:1": "320x320",
                "7:9": "320x412",
                "3:4": "320x428",
                "2:3": "320x480",
                999: "320x999"
            },
            360: {
                "1:1": "360x360",
                "7:9": "360x463",
                "3:4": "360x480",
                "2:3": "360x540",
                999: "360x999"
            },
            400: {
                "1:1": "400x400",
                "7:9": "400x515",
                "3:4": "400x534",
                "2:3": "400x600",
                999: "400x999"
            },
            440: {
                "1:1": "440x440",
                "7:9": "440x566",
                "3:4": "440x587",
                "2:3": "440x660",
                999: "440x999"
            },
            480: {
                "1:1": "480x480",
                "7:9": "480x618",
                "3:4": "480x640",
                "2:3": "480x720",
                999: "480x999"
            },
            520: {
                "1:1": "520x520",
                "7:9": "520x670",
                "3:4": "520x694",
                "2:3": "520x780",
                999: "520x999"
            },
            540: {
                "1:1": "540x540",
                "7:9": "540x695",
                "3:4": "540x720",
                "2:3": "540x810",
                999: "540x999"
            },
            560: {
                "1:1": "560x560",
                "7:9": "560x720",
                "3:4": "560x747",
                "2:3": "560x840",
                999: "560x999"
            },
            600: {
                "1:1": "600x600",
                "7:9": "600x772",
                "3:4": "600x800",
                "2:3": "600x900",
                999: "600x999"
            },
            640: {
                "1:1": "640x640",
                "7:9": "640x824",
                "3:4": "640x854",
                "2:3": "640x960",
                999: "640x999"
            }
        },
        imgQuality: 70,
        dprDefMaxWidth: 640,
        dprDefRatio: "999",
        defCode: "999x999.v1c0",
        clientHeight: null,
        clientWidth: null,
        dpr: null,
        dprClentWidth: null
    };
    t.ua = e, t.android = e.match(/(Android);?[\s\/]+([\d.]+)?/), t.ios = e.match(/(iPad).*OS\s([\d_]+)/) || e.match(/(iPod)(.*OS\s([\d_]+))?/) || e.match(/(iPhone\sOS)\s([\d_]+)/), t.wp = e.match(/Windows Phone ([\d.]+)/), t.is_mobile = t.android || t.ios || t.wp, t.is_ie_old = e.indexOf("MSIE") > 0, t.init = function() {
        var e = this;
        e.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, e.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, window.addEventListener && window.addEventListener("resize", function() {
            e.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, e.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        }, !1), e.dpr = window.devicePixelRatio >= 1 ? window.devicePixelRatio : 1, e.dprClentWidth = e.clientWidth * e.dpr, e.checkSupportWebp(), e.is_mobile && e.getAppInfo()
    }, t.setWebpFlag = function(e) {
        MoGu.isUseWebp = !! e
    }, t.checkSupportWebp = function() {
        var e = this,
            t = new Image;
        t.onload = function() {
            e.setWebpFlag(!0)
        }, t.onerror = function() {
            e.ios && "undefined" != typeof localStorage ? e.setWebpFlag("true" === localStorage.getItem("isWebpEnable")) : e.setWebpFlag(!1)
        }, t.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="
    }, t.getDefSuffix = function(e, t) {
        var i = this,
            n = "";
        if (i.android || i.ios || i.wp) {
            var o = i.dprClentWidth;
            375 >= o ? n = "375x9999.v1c7E" : o > 375 && 750 >= o ? n = "750x9999.v1c7E" : o > 750 && (n = "1125x9999.v1c7E")
        } else n = i.defCode;
        return i.getCodeSuffix(e, n, t)
    }, t.getWidthSuffix = function(e, t, i, n) {
        var o = this;
        "undefined" == typeof n && (n = !0);
        var d = o.defCode,
            r = n ? o.dpr : 1,
            a = parseInt(t) * r;
        return a && a > 0 && 2e3 >= a && (d = 100 * Math.ceil(a / 100) + "x9999.v1c7E"), o.getCodeSuffix(e, d, i)
    }, t.getGoodsRatioSuffix = function(e, t, i, n, o) {
        var d = this;
        "undefined" == typeof o && (o = !0);
        var r = d.defCode,
            a = "",
            s = ".v1cAC",
            l = o ? d.dpr : 1;
        switch (i) {
            case "1:1":
            case "7:9":
            case "3:4":
            case "2:3":
                a = i;
                break;
            default:
                a = d.dprDefRatio, s = ".v1c96"
        }
        var c = parseInt(t) * l;
        (!c || 0 > c || c > d.dprDefMaxWidth) && (c = d.dprDefMaxWidth);
        for (var f = 0; f < d.imgKeyArr.length; f++) {
            var g = d.imgKeyArr[f];
            if (g >= c || g == d.dprDefMaxWidth) {
                r = d.imgKeyMap[g][a] + s;
                break
            }
        }
        return d.getCodeSuffix(e, r, n)
    }, t.getHalfSuffix = function(e, t) {
        var i = this,
            n = "";
        return i.dpr < 2 ? (n = "50000x50000.v1c7E", e = i.getCodeSuffix(e, n, t)) : e = i.getDefSuffix(e, t), e
    }, t.getCodeSuffix = function(e, t, i) {
        var n = this,
            o = e;
        if (!e || !t || "no" == t || e.indexOf(".webp") > 0 || e.indexOf(".gif") > 0) return e;
        if (-1 === e.indexOf("mogucdn")) return e;
        if (e.indexOf(".jpg") < 0 && e.indexOf(".png") < 0) return e;
        if (e.indexOf(".jpg") > 0 && e.indexOf(".png") > 0) return e;
        var d = "",
            r = e.split(".");
        if ("jpg" == r[r.length - 1]) d = "jpg";
        else {
            if ("png" != r[r.length - 1]) return e;
            d = "png"
        }
        var t = "_" + t,
            a = "." + n.imgQuality + ".";
        if (e.indexOf(".png_") < 0 && e.indexOf(".jpg_") < 0 && e.indexOf("." + d) == e.length - 4 && (e = e + t + a + d), MoGu.isUseWebp && i !== !1) {
            if (e.indexOf("." + d + "_") > 0) {
                var s = e.split(".");
                s[s.length - 1] == d && (s[s.length - 1] = "webp", e = s.join("."))
            }
        } else if ("png" == d) return o;
        return e
    }, t.getAppInfo = function() {
        var e = this;
        "undefined" != typeof hdp ? (hdp["do"]("mgj.device.getInfo").then(function(t) {
            t && t.networkType && 4 != t.networkType && 5 != t.networkType && (e.imgQuality = 50)
        })["catch"](function(e) {}), e.ios && "undefined" != typeof localStorage && hdp["do"]("hybrid.settings.getWebpEnabled").then(function(e) {
            localStorage.setItem("isWebpEnable", e)
        })["catch"](function() {
            localStorage.setItem("isWebpEnable", !1)
        })) : "undefined" != typeof document && document.addEventListener && document.addEventListener("deviceready", function() {
            window.mgj && mgj.device && mgj.device.getInfo && mgj.device.getInfo(function(t) {
                t && t.networkType && 4 != t.networkType && 5 != t.networkType && (e.imgQuality = 50)
            }), e.ios && "undefined" != typeof localStorage && window.hybrid && hybrid.settings && hybrid.settings.getWebpEnabled && hybrid.settings.getWebpEnabled(function(e) {
                localStorage.setItem("isWebpEnable", e)
            }, function() {
                localStorage.setItem("isWebpEnable", !1)
            })
        }, function() {})
    }, MoGu.ImgUrlTool || (t.init(), MoGu.ImgUrlTool = t);
    var i = Date.now ||
        function() {
            return (new Date).getTime()
        }, n = function(e) {
        this.opts = $.extend({}, this.defaults, e), this.init(), this.scrollIndTime = t.is_ie_old ? 400 : 200, this.fistCheck = !1, this.imgErrorClock = {}
    };
    n.prototype = {
        init: function() {
            var e = this,
                t = i();
            $(window).scroll(function(n) {
                var o = i();
                o - t > e.scrollIndTime && (t = o, e.checkImages())
            }), setTimeout(function() {
                e.fistCheck = !0, e.checkImages()
            }, 0)
        },
        getInActiveFlag: function(e, t) {
            var i, n, o, d, r = t[0],
                a = r.getBoundingClientRect && r.getBoundingClientRect();
            a ? (i = a.top + e.scrollTop, n = a.bottom + e.scrollTop, o = a.left, d = a.right) : (i = t.offset().top, n = i + t.height(), o = t.offset().left, d = o + t.width());
            var s = n > e.top && i < e.bot,
                l = d > e.left && o < e.right;
            return !(!s || !l || "none" == t.css("display") || "hidden" == t.css("visibility") || 0 == t.css("opacity") || !t[0].offsetWidth)
        },
        checkModRow: function(e) {
            var t = this,
                i = $(".mod_row");
            return i.each(function(i, n) {
                var o = $(n);
                t.getInActiveFlag(e, o) ? o.addClass("J_mod_row_show") : o.removeClass("J_mod_row_show")
            }), $(".J_mod_row_show")
        },
        checkImages: function(e) {
            var i = this;
            if (i.fistCheck) {
                var n = document.documentElement.scrollTop || document.body.scrollTop,
                    o = i.opts.showDistance,
                    d = {};
                d.top = n - o, d.bot = n + (t.clientHeight || document.documentElement.clientHeight || document.body.clientHeight) + o, d.left = 0, d.right = t.clientWidth, d.scrollTop = n;
                var r = $("body");
                e ? r = e : window.MOGU_MF_DEVELOP_ENV && $(".mod_row").length > 0 && (r = i.checkModRow(d)), setTimeout(function() {
                    for (var e = r.hasClass(i.opts.objsClassName) ? r : r.find("." + i.opts.objsClassName), t = e.length, n = 0; t > n; n++) {
                        var o = e.eq(n);
                        if (o.attr("img-src")) {
                            var a = o.find(".J_dynamic_img"),
                                s = o.hasClass("J_loading"),
                                l = o.attr("need-remove") ? o.attr("need-remove") : "no";
                            if (!a.length || "yes" == l) {
                                var c = i.getInActiveFlag(d, o);
                                c ? a.length || s || i.loadingImage(o) : "yes" == l && (a.length || s) && (o.removeClass("J_loading"), a.remove())
                            }
                        }
                    }
                }, 0)
            }
        },
        preloadImages: function(e) {
            var t = this;
            if (e && e.length && e.hasClass && e.find) for (var i = e.hasClass(t.opts.objsClassName) ? e : e.find("." + t.opts.objsClassName), n = i.length, o = 0; n > o; o++) {
                var d = i.eq(o);
                if (d.attr("img-src")) {
                    var r = d.find(".J_dynamic_img"),
                        a = d.hasClass("J_loading");
                    r.length || a || (d.attr("need-remove", "no"), t.loadingImage(d))
                }
            }
        },
        loadingImage: function(e) {
            var t = this;
            e.addClass("J_loading");
            var i = t.getAddCodeUrl(e);
            if (!(t.imgErrorClock[i] >= 5)) {
                var n = new Image;
                n.src = i, n.complete ? t.insertImg(n, e) : (n.onload = function() {
                    t.insertImg(n, e)
                }, n.onerror = function() {
                    e.removeClass("J_loading"), t.imgErrorClock[i] ? t.imgErrorClock[i]++ : t.imgErrorClock[i] = 1
                })
            }
        },
        getAddCodeUrl: function(e) {
            var i = e.attr("img-src"),
                n = e.attr("suffix-width") ? e.attr("suffix-width") : e.width(),
                o = e.attr("suffix-ratio"),
                d = e.attr("suffix-code"),
                r = e.attr("suffix-model"),
                a = "no" != e.attr("use-webp");
            if (e.hasClass("full-width-wrap") && (n = 3e3), d) return t.getCodeSuffix(i, d, a);
            if (o) {
                if ("1:1" == o || "7:9" == o || "3:4" == o || "2:3" == o) return t.getGoodsRatioSuffix(i, n, o, a)
            } else if ("orig_narrow" == r) return t.getHalfSuffix(i, a);
            return t.getWidthSuffix(i, n, a)
        },
        insertImg: function(e, t) {
            t.hasClass("J_loading") && (t.removeClass("J_loading"), t.append('<img class="J_dynamic_img fill_img" src="' + e.src + '" alt=""/>'))
        },
        destroy: function() {},
        defaults: {
            objsClassName: "J_dynamic_imagebox",
            showDistance: 0
        }
    }, window.MoGu = window.MoGu || {};
    var o = MoGu.dynamicImage;
    return o || (o = new n({
        showDistance: $(window).height()
    }), MoGu.dynamicImage = o), o
}), require(["module/lazy-load"], function(e) {});
!
    function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("imgUrlTool", [], t) : "object" == typeof exports ? exports.imgUrlTool = t() : e.imgUrlTool = t()
    }(this, function() {
        return function(e) {
            function t(n) {
                if (i[n]) return i[n].exports;
                var o = i[n] = {
                    exports: {},
                    id: n,
                    loaded: !1
                };
                return e[n].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
            }
            var i = {};
            return t.m = e, t.c = i, t.p = "", t(0)
        }([function(e, t) {
            "use strict";
            window.MoGu = window.MoGu || {};
            var i = navigator.userAgent;
            MoGu.isUseWebp = !1;
            var n = {
                imgKeyArr: ["80", "100", "160", "180", "200", "240", "280", "300", "320", "360", "400", "440", "480", "520", "540", "560", "600", "640"],
                imgKeyMap: {
                    80: {
                        "1:1": "80x80",
                        "7:9": "80x103",
                        "3:4": "80x107",
                        "2:3": "80x120",
                        999: "80x999"
                    },
                    100: {
                        "1:1": "100x100",
                        "7:9": "100x129",
                        "3:4": "100x134",
                        "2:3": "100x150",
                        999: "100x999"
                    },
                    160: {
                        "1:1": "160x160",
                        "7:9": "160x206",
                        "3:4": "160x214",
                        "2:3": "160x240",
                        999: "160x999"
                    },
                    180: {
                        "1:1": "180x180",
                        "7:9": "180x232",
                        "3:4": "180x240",
                        "2:3": "180x270",
                        999: "180x999"
                    },
                    200: {
                        "1:1": "200x200",
                        "7:9": "200x258",
                        "3:4": "200x268",
                        "2:3": "200x300",
                        999: "200x999"
                    },
                    240: {
                        "1:1": "240x240",
                        "7:9": "240x308",
                        "3:4": "240x320",
                        "2:3": "240x360",
                        999: "240x999"
                    },
                    280: {
                        "1:1": "280x280",
                        "7:9": "280x360",
                        "3:4": "280x374",
                        "2:3": "280x420",
                        999: "280x999"
                    },
                    300: {
                        "1:1": "300x300",
                        "7:9": "300x386",
                        "3:4": "300x400",
                        "2:3": "300x450",
                        999: "300x999"
                    },
                    320: {
                        "1:1": "320x320",
                        "7:9": "320x412",
                        "3:4": "320x428",
                        "2:3": "320x480",
                        999: "320x999"
                    },
                    360: {
                        "1:1": "360x360",
                        "7:9": "360x463",
                        "3:4": "360x480",
                        "2:3": "360x540",
                        999: "360x999"
                    },
                    400: {
                        "1:1": "400x400",
                        "7:9": "400x515",
                        "3:4": "400x534",
                        "2:3": "400x600",
                        999: "400x999"
                    },
                    440: {
                        "1:1": "440x440",
                        "7:9": "440x566",
                        "3:4": "440x587",
                        "2:3": "440x660",
                        999: "440x999"
                    },
                    480: {
                        "1:1": "480x480",
                        "7:9": "480x618",
                        "3:4": "480x640",
                        "2:3": "480x720",
                        999: "480x999"
                    },
                    520: {
                        "1:1": "520x520",
                        "7:9": "520x670",
                        "3:4": "520x694",
                        "2:3": "520x780",
                        999: "520x999"
                    },
                    540: {
                        "1:1": "540x540",
                        "7:9": "540x695",
                        "3:4": "540x720",
                        "2:3": "540x810",
                        999: "540x999"
                    },
                    560: {
                        "1:1": "560x560",
                        "7:9": "560x720",
                        "3:4": "560x747",
                        "2:3": "560x840",
                        999: "560x999"
                    },
                    600: {
                        "1:1": "600x600",
                        "7:9": "600x772",
                        "3:4": "600x800",
                        "2:3": "600x900",
                        999: "600x999"
                    },
                    640: {
                        "1:1": "640x640",
                        "7:9": "640x824",
                        "3:4": "640x854",
                        "2:3": "640x960",
                        999: "640x999"
                    }
                },
                imgQuality: 70,
                dprDefMaxWidth: 640,
                dprDefRatio: "999",
                defCode: "999x999.v1c0",
                clientHeight: null,
                clientWidth: null,
                dpr: null,
                dprClentWidth: null
            };
            n.ua = i, n.android = i.match(/(Android);?[\s\/]+([\d.]+)?/), n.ios = i.match(/(iPad).*OS\s([\d_]+)/) || i.match(/(iPod)(.*OS\s([\d_]+))?/) || i.match(/(iPhone\sOS)\s([\d_]+)/), n.wp = i.match(/Windows Phone ([\d.]+)/), n.is_mobile = n.android || n.ios || n.wp, n.is_ie_old = i.indexOf("MSIE") > 0, n.init = function() {
                var e = this;
                e.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, e.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, window.addEventListener && window.addEventListener("resize", function() {
                    e.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, e.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                }, !1), e.dpr = window.devicePixelRatio >= 1 ? window.devicePixelRatio : 1, e.dprClentWidth = e.clientWidth * e.dpr, e.checkSupportWebp(), e.is_mobile && e.getAppInfo()
            }, n.setWebpFlag = function(e) {
                MoGu.isUseWebp = !! e
            }, n.checkSupportWebp = function() {
                var e = this,
                    t = new Image;
                t.onload = function() {
                    e.setWebpFlag(!0)
                }, t.onerror = function() {
                    e.ios && "undefined" != typeof localStorage ? e.setWebpFlag("true" === localStorage.getItem("isWebpEnable")) : e.setWebpFlag(!1)
                }, t.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="
            }, n.getDefSuffix = function(e, t) {
                var i = this,
                    n = "";
                if (i.android || i.ios || i.wp) {
                    var o = i.dprClentWidth;
                    375 >= o ? n = "375x9999.v1c7E" : o > 375 && 750 >= o ? n = "750x9999.v1c7E" : o > 750 && (n = "1125x9999.v1c7E")
                } else n = i.defCode;
                return i.getCodeSuffix(e, n, t)
            }, n.getWidthSuffix = function(e, t, i, n) {
                var o = this;
                "undefined" == typeof n && (n = !0);
                var d = o.defCode,
                    r = n ? o.dpr : 1,
                    x = parseInt(t) * r;
                return x && x > 0 && 2e3 >= x && (d = 100 * Math.ceil(x / 100) + "x9999.v1c7E"), o.getCodeSuffix(e, d, i)
            }, n.getGoodsRatioSuffix = function(e, t, i, n, o) {
                var d = this;
                "undefined" == typeof o && (o = !0);
                var r = d.defCode,
                    x = "",
                    f = ".v1cAC",
                    c = o ? d.dpr : 1;
                switch (i) {
                    case "1:1":
                    case "7:9":
                    case "3:4":
                    case "2:3":
                        x = i;
                        break;
                    default:
                        x = d.dprDefRatio, f = ".v1c96"
                }
                var a = parseInt(t) * c;
                (!a || 0 > a || a > d.dprDefMaxWidth) && (a = d.dprDefMaxWidth);
                for (var l = 0; l < d.imgKeyArr.length; l++) {
                    var u = d.imgKeyArr[l];
                    if (u >= a || u == d.dprDefMaxWidth) {
                        r = d.imgKeyMap[u][x] + f;
                        break
                    }
                }
                return d.getCodeSuffix(e, r, n)
            }, n.getHalfSuffix = function(e, t) {
                var i = this,
                    n = "";
                return i.dpr < 2 ? (n = "50000x50000.v1c7E", e = i.getCodeSuffix(e, n, t)) : e = i.getDefSuffix(e, t), e
            }, n.getCodeSuffix = function(e, t, i) {
                var n = this,
                    o = e;
                if (!e || !t || "no" == t || e.indexOf(".webp") > 0 || e.indexOf(".gif") > 0) return e;
                if (-1 === e.indexOf("mogucdn")) return e;
                if (e.indexOf(".jpg") < 0 && e.indexOf(".png") < 0) return e;
                if (e.indexOf(".jpg") > 0 && e.indexOf(".png") > 0) return e;
                var d = "",
                    r = e.split(".");
                if ("jpg" == r[r.length - 1]) d = "jpg";
                else {
                    if ("png" != r[r.length - 1]) return e;
                    d = "png"
                }
                var t = "_" + t,
                    x = "." + n.imgQuality + ".";
                if (e.indexOf(".png_") < 0 && e.indexOf(".jpg_") < 0 && e.indexOf("." + d) == e.length - 4 && (e = e + t + x + d), MoGu.isUseWebp && i !== !1) {
                    if (e.indexOf("." + d + "_") > 0) {
                        var f = e.split(".");
                        f[f.length - 1] == d && (f[f.length - 1] = "webp", e = f.join("."))
                    }
                } else if ("png" == d) return o;
                return e
            }, n.getAppInfo = function() {
                var e = this;
                "undefined" != typeof hdp ? (hdp["do"]("mgj.device.getInfo").then(function(t) {
                    t && t.networkType && 4 != t.networkType && 5 != t.networkType && (e.imgQuality = 50)
                })["catch"](function(e) {}), e.ios && "undefined" != typeof localStorage && hdp["do"]("hybrid.settings.getWebpEnabled").then(function(e) {
                    localStorage.setItem("isWebpEnable", e)
                })["catch"](function() {
                    localStorage.setItem("isWebpEnable", !1)
                })) : "undefined" != typeof document && document.addEventListener && document.addEventListener("deviceready", function() {
                    window.mgj && mgj.device && mgj.device.getInfo && mgj.device.getInfo(function(t) {
                        t && t.networkType && 4 != t.networkType && 5 != t.networkType && (e.imgQuality = 50)
                    }), e.ios && "undefined" != typeof localStorage && window.hybrid && hybrid.settings && hybrid.settings.getWebpEnabled && hybrid.settings.getWebpEnabled(function(e) {
                        localStorage.setItem("isWebpEnable", e)
                    }, function() {
                        localStorage.setItem("isWebpEnable", !1)
                    })
                }, function() {})
            }, MoGu.ImgUrlTool || (n.init(), MoGu.ImgUrlTool = n), e.exports = MoGu.ImgUrlTool
        }])
    });
define("module/timer", ["module/util"], function(t) {
    function e(t) {
        this._startTime = (new Date).getTime(), this._nodes = null, this.options = $.extend({}, e.DEFAULTS, t)
    }

    function r(t, e) {
        var r = t / 1e3,
            n = Math.floor(r / 86400);
        r -= 86400 * n;
        var i = Math.floor(r / 3600);
        r -= 3600 * i;
        var s = Math.floor(r / 60);
        r -= 60 * s, r = Math.floor(r);
        var a = "";
        return e.noday ? (i += 24 * n, a = o(e.format, [i, s, r])) : a = o(e.format, [n, i, s, r]), a
    }
    var n = function() {
            function t(t) {
                return Object.prototype.toString.call(t).slice(8, -1).toLowerCase()
            }

            function e(t, e) {
                for (var r = []; e > 0; r[--e] = t);
                return r.join("")
            }
            var r = function() {
                return r.cache.hasOwnProperty(arguments[0]) || (r.cache[arguments[0]] = r.parse(arguments[0])), r.format.call(null, r.cache[arguments[0]], arguments)
            };
            return r.format = function(r, o) {
                var i, s, a, l, f, u, h, c = 1,
                    p = r.length,
                    d = "",
                    m = [];
                for (s = 0; p > s; s++) if (d = t(r[s]), "string" === d) m.push(r[s]);
                else if ("array" === d) {
                    if (l = r[s], l[2]) for (i = o[c], a = 0; a < l[2].length; a++) {
                        if (!i.hasOwnProperty(l[2][a])) throw n('[sprintf] property "%s" does not exist', l[2][a]);
                        i = i[l[2][a]]
                    } else i = l[1] ? o[l[1]] : o[c++];
                    if (/[^s]/.test(l[8]) && "number" != t(i)) throw n("[sprintf] expecting number but found %s", t(i));
                    switch (l[8]) {
                        case "b":
                            i = i.toString(2);
                            break;
                        case "c":
                            i = String.fromCharCode(i);
                            break;
                        case "d":
                            i = parseInt(i, 10);
                            break;
                        case "e":
                            i = l[7] ? i.toExponential(l[7]) : i.toExponential();
                            break;
                        case "f":
                            i = l[7] ? parseFloat(i).toFixed(l[7]) : parseFloat(i);
                            break;
                        case "o":
                            i = i.toString(8);
                            break;
                        case "s":
                            i = (i = String(i)) && l[7] ? i.substring(0, l[7]) : i;
                            break;
                        case "u":
                            i = Math.abs(i);
                            break;
                        case "x":
                            i = i.toString(16);
                            break;
                        case "X":
                            i = i.toString(16).toUpperCase()
                    }
                    i = /[def]/.test(l[8]) && l[3] && i >= 0 ? "+" + i : i, u = l[4] ? "0" == l[4] ? "0" : l[4].charAt(1) : " ", h = l[6] - String(i).length, f = l[6] ? e(u, h) : "", m.push(l[5] ? i + f : f + i)
                }
                return m.join("")
            }, r.cache = {}, r.parse = function(t) {
                for (var e = t, r = [], n = [], o = 0; e;) {
                    if (null !== (r = /^[^%]+/.exec(e))) n.push(r[0]);
                    else if (null !== (r = /^%{2}/.exec(e))) n.push("%");
                    else {
                        if (null === (r = /^%(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(e))) throw "[sprintf] huh?";
                        if (r[2]) {
                            o |= 1;
                            var i = [],
                                s = r[2],
                                a = [];
                            if (null === (a = /^([a-z_][a-z_\d]*)/i.exec(s))) throw "[sprintf] huh?";
                            for (i.push(a[1]);
                                 "" !== (s = s.substring(a[0].length));) if (null !== (a = /^\.([a-z_][a-z_\d]*)/i.exec(s))) i.push(a[1]);
                            else {
                                if (null === (a = /^\[(\d+)\]/.exec(s))) throw "[sprintf] huh?";
                                i.push(a[1])
                            }
                            r[2] = i
                        } else o |= 2;
                        if (3 === o) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                        n.push(r)
                    }
                    e = e.substring(r[0].length)
                }
                return n
            }, r
        }(),
        o = function(t, e) {
            return e.unshift(t), n.apply(null, e)
        },
        i = t.expando();
    return e.prototype = {
        constructor: e,
        init: function() {
            this._nodes = $(this.options.selector), clearTimeout(this._timeout), this._refresh(), this._timeout = setInterval(this._refresh.bind(this), this.options.interval)
        },
        update: function() {
            this._nodes = $(this.options.selector)
        },
        _refresh: function() {
            var e = (new Date).getTime(),
                n = this._nodes;
            this.options.viewonly && (n = t.viewfilter(n, this.options.offset, null, document.documentElement.scrollTop || document.body.scrollTop));
            var o = this;
            n.each(function() {
                var t = $(this),
                    n = o.options,
                    s = t.data(n.datattr);
                if ("undefined" != typeof s && !t.data(i)) return s -= e - o._startTime, 300 >= s ? (s = 0, t.html(r(s, n)), n.finish && n.finish(t), void t.data(i, !0)) : void t.html(r(s, n))
            })
        }
    }, e.DEFAULTS = {
        viewonly: !1,
        interval: 500,
        offset: 300,
        noday: !1,
        selector: ".timer",
        datattr: "time-left",
        format: "%02d天%02d时%02d分%02d秒"
    }, e.VERSION = "0.0.2", e
});
!
    function() {
        for (var n = 0, i = ["ms", "moz", "webkit", "o"], e = 0; e < i.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[i[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i[e] + "CancelAnimationFrame"] || window[i[e] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(i) {
            var e = (new Date).getTime(),
                a = Math.max(0, 16 - (e - n)),
                o = window.setTimeout(function() {
                    i(e + a)
                }, a);
            return n = e + a, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(n) {
            clearTimeout(n)
        })
    }();
define("module/util", [], function(t, n, i) {
    function e() {
        return Math.random().toString().replace(".", "")
    }

    function o(t, n, i, e) {
        n = n || 600, "undefined" == typeof e && (e = document.documentElement.scrollTop || document.body.scrollTop);
        var o = e + $(window).height();
        e -= n, o += n;
        var r = [];
        return t.each(function() {
            var t = $(this);
            if ("none" !== t.css("display") && "hidden" !== t.css("visibility") && 0 !== t.css("opacity")) {
                var n = t.offset(),
                    u = n.top,
                    c = u + (n.height || t.height());
                if (n.width || t.width()) {
                    if (e > c || u > o) return void(i && i(t, !1));
                    i && i(t, !0), r.push(this)
                }
            }
        }), $(r)
    }

    function r(t, n, i) {
        var e = null;
        return function() {
            var o = +new Date;
            e && n > o - e || (e = o, i = i || this, t.apply(i, arguments))
        }
    }
    return {
        expando: e,
        viewfilter: o,
        throttle: r
    }
});
Function.prototype.bind || (Function.prototype.bind = function(t) {
    if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var o = Array.prototype.slice.call(arguments, 1),
        n = this,
        i = function() {},
        r = function() {
            return n.apply(this instanceof i ? this : t, o.concat(Array.prototype.slice.call(arguments)))
        };
    return this.prototype && (i.prototype = this.prototype), r.prototype = new i, r
});
require(["module/variable", "module/lazy-load", "module/goodsFollowRecord", "module/goodsExposureLog", "module/asideNotCoverFoot"], function(o, e, s, a, d) {
    function i(o, e) {
        e.push(o.splice(0, 30)), o.length > 0 && i(o, e)
    }
    MoGu.dynamicImage.checkImages();
    var n = /\bMSIE 6/.test(navigator.userAgent) && !window.opera;
    if (!n) {
        var l = $("body").hasClass("media_screen_1200") ? $(".aside") : null,
            t = l && l.offset(),
            r = $("body").hasClass("media_screen_960") ? $(".aside-960") : null,
            c = r && r.offset();
        $(window).on("resize", function() {
            c = r && r.offset(), t = l && l.offset()
        });
        var f = $(".main").offset().top;
        if (!n) {
            var l = $("body").hasClass("media_screen_960") ? $(".aside-960") : $(".aside");
            $(window).on("scroll", function() {
                var o = $(document).scrollTop();
                o > f ? l.addClass("fixed") : l.removeClass("fixed")
            })
        }
        var u = ((window.goodsData || {}).data || {}).itemList || [],
            m = [];
        i(u, m), $.map(m, function(o) {
            var e = {
                acms: [],
                iids: [],
                index: [],
                cpcs: []
            };
            $.map(o, function(o, s) {
                e = a.collectSingleGoodsLogData(o, s, e)
            }), a.goodsExposureLog(e)
        })
    }
});
$.easing.jswing = $.easing.swing, $.extend($.easing, {
    def: "easeOutQuad",
    easeOutQuad: function(n, e, t, a, i) {
        return -a * (e /= i) * (e - 2) + t
    }
}), function(n) {
    function e() {
        if (!l) return !1;
        var n = new Image;
        n.onload = function() {
            n.width > 0 && n.height > 0;
            u = !0
        }, n.onerror = function() {
            u = !1
        }, n.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="
    }
    var t = navigator.userAgent,
        a = t.match(/(iPad).*OS\s([\d_]+)/),
        i = t.match(/(iPod)(.*OS\s([\d_]+))?/),
        s = !a && t.match(/(iPhone\sOS)\s([\d_]+)/),
        o = a || i || s,
        r = t.match(/(Android)\s+([\d.]+)/),
        d = o || r,
        l = (n.browser.msie && "6.0" == n.browser.version && !n.support.style, t.match(/Chrome\/([\d.]+)/)),
        u = !1;
    e();
    var c = function(n) {
            if (n.indexOf(".jpg") < 0 || n.indexOf(".webp") > 0 || n.indexOf(".png") > 0) return n;
            if (!u || !n || !l) return n.indexOf(".jpg_") < 0 && n.indexOf(".jpg") == n.length - 4 ? n + "_999x999.v1c0.jpg" : n;
            if (n.indexOf(".jpg_") > 0) {
                var e = n.split(".");
                if ("jpg" == e[e.length - 1]) return e[e.length - 1] = "webp", e.join(".")
            }
            return n.indexOf(".jpg_") < 0 && n.indexOf(".jpg") == n.length - 4 ? n + "_999x999.v1c0.webp" : n
        },
        m = document.createElement("div"),
        f = "animation" in m.style || "-webkit-animation" in m.style,
        g = function(e) {
            this.isMouseOn = !1, this.isTurning = !1, this.showIndex = 0, this.banners = null, this.bannerNum = 0, this.opts = n.extend({}, this.defaults, e), this.autoTurnTimer = null, this.dotHoverTimer = null, this.isHoverTurn = !1, this.init()
        };
    g.prototype = {
        defaults: {
            bannerBox: null,
            isLazyImage: !1,
            autoTime: !1,
            isTouchTurn: !0,
            turnMode: "normal",
            transDuration: 500,
            addTurnBtn: !1,
            addTurnDot: !1,
            startIndex: 0,
            callback: function() {}
        },
        init: function() {
            var n = this;
            n.banners = n.opts.bannerBox.find(".mslide_banner"), n.bannerNum = n.banners.length, setTimeout(function() {
                n.loadingImage(0)
            }, 0), n.showIndex = n.opts.startIndex, n.bannerNum < 2 || (setTimeout(function() {
                n.loadingImage(1)
            }, 1e3), n.opts.autoTime && (o || n.opts.bannerBox.hover(function() {
                n.isMouseOn = !0
            }, function() {
                n.isMouseOn = !1, n.isHoverTurn && (n.isHoverTurn = !1, n.nextPage())
            }), n.opts.autoTime = n.opts.autoTime > 1e3 ? n.opts.autoTime : 1e3, n.resetAutoTurn()), n.opts.isTouchTurn && n.initTouchTurn(), "default" == n.opts.addTurnBtn && n.addDefaultBtn(), "default" == n.opts.addTurnDot ? n.addDefaultDot() : "animDot" == n.opts.addTurnDot && n.addAnimDot(), d ? n.opts.bannerBox.find(".msilde_toggle_btn").remove() : n.initToggleBtn())
        },
        goPage: function(n) {
            var e = this,
                t = e.opts.bannerBox.find(".mslide_banner_show"),
                a = t.index(),
                i = "next";
            a > n && (i = "prev"), n >= e.bannerNum && (n = 0), 0 > n && (n = e.bannerNum - 1);
            var s = e.banners.eq(n);
            if (!e.isTurning && !s.hasClass("mslide_banner_show")) {
                e.isTurning = !0, e.loadingImage(n);
                var r = e.opts.transDuration;
                if ("fade" == e.opts.turnMode) o ? s.attr("style", "z-index:2;display:block; -webkit-animation: fadeIn ease-in " + r + "ms;") : (s.css({
                    "z-index": 2
                }), s.fadeIn(r, "easeOutQuad").css("display", "block")), setTimeout(function() {
                    t.css({
                        "z-index": 0,
                        display: "none"
                    }), s.css({
                        "z-index": 1
                    }), t.removeClass("mslide_banner_show"), s.addClass("mslide_banner_show"), e.isTurning = !1
                }, r + 10);
                else if ("slide" == e.opts.turnMode) {
                    var d = e.opts.bannerBox.width();
                    d = "prev" == i ? -d : d, s.css({
                        left: d
                    }), s.addClass("mslide_banner_show"), t.animate({
                        left: -d
                    }, r, "easeOutQuad"), s.animate({
                        left: 0
                    }, r, "easeOutQuad"), setTimeout(function() {
                        t.removeClass("mslide_banner_show"), e.isTurning = !1
                    }, r + 10)
                } else if ("slideFade" == e.opts.turnMode) {
                    var d = e.opts.bannerBox.width() / 4;
                    d = "prev" == i ? -d : d, s.css({
                        "z-index": 2,
                        left: d,
                        opacity: 0,
                        display: "block"
                    }), t.animate({
                        left: -d,
                        opacity: 0
                    }, r), s.animate({
                        left: 0,
                        opacity: 1
                    }, r), setTimeout(function() {
                        t.css({
                            "z-index": 0
                        }), s.css({
                            "z-index": 1
                        }), s.addClass("mslide_banner_show"), t.removeClass("mslide_banner_show"), e.isTurning = !1
                    }, r + 10)
                } else t.removeClass("mslide_banner_show"), s.addClass("mslide_banner_show"), e.isTurning = !1;
                this.showIndex = n, e.opts.isLazyImage && setTimeout(function() {
                    e.loadingImage(n + 1)
                }, 1e3), e.opts.callback && e.opts.callback(n);
                var l = e.opts.bannerBox.find(".dot_default");
                l.length > n && (l.removeClass("dot_show"), l.eq(n).addClass("dot_show")), e.opts.autoTime && e.resetAutoTurn()
            }
        },
        prevPage: function() {
            var n = this;
            n.goPage(n.showIndex - 1)
        },
        nextPage: function() {
            var n = this;
            n.goPage(n.showIndex + 1)
        },
        loadingImage: function(n) {
            var e = this;
            if (e.opts.isLazyImage) {
                n >= e.bannerNum && (n = 0), 0 > n && (n = e.bannerNum - 1);
                var t = e.banners.eq(n);
                if (!t.hasClass("J_img_load")) {
                    t.addClass("J_img_load");
                    var a = new Image;
                    a.onload = function() {
                        t.hasClass("mslide_banner_show") ? (t.html('<img class="fill_img mslide_banner_img" style="display:none;" src="' + a.src + '" alt=""/>'), t.find(".mslide_banner_img").fadeIn(400, "easeOutQuad").css("display", "block")) : t.html('<img class="fill_img mslide_banner_img" style="display:block;" src="' + a.src + '" alt=""/>')
                    };
                    var i = t.attr("img-url");
                    a.src = c(i)
                }
            }
        },
        initToggleBtn: function() {
            var e = this,
                t = e.opts.bannerBox;
            t.find(".msilde_next_btn").length > 0 && t.on("click", ".msilde_next_btn", function(n) {
                n.preventDefault(), e.nextPage()
            }), t.find(".msilde_prev_btn").length > 0 && t.on("click", ".msilde_prev_btn", function(n) {
                n.preventDefault(), e.prevPage()
            }), t.find(".dot_default").length > 0 && !o && (t.find(".dot_default").hover(function() {
                var t = n(this);
                clearInterval(e.dotHoverTimer), t.hasClass("dot_show") || (e.dotHoverTimer = setInterval(function() {
                    e.isTurning || (e.goPage(t.index()), clearInterval(e.dotHoverTimer))
                }, 200))
            }, function() {
                clearInterval(e.dotHoverTimer)
            }), t.on("click", ".dot_default", function(t) {
                t.preventDefault(), e.goPage(n(this).index())
            }))
        },
        initTouchTurn: function() {
            var n = this,
                e = 0,
                t = 0,
                a = null,
                i = null,
                s = {},
                o = n.opts.bannerBox;
            o.on("touchstart", function(n) {
                a = n.originalEvent.touches[0], i && clearTimeout(i), s.x1 = a.clientX, s.y1 = a.clientY
            }), o.on("touchmove", function(n) {
                a = n.originalEvent.touches[0], s.x2 = a.clientX, s.y2 = a.clientY, e = Math.abs(s.x1 - s.x2), t = Math.abs(s.y1 - s.y2), e && 1.8 > t / e && n.preventDefault()
            }), o.on("touchend", function(a) {
                if (e && e > 80 && 1.8 > t / e) {
                    var o = s.x1 - s.x2;
                    "slideFade" != n.opts.turnMode && "slide" != n.opts.turnMode || (o = -o), i = setTimeout(function() {
                        o > 0 ? n.prevPage() : n.nextPage(), s = {}
                    }, 0)
                }
                e = t = 0
            }), o.on("touchcancel", function() {
                i && clearTimeout(i), i = null
            })
        },
        addDefaultBtn: function() {
            var n = this,
                e = '<a class="msilde_toggle_btn msilde_prev_btn" href="javascript:;" title="上一张"></a><a class="msilde_toggle_btn msilde_next_btn" href="javascript:;" title="下一张"></a>';
            n.opts.bannerBox.append(e)
        },
        addDefaultDot: function() {
            for (var n = this, e = "", t = 1; t <= n.bannerNum; t++) {
                var a = 1 == t ? "dot_show" : "";
                e += '<a href="javascript:;" class="dot_default ' + a + ' fl"></a>'
            }
            var i = '<div class="msilde_dot_box clearfix" style="margin-left:-' + 8 * n.bannerNum + 'px">' + e + "</div>";
            n.opts.bannerBox.append(i)
        },
        addAnimDot: function() {
            var n = this,
                e = "",
                t = '<span class="dot_show_img" ></span>',
                a = n.opts.autoTime || 5e3;
            f && (e = ["-webkit-animation: rotate " + a + "ms cubic-bezier(0.6, 0, 0.6, 1) 1;", "-moz-animation: rotate " + a + "ms cubic-bezier(0.6, 0, 0.6, 1) 1;", "-o-animation: rotate " + a + "ms cubic-bezier(0.6, 0, 0.6, 1) 1;", "animation: rotate " + a + "ms cubic-bezier(0.6, 0, 0.6, 1) 1;", "background: none;"].join(""), t = '<img class="dot_show_img" style="' + e + '" src="https://s10.mogucdn.com/mlcdn/c45406/170518_104a3j6gk4799j81313hj2fb65e24_40x40.png">');
            for (var i = "", s = 1; s <= n.bannerNum; s++) {
                var o = 1 == s ? "dot_show" : "";
                i += '<a href="javascript:;" class="dot_default ' + o + ' fl">' + t + "</a>"
            }
            var r = '<div class="msilde_dot_box anim_msilde_dot_box clearfix" style="margin-left:-' + 10 * n.bannerNum + 'px">' + i + "</div>";
            n.opts.bannerBox.append(r)
        },
        resetAutoTurn: function() {
            var n = this,
                e = n.opts.autoTime;
            clearInterval(n.autoTurnTimer), n.autoTurnTimer = setInterval(function() {
                return n.isMouseOn ? void(n.isHoverTurn = !0) : void n.goPage(n.showIndex + 1)
            }, e)
        }
    }, MOGU.MSlider = g
}(window.jQuery || window.Zepto);
define("module/goodsExposureLog", [], function() {
    function o(o) {
        var s = $.extend({}, g.goodsExposureData);
        return $.each(o, function(o, g) {
            s = e(g, o, s)
        }), s
    }

    function e(o, e, s) {
        return $.isPlainObject(s) ? ((s.acms || []).push(o.acm || ""), (s.iids || []).push(o.iid || ""), (s.index || []).push(e || 0), (s.cpcs || []).push(o.cpc || ""), s) : void 0
    }

    function s(o) {
        return window.logger && logger.log ? (logger.log(g.exposureEventId, o), window.console && console.log && (console.log("goodsExposureLog:"), console.log(g.exposureEventId), console.log(o)), !0) : void 0
    }
    var g = {
        exposureEventId: "0x00000000",
        goodsExposureData: {
            acms: [],
            iids: [],
            index: [],
            cpcs: []
        }
    };
    return MoGu.goodsExposureLog = MoGu.goodsExposureLog || {
        collectAllGoodsLogData: o,
        collectSingleGoodsLogData: e,
        goodsExposureLog: s
    }, {
        collectAllGoodsLogData: o,
        collectSingleGoodsLogData: e,
        goodsExposureLog: s
    }
});
define("module/goodsTemp", ["module/variable"], function(t) {
    function e(e, a) {
        if (e) {
            for (var s = null, i = "", l = {
                alertable: "即将开始",
                upcoming: "即将开始",
                ongoing: "立即抢购",
                soldout: "去逛逛",
                unpay: "点击查看"
            }, o = 0, d = e.length; d > o; o++) {
                s = e[o], a && "function" == typeof a && a(s, o, e), $.isNumeric(s.itemStatus) && (s.itemStatus = t.ITEM_STATUS_MAP[s.itemStatus]);
                var u = 1 === s.itemType ? "秒杀价" : "快抢价";
                "alertable" === s.itemStatus && (s.itemStatus = "upcoming"), 0 === s.left && "ongoing" === s.itemStatus && (s.itemStatus = "soldout"), s.itemStatusText = "已抢" + (s.total - s.left) + "件", s.percent = 100 * (1 - s.left / s.total);
                var m = s.itemStatus;
                "alertable" === m || "upcoming" === m ? (s.itemStatusText = "库存" + s.left + "件", s.follows > 1e4 && (s.follows = (s.follows / 1e4).toFixed(2) + "万"), s.leftText = (s.follows || 0) + "人关注") : "unpay" === m ? (s.itemStatusText = "还有" + s.unPayNums + "人未付款", s.leftText = "仅剩0件") : s.leftText = "仅剩" + s.left + "件", i += ['<div data-rush-id="' + s.rushId + '" data-id="' + s.topId + '" class="item fl clearfix ' + s.itemStatus + '">', s.tagImg ? '<img class="corner-tag" src="' + s.tagImg + '"/>' : "", '<a href="' + s.link + '" target="_blank" ' + (s.acm ? "data-ext-acm=" + s.acm : "") + ' class="item-image J_dynamic_imagebox fl" need-remove="no" img-src="' + s.image + '" title="' + s.title + '" suffix-model="goods_dpr" suffix-ratio="1:1">', "</a>", '<a href="' + s.link + '" target="_blank" ' + (s.acm ? "data-ext-acm=" + s.acm : "") + ' class="item-detail fl yahei">', '<div class="title text_hide">' + s.title + "</div>", '<div class="price text_hide">', "<span>" + u + '<span class="cur">¥' + s.salePrice + '</span></span><del class="old">¥' + s.price + "</del>", "</div>", '<div class="status-bar-box"><div class="status-bar-text text_hide">' + s.itemStatusText + '</div><div class="status-bar"><div class="status-bar-progress" style="width: ' + s.percent + '%;"></div></div></div><div class="buy-btn-box"><span class="buy-btn">' + l[s.itemStatus] + "</span>" + ('<span class="left-text">' + (s.leftText || "") + "</span>") + "</div>", "</a>", "soldout" === m ? '<div class="soldout-icon"></div>' : "", "</div>"].join("")
            }
            return i
        }
    }
    return {
        buildItemsHTML: e
    }
});
define("module/asideNotCoverFoot", [], function() {
    var o = /\bMSIE 6/.test(navigator.userAgent) && !window.opera;
    if (!o) {
        var e = $(".J_siteFooter"),
            t = document.querySelector(".J_siteFooter"),
            i = $("body").hasClass("media_screen_960"),
            s = i ? $(".aside-960") : $(".aside"),
            n = $(window),
            r = $(document),
            a = s.height();
        n.on("scroll", function() {
            if (!i && s.hasClass("fixed")) {
                var o = e.offset().top,
                    d = r.scrollTop() + a + 70;
                d > o ? s.css({
                    top: "inherit",
                    bottom: n.height() - t.getBoundingClientRect().top + "px"
                }) : s.css({
                    top: "",
                    bottom: ""
                })
            }
        })
    }
});
require(["module/variable", "module/timer", "module/goodsFollowRecord", "module/goodsTemp", "module/goodsExposureLog", "fastbuy/mCubeLoadData", "module/asideNotCoverFoot"], function(e, t, a, n, i, s, o) {
    function l(e) {
        if ("undefined" != typeof u[e]) return u[e];
        var t = document.body || document.documentElement,
            a = t.style;
        if ("string" == typeof a[e]) return u[e] = !0, !0;
        var n = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
        e = e.charAt(0).toUpperCase() + e.substr(1);
        for (var i = 0; i < (n || {}).length; i++) if ("string" == typeof a[n[i] + e]) return u[e] = !0, !0;
        return u[e] = !1, !1
    }

    function d() {
        $("body").on("click", ".nav-item", function() {
            b = y.find(".nav-item");
            var e = $(this),
                t = e.index();
            t -= 1, 0 > t || e.hasClass("active") || t >= (b || {}).length - 2 || (c(t), m(t), f._refresh(), window.logger && logger.log("000000104", {
                tabName: [e.find(".seckill-time").text(), e.find(".seckill-status").text()].join(" ")
            }))
        }), $("body").on("click", ".controller .ctrl-item, .content-footer .footer-btn", function(e) {
            var t = $(this),
                a = y.find(".nav-item.active").index() - 1;
            t.hasClass("prev") && a > 0 ? (c(a - 1), m(a - 1)) : t.hasClass("next") && a < (b || {}).length - 3 && (c(a + 1), m(a + 1))
        });
        var e = x.offset().top;
        if (!g) {
            var t = $("body").hasClass("media_screen_960"),
                a = t ? $(".aside-960") : $(".aside"),
                n = $(window);
            n.on("scroll", function() {
                var t = $(document).scrollTop(),
                    n = x.siblings(".nav-box-static");
                e > t ? (n.css({
                    display: "none"
                }), x.css({
                    position: "relative"
                }), a.removeClass("fixed")) : (n.css({
                    display: "block"
                }), x.css({
                    position: "fixed",
                    top: 0
                }), a.addClass("fixed"))
            })
        }
    }

    function r(e, t) {
        u.transition ? e.css({
            left: -t
        }) : e.animate({
            left: -t,
            easing: "linear",
            duration: 300
        })
    }

    function c(e) {
        b.eq(e + 1).addClass("active").siblings().removeClass("active"), $(".content-header .count-down-box").eq(e).addClass("active").siblings().removeClass("active"), 0 === e ? ($(".content-footer .footer-btn.prev").addClass("disabled"), $(".controller .ctrl-item.prev").addClass("disabled")) : ($(".content-footer .footer-btn.prev").removeClass("disabled"), $(".controller .ctrl-item.prev").removeClass("disabled")), e === (b || {}).length - 3 ? ($(".content-footer .footer-btn.next").addClass("disabled"), $(".controller .ctrl-item.next").addClass("disabled")) : ($(".content-footer .footer-btn.next").removeClass("disabled"), $(".controller .ctrl-item.next").removeClass("disabled")), r(y, itemwidth * e);
        var t = x.offset().top;
        $(document).scrollTop() > t && $(document).scrollTop(t)
    }

    function m(t) {
        var a = y.find(".nav-item.active").index() - 1,
            o = $(".content-body").find("#item-list-" + a);
        o.length > 0 && o.html("");
        y.find(".nav-item.active");
        if ($(".content-body .item-list").hide(), w.show(), !T[t]) {
            T[t] = !0;
            var l = y.find(".nav-item.active").attr("navdata-timestamp"),
                r = {};
            h.eventTime = l || h.eventTime, h.topId && h.topType && (r.topId = h.topId, r.topType = h.topType), h.eventTime && (r.eventTime = h.eventTime), r.bizKey = "rush_main", r.token = window.__token;
            var m = {
                paging: !0,
                url: (e.fastbuySiteUrl || "") + "/jsonp/fastBuyListActionLet/1",
                dataType: "jsonp",
                type: "get",
                jsonp: "callback",
                data: r,
                contentType: "application/json;charset=utf-8",
                success: function(e) {
                    if (e.data && (T[t] = !1, e.success)) {
                        var a = e.data || {};
                        r.page = a.page, r.bucketKey = a.bucketKey, a.isEnd === !0 ? m.paging = !1 : m.paging = !0;
                        var s = y.find(".nav-item.active").index() - 1;
                        e.data && e.data.nav && d &&
                        function() {
                            p(e.data), s = y.find(".nav-item.active").index() - 1, itemwidth = b.not(".active, .first, .last").width(), v(e.data.nav), 0 > s && (s = 0), c(s), d(), d = null, f.init()
                        }();
                        var o = s || t,
                            l = y.find(".nav-item.active").index() - 1,
                            u = $(".content-body").find("#item-list-" + l),
                            g = {
                                acms: [],
                                iids: [],
                                index: [],
                                cpcs: []
                            },
                            h = [0 === (u || {}).length ? '<div class="item-list clearfix" id="item-list-' + o + '" style="display: none;">' : "", n.buildItemsHTML(e.data.list, function(e, t) {
                                g = i.collectSingleGoodsLogData(e, t, g)
                            }), 0 === (u || {}).length ? "</div>" : ""].join("");
                        return i.goodsExposureLog(g), 0 === (u || {}).length ? ($(".content-body").append(h), u = $(".content-body").find("#item-list-" + l)) : u.append(h), (u || {}).length > 0 && o === l && (w.hide(), u.show()), MoGu.dynamicImage && MoGu.dynamicImage.checkImages(), m.paging
                    }
                },
                error: function(e, t) {}
            };
            s(m)
        }
    }

    function p(e) {
        var t = e.nav,
            a = "";
        for (var n in t) active = t[n].selected ? "active" : "", a += ['<a href="javascript:;" class="nav-item fl ' + active + '" navData-timestamp="' + t[n].startTime + '">', '<p class="seckill-time">' + t[n].timeDesc + "</p>", '<p class="seckill-status">' + t[n].statusDesc + "</p>", "</a>"].join("");
        a = ['<a href="javascript:;" class="nav-item first" data-tab="-1"></a>', a, '<a href="javascript:;" class="nav-item last" data-tab="-1"></a>'].join(""), y.append(a), b = y.find(".nav-item"), y.css("width", 137 * (b || {}).length + 822 + "px")
    }

    function v(e) {
        var t = e,
            a = e.limitTime,
            n = "",
            i = "",
            s = 0;
        for (var o in t) a == t[o].leftTime && (i = "active"), leftText = "限时限量 底价疯抢", rightText = "", 1 == t[o].status ? (leftText = "疯抢好物提前看", rightText = '距离开始还有<span class="timer" data-time-left="' + 1e3 * t[o].leftTime + '">&nbsp;</span>') : 3 == t[o].status ? leftText = "还有宝贝可以继续抢购哦" : rightText = '距离结束还有<span class="timer" data-time-left="' + 1e3 * t[o].leftTime + '">&nbsp;</span>', n += ['<div class="count-down-box clearfix ' + i + '" id="header-list-' + (s + 2) + '">', '<span class="fl">' + leftText + "</span>", '<span class="fr">' + rightText + "</span>", "</div>"].join(""), s++;
        $(".content-header").append(n)
    }
    var f = new t({
            format: '<span class="h">%02d</span>:<span class="m">%02d</span>:<span class="s">%02d</span>',
            interval: 1e3,
            noday: !0,
            selector: ".timer",
            viewonly: !0
        }),
        u = {},
        g = /\bMSIE 6/.test(navigator.userAgent) && !window.opera;
    l("transition");
    var h = {};
    h.topId = $('.ajax_param[param-name|="topId"]').val(), h.topType = $('.ajax_param[param-name|="topType"]').val(), h.eventTime = $('.ajax_param[param-name|="eventTime"]').val();
    var b, x = $(".nav-box"),
        y = x.find(".nav-list"),
        T = {},
        w = $(".content .ajax-loading");
    (w || {}).length <= 0 && (w = $('<div class="ajax-loading">正在加载中...</div>'), $(".content").append(w));
    var C = $(".J_page-slider"),
        j = $(".mslide_banner");
    if ((C || {}).length > 0 && (j || {}).length > 0) {
        new MOGU.MSlider({
            bannerBox: C,
            autoTime: 5e3,
            isLazyImage: !0,
            turnMode: "slideFade",
            addTurnBtn: "default",
            addTurnDot: "animDot",
            callback: function(e) {
                window.logger && logger.log("016001000", {
                    index: e,
                    url: j.eq(e).attr("href")
                })
            }
        })
    }
    "undefined" == typeof window.highlightIndex && (window.highlightIndex = 0), m(highlightIndex)
});