

var app = angular.module('app', [
    'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {

    console.log('bootstrapping the app');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html'
    })

    .state('msg', {
        abstract: true,
        url: '/msg',
        template: '<div ui-view></div>'
    })
    .state('msg.create', {
        url: '/create',
        templateUrl: 'app/message/create.html'
    })
    .state('msg.comment', {
        url: '/comment',
        templateUrl: 'app/message/comment.html'
    })

    .state('user', {
        abstract: true,
        url: '/user',
        template: '<div ui-view></div>'
    })
    .state('user.list', {
        url: '/list',
        templateUrl: 'app/user/list.html'
    })
    .state('user.create', {
        url: '/create',
        templateUrl: 'app/user/create.html'
    });
});

app.filter('moment', function(){

    return function(val){
        if (!val){
            return '';
        }
        return moment(val).fromNow();
    };
});

app.factory('socket', function ($rootScope) {

    var socket = io.connect();

    return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },

        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          })
        }
    };
});


app.controller('homeController', function($scope, socket){

    var vm = this;
    vm.messages = [];

    init();

    function init(){

        socket.emit('home:join', { });

        socket.on('home:msgs:init', function(msgs){
            console.log('init', msgs);
            vm.messages = msgs;
        });

        socket.on('home:msgs:new', function(msg){
            console.log('new', msg);
            vm.messages.unshift(msg);
        });

        socket.on('home:msgs:del', function(id){
            // TODO: find index & remove
            console.log('del', id);
        });

        socket.on('home:msgs:upd', function(msg){
            // TODO: find index & update
            console.log('upd', msg);
        });

        $scope.$on('$destroy', function(){
            console.log('left room: home');
            socket.emit('home:leave', { });
        });
    }
});


app.controller('userCreateController', function(){

    var vm = this;
    vm.item = {};

    vm.create = function(form){

        $.ajax({
            type: 'POST',
            url: 'http://localhost:14320/api/user',
            data: JSON.stringify(vm.item),
            success: success,
            dataType: 'json'
        });
    }

    function success(){
        // reset
        vm.item = {};
    }
});


app.controller('userListController', function($scope, bindTable){

});


app.controller('messageCreateController', function(){

    var vm = this;
    vm.item = {};

    vm.create = function(form){

        $.ajax({
            type: 'POST',
            url: 'http://localhost:14320/api/message',
            data: JSON.stringify(vm.item),
            success: success,
            dataType: 'json'
        });
    }

    function success(){
        // reset
        vm.item = {};
    }
});


app.controller('messageCommentController', function(){

});
