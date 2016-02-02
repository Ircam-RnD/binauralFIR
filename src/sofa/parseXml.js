/**
 * @fileOverview Simple XML parser, as a DOM parser.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Parse an XML string into an XMLDocument object, using native browser DOM
 * parser.
 *
 * It requires a browser environment.
 *
 * @function parseXml
 * @param {String} xmlStr full valid XML data.
 * @returns {Object} XMLDocument, DOM-like. (Use any selector.)
 *
 * @example
 * const request = new window.XMLHttpRequest();
 * request.open('GET', 'http://bili2.ircam.fr/catalog.xml');
 * request.onerror =  () => {
 *    throw new Error(`Unable to GET: ${request.status}`);
 * };
 * request.onload = () => {
 *   const xml = parseXml(request.response);
 *   const catalogueReferences = xml.querySelector('dataset > catalogRef');
 *   console.log(catalogueReferences);
 * }
 * request.send();
 */
export let parseXml;

if (typeof window.DOMParser !== 'undefined') {
  parseXml = function parseXmlDOM(xmlStr) {
    return (new window.DOMParser()).parseFromString(xmlStr, 'text/xml');
  };
} else if (typeof window.ActiveXObject !== 'undefined' &&
           new window.ActiveXObject('Microsoft.XMLDOM')) {
  parseXml = function parseXmlActiveX(xmlStr) {
    const xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = 'false';
    xmlDoc.loadXML(xmlStr);
    return xmlDoc;
  };
} else {
  throw new Error('No XML parser found');
}

export default parseXml;
