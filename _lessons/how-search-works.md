---
title: How Google finds, stores and ranks pages
short: How Google Search works
description: Google works in three stages, crawling, indexing and serving results. Knowing which stage a problem sits in is the first step in fixing it.
redirect_from:
  - /overview/
outcomes:
  - Describe what happens during crawling, rendering, indexing and serving
  - Explain why a page can be crawled but still not appear in results
  - Use the URL Inspection tool to find out which stage a page has reached
takeaways:
  - Google discovers pages mainly by following links and reading sitemaps. A page with no links pointing to it is hard to find.
  - Crawling is not indexing. Google crawls many pages it decides not to store.
  - Google renders pages in a recent version of Chrome, so content added by JavaScript can be indexed, but it adds a step that can fail.
  - When several URLs show the same content, Google picks one canonical URL to show in results.
  - Ranking happens at the moment of the search and depends on the query, the searcher's location, language and device.
check:
  - q: A new page has been live for two weeks. URL Inspection says "URL is unknown to Google". Which stage failed, and what would you check?
    a: Discovery, before crawling. Check that other pages on the site link to it with a normal link, and that it is listed in the XML sitemap submitted in Search Console. You can also request indexing in URL Inspection.
  - q: URL Inspection says "Crawled, currently not indexed". Is this a technical error?
    a: Usually not. It means Google fetched the page but decided not to store it, often because it judged the page low value or too similar to other pages. Improve the page or merge it with a stronger one. Indexing is never guaranteed.
  - q: Why might two people searching the same words see different results?
    a: Results are assembled at query time and depend on context such as location, language, device and search settings. A search for "plumber" in Cairo and in London returns different businesses.
---

## The three stages

Google describes its search engine as working in three stages. Every page that appears in results has passed through all of them.

1. **Crawling.** Google finds pages and downloads them.
2. **Indexing.** Google works out what each page is about and decides whether to store it.
3. **Serving.** When someone searches, Google picks the most useful pages from its index and orders them.

When a page is missing from results, the first question is always which stage it failed at.

## Crawling

Google's crawler is called **Googlebot**. It starts from pages it already knows and follows links to find new ones. It also reads **XML sitemaps**, which are files that list the URLs on a site.

Googlebot does not crawl everything it finds, or all at once. It slows down if your server responds slowly or returns errors, so it does not overload your site. It also skips URLs you block in your robots.txt file.

You will study crawling in detail in the [crawling lesson]({{ '/learn/crawling/' | relative_url }}).

## Rendering

Many pages build their content with JavaScript. After downloading a page, Google runs it in a recent version of Chrome to see the final content, much like a browser does for a visitor. This step is called **rendering**.

Rendering means Google can index content that JavaScript adds. It is also an extra step that can fail, for example if scripts are blocked or throw errors. The [JavaScript lesson]({{ '/learn/javascript-seo/' | relative_url }}) covers how to avoid that.

## Indexing

Next, Google analyzes the page: its text, title, headings, images, links and structured data. It also checks whether the page is a duplicate of another page.

When several URLs show the same or very similar content, Google groups them and picks one as the **canonical** URL. That is the version it shows in results. You can tell Google which one you prefer, and the [indexing lesson]({{ '/learn/indexing/' | relative_url }}) explains how.

Google then decides whether to store the page in its **index**, a very large database of web pages. Not every crawled page is stored. Pages that are thin, duplicated, blocked by a noindex rule, or judged low value are often left out.

> **Example.** A shop has 4,000 product pages and 30,000 filtered listing URLs such as `?color=red&size=9`. Google may crawl many of the filtered URLs and index very few of them, because they repeat products already indexed elsewhere. That is normal and usually intended.
{: .example}

## Serving and ranking

When someone searches, Google looks up matching pages in its index and orders them. This happens at the moment of the search, in a fraction of a second, so results change with context: the searcher's location, language, device and the exact words they used.

Ranking uses many signals working together. Google groups them into the meaning of the query, the relevance of the content, its quality, its usability and the searcher's context. The [ranking lesson]({{ '/learn/ranking-signals/' | relative_url }}) explains each one.

Google does not accept payment to crawl a site more often or to rank it higher. Ads are a separate system.

## Finding out which stage a page reached

Google Search Console is a free tool from Google that reports how Google sees your site. Its **URL Inspection** tool tells you, for any URL on a site you have verified:

1. Whether Google knows about the URL and when it last crawled it
2. Whether the page is indexed, and if not, why
3. Which URL Google picked as the canonical
4. How the rendered page looks to Google, through the "Test live URL" option

> **Common mistake.** Seeing a page in a `site:example.com` search and concluding everything is fine. The `site:` operator shows a sample, not a complete or exact list. Use URL Inspection and the Page indexing report for real answers.
{: .mistake}
