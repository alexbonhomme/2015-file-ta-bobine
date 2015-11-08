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

    var width = 1680;    // We will scale the photo width to this
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
            storyText: "récit 1",
            machineText: "machine 1"
        },
        {
            titleSrc: "images/Titre2.png",
            maskSrc: "images/Fond2.png",
            storyText: "",
            machineText: ""
        },
        {
            titleSrc: "images/Titre3.png",
            maskSrc: "images/Fond3.png",
            storyText: "",
            machineText: ""
        },
        {
            titleSrc: "images/Titre4.png",
            maskSrc: "images/Fond4.png",
            storyText: "",
            machineText: ""
        },
        {
            titleSrc: "images/Titre5.png",
            maskSrc: "images/Fond5.png",
            storyText: "",
            machineText: ""
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
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);

                streaming = true;
            }
        }, false);

        clearphoto();
    }

    // USELESS
    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);

          var img = document.getElementById("story-mask");
          context.drawImage(img, 0, 0, width, height);

          var data = canvas.toDataURL('image/png');
          photo.setAttribute('src', data);

          video.pause();
        }
        else {
          clearphoto();
        }
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