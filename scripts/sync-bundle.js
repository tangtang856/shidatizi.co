import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { airports } from '../data/airports.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bundlePath = path.resolve(__dirname, '../data/airports-bundle.js');

const bundleContent = `/**
 * 全局机场数据定义 (14家专属精选品牌，按用户指定官方排名严格排序)
 * 同时支持普通浏览器脚本标签直接引用 (window.AIRPORTS_DATA) 与 ES Module 导入
 */
(function(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    var exp = factory();
    root.AIRPORTS_DATA = exp.airports;
    root.getRankedAirports = exp.getRankedAirports;
    root.getAirportBySlug = exp.getAirportBySlug;
  }
})(typeof self !== 'undefined' ? self : this, function() {
  const airports = ${JSON.stringify(airports, null, 2)};

  function getAirportBySlug(slug) {
    return airports.find(a => a.slug === slug);
  }

  function getRankedAirports(criteria) {
    const list = airports.slice();
    if (criteria === 'value') {
      return list.sort((a, b) => b.valueScore - a.valueScore);
    } else if (criteria === 'budget') {
      return list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (criteria === 'stable') {
      return list.sort((a, b) => b.stabilityScore - a.stabilityScore);
    } else {
      return list.sort((a, b) => a.order - b.order);
    }
  }

  return {
    airports: airports,
    getAirportBySlug: getAirportBySlug,
    getRankedAirports: getRankedAirports
  };
});
`;

fs.writeFileSync(bundlePath, bundleContent, 'utf-8');
console.log('Successfully synchronized data/airports-bundle.js with data/airports.js');
