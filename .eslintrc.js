let envFlag = process.env.WEBPACK_ENV === 'build';
var ecmaFeatures = {
  'jsx': true,
  'arrowFunctions': true,
  'blockBindings': true,
  'defaultParams': true,
  'destructuring': true,
  'forOf': true,
  'generators': true,
  'objectLiteralComputedProperties': true,
  'objectLiteralShorthandMethods': true,
  'objectLiteralShorthandProperties': true,
  'experimentalObjectRestSpread': true,
  'restParams': true,
  'spread': true,
  'templateStrings': true,
  'modules': true,
  'classes': true
};
let F = envFlag?2:0;
var rules = {
  'no-var':0,
  'indent':0,
  'max-len':0,
  'prefer-arrow-callback':0,
  'no-unused-vars':0,
  'eqeqeq':0,//判断
  'func-names':0,
  'strict':0,
  'linebreak-style':0,
  'object-shorthand':0,//ES6简写
  'comma-dangle':0,//末尾逗号
  'vars-on-top':0,
  'no-underscore-dangle':0,//下划线
  'eol-last':0,//文末空行
  'quotes':0,//单双引号
  'prefer-template':0,//ES6字符串连接
  'no-continue':0,//禁止continue
  'no-param-reassign':0,//禁止对 function 的参数进行重新赋值
  'prefer-rest-params':0,
  'quote-props':0,//要求对象字面量属性名称用引号括起来
  'import/no-extraneous-dependencies':0,
  'react/require-extension':0,
  'spaced-comment':0,//注释后强制留空格
  'one-var':0,
  'no-mixed-spaces-and-tabs':0,
  'no-redeclare':0,//禁止多次声明同一变量
  'new-cap': 0,
  'arrow-body-style': 0,
  'no-extra-parens': ['error', 'functions'],
  'dot-notation': 0,
  'camelcase': 0,
  'react/jsx-pascal-case': 0,
  'prefer-const': 0,
  'react/jsx-filename-extension': 0,
  'no-extra-semi':0,//额外分号
  'no-console':F,
  'no-alert':F,
  'no-empty':0//函数内为空
};
// 'extends': 'airbnb',
module.exports = {
  "extends": "eslint:recommended",
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'globals': {
    'describe': true,
    'it': true
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': ecmaFeatures
  },
  'ecmaFeatures': ecmaFeatures,
  rules: rules,
  extensions: ['', '.js', '.jsx']
};
