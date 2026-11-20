---
title: Spam policies, penalties and disavow
short: Spam, penalties and disavow
description: Google's spam policies define what can get a site demoted or removed. This lesson explains the policies that most often catch people out, how manual actions work, and why most sites never need to disavow links.
outcomes:
  - Recognize link schemes and other practices that break Google's spam policies
  - Find and respond to a manual action
  - Decide whether disavowing links is necessary, which is rarely
takeaways:
  - Buying or selling links that pass ranking credit, large scale link exchanges and private blog networks are link spam.
  - Google's systems ignore most spammy links automatically. Random bad links pointing at you are usually not a threat.
  - A manual action is a penalty applied by a person at Google. It appears in Search Console, and you fix it with a reconsideration request.
  - Disavow only when you have a manual action for links, or you know of many artificial links that you or someone working for you created.
check:
  - q: Your site has hundreds of strange links from spam sites you have never heard of, and no manual action. Should you disavow them?
    a: Usually not. Google's systems ignore most links like these. Disavowing is meant for links you or someone working for you built, or for responding to a manual action.
  - q: A large magazine hosts thousands of coupon pages written by a third party, with little oversight, to rank on its domain's reputation. Which policy is that?
    a: Site reputation abuse. Google's policy covers third party content published mainly to exploit a host site's ranking signals, regardless of any arrangement between them.
practice:
  title: Classify link offers and check for penalties
  time: 15 minutes
  tools: Search Console, Google's spam policies
  steps:
  - In Search Console, open **Security & Manual Actions**, then **Manual actions**. Note whether any action is listed.
  - 'Classify these offers as allowed or link spam: "50 high authority backlinks for $99", "a sponsored article with a nofollow link", "a guest post for our readers, no link required", "swap links with 200 partner sites".'
  - Look at your top linking sites for obvious patterns of paid or network links.
  - Using the two conditions in this lesson, decide whether your site needs a disavow file. For most sites the answer is no.
  done: You have a written yes or no on disavowing, with the reason, and all four offers classified.
  alt: Do step 2 only, then read Google's spam policies page and find the rule that covers each offer.
---

## Link spam

Google's spam policies describe **link spam** as links intended to manipulate rankings. The common forms:

1. **Buying or selling links** that pass ranking credit, whether with money, goods, services or free products in exchange for a link
2. **Excessive link exchanges**, as in "link to me and I'll link to you" at scale
3. **Private blog networks (PBNs)**, which are sites created or bought mainly to link to other sites
4. **Large scale guest posting or article campaigns** with keyword rich anchor links
5. **Automated programs** that create links
6. **Requiring a followed link** as part of terms of service or a contract

Paid placements are fine when the link carries `rel="sponsored"` or `rel="nofollow"`.

## Other spam policies

The same policy document covers practices beyond links. The ones most likely to matter:

1. **Cloaking** means showing search engines different content from what users see.
2. **Doorway pages** are many near identical pages, such as one per city, that funnel visitors to one destination.
3. **Hidden text and links**, and **keyword stuffing**.
4. **Scaled content abuse** means producing many pages mainly to manipulate rankings, with little value for readers, by any method including AI.
5. **Site reputation abuse** means publishing third party pages on a respected site mainly to exploit its ranking signals.
6. **Expired domain abuse** means buying an expired domain and using its reputation to rank unrelated low value content.
7. **Sneaky redirects** send users somewhere different from what search engines saw.

## How Google enforces them

**Automated systems.** SpamBrain and other systems find spam and neutralize it. For links, this mostly means the spammy links are ignored. They pass no value, so they cause no harm. Spam updates improve these systems from time to time.

**Manual actions.** These are penalties applied by Google reviewers when a site breaks the policies. They can affect individual pages or a whole site, and can lower rankings or remove pages from results.

## Finding and fixing a manual action

Manual actions appear in Search Console under **Security & Manual Actions, then Manual actions**. Google also sends a message. Each action names the problem, such as "Unnatural links to your site" or "Thin content with little or no added value".

To fix one:

1. **Read the description and examples** carefully.
2. **Fix the problem completely**, across the whole site, not only the examples.
3. **Document what you did**: which pages changed, which links you removed, and who you contacted.
4. **Submit a reconsideration request** from the Manual actions report. Explain the problem, the fix, and how you will prevent it from happening again.
5. **Wait for a reply.** This can take days or weeks.

Even after an action is lifted, rankings may not return to their old level if they depended on what was removed.

## The disavow tool

The disavow tool lets you ask Google to ignore specific links to your site. Google's own guidance is clear: **most sites do not need it**, because its systems already ignore spammy links.

Use it only when:

1. You have a manual action for unnatural links and cannot get the links removed, or
2. You know there are many paid or artificial links to your site, built by you or someone working for you, that could lead to one.

The file is plain text, with one domain or URL per line:

```text
domain:spammy-links.example
https://another.example/page-with-paid-link.html
```

> **Common mistake.** Disavowing every link that a tool flags as "toxic". Toxicity scores are tool estimates, not Google's view. Disavowing good links by mistake can remove value you earned. When in doubt, leave the links alone.
{: .mistake}

## Negative SEO

Negative SEO means competitors pointing spam links at your site to hurt it. Google says its systems are designed to ignore such links, and that this rarely works. Monitor your links if you are worried, but do not panic over spam you did not create.
