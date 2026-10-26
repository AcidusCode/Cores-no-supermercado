import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {colors, profileOptions} from '../lib/validate.mjs';

const read = f => readFileSync(new URL(`../dist/${f}`, import.meta.url), 'utf8');
const html = read('index.html'), app = read('app.js'), i18n = read('i18n.js'), admin = read('admin.js'), onboarding = read('onboarding.js');
const translations = vm.runInNewContext('(' + i18n.match(/const translations=(\{[\s\S]*?\n\});/)[1] + ')');
const colorIds = src => [...src.match(/(?:const COLORS|const colors)=\[(.*)\];/)[1].matchAll(/\['([a-z]+)','[^']+','(#[0-9a-fA-F]+)'\]/g)];
const profileSection = html.match(/<section id="profile"[\s\S]*?<\/section>/)?.[0] || '';
const values = (src, re) => [...src.matchAll(re)].map(m => m[1]).filter(Boolean);

test('palette ids in app.js and admin.js equal the server colors', () => {
 assert.deepEqual(colorIds(app).map(m => m[1]), colors);
 assert.deepEqual(colorIds(admin).map(m => m[1]), colors);
 const hex = Object.fromEntries(colorIds(app).map(m => [m[1], m[2]]));
 assert.equal(hex.cinzento, '#9e9e9e');
 assert.equal(hex.bege, '#e8d5b0');
});

test('every palette color name is translated', () => {
 for (const m of app.match(/const COLORS=.*;/)[0].matchAll(/'[a-z]+','([^']+)','#/g)) assert.ok(translations[m[1]]?.length === 2, m[1]);
});

test('profile option values in index.html equal the server profileOptions', () => {
 assert.ok(profileSection, 'profile section exists');
 const sel = id => profileSection.match(new RegExp(`<select id="${id}"[\\s\\S]*?</select>`))?.[0] || '';
 assert.deepEqual(values(sel('profile-gender'), /<option value="([^"]*)"/g), profileOptions.gender);
 assert.deepEqual(values(sel('profile-frequency'), /<option value="([^"]*)"/g), profileOptions.frequency);
 assert.deepEqual(values(profileSection, /<input type="checkbox" name="market" value="([^"]+)"/g), profileOptions.marketTypes);
});

test('required element ids exist in index.html', () => {
 for (const id of ['profile', 'profile-form', 'profile-title', 'profile-age', 'profile-country', 'profile-gender', 'profile-frequency', 'profile-back', 'profile-age-error', 'profile-country-error', 'profile-gender-error', 'profile-frequency-error', 'profile-market-error', 'instructions-back', 'quiz-back', 'comment', 'reason-colors', 'onboarding-back', 'other'])
  assert.match(html, new RegExp(`id="${id}"`), id);
 assert.match(html, /id="comment"[^>]*maxlength="400"/);
 assert.match(profileSection, /id="profile-age"[^>]*min="18"[^>]*max="120"|id="profile-age"[^>]*max="120"[^>]*min="18"/);
 assert.equal(values(profileSection, /(role="alert")/g).length >= 5, true);
});

test('consent no longer requires shopping in Portugal', () => {
 assert.doesNotMatch(html, /portugal/i);
 assert.doesNotMatch(i18n, /portugal/i);
 assert.doesNotMatch(app + onboarding, /portugal/i);
 assert.match(html, /Tenho 18 anos ou mais e aceito participar/);
});

test('every visible text, label and t() literal used by the new UI is translated in en and es', () => {
 const need = new Set();
 for (const m of profileSection.matchAll(/>([^<>]+)</g)) if (m[1].trim() && !/^[←→]$/.test(m[1].trim())) need.add(m[1].trim());
 for (const m of profileSection.matchAll(/(?:aria-label|placeholder|title)="([^"]+)"/g)) need.add(m[1]);
 for (const src of [app, onboarding]) for (const m of src.matchAll(/\bt\((["'])((?:(?!\1).)+)\1\)/g)) need.add(m[2]);
 for (const key of ['Tenho 18 anos ou mais e aceito participar e partilhar as respostas para este estudo.', 'Comentário (opcional)', 'Cinzento', 'Bege', 'Sem cor associada']) need.add(key);
 for (const m of html.matchAll(/id="(?:comment|quiz-back|instructions-back)"[^>]*>([^<]*)/g)) if (m[1].trim()) need.add(m[1].trim());
 for (const m of html.matchAll(/id="comment"[^>]*placeholder="([^"]+)"/g)) need.add(m[1]);
 const missing = [...need].filter(k => !(Array.isArray(translations[k]) && translations[k].length === 2 && translations[k].every(v => typeof v === 'string' && v.trim())));
 assert.deepEqual(missing, []);
});

test('profile and per-answer comment reach the saved participation', () => {
 assert.match(app, /saveParticipation\(\{[^}]*profile/);
 assert.match(app, /comment:\$\('comment'\)\.value\.trim\(\)/);
 assert.doesNotMatch(read('storage.js'), /pick|whitelist/);
});

test('cache-busting query is v4', () => {
 assert.doesNotMatch(html, /\?v=v3/);
 assert.doesNotMatch(read('admin.html'), /\?v=v3/);
 assert.match(html, /style\.css\?v=v4/);
 assert.match(html, /app\.js\?v=v4/);
});

test('admin detail view and CSV include profile and comment, existing columns first', () => {
 assert.match(admin, /'position','age','country','gender','frequency','market_types','comment'/);
 assert.match(admin, /answer\.comment/);
 assert.match(admin, /record\.profile/);
});
