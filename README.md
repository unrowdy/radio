# Online Radio

![screenshot](dist/img/screencast.gif)

https://chrispalmeri.com/radio/

As tuned in Saint Marys, Kansas. Not an actual radio. Uses data from publicly accessible HTTP streams. Results may vary based on browser and device. Saves current station and preset info to your device.

## Advanced

From Developer Tools console in browser.

  * `settings.color('#27b7dc');`
  * `settings.volume(0.5);`
  * `settings.visualizer(false);`

## Issues

  * Crashes tab sometimes
  * Plays half speed occasionally and visualizer is frozen
  * wrong scale initially (on one mobile device)
  * larger bottom margin (on one mobile device)
  * Visualizer only occupying the first 7 columns on one machine, weird

## To do

  * pass more data around vs including modules everywhere
  * index.html still has canvas
  * clean up visualizer on/off code
    * also the waterfall down was kinda cool
  * More responsive design
  * Debug option (for lcd off color mostly)
  * Link back to v1
  * Merge
  * Add settings to storage
  * Build system
    * npm for rollup and replace vagrant
  * console log error and fallback
  * Display one large svg (can you still have fade in?)
  * Load your own JSON
  * Help text
  * Tone control
