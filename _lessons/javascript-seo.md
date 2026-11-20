---
title: JavaScript and rendering
short: JavaScript and rendering
description: Google can run JavaScript, but sites that depend on it for content, links or metadata add a step where things can quietly go wrong. This lesson shows how to build JavaScript sites that search engines read reliably.
outcomes:
  - Explain how Google renders JavaScript and where that can fail
  - Compare client side, server side and static rendering for SEO
  - Test what Google actually sees on a JavaScript page
takeaways:
  - Google renders pages in a recent version of Chrome, but many other crawlers do not run JavaScript at all.
  - Server side rendering or static generation is the safest way to deliver important content and links.
  - Links must be real `<a href>` elements with real URLs, not click handlers or `#` fragments.
  - Single page apps must return meaningful status codes and unique titles for each route.
  - Test with URL Inspection, not just your own browser.
check:
  - q: A React site shows a "Product not found" view for removed products, but the server returns status 200. What is the problem and the fix?
    a: Google sees a soft 404. Either have the server return a real 404 status for that route, or add a `noindex` robots meta tag in the not found view.
  - q: Why might content that Google indexes fine still be missing from other search engines or AI tools?
    a: Many crawlers fetch only the initial HTML and do not run JavaScript. If the content appears only after scripts run, they never see it. Server rendering fixes this for all of them.
practice:
  title: Compare the raw HTML with what Google renders
  time: 20 minutes
  tools: A browser, Search Console
  steps:
  - Open the page source (not the inspector) of a key template, such as a product or article page.
  - Search the source for the page's main heading, a sentence from the main text, and the main navigation links.
  - In Search Console, inspect the same URL, run **Test live URL**, then **View tested page**, and search the rendered HTML for the same items.
  - Check that the navigation links are real `<a href>` links pointing to normal URLs.
  done: You know whether the key content and links are in the initial HTML, only in the rendered version, or missing.
  alt: Do the same on a modern web app or online store, using the **Rich Results Test** in step 3 to see the rendered HTML.
---

## How Google handles JavaScript

When Googlebot fetches a page, it first reads the raw HTML the server sends. If the page needs JavaScript to build its content, Google places it in a queue for **rendering**. Its renderer runs the page in a recent version of Chrome, then reads the result.

This works well for most modern sites. The risks are in the details:

1. **Errors.** A script error or a blocked resource can leave the rendered page empty.
2. **Content after interaction.** Google does not click buttons or scroll like a person. Content that appears only after a click may never be seen.
3. **Other crawlers.** Many crawlers, including those of several AI products and smaller search engines, read only the initial HTML.

## Rendering strategies

**Client side rendering (CSR).** The server sends a nearly empty HTML shell, and JavaScript in the browser builds the page. Google can usually index it, but you rely entirely on rendering, and the first load is slower for users.

**Server side rendering (SSR).** The server sends complete HTML for each request, and JavaScript then makes it interactive. Crawlers get full content immediately. Frameworks such as Next.js, Nuxt and SvelteKit support this.

**Static site generation (SSG).** Pages are built as complete HTML files ahead of time. This is the fastest and most robust approach for content that does not change on every request. This course site works this way.

For pages that need to rank, prefer SSR or SSG. Use client side rendering for parts that do not need to be indexed, such as dashboards behind a login.

> **Dynamic rendering** (serving a pre rendered version to bots and the normal app to users) was once suggested as a workaround. Google now describes it as a workaround it does not recommend. Use server side or static rendering instead.
{: .note}

## Rules for JavaScript sites

**Use real links.** Every navigable page needs a link like `<a href="/products/lamp">`. Google does not follow `onclick` handlers, and it ignores the part of a URL after `#`, so routes must use normal paths.

**Give every route its own title and description.** Set the `<title>`, meta description and canonical for each view, ideally in the server response.

**Return correct status codes.** A route for a missing item should return 404, or at least add `noindex`. A moved page should redirect with a 301 from the server.

**Do not block resources.** Keep JavaScript, CSS and API endpoints the page needs open in robots.txt.

**Lazy load carefully.** Lazy loading images and content as they enter the viewport is fine. Content that loads only after the user scrolls or clicks may not be indexed. Native `loading="lazy"` on images is safe.

**Keep important content in the initial render.** Text hidden in tabs or accordions is indexed as long as it is in the HTML when the page loads.

## Testing what Google sees

1. Open **URL Inspection** in Search Console and run **Test live URL**. Then select **View tested page** to see the rendered HTML, a screenshot, and any resources that failed to load.
2. Compare the rendered HTML with the content you expect. Check the title, main text, links and canonical.
3. To see what non rendering crawlers get, view the raw page source in your browser (not the inspector, which shows the rendered page), or fetch it with `curl`.

> **Common mistake.** Checking a page in your own browser and assuming Google sees the same thing. Your browser has cookies, a logged in state, and no robots.txt restrictions. Always test with Google's tools.
{: .mistake}
