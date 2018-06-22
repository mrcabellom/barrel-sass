var glob = require('glob'),
    chalk = require('chalk'),
    fs = require('fs'),
    process = require('process'),
    pathManager = require('path');

console.log(chalk.bgGreen.white.bold("@Plain Concepts -> Creating sass application barrel, please wait..."));
let processOptions = process.argv.slice(1);
console.log(`Searching sass files in ${processOptions[1]}`);
glob(`${processOptions[1]}/**/*.scss`, { ignore: ["node_modules/**/*.scss", `${processOptions[1]}/${processOptions[2]}.scss`]}, function (err, files) {
    if (files.length > 0) {
        var stream = fs.createWriteStream(`${processOptions[1]}/${processOptions[2]}.scss`);
        stream.once('open', function (fd) {
            files.forEach(function (sassfile) {
                var relative = pathManager.relative(processOptions[1], sassfile);
               relative = relative.substring(0, relative.length - 3).split("\\").join("/");
                stream.write(`@import '${relative.substr(0, relative.lastIndexOf('.'))}'; \n`);
            });
            stream.end();
            console.log(chalk.bgGreen.white.bold("@Plain Concepts -> Sass Barrel created!"));
        });
    }
});
