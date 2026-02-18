---
categories: ["JavaScript"]
date: 2026-02-18 17:00:00 +07:00
image: https://res.cloudinary.com/dtqfsisit/image/upload/v1771411386/logical-or-vs-nullish-coalescing-the-tiny-javaScript-mistake-that-could-break-your-apps-ii_qdcvzi.png
title: "Logical OR vs Nullish Coalescing: The Tiny JavaScript Mistake That Could Break Your Apps"
---

In our daily work as JavaScript developers, we often reach for shortcuts like logical OR (`||`) or nullish coalescing (`??`) to replace longer ternary operators and keep our code clean. On the surface, these two operations seem to do the exact same thing. They provide a fallback when data is missing.

However, beneath that simple syntax lies a fundamental difference in how JavaScript evaluates empty data. Understanding these core fundamentals isn't just a theoretical exercise, it’s a practical necessity. If we don’t master the basics of how these operators work, one simple line of code can lead to unpredictable behavior in production.

Now, we’re going back to the basics to see why these two operators are fundamentally different and how choosing the wrong one can quietly break our applications.

## The Foundation: Truthy vs Falsy

In JavaScript, every value has an inherent boolean vibe. Even if a variable isn't a literal true or false, JavaScript will treat it as one when we use it in a logical operation. This concept is what we call [Type Coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion). It means that when JavaScript expects a boolean but gets something else (like a number or a string), it coerces that value into being either **truthy** or **falsy**.

When we call a value **truthy**, we mean that it translates to `true` when evaluated in a boolean context. This is the default state in JavaScript, most values we encounter are truthy. This includes obvious things like the number `1` or the string `"Hello"`, but it also includes surprising things, like an empty array `[]` or an empty object `{}`. Even though they are empty containers, they still exist in memory, so JavaScript treats them as truthy.

On the other hand, **falsy** values are the specific exceptions to the rule. These values typically represent some form of absence, zero, or invalidity that JavaScript translates to `false`. Based on the [MDN docs](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), there are exactly nine distinct falsy values in the language that we need to keep in mind:

1. `null`: The intentional absence of any value
2. `undefined`: A variable that has been declared but not yet assigned a value
3. `false`: The literal boolean keyword
4. `0`: The numerical zero
5. `-0`: The negative numerical zero
6. `0n`: The BigInt version of zero
7. `""`: The empty string, including '' and ``
8. `NaN`: Not-a-Number, usually the result of a failed mathematical operation
9. `document.all`: The only falsy object in JavaScript

## Logical OR: The "First Truthy" Hunter

The Logical OR operator (`||`) is one of the most common tools we use to provide default values. Its behavior is straightforward, it evaluates the expression from left to right and returns the first truthy value it encounters. If all values are falsy, it simply returns the last one.

To see this in practice, let’s look at how we handle user settings fetched from `localStorage`. In production, this data is often incomplete. Maybe the user hasn't visited the settings page, or we've just added a new feature that doesn't exist in their local storage yet.
```js
const rawConfigData = '{"volume": 0, "autoPlay": false}'; // stringified JSON
const config = JSON.parse(rawConfigData);

// Now we try to apply these settings with defaults for missing data
const volume = config.volume || 50; 
const autoPlay = config.autoPlay || true;
const theme = config.theme || "dark"; // 'theme' is undefined

console.log(volume);   // Result: 50 (Incorrect! Expected value: 0)
console.log(autoPlay); // Result: true (Incorrect! Expected value: false)
console.log(theme);    // Result: "dark" (Correct!)
```

In this example, we can see exactly where the silent bug creeps in. For the theme variable, the operator worked perfectly because the attribute was missing (`undefined`), which is falsy. But for volume and autoplay, our logic failed us.

Even though the user explicitly stored a volume of 0 and disabled autoplay, our code ignored their preferences. Because 0 and false are part of the falsy 9, the `||` operator treated those valid inputs exactly the same as the missing theme. This is why `||` can be dangerous in some scenarios. It doesn't distinguish between data that is missing and data that is intentionally zero or false.

## Nullish Coalescing: The Nullish Filter

Nullish coalescing (`??`) was introduced in ES11 back in June 2020. This operator was created specifically to handle the collapsing intent problem. Unlike the OR operator, it doesn't care about the broad list of Falsy 9. Instead, it focuses exclusively on nullish values, specifically `null` and `undefined`.

If we apply this operator to the exact same scenario we just reviewed, we can see the behavior difference.

```js
const rawConfigData = '{"volume": 0, "autoPlay": false}'; 
const config = JSON.parse(rawConfigData);

// We swap || for ?? to distinguish missing data from valid zero-ish data
const volume = config.volume ?? 50; 
const autoPlay = config.autoPlay ?? true;
const theme = config.theme ?? "dark"; // 'theme' is still undefined

console.log(volume);   // Result: 0 (Correct!)
console.log(autoPlay); // Result: false (Correct!)
console.log(theme);    // Result: "dark" (Correct!)
```

By making this one small change, we’ve made our code exponentially more resilient. Because 0 and false are not `null` or `undefined`, the nullish coalescing operator treats them as valid, existing data. It only reaches for the fallback values when the property is truly absent or explicitly set to `null`. This allows us to handle incomplete objects without accidentally overwriting the intentional and valid choices made by our users.

## Conclusion: Right Tool for the Right Case

We have seen that the smallest syntax choices often carry the heaviest consequences. Misusing these operators can lead to logic flaws where valid inputs are ignored. When we fail to distinguish between missing data and zero-ish data, we compromise the integrity of our application state. To build reliable software, we have to apply them based on the specific type of data we are handling.