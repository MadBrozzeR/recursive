const fs = require('fs');
const recursive = require('./recursive.js');

function createDir (dir, done) {
  const recursive = this;
  const destination = this.polution.destination;
  const options = this.polution.options;
  const path = destination + '/' + dir;

  if (options.verbosely) {
    process.stdout.write(path + '\n');
  };
  fs.mkdir(path, function (error) {
    if (error) {
      options.callback(error);
      recursive.stop = true;
    }

    done();
  });
}

function copyFile (file, done) {
  const recursive = this;
  const destination = this.polution.destination;
  const source = this.polution.source;
  const options = this.polution.options;
  const path = destination + '/' + file.fullname;

  if (options.verbosely) {
    process.stdout.write(path + '\n');
  }
  fs.copyFile(source + '/' + file.fullname, path, function (error) {
    if (error) {
      options.callback(error);
      recursive.stop = true;
    }

    done();
  });
}

function handleError (path, error) {
  this.polution.options.callback(error);
}

function copy (source, destination, options = {}) {
  recursive({
    beforeDir: createDir,
    eachFile: copyFile,
    error: handleError
  })
    .setRoot(source)
    .polute({options, destination, source})
    .readdir('', options.callback);
}

module.exports = copy;
