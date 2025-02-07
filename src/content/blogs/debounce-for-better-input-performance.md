---
categories: ["frontend", "performance"]
date: 02/04/2025
image: https://res.cloudinary.com/dtqfsisit/image/upload/v1738895230/debounce-for-better-input-performance_ikaw9h.png
title: Debounce for Better Input Performance
---

Have you ever encountered a situation where a user’s rapid input, like typing in a search bar, caused your app to perform poorly or make too many unnecessary requests? This is where debouncing comes to the rescue. In this post, we’ll explore what debouncing is, why it’s useful, and how you can implement it in your projects.

## What is Debouncing?

Debouncing is a programming technique used to ensure that a function is only executed after a certain amount of time has passed since it was last called. It’s particularly useful for optimizing performance in scenarios where a function might be triggered repeatedly in a short period, such as:

- **Search input**: When a user types quickly, you don’t want to send a request for every keystroke.
- **Window resizing**: You might want to recalculate layouts only after the user has finished resizing the window.
- **Button clicks**: Prevent accidental double-clicks from triggering multiple actions.

Without debouncing, these actions could lead to performance issues, unnecessary API calls, or a poor user experience.

## How Does Debouncing Work?

The idea behind debouncing is simple. Instead of executing a function immediately, you wait for a specified amount of time (e.g., 300ms) to see if the function is called again. If it is, you reset the timer. The function only executes when the timer completes without interruption.

Here’s a simple analogy: imagine you’re waiting for someone to stop talking before you respond. If they keep interrupting, you keep waiting. Only when they’ve stopped talking for a while do you finally respond.

## Search Input Problem

Let's take search input as an example case. Suppose you have a search bar in your app, and with each keystroke, it triggers an API call to fetch some data based on the input. Sounds straightforward, right?

```tsx
export default function DemoApp() {
  const fetchSearchResult = (keyword: string) => {
    console.log(`API call for input: ${input}`);
  };

  return (
    <div className="App">
      <h1>Debouncing Demo</h1>
      <input onChange={(e) => fetchSearchResult(e.target.value)} />
    </div>
  );
}
```

But what happens when your users type fast or make frequent changes? Without debouncing, every keystroke fires off an API request immediately. So, if you type "hello," it triggers five separate API calls, one for each letter.

```console
API call for input: h
API call for input: he
API call for input: hel
API call for input: hell
API call for input: hello
```

This approach of making API calls for every single keystroke is inefficient and wasteful. In reality, we don't need or might not want to fetch results for partial words like "h", "he", or "hel". We're only interested in searching for the complete term "hello".

Making all these intermediate requests not only puts unnecessary load on our server but can also lead to race conditions where results from an earlier request arrive after more recent ones.

What we really want is to wait until the user has finished typing (or at least paused briefly) before making the API call. This is exactly where debouncing comes in handy.

## Search Input After Debouncing

To simplify the process of debouncing, we can use the [debounce package](https://npmjs.com/package/debounce) from npm. It's a handy tool that streamlines the implementation.

The `debounce` function takes two main parameters:

1. **A callback function**: This is the function you want to delay executing
2. **Delay time in milliseconds**: Specifies how long to wait after the last function call before executing

In this second code snippet, `fetchSearchResult` is wrapped with the `debounce` function, which delays the API call by 1000 milliseconds (1 second) after the last input change.

```tsx
import debounce from "debounce";

export default function DemoApp() {
  const fetchSearchResult = debounce((keyword: string) => {
    console.log(`API call for input: ${input}`);
  }, 1000);

  return (
    <div className="App">
      <h1>Debouncing Demo</h1>
      <input onChange={(e) => fetchSearchResult(e.target.value)} />
    </div>
  );
}
```

Instead of firing off an API call for every character, we now wait for a brief pause after the user stops typing. So, if you type "hello," it waits for you to finish typing or pause for one second before making the API request.

```console
API call for input: hello
```

## Conclusion

Debouncing is a simple yet powerful technique that can significantly improve the performance and user experience of your applications. By delaying the execution of a function until a certain amount of time has passed, you can avoid unnecessary computations, API calls, or other resource-intensive operations. It’s a small change that can make a big difference.
