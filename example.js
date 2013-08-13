// Code goes here

var todosControl = function ($scope) {

    $scope.todos = [{
        text: 'Integrate magnum',
        done: true
    }, {
        text: 'Leverage magnum into my app',
        done: false
    }];
    $scope.remaining = function () {
        var count = 0;
        $.each($scope.todos, function (k, todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };
    $scope.size = function () {
        return $scope.todos.length;
    };
}
mag.observe().on('tmpl-begin', function (name) {
    $('#' + name).hide();
});
mag.observe().on('tmpl-end', function (name) {
    if (name == 'todosControl') {
        $('#' + name).show();

        var ctrl = new mag.watch();
        ctrl.secret = 'null';
        ctrl._bind($('#todoText'), 'secret');
        ctrl._watch($('.output'), 'secret');

    }
});

mag.control('todosControl', ['test', todosControl]);
$('.todos').addClass('more');
setTimeout(function () {
    mag.control('todosControl', ['',
        function ($scope) {
 
            $scope.todos[0].done = false;
        }
    ]);

}, 1000);
