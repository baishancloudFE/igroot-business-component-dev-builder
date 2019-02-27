const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const {exec} = require('child_process')

module.exports = function() {
  const packageJsonPath = path.resolve('package.json')
  const hasPackageJson = fs.existsSync(packageJsonPath)

  if (!hasPackageJson) {
    console.error(chalk.red('Can not find the \'package.json\'! Please check your folder path.\n'))
    throw new Error('Can not find the \'package.json\'!')
  }

  const package = require(packageJsonPath)
  const {name, version} = package

  inquirer.prompt([{
    type: 'confirm',
    name: 'checkProject',
    message: `You will release new version of ${chalk.cyan(`'${name}'`)}, please make sure.`,
    default: true
  }]).then(answer => {
    if (!answer.checkProject)
      process.exit(0)

    return inquirer.prompt([{
      type: 'input',
      name: 'version',
      message: `version: ${chalk.gray(`(${version} => ${defaultVersion(version)})`)}`,
    }])
  }).then(answer => {
    const version = package.version = answer.version || defaultVersion(version)

    fs.writeFile(packageJsonPath, JSON.stringify(package, null, 2), err => {
      err && errorHandle(err, chalk.red("Failed to write the file 'package.json'!\n"))

      exec('git add package.json', (err, stdout, stderr) => {
        console.log(stdout)
        console.error(stderr)
        err && errorHandle(err, chalk.red("error to running 'git add package.json'\n"))

        exec(`git commit -m 'version changed to ${version}'`, (err, stdout, stderr) => {
          console.log(stdout)
          console.error(stderr)
          err && errorHandle(err, chalk.red(`error to running "git commit -m 'version changed to ${version}'"\n`))

          // 先发 npm
          exec('npm publish', (err, stdout, stderr) => {
            console.log(stdout)
            console.error(stderr)

            err
              ? console.error(chalk.red('Failed to \'npm publish\'.\n'))
              : console.log(chalk.green('Complete to \'npm publish\'.\n'))

            // 再推 git
            exec('git push origin master', (err, stdout, stderr) => {
              console.log(stdout)
              console.error(stderr)

              err
                ? console.error(chalk.red('Failed to \'git push origin master\'\n'))
                : console.log(chalk.green('Complete to \'git push origin master\'.\n'))
            })
          })
        })
      })
    })
  })
}

function defaultVersion(version) {
  const nums = version.split('.').map(n => +n)

  nums[nums.length - 1] = nums[nums.length - 1] + 1
  return nums.join('.')
}

function errorHandle(err, info) {
  console.error(info)
  console.warn(chalk.yellow("Please change the file manually and execute the following commands:"))
  console.info(chalk.cyan("   git add package.json"))
  console.info(chalk.cyan("   git commit -m 'version changed to {version}'"))
  console.info(chalk.cyan("   npm publish"))
  console.info(chalk.cyan("   git push origin master\n"))

  throw err
}