---
title: What Google rewards, and common myths
short: Ranking signals and myths
description: Google has never published a full list of ranking factors, but it does explain the groups of signals it uses. This lesson covers what is confirmed, what is likely, and which popular ideas are myths.
redirect_from:
  - /chapters/quick-answers/
outcomes:
  - Describe the five groups of factors Google says it uses to rank results
  - Tell confirmed signals apart from guesses and myths
  - Explain what E-E-A-T is and what it is not
takeaways:
  - Google ranks using the meaning of the query, the relevance and quality of content, usability, and the searcher's context.
  - Ranking comes from many systems working together. No single factor decides a result.
  - E-E-A-T describes what quality looks like. It is not a score you can measure or a single ranking factor.
  - Keyword density, word count targets, meta keywords and domain age are not things to optimize for.
check:
  - q: A colleague says the blog must publish 2,000 word articles because "long content ranks better". How do you answer?
    a: Google does not reward word count. Studies that show long pages ranking well are showing correlation, often because thorough pages cover more of what searchers need. Write as long as the topic requires and no longer.
  - q: Is E-E-A-T a ranking factor?
    a: Not directly. It is a framework from the Search Quality Rater Guidelines that describes what quality looks like. Google uses many signals that tend to line up with it, but there is no E-E-A-T score to raise.
  - q: Does Google use data from Google Analytics to rank pages?
    a: No. Google has said repeatedly that Analytics data is not used for ranking. Separately, Google has confirmed in court testimony that some systems use aggregated search interaction data, such as clicks on results.
practice:
  title: Fact check three pieces of SEO advice
  time: 20 minutes
  tools: A browser, Google Search Central documentation
  steps:
  - Collect three pieces of SEO advice from blogs, videos or social media. For example "posts need 2,000 words" or "use your keyword 3 times".
  - For each one, search Google's documentation at developers.google.com/search for what Google says about it.
  - Label each piece of advice as confirmed, myth, or not addressed by Google.
  - For anything not addressed, write down what evidence would change your mind.
  done: Every piece of advice has a label and a link to the source you based it on.
---

## What Google says it looks at

Google's "How Search works" pages group the factors it uses into five areas.

1. **Meaning of the query.** Google works out what the searcher is asking, including spelling mistakes, synonyms, and whether they want fresh information. Language models such as BERT help with this.
2. **Relevance of the content.** Does the page contain information that matches the query? The words on the page are a basic signal, along with headings and the text of links pointing to the page. Google also looks beyond exact keywords to see whether the page actually covers the topic.
3. **Quality of the content.** Google tries to show the most helpful and reliable sources. Signals include whether other prominent sites link to or cite the content, and whether it shows expertise, experience, authoritativeness and trustworthiness.
4. **Usability.** When pages are otherwise similar, the one that works better for people, for example on mobile or in loading speed, may do better.
5. **Context and settings.** Location, language, search history and settings shape results. Someone searching "football" in Cairo and in Chicago means different things.

## Ranking systems

Google does not use one algorithm. It uses many **ranking systems**, and publishes a guide naming several of them. Some examples:

1. **Core ranking systems.** Since March 2024 these include what used to be the separate "helpful content" system.
2. **Link analysis systems and PageRank.** These read links to understand what pages are about and which may be most helpful.
3. **Spam detection systems.** One example is SpamBrain, which finds and neutralizes spam, including link spam.
4. **Reviews system.** It rewards in depth, first hand reviews over thin summaries.
5. **Freshness systems.** They favor recent content for queries where recency matters, such as news.
6. **Passage ranking.** It can rank a page because one section answers a query well.
7. **Deduplication systems.** They avoid showing many near identical results.

Google also confirmed, in testimony during the 2023 United States antitrust trial, that a system called Navboost uses aggregated data about how searchers interact with results. This does not mean Google reads your analytics. It means pages that searchers find satisfying tend to keep their place.

## E-E-A-T explained correctly

E-E-A-T stands for **Experience, Expertise, Authoritativeness and Trust**. It comes from the Search Quality Rater Guidelines, the handbook for people who evaluate search results so Google can test changes to its systems.

1. **Experience.** The creator has first hand experience of the topic, such as having used the product or visited the place.
2. **Expertise.** The creator has the knowledge or skill the topic needs.
3. **Authoritativeness.** The creator or site is a known, go to source on the topic.
4. **Trust.** The page is accurate, honest, safe and reliable. The guidelines call trust the most important part. The other three support it.

Google holds **YMYL** topics ("Your Money or Your Life": health, finance, safety, legal and civic matters) to a higher standard, because poor information there can cause real harm.

> **What E-E-A-T is not.** It is not a single ranking factor and there is no E-E-A-T score. Adding an author bio does not "add E-E-A-T". What matters is whether the content really is written by someone who knows the subject, and whether that shows. The [helpful content lesson]({{ '/learn/helpful-content/' | relative_url }}) covers how.
{: .note}

## Common myths

These ideas are widespread. None of them hold up against what Google has said or what is known.

**Keyword density.** There is no ideal percentage of keywords. Repeating a phrase unnaturally is called keyword stuffing and breaks Google's spam policies.

**Word count targets.** Google does not count words as a ranking factor. Thorough pages often rank because they answer the question fully, not because they are long.

**The meta keywords tag.** Google has ignored it for well over a decade.

**Domain age.** Google has said the age of a domain is not a ranking factor. Older sites often rank well because they have built up content and links over time.

**A duplicate content penalty.** Ordinary duplication, such as the same product in two categories, does not cause a penalty. Google picks one version to show. Only copying content deceptively at scale is a spam problem.

**Social media signals.** Likes and shares are not direct ranking factors. Social media can help people discover content that later earns links.

**Third party authority scores.** Domain Authority and Domain Rating are made by SEO tool companies. Google does not use them.

**Publishing every day.** Frequency alone does not improve rankings. Quality and usefulness do.

**"Google penalizes AI content."** Google's guidance says it rewards helpful content however it is made. Using automation to mass produce pages mainly to manipulate rankings breaks the scaled content abuse policy, whether a human or a machine wrote them.

**LSI keywords.** Latent semantic indexing is an old information retrieval technique that Google does not use. Covering a topic thoroughly in natural language is what matters.

> **Common mistake.** Copying whatever the top ranking pages have in common. Correlation studies cannot tell you what causes rankings. Use them for ideas, then judge each idea against what helps the searcher.
{: .mistake}
