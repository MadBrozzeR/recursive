const recursive = require('../recursive.js');
const copy = require('../copy.js');
const remove = require('../remove.js');

function beforeDir (dir, done) {
  process.stdout.write('Before directory "' + dir + '"\nWaiting for 1 second\n');
  setTimeout(done, 1000);
}

function afterDir (dir, done) {
  process.stdout.write('After directory "' + dir + '"\nWaiting for 2 seconds\n');
  setTimeout(done, 2000);
}

function eachFile(file, done) {
  process.stdout.write('Current file "' + file.fullname + '"\nWaiting for 1 second\n');
  setTimeout(done, 1000);
}

function nowCopy () {
  copy('./directory1.0.0', './dir', {
    verbosely: true,
    callback: function () {
      process.stdout.write('Directory have been copied\nWaiting for 5 seconds\n')
      setTimeout(nowRemove, 5000);
    }
  });
}

function nowRemove () {
  remove('./dir', {
    verbosely: true,
    callback: allDone
  });
}

function allDone () {
  process.stdout.write('All done\n');
}

recursive({beforeDir, afterDir, eachFile}).setRoot('./directory1.0.0').readdir('', nowCopy);
