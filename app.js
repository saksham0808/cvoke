#!/usr/bin/env node

// For creating the CLI
var program = require('commander');

// The functionalities
var functions = require('./lib/functions.js');

functions.checkRootFolder();

program
    .version('0.1.0');

program
    .command('new [invoke-name]')
    .description('Create a CLI-command which can be invoked with the given name')
    .action(functions.createInvoke);

program
    .command('list')
    .description('List all invoke-commands')
    .action(functions.listInvokes);

program
    .command('wake [invoke-name]')
    .description('Invoke the specified command')
    .action(functions.wakeInvoke);

// By default display all the invokes
if (!process.argv.slice(2).length) {
    functions.listInvokes();
}

// Parse arguments
program.parse(process.argv);
