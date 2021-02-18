# Chrome Dev Tool

## Elements

- styles
  - css (classes, values, rule)
  - dom
  - toggle style
  - color picker
  - show computed style
- dom manipulation (hide/show node), use:
  - $0 ($1, $2, $3, $4) last inspected elements
  - $\_ most recent evaluation
  - $(selector) or $$(selector)
- monitorEvent: `monitorEvents($('.letter'), 'mousedown')` `unmonitorEvents($('.letter'), 'mousedown')`
- Cmd+Shift+P:
  - FPS
  - Sensors
  - rendering
  - coverage
  - animations (animate.css)
- mobile

## Console

- play with log levels, filter by text/regex
- options:
  - persist messages
  - xhr
- live expressions

## Sources

- breakpoints (hand, xhr, event)
- snippets

## Security

## Network

- capture screenshots
- show overview (and selet in the timeline)
- timing (TTFB stands for Time To First Byte)
- slower network - disable cache
- request blocking (Cmd+Shift+P - blocking)
- copy request (as CUrl)

## performance

!! Change to production build

- describe
  - FPS / CPU : NET
- elements
  - Frames:
    - duration and FPS
    - red when FPS too low
  - Main:
    - run perf audit on load and focus on `long tasks` with CPU 6x slower
    - use Shift to select portion
  - Network:
    - time to load each file
    - legend:
      - HTML: Blue
      - CSS: Purple
      - JS: Yellow
      - Images: Green
    - boxes:
      - Everything before Request Sent, exclusive.
      - The light portion of the bar is Request Sent and Waiting (TTFB: Time To First Byte).
      - The dark portion of the bar is Content Download.
      - The right line is essentially time spent waiting for the main thread. This is not represented in the Timing tab.
  - Memory option to click
  - Web vitals : <https://web.dev/vitals/#core-web-vitals>
- Enable advanced paint instrumentation ("Layers", "Paint profiler")
- Use Javascript Profiler
