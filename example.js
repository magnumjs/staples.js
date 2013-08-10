// Code goes here

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
    }];
}

mag.control('todosControl',['test',todosControl]);
