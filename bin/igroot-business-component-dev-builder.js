#!/usr/bin/env node

const dev = require('../command/dev')
const publish = require('../command/publish')

require('yargs')
  .usage('iGroot Business Component Dev Builder')
  .command('dev', 'debugging your iGroot business component', {}, argv => dev())
  .command('publish', '', {}, argv => publish())
  .demandCommand()
  .help()
  .alias('h', 'help')
  .epilog('Copyright 2017 By BaishanCloud')
  .argv
