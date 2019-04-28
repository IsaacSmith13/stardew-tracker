// Database of all items
var database = [
    {
        name: "Blueberry",
        desc: "Seeds at Pierre's Shop",
        season: ["summer"],
        type: "farming",
        img: "img/items/Blueberry.png",
        checked: ""
    },
    {
        name: "Blueberry",
        desc: "Seeds at Pierre's Shop",
        season: ["any"],
        type: "farming",
        img: "img/items/Blueberry.png",
        checked: ""
    },
    {
        name: "Blueberry",
        desc: "Seeds at Pierre's Shop",
        season: ["spring", "fall", "winter"],
        type: "farming",
        img: "img/items/Blueberry.png",
        checked: "checked"
    },
    {
        name: "Blueberry",
        desc: "Seeds at Pierre's Shop",
        season: ["summer", "fall"],
        type: "farming",
        img: "img/items/Blueberry.png",
        checked: "checked"
    },
    {
        name: "Blueberry",
        desc: "Seeds at Pierre's Shop",
        season: ["summer", "any"],
        type: "farming",
        img: "img/items/Blueberry.png",
        checked: "checked"
    },
    {
        name: "Blueberry",
        desc: "Seeds at Pierre's Shop",
        season: ["winter", "any"],
        type: "farming",
        img: "img/items/Blueberry.png",
        checked: "checked"
    },
];


// Given a season and the id of an HTML list,
// populates that list with all relevant items from the database;
// also marking them as checked if applicable
function populate(season, listId) {
    seasonContent = `
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
                                <input type="checkbox" ${item.checked}>
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