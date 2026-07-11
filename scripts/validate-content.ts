#!/usr/bin/env tsx

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import matter from 'gray-matter';
import { ArticleFrontmatter, GlossaryTerm, MarketUpdate, Topic, Path } from '@/content/schema';
import { z } from 'zod';

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, 'content');

type ValidationResult = {
  file: string;
  valid: boolean;
  errors: string[];
};

function walk(dir: string, extensions: string[] = ['.mdx', '.json']): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full, extensions));
    } else if (extensions.includes(extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function validateArticle(file: string, content: string, frontmatter: any): ValidationResult {
  const errors: string[] = [];

  // Check bilingual files exist
  const dir = join(CONTENT_DIR, 'articles');
  const rel = relative(dir, file);
  const parts = rel.split('/');
  if (parts.length >= 3) {
    const topic = parts[0];
    const slug = parts[1];
    const lang = parts[2].replace('.mdx', '');
    const otherLang = lang === 'ta' ? 'en' : 'ta';
    const otherFile = join(dir, topic, slug, `${otherLang}.mdx`);

    // Validate frontmatter
    const result = ArticleFrontmatter.safeParse(frontmatter);
    if (!result.success) {
      errors.push(...result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`));
    }

    // Check other language file exists
    try {
      const otherContent = readFileSync(otherFile, 'utf-8');
      const { data: otherFm } = matter(otherContent);
      const otherResult = ArticleFrontmatter.safeParse(otherFm);
      if (!otherResult.success) {
        errors.push(`Counterpart ${otherLang} file has invalid frontmatter: ${otherResult.error.issues.map(i => i.message).join(', ')}`);
      }
    } catch {
      errors.push(`Missing bilingual counterpart: ${otherLang}.mdx`);
    }
  }

  return { file: relative(ROOT, file), valid: errors.length === 0, errors };
}

function validateGlossary(file: string, frontmatter: any): ValidationResult {
  const result = GlossaryTerm.safeParse(frontmatter);
  return {
    file: relative(ROOT, file),
    valid: result.success,
    errors: result.success ? [] : result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`),
  };
}

function validateMarket(file: string, frontmatter: any): ValidationResult {
  const result = MarketUpdate.safeParse(frontmatter);
  return {
    file: relative(ROOT, file),
    valid: result.success,
    errors: result.success ? [] : result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`),
  };
}

function validateTopics(file: string, content: string): ValidationResult {
  try {
    const data = JSON.parse(content);
    const schema = z.array(Topic);
    const result = schema.safeParse(data);
    return {
      file: relative(ROOT, file),
      valid: result.success,
      errors: result.success ? [] : result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`),
    };
  } catch (e) {
    return { file: relative(ROOT, file), valid: false, errors: [`Invalid JSON: ${e}`] };
  }
}

function validatePaths(file: string, content: string): ValidationResult {
  try {
    const data = JSON.parse(content);
    const schema = z.array(Path);
    const result = schema.safeParse(data);
    return {
      file: relative(ROOT, file),
      valid: result.success,
      errors: result.success ? [] : result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`),
    };
  } catch (e) {
    return { file: relative(ROOT, file), valid: false, errors: [`Invalid JSON: ${e}`] };
  }
}

function main() {
  console.log('🔍 Validating content...\n');

  const allResults: ValidationResult[] = [];

  // Articles
  const articleFiles = walk(join(CONTENT_DIR, 'articles'), ['.mdx']);
  for (const file of articleFiles) {
    const content = readFileSync(file, 'utf-8');
    const { data: frontmatter } = matter(content);
    allResults.push(validateArticle(file, content, frontmatter));
  }

  // Glossary
  const glossaryFiles = walk(join(CONTENT_DIR, 'glossary'), ['.json']);
  for (const file of glossaryFiles) {
    const content = readFileSync(file, 'utf-8');
    const frontmatter = JSON.parse(content);
    allResults.push(validateGlossary(file, frontmatter));
  }

  // Market updates
  const marketFiles = walk(join(CONTENT_DIR, 'market'), ['.mdx']);
  for (const file of marketFiles) {
    const content = readFileSync(file, 'utf-8');
    const { data: frontmatter } = matter(content);
    allResults.push(validateMarket(file, frontmatter));
  }

  // Topics
  const topicsFile = join(CONTENT_DIR, 'topics.json');
  if (statSync(topicsFile).isFile()) {
    const content = readFileSync(topicsFile, 'utf-8');
    allResults.push(validateTopics(topicsFile, content));
  }

  // Paths
  const pathsFile = join(CONTENT_DIR, 'paths.json');
  if (statSync(pathsFile).isFile()) {
    const content = readFileSync(pathsFile, 'utf-8');
    allResults.push(validatePaths(pathsFile, content));
  }

  // Summary
  let total = 0;
  let valid = 0;
  let invalid = 0;

  for (const r of allResults) {
    total++;
    if (r.valid) {
      valid++;
      console.log(`  ✅ ${r.file}`);
    } else {
      invalid++;
      console.log(`  ❌ ${r.file}`);
      for (const err of r.errors) {
        console.log(`     - ${err}`);
      }
    }
  }

  console.log(`\n📊 Summary: ${total} files | ✅ ${valid} valid | ❌ ${invalid} invalid`);

  if (invalid > 0) {
    process.exit(1);
  }
}

main();