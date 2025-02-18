---
categories: ["Frontend", "SEO", "Social Media"]
date: 02/05/2025
image: https://res.cloudinary.com/dtqfsisit/image/upload/v1738894786/make-your-links-pop-with-og-tags_ecrose.png
title: Make Your Links Pop with OG Tags
---

Ever shared a link on social media and it looked boring? Just a plain URL with no preview image or description? That's where Open Graph tags come to the rescue. In this post, we'll dive into what Open Graph tags are, why they matter, and how to implement them to make your links stand out on social platforms.

## What Are Open Graph Tags?

Open Graph (OG) tags are meta tags used in the `<head>` section of a webpage to control how content appears when shared on social media platforms like Facebook, Twitter, or LinkedIn. These tags allow us to specify titles, descriptions, images, etc, ensuring a visually appealing and informative preview when links are shared.

## Why Are OG Tags Important?

OG tags play a crucial role in optimizing social media sharing. Here’s why they matter:

- **Better Visibility**: Properly configured OG tags make shared links more visually appealing and engaging.
- **Higher Click-Through Rates (CTR)**: A compelling title and eye-catching image encourage more users to click.
- **Brand Consistency**: They ensure that the right title, description, and image are shown consistently across different platforms.
- **SEO Benefits**: While OG tags don’t directly impact rankings, they boost social engagement, which can indirectly improve SEO.

## Implementing OG Tags in Next.js

If you’re using the pages directory in Next.js, you can add OG tags inside the `<Head>` component from next/head.

```tsx
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Leonard Tarigan</title>
        <meta property="og:title" content="Leonard Tarigan - Software Dev" />
        <meta property="og:description" content="Bring your ideas to life!" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
      </Head>
      <main>
        <h1>Welcome to My Website</h1>
      </main>
    </>
  );
}
```

Or if you’re using the new app directory introduced in Next.js 13, you can define OG metadata using the metadata object in a layout or page file.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leonard Tarigan",
  openGraph: {
    title: "Leonard Tarigan",
    description:
      "Passionate software developer. Let's bring your ideas to life!",
    images: ["https://example.com/og-image.jpg"],
    url: "https://example.com",
    type: "website",
  },
};
```

## Implementing OG Tags in Nuxt.js

In Nuxt.js, we can utlize the built-in `useHead` composable to define meta tags, including OG tags.

```vue
<script setup lang="ts">
useHead({
  title: "Leonard Tarigan - Software Dev",
  meta: [
    { property: "og:title", content: "Leonard Tarigan" },
    {
      property: "og:description",
      content: "Passionate software developer. Let's bring your ideas to life!",
    },
    { property: "og:image", content: "https://example.com/og-image.jpg" },
    { property: "og:url", content: "https://example.com" },
    { property: "og:type", content: "website" },
  ],
});
</script>
```

Alternatively, you can use `useSeoMeta` that lets you define your meta tags as a flat object with full TypeScript support.

```vue
<script setup lang="ts">
useSeoMeta({
  title: "Leonard Tarigan",
  description: "Passionate software developer. Let's bring your ideas to life!",
  ogTitle: "Leonard Tarigan - Software Dev",
  ogDescription: "Bring your ideas to life!",
  ogImage: "https://example.com/og-image.jpg",
  ogUrl: "https://example.com",
  ogType: "website",
});
</script>
```

## Checking Your Website’s OG Tags

You can check your website’s existing Open Graph metadata using [opengraph.xyz](https://opengraph.xyz). This website allows you to preview how your webpage appears when shared and helps identify any missing or incorrect OG tags.

![opengraph.xyz Demo](https://res.cloudinary.com/dtqfsisit/image/upload/v1739887386/Make_Your_Links_Pop_with_OG_Tags_-_image_1_e0et27.png)

## Conclusion

Open Graph tags are a simple but powerful way to enhance your website’s presence on social media. They make your shared links more engaging, increase user interaction, and help maintain brand consistency. By setting up OG tags properly, you’ll ensure your content always looks polished when shared across the internet.
