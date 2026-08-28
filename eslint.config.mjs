import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * Flat config. eslint-config-next v16 ships flat config only, so the legacy
 * .eslintrc.json / `next lint` setup no longer applies.
 */
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'brochure-extract/**',
      'brochure-check/**',
      'public/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Build tooling and data scripts are CommonJS Node, not bundled app code.
    files: ['*.js', 'scripts/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
