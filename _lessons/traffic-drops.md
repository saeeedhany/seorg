---
title: Diagnosing a traffic drop
short: Diagnosing traffic drops
description: When organic traffic falls, the cause is usually one of a few things, from a broken tag to a core update. A calm, ordered investigation finds it faster than guessing.
outcomes:
  - Confirm whether a drop is real or a measurement problem
  - Narrow a drop down to specific pages, queries, devices or countries
  - Choose the right response for technical, manual, algorithmic and seasonal causes
takeaways:
  - First check that the drop is real. Tracking errors and reporting changes are common causes.
  - Find the shape of the drop, sitewide or specific, sudden or gradual, before deciding why it happened.
  - Check Search Console for manual actions, security issues and indexing changes, and compare dates with Google's Search Status Dashboard.
  - After a core update there is no single fix. Improve the content honestly, and expect recovery to take months.
check:
  - q: Clicks dropped 30 percent overnight across every page and query. Impressions are unchanged. What do you suspect?
    a: Something on the results page changed for your queries, such as a new feature or the appearance of AI Overviews, or your titles and snippets changed. A technical problem would usually reduce impressions as well. Check the live results page and recent site changes.
  - q: Analytics shows organic traffic down 50 percent, but Search Console shows clicks steady. Where is the problem?
    a: In measurement. The Analytics tag or consent setup probably broke, or a change in channel grouping moved traffic elsewhere. Search continues to send visitors.
  - q: Rankings fell during a core update. Should you remove all affected pages?
    a: No. First compare your pages with what now ranks and assess them honestly against Google's helpful content questions. Improve, merge or remove only where the content truly falls short.
---

## Step 1: confirm the drop is real

Many "drops" are not search problems at all.

1. **Compare Search Console with Analytics.** If Search Console clicks are steady and only Analytics fell, the tracking broke. A missing tag, a consent banner change or a site migration that dropped the tag are typical.
2. **Check the period you are comparing.** A December drop compared with November may be normal for your business. Compare with the same period last year.
3. **Check for reporting changes.** Search Console occasionally notes data anomalies on its charts.

## Step 2: describe the shape of the drop

In Search Console's Performance report, compare the period after the drop with an equal period before it, then look at each dimension.

1. **Pages.** Is it the whole site, one section, or a handful of pages?
2. **Queries.** Is it all queries, or a theme such as brand terms or one product type?
3. **Devices.** Is it mobile only? That suggests a mobile rendering or usability problem.
4. **Countries.** Is it one country? That suggests hreflang, local competition or a regional event.
5. **Clicks compared with impressions.** If impressions held but clicks fell, the results page or your snippet changed. If both fell, visibility fell.
6. **Sudden or gradual.** A sudden drop suggests a technical change, a manual action or an update. A gradual slide suggests decay or rising competition.

## Step 3: check the usual causes

### Technical problems

1. Check **Page indexing** for a rise in excluded pages.
2. Use **URL Inspection** on affected pages to look for noindex rules, robots.txt blocks, wrong canonicals or rendering errors.
3. Check **Crawl Stats** for server errors or slow responses.
4. Ask what changed on the site around that date: deployments, migrations, CMS updates or plugin changes. A redesign that removed content or internal links is a classic cause.

### Manual actions and security issues

Open **Security & Manual Actions** in Search Console. A manual action or a hacked site warning explains a drop immediately. See the [spam and penalties lesson]({{ '/learn/link-risks/' | relative_url }}) for what to do.

### Google updates

Check the **Google Search Status Dashboard**, which lists confirmed core updates, spam updates and incidents with their dates. If your drop started during a rollout, the update is a likely cause.

### Changes in demand

Use **Google Trends** to check whether interest in your topics fell. Seasonal topics, ended news cycles and changing interests all reduce searches, and no SEO work can fix that.

### Changes in the results

Search your main queries. New competitors, a new featured snippet, AI Overviews, a video block or more ads can all take clicks without your rankings changing.

## Responding to a core update

Core updates change how Google assesses content across the web. They are not penalties, and Google says there is nothing specific to "fix" after one.

1. **Wait for the rollout to end**, usually within two weeks, before drawing conclusions.
2. **Compare your affected pages with the pages that now rank above them.** What do they do better for the searcher?
3. **Assess your content honestly** with Google's helpful content questions, from the [helpful content lesson]({{ '/learn/helpful-content/' | relative_url }}).
4. **Make real improvements** where the content falls short: accuracy, depth, originality and experience. Merge or remove pages that add nothing.
5. **Be patient.** Some changes take effect as pages are recrawled, but large recoveries often take months, sometimes until a later core update.

> **Common mistake.** Making many unrelated changes in a panic in the days after a drop. You cannot tell what helped, you might break something else, and the cause may not even be on your site. Diagnose first.
{: .mistake}
