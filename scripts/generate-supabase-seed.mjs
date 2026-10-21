import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'src/data');

function loadData(file) {
  const source = fs.readFileSync(path.join(dataDir, file), 'utf8').replace(/^import .*$/gm, '');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  new Function('exports', 'module', output)(module.exports, module);
  return module.exports;
}

const puppyData = loadData('puppies.ts');
const goneHomeData = loadData('goneHome.ts');
const polaroidData = loadData('polaroids.ts');
const familiesData = loadData('happyFamiliesPage.ts');
const faqData = loadData('faqs.ts');
const journeyData = loadData('journey.ts');

const sql = (value) => {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return `'${String(value).replaceAll("'", "''")}'`;
};

const insert = (table, row, conflict) => {
  const columns = Object.keys(row);
  return `insert into public.${table} (${columns.join(', ')}) values (${columns.map((key) => sql(row[key])).join(', ')}) on conflict ${conflict};`;
};

const ageMonths = (value) => {
  const match = value?.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

console.log('begin;');

for (const puppy of puppyData.PUPPIES) {
  console.log(insert('puppies', {
    id: puppy.id, name: puppy.name, breed: puppy.breed, gender: puppy.gender,
    age_months: ageMonths(puppy.age), display_age: puppy.age, status: puppy.status.toLowerCase().replace(' ', '_'),
    image_url: puppy.image, video_url: null, origin: puppy.origin === 'imported' ? 'Korea' : 'Dubai',
    description: puppy.meta ?? null, accent_color: puppy.color ?? null, has_video: Boolean(puppy.hasVideo),
  }, '(id) do update set name = excluded.name, breed = excluded.breed, gender = excluded.gender, age_months = excluded.age_months, display_age = excluded.display_age, status = excluded.status, image_url = excluded.image_url, origin = excluded.origin, description = excluded.description, accent_color = excluded.accent_color, has_video = excluded.has_video'));
}

for (const puppy of goneHomeData.GONE_HOME_TICKETS) {
  const [breed = 'Puppy', gender = ''] = puppy.meta.split(',').map((part) => part.trim());
  console.log(insert('puppies', {
    id: puppy.href.replace('/puppies/', ''), name: puppy.name, breed, gender: gender || 'boy',
    age_months: null, display_age: 'Adopted', status: 'gone_home', image_url: puppy.img, video_url: null,
    origin: 'Dubai', description: puppy.meta, accent_color: null, has_video: false,
  }, '(id) do update set name = excluded.name, breed = excluded.breed, gender = excluded.gender, display_age = excluded.display_age, status = excluded.status, image_url = excluded.image_url, description = excluded.description'));
}

for (const [index, photo] of polaroidData.POLAROID_PHOTOS.entries()) {
  console.log(insert('gallery', {
    source_key: `polaroid-${photo.id}`, image_url: photo.image, caption: photo.caption, category: 'happy_family',
    alt_text: photo.caption, family: photo.family ?? null, location: photo.location ?? null,
    display_tilt: photo.style.match(/--tilt:([^;]+)/)?.[1] ?? null,
    tape_color: photo.style.match(/--tape:([^;]+)/)?.[1] ?? null, sort_order: index,
  }, '(source_key) do update set image_url = excluded.image_url, caption = excluded.caption, category = excluded.category, alt_text = excluded.alt_text, family = excluded.family, location = excluded.location, display_tilt = excluded.display_tilt, tape_color = excluded.tape_color, sort_order = excluded.sort_order'));
}

for (const [index, photo] of familiesData.HAPPY_FAMILIES_ALL.entries()) {
  console.log(insert('gallery', {
    source_key: photo.id, image_url: photo.img, caption: null, category: 'happy_family', alt_text: photo.alt,
    family: null, location: null, display_tilt: photo.tilt, tape_color: photo.tape, sort_order: index + 100,
  }, '(source_key) do update set image_url = excluded.image_url, alt_text = excluded.alt_text, display_tilt = excluded.display_tilt, tape_color = excluded.tape_color, sort_order = excluded.sort_order'));
}

for (const [index, faq] of faqData.FAQS.entries()) {
  console.log(insert('faqs', { id: faq.id, question: faq.question, answer: faq.answer, sort_order: index }, '(id) do update set question = excluded.question, answer = excluded.answer, sort_order = excluded.sort_order'));
}

for (const step of journeyData.JOURNEY_STEPS) {
  console.log(insert('journey_steps', { step_number: step.number, title: step.title, description: step.description }, '(step_number) do update set title = excluded.title, description = excluded.description'));
}

for (const [index, stamp] of journeyData.TRUST_STAMPS.entries()) {
  console.log(insert('trust_stamps', { id: stamp.id, title: stamp.title, description: stamp.description, stamp_type: stamp.stampType, color: stamp.color, display_tilt: stamp.tilt, sort_order: index }, '(id) do update set title = excluded.title, description = excluded.description, stamp_type = excluded.stamp_type, color = excluded.color, display_tilt = excluded.display_tilt, sort_order = excluded.sort_order'));
}

console.log(insert('testimonials', { id: 'main-testimonial', quote: polaroidData.MAIN_TESTIMONIAL.quote, author_name: polaroidData.MAIN_TESTIMONIAL.author, location: polaroidData.MAIN_TESTIMONIAL.location }, '(id) do update set quote = excluded.quote, author_name = excluded.author_name, location = excluded.location'));
console.log('commit;');
