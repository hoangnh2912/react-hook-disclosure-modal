#!/usr/bin/env node
const { writeFileSync } = require('fs')
// import { Project } from 'ts-morph'
const { Project } = require('ts-morph')
const pathFile = process.argv[3]
if (!pathFile) {
    console.error('Please provide a path to the file as an argument.')
    process.exit(1)
}
const project = new Project(
    {
        tsConfigFilePath: "./tsconfig.json",
    }
)
const sourceFile = project.addSourceFileAtPath(pathFile)
const exportedDeclarations = sourceFile.getExportedDeclarations()
const pathGenerate = 'node_modules/react-hook-disclosure-modal/dist/hook/tag.d.ts'
const allTags = Array.from(exportedDeclarations).map(([name]) => name)
console.log(`Generated ${allTags.length} TypeScript type for tags`);
writeFileSync(pathGenerate, `export type TagType = ${allTags.map(tag => `'${tag}'`).join(' | ')};`)