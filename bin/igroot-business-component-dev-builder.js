#!/usr/bin/env node

const run = require('../command/run')

require('yargs')
  .usage('iGroot Business Component Dev Builder')
  .command('dev', 'debugging your iGroot business component', {}, argv => run())
  .demandCommand()
  .help()
  .alias('h', 'help')
  .epilog('Copyright 2017 By BaishanCloud')
  .argv
