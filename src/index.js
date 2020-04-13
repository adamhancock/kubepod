#!/usr/bin/env node

const spawn = require('child_process').spawn
const path = require('path')
const chalk = require('chalk')
const templateEngine = require('./util/templateEngine')
const program = templateEngine(process.argv)
const package = require(path.join(process.cwd(), './package.json'))

console.log(chalk.green('Docs: https://blog.adamhancock.co.uk/kubepod 📒'))
console.log(chalk.green(`Starting kubepod v${package.version}...🚀`))
const shell = spawn(
  `sh`,
  [
    path.join(process.cwd(), './src/assets/kubepod.sh'),
    program.namespace,
    program.template,
  ],
  {
    stdio: 'inherit',
  }
)
shell.on('close', (code) => {
  console.log(chalk.green(`Finished ✅`))
})
