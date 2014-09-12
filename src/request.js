/**
 * Request class for making HTTP requests.
 *
 *    new Request('http://api.com', {
 *      method: 'get',
 *      headers: {}
 *    }).send(function(res) {});
 */
function Request(url, opts) {
  opts = opts || {};
  this.url = url;
  this.headers = opts.headers || {};
  this.method = opts.method || 'get';
}

/**
 * Sends the request object. Accepts and callback function
 * that receives a Response object.
 */
Request.prototype.send = function sendRequest(callback) {
  var request = new XMLHttpRequest();
  var self = this;

  /**
   * Callback wrapper that creates a #Response object.
   */
  request.onload = function handleResponse() {
    var res = new Response(request);
    callback.call(self, res);
  };

  /**
   * Opens the XMLHttpRequest so headers can be set.
   */
  request.open(this.method, this.url);

  /**
   * Sets requet headers from the @headers property.
   */
  Object.keys(this.headers).forEach(function setHeader(header) {
    request.setRequestHeader(header, this.headers[header]);
  }, this);

  /**
   * Sends the request
   */
  request.send();

  return this;
};

/**
 * Convenience method for sending a get request
 * without having to create an instance.
 */
Request.get = function get(url, headers, callback) {
  if (arguments.length < 3) {
    callback = headers;
  }

  return new Request(url, {
    method: 'get',
    headers: headers || {}
  }).send(callback);
};

