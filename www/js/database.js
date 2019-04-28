// Database of all items
let database = [
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

// Add images, formatted names, and ID's to items systematically
database.forEach(function (item) {
    let count = 0;
    item.img = `img/items/${item.name.split(" ").join("")}.png`;
    item.formattedName = item.name.split(" ").join("");
    item._id = ("0" + count).slice(-2);
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
    let seasonContent = `
        <li>
            <div class="item-content desc no-padding-left">
                <div class="item-inner">
                    <div class="item-media padding-horizontal">
                        <img src="img/items/Junimo.png" width="48" height="48">
                        <i class="icon images"></i>
                    </div>
                    <div class="item-title padding-left">
                        Name
                    </div>
                    <div class="item-after">
                        Where to get
                    </div>
                    <div class="item-after">
                    </div>
                </div>
            </div>
        </li>
    `
    // Iterates through all items and adding the correctly season-tagged ones
    database.forEach(function (item) {
        count++;
        if (item.season.includes(season)) {
            seasonContent += `
            <li>
                <div class="item-content no-padding-left">
                    <div class="item-inner">
                        <div class="item-media padding-horizontal">
                            <img src="${item.img}" width="48" height="48">
                        </div>
                        <div class="item-title padding-left">
                            ${item.name}
                        </div>
                        <div class="item-after">
                            ${item.desc}
                        </div>
                        <div class="item-after">
                            <label class="checkbox">
                                <input id="item${item.formattedName}" type="checkbox" ${saveFile[item.formattedName]}>
                                <i class="icon-checkbox"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </li>
            `
        }
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
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("click", function () {
        let checked = checkbox.id.slice(4);
        saveFile[checked] = (saveFile[checked] === "" ? "checked" : "");
        localStorage.setItem("save", JSON.stringify(saveFile));
    });
});