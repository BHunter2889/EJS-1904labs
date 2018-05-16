const {stat, readFile, readdir} = require(fs/promises);

function _initSearch() {
    const regex = new RegExp(process.argv[2]);
    const fileArray = process.argv.slice(3, process.argv.length);
    return async function _search(fileArray, index = 0) {
        let found = [];
        await Promise.all(fileArray.array.forEach(file => {
            testDir(file)
            .then( isDir => {
                if (isDir) resolve(_search(file));
                else if (searchFile(regex, file))  resolve(process.cwd + "/" + file);
                else resolve();
            })
            .then(result => {
                if (result) {
                    found.push(result);
                }
                resolve; 
            })
        })).catch(error => {
            console.log(error);
        });
        return found;
        // TODO test Dir, branch recursive _search, 
        // create foundFiles array and concat results of recursive _search
    }
}

async function searchFile(regex, file) {
    if (!regex instanceof RegExp) {
        throw {error: "First argument following file command must be valid regex."};
    }
    let txt = await readFile(file, "utf8");
    return regex.test(txt);
}

async function testDir(path) {
    return new Promise((resolve, reject) => {
        let stats;
        try {
            stats = await stat(path);
        } catch (error) {
            if (error.code != "ENOENT") throw error;
            else reject(error);
        }
        resolve(tats.isDirectory());
    })
}

