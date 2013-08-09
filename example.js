var todosControl = function ($scope) {
    $scope.test= 'Yo!';
    $scope.remaining = function () {
        return 1;
    };
    $scope.todos = [{
        text: 'first',
        done: true
    }, {
        text: 'second',
        done: false
    }, {
        text: 'third',
        done: false
    }];
}

mag.control([], 'todosControl', todosControl);
