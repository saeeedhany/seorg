---
title: Multiple languages and countries
short: Languages and countries
description: If your site serves people in different languages or countries, Google needs to know which version to show to whom. This lesson covers URL structures and hreflang.
outcomes:
  - Choose a URL structure for a multilingual or multi country site
  - Write correct hreflang annotations, including x-default
  - Avoid the common mistakes that send people to the wrong version
takeaways:
  - Give each language or country version its own URL. Avoid showing different languages at the same URL based on cookies or location.
  - hreflang tells Google which URL to show for each language and region. Every version must list all the others and itself.
  - Google ignores the HTML lang attribute and geo meta tags for targeting. It uses hreflang, the visible language and other signals.
  - Do not force redirects based on IP address. Let people choose, and let Googlebot reach every version.
check:
  - q: Your English page lists the Arabic version in hreflang, but the Arabic page has no hreflang tags. What happens?
    a: Google may ignore the annotation, because hreflang must be confirmed in both directions. Each page must reference every alternate and itself.
  - q: Which hreflang value targets Spanish speakers in Mexico, and what does x-default mean?
    a: es-MX, which is the language code followed by the region code. x-default marks the page to show when no other version matches the searcher, often a language selector or the main international page.
practice:
  title: Check hreflang on one page
  time: 20 minutes
  tools: A browser
  steps:
  - Open the page source and list every `hreflang` annotation, with its language code and URL.
  - Open each alternate URL and check that it returns 200, is in the right language, and lists the same set of annotations, including itself.
  - Check that an `x-default` is present and points to a sensible fallback page.
  - Use the language selector on the page and check that it links to the equivalent page, not just the home page.
  done: Every annotation is reciprocal, points to a live canonical URL, and uses a valid code.
  alt: Do this on a large international brand's site that offers several languages or countries.
---

## When this applies

This lesson matters if you have the same content in more than one language, such as English and Arabic, or versions for different countries in the same language, such as US and UK English with different prices. If your site has one language and one market, you can skip it.

## URL structure

Each version needs its own URL. The common options:

1. **Country domains**, such as `example.de` and `example.fr`. These give a strong country signal but are costly to run, and authority is split across domains.
2. **Subdirectories**, such as `example.com/de/` and `example.com/fr/`. These are easy to run and keep everything on one domain. This is the usual choice.
3. **Subdomains**, such as `de.example.com`. These work, but they are usually more effort than subdirectories.

Avoid URL parameters such as `?lang=de` for this, and never show different languages at the same URL based on cookies or browser settings. Google usually crawls from the United States without cookies, so it would only ever see one version.

## hreflang

hreflang annotations tell Google which version of a page to show for each language and, optionally, each region.

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/pricing/">
<link rel="alternate" hreflang="ar" href="https://example.com/ar/pricing/">
<link rel="alternate" hreflang="en-GB" href="https://example.com/uk/pricing/">
<link rel="alternate" hreflang="x-default" href="https://example.com/pricing/">
```

The rules:

1. **Language codes** use ISO 639-1, such as `en`, `ar`, `de`. **Region codes** are optional and use ISO 3166-1 alpha-2, such as `GB`, `EG`, `MX`. The format is language first, so the code for Britain is `en-GB`, never `uk`.
2. **Every version lists every version, including itself.** If page A points to B, B must point back to A.
3. **x-default** is the fallback for searchers who match no listed version.
4. **Use full, canonical URLs.** Never point hreflang at a redirect or a noindexed page.

You can place hreflang in the HTML head, in HTTP headers (for PDFs), or in the XML sitemap. Use one method consistently. Sitemaps are easiest for large sites.

## Other signals

1. Google detects language from the **visible content**. It ignores the HTML `lang` attribute for this purpose, though you should still set `lang` and `dir="rtl"` for Arabic and other right to left languages, because browsers and screen readers need them.
2. **Translate the whole page**, including navigation, titles and meta descriptions. A page with an Arabic body and English navigation sends mixed signals.
3. **Machine translation** should be reviewed by a fluent person. Unreviewed, low quality translations published at scale can fall under the scaled content abuse policy.

## Redirects and language selectors

Do not automatically redirect visitors based on their IP address or browser language. It traps travelers and people using VPNs, and it can stop Googlebot from reaching some versions. Instead, show a clear banner such as "View this page in Arabic?" and a language selector on every page that links to the equivalent page, not just the home page.
