---
title: Structured data
short: Structured data
description: Structured data describes your content in a standard format so Google can understand it precisely and show it as a rich result. It does not raise rankings by itself, and only some types produce visible features.
outcomes:
  - Write valid JSON-LD for a common content type
  - Know which structured data types Google currently supports for rich results
  - Test markup and follow Google's rules so it does not cause a manual action
takeaways:
  - Structured data makes a page eligible for rich results. It does not guarantee them and is not a direct ranking boost.
  - Use JSON-LD, the format Google recommends, and use the Schema.org vocabulary.
  - Markup must describe content that is visible on the page. Misleading markup can lead to a manual action.
  - Google has retired several rich result types, including HowTo and FAQ. Check the Search Gallery before adding a type.
check:
  - q: You added FAQ markup to every product page, but no FAQ results appear. Why?
    a: Google limited FAQ rich results to well known government and health sites in 2023, then removed them from Search entirely in May 2026. The markup is still valid Schema.org, but it no longer produces any feature in Google Search.
  - q: A page has Review markup with a 4.9 rating, but no reviews are shown on the page. Is that allowed?
    a: No. Structured data must describe content that visitors can see. Marking up reviews that do not appear on the page breaks Google's guidelines and can lead to a manual action.
practice:
  title: Test your structured data
  time: 15 minutes
  tools: Rich Results Test, Search Console
  steps:
  - Run two of your main page types through the **Rich Results Test** and list the structured data types it detects.
  - Note every error and warning, and which rich results each page is eligible for.
  - Check that every value in the markup, such as prices, ratings and dates, matches what visitors see on the page.
  - List any markup for retired types, such as FAQ or HowTo, so you can remove it or stop maintaining it.
  done: You have a list of detected types, the errors to fix, and any markup to retire.
  alt: Test a recipe page from a large recipe site and a product page from a large online store. Compare what each one marks up.
---

## What structured data is

Structured data is code that labels the content of a page in a standard way. Instead of Google guessing that "4.7" near some stars is a rating, the page states it outright: this is a product, this is its price, this is its average rating from 213 reviews.

The vocabulary comes from **Schema.org**, a shared project of the major search engines. Google supports a subset of it for features in search.

## What it does and does not do

**It does** make pages eligible for **rich results**, such as review stars, product prices and availability, recipe details, event dates and video thumbnails. It also helps Google understand entities such as your organization and its logo.

**It does not** directly raise rankings. Google has said this many times. Rich results can make a listing more noticeable, which may improve click through rate, but that is a separate effect.

**It does not guarantee** a rich result. Google decides whether to show one based on the query, the page and its quality.

## JSON-LD

Google accepts three formats, and recommends **JSON-LD**: a script block in the page that does not change the visible HTML.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to repot a snake plant",
  "datePublished": "2025-03-14",
  "dateModified": "2025-06-02",
  "author": {
    "@type": "Person",
    "name": "Layla Hassan",
    "url": "https://example.com/authors/layla-hassan/"
  },
  "image": "https://example.com/images/snake-plant.jpg"
}
</script>
```

## Types worth knowing

These types are widely useful and supported for rich results or entity understanding:

1. **Article** for news and blog content
2. **Product** with offers and reviews, for shop product pages
3. **Review snippet** for pages that review a specific item
4. **Recipe, Event, Video, Job posting** for those kinds of content
5. **Local business** for business location details
6. **Organization** for your logo and company details
7. **Breadcrumb** for the page's position in the site hierarchy
8. **Discussion forum and Profile page** for community content

Google's **Search Gallery** at developers.google.com lists every supported type with its required properties. Always check it, because support changes.

### Retired and limited types

1. **HowTo** rich results were removed in 2023.
2. **FAQ** rich results were limited to well known government and health sites in 2023, and removed from Google Search entirely on 7 May 2026.
3. In June 2025 Google phased out seven less used types: Book Actions, Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement and Vehicle Listing.
4. **Practice Problem** results were removed in January 2026.
5. **Dataset** markup is now used only by Google Dataset Search, not by Google Search results.

Old SEO guides that recommend FAQ and HowTo markup "for more space in results" are out of date.

## Rules to follow

1. **Mark up only visible content.** Prices, ratings and answers in the markup must appear on the page.
2. **Be accurate and specific.** Mark up the main item on the page, not unrelated content.
3. **No self serving reviews** for your own business in LocalBusiness or Organization markup. Google does not show review stars for these.
4. **Keep it current.** A price in the markup that differs from the page is a common error.

Breaking these rules can lead to a **structured data manual action**, which removes rich results for the site.

## Testing

1. **Rich Results Test** shows which rich results a page is eligible for, with errors and warnings.
2. **Schema Markup Validator** at validator.schema.org checks general Schema.org validity, including types Google does not use.
3. Search Console's enhancement reports, such as Products, Breadcrumbs and Videos, show errors across the whole site after Google crawls it.
