---
title: "Crawling: robots.txt, sitemaps and crawl budget"
short: Crawling
description: Before Google can index a page it has to find and fetch it. This lesson covers the two files that guide crawlers and explains when crawl budget is, and is not, worth worrying about.
redirect_from:
  - /chapters/technical-seo/
outcomes:
  - Write a correct robots.txt file and explain what it can and cannot do
  - Build and submit an XML sitemap that Google will actually use
  - Decide whether a site has a real crawl budget problem
takeaways:
  - robots.txt controls crawling, not indexing. A blocked URL can still appear in results if other pages link to it.
  - Never block a page in robots.txt if you want Google to see a noindex rule on it.
  - Sitemaps help discovery. Google uses an accurate lastmod date but ignores priority and changefreq.
  - Crawl budget matters mainly for very large or very fast changing sites. Most sites never need to think about it.
check:
  - q: "You added `Disallow: /private/` to robots.txt, but a page in that folder still shows up in Google with no description. Why?"
    a: robots.txt stops crawling, not indexing. Google found links to the URL and indexed it without being able to read it. To keep it out of results, allow crawling and add a noindex rule, or protect it with a password.
  - q: Your sitemap has 800 URLs. Search Console says 120 are not indexed. Does that mean the sitemap is broken?
    a: No. A sitemap is a list of suggestions. Check the Page indexing report for the reasons. They are often duplicates, redirects, noindexed pages or pages Google judged low value, and some of those should not be in the sitemap at all.
  - q: A 300 page company site wants to "optimize crawl budget". Is this a good use of time?
    a: Almost never. Google's crawl budget guide is aimed at sites with around a million or more pages, or tens of thousands of pages that change daily. A small site is better served by fixing content and internal links.
practice:
  title: Read a real robots.txt and sitemap
  time: 15 minutes
  tools: 'A browser, Search Console and the [robots.txt tester](/tools/robots-txt-tester/)'
  steps:
  - Open `yourdomain.com/robots.txt`. Write down every `Disallow` rule and which part of the site it blocks.
  - Check that no rule blocks CSS, JavaScript, or a section you want to appear in search results.
  - Find the sitemap (listed in robots.txt, or at `/sitemap.xml`). Open five URLs from it and check that each loads normally without a redirect.
  - In Search Console, open **Sitemaps** and compare the number of discovered pages with the number you expected.
  done: You can say which paths are blocked and why, and every sitemap URL you opened loaded normally.
  alt: Do steps 1 to 3 on a large public site, such as a news site or an online store, and note which sections they block and why.
---

## How crawlers find URLs

Googlebot finds URLs in three main ways:

1. **Links** from pages it already knows, on your site or on others.
2. **Sitemaps** you submit in Search Console or list in robots.txt.
3. **Manual requests** through the URL Inspection tool. These are useful for single pages, but there is a quota.

The most reliable of these is links. If a page has no internal links pointing to it, it is an **orphan page**. Google may find it through a sitemap but will treat it as unimportant.

## robots.txt

robots.txt is a plain text file at the root of a host, for example `https://example.com/robots.txt`. It tells crawlers which paths they may fetch. Each subdomain and protocol needs its own file.

```text
User-agent: *
Disallow: /cart/
Disallow: /search
Allow: /search/help

Sitemap: https://example.com/sitemap.xml
```

1. `User-agent` says which crawler the rules apply to. `*` means all of them.
2. `Disallow` blocks paths that start with the given text.
3. `Allow` makes an exception inside a blocked path. Google follows the most specific matching rule.
4. `Sitemap` points to your sitemap. It can appear anywhere in the file.

### What robots.txt cannot do

**It cannot keep a page out of results.** If other pages link to a blocked URL, Google can still index the URL without its content. To keep a page out of results, use a `noindex` rule, which the [indexing lesson]({{ '/learn/indexing/' | relative_url }}) explains.

**It is not security.** The file is public, and well behaved crawlers follow it voluntarily. Anything private needs a login.

**Google ignores `crawl-delay`.** Google adjusts its crawl rate automatically, based on how your server responds.

> **Common mistake.** Blocking a page in robots.txt and adding `noindex` to it. Google cannot crawl the page, so it never sees the noindex. Pick one: noindex (page stays crawlable) to remove it from results, or a robots.txt block to stop crawling.
{: .mistake}

> **Common mistake.** Blocking CSS or JavaScript files. Google needs them to render the page. Blocking them can make a page look broken or empty to Google.
{: .mistake}

## XML sitemaps

A sitemap lists the URLs you want search engines to know about.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/guides/repot-a-plant/</loc>
    <lastmod>2025-03-14</lastmod>
  </url>
</urlset>
```

Rules worth knowing:

1. A single sitemap can hold up to **50,000 URLs** or **50 MB** uncompressed. Larger sites split them and list them in a sitemap index file.
2. List only the **canonical, indexable** URLs that return status 200. Leave out redirects, error pages, noindexed pages and duplicates.
3. Google uses `lastmod` if it is consistently accurate. Update it only when the content meaningfully changes.
4. Google ignores `priority` and `changefreq`.
5. Submit the sitemap in Search Console's Sitemaps report and list it in robots.txt.

Most content systems, such as WordPress, Shopify and this site's own generator, create sitemaps automatically. Your job is to check that the right URLs are in them.

## Crawl budget

**Crawl budget** is the number of URLs Google can and wants to crawl on a site in a given time. Google describes two parts:

1. **Crawl capacity.** This is how much Google can crawl without straining your server. Fast, error free responses raise it. Slow responses, server errors (5xx) and "too many requests" (429) lower it.
2. **Crawl demand.** This is how much Google wants to crawl, based on how popular your URLs are and how often they change.

Google's crawl budget guide says it is mainly for sites with around **a million or more** unique pages that change moderately often, or **ten thousand or more** pages that change daily. If your site is smaller and new pages get crawled within a day or so, crawl budget is not your problem.

### When it is a problem

Large sites waste crawling on URLs that do not need it. The usual causes:

1. **Faceted navigation and filters** that create endless combinations, such as `?color=red&size=9&sort=price`
2. **Infinite spaces** such as calendars with a "next month" link that never ends
3. **Session IDs or tracking parameters** in internal links
4. **Long redirect chains** and **soft error pages**

The usual fixes are to block crawling of filter combinations that have no search value in robots.txt, to link internally only to clean canonical URLs, and to return proper 404 or 410 codes for removed pages.

### Watching crawl activity

Search Console's **Crawl Stats** report, under Settings, shows how many requests Googlebot made, your server's response times, and the response codes it got. A sudden rise in server errors or response time is the first thing to check if crawling slows down.
