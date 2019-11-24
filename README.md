# Online Radio

![screenshot](dist/img/screencast.gif)

https://chrispalmeri.com/radio/

As tuned in Saint Marys, Kansas. Not an actual radio. Uses data from publicly accessible HTTP streams. Results may vary based on browser and device. Saves current station and preset info to your device.

## Advanced

From Developer Tools console in browser.

  * `settings.color('#27b7dc');` 
  * `settings.volume(0.5);`

## Issues

  * Crashes tab sometimes (on one pc) possible fixed
  * Plays in slow mo occasionally and have to reselect that station to fix
  * wrong scale initially (on one mobile device)
  * larger bottom margin (on one mobile device)

## To do

  * Measure performance of svg vs canvas
  * change backing store if not good
  * index.html still has canvas

  * Display one large svg
  * npm for rollup and replace vagrant
  * clean up visualizer on/off code

  * More responsive design
  * Debug option (for lcd off color mostly)
  * Link back to v1
  * Merge
  * Keyboard shortcuts
  * Add settings to storage
  * Build system
  * console log error and fallback
  * Option to disable visualizer
  * Load your own JSON
  * Help text
  * Tone control
