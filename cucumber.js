const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const template_backend = [
  ...common,
  'tests/apps/{{TEMPLATE}}/backend/features/**/*.feature',
  '--require tests/apps/{{TEMPLATE}}/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  template_backend
};
