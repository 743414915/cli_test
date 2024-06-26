const { program } = require("commander");
const { version } = require("../../package.json");

function helpOptions() {
  // 1.处理--version的操作
  program.version(version, "-v --version");

  // 2.增强其他的option的操作
  program
    .option("-t --test", "a cli test~")
    .option("-d --dest <dest>", "输出目标的文件夹，eg：-d src/components");
}

module.exports = helpOptions;