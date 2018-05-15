const {stat, readFile, readdir} = require(fs/promises);

function _initSearch() {
    const expr = new RegExp(process.argv[2]);
    const fileArray = process.argv.slice(3, process.argv.length);
    return await async function _search(fileArray) {
        // TODO test Dir, branch recursive _search, 
        // create foundFiles array and concat results of recursive _search
    }
}

function searchFile(regex, file) {
    if (!regex instanceof RegExp) {
        throw {error: "First argument following file command must be valid regex."};
    }
    let txt = readFile(file, "utf8");
    return regex.test(txt);
}