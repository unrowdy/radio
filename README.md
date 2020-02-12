# Online Radio

![screenshot](img/screencast.gif)

https://chrispalmeri.com/radio/v2/

As tuned in Saint Marys, Kansas. Not an actual radio. Uses data from publicly accessible HTTP streams. Results may vary based on browser and device. Saves current station and preset info to your device.

## Local Develpoment

Easiest way to run locally is in stall python and run `python -m http.server` in this directory.

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
  * `settings.night(true);` or false
  * `settings.debug(true);` or false

## Fix before merge

  * Add new settings to storage
  * Create a link back to v1

## Refactor

  * run it through https://realfavicongenerator.net/
  * adding stations is a breaking change for presets...
  * debug should change main class
  * debug should toggle console logs
  * pass more data around vs including modules everywhere
  * keyboard presets are kinda hacky, also allow ten
  * Would visualizer look better at various zooms is 1/4 scale?
  * Build system
    * npm for rollup
  * Make display one large svg
    * maybe not, but 1/4 scale the whole thing like 7 segment already is, if you do

## Issues for later

  * Crashes tab sometimes
  * Plays half speed occasionally and visualizer is frozen
  * in chrome the player volume does not affect the audio context output
    * nuke volume, or rewrite audio sourcing
  * Visualizer only occupying the first 7 columns on one machine, weird

## Features for later

  * MediaSession API for media keys/android notification control
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
  * backlight on/off at night
  * buttons on/off at night
