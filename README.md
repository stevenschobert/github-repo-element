&lt;github-repo&gt;
===================

> **[See it in action](http://codepen.io/stevenschobert/pen/gHcpK/left?editors=100)**

A custom HTML element for displaying GitHub repositories.

```html
<github-repo src="OWNER/REPO">
  loading...
</github-repo>
```

#### Fun bits

- Powered by the [GitHub API](https://developer.github.com/v3/).
- Works just like any other element. Use jQuery ([or not](http://vanilla-js.com/)) to change the `src` attribute and watch
  the content magically update!
- Requires no authentication. Everything runs in the browser, so you don't have to write any server
  logic or manage access tokens!
- Uses [local
  storage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage) to cache
  API requests. This keeps everything fast and under GitHub's API rate limits.

#### Not-so-fun bits

- Only modern browsers are supported.
- Only works with public repositories.
- Requires javascript.

## Installing

This package is available in two distributions. The **bundled** version includes
[Skate.js](https://github.com/skatejs/skatejs) &
[Skate.js Template](https://github.com/skatejs/template-html), while the **stand-alone** assumes you
will include them yourself. Note you only need *one* of the version.

- **[Bundled](dist/github-element-bundled.js)** (includes depencies) _~17kb_
- **[Stand-alone](dist/github-element.js)** (no dependencies bundled) _~4kb_

To install the `<github-repo>` element, include the script(s) on your page:

```html
<!-- If you downloaded the bundled version, just include it -->
<script src="/path/to/github-element-bundled.js"></script>

<!-- OR -->

<!-- If you downloaded the stand-alone version, also include Skate.js -->
<script src="/path/to/skate.min.js"></script>
<script src="/path/to/skate-template-html.js"></script>
<script src="/path/to/github-element.js"></script>
```

### Bower

You can require this package via [bower](http://bower.io), if that's your thing.

```sh
bower install github-repo-element
```

Similar to installing manually, either include the **bundled** or **standalone** version.

## Usage

Once you have installed the `<github-repo>` element, it works just like any other HTML elements on
your page. You can add them, manipulate them with jquery, or anything!

To set which repository the element looks at, just the `src` attribute. Use the pattern of
`OWNER/REPO`.

```html
<github-repo src="stevenschobert/github-repo-element">
  text here will be displayed while the element is loading
</github-repo>
```

### Styling

To style the `<github-repo>`'s contents, use the following CSS selectors.

```css
/* Repository title (link) */
github-repo .ghrepo-title {
}

/* Repository description */
github-repo .ghrepo-description {
}

/* Repository stars and forks */
.ghrepo-meta {
  margin-top: 8px;
  font-size: 85%;
  font-style: italic;
  color: #888;
}
```

## Contributing

Please read over [GitHub's awesome guide on
contributing](https://guides.github.com/activities/contributing-to-open-source/) if you'd like to
lend a hand!

## Todo

- Tests
- More data from GitHub

