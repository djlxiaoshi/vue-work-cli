/**
 * @Author JohnLi
 * @Date 2018/4/19 11:03
 */
const shell = require('shelljs');
const env = process.env.ENV;
const src = `src/environment/${env}.env.js`;
const to = `src/environment/environment.js`;
shell.cp('-R', src, to);
