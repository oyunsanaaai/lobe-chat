import { BuiltinToolManifest } from '@lobechat/types';

import { systemPrompt } from './systemRole';

export const LocalSystemApiName = {
  editLocalFile: 'editLocalFile',
  getCommandOutput: 'getCommandOutput',
  globLocalFiles: 'globLocalFiles',
  grepContent: 'grepContent',
  killCommand: 'killCommand',
  listLocalFiles: 'listLocalFiles',
  moveLocalFiles: 'moveLocalFiles',
  readLocalFile: 'readLocalFile',
  renameLocalFile: 'renameLocalFile',
  runCommand: 'runCommand',
  searchLocalFiles: 'searchLocalFiles',
  writeLocalFile: 'writeLocalFile',
};

export const LocalSystemManifest: BuiltinToolManifest = {
  api: [
    {
      description:
        'List files and folders in a specified directory. Input should be a path. Output is a JSON array of file/folder names.',
      name: LocalSystemApiName.listLocalFiles,
      parameters: {
        properties: {
          path: {
            description: 'The directory path to list',
            type: 'string',
          },
        },
        required: ['path'],
        type: 'object',
      },
    },
    {
      description:
        'Read the content of a specific file. Input should be the file path. Output is the file content as a string.',
      name: LocalSystemApiName.readLocalFile,
      parameters: {
        properties: {
          loc: {
            description:
              'Optional range of lines to read [startLine, endLine]. Defaults to [0, 200] if not specified.',
            items: {
              type: 'number',
            },
            type: 'array',
          },
          path: {
            description: 'The file path to read',
            type: 'string',
          },
        },
        required: ['path'],
        type: 'object',
      },
    },
    {
      description:
        'Search for files within the workspace based on a query string and optional filter options. Input should include the search query and any filter options. Output is a JSON array of matching file paths.',
      name: LocalSystemApiName.searchLocalFiles,
      parameters: {
        properties: {
          contentContains: {
            description: 'The file content must contain this string',
            type: 'string',
          },
          createdAfter: {
            description:
              'Files created after this date (ISO 8601 format, e.g., 2023-10-26T10:00:00Z)',
            format: 'date-time',
            type: 'string',
          },
          createdBefore: {
            description: 'Files created before this date (ISO 8601 format)',
            format: 'date-time',
            type: 'string',
          },
          exclude: {
            description: 'Array of file or directory paths to exclude',
            items: {
              type: 'string',
            },
            type: 'array',
          },
          fileTypes: {
            description: 'Array of file types to include (e.g., "public.image", "txt")',
            items: {
              type: 'string',
            },
            type: 'array',
          },
          keywords: {
            description: 'The search keywords string (can include partial names or keywords)',
            type: 'string',
          },
          limit: {
            description: 'Limit the number of results returned',
            type: 'number',
          },
          liveUpdate: {
            description: 'Whether to update search results live (if supported)',
            type: 'boolean',
          },
          modifiedAfter: {
            description: 'Files modified after this date (ISO 8601 format)',
            format: 'date-time',
            type: 'string',
          },
          modifiedBefore: {
            description: 'Files modified before this date (ISO 8601 format)',
            format: 'date-time',
            type: 'string',
          },
          onlyIn: {
            description: 'Limit the search to this specific directory path',
            type: 'string',
          },
          sortBy: {
            description: 'Sort results by',
            enum: ['name', 'date', 'size'],
            type: 'string',
          },
          sortDirection: {
            description: 'Sort direction',
            enum: ['asc', 'desc'],
            type: 'string',
          },
        },
        required: ['keywords'],
        type: 'object',
      },
    },
    {
      description:
        'Moves or renames multiple files/directories. Input is an array of objects, each containing an oldPath and a newPath.',
      name: LocalSystemApiName.moveLocalFiles,
      parameters: {
        properties: {
          items: {
            description: 'A list of move/rename operations to perform.',
            items: {
              properties: {
                newPath: {
                  description:
                    'The target absolute path for the file/directory (can include a new name).',
                  type: 'string',
                },
                oldPath: {
                  description: 'The current absolute path of the file/directory to move or rename.',
                  type: 'string',
                },
              },
              required: ['oldPath', 'newPath'],
              type: 'object',
            },
            type: 'array',
          },
        },
        required: ['items'],
        type: 'object',
      },
    },
    {
      description:
        'Rename a file or folder in its current location. Input should be the current full path and the new name.',
      name: LocalSystemApiName.renameLocalFile,
      parameters: {
        properties: {
          newName: {
            description: 'The new name for the file or folder (without path)',
            type: 'string',
          },
          path: {
            description: 'The current full path of the file or folder to rename',
            type: 'string',
          },
        },
        required: ['path', 'newName'],
        type: 'object',
      },
    },
    {
      description:
        'Write content to a specific file. Input should be the file path and content. Overwrites existing file or creates a new one.',
      name: LocalSystemApiName.writeLocalFile,
      parameters: {
        properties: {
          content: {
            description: 'The content to write',
            type: 'string',
          },
          path: {
            description: 'The file path to write to',
            type: 'string',
          },
        },
        required: ['path', 'content'],
        type: 'object',
      },
    },
    {
      description:
        'Execute a shell command and return its output. Supports both synchronous and background execution with timeout control.',
      name: LocalSystemApiName.runCommand,
      parameters: {
        properties: {
          command: {
            description: 'The shell command to execute',
            type: 'string',
          },
          description: {
            description:
              'Clear description of what this command does (5-10 words, in active voice)',
            type: 'string',
          },
          run_in_background: {
            description: 'Set to true to run command in background and return shell_id',
            type: 'boolean',
          },
          timeout: {
            description: 'Timeout in milliseconds (default: 120000ms, max: 600000ms)',
            type: 'number',
          },
        },
        required: ['command'],
        type: 'object',
      },
    },
    {
      description:
        'Retrieve output from a running or completed background shell command. Returns only new output since the last check.',
      name: LocalSystemApiName.getCommandOutput,
      parameters: {
        properties: {
          filter: {
            description:
              'Optional regex pattern to filter output lines. Only matching lines are returned.',
            type: 'string',
          },
          shell_id: {
            description: 'The ID of the background shell to retrieve output from',
            type: 'string',
          },
        },
        required: ['shell_id'],
        type: 'object',
      },
    },
    {
      description: 'Kill a running background shell command by its ID.',
      name: LocalSystemApiName.killCommand,
      parameters: {
        properties: {
          shell_id: {
            description: 'The ID of the background shell to kill',
            type: 'string',
          },
        },
        required: ['shell_id'],
        type: 'object',
      },
    },
    {
      description:
        'Search for content within files using regex patterns. Supports various output modes and filtering options.',
      name: LocalSystemApiName.grepContent,
      parameters: {
        properties: {
          '-A': {
            description:
              'Number of lines to show after each match (requires output_mode: "content")',
            type: 'number',
          },
          '-B': {
            description:
              'Number of lines to show before each match (requires output_mode: "content")',
            type: 'number',
          },
          '-C': {
            description:
              'Number of lines to show before and after each match (requires output_mode: "content")',
            type: 'number',
          },
          '-i': {
            description: 'Case insensitive search',
            type: 'boolean',
          },
          '-n': {
            description: 'Show line numbers in output (requires output_mode: "content")',
            type: 'boolean',
          },
          'glob': {
            description: 'Glob pattern to filter files (e.g. "*.js", "*.{ts,tsx}")',
            type: 'string',
          },
          'head_limit': {
            description: 'Limit output to first N results',
            type: 'number',
          },
          'multiline': {
            description: 'Enable multiline mode where . matches newlines',
            type: 'boolean',
          },
          'output_mode': {
            description:
              'Output mode: "content" (matching lines), "files_with_matches" (file paths), "count" (match counts)',
            enum: ['content', 'files_with_matches', 'count'],
            type: 'string',
          },
          'path': {
            description: 'File or directory to search in (defaults to current working directory)',
            type: 'string',
          },
          'pattern': {
            description: 'The regular expression pattern to search for',
            type: 'string',
          },
          'type': {
            description: 'File type to search (e.g. "js", "py", "rust")',
            type: 'string',
          },
        },
        required: ['pattern'],
        type: 'object',
      },
    },
    {
      description:
        'Find files matching glob patterns. Supports standard glob syntax like "**/*.js" or "src/**/*.ts".',
      name: LocalSystemApiName.globLocalFiles,
      parameters: {
        properties: {
          path: {
            description: 'The directory to search in (defaults to current working directory)',
            type: 'string',
          },
          pattern: {
            description: 'The glob pattern to match files against (e.g. "**/*.js", "*.{ts,tsx}")',
            type: 'string',
          },
        },
        required: ['pattern'],
        type: 'object',
      },
    },
    {
      description:
        'Perform exact string replacements in files. Must read the file first before editing.',
      name: LocalSystemApiName.editLocalFile,
      parameters: {
        properties: {
          file_path: {
            description: 'The absolute path to the file to modify',
            type: 'string',
          },
          new_string: {
            description: 'The text to replace with (must differ from old_string)',
            type: 'string',
          },
          old_string: {
            description: 'The exact text to replace',
            type: 'string',
          },
          replace_all: {
            description: 'Replace all occurrences of old_string (default: false)',
            type: 'boolean',
          },
        },
        required: ['file_path', 'old_string', 'new_string'],
        type: 'object',
      },
    },
  ],
  identifier: 'lobe-local-system',
  meta: {
    avatar: '📁',
    title: 'Local System',
  },
  systemRole: systemPrompt,
  type: 'builtin',
};
