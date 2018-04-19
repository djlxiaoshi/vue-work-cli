/**
 * @Author JohnLi
 * @Date 2018/4/19 11:03
 */
const shell = require('shelljs');
const env = process.env.ENV;
const src = `config/${env}.env.js`;
const to = `config/environment.js`;
shell.cp('-R', src, to);
