const merge = require('merge');
const tsPreset = require('ts-jest/jest-preset');
const jestDynamodb = require('jest-dynalite/jest-preset');

// Merge both presets
const preset = merge.recursive(
    tsPreset,
    jestDynamodb,
    { transform: tsPreset.transform }
);

module.exports = {
    ...preset,
    setupFiles: ['dotenv/config'],
    modulePathIgnorePatterns: ['build'],
};