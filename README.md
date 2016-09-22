# Bird Strike
<br />
## Overview
Objective: Fly around while avoiding incoming pipes!

<a href="http://amituuush.github.io/lyst/public/">Click here</a> for a demo.

## Technical
• The app is built in JavaScript on HTML canvas<br />
• Gulp is used as a build system<br />
• User high scores are stored using local storage<br />

<br /><br />

<img src="img/bird-strike-game.png" style="width: 400px" />

<br /><br />
## Challenges
One of the biggest challenges of this project was building the physics and collision components as I had to refresh my memory on several geometry concepts. For example, when calculating whether a collision is made between a bird and a pipe, I only knew the x and y coordinates, and sizes of the bird and pipe. Using this information I could calculate the distance between the center of the circle and the closest point of the pipe to the circle using Pythagorean theorem. I'd then compare this to radius to determine whether. If the radius is greater than the distance between the center of the circle and the closest point of the pipe, then a collision has occurred. Otherwise, no collision.
<br />

<img src="img/bird-strike-start-screen.png" style="width: 400px" />

<br /><br />
## Development Roadmap
Future developments of the app will include:<br />
• Ability to choose bird color<br />
• Implement different difficulty levels of the game, with more difficult levels having pipes that move faster.
• Different backgrounds and obstacles
<br />
• Make app responsive and function on smartphones <br />
• Have background slowly move to make bird appear as if it were traveling through space<br />
• Display user's last 5 scores in addition to high score<br />
