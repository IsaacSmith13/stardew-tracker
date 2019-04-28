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

var database = [
  {
    name: "Blueberry",
    desc: "Seeds at Pierre's Shop",
    season: ["summer"],
    type: "farming"
  }
];

var items = []



var virtualList = app.virtualList.create({
  // List Element
  el: '#summerList',
  // Pass array with items
  items: items,
  // List item Template7 template
  itemTemplate:
    // header with desciption
    '<li>' +
    '<div class="item-content desc">' +
    '<div class="item-media">' +
    '<i class="icon my-icon"></i>' +
    '</div>' +
    '<div class="item-inner">' +
    '<div class="item-title">' +
    'Name' +
    '</div>' +
    '<div class="item-after">' +
    'Where to get' +
    '</div>' +
    '<div class="item-after">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</li>' +

    items +

    '<li>' +
    '<div class="item-content">' +
    '<div class="item-media">' +
    '<i class="icon my-icon"></i>' +
    '</div>' +
    '<div class="item-inner">' +
    '<div class="item-title">' +
    'Blueberry' +
    '</div>' +
    '<div class="item-after">' +
    'Seeds at Pierre\'s Shop' +
    '</div>' +
    '<div class="item-after">' +
    '<label class="checkbox">' +
    '<input type="checkbox">' +
    '<i class="icon-checkbox"></i>' +
    '</label>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</li>',
  height: 73,
});