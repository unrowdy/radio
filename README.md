# Online Radio

![screenshot](dist/img/screencast.gif)

https://chrispalmeri.com/radio/v2/

As tuned in Saint Marys, Kansas. Not an actual radio. Uses data from publicly accessible HTTP streams. Results may vary based on browser and device. Saves current station and preset info to your device.

## Keyboard shortcuts

Key | Description
---|---
`Spacebar` | ON/OFF toggle
`Left Arrow` | Previous station
`Right Arrow` | Next station
`s` | SET toggle
`1` | Preset 1
`2` | Preset 2
`3` | Preset 3
`4` | Preset 4
`5` | Preset 5
`-` | Volume down
`=` | Volume up
`,` | Previous color filter
`.` | Next color filter

## Console commands

  * `settings.volume(0.5);` or any value between 0 and 1
  * `settings.visualizer(false);` or true

## Fix before merge

  * Add new settings to storage
  * Create a link back to v1
  * Update screencast

## Verify if fixed

  * Crashes tab sometimes
  * Plays half speed occasionally and visualizer is frozen

## Refactor

  * use classes for color changing display and player
    * debug should change main class
  * debug should toggle console logs and whole fps block
  * pass more data around vs including modules everywhere
  * keyboard presets are kinda hacky, also allow ten
  * visualizer turn off based on it being hidden due to screen size
    * and hide based on being turned off
  * Build system
    * npm for rollup and replace vagrant
  * Make display one large svg
    * maybe not, but 1/4 scale the whole thing like 7 segment already is, if you do

## Issues for later

  * in chrome the player volume does not affect the audio context output
    * nuke volume, or rewrite audio sourcing
  * spacebar does wierd things when you have a button active still from previous mouse click
  * Visualizer only occupying the first 7 columns on one machine, weird

## Features for later

  * `?` should show keyboard shortcuts
  * touch equivalents for keyboard commands
  * volume indicator would be nice cause there is a lag
  * Load your own JSON
  * Continuous integration
  * Help text
  * add seek animation
  * https indicator
  * blog post
  * Tone control
  * dual zone lighting
  * day/night toggle
