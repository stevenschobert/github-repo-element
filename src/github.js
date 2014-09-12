/**
 * Small wrapper for the Github API.
 */
function Github(opts) {
  opts = opts || {};

  this.baseUrl = 'https://api.github.com';
  this.cacheNamespace = opts.cacheNamespace || 'ghapi';
}

/**
 * Fetches repository information. Accepts a callback
 * that receives a #Github.Repository object.
 */
Github.prototype.repo = function getRepo(repo, callback) {
  var url = this.baseUrl+'/repos/'+repo;

  this._requestOrReadCache(url, function(data) {
    var repo = new Github.Repository({
      name: data.name,
      fullName: data.full_name,
      forks: data.forks_count,
      description: data.description,
      url: data.html_url,
      stars: data.stargazers_count,
      language: data.language
    });

    return callback(repo);
  });

  return this;
};

/**
 * Makes an API request, while using localStorage to cache API responses.
 */
Github.prototype._requestOrReadCache = function requestOrReadCache(url, callback) {
  var keyPrefix = this.cacheNamespace+'-'+url+'-';
  var etagKey = keyPrefix+'etag';
  var contentKey = keyPrefix+'content';
  var etag = localStorage.getItem(etagKey);

  /**
   * If an ETag has been cached, check it against to the API to
   * see if the content has changed.
   */
  if (etag) {
    console.log('requesting '+url+' with etag '+etag);

    Request.get(url, {'If-None-Match': etag}, function(res) {
      if (res.status !== 304) {
        console.log('cache for '+url+' expired!');
        window.localStorage.removeItem(etagKey);
        window.localStorage.removeItem(contentKey);
        return this._requestOrReadCache(url, callback);
      }

      console.log('cache for '+url+' still valid!');
      return callback(JSON.parse(localStorage.getItem(contentKey)));
    }.bind(this));

    return this;
  }

  /**
   * Perform a full API request and cache the etag and body.
   */
  Request.get(url, function(res) {
    if (res.status !== 200) {
      callback(null);
      return;
    }

    window.localStorage.setItem(etagKey, res.headers.ETag);
    window.localStorage.setItem(contentKey, JSON.stringify(res.body));

    return callback(res.body);
  });

  return this;
};


/**
 * Repository object to store repo information.
 */
Github.Repository = function Repository(opts) {
  opts = opts || {};

  this.name = opts.name;
  this.fullName = opts.fullName;
  this.description = opts.description;
  this.forks = opts.forks;
  this.language = opts.language;
  this.url = opts.url;
  this.stars = opts.stars;
};
