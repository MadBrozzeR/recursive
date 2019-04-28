const recursive = require('./recursive.js');
const fs = require('fs');

function removeFile (file, done) {
  const recursive = this;
  const options = this.polution.options;

  fs.unlink(file.fullname, function (error) {
    if (options.verbosely) {
      process.stdout.write('Removing "' + file.fullname + '"\n');
    }
    if (error) {
      options.callback && options.callback(error);
      recursive.stop = true;
    }

    done();
  });
}

function removeDir (dir, done) {
  const recursive = this;
  const options = this.polution.options;

  if (options.verbosely) {
    process.stdout.write('Removing "' + dir + '"\n');
  }
  fs.rmdir(dir, function (error) {
    if (error) {
      options.callback && options.callback(error);
      recursive.stop = true;
    }

    done();
  });
}

function handleError (file, error) {
  const callback = this.polution.options.callback;

  callback && callback(error);
}

function remove (directory, options = {}) {
  recursive({
    eachFile: removeFile,
    afterDir: removeDir,
    error: handleError
  }).polute({ options }).readdir(directory, options.callback);
}

module.exports = remove;
