"use strict";
const getInfo = require('szdbb')

module.exports = buildversion;

class buildversion {
  constructor() {}
  apply(compiler) {
    compiler.hooks.compilation.tap("FileListPlugin", (compilation) => {
      compiler.hooks.emit.tap("FileListPlugin", () => {
        let content = getInfo()
        compilation.assets["README.md"] = {
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
