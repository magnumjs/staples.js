//////////////////////////////////
//RenderJS
//////////////////////////////////

/*!
 * MagnumJS - StaplesJS Template Factory v0.2
 * https://github.com/magnumjs
 *
 * Includes Staples.js
 * https://github.com/magnumjs/staples.js
 *
 * Copyright (c) 2014 Michael GLazer 
 * Released under the MIT license
 * https://github.com/magnumjs/mag.js/blob/master/LICENSE
 *
 * http://jsbin.com/buzulura/3/edit
 *
 * Date: 2014-03-31T02:09:34.739Z
 */

var tasks = [{
    taskid: 1,
    name: 'A todo item',
    completed: false
}, {
    taskid: 2,
    name: 'Another todo'
}];

var render = (function (self) {

    var privates = {};

    privates.init = function (container, data) {

        if (!(this instanceof privates.init)) return new privates.init(container, data);
        var instance = this;

        var selector = function (k) {
            return '.' + k;
        };
        var $template = $(container).hide();
        var dataMapKey = Object.keys(data)[0];

        $list = $template.find(selector(dataMapKey));
        $item = $list.children(':first');


        this.getItem = function ($clone, key) {
            var $item = $clone.find(selector(key));
            if ($item.length > 0) {
                return $item;
            }
        };

        $.each(data[dataMapKey], function () {
            $clone = $item.clone();
            self.process(instance, $clone, this);
            $clone.appendTo($list);
        });

        $item.remove();
        $template.show();
    }

    self.process = function (instance, $clone, data) {
        for (var key in self.processors) {
            self.processors[key].call(this, instance, $clone, data);
        }
    }

    privates.register = function (callback) {
        self.processors = self.processors || [];
        self.processors.push(callback);
    };

    var interface = function (method) {
        return function () {
            return privates[method].apply(this, arguments);
        };
    };

    var api = interface('init');

    api['register'] = interface('register');

    return api;

})(render = render || {});

function addDataToCloneByClass(instance, $clone, data, $item) {
    $.each(data, function (key, val) {
        if (($item = instance.getItem($clone, key)) && $item.children().length == 0 && !$item.data('processed')) {
            $item.html(val);
            $item.data('processed', true);
        }
    });
}
render.register(addDataToCloneByClass);

function replaceMatchingClassWithData(instance, $clone, data, $item) {
    $.each(data, function (key, val) {
        if (($item = instance.getItem($clone, key)) && !$item.data('processed')) {
            $item.toggleClass(key + ' ' + val);
            $item.data('processed', true);
        }
    });
}
render.register(replaceMatchingClassWithData);

function replaceMatchingAttrWithData(instance, $clone, data, $item) {
    $.each(data, function (key, val) {
        $clone.find('[' + key + ']').attr(key, val);
    });
}

render.register(replaceMatchingAttrWithData);

render('#tasks', {
    taskList: tasks
});
