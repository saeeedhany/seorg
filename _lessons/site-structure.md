---
title: Site structure, URLs and internal links
short: Site structure and internal links
description: How pages connect to each other tells Google which pages matter and what they are about. Good structure also helps visitors, which is the real point.
outcomes:
  - Plan a site structure that keeps important pages close to the home page
  - Write internal links and anchor text that help both visitors and Google
  - Design clean, readable URLs
takeaways:
  - Internal links are how Google discovers pages and judges their importance within your site.
  - Use real `<a href>` links with descriptive anchor text. Google does not follow links that only work through JavaScript click handlers.
  - Group related pages under a hub page and link between them.
  - Keep URLs short, readable and stable. Changing them later costs you redirects and time.
check:
  - q: An important guide sits five clicks from the home page and has one internal link. What would you change?
    a: Link to it from relevant, well visited pages such as the hub page for its topic, related articles, and possibly the navigation. Use anchor text that describes what the guide covers.
  - q: Which anchor text is better, "click here" or "how to repot a snake plant"?
    a: The descriptive one. It tells visitors and Google what the linked page is about. "Click here" says nothing about the destination.
---

## Why structure matters

Google discovers most pages by following links. It also uses internal links to judge what a page is about and how important it is. A page linked from the home page and from many related articles looks more important than one buried with a single link.

Visitors need the same thing: a clear path from general to specific.

## A simple structure that works

Most sites work well with a shallow hierarchy:

```text
Home
├── Topic hub: Indoor plants
│   ├── How to repot a snake plant
│   ├── Best soil for succulents
│   └── Why are my plant's leaves yellow
└── Topic hub: Garden tools
    ├── Choosing pruning shears
    └── How to sharpen a spade
```

1. **The home page** links to the main topics.
2. **Hub pages** introduce a topic and link to every detailed page in it. They are useful pages in their own right, not just lists of links.
3. **Detail pages** link back to their hub and across to closely related pages.

This is often called a **topic cluster**. It keeps important pages within a few clicks of the home page, and it makes the subject of each section obvious.

## Internal links that count

Google follows standard HTML links with an `href` attribute:

```html
<a href="/plants/repot-snake-plant/">how to repot a snake plant</a>
```

It does not reliably follow links built only with JavaScript, such as a `<span>` with a click handler, or a button that changes the page without a real URL.

**Anchor text** is the clickable text of a link. Google uses it to understand the target page. Make it describe the destination in natural words. Do not force the exact same keyword phrase into every link. Variety reads better and looks natural.

### Where to add links

1. **In the body text**, where a related idea comes up. These are the most useful links for readers.
2. **Hub pages** linking to every page in their topic.
3. **Related content** blocks at the end of articles.
4. **Navigation and footer**, for the few most important sections.

> **Common mistake.** Publishing a new article and never linking to it from older pages. Each time you publish, add links to the new page from two or three existing, relevant pages.
{: .mistake}

## Breadcrumbs

Breadcrumbs show where a page sits in the hierarchy, for example *Home, Indoor plants, How to repot a snake plant*. They help visitors move up a level and add internal links to hub pages. Google can show breadcrumb paths in results on desktop when you mark them up with structured data.

## Pagination

For long lists split across pages (page 1, 2, 3):

1. Give each page its own URL, such as `?page=2`.
2. Link pages to each other with normal links (next, previous and page numbers).
3. Give each page a canonical that points to itself, not to page 1.

Google no longer uses `rel="next"` and `rel="prev"` as indexing signals, so normal links are what matter.

## URLs

Good URLs are readable by people.

```text
Good:  https://example.com/plants/repot-snake-plant/
Weak:  https://example.com/index.php?id=4821&cat=7
```

1. Use words that describe the content. Separate words with hyphens rather than underscores, as Google recommends.
2. Keep them short and lowercase.
3. Avoid dates in the URL for content you plan to update over the years.
4. Pick a structure and keep it. Every URL change needs a redirect.

URL words carry very little ranking weight. Clarity for people is the main reason to get them right.
