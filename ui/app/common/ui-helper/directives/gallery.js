angular.module('bahmni.common.uiHelper')
    .directive('gallery', function(){
        var link = function($scope){
            KeyboardJS.on('right', function() {
                $scope.$apply(function(){
                    $scope.showNext();
                });
            });
            KeyboardJS.on('left', function() {
                $scope.$apply(function(){
                    $scope.showPrev();
                });
            });
            $scope.$on('$destroy', function(){
                KeyboardJS.clear('right');
                KeyboardJS.clear('left');
            });
        };
        return {
            restrict: 'E',
            link: link,
            scope: {
                imageIndex: "=",
                photos: "="
            },
            template:
                '<div class="container slider">' +
                    '<div ng-repeat="photo in photos">' +
                        '<img class="slide" hm-swipe-right="showPrev()" hm-swipe-left="showNext()" ng-show="isActive($index)" ng-src="{{photo.src}}" />' +
                        '<div ng-if="isActive($index)">{{photo.desc}}</div>' +
                        '<span ng-if="photos.length > 1 && isActive($index)">{{$index+1}} of {{photos.length}}</span>' +
                        '<span ng-if="isActive($index)">{{photo.date | date: "dd MMM yy"}}</span>' +
                    '</div>'+
                    '<span ng-if="photos.length > 1" class="arrow prev"  ng-click="showPrev()"></span>' +
                    '<span ng-if="photos.length > 1" class="arrow next"  ng-click="showNext()"></span>' +
               '</div>',
            controller: ['$scope', '$http', function($scope, $http) {

                $scope._Index = $scope.imageIndex || 0;

                $scope.isActive = function (index) {
                    return $scope._Index === index;
                };

                $scope.showPrev = function () {
                    $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
                };

                $scope.showNext = function () {
                    $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
                };

                $scope.showPhoto = function (index) {
                    $scope._Index = index;
                };
            }]
        };
    });