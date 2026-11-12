/// <reference types="node" />
import * as fs from 'fs';
import * as path from 'path';

// Guard: Vega OS 2.x has no React Native 0.83 FlashList system bundle, so
// loading FlashList makes the app exit at launch.
const SRC = path.join(__dirname, '..', '..', 'src');
const FLASH_LIST =
  /['"]@(amazon-devices|shopify)\/(shopify__)?flash-list(\/[^'"]*)?['"]/;

const sourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return sourceFiles(full);
    }
    return /\.(ts|tsx|js|jsx)$/.test(entry.name) ? [full] : [];
  });

describe('Carousel-only sample', () => {
  it('has no module under src/ that imports FlashList', () => {
    const offenders = sourceFiles(SRC).filter((file) =>
      FLASH_LIST.test(fs.readFileSync(file, 'utf8')),
    );
    expect(offenders.map((f) => path.relative(SRC, f))).toEqual([]);
  });

  it('does not declare a FlashList dependency', () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8'),
    );
    const declared = Object.keys({
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.overrides,
    });
    expect(declared.filter((name) => /flash-list/.test(name))).toEqual([]);
  });
});
