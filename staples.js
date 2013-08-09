'use strict';

//////////////////////////////////
//StaplesJS
//////////////////////////////////

/**
 * @ngdoc function
 * @name mag.staple
 * @function
 *
 * @description
 * Wraps a raw DOM element or HTML string as a 
 *
 */
 
 
 var mag = {};
mag.control = function (modelsArray, name, fun) {
    this.controls = this.controls || {};
    this.controls[name] = this.controls['name'] || {};
    var $scope = this.controls[name];
    args = modelsArray || [];
    args.splice(0, 0, $scope);
    fun.apply(this, args);
    mag.template(name, $scope);
};
mag.template = function (name, $scope) {
    this.templates = this.templates || {};
    this.templates[name] = this.templates[name] || {};
    this.template = this.templates[name];
    var docFragRoot = document.getElementById(name);

    this.applyVar = function (frag, key, vars) {
        var items = frag.getElementsByClassName(key);
        var i = items.length;
        if (i < 1) {
            this.setVar(frag, key, vars);
        }
        while (i--) {
            this.setVar(frag, key, vars, items, i);
        }
    };
    this.setVar = function (frag, key, vars, items, i) {
        var val = (typeof vars[key] == 'function') ? vars[key].call(this) : vars[key];
        if (items) {
            items[i].innerText = val;
        }
        frag.innerHTML = frag.innerHTML.replace(/\[\[(.*?)\]\]/g, function (out, inn, pos) {
            if (key == inn) {
                return val;
            } else {
                return out;
            }
        });
    };
    this.applyVars = function (frag, vars) {
        for (key in vars) {
            this.applyVar(frag, key, vars);
        }
    };
    this.parse = function (docFragRoot, vars) {

        for (key in vars) {

            if (Object.prototype.toString.call(vars[key]) === '[object Array]') {

                var sdocFragRoot = docFragRoot.getElementsByClassName(key);
                var newelement = sdocFragRoot[0].cloneNode(true);

                var n = vars[key];
                for (var i = 0; i < n.length; i++) {

                    var newest = newelement.cloneNode(true);

                    var nvars = n[i];
                    this.applyVars(newest, n[i]);
                    sdocFragRoot[0].parentNode.appendChild(newest);
                }

                docFragRoot.removeChild(sdocFragRoot[0]);
            } else {

                this.applyVar(docFragRoot, key, vars);

            }
        }
    };
    this.parse(docFragRoot, $scope);
};

