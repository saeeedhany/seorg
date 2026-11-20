---
title: Titles, descriptions, headings and images
short: On page elements
description: On page elements tell searchers and Google what a page is about before they read it. They take minutes to get right, and they shape how your result looks in search.
outcomes:
  - Write title elements and meta descriptions that earn clicks without being rewritten
  - Structure a page with headings that help readers scan
  - Optimize images with useful alt text, file names and sizes
takeaways:
  - The title element is the strongest on page hint about a page's topic, and it usually becomes the title link in results. Make it unique, specific and honest.
  - Meta descriptions do not affect rankings, but a good one can improve clicks. Google often writes its own snippet anyway.
  - Use headings to show the structure of the page. Google does not require exactly one H1.
  - Alt text describes an image for people who cannot see it. Write it for them, not as a place for keywords.
check:
  - q: Google shows "Trail Running Shoes | TrailBrand" instead of your title "Best Trail Running Shoes 2025 Women Men Waterproof Cheap Sale". Why?
    a: Google rewrites title links that are stuffed with keywords, too long, or a poor description of the page. Write a clear, concise title that describes the page, and Google is more likely to use it.
  - q: What is good alt text for a photo of a person repotting a snake plant into a terracotta pot?
    a: Something like "Hands lifting a snake plant out of its plastic nursery pot into a larger terracotta pot". It describes what the image shows in the context of the page, without stuffing in keywords.
practice:
  title: Rewrite three titles and descriptions
  time: 30 minutes
  tools: 'Search Console, a browser and the [search snippet preview](/tools/snippet-preview/)'
  steps:
  - In Search Console, open **Performance**, then **Pages**, and show CTR. Find three pages with many impressions and a low CTR for their position.
  - Search each page's main query and look at how Google shows your title and snippet. Note any rewrite.
  - Rewrite the title and meta description for each page using the guidance in this lesson.
  - Check each page's headings and confirm that the H1 states the topic and the H2s outline the sections.
  done: Three new titles and descriptions are published. Note the date, so you can compare CTR after four weeks.
  alt: Rewrite the titles and descriptions of three pages on any small business site, then compare yours with the originals.
---

## The title element

The `<title>` element in the page head is the most important on page element. Google usually uses it as the **title link** in results, and it is a strong hint about what the page covers.

```html
<title>How to Repot a Snake Plant (Step by Step) | Leaf & Root</title>
```

What makes a good title:

1. **Describe the page accurately and specifically.** "How to repot a snake plant" beats "Plant care tips".
2. **Put the main topic early.** Long titles are cut off in results, so the start carries the most weight with readers.
3. **Make it unique** across your site. Duplicate titles make pages hard to tell apart.
4. **Add your brand name** where helpful, usually at the end.
5. **Do not stuff keywords.** Repeated or listed keywords make Google more likely to rewrite the title.

Google does not set a character limit. Results cut titles off based on width, which is often around 50 to 60 characters on desktop. A slightly longer title is not penalized, but the end may not be visible.

### Why Google rewrites titles

Google uses your title in most cases, but it replaces it when the title is missing, very long, stuffed with keywords, the same across many pages, or a poor match for the content. It then builds a title link from your headings, anchor text pointing to the page, or other prominent text. The fix is to write a better title, not to fight the rewrite.

## Meta descriptions

```html
<meta name="description" content="Repot a snake plant in six steps: when to do it, which pot and soil to use, and how to avoid root rot afterwards.">
```

Meta descriptions **are not a ranking factor**. Google may show them as the snippet, but it often writes its own snippet from page text that better matches the query.

They are still worth writing for important pages:

1. **Summarize what the page offers** and why it is worth clicking.
2. **Make each one unique.** If you cannot write good unique descriptions for thousands of similar pages, it is better to leave them out and let Google generate snippets.
3. **Include specifics** such as prices, steps, dates or key facts.

## Headings

Headings (`<h1>` to `<h6>`) show the structure of a page. They help readers scan and help Google understand the sections.

1. **One main heading** (usually the H1) should state the topic of the page. Google has said that more than one H1 does no harm, but one clear H1 is the most readable pattern.
2. **Use H2 for the main sections** and H3 for subsections inside them. Do not skip levels for styling. Use CSS for appearance.
3. **Write headings people can scan.** A reader skimming only the headings should understand what the page covers.

## The body

1. **Answer the main question early.** Then add depth. Readers who only need the answer get it, and others keep reading.
2. **Cover the subtopics searchers expect**, which you found when you studied the [results page]({{ '/learn/search-intent/' | relative_url }}).
3. **Use examples, steps, tables and images** where they make things clearer.
4. **Link to sources** for facts, and to your own related pages where they help.
5. **Write in natural language.** Use the words your readers use. There is no keyword density to hit.

## Images

1. **Alt text** describes the image for people using screen readers and for when the image fails to load. Google also uses it to understand images. Describe what the image shows in context. Decorative images can have an empty `alt=""`.
2. **Descriptive file names**, such as `repot-snake-plant-terracotta.jpg`, are better than `IMG_4821.jpg`.
3. **Compress and size images** to the size they are displayed at, and prefer WebP or AVIF.
4. **Set width and height** to prevent layout shift.
5. **Lazy load images below the first screen** with `loading="lazy"`, but not the main image at the top.
6. **Put images near related text**, because the surrounding text helps Google understand them.

## Things that do not matter

1. **The meta keywords tag** is ignored by Google.
2. **Exact keyword placement rules**, such as "the keyword in the first 100 words", are folklore. Write naturally and make the topic clear.
3. **Bold keywords** do nothing for rankings. Use bold for emphasis that helps readers.
