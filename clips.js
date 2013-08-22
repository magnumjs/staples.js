// http://jsbin.com/ozebIvu/2/edit
//////////////////////////////////
//ClipsJS
//////////////////////////////////
/**!
 * MagnumJS - ClipsJS Template Factory v0.1
 * https://github.com/magnumjs
 *
 * @description Fast simple Html template to javascript function cache
 * Includes Staples.js
 * https://github.com/magnumjs/staples.js/clips.js
 *
 * Copyright (c) 2013 Michael GLazer
 * Released under the MIT license
 * https://github.com/magnumjs/mag.js/blob/master/LICENSE
 *
 * Date: 2013-08-19T13:48Z
 */
'use strict';
(function ($, namespace, undefined) {

    mag.clips = {};

})(jQuery, window.mag = window.mag || {});
(function ($) {

    mag.clips.parse = function (id, data) {

        this.cache = this.cache || {};

        this.run = function (id, data) {

            var $id = $('#' + id),
                html, fun, ret;
            $id.hide();

            if (this.cache[id]) {

                html = this.cache[id]['phtml'];
                fun = this.cache[id]['fun'];
            } else {
                html = $id.html();
                fun = this.tmpl(html);
                this.cache[id] = {};
                this.cache[id]['fun'] = fun;
                this.cache[id]['ohtml'] = html;
            }

            this.fun = fun;


            ret = this.loop(data);

            if (ret == '') {

                ret = this.fun(data);
                ret = this.finder(ret, data);


            }


            this.cache[id]['phtml'] = ret;
            $id.html(ret);
            $id.show();

        }

        this.finder = function (out, data) {

            for (var k in data) {
                var p = 'class\=\"' + k + '\"\>';

                var patt = new RegExp(p, 'gm');

                out = out.replace(patt, p + data[k]);

            }
            return out;
        }

        this.loop = function (sdata) {
            var ret = '';
            var newobj = sdata;
            for (var k in sdata) {
                // array, string, function 

                if (Object.prototype.toString.call(sdata[k]) === '[object Array]') { // array

                    var newk = k.substring(0, k.length - 1);

                    for (var i in sdata[k]) {
                        var loopval = sdata[k][i];

                        newobj['index'] = i;
                        newobj[newk] = loopval;

                        var out = this.fun(newobj);

                        ret += this.finder(out, data);

                    }
                    delete sdata[newk];
                    delete sdata['index'];
                } else {

                }
            }
            return ret;
        }

        this.tmpl = function (str, /* optional to execute against or just returns a fun str */ data) {

            var fn = new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                "with(obj){p.push('" +

                str
                .replace(/[\r\t\n]/g, " ")
                .split("[[").join("\tp.push(")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("]]").join(");p.push('")
                .split("\r").join("\\'") + "');}return p.join('');");

            return data ? fn(data) : fn;
        };

        this.run(id, data);

    };

    /**
     * @name Working example below
     *
     * @description
     */

    // var data = {
    //     test: 'Yo!',
    //     users: [{
    //         name: 'm'
    //     }, {
    //         name: 'g'
    //     }],
    //     isOld: function () {
    //         return true;
    //     },
    //     other: {
    //         more: 'hmm'
    //     }
    // };

    // mag.clips.parse('map', data);

})(jQuery);
