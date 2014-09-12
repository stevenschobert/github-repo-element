/**
 * Github-repo element requires both skatejs and skate.js templating.
 * Either include them yourself, or use a the bundled version of Github-repo.
 *
 *  - https://github.com/skatejs/skatejs
 *  - https://github.com/skatejs/template-html
 */
if (typeof skate !== 'function') {
  throw new Error([
    'Github-repo-element requires Skate.js! Make sure you either include',
    'it in on your page, or use the bundled version. See',
    'https://github.com/stevenschobert/github-repo-element#installing'
  ].join(' '));
}

if (typeof skateTemplateHtml !== 'function') {
  throw new Error([
    'Github-repo-element requires Skate.js Templating! Make sure you either include',
    'it in on your page, or use the bundled version. See',
    'https://github.com/stevenschobert/github-repo-element#installing'
  ].join(' '));
}

var template = [
  '<a class="ghrepo-title" data-ghrepo="url">',
    '<content select=".url">',
      '<div data-ghrepo="fullName"></div>',
    '</content>',
  '</a>',
  '<div class="ghrepo-description">',
    '<content select=".description">',
      '<div data-ghrepo="description"></div>',
    '</content>',
  '</div>',
  '<div class="ghrepo-meta">',
    '<content select=".meta">',
      '<span class="ghrepo-stars">',
        '<span data-ghrepo="stars"></span> stars',
      '</span>',
      '&nbsp;&dash;&nbsp;',
      '<span class="ghrepo-forks">',
        '<span data-ghrepo="forks"></span> forks',
      '</span>',
    '</content>',
  '</div>'
].join('');

var gh = new Github();

var GithubRepoElement = skate('github-repo', {
  template: skateTemplateHtml(template),

  attributes: {
    src: function fetchRepo(element, change) {
      gh.repo(change.newValue, function handleRepoFetch(repo) {
        element.displayRepo(repo);
      });
    }
  },

  prototype: {
    displayRepo: function displayRepo(repo) {
      var linkEl = this.querySelector('[data-ghrepo="url"]');
      if (linkEl) {
        linkEl.setAttribute('href', repo.url);
      }

      [
        'name',
        'fullName',
        'description',
        'watchers',
        'forks',
        'language',
        'stars'
      ].forEach(function displayItem(item) {
        var el = this.querySelector('[data-ghrepo="'+item+'"]');
        console.log(el.tagName);
        if (el) {
          el.innerHTML = repo[item];
        }
      }, this);
    }
  }
});

/**
 * UMD for exporting Component
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.GithubRepoElement = factory();
  }
}(this, function () {
  return GithubRepoElement;
}));
