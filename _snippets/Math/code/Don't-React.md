---
layout: post
title:  "Don't React"
date: "2021-04-02"
image: https://dev-to-uploads.s3.amazonaws.com/i/cv7ln3mwwp4mbzhi8yog.png
---

## From Rich Harris

Reactivity has been around since Lampar Spreadheets and visicalc were created (70s).

React is a virtual DOM library. They diverge from the tranditional ShadowDOM. It traces back the dependency graph every time there needs to be updated. To increment a one it checks the div, goes up checks the div goes up checks the section goes up checks everything and concludes that we need to make a small 4 a 5.

React REGENERATES the whole branch everytime there is a change in the tree. React therefore is for all practical purposes NOT reactive.

Even the react team thinks its not fast enough, otherwise what was the point of

- shouldComponentUpdate
- React.PureComponent
- useMemo
- useCallback

these APIs? These are essentially abstraction leaks, why are you doing the computer's job.

> A Framwork is not to organise your code, it is to organise YOUR MIND.

The traditional way to tell a computer that something has changed is to use the assignment operator <code>=</code>. Vue figured this out long ago. The do this.count = 1; Vue cannot get rid of the <code>this</code> keyword because it is constraining by browser rules. Svelte as a compiler is not.

React uses JavaScript to do everything including CSS and HTML. **HTML IS THE LANGUAGE OF THE WEB *NOT* JS**. In general react has 40% more code than Svelte, that implies it has 40% more surface area for bugs.

React time slicing is also not much help. It CANNOT spead up your code. If it doesn't run at 60FPS already then it cant be made to. Time slicing only spreads out the work out.

State RN
<table>
<style>
table{font-family:Helvetica;line-height:1.2em;}
.small{font-size:0.8em;color:#888;}
tr td:first-child{font-size:2em;padding:0 10px;}
</style>
    <tr>
        <td>💀</td>
        <td><span class="small">Expired</span> <br />the desktop web</td>
    </tr>
    <tr>
        <td>😴</td>
        <td><span class="small">Tired</span> <br />the mobile web</td>
    </tr>
    <tr>
        <td>😎</td>
        <td><span class="small">Wired</span> <br /> the embedded web</td>
    </tr>
</table>

We don't need to be as fast as mobiles, we need to be as fast as VR headsets, smart watches, TVs, fridges etc.

React and Vue are libraries they are constrained by file sizes. Svelte is a compiler, it is not. Unused features will simply not get compiled.

React is not useful unless youre building facebook. Like literally, Facebook. React was created to deal with very very large systems, and shines there. For smaller systems, it is pure Bloat.

## Fron Chris Hawkes

React is made by facebook. They initially had a problem where they used to sneak in random clauses in the license. This is a very facebook thing to do. They have since fixed this problem and have completely moved to MIT Lic.

If you are a startup. DON'T USE REACT. React anyway (around 2014) was successful because of Angular's failure.

They rewrite the engine very frequently. This is problematic for companies and it could take them MONTHS to migrate. Facebook maintains react like they are still startup. Classes then Functional Components then Hooks 🤦🏻‍♂️.

Lastly a whole library, brings its own vulnerabilities.

Also. WHY IS REDUX SYNCHRONOUS. WHY. Then you would import redux thunk to solve that problem. 