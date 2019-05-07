// Main function - called at end of file after database is constructed
function main() {

  // Instantiate application using Framework7
  const app = new Framework7({
    root: '#app',
    name: 'stardew-tracker',
    id: 'com.isaactsmith.stardewtracker'
  });
  const mainView = app.views.create('.view-main');

  // Add formatted names and images to items systematically  
  database.forEach(function (item) {
    item.formattedName = item.name.split(" ").join("").split("#").join("");
    item.img = `img/items/${item.formattedName}.png`;
  });

  // If user doesn't yet have a save file
  if (localStorage.getItem("save") === null) {
    console.log("null save");
    // Create a save file for them
    initialSave = {};
    database.forEach(function (item) {
      initialSave[item.formattedName] = ""
    });
    localStorage.setItem("save", JSON.stringify(initialSave));
  }
  // Either way, load the save file for later usage
  let saveFile = JSON.parse(localStorage.getItem("save"));

  // Populates all season tabs with data
  function populateSeasons(seasonList, categoryList) {
    // Iterate through each season's tab
    seasonList.forEach(function (season) {
      let seasonContent = "";
      // Iterate through each category
      categoryList.forEach(function (category) {
        // Winter contains no farming items, so skip the category
        if (season === "winter" && category === "farming") {
          return;
        }
        // Only "any" has mining and misc, so skip them otherwise
        if (season !== "any" && category === "mining") {
          return;
        }
        if (season !== "any" && category === "misc") {
          return;
        }
        // Announce the catagory and start a list
        let categoryContent = `
          <div class="list">
            <button class="button-hide no-ripple">${category.charAt(0).toUpperCase() + category.slice(1)}<i class="icon-down-open"></i></button>
            <ul class="hidden line">
          `;
        // Iterate through the database
        database.forEach(function (item) {
          // If the item is in this season AND catagory, add it to the list
          if (item.season.includes(season) && item.category === category) {
            categoryContent += `
          <li class="shownLi">
              <div class="item-content no-padding">
                  <div class="item-inner">
                      <div class="item-media">
                          <img src="${item.img}" width="48" height="48">
                      </div>
                      <div class="item-title">
                          <button class="button-name button${item.formattedName}">${item.name}<i class="icon-down-open"></i></button>
                      </div>
                      <div class="item-after">
                          <label class="checkbox">
                              <input class="check${item.formattedName}" type="checkbox" ${saveFile[item.formattedName]}>
                              <i class="icon-checkbox"></i>
                          </label>
                      </div>
                  </div>
              </div>
          </li>
          <li class="hidden">
              <div class="desc">
                  ${item.desc}
              </div>
          </li>`
          }
        });
        // End the list
        categoryContent += `
              </ul>
          </div>`;
        // Append this catagory to the season
        seasonContent += categoryContent;
      });
      // Change the content of this season's tab to the HTML created by the function
      document.getElementById(season).innerHTML = seasonContent;
    });
  }

  // Instantiate parameters for populateSeasons and call it
  const seasonList = ["spring", "summer", "fall", "winter", "any"];
  const categoryList = ["farming", "foraging", "fishing", "mining", "misc"];
  populateSeasons(seasonList, categoryList);


  // Populates all bundle tabs with data
  function populateBundles(roomList, bundles) {
    roomList.forEach(room => {
      let roomContent = "";
      bundles[room[0]].forEach(bundle => {
        // Announce the catagory and start a list
        let bundleContent = `
        <div class="list">
          <button class="button-hide no-ripple">${bundle[0]} Bundle<i class="icon-down-open"></i></button>
          <ul class="hidden line">
        `;
        // Iterate through the database
        database.forEach(function (item) {
          // If the item is in this season AND catagory, add it to the list
          if (item.bundle === bundle[0]) {
            bundleContent += `
          <li class="shownLi">
              <div class="item-content no-padding">
                  <div class="item-inner">
                      <div class="item-media">
                          <img src="${item.img}" width="48" height="48">
                      </div>
                      <div class="item-title">
                          <button class="button-name">${item.name}<i class="icon-down-open"></i></button>
                      </div>
                      <div class="item-after">
                          <label class="checkbox">
                              <input class="check${item.formattedName}" type="checkbox" ${saveFile[item.formattedName]}>
                              <i class="icon-checkbox"></i>
                          </label>
                      </div>
                  </div>
              </div>
          </li>
          <li class="hidden">
              <div class="desc">
                  ${item.desc}
              </div>
          </li>`
          }
        });

        // End the list
        bundleContent += `
          <li class="shownLi">
                <div class="item-content no-padding">
                  <div class="item-inner justify-content-center">
                    <div class="item-media">
                      <img src="img/rewards/BundleReward.png" width="48" height="48">
                    </div>
                    <div class="item-title">
                        <button class="button-name">Reward <i class="icon-down-open"></i></button>
                    </div>
                    <div class="item-after">
                      <label class="checkbox dummy">
                        <input class="check" type="checkbox" disabled>
                        <i class="icon-checkbox"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </li>
              <li class="hidden">
                <div class="item-content no-padding">
                  <div class="item-inner">
                    <div class="item-media">
                      <img src="img/rewards/${bundle[1].split(' ').join('').split(':').join('')}.png" width="48" height="48">
                    </div>
                    <div class="item-title text-align-center">
                      ${bundle[1]}
                    </div>
                    <div class="item-after">
                      <label class="checkbox dummy">
                        <input class="check" type="checkbox" disabled>
                        <i class="icon-checkbox"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
        </div>`;
        // Append this catagory to the season
        roomContent += bundleContent;
      });
      // Change the content of this season's tab to the HTML created by the function
      document.getElementById(room[0]).innerHTML = roomContent + `
      <div class="list">
        <button class="button-hide no-ripple">Reward <i class="icon-down-open"></i></button>
        <span class="line hidden">
          <div class="bundle-desc">
          ${room[1]}
          </div>
        </span>
      </div>`;
    });
  }

  // Instantiate parameters for populateBundles and call it
  const roomList = [
    ["craftsRoom", "Repairs the bridge to the east of the mines entrance, giving you access to the Quary. There is a wide selection of rocks and mining nodes generated here daily."],
    ["pantry", "Repairs the Greenhouse on your farm. The greenhouse provides a 10x12 tile area for crops. Note that you can grow any crop here regardless of season."],
    ["fishTank", "Removes the Glittering Boulder at the source of the river. Willy gives you the Copper Pan once you walk near the mines after you complete this room. The pan allows you to pan for minerals in water on shimmering light patches that occasionally spawn."],
    ["boilerRoom", "Repairs the Minecarts, giving you access to quick travel all across the map! There are mine carts at the Bus Stop, Mines, Quarry, and by Clint's Workshop."],
    ["bulletinBoard", "Grants you two hearts of friendship with all non-datable villagers that you have previously met."]
  ];
  const bundles = {
    craftsRoom: [["Spring Foraging", "Spring Seeds x30"], ["Summer Foraging", "Summer Seeds x30"], ["Fall Foraging", "Fall Seeds x30"], ["Winter Foraging", "Winter Seeds x30"], ["Exotic Foraging", "Autumn's Bounty x5"], ["Construction", "Charcoal Kiln"]],
    pantry: [["Spring Crops", "Speed-Gro x20"], ["Summer Crops", "Quality Sprinkler"], ["Fall Crops", "Bee House"], ["Quality Crops", "Preserves Jar"], ["Animal", "Cheese Press"], ["Artisan", "Keg"]],
    fishTank: [["River Fish", "Bait x30"], ["Lake Fish", "Dressed Spinner"], ["Ocean Fish", "Warp Totem: Beach x5"], ["Night Fish", "Small Glow Ring"], ["Specialty Fish", "Dish o' the Sea x5"], ["Crab Pot", "Crab Pot x3"]],
    boilerRoom: [["Blacksmith's", "Furnace"], ["Geologist's", "Omni Geode x5"], ["Adventurer's", "Small Magnet Ring"]],
    bulletinBoard: [["Chef's", "Pink Cake x3"], ["Dye", "Seed Maker"], ["Field Research", "Recycling Machine"], ["Fodder", "Heater"], ["Enchanter's", "Gold Bar x5"]]
  };
  populateBundles(roomList, bundles);


  // Add click listeners to checkboxes to update user save file
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  // Iterate through checkboxes
  checkboxes.forEach(function (checkbox) {
    // Add a click listener
    checkbox.addEventListener("click", function () {
      // Select all instances of this item from each tab
      document.querySelectorAll("." + checkbox.className).forEach(function (item) {
        // Make each instance have the same .checked property as the clicked one
        item.checked = (checkbox.checked === true ? true : false)
      });
      // Save the checked property in localStorage
      let check = checkbox.className.slice(5);
      saveFile[check] = (saveFile[check] === "" ? "checked" : "");
      localStorage.setItem("save", JSON.stringify(saveFile));
    });
  });


  // Add click listeners to item name buttons to display/hide dropdown descriptions
  const itemButtons = document.querySelectorAll(".button-name");
  // Iterate through itemButtons
  itemButtons.forEach(function (button) {
    // Add a click listener
    button.addEventListener("click", function () {
      // Toggle the hidden class on its description
      button.closest(".shownLi").nextElementSibling.classList.toggle("hidden");
      // Toggle the chevron icon to the correct direction
      let chevron = button.lastElementChild;
      chevron.outerHTML = (chevron.outerHTML === `<i class="icon-down-open"></i>` ?
        `<i class="icon-up-open"></i>` : `<i class="icon-down-open"></i>`);
    });
  });


  // Add click listeners to category buttons to display/hide items within
  const categoryButtons = document.querySelectorAll(".button-hide");
  // Iterate through categoryButtons
  categoryButtons.forEach(function (button) {
    // Add a click listener
    button.addEventListener("click", function () {
      // Toggle the hidden class on its contained list of items
      button.nextElementSibling.classList.toggle("hidden");
      // Toggle the chevron icon to the correct direction
      let chevron = button.lastElementChild;
      chevron.outerHTML = (chevron.outerHTML === `<i class="icon-down-open"></i>` ?
        `<i class="icon-up-open"></i>` : `<i class="icon-down-open"></i>`);
    });
  });
}


// Database of all items
const database = [
  {
    name: "Quality Parsnips x5",
    desc: "Seeds available at Pierre's shop.<br>Gold quality only; five needed.",
    season: ["spring"],
    category: "farming",
    bundle: "Quality Crops"
  },
  {
    name: "Parsnip",
    desc: "Seeds available at Pierre's shop.",
    season: ["spring"],
    category: "farming",
    bundle: "Spring Crops"
  },
  {
    name: "Green Bean",
    desc: "Seeds available at Pierre's shop.",
    season: ["spring"],
    category: "farming",
    bundle: "Spring Crops"
  },
  {
    name: "Cauliflower",
    desc: "Seeds available at Pierre's shop.",
    season: ["spring"],
    category: "farming",
    bundle: "Spring Crops"
  },
  {
    name: "Potato",
    desc: "Seeds available at Pierre's shop.",
    season: ["spring"],
    category: "farming",
    bundle: "Spring Crops"
  },
  {
    name: "Quality Corn x5",
    desc: "Seeds available at Pierre's shop. Gold quality only; five needed.",
    season: ["summer", "fall"],
    category: "farming",
    bundle: "Quality Crops"
  },
  {
    name: "Corn",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer", "fall"],
    category: "farming",
    bundle: "Fall Crops"
  },
  {
    name: "Quality Melons x5",
    desc: "Seeds available at Pierre's shop.<br>Gold quality only; five needed.",
    season: ["summer"],
    category: "farming",
    bundle: "Quality Crops"
  },
  {
    name: "Melon",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming",
    bundle: "Summer Crops"
  },
  {
    name: "Tomato",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming",
    bundle: "Summer Crops"
  },
  {
    name: "Blueberry",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming",
    bundle: "Summer Crops"
  },
  {
    name: "Hot Pepper",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming",
    bundle: "Summer Crops"
  },
  {
    name: "Quality Pumpkins x5",
    desc: "Seeds available at Pierre's shop.<br>Gold quality only; five needed.",
    season: ["fall"],
    category: "farming",
    bundle: "Quality Crops"
  },
  {
    name: "Pumpkin",
    desc: "Seeds available at Pierre's shop.",
    season: ["fall"],
    category: "farming",
    bundle: "Fall Crops"
  },
  {
    name: "Eggplant",
    desc: "Seeds available at Pierre's shop.",
    season: ["fall"],
    category: "farming",
    bundle: "Fall Crops"
  },
  {
    name: "Yam",
    desc: "Seeds available at Pierre's shop.",
    season: ["fall"],
    category: "farming",
    bundle: "Fall Crops"
  },
  {
    name: "Wild Horseradish",
    desc: "Found via foraging in the Spring or randomly grown from Spring Seeds.",
    season: ["spring"],
    category: "foraging",
    bundle: "Spring Foraging"
  },
  {
    name: "Daffodil",
    desc: "Found via foraging in the Spring or randomly grown from Spring Seeds.",
    season: ["spring"],
    category: "foraging",
    bundle: "Spring Foraging"
  },
  {
    name: "Leek",
    desc: "Found via foraging in the Spring or randomly grown from Spring Seeds.",
    season: ["spring"],
    category: "foraging",
    bundle: "Spring Foraging"
  },
  {
    name: "Dandelion",
    desc: "Found via foraging in the Spring or randomly grown from Spring Seeds.",
    season: ["spring"],
    category: "foraging",
    bundle: "Spring Foraging"
  },
  {
    name: "Grape",
    desc: "Found via foraging in the Summer or randomly grown from Summer Seeds.",
    season: ["summer"],
    category: "foraging",
    bundle: "Summer Foraging"
  },
  {
    name: "Spice Berry",
    desc: "Found via foraging in the Summer, randomly grown from Summer Seeds, or from The Cave if you selected the fruit bat option.",
    season: ["summer"],
    category: "foraging",
    bundle: "Summer Foraging"
  },
  {
    name: "Sweet Pea",
    desc: "Found via foraging in the Summer or randomly grown from Summer Seeds.",
    season: ["summer"],
    category: "foraging",
    bundle: "Summer Foraging"
  },
  {
    name: "Common Mushroom",
    desc: "Found via foraging in the Fall, randomly grown from Fall Seeds, or from The Cave if you selected the mushroom option.",
    season: ["fall"],
    category: "foraging",
    bundle: "Fall Foraging"
  },
  {
    name: "Wild Plum",
    desc: "Found via foraging in the Fall, randomly grown from Fall Seeds, or from The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "foraging",
    bundle: "Fall Foraging"
  },
  {
    name: "Hazelnut",
    desc: "Found via foraging in the Fall or randomly grown from Fall Seeds.",
    season: ["fall"],
    category: "foraging",
    bundle: "Fall Foraging"
  },
  {
    name: "Blackberry",
    desc: "Found via foraging in the Fall, randomly grown from Fall Seeds, or from The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "foraging",
    bundle: "Fall Foraging"
  },
  {
    name: "Winter Root",
    desc: "Found via using the Hoe in the Winter or randomly grown from Winter Seeds.",
    season: ["winter"],
    category: "foraging",
    bundle: "Winter Foraging"
  },
  {
    name: "Crystal Fruit",
    desc: "Found via foraging in the Winter or randomly grown from Winter Seeds.",
    season: ["winter"],
    category: "foraging",
    bundle: "Winter Foraging"
  },
  {
    name: "Snow Yam",
    desc: "Found via using the Hoe in the Winter or randomly grown from Winter Seeds.",
    season: ["winter"],
    category: "foraging",
    bundle: "Winter Foraging"
  },
  {
    name: "Crocus",
    desc: "Found via foraging in the Winter or randomly grown from Winter Seeds.",
    season: ["winter"],
    category: "foraging",
    bundle: "Winter Foraging"
  },
  {
    name: "Wood x99",
    desc: "Maybe try punching a tree? Not sure.",
    season: ["any"],
    category: "misc",
    bundle: "Construction"
  },
  {
    name: "Wood x99 #2",
    desc: "Maybe try punching a tree? Not sure.",
    season: ["any"],
    category: "misc",
    bundle: "Construction"
  },
  {
    name: "Stone x99",
    desc: "Found everywhere. Use a pickaxe.",
    season: ["any"],
    category: "misc",
    bundle: "Construction"
  },
  {
    name: "Hardwood x10",
    desc: "Requires a copper axe or better to obtain. You start with some logs on your farm, but it also spawns in the Secret Woods daily. The Secret Woods requires a copper axe or better to access.",
    season: ["any"],
    category: "misc",
    bundle: "Construction"
  },
  {
    name: "Coconut",
    desc: "Found via foraging in The Desert. You can't get there until you complete the Vault bundles.",
    season: ["any"],
    category: "foraging",
    bundle: "Exotic Foraging"
  },
  {
    name: "Cactus Fruit",
    desc: "Found via foraging in The Desert. You can't get there until you complete the Vault bundles.",
    season: ["any"],
    category: "misc",
    bundle: "Exotic Foraging"
  },
  {
    name: "Cave Carrot",
    desc: "Found laying around in The Mines.",
    season: ["any"],
    category: "mining",
    bundle: "Exotic Foraging"
  },
  {
    name: "Red Mushroom",
    desc: "Found laying around in The Mines, The Secret Woods during the summer, and in The Cave if the mushroom option is chosen. The Secret Woods requires a copper axe or better to access.",
    season: ["any"],
    category: "mining",
    bundle: "Exotic Foraging"
  },
  {
    name: "Red Mushroom #2",
    desc: "Found laying around in The Mines, The Secret Woods during the summer, and in The Cave if the mushroom option is chosen. The Secret Woods requires a copper axe or better to access.",
    season: ["any"],
    category: "mining",
    bundle: "Dye"
  },
  {
    name: "Purple Mushroom",
    desc: "Found laying around in The Mines after floor 81, The Skull Cavern, and in The Cave if the mushroom option is chosen.",
    season: ["any"],
    category: "mining",
    bundle: "Exotic Foraging"
  },
  {
    name: "Purple Mushroom #2",
    desc: "Found laying around in The Mines after floor 81, The Skull Cavern, and in The Cave if the mushroom option is chosen.",
    season: ["any"],
    category: "mining",
    bundle: "Field Research"
  },
  {
    name: "Maple Syrup",
    desc: "Found by placing a tapper on a maple tree.",
    season: ["any"],
    category: "foraging",
    bundle: "Exotic Foraging"
  },
  {
    name: "Maple Syrup #2",
    desc: "Found by placing a tapper on a maple tree.",
    season: ["any"],
    category: "foraging",
    bundle: "Chef's"
  },
  {
    name: "Oak Resin",
    desc: "Found by placing a tapper on an oak tree.",
    season: ["any"],
    category: "foraging",
    bundle: "Exotic Foraging"
  },
  {
    name: "Oak Resin #2",
    desc: "Found by placing a tapper on an oak tree.",
    season: ["any"],
    category: "foraging",
    bundle: "Enchanter's"
  },
  {
    name: "Pine Tar",
    desc: "Found by placing a tapper on a pine tree.",
    season: ["any"],
    category: "foraging",
    bundle: "Exotic Foraging"
  },
  {
    name: "Morel",
    desc: "Found via foraging in The Secret Woods in the Spring, or from The Cave if you selected the mushroom option.",
    season: ["spring"],
    category: "foraging",
    bundle: "Exotic Foraging"
  },
  {
    name: "Large Milk",
    desc: "Raise friendship levels with your cows to produce large milk.",
    season: ["any"],
    category: "farming",
    bundle: "Animal"
  },
  {
    name: "Large Brown Egg",
    desc: "Raise friendship levels with your chickens to produce large eggs.",
    season: ["any"],
    category: "farming",
    bundle: "Animal"
  },
  {
    name: "Large Egg",
    desc: "Raise friendship levels with your chickens to produce large eggs.",
    season: ["any"],
    category: "farming",
    bundle: "Animal"
  },
  {
    name: "Large Goat Milk",
    desc: "Raise friendship levels with your goats to produce large goat milk.",
    season: ["any"],
    category: "farming",
    bundle: "Animal"
  },
  {
    name: "Wool",
    desc: "Adult sheeps will produce wool as soon as they mature.",
    season: ["any"],
    category: "farming",
    bundle: "Animal"
  },
  {
    name: "Duck Egg",
    desc: "Adult ducks will produce eggs as soon as they mature.",
    season: ["any"],
    category: "farming",
    bundle: "Animal"
  },
  {
    name: "Truffle Oil",
    desc: "Made in the Oil Maker with a truffle. Truffles are found by pigs when let outside.",
    season: ["spring", "summer", "fall"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Cloth",
    desc: "Made with the Loom by using wool. Wool comes from mature sheep.",
    season: ["any"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Goat Cheese",
    desc: "Made by putting goat milk in the Cheese Press.",
    season: ["any"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Cheese",
    desc: "Made by putting milk in the Cheese Press.",
    season: ["any"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Honey",
    desc: "Created by placing a bee house and using flowers on it.",
    season: ["spring", "summer", "fall"],
    category: "foraging",
    bundle: "Artisan"
  },
  {
    name: "Jelly",
    desc: "Created by placing nearly any fruit in a preserves jar.",
    season: ["any"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Apple",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Apple x3",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option. Three required.",
    season: ["fall"],
    category: "farming",
    bundle: "Fodder"
  },
  {
    name: "Apricot",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["spring"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Orange",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["summer"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Peach",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["summer"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Pomegranate",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Pomegranate #2",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "farming",
    bundle: "Enchanter's"
  },
  {
    name: "Cherry",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["spring"],
    category: "farming",
    bundle: "Artisan"
  },
  {
    name: "Sunfish",
    desc: "Can be caught in the river from 6am-7pm during sunny or windy days. Low difficulty.",
    season: ["spring", "summer"],
    category: "fishing",
    bundle: "River Fish"
  },
  {
    name: "Catfish",
    desc: "Can be caught in the river during Spring or Fall on rainy days. Also available during Summer, but only in The Secret Woods. High difficulty.",
    season: ["spring", "summer", "fall"],
    category: "fishing",
    bundle: "River Fish"
  },
  {
    name: "Shad",
    desc: "Can be caught in the river from 9am-2am on rainy days. Medium difficulty.",
    season: ["spring", "summer", "fall"],
    category: "fishing",
    bundle: "River Fish"
  },
  {
    name: "Tiger Trout",
    desc: "Can be caught in the river from 6am-7pm. Medium difficulty.",
    season: ["fall", "winter"],
    category: "fishing",
    bundle: "River Fish"
  },
  {
    name: "Largemouth Bass",
    desc: "Can be caught in the mountain lake from 6am-7pm. Medium difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Lake Fish"
  },
  {
    name: "Carp",
    desc: "Can be caught in the mountain lake. Low difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Lake Fish"
  },
  {
    name: "Bullhead",
    desc: "Can be caught in the mountain lake. Medium difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Lake Fish"
  },
  {
    name: "Sturgeon",
    desc: "Can be caught in the mountain lake from 6am-7pm. High difficulty.",
    season: ["summer", "winter"],
    category: "fishing",
    bundle: "Lake Fish"
  },
  {
    name: "Sardine",
    desc: "Can be caught in the ocean. Low difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Ocean Fish"
  },
  {
    name: "Tuna",
    desc: "Can be caught in the ocean from 6am-7pm. High difficulty.",
    season: ["summer", "winter"],
    category: "fishing",
    bundle: "Ocean Fish"
  },
  {
    name: "Red Snapper",
    desc: "Can be caught in the ocean from 6am-7pm on rainy days. Low difficulty.",
    season: ["summer", "fall"],
    category: "fishing",
    bundle: "Ocean Fish"
  },
  {
    name: "Tilapia",
    desc: "Can be caught in the ocean from 6am-2pm. Medium difficulty.",
    season: ["summer", "fall"],
    category: "fishing",
    bundle: "Ocean Fish"
  },
  {
    name: "Walleye",
    desc: "Can be caught in the river or mountain lake from 12pm-2am on rainy days. Medium difficulty.",
    season: ["fall", "winter"],
    category: "fishing",
    bundle: "Night Fish"
  },
  {
    name: "Bream",
    desc: "Can be caught in the river from 6pm-2am. Low difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Night Fish"
  },
  {
    name: "Eel",
    desc: "Can be caught in the ocean from 4pm-2am on rainy days. High difficulty.",
    season: ["spring", "fall"],
    category: "fishing",
    bundle: "Night Fish"
  },
  {
    name: "Crab",
    desc: "Can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "fishing",
    bundle: "Crab Pot"
  },
  {
    name: "Lobster",
    desc: "Can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "fishing",
    bundle: "Crab Pot"
  },
  {
    name: "Crayfish",
    desc: "Can be caught in any fresh water by using a crab pot.",
    season: ["any"],
    category: "fishing",
    bundle: "Crab Pot"
  },
  {
    name: "Cockle",
    desc: "Found via foraging on The Beach or can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "foraging",
    bundle: "Crab Pot"
  },
  {
    name: "Mussel",
    desc: "Found via foraging on The Beach or can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "foraging",
    bundle: "Crab Pot"
  },
  {
    name: "Shrimp",
    desc: "Can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "fishing",
    bundle: "Crab Pot"
  },
  {
    name: "Snail",
    desc: "Can be caught in any fresh water by using a crab pot.",
    season: ["any"],
    category: "fishing",
    bundle: "Crab Pot"
  },
  {
    name: "Periwinkle",
    desc: "Can be caught in any fresh water by using a crab pot.",
    season: ["any"],
    category: "fishing",
    bundle: "Crab Pot"
  },
  {
    name: "Oyster",
    desc: "Found via foraging on The Beach or can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "foraging",
    bundle: "Crab Pot"
  },
  {
    name: "Clam",
    desc: "Found via foraging on The Beach or can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "foraging",
    bundle: "Crab Pot"
  },
  {
    name: "Pufferfish",
    desc: "Can be caught in the ocean from 12pm-4pm on sunny days. High difficulty.",
    season: ["summer"],
    category: "fishing",
    bundle: "Specialty Fish"
  },
  {
    name: "Ghostfish",
    desc: "Can be caught in The Mines on the 20th and 60th floor. Medium difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Specialty Fish"
  },
  {
    name: "Sandfish",
    desc: "Can be caught in The Desert from 6am-8pm. You can't get there until you complete the Vault bundles. High difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Specialty Fish"
  },
  {
    name: "Woodskip",
    desc: "Can be caught in The Secret Woods. Medium difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Specialty Fish"
  },
  {
    name: "Copper Bar",
    desc: "Smelt five copper ore and a coal in a furnace. Copper ore can be found in The Mines.",
    season: ["any"],
    category: "mining",
    bundle: "Blacksmith's"
  },
  {
    name: "Iron Bar",
    desc: "Smelt five iron ore and a coal in a furnace. Iron ore can be found in The Mines.",
    season: ["any"],
    category: "mining",
    bundle: "Blacksmith's"
  },
  {
    name: "Gold Bar",
    desc: "Smelt five gold ore and a coal in a furnace. Gold ore can be found in The Mines.",
    season: ["any"],
    category: "mining",
    bundle: "Blacksmith's"
  },
  {
    name: "Quartz",
    desc: "Can be found lying around The Mines.",
    season: ["any"],
    category: "mining",
    bundle: "Geologist's"
  },
  {
    name: "Earth Crystal",
    desc: "Can be found lying around The Mines from floors 1-39.",
    season: ["any"],
    category: "mining",
    bundle: "Geologist's"
  },
  {
    name: "Frozen Tear",
    desc: "Can be found lying around The Mines from floors 40-79.",
    season: ["any"],
    category: "mining",
    bundle: "Geologist's"
  },
  {
    name: "Fire Quartz",
    desc: "Can be found lying around The Mines from floors 80-120.",
    season: ["any"],
    category: "mining",
    bundle: "Geologist's"
  },
  {
    name: "Slime x99",
    desc: "Can be found by killing slimes in The Mines. 99 required.",
    season: ["any"],
    category: "mining",
    bundle: "Adventurer's"
  },
  {
    name: "Bat Wings x10",
    desc: "Can be found by killing bats in The Mines. 10 required.",
    season: ["any"],
    category: "mining",
    bundle: "Adventurer's"
  },
  {
    name: "Solar Essence",
    desc: "Can be found by killing Ghosts, Iridium Bats, Metal Heads, Squid Kids, or Mummies in The Mines.",
    season: ["any"],
    category: "mining",
    bundle: "Adventurer's"
  },
  {
    name: "Void Essence",
    desc: "Can be found by killing Shadow Brutes, Shadow Shamans, and Serpents in The Mines.",
    season: ["any"],
    category: "mining",
    bundle: "Adventurer's"
  },
  {
    name: "Fiddlehead Fern",
    desc: "Found via foraging in The Secret Woods. Requires the Copper Axe or better to access.",
    season: ["summer"],
    category: "foraging",
    bundle: "Chef's"
  },
  {
    name: "Truffle",
    desc: "Your mature pigs will find these outside for you.",
    season: ["spring", "summer", "fall"],
    category: "farming",
    bundle: "Chef's"
  },
  {
    name: "Poppy",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming",
    bundle: "Chef's"
  },
  {
    name: "Maki Roll",
    desc: "Cooked in your kitchen once your house is upgraded. Requires any fish, seaweed, and rice.",
    season: ["any"],
    category: "misc",
    bundle: "Chef's"
  },
  {
    name: "Fried Egg",
    desc: "Cooked in your kitchen once your house is upgraded. Requires an egg.",
    season: ["any"],
    category: "misc",
    bundle: "Chef's"
  },
  {
    name: "Sea Urchin",
    desc: "Found via foraging on The Beach.",
    season: ["any"],
    category: "foraging",
    bundle: "Dye"
  },
  {
    name: "Sunflower",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer", "fall"],
    category: "farming",
    bundle: "Dye"
  },
  {
    name: "Duck Feather",
    desc: "Dropped by your ducks when they are both happy and mature. Decently rare.",
    season: ["any"],
    category: "farming",
    bundle: "Dye"
  },
  {
    name: "Aquamarine",
    desc: "Can be found in The Mines from floors 40-120",
    season: ["any"],
    category: "mining",
    bundle: "Dye"
  },
  {
    name: "Red Cabbage",
    desc: "Seeds available at Pierre's shop starting in year two.",
    season: ["summer"],
    category: "farming",
    bundle: "Dye"
  },
  {
    name: "Nautilus Shell",
    desc: "Found via foraging on The Beach in the Winter.",
    season: ["winter"],
    category: "foraging",
    bundle: "Field Research"
  },
  {
    name: "Chub",
    desc: "Can be caught in the mountain lake and the river. Low difficulty.",
    season: ["any"],
    category: "fishing",
    bundle: "Field Research"
  },
  {
    name: "Frozen Geode",
    desc: "Can be found lying around in The Mines from floors 41-79.",
    season: ["any"],
    category: "mining",
    bundle: "Field Research"
  },
  {
    name: "Wheat x10",
    desc: "Seeds available at Pierre's shop. Ten required, so keep in mind they have to be the same quality.",
    season: ["summer", "fall"],
    category: "farming",
    bundle: "Fodder"
  },
  {
    name: "Hay x10",
    desc: "Procured when cutting down grass while you own a silo. Also sold by Marnie.",
    season: ["any"],
    category: "farming",
    bundle: "Fodder"
  },
  {
    name: "Wine",
    desc: "Created by placing nearly any fruit in a keg.",
    season: ["any"],
    category: "farming",
    bundle: "Enchanter's"
  },
  {
    name: "Rabbit Foot",
    desc: "Dropped by your rabbits when they are both happy and mature. Very rare. Don't worry, they're still okay!",
    season: ["any"],
    category: "farming",
    bundle: "Enchanter's"
  },
  {
    name: "Gold x2500",
    desc: "Find a leprochaun on a rainy day and offer him some whiskey. He will be so grateful that in return he grants you 5,000g from his pot of gold.",
    season: ["any"],
    category: "misc",
    bundle: "Vault"
  },
  {
    name: "Gold x5000",
    desc: "If you catch Rumpelstiltskin (by the ocean on the 29th of Summer) he can spin your sheep's wool into gold.",
    season: ["any"],
    category: "misc",
    bundle: "Vault"
  },
  {
    name: "Gold x10000",
    desc: "Once you buy every item from the Traveling Cart on a Sunday, the pig will inform you that you are the millionth customer and give you 250,000g.",
    season: ["any"],
    category: "misc",
    bundle: "Vault"
  },
  {
    name: "Gold x25000",
    desc: "If I knew how to procure 25,000 actual pieces of gold, do you really think my first thought would be to share that information with everyone? Please.",
    season: ["any"],
    category: "misc",
    bundle: "Vault"
  },
];

// Call main function to render app display
main();