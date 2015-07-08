var chalk = require('chalk');

// Log errors
module.exports.error = function (statement) {
  chalk.bold.red('[FAIL] ' + statement);
};

module.exports.stderr= function (statement) {
  console.log(statement);
};

module.exports.stdout= function (statement) {
  console.log(statement);
};
