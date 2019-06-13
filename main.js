'use strict';
(function() {
  // global variables

  // called once on page load
  var init = function() {

    var highwaysigns = document.querySelectorAll('.highwaysigns');

    var textLabel = document.getElementById('textLabel');

    var defaultColor = "#eee";

    var states = document.querySelectorAll('#svg .state');

    var svg = document.querySelector("svg");
    var highways = document.getElementById('highways');
    var innards;

    var dropdown = document.querySelectorAll('.dropdown');

    var circles;
    var button = document.getElementById('button');

    var mapWidth = 364.54;
    var column = (123.33333);
    var gutter = 12;

    var sizes = document.getElementById('sizes');


    //This establishes what the guts of the SVG is like before we start adding labels and what-not.
    innards = highways.innerHTML;

    var communities = document.getElementById('communities');


    //This is the function that highlights the town.
    var highlight = function(thisTown) {
      var textdimensions;
      var circle;
      var dimensions;
      var circleSize;
      var circleX;
      var circleY;
      var diff;
      var textX;
      var textY;

      highways.innerHTML = innards + '<g style="fill:#d02329; opacity:0.95;" transform="translate(12,12)">' + document.getElementById(thisTown).innerHTML + '</div>';

      //This converts all the towns back to their default gray.
      for (var i = 0; i < states.length; i++) {
        states[i].style.fill = defaultColor;
        states[i].style.stroke = '#777';
      }

      circle = document.getElementById('circle');

      //This takes the down that has been selected and turns it red.
      document.getElementById(thisTown).style.fill = "#d02329";

      //The following code gets the dimensions of the town and then sizes and places the circle based on the dimensions.
      dimensions = document.getElementById(thisTown).getBBox();



      //If the town is taller than it is wide, the circle is sized to be as tall as the town.
      //If the town is wider than it is tall, the circle is sized to be as wide as the town.
      if (dimensions.height > dimensions.width) {
        circleSize = dimensions.height;
      } else {
        circleSize = dimensions.width;
      }

      circleSize = Number(circleSize / 2);
      circle.setAttribute("r", circleSize + 7);

      circleX = dimensions.x + circleSize;
      circleY = dimensions.y + circleSize;
      diff = dimensions.height - dimensions.width;
      if (diff > 0) {
        circleX = circleX - (diff / 2);
      } else {
        diff = diff * -1;
        circleY = circleY - (diff / 2);
      }
      circle.setAttribute("cx", circleX);
      circle.setAttribute("cy", circleY);
      circle.setAttribute("opacity", 0.99);

      //This helps us place the text in a place where it won't get cut off.
      textX = dimensions.x - circleSize;
      textY = dimensions.y - circleSize;

      if (textX > 770) {
        textX = textX - 50;
      }
      textLabel.setAttribute("x", textX);
      textLabel.setAttribute("y", textY);

      textdimensions = textLabel.getBBox();

      //This code checks to make sure the text label for the town is not overlapping with the highway signs.
      for (var h = 0; h < highwaysigns.length; h++) {
        var hdimension = highwaysigns[h];
        hdimension.style.opacity = 1;
        var hx = hdimension.transform.animVal[0].matrix.e;
        var hy = hdimension.transform.animVal[0].matrix.f;
        var overlapX = Math.abs(hx - circleX);
        var overlapY = Math.abs(hy - circleY);
        var overlaptextX = Math.abs(hx - textX);
        var overlaptextY = Math.abs(hy - textY);
        var tooClose = 55;

        if ((Math.abs(hx - circleX) < tooClose && Math.abs(hy - circleY) < tooClose) || (Math.abs(hx - textdimensions.x) < tooClose && Math.abs(hy - textdimensions.y) < tooClose) || (Math.abs(hx - textdimensions.x - textdimensions.width) < tooClose && Math.abs(hy - textdimensions.y) < tooClose)) {
          hdimension.style.opacity = 0;
        }
      }
    }

    //This runs the code so that the default view the reader sees is Abington.
    highlight("abington");

    //This re-runs the highlight function with whatever community is selected from the dropdown.
    communities.addEventListener('change', function() {

      highlight(communities.value);
      textLabel.textContent = communities.options[communities.selectedIndex].text;

    });

    //This is the part of the code where the user can decide if they want the circles or not.
    circles = document.getElementById('circles');
    circles.addEventListener('change', function() {

      if (circles.value === "nocircle") {
        circle.style.opacity = 0;
      } else {
        circle.style.opacity = 1;
      }

    });

    //This is the part of the code where the user can decide what size the map should be.
    sizes.addEventListener('change', function() {

      if (sizes.value === "364.54") {
        mapWidth = Number(364.54);
      } else {
        mapWidth = Number(sizes.value) * Number(column) + Number(sizes.value - 1) * gutter;
      }

      //mapWidth = Number(4/3)*Number(mapWidth);
    });

    //This is the part of the code where the user can download the code.
    //This code refers to the download.js file, which comes from dandavis		
    button.addEventListener('click', function() {
      var img;
      var svgData = new XMLSerializer().serializeToString(svg);
      var canvas = document.createElement("canvas");

      var ctx = canvas.getContext("2d");
      var ratio = 919 / 607;

      canvas.width = Number(mapWidth);
      canvas.height = Number(mapWidth / ratio);

      canvas.width = Number(mapWidth);
      canvas.height = Number(mapWidth / ratio);

      img = document.createElement("img");
      img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
      img.onload = function() {
        ctx.drawImage(img, 0, 0);

        // Now is done
        download(canvas.toDataURL("image/jpg", 1.0), communities.value + ".jpg", "image/jpg");
        //	download( canvas.toDataURL( "image/png" ), communities.value+"_xx.png", "image/png");

      };

    });

    textLabel.textContent = communities.options[communities.selectedIndex].text;

  };


  // run code
  init();
})();