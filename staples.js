//////////////////////////////////
//StaplesJS
//////////////////////////////////

/*!
 * MagnumJS - StaplesJS Template Factory v0.2
 * https://github.com/magnumjs
 *
 * Includes Staples.js
 * https://github.com/magnumjs/staples.js
 *
 * Copyright (c) 2013 Michael GLazer 
 * Released under the MIT license
 * https://github.com/magnumjs/mag.js/blob/master/LICENSE
 *
 * Date: 2013-08-19T13:48Z
 */

;
'use strict';
(function ($, namespace, undefined) {

    mag.template = {};

})(jQuery, window.mag = window.mag || {});

mag.template.serve = function (f) {

    mag.aspect.next(f);
    var name = f.arguments[0];
    var scope = this.getScope(name);
    var that = this;
    mag.template.parse(that, name, scope);

};
mag.template.parse = function (that, name, $scope) {
    this.prefix = 'data-mag-';
    this.templates = this.templates || {};
    this.templates[name] = this.templates[name] || {};

    this.templates[name].precompiled = this.templates[name].precompiled || $('#' + name).html();

    that.fire('tmpl-begin', [name]);
    $('#' + name).hide();

    this.applyVar = function (frag, key, vars) {
        var items = $('.' + key, frag) || [];
        var i = items.length;
        if (i < 1) {

            this.setShy(frag, key, vars);
            this.setVar(frag, key, vars);
            //if one updates must inform the other
            this.getVar(frag, key, vars);
            this.getShy(frag, key, vars);

        }
        while (i--) {

            this.setVar(frag, key, vars, items, i);
            this.getVar(frag, key, vars, items, i);

        }
    };
    this.setVar = function (frag, key, vars, items, i) {
        var val = (typeof vars[key] == 'function') ? vars[key].call(this) : vars[key];
        if (items) {
            items[i].innerText = val;
        }
        var p = "\\[\\[(.*?)\\]\\]";
        var r = new RegExp(p, 'g');

        var oldHtml = $(frag).html();
        if (r.test(oldHtml)) {
            var newHtml = oldHtml.replace(r, function (out, inn, pos) {
                if (key == inn) {
                    return '<!--mag:' + key + '-->' + val + '<!--//mag:' + key + '-->';
                } else {
                    return out;
                }

            });
            $(frag).html(newHtml);
        }
    };
    this.getShy = function (frag, key, vars) {
        var dt = $(frag).attr(this.prefix + key);

        if (dt != undefined) {

            var p = "\=\".*(" + dt + ").*\"";
            var r = new RegExp(p, 'gm');

            var val = (typeof vars[key] == 'function') ? vars[key].call(this) : vars[key];
            var oldHtml = $(frag).html();
            if (r.test(oldHtml)) {

                var newHtml = oldHtml.replace(r, function (out, inn, pos) {

                    return out.replace(inn, val);
                });

                $(frag).attr(this.prefix + key, val);
                $(frag).html(newHtml);

            }
        }
    };
    this.setShy = function (frag, key, vars) {
        var val = (typeof vars[key] == 'function') ? vars[key].call(this) : vars[key];

        var p = "\=\".*(\\[\\[" + key + "\\]\\]).*\"";
        //var p="<[^>]+\=\".*(\\[\\["+key+"\\]\\]).*\"[^>]+>";
        this.caches = this.caches || {}; //cache regexps for performance
        // need uid for cache key
        //if(!this.caches[key]){this.caches[key]=new RegExp(p,'gm');} 
        var r = new RegExp(p, 'gm');

        var oldHtml = $(frag).html();
        if (r.test(oldHtml)) {

            var newHtml = oldHtml.replace(r, function (out, inn, pos) {

                return out.replace(inn, val);
            });

            $(frag).attr(this.prefix + key, val);


            $(frag).html(newHtml);
        }
    };
    this.getVar = function (frag, key, vars) {
        var val = (typeof vars[key] == 'function') ? vars[key].call(this) : vars[key];

        var p = "<!--mag:" + key + "-->([\\s\\S]*?)<!--\/\/mag:" + key + "-->";
        this.caches = this.caches || {}; //cache regexps for performance

        // if(!this.caches[key]){this.caches[key]=new RegExp(p,'gm');}

        var r = new RegExp(p, 'gm');
        var oldHtml = $(frag).html();
        if (r.test(oldHtml)) {
            var newHtml = oldHtml.replace(r, function (out, inn, pos) {

                return '<!--mag:' + key + '-->' + val + '<!--//mag:' + key + '-->';

            });
            $(frag).html(newHtml);
        }
    };
    this.applyVars = function (frag, vars) {

        for (var key in vars) {
            this.applyVar(frag, key, vars);
        }
    };
    this.parse = function (docFragRoot, vars) {

        for (var key in vars) {

            if (Object.prototype.toString.call(vars[key]) === '[object Array]') {


                // only first call
                this.keys = this.keys || {};
                var n = vars[key];
                if (this.keys[key]) {


                    for (var i = 0; i < n.length; i++) {

                        var newest = $('.' + key, docFragRoot).filter(':eq(' + i + ')');

                        this.applyVars(newest, n[i]);
                    }
                } else {

                    var sdocFragRoot = $('.' + key, docFragRoot).first();

                    for (var i = 0; i < n.length; i++) {
                        var newest = sdocFragRoot.clone(true);
                        sdocFragRoot.parent().append(newest);
                    }
                    sdocFragRoot.remove();
                    for (var i = 0; i < n.length; i++) {

                        var frag = $('.' + key, docFragRoot).filter(':eq(' + i + ')');
                        this.applyVars(frag, n[i]);

                    }

                }
                this.keys[key] = this.keys[key] || {};
            } else {

                this.applyVar(docFragRoot, key, vars);

            }
        }

    };
    this.parse($('#' + name), $scope);
    that.fire('tmpl-end', [name]);
    $('#' + name).show();
};


mag.aspect.add('around', 'control', mag.template.serve);
