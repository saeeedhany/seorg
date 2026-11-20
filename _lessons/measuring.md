---
title: Measuring with Search Console and Analytics
short: Measuring SEO
description: Search Console shows how your site performs in Google before anyone clicks. Analytics shows what visitors do after they arrive. Together they tell you whether SEO work is paying off.
outcomes:
  - Set up Search Console and read clicks, impressions, CTR and position correctly
  - Find organic traffic and its outcomes in Google Analytics 4
  - Choose metrics that reflect real progress instead of vanity numbers
takeaways:
  - Verify a Domain property in Search Console to cover every protocol and subdomain.
  - Average position is an average across every impression. Read it by query and page, not as one sitewide number.
  - In Google Analytics 4, look at the Organic Search channel and its key events, not just sessions.
  - Measure what the business cares about. Clicks to important pages and conversions beat tool scores and keyword counts.
check:
  - q: Sitewide average position fell from 12 to 19 last month, but clicks rose. Is that bad news?
    a: Not necessarily. You probably started appearing for many new queries in low positions, which pulls the average down. Check positions for your important queries and pages instead.
  - q: Search Console reports 1,000 clicks and Analytics reports 820 organic sessions for the same week. Which is wrong?
    a: Neither, necessarily. The tools count different things in different ways. Analytics misses visitors who decline cookies or block scripts, and it groups visits into sessions. Compare trends within each tool rather than matching the numbers exactly.
---

## Google Search Console

Search Console is free and comes straight from Google. Set it up first.

**Add a Domain property** by verifying with a DNS record at your domain provider. It covers every version of the site: http and https, www and non www, and all subdomains. A URL prefix property covers only one exact version.

### The Performance report

This report shows how the site appears in Google Search, with four metrics:

1. **Clicks.** These are clicks from Google results to your site.
2. **Impressions.** These count how often a link to your site appeared in results the searcher could see. Results further down the page count once they are loaded on the page, even if the searcher did not scroll to them.
3. **CTR (click through rate).** This is clicks divided by impressions.
4. **Average position.** For each impression, Google records the position of your topmost result, then averages these across all impressions.

You can group the data by **query, page, country, device, search appearance and date**, filter it, and compare two periods. The data goes back 16 months.

> **Reading average position.** A sitewide average mixes thousands of queries. If you start appearing in position 60 for many new queries, the average gets worse even though nothing got worse. Always look at position for specific queries and pages.
{: .note}

### The other reports you will use most

1. **Page indexing** shows which pages are indexed and why others are not. See the [indexing lesson]({{ '/learn/indexing/' | relative_url }}).
2. **URL Inspection** shows the status of a single URL, with a live test.
3. **Sitemaps** shows submitted sitemaps and how many URLs were found.
4. **Core Web Vitals** shows field data for groups of similar pages.
5. **Links** shows top linked pages, top linking sites and internal links.
6. **Manual actions and Security issues** shows problems Google found. Check them whenever traffic drops.

## Google Analytics 4

Analytics measures what visitors do on your site. For SEO:

1. Open **Reports, then Acquisition, then Traffic acquisition**, and look at the **Organic Search** channel.
2. Open the **Landing page** report filtered to organic search, to see which pages bring visitors in from search.
3. Set up **key events** (what Analytics used to call conversions) for the actions that matter, such as purchases, sign ups, leads and contact form submissions. Then you can see what organic visitors actually achieve.

You can also link Search Console to Analytics to see query data alongside visitor behavior.

## Rank tracking

Rank tracking tools check positions for a list of keywords on a schedule. They are useful for watching specific targets and competitors, but keep in mind that results vary by location, device and person. A tracked rank is a snapshot from one setup, not what everyone sees.

## Choosing what to measure

Good SEO metrics are connected to outcomes:

1. **Organic clicks to the pages that matter**, such as product, service and lead pages
2. **Key events from organic search**: sales, leads and sign ups
3. **Impressions and position for target topics**, to see progress before clicks arrive
4. **Indexed share of important pages**
5. **New referring domains from relevant sites**

Metrics to treat with caution:

1. **Third party authority scores**, which are not used by Google
2. **Total keywords ranked** in a tool, which inflates easily with irrelevant low positions
3. **Sitewide average position**, for the reason above
4. **Raw traffic without context**, because traffic that never converts or engages may be the wrong traffic

## Reporting

A useful monthly report fits on one page:

1. What changed in the key metrics, compared with the previous period and the same period last year
2. Why it changed, as far as you can tell
3. What was done this month
4. What is planned next, and why
