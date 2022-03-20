const path = require("path");
const glob = require('glob');
const fs = require("fs");

module.exports = {

    data: {
        items: [
            { name: "Home", url: "/"},
            { name: "about", url: "/about_me.html"},
            { name: "characters", url: "/characters/index.html"},
            { name: "projects", url: "/stuff.html"},
            { name: "annoy_me", url: "/discord.html", "new": true},
        ]
    }

}