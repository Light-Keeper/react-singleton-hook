const OFF = 0;
const WARN = 1;
const ERROR = 2;

const errorRules = {
  'getter-return': ERROR,
  'no-cond-assign': ERROR,
  'no-control-regex': ERROR,
  'no-dupe-args': ERROR,
  'no-dupe-keys': ERROR,
  'no-duplicate-case': ERROR,
  'no-empty-character-class': ERROR,
  'no-extra-semi': ERROR,
  'no-inner-declarations': ERROR,
  'no-invalid-regexp': ERROR,
  'no-irregular-whitespace': ERROR,
  'no-misleading-character-class': ERROR,
  'no-obj-calls': ERROR,
  'no-prototype-builtins': ERROR,
  'no-sparse-arrays': ERROR,
  'no-unreachable': ERROR,
  'no-unsafe-finally': ERROR,
  'no-unsafe-negation': ERROR,
  'require-atomic-updates': ERROR,
  'valid-typeof': ERROR,
  'no-empty-pattern': ERROR, // failures the build, automatically enabled by CRA
};

const bestPractices = {
  'consistent-return': ERROR,
  'curly': [ERROR, 'multi-line'],
  'default-case': ERROR,
  'dot-location': [ERROR, "property"],
  'dot-notation': ERROR,
  'eqeqeq': ERROR,
  'no-caller': ERROR,
  'no-case-declarations': OFF,
  'no-extra-label': ERROR,
  'no-global-assign': ERROR,
  'no-implicit-coercion': ERROR,
  'no-implicit-globals': ERROR,
  'no-implied-eval': ERROR,
  'no-invalid-this': OFF,
  'no-iterator': ERROR,
  'no-labels': ERROR,
  'no-lone-blocks': ERROR,
  'no-loop-func': ERROR,
  'no-multi-spaces': ERROR,
  'no-new-wrappers': ERROR,
  'no-octal': ERROR,
  'no-octal-escape': ERROR,
  'no-proto': ERROR,
  'no-redeclare': ERROR,
  'no-return-assign': ERROR,
  'no-self-assign': ERROR,
  'no-self-compare': ERROR,
  'no-throw-literal': [OFF],
  'no-unused-expressions': ERROR,
  'no-useless-call': ERROR,
  'no-useless-escape': ERROR,
  'no-useless-return': ERROR,
  'no-void': ERROR,
  'no-with': ERROR,
  'prefer-promise-reject-errors': OFF,
  'radix': ERROR,
  'wrap-iife': OFF,
  'yoda': ["error", "never", { "exceptRange": true }],
};

const variables = {
  'no-shadow': OFF,
  'no-shadow-restricted-names': ERROR,
  'no-undef': ERROR,
  'no-unused-vars': [ERROR, {args: 'none', ignoreRestSiblings: true}],
  'no-use-before-define': OFF,
};

const stylisticIssues = {
  'array-bracket-newline': [ERROR, "consistent"],
  'array-bracket-spacing': [ERROR,  "never"],
  'array-element-newline': [ERROR, "consistent"],
  'block-spacing': [ERROR, 'always'],
  'brace-style': [ERROR, '1tbs', { "allowSingleLine": true }],
  'camelcase': OFF,
  'comma-dangle': OFF,
  'comma-spacing': [ERROR, { "before": false, "after": true }],
  'comma-style': [ERROR, "last"],
  'computed-property-spacing': [ERROR, 'never'],
  'consistent-this': [ERROR, 'that'],
  'eol-last': [ERROR, 'always'],
  'func-call-spacing': [ERROR, 'never'],
  'func-name-matching': [ERROR, 'always'],
  'implicit-arrow-linebreak': [ERROR, 'beside'],
  'indent': [ERROR, 2, {SwitchCase: 1}],
  'jsx-quotes': [ERROR, "prefer-double"],
  'key-spacing': [ERROR, {
    beforeColon: false,
    afterColon: true,
  }],
  'keyword-spacing': [ERROR],
  'linebreak-style': [ERROR, 'unix'],
  'max-depth': [ERROR, 7],
  'max-lines': [ERROR, 3000],
  'max-nested-callbacks': [ERROR, 7],
  'max-statements-per-line': [ERROR, {max: 7}],
  'new-cap': [ERROR],
  'new-parens': [ERROR],
  'no-array-constructor': [ERROR],
  'no-bitwise': [ERROR, { int32Hint: true, allow: [] }],
  'no-lonely-if': [ERROR],
  'no-mixed-operators': [ERROR],
  'no-mixed-spaces-and-tabs': [ERROR],
  'no-multi-assign': [ERROR],
  'no-multiple-empty-lines': [ERROR, { max: 2, maxEOF: 1 }],
  'no-negated-condition': [ERROR],
  'no-nested-ternary': [ERROR],
  'no-new-object': [ERROR],
  'no-restricted-syntax': [
    ERROR,
    "WithStatement",
    {
      "selector": "ForInStatement",
      "message": "operator 'in' is not allowed"
    },
  ],
  'no-trailing-spaces': [ERROR],
  'no-unneeded-ternary': [ERROR],
  'no-whitespace-before-property': [ERROR],
  'nonblock-statement-body-position': [ERROR, 'beside'],
  'object-curly-newline': [ERROR, {consistent: true}],
  'object-curly-spacing': [ERROR, "always"],
  'object-property-newline': [ERROR, {allowAllPropertiesOnSameLine: true}],
  'one-var-declaration-per-line': [ERROR],
  'operator-linebreak': [ERROR, "before", { overrides: { "=": "after" } }],
  'padded-blocks': [ERROR, "never"],
  'prefer-object-spread': [ERROR],
  'quote-props': [ERROR, 'as-needed'],
  'quotes': [ERROR, 'single', {avoidEscape: true, allowTemplateLiterals: true}],
  'semi': [ERROR],
  'semi-spacing': [ERROR],
  'semi-style': [ERROR],
  'space-before-blocks': [ERROR],
  'space-before-function-paren': [ERROR, {anonymous: 'always', named: 'never', asyncArrow: 'always'}],
  'space-in-parens': [ERROR, 'never'],
  'space-infix-ops': [ERROR],
  'space-unary-ops': [ERROR, {words: true, nonwords: false}],
  'switch-colon-spacing': [ERROR],
  'template-tag-spacing': [ERROR, 'never']
};

const ECMAScript6 = {
  'arrow-body-style': [OFF],
  'arrow-parens': [OFF, 'as-needed'],
  'arrow-spacing': [ERROR],
  'constructor-super': [ERROR],
  'no-class-assign': [ERROR],
  'no-confusing-arrow': [ERROR],
  'no-const-assign': [ERROR],
  'no-dupe-class-members': [ERROR],
  'no-duplicate-imports': [ERROR],
  'no-this-before-super': [ERROR],
  'no-new-symbol': [ERROR],
  'no-useless-constructor': [ERROR],
  'no-useless-rename': [ERROR],
  'no-var': [ERROR],
  'prefer-numeric-literals': [ERROR],
  'prefer-destructuring': [OFF],
  'prefer-const': [OFF],
  'prefer-arrow-callback': [ERROR],
  'object-shorthand': [ERROR],
  'prefer-rest-params': [ERROR],
  'prefer-spread': [ERROR],
  'prefer-template': [ERROR],
  'rest-spread-spacing': [ERROR],
  'template-curly-spacing': [ERROR],
  'import/no-anonymous-default-export': [ERROR, {
    allowCallExpression: false,
  }],
};

const react = {
  'react/prop-types': OFF,
  'react/display-name': OFF,
  'react-hooks/rules-of-hooks': ERROR,
  'react-hooks/exhaustive-deps': WARN,
  'react/jsx-wrap-multilines': [ERROR, { return: 'parens-new-line', arrow: 'parens-new-line' }],
};

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    "process": true,
    "sinon": true,
    "__DEV__": true,
  },
  plugins: [
    'react',
    'react-hooks',
    'import'
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
  ],
  rules: {
    ...errorRules,
    ...bestPractices,
    ...variables,
    ...stylisticIssues,
    ...ECMAScript6,
    ...react,
  },
  overrides: [
    {
      files: ['src/scripts/**', 'jest.config.js'],
      env: {
        node: true
      }
    },
    {
      files: ['**.test.**', '**.spec.**'],
      env: {
        node: true,
        jest: true
      }
    }
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    },

    react: {
      version: 'detect'
    }
  }
};
