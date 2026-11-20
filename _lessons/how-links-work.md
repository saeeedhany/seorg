---
title: How links work
short: How links work
description: Links from other sites help Google discover your pages and judge which ones the web finds useful. Not all links count the same, and the third party scores tools show are only estimates.
redirect_from:
  - /chapters/link-building/
outcomes:
  - Explain the idea behind PageRank and why links still matter
  - Judge whether a link is likely to be valuable
  - Use the nofollow, sponsored and ugc attributes correctly
takeaways:
  - Google still uses links as a signal of importance and to understand what pages are about, through systems including PageRank.
  - A relevant, editorial link from a respected page is worth more than many links from unrelated or low quality sites.
  - Mark paid and sponsored links with rel="sponsored", and user generated links with rel="ugc".
  - Domain Rating and Domain Authority are tool company estimates. Google does not use them.
check:
  - q: You sponsor a local football club, and its website links to yours. What attribute should the link have?
    a: rel="sponsored", because the link exists as part of a paid relationship. The sponsorship is perfectly fine, but the link should not pass ranking credit.
  - q: Which is likely more valuable to a gardening blog, a link from a national news site's article about urban gardening or ten links from unrelated directory sites?
    a: The news article link. It is editorial, relevant, and from a respected page that real people read. Directory links from unrelated sites carry little or no value.
---

## Why links matter

When Google started, its key idea was **PageRank**: a link from one page to another is a kind of vote, and votes from important pages count more. The system has changed a great deal since then, but Google's own list of ranking systems still includes link analysis and PageRank.

Links do three jobs:

1. **Discovery.** Google finds new pages by following links.
2. **Importance.** Links from respected pages suggest a page is worth showing.
3. **Understanding.** The text of a link and the words around it describe the target page.

Links are one signal among many. Strong links will not rescue content that does not match the searcher's intent, and many pages rank well with few links when they are the best answer. In competitive areas, though, links often decide between pages of similar quality.

## What makes a link valuable

There is no exact formula, but these qualities consistently matter:

1. **Relevance.** A link from a page on the same or a related topic means more than one from an unrelated site.
2. **Editorial choice.** The link was given because someone chose to reference you, not because you paid or swapped for it.
3. **Authority of the linking page.** Respected sites with real readers pass more value. This is about the page as well as the site.
4. **Placement.** A link in the main content, in context, means more than one in a footer or a sitewide list of links.
5. **Anchor text.** The clickable words describe your page. Natural variety, such as your brand name, the page title or a description, is normal. A profile full of exact match keyword anchors looks manipulated.

## Link attributes

You can tell Google about the nature of a link with the `rel` attribute.

```html
<a href="https://example.com/" rel="sponsored">Our sponsor</a>
<a href="https://example.com/" rel="ugc">A commenter's site</a>
<a href="https://example.com/" rel="nofollow">A site we don't vouch for</a>
```

1. **`sponsored`** is for paid links, advertising and sponsorships.
2. **`ugc`** is for links in user generated content such as comments and forum posts.
3. **`nofollow`** is for any other link you do not want to vouch for.

Google treats all three as **hints**. It may still use them to discover pages, but they are not meant to pass ranking credit. Links you have paid for, in money or in goods, must carry `sponsored` or `nofollow`. Otherwise they break Google's link spam policy.

## Internal links are links too

Everything above applies to links within your own site. You control them completely, which makes them the easiest links to improve. The [site structure lesson]({{ '/learn/site-structure/' | relative_url }}) covers them in detail.

## Third party link metrics

SEO tools estimate the strength of sites and pages from their own crawls of the web:

1. **Domain Rating (DR)** and **URL Rating (UR)** from Ahrefs
2. **Domain Authority (DA)** and **Page Authority (PA)** from Moz
3. **Authority Score** from Semrush

These are useful for comparing sites and spotting opportunities. They are **not used by Google**, they differ between tools, and they can be inflated with spam. A link from a relevant site with low DR can be worth more than one from an unrelated site with high DR.

> **Common mistake.** Setting a goal such as "raise our DA to 50". It measures a tool's model, not your visibility in Google. Track rankings, traffic and links from relevant, respected sites instead.
{: .mistake}
