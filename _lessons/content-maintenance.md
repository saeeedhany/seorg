---
title: Updating, merging and removing content
short: Content maintenance
description: Published pages slowly go out of date and lose ground to newer competitors. Maintaining a site often brings more traffic, faster, than publishing new pages.
outcomes:
  - Build a simple content inventory from Search Console data
  - Decide for each page whether to keep, update, merge or remove it
  - Refresh a page in a way that actually improves it
takeaways:
  - Review your content regularly. Pages that rank in positions 5 to 20 are often the quickest to improve.
  - A real update adds accuracy, depth or usefulness. Changing only the date is not an update.
  - Merge pages that compete for the same intent into one stronger page, and redirect the others to it.
  - Remove or noindex pages that have no value to anyone. Unhelpful content can weigh on how Google sees the whole site.
check:
  - q: Two articles, "SEO tips for beginners" and "SEO basics for new sites", each rank around position 15 and cover mostly the same ground. What do you do?
    a: Merge them into one better article at the stronger URL, keeping the best parts of both. Then 301 redirect the other URL to it and update internal links.
  - q: An old article about a product you discontinued gets no traffic and no links. What are your options?
    a: If there is a relevant replacement, redirect the URL to it. If not, return 404 or 410. Keep it only if it still helps someone, for example existing owners of the product.
---

## Why content decays

Rankings for a page tend to drift down over time. The usual reasons:

1. **The information is out of date.** Prices change, tools change, and advice gets better.
2. **Competitors published something better.**
3. **The intent changed.** Searchers now want a different format or angle.
4. **The results page changed.** New search features or AI Overviews take attention.

## Build an inventory

You need a list of your pages with their performance. A spreadsheet is enough.

1. In Search Console, open **Performance**, set the date range to the last 12 months, and export the **Pages** tab.
2. Add a column for each page's main topic and intent.
3. Add sessions and key events from Google Analytics if you track them.
4. Add the date each page was last meaningfully updated.

Then sort and look for patterns:

1. **High impressions with low clicks.** The page is seen but not chosen. Improve the title and description, or check whether it matches the intent.
2. **Average position between 5 and 20.** The page is close. It is often worth a substantial update.
3. **Falling clicks compared with last year.** The page is decaying. Find out why.
4. **No impressions at all.** The page may not be indexed, or may not serve any search. Decide whether it should exist.

## The four decisions

For each page that needs attention, choose one action.

**Keep.** The page performs and is accurate. Leave it alone.

**Update.** The topic is right but the page has fallen behind. Improve it.

**Merge.** Several pages serve the same intent. Combine the best of them into one page and 301 redirect the others to it.

**Remove.** The page has no value for readers and cannot reasonably be fixed. Redirect it if a close equivalent exists. Otherwise return 404 or 410, or use noindex if visitors still need it.

Google has said that removing unhelpful content can help the rest of a site, because its systems look at content across a site as well as page by page.

## How to update well

1. **Search the main query again** and study what ranks now. Note what has changed since you wrote the page.
2. **Fix anything inaccurate or outdated**, including screenshots, prices, steps and links.
3. **Add what is missing**: new questions, better examples, your own data or experience.
4. **Cut what no longer helps.** Shorter can be better.
5. **Improve the title and description** if the page was seen but not clicked.
6. **Add internal links** to the page from newer related content.
7. **Update the visible date** to show it was revised, along with `dateModified` in structured data and `lastmod` in the sitemap.

> **Common mistake.** Changing the date on a page without changing the content. Google lists this as a sign of search engine first content, and readers notice when "updated this month" advice is years old.
{: .mistake}

## How often

There is no fixed schedule. A practical rhythm:

1. **Each quarter**, look at the inventory for big drops and near misses.
2. **Each year**, review every page that brings meaningful traffic.
3. **Straight away**, update pages on topics that change fast, such as pricing, laws and software features.
