const fs = require('fs');
const recursive = require('./recursive.js');

function copy (source, destination, options) {
  recursive({
    beforeDir: function (dir, done) {
      const path = destination + '/' + dir;

      if (options.verbosely) {
        process.stdout.write(path + '\n');
      };
      fs.mkdir(path, done);
    },
    eachFile: function (file, done) {
      const path = destination + '/' + file.fullname;

      if (options.verbosely) {
        process.stdout.write(path + '\n');
      }
      fs.copyFile(source + '/' + file.fullname, path, done);
    },
    error: function (path, error) {
      process.stderr.write('Failed to copy "' + path + '"\n');
      console.error(error);
    }
  }).setRoot(source).readdir('', options.callback);
}

module.exports = copy;
