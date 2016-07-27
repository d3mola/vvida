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
  previousPlaceholder = getById('input-0').placeholder;
  getById('input-0').placeholder = '';
}

/*
 * @param  {Void}
 * set placeholder on blur
 * @return {Void}
 */
function onBlur() {
  getById('input-0').placeholder = previousPlaceholder;
}

