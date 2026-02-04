---
categories: ["Clean Code", "TypeScript"]
date: 2026-02-04 20:00:00 +07:00
image: https://res.cloudinary.com/dtqfsisit/image/upload/v1770211457/two-words-total-safety-the-power-of-const-assertion-in-typescript_jtdbyy.png
title: "Two Words, Total Safety: The Power of Const Assertion in TypeScript"
---

Most developers assume that using `const` makes their configuration data bulletproof, but under the hood, TypeScript is often quietly undermining that safety. By widening our specific strings into generic types, the compiler treats our internal values as mutable variables. This creates a silent gap where our constants can be accidentally reassigned or fail to match strict literal types, leaving us with a system that just looks like it's protected.

The good news? There’s a powerful tool to close this gap called **const assertion**. By adding two simple words, `as const`, we can force the compiler to treat our data as an immutable source of truth. To see this in action, we’ll use a React app path configuration as our study case, learning how to transform a simple object into a self-correcting engine that safeguards our entire routing logic.

## Foundations: Primitives vs. Reference Types

To understand why TypeScript behaves the way it does, we first have to look at how data is stored in JavaScript. Every value we work with falls into one of two categories: **Primitives** or **Reference Types**.

### Primitive Types
Primitives (string, number, boolean, null, undefined) are the simplest building blocks. A key characteristic of primitives is that they are **immutable**. The value itself cannot be changed once it is created.

When we declare a primitive with `const`, TypeScript knows that neither the variable name nor the value can ever be reassigned or modified. This allows the compiler to perform **type narrowing**, where it locks the type to the specific value we provided.

```ts
const name = "John"; 
// Type is exactly "John" (literal type)
```

### Reference Types
Objects and arrays behave differently because they are reference types. These are **mutable**, meaning their internal contents can change even if the variable itself is protected.

When we use `const` with an object, we are only protecting the reference (the address in memory). We are telling JavaScript *"This variable will always point to this specific object in this memory address"*. However, we are not telling it *"The properties inside this object will never change"*.

```ts
const user = { 
    name: 'John',
    age: 23,
    gender: 'male',
};
// The type of user becomes
// {
//     name: string;
//     age: number;
//     gender: string;
// }

user.name = "Doe"; // This is allowed!
```

Because TypeScript knows we can change object properties at any time, it cannot safely assume the type of name is a literal value 'John'.

## The Problem: Type Widening
The behavior we saw in the object example above is a concept in TypeScript called **type widening**. Because objects are mutable, TypeScript widens a specific value into a generic type (like turning `'John'` into `string`) to remain flexible for any future changes we might make.

Let’s take a look at a real-case example using a React App Path configuration to see how this works.

```ts
const APP_PATHS = {
    home: '/',
    profile: '/profile',
    settings: '/settings',
};
```
#### The Expectation vs Reality

- **The Expectation**: We expect `APP_PATHS.home` to be strictly the literal type '/home'
- **The Reality**: TypeScript sees it as a generic string

Because the type is just string, TypeScript will happily let us break our own constants without any warnings.

```ts
// ❌ This SHOULD be an error, but TypeScript allows it
APP_PATHS.home = '/something-else'; 

// ❌ This typo is also allowed
APP_PATHS.settings = '/setttings';
```

## The Solution: Const Assertion

To solve the widening problem, TypeScript introduced a feature called **const assertion** in version 3.4, released in March 2019.

It is important to note that const assertion is unique to TypeScript. It does not exist in standard JavaScript. While JavaScript has `Object.freeze()`, that only works at runtime. Const assertions, on the other hand, provide protection while we are actually writing our code (compile-time). We are telling the compiler: *"Treat this entire structure as a literal value. It is now deeply read-only, and the values are exact"*.

By adding `as const` to an object, we effectively disable type widening.

```ts
const APP_PATHS = {
    home: '/',
    profile: '/profile',
    settings: '/settings',
} as const;

// Every property is now 'readonly'.
// APP_PATHS.home is now specifically the type '/home', not 'string'.
```

If we try to change a value now, TypeScript will stop us immediately: `Cannot assign to 'home' because it is a read-only property`.

## From Data to Types: The Single Source of Truth

Locking down our object with const assertion is a great win for immutability, but the cool stuff comes when we realize that we can use that data to generate types automatically. 

In a professional codebase, we prioritize a Single Source of Truth. This means that when we change a value in one place, the rest of the system should adapt without us having to manually update multiple files.

You might ask *"Why go through the trouble of deriving types? Can't I just manually write a Union Type like `type Path = '/home' | '/settings'` and be done with it?"*

To see why that's a risky path, let's compare both approaches.

### The Manual Way

In this approach, we are forced to maintain the data and the type as two separate entities that just happen to look like each other.

```ts
// 1. The Data (What the app uses at runtime)
export const APP_PATHS = {
    home: '/home',
    profile: '/profile',
    settings: '/settings',
};

// 2. The Type (What the compiler uses at development time)
export type AppPath = '/home' | '/profile' | '/settings';
```

This creates synchronization hell. As our app grows from 2 routes to 50, the likelihood of a human error skyrockets. If we add a new route, let's say `chat: '/chat'` to our object but forget to add it to our type, our UI components will start throwing errors for a perfectly valid route.

### The Automated Way

With const assertion, we can flip the script. We let the data be the boss. Instead of trying to keep a type in sync with an object, we use the `typeof` operator to "steal" the type directly from the configuration we already wrote.

```ts
export const APP_PATHS = {
    home: '/home',
    profile: '/profile',
    settings: '/settings',
    chat: '/chat', // Add it here once...
} as const;

// ...and the type updates automatically for the entire project!
export type AppPath = (typeof APP_PATHS)[keyof typeof APP_PATHS];
```

By deriving the type this way, we ensure that our code is strictly DRY (Don't Repeat Yourself). Our configuration object and our type definition are now properly linked. If a path exists in our data, it exists in our types.

#### Why do we need `as const` for this to work?

If we try to derive a type without using const assertion, the result is far less useful.

- **Without `as const`**: TypeScript sees the object values as generic strings. When we derive the `AppPath` type, the result is simply `string`. This doesn't help us prevent typos.
- **With `as const`**: TypeScript locks the values into literal types. The resulting `AppPath` type is exactly `"/home" | "profile" | "/settings" | "/chat"`.

## Full Usage: React Router & Type-Safe Routes

Now that we’ve built our foundation, we can apply this across our entire React application. By combining our `APP_PATHS` object and the derived `AppPath` type, we can create a system where the Source of Truth flows from our configuration directly into our components. This eliminates the need to manually sync our routing logic with our UI links.

#### Defining Routes

In our router configuration, we can utilize the `APP_PATHS` object. This ensures that the actual URL strings are defined in only one place.

```ts
import { createBrowserRouter } from 'react-router-dom';
import { APP_PATHS } from './constants';

const router = createBrowserRouter([
    {
        path: APP_PATHS.home,
        element: <HomePage />,
    },
    {
        path: APP_PATHS.settings,
        element: <SettingsPage />,
    },
    // ... rest of the routes  
]);
```

#### Creating a Reusable Sidebar Menu

Now, we create a `SidebarMenu` component. To make this production-ready, we need to follow the best practice of extending the base LinkProps.

We use `Omit` to remove the standard, generic `to` prop and replace it with our strict `AppPath` type. This forces the component to only accept paths that actually exist in our configuration.

```ts
import { Link, LinkProps } from 'react-router-dom';
import { cn } from './utils/cn'; 
import { APP_PATHS, AppPath } from './constants';
import { ButtonVariant } from './types/ui.types';
import styles from './SidebarMenu.module.css';

// We extend LinkProps but override 'to' with our strict AppPath type
interface SidebarMenuProps extends Omit<LinkProps, 'to'> {
    to: AppPath; 
    label: string;
}

export const SidebarMenu = ({ 
    to, 
    label, 
    className, 
    ...props 
}: SidebarMenuProps) => {
    return (
        <Link 
            {...props}
            to={to} 
            className={cn(styles.menu, className)}
        >
            {label}
        </Link>
    );
};
```

#### Putting it Into Action

Because we are using the `AppPath` type, our component now acts as a "Guard." It will only allow you to pass paths that actually exist in your configuration.

```ts
// ✅ Perfectly Type-Safe: The compiler knows this exists
<SidebarMenu to={APP_PATHS.home} label="Home" />

// ❌ TypeScript Error: The compiler blocks this because "/dashboard" 
// is not part of our defined AppPath union type.
<SidebarMenu to="/dashboard" label="Dashboard" />
```

## Conclusion: Let the Data Lead

Professional TypeScript is about building self-correcting systems. By mastering const assertion, we allow our data to define the rules of our application. This shift makes our codebase significantly more resilient. Typos are caught instantly, scaling routes becomes effortless, and refactoring a URL is as simple as updating a single line of code.