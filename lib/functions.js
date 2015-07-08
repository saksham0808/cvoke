var fs    = require('fs'),
    path  = require('path'),
    spawn = require('child_process').spawn

// Store the root folders
var invokesRoot  = path.join(process.env.HOME, '.cvoke');

// Logging
var helper = require('./helper');

// Function to create an invoke with the given name
module.exports.createInvoke = function (invokeName) {
    // Generate fileName
    var fileName = path.join(invokesRoot, invokeName);

    // Copy the template file
    var template = '';
    fs.writeFileSync(fileName, template);

    // Open up vim for creating the invoke and then wait for close
    var editor = spawn(process.env.EDITOR, [fileName], {stdio: 'inherit'});

    // When the editor exits, we read-test the file
    editor.on('exit', function () {
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) {
                // In case we fail, we delete the file
                helper.error('Filesystem error');
                shell.rm(fileName);
                process.exit(1);
            }
        });
    });
};

// Function to list invokes from the snips directory
module.exports.listInvokes = function() {
    fs.readdir(invokesRoot, function (err, items) {
        if (err) {
            helper.error('Filesystem error');
            process.exit(1);
        }

        // List all the invokes found
        items.forEach(function(item) {
            console.log(item);
        });
    });
};
