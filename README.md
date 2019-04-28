# recoursive

Library for asynchronous recursive operations with file system (only Unix based systems have been tested).

## recursive

```
const recursive = require('recoursive').recursive;

recursive({
  beforeDir: function (dirPath, done) {
    /**
     * Function to be called before each directory entry.
     *
     * @param { String } dirPath - relative directory path.
     * @param { Function } done - proceed with directory.
     */
  },
  eachFile: function (file, done) {
    /**
     * Function to be called on each file.
     *
     * @param { File } file - file object.
     * @param { Function } done - file processing complete.
     */
  },
  afterDir: function (dirPath, done) {
    /**
     * Function to be called after each directory processed.
     *
     * @param { String } dirPath - relative directory path.
     * @param { Function } done - directory processing complete.
     */
  },
  error: function (path, error) {
    /**
     * Function to handle errors.
     *
     * @param { String } path - relative directory or file path where error occured.
     * @param { Error } error - error description.
     */
  }
}).readdir('./directory/to/be/read', function () {
  /**
   * Function to be called when process is complete.
   */
});
```

## copy

Recursive directory copy.

```
const copy = require('recoursive').copy;

copy('./source/directory', './destination/directory', {
  verbosely: true, // output process to console.
  callback: function (error) {
    /**
     * Function to be called on error or success.
     *
     * @param { Error } error - error description. Not empty if error has been occured.
     */
  }
});
```

## remove

Recurcive directory remove.

```
const rm = require('recoursive').remove;

rm('./directory', {
  verbosely: true, // output process to console.
  callback: function (error) {
    /**
     * Function to be called on error or success.
     *
     * @param { Error } error - error description. Not empty if error has been occured.
     */
  }
});
```
