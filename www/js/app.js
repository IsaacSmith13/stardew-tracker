var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'stardew-tracker',
  // App id
  id: 'com.isaactsmith.stardewtracker',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
    },
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');