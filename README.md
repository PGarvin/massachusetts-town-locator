# massachusetts-town-locator
This is code that generates a locator of a Massachusetts town, designed in 2018 to run in the Globe's Address section.

## How does this work?
There is an SVG in the HTML file.

There is a dropdown where you can select which of the 351 Massachusetts towns you wish to show.

The dropdown then triggers a function called "highlight." The JavaScript gets the selected value and finds the SVG element with that same name. That element is then turned red.

The red circle can be turned on or off using a dropdown. The circle has a diameter exactly 14 pixels wider than the town itself. Here's how it does that: The JavaScript gets the dimensions for the town and calculates whether the town is taller than it is wide or wider than it is tall. Whichever value is longer is divided by 2, and then 7 is added. That is the value for the radius of the circle. The circle's position is also determined using the information on the town's location within the SVG.

The third dropdown allows the user to adjust the size and scale of the map. The default setting is for 364.54 points, as that was the size that Eileen often used when creating the maps for her section of the newspaper. But the dropdown also allowed her (and anyone else) to adjust the size to be one, two, three, four, five or six columns wide on a six-column grid (based on the Boston Globe's page dimensions).

The "Generate Map" button triggers some code obtained here from dandavis:
http://danml.com/download.html

What the code does is download a JPG of the map, sized appropriately based on the information from the dropdowns.
