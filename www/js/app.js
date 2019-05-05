// Main function - called at end of file after database is constructed
function main() {

  // Instantiate application using Framework7
  const app = new Framework7({
    root: '#app',
    name: 'stardew-tracker',
    id: 'com.isaactsmith.stardewtracker',
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

  // Populates all tabs with data
  function populate(seasonList, categoryList) {
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
              <h3 class="text-align-center">
                <strong>
                  ${category.charAt(0).toUpperCase() + category.slice(1)}:
                </strong>
              </h3>
              <ul class="${season}List">`;
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

  // Instantiate parameters for populate and call it
  const seasonList = ["spring", "summer", "fall", "winter", "any"];
  const categoryList = ["farming", "foraging", "fishing", "mining", "misc"];
  populate(seasonList, categoryList);

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

  // Add click listeners to name buttons to display/hide dropdown info
  const descButtons = document.querySelectorAll(".button-name");
  // Iterate through descButtons
  descButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.closest(".shownLi").nextElementSibling.classList.toggle("hidden");
      let chevron = button.lastElementChild;
      chevron.outerHTML = (chevron.outerHTML === `<i class="icon-down-open"></i>` ?
        `<i class="icon-up-open"></i>` : `<i class="icon-down-open"></i>`);
    });
  });
  const typeButtons = document.querySelectorAll(".type");
  // Iterate through buttons
  for (let i = 0; i < typeButtons.length; i++) {
    typeButtons[i].addEventListener("click", function () {
      typeButtons[0].classList.toggle("hidden");
      typeButtons[1].classList.toggle("hidden");
    });
  }
}

// Database of all items
const database = [
  {
    name: "Quality Parsnips x5",
    desc: "<p>Seeds available at Pierre's shop.</p> Gold quality only; five needed.",
    season: ["spring"],
    category: "farming"
  },
  {
    name: "Parsnip",
    desc: "Seeds available at Pierre's shop.",
    season: ["spring"],
    category: "farming"
  },
  {
    name: "Green Bean",
    desc: "Seeds available at Pierre's shop.",
    season: ["spring"],
    category: "farming"
  },
  {
    name: "Cauliflower",
    desc: "Seeds available at Pierre's shop.",
    season: ["spring"],
    category: "farming"
  },
  {
    name: "Potato",
    desc: "Seeds available at Pierre's shop.",
    season: ["spring"],
    category: "farming"
  },
  {
    name: "Quality Melons x5",
    desc: "<p>Seeds available at Pierre's shop.</p> Gold quality only; five needed.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Melon",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Tomato",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Blueberry",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Hot Pepper",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Quality Pumpkins x5",
    desc: "<p>Seeds available at Pierre's shop.</p> Gold quality only; five needed.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Quality Corn x5",
    desc: "Seeds available at Pierre's shop. Gold quality only; five needed.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Pumpkin",
    desc: "Seeds available at Pierre's shop.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Corn",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer", "fall"],
    category: "farming"
  },
  {
    name: "Eggplant",
    desc: "Seeds available at Pierre's shop.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Yam",
    desc: "Seeds available at Pierre's shop.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Wild Horseradish",
    desc: "Found via foraging in the Spring or randomly grown from Spring Seeds.",
    season: ["spring"],
    category: "foraging"
  },
  {
    name: "Daffodil",
    desc: "Found via foraging in the Spring or randomly grown from Spring Seeds.",
    season: ["spring"],
    category: "foraging"
  },
  {
    name: "Leek",
    desc: "Found via foraging in the Spring or randomly grown from Spring Seeds.",
    season: ["spring"],
    category: "foraging"
  },
  {
    name: "Dandelion",
    desc: "Found via foraging in the Spring or randomly grown from Spring Seeds.",
    season: ["spring"],
    category: "foraging"
  },
  {
    name: "Grape",
    desc: "Found via foraging in the Summer or randomly grown from Summer Seeds.",
    season: ["summer"],
    category: "foraging"
  },
  {
    name: "Spice Berry",
    desc: "Found via foraging in the Summer, randomly grown from Summer Seeds, or from The Cave if you selected the fruit bat option.",
    season: ["summer"],
    category: "foraging"
  },
  {
    name: "Sweet Pea",
    desc: "Found via foraging in the Summer or randomly grown from Summer Seeds.",
    season: ["summer"],
    category: "foraging"
  },
  {
    name: "Common Mushroom",
    desc: "Found via foraging in the Fall, randomly grown from Fall Seeds, or from The Cave if you selected the mushroom option.",
    season: ["fall"],
    category: "foraging"
  },
  {
    name: "Common Mushroom #2",
    desc: "Found via foraging in the Fall, randomly grown from Fall Seeds, or from The Cave if you selected the mushroom option.",
    season: ["fall"],
    category: "foraging"
  },
  {
    name: "Wild Plum",
    desc: "Found via foraging in the Fall, randomly grown from Fall Seeds, or from The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "foraging"
  },
  {
    name: "Hazelnut",
    desc: "Found via foraging in the Fall or randomly grown from Fall Seeds.",
    season: ["fall"],
    category: "foraging"
  },
  {
    name: "Blackberry",
    desc: "Found via foraging in the Fall, randomly grown from Fall Seeds, or from The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "foraging"
  },
  {
    name: "Winter Root",
    desc: "Found via using the Hoe in the Winter or randomly grown from Winter Seeds.",
    season: ["winter"],
    category: "foraging"
  },
  {
    name: "Crystal Fruit",
    desc: "Found via foraging in the Winter or randomly grown from Winter Seeds.",
    season: ["winter"],
    category: "foraging"
  },
  {
    name: "Snow Yam",
    desc: "Found via using the Hoe in the Winter or randomly grown from Winter Seeds.",
    season: ["winter"],
    category: "foraging"
  },
  {
    name: "Crocus",
    desc: "Found via foraging in the Winter or randomly grown from Winter Seeds.",
    season: ["winter"],
    category: "foraging"
  },
  {
    name: "Wood x99",
    desc: "Maybe try punching a tree? Not sure.",
    season: ["any"],
    category: "misc"
  },
  {
    name: "Wood x99 #2",
    desc: "Maybe try punching a tree? Not sure.",
    season: ["any"],
    category: "misc"
  },
  {
    name: "Stone x99",
    desc: "Found everywhere. Use a pickaxe.",
    season: ["any"],
    category: "misc"
  },
  {
    name: "Hardwood x10",
    desc: "Requires a copper axe or better to obtain. You start with some logs on your farm, but it also spawns in the Secret Woods daily. The Secret Woods requires a copper axe or better to access.",
    season: ["any"],
    category: "misc"
  },
  {
    name: "Coconut",
    desc: "Found via foraging in The Desert. You can't get there until you complete the Vault bundles.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Cactus Fruit",
    desc: "Found via foraging in The Desert. You can't get there until you complete the Vault bundles.",
    season: ["any"],
    category: "misc"
  },
  {
    name: "Cave Carrot",
    desc: "Found laying around in The Mines.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Red Mushroom",
    desc: "Found laying around in The Mines, The Secret Woods during the summer, and in The Cave if the mushroom option is chosen. The Secret Woods requires a copper axe or better to access.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Purple Mushroom",
    desc: "Found laying around in The Mines after floor 81, The Skull Cavern, and in The Cave if the mushroom option is chosen.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Purple Mushroom #2",
    desc: "Found laying around in The Mines after floor 81, The Skull Cavern, and in The Cave if the mushroom option is chosen.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Maple Syrup",
    desc: "Found by placing a tapper on a maple tree.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Maple Syrup #2",
    desc: "Found by placing a tapper on a maple tree.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Oak Resin",
    desc: "Found by placing a tapper on an oak tree.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Oak Resin #2",
    desc: "Found by placing a tapper on an oak tree.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Pine Tar",
    desc: "Found by placing a tapper on a pine tree.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Morel",
    desc: "Found via foraging in The Secret Woods in the Spring, or from The Cave if you selected the mushroom option.",
    season: ["spring"],
    category: "foraging"
  },
  {
    name: "Large Milk",
    desc: "Raise friendship levels with your cows to produce large milk.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Large Brown Egg",
    desc: "Raise friendship levels with your chickens to produce large eggs.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Large Egg",
    desc: "Raise friendship levels with your chickens to produce large eggs.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Large Goat Milk",
    desc: "Raise friendship levels with your goats to produce large goat milk.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Wool",
    desc: "Adult sheeps will produce wool as soon as they mature.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Duck Egg",
    desc: "Adult ducks will produce eggs as soon as they mature.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Truffle Oil",
    desc: "Made in the Oil Maker with a truffle. Truffles are found by pigs when let outside.",
    season: ["spring", "summer", "fall"],
    category: "farming"
  },
  {
    name: "Cloth",
    desc: "Made with the Loom by using wool. Wool comes from mature sheep.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Goat Cheese",
    desc: "Made by putting goat milk in the Cheese Press.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Cheese",
    desc: "Made by putting milk in the Cheese Press.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Honey",
    desc: "Created by placing a bee house and using flowers on it.",
    season: ["spring", "summer", "fall"],
    category: "foraging"
  },
  {
    name: "Jelly",
    desc: "Created by placing nearly any fruit in a preserves jar.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Apple",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Apple x3",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option. Three required.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Apricot",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["spring"],
    category: "farming"
  },
  {
    name: "Orange",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Peach",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Pomegranate",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Pomegranate #2",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["fall"],
    category: "farming"
  },
  {
    name: "Cherry",
    desc: "Seeds available at Pierre's shop. Trees take an entire season to mature. Also available in The Cave if you selected the fruit bat option.",
    season: ["spring"],
    category: "farming"
  },
  {
    name: "Sunfish",
    desc: "Can be caught in the river from 6am-7pm during sunny or windy days. Low difficulty.",
    season: ["spring", "summer"],
    category: "fishing"
  },
  {
    name: "Catfish",
    desc: "Can be caught in the river during Spring or Fall on rainy days. Also available during Summer, but only in The Secret Woods. High difficulty.",
    season: ["spring", "summer", "fall"],
    category: "fishing"
  },
  {
    name: "Shad",
    desc: "Can be caught in the river from 9am-2am on rainy days. Medium difficulty.",
    season: ["spring", "summer", "fall"],
    category: "fishing"
  },
  {
    name: "Tiger Trout",
    desc: "Can be caught in the river from 6am-7pm. Medium difficulty.",
    season: ["fall", "winter"],
    category: "fishing"
  },
  {
    name: "Largemouth Bass",
    desc: "Can be caught in the mountain lake from 6am-7pm. Medium difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Carp",
    desc: "Can be caught in the mountain lake. Low difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Bullhead",
    desc: "Can be caught in the mountain lake. Medium difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Sturgeon",
    desc: "Can be caught in the mountain lake from 6am-7pm. High difficulty.",
    season: ["summer", "winter"],
    category: "fishing"
  },
  {
    name: "Sardine",
    desc: "Can be caught in the ocean. Low difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Tuna",
    desc: "Can be caught in the ocean from 6am-7pm. High difficulty.",
    season: ["summer", "winter"],
    category: "fishing"
  },
  {
    name: "Red Snapper",
    desc: "Can be caught in the ocean from 6am-7pm on rainy days. Low difficulty.",
    season: ["summer", "fall"],
    category: "fishing"
  },
  {
    name: "Tilapia",
    desc: "Can be caught in the ocean from 6am-2pm. Medium difficulty.",
    season: ["summer", "fall"],
    category: "fishing"
  },
  {
    name: "Walleye",
    desc: "Can be caught in the river or mountain lake from 12pm-2am on rainy days. Medium difficulty.",
    season: ["fall", "winter"],
    category: "fishing"
  },
  {
    name: "Bream",
    desc: "Can be caught in the river from 6pm-2am. Low difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Eel",
    desc: "Can be caught in the ocean from 4pm-2am on rainy days. High difficulty.",
    season: ["spring", "fall"],
    category: "fishing"
  },
  {
    name: "Crab",
    desc: "Can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Lobster",
    desc: "Can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Crayfish",
    desc: "Can be caught in any fresh water by using a crab pot.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Cockle",
    desc: "Found via foraging on The Beach or can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Mussel",
    desc: "Found via foraging on The Beach or can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Shrimp",
    desc: "Can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Snail",
    desc: "Can be caught in any fresh water by using a crab pot.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Periwinkle",
    desc: "Can be caught in any fresh water by using a crab pot.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Oyster",
    desc: "Found via foraging on The Beach or can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Clam",
    desc: "Found via foraging on The Beach or can be caught in the ocean by using a crab pot.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Pufferfish",
    desc: "Can be caught in the ocean from 12pm-4pm on sunny days. High difficulty.",
    season: ["summer"],
    category: "fishing"
  },
  {
    name: "Ghostfish",
    desc: "Can be caught in The Mines on the 20th and 60th floor. Medium difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Sandfish",
    desc: "Can be caught in The Desert from 6am-8pm. You can't get there until you complete the Vault bundles. High difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Woodskip",
    desc: "Can be caught in The Secret Woods. Medium difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Copper Bar",
    desc: "Smelt five copper ore and a coal in a furnace. Copper ore can be found in The Mines.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Iron Bar",
    desc: "Smelt five iron ore and a coal in a furnace. Iron ore can be found in The Mines.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Gold Bar",
    desc: "Smelt five gold ore and a coal in a furnace. Gold ore can be found in The Mines.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Gold Bar x5",
    desc: "Smelt five gold ore and a coal in a furnace. Gold ore can be found in The Mines. Five required.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Quartz",
    desc: "Can be found lying around The Mines.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Earth Crystal",
    desc: "Can be found lying around The Mines from floors 1-39.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Frozen Tear",
    desc: "Can be found lying around The Mines from floors 40-79.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Fire Quartz",
    desc: "Can be found lying around The Mines from floors 80-120.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Slime x99",
    desc: "Can be found by killing slimes in The Mines. 99 required.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Bat Wings x10",
    desc: "Can be found by killing bats in The Mines. 10 required.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Solar Essence",
    desc: "Can be found by killing Ghosts, Iridium Bats, Metal Heads, Squid Kids, or Mummies in The Mines.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Void Essence",
    desc: "Can be found by killing Shadow Brutes, Shadow Shamans, and Serpents in The Mines.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Fiddlehead Fern",
    desc: "Found via foraging in The Secret Woods. Requires the Copper Axe or better to access.",
    season: ["summer"],
    category: "foraging"
  },
  {
    name: "Truffle",
    desc: "Your mature pigs will find these outside for you.",
    season: ["spring", "summer", "fall"],
    category: "farming"
  },
  {
    name: "Poppy",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Maki Roll",
    desc: "Cooked in your kitchen once your house is upgraded. Requires any fish, seaweed, and rice.",
    season: ["any"],
    category: "misc"
  },
  {
    name: "Fried Egg",
    desc: "Cooked in your kitchen once your house is upgraded. Requires an egg.",
    season: ["any"],
    category: "misc"
  },
  {
    name: "Sea Urchin",
    desc: "Found via foraging on The Beach.",
    season: ["any"],
    category: "foraging"
  },
  {
    name: "Sunflower",
    desc: "Seeds available at Pierre's shop.",
    season: ["summer", "fall"],
    category: "farming"
  },
  {
    name: "Duck Feather",
    desc: "Dropped by your ducks when they are both happy and mature. Decently rare.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Aquamarine",
    desc: "Can be found in The Mines from floors 40-120",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Red Cabbage",
    desc: "Seeds available at Pierre's shop starting in year two.",
    season: ["summer"],
    category: "farming"
  },
  {
    name: "Nautilus Shell",
    desc: "Found via foraging on The Beach in the Winter.",
    season: ["winter"],
    category: "foraging"
  },
  {
    name: "Chub",
    desc: "Can be caught in the mountain lake and the river. Low difficulty.",
    season: ["any"],
    category: "fishing"
  },
  {
    name: "Frozen Geode",
    desc: "Can be found lying around in The Mines from floors 41-79.",
    season: ["any"],
    category: "mining"
  },
  {
    name: "Wheat x10",
    desc: "Seeds available at Pierre's shop. Ten required, so keep in mind they have to be the same quality.",
    season: ["summer", "fall"],
    category: "farming"
  },
  {
    name: "Hay x10",
    desc: "Procured when cutting down grass while you own a silo. Also sold by Marnie.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Wine",
    desc: "Created by placing nearly any fruit in a keg.",
    season: ["any"],
    category: "farming"
  },
  {
    name: "Rabbit Foot",
    desc: "Dropped by your rabbits when they are both happy and mature. Very rare. Don't worry, they're still okay!",
    season: ["any"],
    category: "farming"
  },
];

main();