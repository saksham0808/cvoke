var fs    = require('fs'),
    path  = require('path'),
    spawn = require('child_process').spawn,
    exec  = require('child_process').exec;

// Store the root folders
var invokesRoot  = path.join(process.env.HOME, '.cvoke');

// Logging
var helper = require('./helper');

// Function to create an invoke with the given name
module.exports.createInvoke = function (invokeName) {
    // Generate fileName
    var fileName = path.join(invokesRoot, invokeName);

    // Copy the template file
    var template = '#! /bin/bash';
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
            exec('chmod +x ' + fileName, function(err, stdout, stderr) {
                if(err) throw err;
            })
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

// Function to wake an invoke
module.exports.wakeInvoke= function (invokeName) {
    // Generate fileName
    var fileName = path.join(invokesRoot, invokeName);

    // Check if there exists a invoke with the given name
    if (!fs.existsSync(fileName)) {
        helper.error('No such invokeable')
        process.exit(0);
    }

    // Execute the command
    var invoked = exec(fileName, function(err, stdout, stderr) {
        if(err) throw err;
        helper.stdout(stdout);
        helper.stderr(stderr);
    })
};
