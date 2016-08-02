angular.module('vvida.directives')
  .directive('autocompleteBlur', function($timeout){
    return {
      link: function() {
        $timeout(setPlaceholder, 0);

        function setPlaceholder() {
          registerEvents(getById('searchInput'), 'focus', onFocus);
          registerEvents(getById('searchInput'), 'blur', onBlur);
        }
      }
    };
  });

function getById(element) {
  return document.getElementById(element);
}

/*
 * @param(String) tag DOM element Tag
 * get the first element in the node list returned
 * @return {Object} DOM element
 */
function getFirstElementByTag(tag) {
  return document.getElementsByTagName(tag)[0];
}

/**
 * @param  {Object} element DOM element
 * @param  {String} type event to register
 * @param  {Object} callback a callback
 * register custom onblur and onfocus events
 * and set useCapture to (true) so event handler
 * is executed in the capturing phase
 * @return {Void}
 */
function registerEvents(element, type, callback) {
  element.addEventListener(type, callback, true);
}

var previousPlaceholder = '';

/*
 * @param  {Void}
 * save placeholder then clear it
 * @return {Void}
 */
function onFocus() {
  previousPlaceholder = getFirstElementByTag('input').placeholder;
  getFirstElementByTag('input').placeholder = '';
}

/*
 * @param  {Void}
 * set placeholder on blur
 * @return {Void}
 */
function onBlur() {
  getFirstElementByTag('input').placeholder = previousPlaceholder;
}

