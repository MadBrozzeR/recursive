const fs = require('fs');

function File(filename, directory, stat) {
    this.name = filename;
    this.dir = directory;
    this.stat = stat;
    this.fullname = `${directory}/${filename}`;
}
File.prototype.read = function (callback) {
    fs.readFile(this.fullname, callback);
};
File.prototype.write = function (data, callback) {
    fs.writeFile(this.fullname, data, callback);
};
File.prototype.getAbsolutePath = function (callback) {
    fs.realpath(this.fullname, callback);
};

function Recursive (handlers) {
  this.root = '.';
  this.handlers = {
    beforeDir: null,
    afterDir: null,
    eachFile: null,
    error: null
  };
  handlers && this.on(handlers);
}

Recursive.prototype.setRoot = function (root) {
  this.root = root;

  return this;
}

Recursive.prototype.readdir = function (dir, done) {
  const _this = this;

  function next () {
    fs.readdir(_this.root + '/' + dir, function (error, files) {
      if (error && _this.handlers.error) {
        _this.handlers.error.call(_this, dir, error);
      } else {
        let counter = files.length;

        function localDone() {
          if (--counter === 0) {
            _this.handlers.afterDir
              ? _this.handlers.afterDir.call(_this, dir, done)
              : done();
          }
        }

        if (files.length === 0) {
          counter = 1;
          localDone();
        } else {
          for (let index = 0 ; index < files.length ; ++index) {
            const filepath = dir + '/' + files[index];

            fs.stat(_this.root + '/' + filepath, function (error, stats) {
              if (error && _this.handlers.error) {
                _this.handlers.error.call(_this, filepath, error);
              } else if (stats.isDirectory()) {
                _this.readdir(filepath, localDone);
              } else if (stats.isFile()) {
                readFile(_this, new File(files[index], dir, stats), localDone);
              }
            });
          }
        }
      }
    });
  }

  this.handlers.beforeDir ? this.handlers.beforeDir.call(this, dir, next) : next();
}

function readFile (context, file, done) {
  context.handlers.eachFile
    ? context.handlers.eachFile.call(context, file, done)
    : done();
}

Recursive.prototype.on = function (handlers) {
  for (let handle in handlers) {
    if (handle in this.handlers) {
      this.handlers[handle] = handlers[handle];
    }
  }

  return this;
}

function recursive (handlers) {
  return new Recursive (handlers);
}

module.exports = recursive;
