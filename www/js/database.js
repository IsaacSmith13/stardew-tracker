// Database of all items
let database = [
    {
        name: "Parsnip",
        desc: "Seeds at Pierre's Shop",
        season: ["spring"],
        type: "farming"
    },
    {
        name: "Green Bean",
        desc: "Seeds at Pierre's Shop",
        season: ["spring"],
        type: "farming"
    },
    {
        name: "Cauliflower",
        desc: "Seeds at Pierre's Shop",
        season: ["spring"],
        type: "farming"
    },
    {
        name: "Potato",
        desc: "Seeds at Pierre's Shop",
        season: ["spring"],
        type: "farming"
    },
    {
        name: "Tomato",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        type: "farming"
    },
    {
        name: "Melon",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        type: "farming"
    },
    {
        name: "Blueberry",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        type: "farming"
    },
    {
        name: "Hot Pepper",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        type: "farming"
    },
    {
        name: "Corn",
        desc: "Seeds at Pierre's Shop",
        season: ["summer", "fall"],
        type: "farming"
    },
    {
        name: "Eggplant",
        desc: "Seeds at Pierre's Shop",
        season: ["fall"],
        type: "farming"
    },
    {
        name: "Pumpkin",
        desc: "Seeds at Pierre's Shop",
        season: ["fall"],
        type: "farming"
    },
    {
        name: "Yam",
        desc: "Seeds at Pierre's Shop",
        season: ["fall"],
        type: "farming"
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
saveFile = JSON.parse(localStorage.getItem("save"));


// Given a season and the id of an HTML list,
// populates that list with all relevant items from the database;
// also marking them as checked if applicable
function populate(season, listId) {
    let count = 0;
    let seasonContent = ""

    // Iterates through all items and adding the correctly season-tagged ones
    database.forEach(function (item) {
        count++;
        if (item.season.includes(season)) {
            seasonContent += `
            <li class="">
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
                                <input class="item${item.formattedName}" type="checkbox" ${saveFile[item.formattedName]}>
                                <i class="icon-checkbox"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </li>
        `}
    });
    // Assign generated content to the specified listId
    document.getElementById(listId).innerHTML = seasonContent;
}


// Call populate function on all tabs
populate("spring", "springList");
populate("summer", "summerList");
populate("fall", "fallList");
populate("winter", "winterList");
populate("any", "anyList");


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
        let check = checkbox.className.slice(4);
        saveFile[check] = (saveFile[check] === "" ? "checked" : "");
        localStorage.setItem("save", JSON.stringify(saveFile));
    });
});