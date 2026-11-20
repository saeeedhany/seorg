---
title: "Indexing: status codes, noindex and canonical URLs"
short: Indexing
description: Indexing decides which of your URLs Google stores and which version it shows. Status codes, noindex rules and canonical signals are how you take part in that decision.
outcomes:
  - Choose the right status code for live, moved and removed pages
  - Remove a page from results with noindex, and know when that is the right tool
  - Send consistent canonical signals so Google shows the URL you prefer
takeaways:
  - Use 301 or 308 for permanent moves and 404 or 410 for pages that are gone. A page that says "not found" but returns 200 is a soft 404.
  - noindex removes a page from results only if Google can crawl it and see the rule.
  - rel=canonical is a strong hint, not a command. Redirects, internal links and sitemaps should all point to the same URL.
  - The Page indexing report tells you why pages are not indexed. Many of those reasons are normal.
check:
  - q: An old product is discontinued and there is a close replacement. What should the old URL return?
    a: A 301 redirect to the replacement, because it is the closest equivalent and keeps visitors and link value. If there is no reasonable replacement, return 404 or 410 rather than redirecting everything to the home page.
  - q: Google chose a different canonical than the one you set. What do you check?
    a: Whether your other signals disagree with your canonical tag. Look at internal links, redirects, the sitemap, hreflang, and whether the two pages really are duplicates. Google picks the URL that most signals point to.
  - q: Is "Discovered, currently not indexed" an error?
    a: Not necessarily. It means Google knows the URL but has not crawled it yet. On small sites this usually resolves itself. If it persists on important pages, improve their internal links and check overall site quality and server speed.
---

## Status codes

Every time a crawler requests a URL, the server answers with a three digit HTTP status code. Google treats each one differently.

1. **200 OK.** The page exists. Google can index it.
2. **301 Moved Permanently and 308 Permanent Redirect.** The page has moved for good. Google follows the redirect and moves its signals to the new URL. Use these for permanent changes.
3. **302 Found and 307 Temporary Redirect.** The move is temporary. Google keeps the old URL in mind for longer, though a long lasting 302 is eventually treated like a permanent one.
4. **404 Not Found and 410 Gone.** The page does not exist. Google drops it from the index after recrawling it. Both are fine for removed pages, and 410 is slightly more explicit.
5. **5xx server errors.** Something broke on the server. Google retries, but if errors last, it slows crawling and eventually drops affected URLs.

> **Soft 404.** A page that tells visitors "not found" or shows an empty result, but returns status 200. Google detects many of these and reports them in Search Console. Fix them by returning a real 404, or by adding content if the page should exist.
{: .note}

## Redirecting well

When URLs change, in a redesign, a domain move or a cleanup, redirect each old URL to its **closest equivalent**, one to one.

1. Avoid chains such as A to B to C. Point A straight to C.
2. Do not redirect every removed page to the home page. Google treats that as a soft 404 and visitors get lost.
3. Update internal links to the new URLs instead of relying on redirects.
4. Keep redirects in place for at least a year. Google recommends keeping them as long as possible.

The [checklists]({{ '/checklists/' | relative_url }}) include a full site migration list.

## Keeping pages out of results with noindex

The `noindex` rule tells Google not to show a page in results. There are two ways to set it.

```html
<meta name="robots" content="noindex">
```

```text
X-Robots-Tag: noindex
```

The meta tag goes in the page `<head>`. The HTTP header works for any file type, including PDFs.

Use noindex for pages that should exist for visitors but not appear in search: internal search results, thank you pages, thin tag archives, and staging copies. For staging sites, password protection is safer.

Google must be able to crawl the page to see the rule, so do not also block it in robots.txt.

## Canonical URLs

The same content often lives at several URLs:

```text
https://example.com/shoes/trail-runner
https://example.com/shoes/trail-runner?utm_source=newsletter
https://example.com/sale/trail-runner
http://example.com/shoes/trail-runner
```

Google groups these duplicates and picks one as the **canonical** to show in results. You can tell Google your preference with:

1. **Redirects.** These are a strong signal, used when the other URLs do not need to exist.
2. **The rel=canonical link element.** This is a strong signal, used when the duplicates must stay accessible.
3. **Sitemap inclusion.** This is a weaker signal: list only canonical URLs.
4. **Internal links.** Always link to the canonical version.

```html
<link rel="canonical" href="https://example.com/shoes/trail-runner">
```

Google treats rel=canonical as a hint. If your other signals point elsewhere, or the pages are not actually duplicates, Google may choose differently. Search Console will then report "Duplicate, Google chose different canonical than user".

> **Common mistake.** Pointing the canonical of every paginated page (page 2, 3, 4) to page 1. Those pages list different items, so they are not duplicates. Give each page a self referencing canonical.
{: .mistake}

## Reading the Page indexing report

Search Console's **Page indexing** report lists every URL Google knows on your site, grouped into indexed and not indexed, with a reason for each. The common reasons and what they mean:

1. **Excluded by noindex tag.** This is fine if you meant it. Check that no important page is here.
2. **Page with redirect.** This is normal for old URLs.
3. **Alternate page with proper canonical tag.** This is normal. Google is respecting your canonical.
4. **Duplicate, Google chose different canonical than user.** Check that your signals agree.
5. **Not found (404).** This is fine for removed pages. Fix it if live links point there.
6. **Crawled, currently not indexed.** Google read the page and chose not to store it. Improve it, merge it, or accept it.
7. **Discovered, currently not indexed.** Google knows the URL but has not crawled it yet.

The goal is not zero excluded pages. The goal is that every page you want in results is indexed, and everything excluded is excluded on purpose.

## Removing something urgently

The **Removals** tool in Search Console hides a URL from results for about six months. It is a temporary emergency measure. For permanent removal, the page must also return 404 or 410, carry noindex, or sit behind a login.
