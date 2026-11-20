---
title: "Page experience: speed, Core Web Vitals and mobile"
short: Page experience and Core Web Vitals
description: Google uses page experience signals, but they work mostly as a tiebreaker between pages of similar relevance and quality. This lesson explains the metrics, the thresholds and the fixes that matter.
outcomes:
  - Define LCP, INP and CLS and state the threshold for a good score
  - Tell field data apart from lab data and know which one Google uses
  - Fix the most common causes of slow, unresponsive or unstable pages
takeaways:
  - Core Web Vitals are LCP (loading, 2.5 seconds or less), INP (responsiveness, 200 milliseconds or less) and CLS (visual stability, 0.1 or less).
  - Google assesses them on real user data at the 75th percentile, not on a single lab test.
  - Good page experience helps, but it does not outrank relevant, helpful content. Fix serious problems first, and do not chase perfect scores.
  - Google indexes the mobile version of your pages. Content missing on mobile is missing for Google.
check:
  - q: PageSpeed Insights gives your page a lab score of 62, but the field data section says Core Web Vitals passed. Which matters for search?
    a: The field data. It comes from real Chrome users through the Chrome UX Report, and it is what Google's systems use. The lab score is a diagnostic tool for finding problems.
  - q: A page's CLS is 0.31 because an ad slot loads late and pushes the article down. What is the fix?
    a: Reserve space for the ad slot in CSS with a fixed height or aspect ratio, so the content does not move when the ad arrives.
  - q: Your mobile pages hide the product specifications that desktop pages show. Why is this a problem?
    a: Google uses the mobile version for indexing and ranking. Content missing from mobile is effectively missing from Google.
practice:
  title: Find the worst Core Web Vital on three templates
  time: 25 minutes
  tools: PageSpeed Insights, Search Console
  steps:
  - 'Run **PageSpeed Insights** on three page types: the home page, an article or category page, and a product or service page.'
  - For each, record the mobile field data for LCP, INP and CLS and whether the page passes. Note when there is not enough field data.
  - In the diagnostics, find the element that is the largest contentful paint and the main suggestion for each failing metric.
  - In Search Console, open **Core Web Vitals** and check whether the same templates appear in failing URL groups.
  done: For each template you have the worst metric and one concrete fix, such as compressing the hero image or reserving space for an ad slot.
  alt: Run steps 1 to 3 on any public site. PageSpeed Insights works on every public URL.
---

## What page experience means

Page experience is how it feels to use a page: how fast it loads, how quickly it responds, whether it jumps around, whether it works on a phone, and whether it is secure and free of intrusive pop ups.

Google says its ranking systems reward good page experience, but that there is no single "page experience signal". It also says that relevance and helpfulness come first. A great experience does not save an unhelpful page, and a highly relevant page can still rank with an average one. Think of it as a tiebreaker and a matter of user satisfaction.

## Core Web Vitals

Core Web Vitals are three metrics that measure loading, responsiveness and visual stability.

**Largest Contentful Paint (LCP)** measures loading: how long until the largest image or text block in the viewport appears. Good is **2.5 seconds or less**.

**Interaction to Next Paint (INP)** measures responsiveness: how long the page takes to visibly respond after a tap, click or key press, across all interactions during a visit. Good is **200 milliseconds or less**. INP replaced First Input Delay (FID) in March 2024.

**Cumulative Layout Shift (CLS)** measures visual stability: how much content unexpectedly moves while the page is in use. Good is **0.1 or less**.

A page passes when at least **75 percent of real visits** (the 75th percentile) meet the "good" threshold for each metric, measured separately on mobile and desktop.

## Field data and lab data

**Field data** comes from real Chrome users and is collected in the **Chrome UX Report (CrUX)**. This is what Google's systems use. It is shown in Search Console's Core Web Vitals report and at the top of PageSpeed Insights. Pages with little traffic may have no field data of their own and are grouped with similar pages.

**Lab data** comes from a simulated test, such as Lighthouse in PageSpeed Insights or Chrome DevTools. It is good for finding causes and testing fixes, but its score is not a ranking signal.

## Fixing each metric

### Slow LCP

1. **Speed up the server.** Use caching and a CDN, and reduce slow database work. Time to First Byte is often the hidden cause.
2. **Make the main image fast.** Compress it, serve modern formats (WebP or AVIF), size it correctly, and do not lazy load it. Adding `fetchpriority="high"` to the main image helps.
3. **Remove render blocking resources.** Defer non essential JavaScript, and inline or trim critical CSS.

### Poor INP

1. **Break up long JavaScript tasks** so the browser can respond between them.
2. **Reduce third party scripts** such as chat widgets, tag managers and trackers. Load the ones you keep after the page is interactive.
3. **Avoid heavy work in event handlers.** Update the screen first, then do the rest.

### High CLS

1. **Set width and height** on images and videos, or use CSS `aspect-ratio`.
2. **Reserve space** for ads, embeds and banners that load late.
3. **Avoid inserting content above existing content**, except in response to a user action.
4. **Load web fonts carefully** with `font-display` and matched fallback fonts, so text does not jump when the font arrives.

## Mobile

Google uses the mobile version of a page for indexing and ranking. This is called **mobile first indexing**, and it now applies to essentially all sites. In practice:

1. **Same content on mobile and desktop.** This includes text, images, structured data and metadata.
2. **Responsive design** with a viewport meta tag is the simplest approach.
3. **Readable without zooming**, with tap targets large enough to use with a thumb.

## HTTPS and intrusive pop ups

**HTTPS** is a confirmed but light ranking signal. More importantly, browsers mark plain HTTP pages as "Not secure". Every site should use HTTPS.

**Intrusive interstitials** are pop ups that cover the main content right after someone arrives from search, especially on mobile. They make a page harder to use. Legally required notices, such as cookie consent and age checks, are fine when they are reasonably sized.

> **Common mistake.** Spending weeks pushing a Lighthouse score from 85 to 100. Once real user data passes the thresholds, extra speed brings small gains. Spend the time on content and links instead.
{: .mistake}
