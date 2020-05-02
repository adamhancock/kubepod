#!/usr/bin/env node

const emoji = require('node-emoji')
const spawn = require('child_process').spawn
const path = require('path')
const chalk = require('chalk')
const templateEngine = require(path.join(process.cwd(), './src/util/templateEngine'))
const program = templateEngine(process.argv)
const package = require(path.join(process.cwd(), './package.json'))
const emojiMissing = require(path.join(process.cwd(), './src/util/emojiMissing'))

console.log(chalk.green(emoji.emojify(`Docs: https://blog.adamhancock.co.uk/kubepod:green_book:`, emojiMissing)))
console.log(chalk.green(emoji.emojify(`Starting kubepod v${package.version}...:rocket:`, emojiMissing)))
const shell = spawn(`sh`, [path.join(process.cwd(), './src/assets/kubepod.sh'), program.namespace, program.template, ], {
  stdio: 'inherit'
})
shell.on('close', (code) => {
  console.log(chalk.green(emoji.emojify(`Finished :white_check_mark:`, emojiMissing)))
})
