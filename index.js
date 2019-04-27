const fs = require('fs');

function Recursive(path) {
  this.path = path;
  this.beforeDir = null;
  this.afterDir = null;
  this.eachFile = null;
  this.onError = null;
}
Recursive.prototype.readdir = function(dir, done) {
  const _this = this;

  function next () {
    fs.readdir(dir, function (error, files) {
      if (error) {
        _this.onError(dir, error);
      } else {
        let counter = files.length;

        function localDone() {
          if (--counter === 0) {
            _this.afterDir ? _this.afterDir(dir, done) : done();
          }
        }

        for (let index = 0 ; index < files.length ; ++index) {
          const filepath = dir + '/' + file;

          fs.stat(filepath, function (error, stats) {
            if (error) {
              _this.onError(filepath, error);
            } else if (stats.isDirectory()) {
              _this.readdir(filepath, localDone);
            } else if (stats.isFile()) {
              _this.readfile(filepath, localDone);
            }
          });
        }
      }
    });
  }

  this.beforeDir ? this.beforeDir(dir, next) : next();
}

Recursive.prototype.readfile = function (file, done) {
  const _this = this;

  this.eachFile ? this.eachFile(file, done) : done();
}

function recursive(path) {
  return new Reqursive(path);
}

module.exports = {
  recurcive: recurcive
};
