(function () {

'use strict';

/**
 * @ngdoc function
 * @name fileTaBobineApp.controller:WebcamphotoCtrl
 * @description
 * # WebcamphotoCtrl
 * Controller of the fileTaBobineApp
 */
angular
    .module('fileTaBobineApp')
    .controller('WebcamphotoCtrl', WebcamphotoCtrl);

WebcamphotoCtrl.$inject = ['$window', '$routeParams', '$timeout'];

function WebcamphotoCtrl ($window, $routeParams, $timeout) {

    var vm = this;

    var width = 1240;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    var storyData = [
        {
            titleSrc: "images/Titre1.png",
            maskSrc: "images/Fond1.png",
            fiche: "images/Fiche1.png"
        },
        {
            titleSrc: "images/Titre2.png",
            maskSrc: "images/Fond2.png",
            fiche: "images/Fiche2.png"
        },
        {
            titleSrc: "images/Titre3.png",
            maskSrc: "images/Fond3.png",
            fiche: "images/Fiche3.png"
        },
        {
            titleSrc: "images/Titre4.png",
            maskSrc: "images/Fond4.png",
            fiche: "images/Fiche4.png"
        },
        {
            titleSrc: "images/Titre5.png",
            maskSrc: "images/Fond5.png",
            fiche: "images/Fiche5.png"
        },
    ];


    // Methods
    vm.print = print;

    init();

    function init () {
        vm.story = storyData[parseInt($routeParams.id)];

        startup();
    }

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');

        $window.navigator.getMedia = (
            $window.navigator.getUserMedia ||
            $window.navigator.webkitGetUserMedia ||
            $window.navigator.mozGetUserMedia ||
            $window.navigator.msGetUserMedia
        );

        $window.navigator.getMedia(
            {
                video: true,
                audio: false
            },
            function (stream) {
                if ($window.navigator.mozGetUserMedia) {
                  video.mozSrcObject = stream;
                }
                else {
                  var vendorURL = $window.URL || $window.webkitURL;
                  video.src = vendorURL.createObjectURL(stream);
                }

                video.play();
            },
            function (err) {
                console.log("An error occured! " + err);
            }
        );

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth/width);

                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.

                if (isNaN(height)) {
                  height = width / (4/3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);

                canvas.setAttribute('width', 1240);
                canvas.setAttribute('height', 874);

                streaming = true;
            }
        }, false);

        clearphoto();
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');

        canvas.width = 1240;
        canvas.height = 874;

        // draw fiche
        var context = canvas.getContext('2d');
        var img = document.getElementById("story-fiche");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // draw video
        context.drawImage(video, 780, 167, 280, 175);

        // draw mask
        var img = document.getElementById("story-mask");
        context.drawImage(img, 640, 80, 560, 350);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);

        // video.pause();
    }

    function print () {
        takepicture();

        console.log("print!");
        $timeout(function () {
            $window.print();
        }, 500);
    }

  }
})();