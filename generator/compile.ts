import { relative } from 'path';
import { cwd } from 'process';
import {
  createProgram,
  Diagnostic,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics,
  parseConfigFileTextToJson,
  parseJsonConfigFileContent,
  sys,
} from 'typescript';
import { DIST_FOLDER } from './setup';
import { mkdirSync } from 'fs';

const reportDiagnostics = (diagnostics: Diagnostic[]): void => {
  const errors = diagnostics.map((diagnostic) => {
    let message = 'Error';
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start ?? 0
      );
      message += ` ${diagnostic.file.fileName} (${line + 1},${character + 1})`;
    }
    message +=
      ': ' + flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    return message;
  });

  if (errors && errors.length > 0) {
    throw new Error(
      `Typescript Errors: \n${errors.map((v) => ' - ' + v).join('\n')}`
    );
  }
};
export const compileIcons = (sourceFolder: string, distFolder: string) => {
  console.log(
    `- compile ${relative(cwd(), sourceFolder)} to ${relative(
      cwd(),
      distFolder
    )}`
  );
  mkdirSync(distFolder, { recursive: true });
  const tsConfigRead = parseConfigFileTextToJson(
    '',
    JSON.stringify({
      compilerOptions: {
        target: 'es6',
        lib: ['dom', 'dom.iterable', 'esnext'],
        outDir: relative(cwd(), distFolder),
        baseUrl: './',
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        declaration: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        sourceMap: true,
        inlineSources: true,
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        downlevelIteration: true,
        noEmit: false,
        jsx: 'react',
      },
      exclude: ['node_modules', relative(cwd(), DIST_FOLDER)],
      include: [relative(cwd(), sourceFolder)],
    })
  );
  const config = parseJsonConfigFileContent(tsConfigRead.config, sys, cwd());
  if (config.errors.length > 0) {
    reportDiagnostics(config.errors);
  }
  let program = createProgram(config.fileNames, config.options);
  let emitResult = program.emit();

  // Report errors
  reportDiagnostics(
    getPreEmitDiagnostics(program).concat(emitResult.diagnostics)
  );
};
