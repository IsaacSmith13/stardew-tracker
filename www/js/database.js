// Database of all items
let database = [
    {
        name: "Parsnip",
        desc: "Seeds at Pierre's Shop",
        season: ["spring"],
        category: "farming"
    },
    {
        name: "Green Bean",
        desc: "Seeds at Pierre's Shop",
        season: ["spring"],
        category: "farming"
    },
    {
        name: "Cauliflower",
        desc: "Seeds at Pierre's Shop",
        season: ["spring"],
        category: "farming"
    },
    {
        name: "Potato",
        desc: "Seeds at Pierre's Shop",
        season: ["spring"],
        category: "farming"
    },
    {
        name: "Tomato",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        category: "farming"
    },
    {
        name: "Melon",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        category: "farming"
    },
    {
        name: "Blueberry",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        category: "farming"
    },
    {
        name: "Hot Pepper",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        category: "farming"
    },
    {
        name: "Corn",
        desc: "Seeds at Pierre's Shop",
        season: ["summer", "fall"],
        category: "farming"
    },
    {
        name: "Eggplant",
        desc: "Seeds at Pierre's Shop",
        season: ["fall"],
        category: "farming"
    },
    {
        name: "Pumpkin",
        desc: "Seeds at Pierre's Shop",
        season: ["fall"],
        category: "farming"
    },
    {
        name: "Yam",
        desc: "Seeds at Pierre's Shop",
        season: ["fall"],
        category: "farming"
    }
];

// Add formatted names and images to items systematically
database.forEach(function (item) {
    let count = 0;
    item.formattedName = item.name.split(" ").join("");
    item.img = `img/items/${item.formattedName}.png`;
    count++
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


const seasonList = ["spring", "summer", "fall", "winter", "any"];
const categoryList = ["farming", "foraging", "fishing", "mining", "misc"];


// Capitalizes the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Populates all tabs with content from the database
function populate(seasonList, categoryList) {
    // Iterates through each season's tab
    seasonList.forEach(function (season) {
        let seasonContent = "";
        // Iterates through each category
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
                <h3 class="text-align-center"><strong>${capitalizeFirstLetter(category)}:</strong></h3>
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


// Calls the populate function to fill the tabs
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
const buttons = document.querySelectorAll(".button-name");
// Iterate through buttons
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        let hiddenListClass = button.closest(".shownLi").nextElementSibling;
        hiddenListClass.className = (hiddenListClass.className === "hidden" ? "" : "hidden");
        let chevron = button.lastElementChild;
        chevron.outerHTML = (chevron.outerHTML === `<i class="icon-down-open"></i>` ?
            `<i class="icon-up-open"></i>` : `<i class="icon-down-open"></i>`);
    })
});