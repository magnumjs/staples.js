//////////////////////////////////
//StaplesJS
//////////////////////////////////

/*!
 * MagnumJS - StaplesJS Template Factory v0.11.1
 * https://github.com/magnumjs
 *
 * Includes Staples.js
 * https://github.com/magnumjs/staples.js
 *
 * Copyright 2013 Michael GLazer 
 * Released under the MIT license
 * https://github.com/magnumjs/mag.js/blob/master/LICENSE
 *
 * Date: 2013-08-10T13:48Z
 */
'use strict';
mag.control = function (name, options) {

    name = mag.tape(name, options);
    var $scope = mag.getScope(name);
    mag.observe().make(mag.template);
    mag.template(name, $scope);
    $(document).trigger('mag-template-done', [name]);
};
mag.template = function (name, $scope) {

    this.templates = this.templates || {};
    this.templates[name] = this.templates[name] || {};

    this.templates[name].precompiled = this.templates[name].precompiled || $('#' + name).html();

    mag.template.events(name, 'change');

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
        var dt = $(frag).attr(key);
        if (this.test && key == 'done') {
            console.log($('.todos').filter(':eq(0)').data());
        }
        if (dt != undefined) {

            var p = "\=\".*(" + dt + ").*\"";
            var r = new RegExp(p, 'gm');

            var val = (typeof vars[key] == 'function') ? vars[key].call(this) : vars[key];
            var oldHtml = $(frag).html();
            if (r.test(oldHtml)) {

                var newHtml = oldHtml.replace(r, function (out, inn, pos) {

                    return out.replace(inn, val);
                });

                $(frag).attr(key, val);
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

            $(frag).attr(key, val);
            console.log($('.todos').filter(':eq(0)').data());
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

                if (this.keys[key]) {
                    var n = vars[key];

                    for (var i = 0; i < n.length; i++) {

                        var newest = $('.' + key, docFragRoot).filter(':eq(' + i + ')');

                        var nvars = n[i];

                        this.applyVars(newest, n[i]);
                        // sdocFragRoot.parent().append(newest);
                    }
                } else {

                    var sdocFragRoot = $('.' + key, docFragRoot).first();
                    // $('.'+key, docFragRoot).not(':first').remove();
                    //var newelement = sdocFragRoot.clone(true);

                    var n = vars[key];


                    for (var i = 0; i < n.length; i++) {
                        var newest = sdocFragRoot.clone(true);
                        sdocFragRoot.parent().append(newest);
                    }
                    sdocFragRoot.remove();
                    for (var i = 0; i < n.length; i++) {

                        //               var newest = newelement.clone(true);

                        var nvars = n[i];
                        //                 sdocFragRoot.parent().append(newest);
                        var frag = $('.' + key, docFragRoot).filter(':eq(' + i + ')');
                        this.applyVars(frag, n[i]);

                    }

                    //   sdocFragRoot.remove( );
                }
                this.keys[key] = this.keys[key] || {};
            } else {

                this.applyVar(docFragRoot, key, vars);

            }
        }

    };
    this.parse($('#' + name), $scope);
};

mag.template.events = function (name, change) {

};
