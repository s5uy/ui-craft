#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { readFileSync, readdirSync, statSync, copyFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

// Skill files bundled in assets/
const ASSETS_DIR = join(__dirname, '..', 'assets');

// Supported AI assistants and their skill directories
const AI_TYPES = ['claude', 'cursor', 'windsurf', 'copilot', 'continue', 'antigravity', 'kiro', 'codex', 'qoder', 'roocode', 'gemini', 'trae', 'opencode', 'codebuddy', 'droid', 'kilocode', 'warp', 'augment', 'all'] as const;

type AIType = typeof AI_TYPES[number];

interface AIConfig {
  name: string;
  dirs: string[];
}

function getAIConfig(aiType: AIType): AIConfig {
  const configs: Record<AIType, AIConfig> = {
    claude: { name: 'Claude Code', dirs: ['.claude/skills/ui-craft'] },
    cursor: { name: 'Cursor', dirs: ['.cursor/extensions/skills/ui-craft'] },
    windsurf: { name: 'Windsurf', dirs: ['.windsurf/extensions/skills/ui-craft'] },
    copilot: { name: 'GitHub Copilot', dirs: ['.copilot/extensions/skills/ui-craft'] },
    continue: { name: 'Continue', dirs: ['.continue/extensions/skills/ui-craft'] },
    antigravity: { name: 'Antigravity', dirs: ['.antigravity/skills/ui-craft'] },
    kiro: { name: 'Kiro', dirs: ['.kiro/extensions/skills/ui-craft'] },
    codex: { name: 'Codex CLI', dirs: ['.codex/extensions/skills/ui-craft'] },
    qoder: { name: 'Qoder', dirs: ['.qoder/extensions/skills/ui-craft'] },
    roocode: { name: 'Roo Code', dirs: ['.roocode/extensions/skills/ui-craft'] },
    gemini: { name: 'Gemini CLI', dirs: ['.gemini/extensions/skills/ui-craft'] },
    trae: { name: 'Trae', dirs: ['.trae/extensions/skills/ui-craft'] },
    opencode: { name: 'OpenCode', dirs: ['.opencode/extensions/skills/ui-craft'] },
    codebuddy: { name: 'CodeBuddy', dirs: ['.codebuddy/extensions/skills/ui-craft'] },
    droid: { name: 'Droid', dirs: ['.droid/extensions/skills/ui-craft'] },
    kilocode: { name: 'KiloCode', dirs: ['.kilocode/extensions/skills/ui-craft'] },
    warp: { name: 'Warp', dirs: ['.warp/extensions/skills/ui-craft'] },
    augment: { name: 'Augment', dirs: ['.augment/extensions/skills/ui-craft'] },
    all: {
      name: 'All Assistants',
      dirs: [
        '.claude/skills/ui-craft',
        '.cursor/extensions/skills/ui-craft',
        '.windsurf/extensions/skills/ui-craft',
        '.copilot/extensions/skills/ui-craft',
        '.continue/extensions/skills/ui-craft',
        '.antigravity/skills/ui-craft',
        '.kiro/extensions/skills/ui-craft',
        '.codex/extensions/skills/ui-craft',
        '.qoder/extensions/skills/ui-craft',
        '.roocode/extensions/skills/ui-craft',
        '.gemini/extensions/skills/ui-craft',
        '.trae/extensions/skills/ui-craft',
        '.opencode/extensions/skills/ui-craft',
        '.codebuddy/extensions/skills/ui-craft',
        '.droid/extensions/skills/ui-craft',
        '.kilocode/extensions/skills/ui-craft',
        '.warp/extensions/skills/ui-craft',
        '.augment/extensions/skills/ui-craft',
      ]
    },
  };
  return configs[aiType];
}

function getSkillDirs(aiType: AIType, global: boolean): string[] {
  const config = getAIConfig(aiType);
  const baseDir = global ? homedir() : process.cwd();
  return config.dirs.map(dir => join(baseDir, dir));
}

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

program
  .name('ui-craft')
  .description('Install UI Craft skill for AI coding assistants')
  .version(pkg.version);

program
  .command('init')
  .description('Install the UI Craft skill')
  .option('-a, --ai <type>', `AI assistant type (${AI_TYPES.join(', ')})`, 'claude')
  .option('-g, --global', 'Install globally (~/.{editor}/)', false)
  .option('-f, --force', 'Overwrite existing installation', false)
  .action(async (options: { ai: string; global: boolean; force: boolean }) => {
    const aiType = options.ai.toLowerCase() as AIType;

    // Validate AI type
    if (!AI_TYPES.includes(aiType)) {
      console.error(chalk.red(`❌ Unknown AI type: ${options.ai}`));
      console.log(`Available types: ${AI_TYPES.join(', ')}`);
      process.exit(1);
    }

    const config = getAIConfig(aiType);
    const dests = getSkillDirs(aiType, options.global);
    const spinner = ora(`Installing UI Craft skill for ${config.name}...`).start();

    try {
      let installed = 0;
      for (const dest of dests) {
        if (existsSync(dest) && !options.force) {
          spinner.warn(chalk.yellow(`Already installed at ${dest}, skipping...`));
          continue;
        }

        if (existsSync(dest)) {
          rmSync(dest, { recursive: true });
        }

        mkdirSync(dest, { recursive: true });
        copyDir(ASSETS_DIR, dest);
        installed++;
      }

      if (installed === 0) {
        spinner.fail(chalk.yellow('Already installed'));
        console.log(chalk.dim('Run with --force to overwrite.'));
        process.exit(1);
      }

      spinner.succeed(chalk.green(`UI Craft skill installed for ${config.name}!`));
      console.log('');
      for (const dest of dests) {
        if (existsSync(dest)) {
          console.log(chalk.dim('  ✓ ') + chalk.white(dest));
        }
      }
      console.log('');
      console.log(chalk.cyan('Next steps:'));
      console.log(`  Restart your ${config.name} editor.`);
      console.log('  Ask your AI to build a UI and it will apply the skill automatically.');
    } catch (err) {
      spinner.fail('Installation failed');
      console.error(err);
      process.exit(1);
    }
  });

program
  .command('uninstall')
  .description('Remove the UI Craft skill')
  .option('-a, --ai <type>', `AI assistant type (${AI_TYPES.filter(t => t !== 'all').join(', ')})`, 'claude')
  .option('-g, --global', 'Remove global installation', false)
  .action((options: { ai: string; global: boolean }) => {
    const aiType = options.ai.toLowerCase() as AIType;

    if (aiType === 'all') {
      console.error(chalk.red('❌ Cannot uninstall "all" - specify a single AI type'));
      process.exit(1);
    }

    if (!AI_TYPES.includes(aiType)) {
      console.error(chalk.red(`❌ Unknown AI type: ${options.ai}`));
      process.exit(1);
    }

    const config = getAIConfig(aiType);
    const dests = getSkillDirs(aiType, options.global);

    let removed = 0;
    for (const dest of dests) {
      if (!existsSync(dest)) {
        console.log(chalk.yellow(`Not found at ${dest}`));
        continue;
      }
      rmSync(dest, { recursive: true });
      console.log(chalk.green(`✓ Removed from ${dest}`));
      removed++;
    }

    if (removed === 0) {
      console.log(chalk.yellow('Skill not found'));
      process.exit(1);
    }
  });

program
  .command('info')
  .description('Show installed skill locations and version')
  .option('-a, --ai <type>', `AI assistant type (${AI_TYPES.filter(t => t !== 'all').join(', ')})`, 'all')
  .option('-g, --global', 'Check global installations', false)
  .action((options: { ai: string; global: boolean }) => {
    const aiType = options.ai.toLowerCase() as AIType;

    if (!AI_TYPES.includes(aiType)) {
      console.error(chalk.red(`❌ Unknown AI type: ${options.ai}`));
      process.exit(1);
    }

    console.log(`${chalk.cyan('UI Craft')} v${pkg.version}`);
    console.log('');

    if (aiType === 'all') {
      for (const type of AI_TYPES.filter(t => t !== 'all')) {
        const config = getAIConfig(type as AIType);
        const dests = getSkillDirs(type as AIType, options.global);
        const installed = dests.some(d => existsSync(d));
        const status = installed ? chalk.green('✓ Installed') : chalk.yellow('✗ Not installed');
        console.log(`${status}  ${config.name}`);
      }
    } else {
      const config = getAIConfig(aiType);
      const dests = getSkillDirs(aiType, options.global);
      console.log(`${config.name}:`);
      for (const dest of dests) {
        const status = existsSync(dest) ? chalk.green('✓') : chalk.yellow('✗');
        console.log(`  ${status} ${dest}`);
      }
    }
  });

program.parse();
