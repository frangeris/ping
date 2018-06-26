'use strict'
const Generator = require('yeoman-generator')
const path = require('path')
const mkdirp = require('mkdirp')
const _ = require('lodash')

module.exports = class extends Generator {
  initializing () {
    this.parentName = path.basename(process.cwd())
  }

  prompting () {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: () => {
          return _.kebabCase(this.parentName + '-spa')
        },
        filter: _.kebabCase
      }
    ])
    .then(answers => {
      this.props = answers
    })
  }

  defaults () {
    // Create new folder if not updating
    if (!this.serverless && path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      )
      mkdirp(this.props.name)
      this.destinationRoot(this.destinationPath(this.props.name))
    }
  }

  writing () {
    // copy normal files/folders
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.props
    )

    // hidden files
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationPath()
    )

    // migrate .env vars
    this.fs.copy(
      this.templatePath('.env.example'),
      this.destinationPath('.env')
    )
  }

  install () {
    this.installDependencies({
      npm: true,
      bower: false
    })
  }
}
