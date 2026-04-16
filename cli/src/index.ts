#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

// Skill files bundled in assets/
const ASSETS_DIR = join(__dirname, '..', 'assets');

// Where Claude Code looks for skills
function getSkillDir(global: boolean): string {
  if (global) {
    return join(homedir(), '.claude', 'skills', 'ui-craft');
  }
  return join(process.cwd(), '.claude', 'skills', 'ui-craft');
}

function copyAssets(dest: string, force: boolean): void {
  if (existsSync(dest)) {
    if (!force) {
      console.log(chalk.yellow(`Skill already installed at ${dest}`));
      console.log(chalk.dim('Use --force to overwrite.'));
      process.exit(1);
    }
    rmSync(dest, { recursive: true });
  }
  mkdirSync(dest, { recursive: true });

  // Copy all files from assets
  const { readdirSync, statSync, copyFileSync } = await import('fs').then(m => m);
  function copyDir(src: string, dst: string) {
    mkdirSync(dst, { recursive: true });
    for (const entry of readdirSync(src)) {
      const srcPath = join(src, entry);
      const dstPath = join(dst, entry);
      if (statSync(srcPath).isDirectory()) {
        copyDir(srcPath, dstPath);
      } else {
        copyFileSync(srcPath, dstPath);
      }
    }
  }
  copyDir(ASSETS_DIR, dest);
}

program
  .name('ui-craft')
  .description('Install UI Craft skill for Claude Code')
  .version(pkg.version);

program
  .command('init')
  .description('Install the UI Craft skill')
  .option('-g, --global', 'Install globally (~/.claude/skills/)', false)
  .option('-f, --force', 'Overwrite existing installation', false)
  .action(async (options: { global: boolean; force: boolean }) => {
    const dest = getSkillDir(options.global);
    const spinner = ora('Installing UI Craft skill...').start();

    try {
      const { readdirSync, statSync, copyFileSync } = await import('fs');

      function copyDir(src: string, dst: string) {
        mkdirSync(dst, { recursive: true });
        for (const entry of readdirSync(src)) {
          const srcPath = join(src, entry);
          const dstPath = join(dst, entry);
          if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, dstPath);
          } else {
            copyFileSync(srcPath, dstPath);
          }
        }
      }

      if (existsSync(dest)) {
        if (!options.force) {
          spinner.fail(chalk.yellow(`Already installed at ${dest}`));
          console.log(chalk.dim('Run with --force to overwrite.'));
          process.exit(1);
        }
        rmSync(dest, { recursive: true });
      }

      mkdirSync(dest, { recursive: true });
      copyDir(ASSETS_DIR, dest);

      spinner.succeed(chalk.green('UI Craft skill installed!'));
      console.log('');
      console.log(chalk.dim('Location: ') + chalk.white(dest));
      console.log('');
      console.log(chalk.cyan('Next steps:'));
      if (options.global) {
        console.log('  The skill is now active in all your Claude Code projects.');
      } else {
        console.log('  The skill is active in this project.');
      }
      console.log('  Ask Claude to build a UI and it will apply the skill automatically.');
    } catch (err) {
      spinner.fail('Installation failed');
      console.error(err);
      process.exit(1);
    }
  });

program
  .command('uninstall')
  .description('Remove the UI Craft skill')
  .option('-g, --global', 'Remove global installation', false)
  .action((options: { global: boolean }) => {
    const dest = getSkillDir(options.global);
    if (!existsSync(dest)) {
      console.log(chalk.yellow('Skill not found at ' + dest));
      process.exit(1);
    }
    rmSync(dest, { recursive: true });
    console.log(chalk.green('UI Craft skill removed from ' + dest));
  });

program
  .command('info')
  .description('Show installed skill location and version')
  .option('-g, --global', 'Check global install', false)
  .action((options: { global: boolean }) => {
    const dest = getSkillDir(options.global);
    if (existsSync(dest)) {
      console.log(chalk.green('Installed') + ' at ' + chalk.white(dest));
    } else {
      console.log(chalk.yellow('Not installed') + ' at ' + chalk.white(dest));
    }
    console.log('CLI version: ' + chalk.cyan(pkg.version));
  });

program.parse();
