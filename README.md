# gumroad-overlay
Hello and thank you for reviewing.  In the following README I've documented the functionalities of my demo, as well as how you can try it out locally.  Please read on for information and instructions!


[Features and Limitations](#Features-and-Limitations)
<br />
[How to Demo](#How-to-Demo)


<img width="600" alt="Screen Shot 2021-04-16 at 1 56 45 AM" src="https://user-images.githubusercontent.com/68410363/114978267-02b9b380-9e57-11eb-9876-bd7806f2573e.png">

<br />

## Demo

https://user-images.githubusercontent.com/68410363/115127404-3a824180-9fa4-11eb-8af0-03f1c4b828f4.mp4



## Features and Limitations

A mock-up of the Gumroad Overlay, done as a coding challenge for Gumroad. In addition to utilizing an `iframe` to access a gumroad product page, this script does the following:

<ul>
<li>Can be implemented as a single javascript file or `script tag` (see below)</li>
<li>Supports custom subdomains for creators (e.g. sahil.gumroad.com/pencil).  As of Apr 15 non-gumroad domains are unsupported, but I would like to add in this functionality.</li>
<li>Early loads pages on hover</li>
<li>Has a specified `data-attr` to modify the button</li>
</ul>

I came across certain iframe-related `CORS` restrictions while trying to replicate/implement certain functionalities and styles, so I'm intrigued by how Gumroad worked around this. Specifically, it seems that the actual Gumroad overlay may not be an iframe (I investigated via inspect tool). Nevertheless, I stuck with iframes to follow along with the challenge's instructions.

<img width="600" alt="Screen Shot 2021-04-16 at 1 56 09 AM" src="https://user-images.githubusercontent.com/68410363/114978212-ed448980-9e56-11eb-9d19-b27d9d53ee2e.png">

## How to Demo (via one-line unpkg script tag)

To simulate something as close as possible to the authentic Gumroad overlay, this project was set up so that a user could import one line of code into their site for functionality: 
<br />
<br />
`<script src="https://unpkg.com/samroad-overlay@1.1.5/dist/script.js"></script>`
<br />
<br />
From there, they will only have to create a gumroad button:
<br />
<br />
`<a class="samroad-button" href="https:/gum.co/peVsK" data-show="true">Buy my product</a>`
<br />
<br />
Please note that changing `data-show` to `false` will remove the button. This was done as a demonstration for Sahil's request: <i>"Read data-attrs of the anchor tags to show a button or not, make it embed or not, etc."</i>
<br />
<br />
Ultimately, to use simply import these two lines of code into your website
```
<a class="samroad-button" href="https:/gum.co/peVsK" data-show="true">Buy my product</a>
<script src="https://unpkg.com/samroad-overlay@1.1.5/dist/script.js"></script>
```


## How to Demo (via cloning this repo)

For convenience, I've included an `index.html` file in this with everything already set-up. To run, simply clone this repository and run the `index.html` file in your browser. **Please note:** codepen and jsfiddle seem to modify iframe href attributes, so testing out my script imports in jsfiddle or codepen will not work. I haven't tested this in codesandbox yet.

<img width="916" alt="Screen Shot 2021-04-16 at 1 57 58 AM" src="https://user-images.githubusercontent.com/68410363/114978425-2e3c9e00-9e57-11eb-9937-9d0be92dd716.png">

## Demo
