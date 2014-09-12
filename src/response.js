/**
 * Reponse class. Wraps an XMLHttpRequest instance.
 */
function Response(xmlreq) {
  if (xmlreq) {
    this.status = xmlreq.status;
    this._parseHeaders(xmlreq.getAllResponseHeaders());

    if (this.headers['Content-Type'] && /application\/json/.test(this.headers['Content-Type'])) {
      this.body = JSON.parse(xmlreq.responseText);
    } else {
      this.body = xmlreq.responseText || '';
    }
  }
}

/**
 * Parses a header string into a @headers property.
 */
Response.prototype._parseHeaders = function parseHeaders(headers) {
  var splitHeaders = headers.split('\n');
  var headerRegExp = /^(.*):(.*)$/;
  var headersMap = {};

  splitHeaders.forEach(function processHeader(header) {
    var strippedHeader = header.replace(/\s/mg, '');
    var headerParsed = headerRegExp.exec(strippedHeader);

    if (headerParsed && headerParsed.length >= 3) {
      headersMap[headerParsed[1]] = headerParsed[2];
    }
  });

  this.headers = headersMap;

  return this;
};
