//importing the files
const meme = require("./lib/Meme");
//function for generating a new meme
function Meme() {
    return new meme();
}
Meme.Memer = meme;
Meme.version = require("./package.json").version;

//exporting this meme
module.exports = Meme;
