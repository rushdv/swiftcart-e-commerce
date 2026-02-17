# SwiftCart E-commerce Website

SwiftCart is a responsive e-commerce website built using Vanilla JavaScript and Tailwind CSS. It fetches product data from the FakeStoreAPI and provides a seamless shopping experience.

## Features

-   **Dynamic Product Listing:** Fetches and displays products from an API.
-   **Category Filtering:** Filter products by category (Electronics, Jewelery, Men's Clothing, Women's Clothing).
-   **Product Details:** View detailed information about a product in a modal.
-   **Shopping Cart:** Add items to the cart (state maintained in session).
-   **Responsive Design:** Optimized for both desktop and mobile devices using Tailwind CSS.
-   **Modern UI:** Clean and attractive interface inspired by modern e-commerce trends.

## Technologies Used

-   **HTML5**
-   **CSS3 (Tailwind CSS)**
-   **JavaScript (Vanilla ES6+)**
-   **FakeStoreAPI** (for product data)

## Setup and Usage

1.  Clone the repository or download the files.
2.  Open `index.html` in your web browser.
3.  Note: An internet connection is required to load Tailwind CSS (via CDN) and fetch data from the API.

---

## Interview Questions (Bangla)

### 1) What is the difference between null and undefined?

**Undefined:** যখন কোনো variable declare করা হয় কিন্তু তাতে কোনো value assign করা হয় না, তখন তার ডিফল্ট value হয় `undefined`। এটি জাভাস্ক্রিপ্ট ইঞ্জিন দ্বারা স্বয়ংক্রিয়ভাবে প্রদান করা হয়।
উদাহরণ:
```javascript
let x;
console.log(x); // undefined
```

**Null:** `null` একটি বিশেষ মান যা নির্দেশ করে যে variable-টি খালি বা এর কোনো অস্তিত্ব নেই। এটি সাধারণত ডেভেলপাররা ইচ্ছাকৃতভাবে ব্যবহার করেন ইন্ডিকেট করার জন্য যে variable-টিতে বর্তমানে কোনো ভ্যালু নেই।
উদাহরণ:
```javascript
let y = null;
console.log(y); // null
```
সংক্ষেপে, `undefined` মানে "ভ্যালু দেওয়া হয়নি" এবং `null` মানে "ভ্যালু নেই (ইচ্ছাকৃতভাবে সেট করা)"।

### 2) What is the use of the map() function in JavaScript? How is it different from forEach()?

`map()` এর ব্যবহার: এটি একটি array-এর প্রতিটি উপাদানের উপর একটি ফাংশন চালায় এবং ফলাফলের ভিত্তিতে একটি **নতুন array** তৈরি করে রিটার্ন দেয়। এটি মূল array পরিবর্তন করে না।

`forEach()` এর সাথে পার্থক্য:
-   **Return Value:** `map()` একটি নতুন array রিটার্ন করে, কিন্তু `forEach()` কিছুই রিটার্ন করে না (`undefined`)।
-   **Chaining:** `map()` এর পর অন্যান্য array মেথড (যেমন `.filter()`, `.reduce()`) চেইন করা যায়, কিন্তু `forEach()` এর ক্ষেত্রে তা সম্ভব নয় কারণ এটি কিছু রিটার্ন করে না।
-   **Purpose:** ডেটা ট্রান্সফর্ম বা নতুন ফর্মেট তৈরি করতে `map()` ব্যবহার করা হয়, আর সাইড ইফেক্ট (যেমন কনসোলে প্রিন্ট করা বা DOM আপডেট করা) এর জন্য `forEach()` উপযুক্ত।

### 3) What is the difference between == and ===?

-   `==` (Loose Equality): এটি দুটি ভ্যালুর তুলনা করার সময় তাদের **Type Conversion** (Coercion) করে। অর্থাৎ, যদি একপাশের টাইপ স্ট্রিং হয় এবং অন্যপাশ নম্বর হয়, তবে এটি একটিকে কনভার্ট করে সমান করার চেষ্টা করে।
    উদাহরণ: `5 == "5"` // true
-   `===` (Strict Equality): এটি ভ্যালুর পাশাপাশি **Data Type**-ও চেক করে। এখানে কোনো কনভার্শন হয় না।
    উদাহরণ: `5 === "5"` // false (কারণ একটি Number এবং অন্যটি String)

বেস্ট প্র্যাকটিস হিসেবে সবসময় `===` ব্যবহার করা উচিত যাতে টাইপজনিত বাগ এড়ানো যায়।

### 4) What is the significance of async/await in fetching API data?

API থেকে ডেটা ফেচ করা একটি **অ্যাসিনক্রোনাস (Asynchronous)** প্রক্রিয়া, মানে এটি সম্পন্ন হতে কিছুটা সময় নেয়।
-   `async/await` কোডকেsynchronous (ধারাবাহিক) স্টাইলে লিখতে সাহায্য করে, যা পড়া এবং ডিবাগ করা সহজ।
-   এটি `.then().catch()` চেইনিং-এর তুলনায় ক্লিন সিনট্যাক্স প্রদান করে।
-   `await` কিওয়ার্ডটি জাভাস্ক্রিপ্টকে নির্দেশ দেয় প্রমিজ (Promise) রিজলভ না হওয়া পর্যন্ত অপেক্ষা করতে, এরপর পরের লাইনে যেতে। এর ফলে ডেটা আসার আগেই কোড রান হয়ে যাওয়ার সমস্যা এড়ানো যায়।

উদাহরণ:
```javascript
async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
```

### 5) Explain the concept of Scope in JavaScript (Global, Function, Block).

Scope নির্ধারণ করে কোডের কোন অংশ থেকে কোন variable অ্যাক্সেস করা যাবে।

**1. Global Scope:**
কোনো ফাংশন বা ব্লকের বাইরে ডিক্লেয়ার করা variable গ্লোবাল স্কোপে থাকে। এটি কোডের যেকোনো জায়গা থেকে অ্যাক্সেস করা যায়।
```javascript
let globalVar = "I am global";
```

**2. Function Scope (Local Scope):**
ফাংশনের ভেতরে `var`, `let`, বা `const` দিয়ে ডিক্লেয়ার করা variable শুধু ওই ফাংশনের ভেতরেই অ্যাক্সেস করা যায়। বাইরে থেকে পাওয়া যায় না।
```javascript
function myFunc() {
  let funcVar = "I am local";
}
// funcVar এখানে inaccessible
```

**3. Block Scope:**
ES6-এ `let` এবং `const` আসার পর ব্লক স্কোপের ধারণা আসে। কোনো ব্লক `{ ... }` (যেমন if, for loop) এর ভেতরে `let` বা `const` দিয়ে ডিক্লেয়ার করা variable শুধু ওই ব্লকের ভেতরেই সীমাবদ্ধ থাকে। `var` ব্লক স্কোপ মানে না।
```javascript
if (true) {
  let blockVar = "I am block scoped";
  var notBlock = "I am function/global scoped";
}
// blockVar এখানে inaccessible
// notBlock এখানে accessible
```
