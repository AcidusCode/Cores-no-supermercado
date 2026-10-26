import test from 'node:test';
import assert from 'node:assert/strict';
import {validateRecord, colors, profileOptions, withDefaults} from '../lib/validate.mjs';
import {validInput} from './helpers/fake-d1.mjs';

const profile = (o = {}) => ({age: 30, country: 'PT', gender: 'feminino', frequency: 'semanal', marketTypes: ['supermercado', 'online'], ...o});
const withAnswer = patch => validInput({answers: validInput().answers.map((a, i) => (i === 0 ? {...a, ...patch} : a))});

test('palette ends with the new cinzento and bege, keeping existing ids', () => {
  assert.deepEqual(colors.slice(0, 10), ['vermelho', 'amarelo', 'laranja', 'verde', 'azul', 'roxo', 'castanho', 'rosa', 'branco', 'preto']);
  assert.deepEqual(colors.slice(10), ['cinzento', 'bege']);
  const r = validateRecord(withAnswer({colors: ['cinzento', 'bege']}));
  assert.deepEqual(r.answers[0].colors, ['cinzento', 'bege']);
  assert.throws(() => validateRecord(withAnswer({colors: ['dourado']})), /Invalid participation/);
});

test('records without profile stay valid and get profile null', () => {
  assert.equal(validateRecord(validInput()).profile, null);
});

test('a valid profile is kept; allowed lists are exported', () => {
  assert.deepEqual(validateRecord(validInput({profile: profile()})).profile, profile());
  assert.deepEqual(profileOptions.gender, ['feminino', 'masculino', 'nao_binario', 'outro', 'prefiro_nao_dizer']);
  assert.deepEqual(profileOptions.frequency, ['diaria', 'varias_semana', 'semanal', 'quinzenal', 'mensal', 'raramente']);
  assert.deepEqual(profileOptions.marketTypes, ['supermercado', 'loja', 'mercado_fresco', 'online']);
});

test('age bounds are inclusive 18..120 and must be an integer', () => {
  for (const age of [18, 120]) assert.equal(validateRecord(validInput({profile: profile({age})})).profile.age, age);
  for (const age of [17, 121, 30.5, '30', null, NaN]) assert.throws(() => validateRecord(validInput({profile: profile({age})})), /Invalid participation/);
});

test('a present but malformed profile is rejected', () => {
  const bad = [
    profile({country: 'pt'}), profile({country: 'PRT'}), profile({country: 1}),
    profile({gender: 'x'}), profile({frequency: 'x'}),
    profile({marketTypes: []}), profile({marketTypes: ['loja', 'loja']}), profile({marketTypes: ['kiosk']}), profile({marketTypes: 'loja'}),
    {...profile(), age: undefined}, null, 'x', [],
  ];
  for (const p of bad) assert.throws(() => validateRecord(validInput({profile: p})), /Invalid participation/, JSON.stringify(p));
});

test('comment is optional, trimmed, capped at 400, and defaults to empty', () => {
  assert.equal(validateRecord(validInput()).answers[0].comment, '');
  assert.equal(validateRecord(withAnswer({comment: '  porque sim  '})).answers[0].comment, 'porque sim');
  assert.equal(validateRecord(withAnswer({comment: 'x'.repeat(400)})).answers[0].comment.length, 400);
  assert.throws(() => validateRecord(withAnswer({comment: 'x'.repeat(401)})), /Invalid participation/);
  assert.throws(() => validateRecord(withAnswer({comment: 5})), /Invalid participation/);
});

test('comment is independent of reasons and allowed with noAssociation', () => {
  const r = validateRecord(withAnswer({noAssociation: true, colors: [], reasons: [], comment: 'nada me ocorre'}));
  assert.equal(r.answers[0].comment, 'nada me ocorre');
  assert.equal(validateRecord(withAnswer({reasons: ['outra'], other: 'ab', comment: 'cd'})).answers[0].comment, 'cd');
});

test('withDefaults fills profile and comment on legacy stored records', () => {
  const legacy = {participant: 'a', answers: [{category: 'peixe'}]};
  assert.deepEqual(withDefaults(legacy), {participant: 'a', profile: null, answers: [{category: 'peixe', comment: ''}]});
  assert.deepEqual(withDefaults({participant: 'b'}), {participant: 'b', profile: null});
});

test('language accepts pt, en, es and it; unknown languages are rejected', () => {
  for (const language of ['pt', 'en', 'es', 'it']) assert.equal(validateRecord(validInput({language})).language, language);
  for (const language of ['fr', 'IT', '', null, undefined]) assert.throws(() => validateRecord(validInput({language})), /Invalid participation/, String(language));
});
