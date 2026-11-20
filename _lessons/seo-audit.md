---
title: Running an SEO audit
short: Running an SEO audit
description: An audit puts everything in this course into one ordered process. You check each layer from crawling to links, record what you find, and turn it into a prioritized plan.
outcomes:
  - Run an audit in an order where each step builds on the last
  - Record findings with evidence, impact and a clear fix
  - Prioritize fixes by impact and effort
takeaways:
  - Audit in the same order Google works, from crawling and indexing to content and links, because earlier problems block later ones.
  - Every finding needs evidence, an explanation of impact, and a specific fix.
  - Prioritize by impact and effort. A short list of important fixes beats a long list of warnings.
  - Tool warnings are prompts to investigate, not findings in themselves.
check:
  - q: An audit tool reports 4,000 "missing alt text" warnings and 30 important pages with noindex. Which comes first?
    a: The noindex pages. They keep important pages out of results entirely. Missing alt text matters for accessibility and image search, but its impact on rankings is much smaller.
  - q: What makes a finding useful to the person who has to fix it?
    a: It states the problem, shows where it happens with examples, explains why it matters, and says exactly what to change. "Improve page speed" is not useful. "Product images average 1.8 MB; compress and serve WebP to bring LCP under 2.5 seconds" is.
---

## Before you start

1. **Agree on the goal.** More leads, more sales, recovery from a drop, or a check before a migration all lead to different priorities.
2. **Get access** to Search Console, Analytics, the content system, and someone who can answer technical questions.
3. **Record a baseline.** Note clicks, impressions, key events and indexed pages for the last 12 months, so you can measure the effect of your work later.

## The audit, in order

Work through these layers in order. Each one depends on the layers before it. The [technical audit checklist]({{ '/checklists/' | relative_url }}#technical-audit) has a tick list for every step.

### 1. Crawl the site

Run a crawler such as Screaming Frog, Sitebulb or a crawler built into an SEO suite. It fetches every page it can find by following links, as Google does, and lists:

1. Status codes, including 404s, 5xx errors and redirect chains
2. Titles, descriptions and headings that are missing, duplicated or too long
3. Canonical tags and noindex rules
4. Internal links, click depth and orphan pages (compare the crawl with your sitemap)

### 2. Check indexing

1. In **Page indexing**, check that important pages are indexed and that every exclusion is intentional.
2. Check robots.txt for rules that block important sections or resources.
3. Compare the sitemap with the crawl. Every URL in the sitemap should be indexable and return 200.

### 3. Check rendering

On key templates such as the home page, a category, a product and an article, run **URL Inspection, then Test live URL**. Confirm that the main content, links and metadata appear in the rendered HTML.

### 4. Check page experience

Look at the **Core Web Vitals** report for failing URL groups, then diagnose the worst templates with PageSpeed Insights. Check mobile layouts for missing content.

### 5. Check structured data

Look at the enhancement reports for errors, and test key templates in the Rich Results Test. Remove markup for retired types and anything that does not match visible content.

### 6. Review content

1. Build the [content inventory]({{ '/learn/content-maintenance/' | relative_url }}) and mark each page to keep, update, merge or remove.
2. For the most important pages, check that they match the search intent of their target queries.
3. Look for thin pages, near duplicates and pages that compete for the same intent.
4. Look for gaps: questions your audience asks that no page answers.

### 7. Check on page elements

Review titles, descriptions and headings on important pages. In Search Console, look for pages with high impressions and low CTR.

### 8. Check internal links

Make sure important pages are linked from relevant pages, sit within a few clicks of the home page, and use descriptive anchor text.

### 9. Review links

In Search Console's Links report and a backlink tool, look at referring domains, the pages that earn links, and how this compares with competitors. Look for manual actions or obvious paid link patterns. Do not disavow based on tool toxicity scores alone.

### 10. Check local presence

For local businesses, check that the Business Profile is complete and accurate, that NAP is consistent on the main platforms, and how reviews and replies look.

## Writing findings

Write each finding in the same format:

1. **Problem.** What is wrong, in one sentence.
2. **Evidence.** Where it happens, with example URLs, screenshots and counts.
3. **Impact.** Why it matters for visibility or users, and how many important pages it affects.
4. **Fix.** Exactly what to change, and who should do it.
5. **Priority.** Based on impact and effort.

## Prioritizing

Sort findings into four groups:

1. **High impact, low effort.** Do these first. Examples: removing a stray noindex, fixing a robots.txt block, rewriting titles on top pages.
2. **High impact, high effort.** Plan these. Examples: moving to server rendering, consolidating a large blog, a content program for gap topics.
3. **Low impact, low effort.** Batch these into routine work.
4. **Low impact, high effort.** Usually skip these.

> **Common mistake.** Delivering a 90 page report of every tool warning. The people who must act on it need a short list of what matters most, in order, with clear fixes.
{: .mistake}

## After the audit

Agree on the plan, make the changes, and annotate the dates in your reporting. Compare against the baseline after Google has had time to recrawl, usually a few weeks for technical fixes and a few months for content and links. Then audit again, typically every 6 to 12 months, or before and after any major site change.

You have finished the course. The [checklists]({{ '/checklists/' | relative_url }}) turn the main processes into lists you can work through, and the [glossary]({{ '/glossary/' | relative_url }}) is there whenever a term needs a refresher.
