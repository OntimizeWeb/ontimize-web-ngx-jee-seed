const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const { exec } = require('child_process');
const fs = require("fs");
var change = require('gulp-change');

/**
 * AoT tasks
 */
gulp.task('compile-aot', gulpSequence('clean', 'copy:tasks', 'aot:compile'));

gulp.task('aot', gulpSequence('compile-aot', 'aot:bundle', 'styles', 'clean:aot'));

gulp.task('aot:compile', (cb) => {
  exec('node_modules\\.bin\\ngc -p tsconfig.aot.json', function (error, stdout, stderr) {
    cb(error);
  });
});

gulp.task('aot:bundle', (cb) => {
  exec('webpack --config aot-config/webpack-aot.config.js --bail', function (error, stdout, stderr) {
    cb(error);
  });
});


/**
 * Styles tasks
 */
gulp.task('styles', (cb) => {
  exec('node_modules\\.bin\\node-sass src/styles-aot.scss dist/assets/css/app.css --output-style compressed', function (error, stdout, stderr) {
    cb(error);
  });
});

/**
 * Copying tasks
 */
gulp.task('copy:tasks', gulpSequence('copy:src', 'copy:main:aot', 'modify:routing'));

gulp.task('copy:src', function () {
  return gulp.src('./src/**/*').pipe(gulp.dest('./tmp-src'));
});

gulp.task('copy:main:aot', function () {
  return gulp.src('./aot-config/main-aot.ts').pipe(gulp.dest('./tmp-src'));
});

// gulp.task('remove:main:aot', function () {
//   exec('rimraf ./src/main-aot.ts');
// });

// gulp.task('copy:routing', function () {
//  return gulp.src('./src/**/*-routing.module.ts')
//     .pipe(gulp.dest('./temp-routing/'));
// });

gulp.task('modify:routing', function () {
  return gulp.src('./tmp-src/**/*-routing.module.ts')
    .pipe(change(performChange))
    // .pipe(gulp.dest('./temp-routing2'));
    .pipe(gulp.dest('./tmp-src'));
});

function performChange(content, done) {
  var indexes = getLoadChildrenIndexes(content);
  if (indexes.length) {
    var ordered = indexes.sort(compareByProp('loadChildPos'));
    console.log(ordered);
    content = replaceLoadChildren(content, ordered);
    content = deleteDefsAndImports(content, ordered);
  }
  done(null, content);
}

function replaceLoadChildren(content, array) {
  for (var i = 0, len = array.length; i < len; i++) {
    var curr = array[i];
    var newStr = '\'' + curr.modulePath + '#' + curr.moduleName + '\'';
    var endIdx = content.substring(curr.loadChildPos, content.length).indexOf(curr.moduleFn);
    endIdx = (endIdx + curr.moduleFn.length) + curr.loadChildPos;
    content = content.substring(0, curr.loadChildPos)
      + newStr
      + content.substring(endIdx, content.length);
  }
  return content;
}

function deleteDefsAndImports(content, array) {
  for (var i = 0, len = array.length; i < len; i++) {
    var curr = array[i];
    content = content.replace(curr.importDef, '').replace(curr.moduleFnDef, '');
  }
  return content;
}

function getLoadChildrenIndexes(content) {
  var startIndex = 0, index, indexes = [];
  var floadChildrenStr = 'loadChildren:';
  var returnStr = 'return ';
  var fromStr = 'from ';
  while ((index = content.indexOf(floadChildrenStr, startIndex)) > -1) {
    var moduleFnCallPos = index + floadChildrenStr.length;
    var moduleFn, moduleFnDef, moduleName, modulePath;
    var fnDefStartIdx, fnDefEndIdx, importStartIdx, importEndIdx, importDef;

    var endFnNameIdx = content.indexOf(' ', moduleFnCallPos + 1);

    moduleFn = content.substring(moduleFnCallPos, endFnNameIdx).trim();
    if (moduleFn && moduleFn.length) {
      fnDefStartIdx = content.indexOf(moduleFn);
      if (fnDefStartIdx !== -1) {
        fnDefStartIdx = content.substring(0, fnDefStartIdx).lastIndexOf('export');
        fnDefEndIdx = content.indexOf('}', fnDefStartIdx) + 1;

        moduleFnDef = content.substring(fnDefStartIdx, fnDefEndIdx)

        var moduleNameStartIdx = content.indexOf(returnStr, fnDefStartIdx) + returnStr.length;
        moduleName = content.substring(moduleNameStartIdx, content.indexOf(';', fnDefStartIdx));

        var importModuleIdx = content.substring(0, moduleNameStartIdx).indexOf(moduleName);
        if (importModuleIdx !== -1) {
          importStartIdx = content.substring(0, importModuleIdx).lastIndexOf('import');
          importEndIdx = content.indexOf(';', importStartIdx) + 1;
          importDef = content.substring(importStartIdx, importEndIdx);
          modulePath = content.substring(content.indexOf(fromStr, importStartIdx) + fromStr.length + 1, importEndIdx - 2);
        }
      }
    }

    indexes.push({
      loadChildPos: moduleFnCallPos,
      // fnStartDefPos: fnDefStartIdx,
      // fnEndDefPos: fnDefEndIdx,
      moduleFnDef: moduleFnDef,
      moduleFn: moduleFn,
      moduleName: moduleName,
      modulePath: modulePath,
      importDef: importDef
      // ,
      // importStartPos: importStartIdx,
      // importEndPos: importEndIdx
    });
    startIndex = moduleFnCallPos;
  }
  return indexes;
}

function compareByProp(property) {
  return function compare(a, b) {
    if (a[property] < b[property])
      return -1;
    if (a[property] > b[property])
      return 1;
    return 0;
  }
}





/**
 * Cleaning tasks
 */
gulp.task('clean', ['clean:aot'], (cb) => {
  exec('rimraf dist', function (error, stdout, stderr) {
    cb(error);
  });
});

gulp.task('clean:aot', (cb) => {
  exec('rimraf tmp-src', function (error, stdout, stderr) {
    cb(error);
  });
});

// gulp.task('clean:aot', (cb) => {
//   exec('rimraf src/app/**/*.ngfactory.ts && rimraf src/app/**/*.ngsummary.json && rimraf src/app/**/*.ngstyle.ts && rimraf src/app/**/*.d.ts', function (error, stdout, stderr) {
//     cb(error);
//   });
// });

/**
 * Functions
 */
function appName() {
  var pkg = JSON.parse(fs.readFileSync('package.json').toString());
  return pkg.name;
}