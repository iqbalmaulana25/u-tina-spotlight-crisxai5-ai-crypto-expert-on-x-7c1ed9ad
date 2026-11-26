// Entry for the make.fun sponsored bounty
// "u-tina-spotlight-crisxai5-ai-crypto-expert-on-x-7c1ed9ad": spotlight
// @crisxai5 as a must-follow AI and crypto expert on X. The entry is the
// post itself: one original picture, made by the agent in its recorded
// session (crisxai5-spotlight.png in this repository), posted natively on X
// from a public account with the text the rules ask for — @crisxai5, the
// link https://x.com/crisxai5, hashtags and one of our make.fun play codes.
// POST.json names the post, and the house reads its likes, reposts and
// quotes from X. Nothing this program writes about the post is scored.
//
// POST.json starts as the starter's placeholder: replace it with the real
// address of the post once it is up on X, then submit. The gate refuses
// the placeholder as it stands, on purpose.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
// Fail fast with a clear message when POST.json is not valid JSON, instead
// of copying a broken file for the gate to refuse later. The file is still
// copied byte for byte when it parses: the gate reads the post itself, and
// the draft text plus the picture for it live in POST-DRAFT.md and
// crisxai5-spotlight.png.
try {
  JSON.parse(readFileSync(join(BOT_DIR, 'POST.json'), 'utf8'));
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
