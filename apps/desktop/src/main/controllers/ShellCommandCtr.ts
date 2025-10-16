import {
  GetCommandOutputParams,
  GetCommandOutputResult,
  KillCommandParams,
  KillCommandResult,
  RunCommandParams,
  RunCommandResult,
} from '@lobechat/electron-client-ipc';
import { ChildProcess, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';

import { createLogger } from '@/utils/logger';

import { ControllerModule, ipcClientEvent } from './index';

const logger = createLogger('controllers:ShellCommandCtr');

interface ShellProcess {
  lastRead: number;
  process: ChildProcess;
  stderr: string[];
  stdout: string[];
}

export default class ShellCommandCtr extends ControllerModule {
  // Shell process management
  private shellProcesses = new Map<string, ShellProcess>();

  @ipcClientEvent('runCommand')
  async handleRunCommand({
    command,
    description,
    run_in_background,
    timeout = 120_000,
  }: RunCommandParams): Promise<RunCommandResult> {
    const logPrefix = `[runCommand: ${description || command.slice(0, 50)}]`;
    logger.debug(`${logPrefix} Starting command execution`, {
      background: run_in_background,
      timeout,
    });

    // Validate timeout
    const effectiveTimeout = Math.min(Math.max(timeout, 1000), 600_000);

    // Cross-platform shell selection
    const shellConfig =
      process.platform === 'win32'
        ? { cmd: 'cmd.exe', args: ['/c', command] }
        : { cmd: '/bin/sh', args: ['-c', command] };

    try {
      if (run_in_background) {
        // Background execution
        const shellId = randomUUID();
        const childProcess = spawn(shellConfig.cmd, shellConfig.args, {
          env: process.env,
          shell: false,
        });

        const shellProcess: ShellProcess = {
          lastRead: 0,
          process: childProcess,
          stderr: [],
          stdout: [],
        };

        // Capture output
        childProcess.stdout?.on('data', (data) => {
          shellProcess.stdout.push(data.toString());
        });

        childProcess.stderr?.on('data', (data) => {
          shellProcess.stderr.push(data.toString());
        });

        childProcess.on('exit', (code) => {
          logger.debug(`${logPrefix} Background process exited`, { code, shellId });
        });

        this.shellProcesses.set(shellId, shellProcess);

        logger.info(`${logPrefix} Started background execution`, { shellId });
        return {
          shell_id: shellId,
          success: true,
        };
      } else {
        // Synchronous execution with timeout
        return new Promise((resolve) => {
          const childProcess = spawn(shellConfig.cmd, shellConfig.args, {
            env: process.env,
            shell: false,
          });

          let stdout = '';
          let stderr = '';
          let killed = false;

          const timeoutHandle = setTimeout(() => {
            killed = true;
            childProcess.kill();
            resolve({
              error: `Command timed out after ${effectiveTimeout}ms`,
              stderr,
              stdout,
              success: false,
            });
          }, effectiveTimeout);

          childProcess.stdout?.on('data', (data) => {
            stdout += data.toString();
          });

          childProcess.stderr?.on('data', (data) => {
            stderr += data.toString();
          });

          childProcess.on('exit', (code) => {
            if (!killed) {
              clearTimeout(timeoutHandle);
              const success = code === 0;
              logger.info(`${logPrefix} Command completed`, { code, success });
              resolve({
                exit_code: code || 0,
                output: stdout + stderr,
                stderr,
                stdout,
                success,
              });
            }
          });

          childProcess.on('error', (error) => {
            clearTimeout(timeoutHandle);
            logger.error(`${logPrefix} Command failed:`, error);
            resolve({
              error: error.message,
              stderr,
              stdout,
              success: false,
            });
          });
        });
      }
    } catch (error) {
      logger.error(`${logPrefix} Failed to execute command:`, error);
      return {
        error: (error as Error).message,
        success: false,
      };
    }
  }

  @ipcClientEvent('getCommandOutput')
  async handleGetCommandOutput({
    filter,
    shell_id,
  }: GetCommandOutputParams): Promise<GetCommandOutputResult> {
    const logPrefix = `[getCommandOutput: ${shell_id}]`;
    logger.debug(`${logPrefix} Retrieving output`);

    const shellProcess = this.shellProcesses.get(shell_id);
    if (!shellProcess) {
      logger.error(`${logPrefix} Shell process not found`);
      return {
        error: `Shell ID ${shell_id} not found`,
        output: '',
        running: false,
        stderr: '',
        stdout: '',
        success: false,
      };
    }

    const { lastRead, process: childProcess, stderr, stdout } = shellProcess;

    // Get new output since last read
    const newStdout = stdout.slice(lastRead).join('');
    const newStderr = stderr.slice(lastRead).join('');
    let output = newStdout + newStderr;

    // Apply filter if provided
    if (filter) {
      try {
        const regex = new RegExp(filter, 'gm');
        const lines = output.split('\n');
        output = lines.filter((line) => regex.test(line)).join('\n');
      } catch (error) {
        logger.error(`${logPrefix} Invalid filter regex:`, error);
      }
    }

    // Update last read position
    shellProcess.lastRead = stdout.length + stderr.length;

    const running = childProcess.exitCode === null;

    logger.debug(`${logPrefix} Output retrieved`, {
      outputLength: output.length,
      running,
    });

    return {
      output,
      running,
      stderr: newStderr,
      stdout: newStdout,
      success: true,
    };
  }

  @ipcClientEvent('killCommand')
  async handleKillCommand({ shell_id }: KillCommandParams): Promise<KillCommandResult> {
    const logPrefix = `[killCommand: ${shell_id}]`;
    logger.debug(`${logPrefix} Attempting to kill shell`);

    const shellProcess = this.shellProcesses.get(shell_id);
    if (!shellProcess) {
      logger.error(`${logPrefix} Shell process not found`);
      return {
        error: `Shell ID ${shell_id} not found`,
        success: false,
      };
    }

    try {
      shellProcess.process.kill();
      this.shellProcesses.delete(shell_id);
      logger.info(`${logPrefix} Shell killed successfully`);
      return { success: true };
    } catch (error) {
      logger.error(`${logPrefix} Failed to kill shell:`, error);
      return {
        error: (error as Error).message,
        success: false,
      };
    }
  }
}
