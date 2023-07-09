#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { simpleGit, CleanOptions } from 'simple-git';

simpleGit().clean(CleanOptions.FORCE);

const options = { // : Partial<SimpleGitOptions>
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

const git = simpleGit(options);

yargs(hideBin(process.argv))
    .command('major', 'increase major version of project', () => { }, (argv) => {
        console.info('major', argv)
    })
    .command('minor', 'increase minor version of project', () => { }, (argv) => {
        console.info('minor', argv)
    })
    .command('patch', 'increase patch version of project', () => { }, (argv) => {
        console.info('patch', argv)
    })
    .command('$0', 'the default command', () => { }, (argv) => {
        console.log('$0', argv)
        console.log('this command will be run by default')
        if (argv.commit) {
            console.log('you do commit')
            // git.add(['package.json', 'package-lock.json'])
            // git.commit('commit message')
        }
        if (argv.tag) {
            console.log('you do tag')
            // git.tag()
        }
        if (argv.push) {
            console.log('you do push')
        }
        if (argv.all) {
            console.log('you do all')
        }
    })
    .option('commit', {
        array: false,
        alias: 'c',
        default: false,
        description: 'commit files during increase version',
        type: 'boolean'
    })
    .option('push', {
        array: false,
        alias: 'p',
        default: false,
        description: 'push files during increase version',
        type: 'boolean'
    })
    .option('tag', {
        array: false,
        alias: 't',
        default: false,
        description: 'create tag during increase version',
        type: 'boolean'
    })
    .option('all', {
        array: false,
        alias: 'a',
        default: false,
        description: 'commit, push, create tag during increase version',
        type: 'boolean'
    })
    .argv