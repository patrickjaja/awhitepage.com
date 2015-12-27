/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
    'use strict';

    var navdrawerContainer = document.querySelector('.navdrawer-container');
    var appbarElement = document.querySelector('.app-bar');
    var menuBtn = document.querySelector('.menu');
    var main = document.querySelector('main');
    var apiuri = "http://www.myspass.de/myspass/includes/apps/video/getvideometadataxml.php";
    
    function closeMenu() {
        appbarElement.classList.remove('open');
        navdrawerContainer.classList.remove('open');
    }

    function toggleMenu() {
        appbarElement.classList.toggle('open');
        navdrawerContainer.classList.toggle('open');
    }

    main.addEventListener('ontouchstart', closeMenu);
    main.addEventListener('click', closeMenu);
    menuBtn.addEventListener('click', toggleMenu);
    navdrawerContainer.addEventListener('click', function (event) {
        if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
            closeMenu();
        }
    });
    
    $("#searchbtn").click(function(e) {
        if ($("#searchinput").val() != "") {
            $(".loading").show();
            var uri=$("#searchinput").val();
                uri=uri.split("/");
            var data={'v':uri[uri.length-2]};
            $.ajax({
                url : "shit.php",
                type: "POST",
                data : data,
                success: function(data, textStatus, jqXHR)
                {
                    if (data.indexOf(".mp4")>0) {
                        var video = document.getElementById('videlem');
                        video.src = data;
                        video.load();
                        video.pause();
                        video.addEventListener('loadeddata', function() {
                            var video = document.getElementById('videlem');
                            $("#videlem").show();
                            $("#err").hide();
                            $(".loading").hide();
                        }, false);
                        
//                        video.addEventListener('ondblclick', function(e){
//                            var vid = document.getElementById('videlem');
//                            vid.play();
//                            if (vid.requestFullscreen) {
//                              vid.requestFullscreen();
//                            } else if (vid.mozRequestFullScreen) {
//                              vid.mozRequestFullScreen();
//                            } else if (vid.webkitRequestFullscreen) {
//                              vid.webkitRequestFullscreen();
//                            }
//                        });
                    } else {
                        $("#err").show();
                        $("#videlem").hide();
                        $(".loading").hide();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    alert("Error. Bitte PJAJA fragen.");
                }
            });
            
//                    http://www.myspass.de/myspass/shows/tvshows/tv-total/TV-total-Sendung-vom-04062014--/17759/
        } else {
            $("#err").show();
            $("#videlem").hide();
        }
    });
})();

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}
