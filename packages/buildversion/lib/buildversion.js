"use strict";
const getInfo = require('szdbb')

class buildversion {
  constructor(fileName) {
      this.fileName = fileName || "README.md"
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("FileListPlugin", (compilation) => {
      compiler.hooks.emit.tap("FileListPlugin", () => {
        let content = getInfo()
        compilation.assets[this.fileName] = {
          source() {
            return content;
          },
          size() {
            return content.length;
          },
        };
      });
    });
  }
}

module.exports = buildversion;