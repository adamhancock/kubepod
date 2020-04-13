const Handlebars = require('handlebars')
const program = require('commander')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const package = require(path.join(process.cwd(), './package.json'))
// Parse options
program.option('-n, --namespace <String>', 'namespace', 'default')
program.parse(process.argv)
module.exports = function () {
  const template = Handlebars.compile(
    fs
      .readFileSync(path.join(process.cwd(), './src/assets/kubepod.yaml'))
      .toString()
  )

  return {
    namespace: program.namespace,
    template: template({
      namespace: program.namespace,
      version: package.version,
    }),
  }
}
