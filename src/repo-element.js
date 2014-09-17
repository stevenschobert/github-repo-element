/**
 * Export browser global, AMD, and common js
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // amd
    define(['skate'], factory);
  } else if (typeof exports === 'object') {
    // commonjs
    module.exports = factory(require('skate'));
  } else {
    // browser
    root.GithubRepoElement = factory(root.skate, root.skateTemplateHtml);
  }
}(this, function (skate) {
  /**
   * Github-repo element requires Skate.js to run. Either include it yourself,
   * or use the bundled version of Github-repo.
   *
   *  - https://github.com/skatejs/skatejs
   */
  if (typeof skate !== 'function') {
    throw new Error([
      'Github-repo-element requires Skate.js! Make sure you either include',
      'it in on your page, or use the bundled version. See',
      'https://github.com/stevenschobert/github-repo-element#installing'
    ].join(' '));
  }

  var template = [
    '<a class="ghrepo-title" data-ghrepo="url">',
      '<div data-ghrepo="fullName"></div>',
    '</a>',
    '<div class="ghrepo-description">',
      '<div data-ghrepo="description"></div>',
    '</div>',
    '<div class="ghrepo-meta">',
      '<span class="ghrepo-stars">',
        '<span data-ghrepo="stars"></span> stars',
      '</span>',
      '&nbsp;&dash;&nbsp;',
      '<span class="ghrepo-forks">',
        '<span data-ghrepo="forks"></span> forks',
      '</span>',
    '</div>'
  ].join('');

  var gh = new Github();

  var GithubRepoElement = skate('github-repo', {
    template: function createTemplate(element) {
      if (element.innerHTML.replace(/\s/, '').length === 0) {
        element.innerHTML = template;
      }
    },

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
          if (el) {
            el.innerHTML = repo[item];
          }
        }, this);
      }
    }
  });

  return GithubRepoElement;
}));
