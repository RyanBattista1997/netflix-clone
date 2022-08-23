site at https://ryanbattista1997.github.io/netflix-clone/

INFO ABOUT SITE LIMIATIONS:
 - mobile view doesn't switch to portrait posters as the api data rarely has both images, and it would take alot of filtering slowing down the app and increaing api        requests 
 - home/viewlist functionality isn't added as this is user specific data and users aren't currently setup
 - originals temporarily just shows series results as not sure if you can query responses via company atm

TODO

1) fix CI/C
Since carousel doesnt actually scroll, can render only max images on the screen at a given time instead
2) render less images (loading time halfed lmao)
   - use media to set max images on screen (done)
3) add mobile responsiveness (90% done)
   - resize images (done)
   - resize font(done)
   - fix hover scaling (done)
   - condtionally render header elements (done)
   - fix logo centering on mob view (done)
   - fix media query bugs (done)
   - add footer for mobile
      - make header links components (done)
      - make footer components(done)
      - add mobile search bar(done)
      - add mob search logic (done)
      - add mobile menu (done)
      - fix footer event handler (done)
      - fix footer vieport bug on for android google apps(done)
      - add menu link logic (done)
      - make media queries close menu (didn't do this but fixed anyway)
      - fix icon loading in mobile menu (for some reason only notification icon loads slow)
      - add touch scroll event for menu links (done)
      - add notification component
4) create video player component for trailers
