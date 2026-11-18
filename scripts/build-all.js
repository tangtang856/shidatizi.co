import { generateHomepage } from './gen-homepage.js';
import { generateRecommendations } from './gen-recommendations.js';
import { generateRankings } from './gen-rankings.js';
import { generateReviewsAndAirports } from './gen-reviews-airports.js';
import { generateGuides } from './gen-guides.js';
import { generateBlogsAndGlossary } from './gen-blogs-glossary.js';
import { generateTrustPages } from './gen-trust.js';

console.log('=== [PHASE 6 & 7] 开始生成 shidatizi.co 全站核心页面 ===');

generateHomepage();
generateRecommendations();
generateRankings();
generateReviewsAndAirports();
generateGuides();
generateBlogsAndGlossary();
generateTrustPages();

console.log('=== 全站 40 个页面全部生成完毕！===');
