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
 * Real  always takes precedence over , provided it was loaded before `DOMContentLoaded`
 * event fired.
 *
 * Staples is a tiny, API-compatible subset of MagnumJS that allows
 * MAG to manipulate the DOM. implements only the most commonly needed functionality
 * within a very small footprint, so only a subset of the API - methods, arguments and
 * invocation styles - are supported.
 *
 * Note: All element references in MAG are always are
 * raw DOM references.
 *
 * ## StaplesJS lite
 * StaplesJS lite version of jQuery provides only the following jQuery methods:
 *
 * - [addClass()]()
 * - 
 *
 * ## StaplesJS Extras
 * MAG also provides the following additional methods and events to both:
 *
 * ### Events
 * - `$destroy` - MAGJS intercepts all DOM destruction apis and fires this event
 *    
 * ### Methods
 * - `controller(name)` - retrieves the controller of the current element or its parent. By default
 *   retrieves controller associated with the `ngController` directive. If `name` is provided as
 *   camelCase directive name, then the controller for this directive will be retrieved (e.g.
 *   
 * - `scope()` - retrieves the {@link api/ng.$rootScope.Scope scope} of the current
 *   element or its parent.

 *
 * @param {string|DOMElement} element HTML string or DOMElement to be wrapped into.
 * @returns {Object} object.
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

