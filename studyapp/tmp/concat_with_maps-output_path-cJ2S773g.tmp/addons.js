define('ember-basic-dropdown/components/basic-dropdown/content', ['exports', 'ember-wormhole/components/ember-wormhole', 'ember', 'ember-basic-dropdown/templates/components/basic-dropdown/content'], function (exports, _emberWormholeComponentsEmberWormhole, _ember, _emberBasicDropdownTemplatesComponentsBasicDropdownContent) {
  'use strict';

  var run = _ember['default'].run;

  var MutObserver = self.window.MutationObserver || self.window.WebKitMutationObserver;
  function waitForAnimations(element, callback) {
    var computedStyle = self.window.getComputedStyle(element);
    if (computedStyle.transitionDuration !== '0s') {
      (function () {
        var eventCallback = function eventCallback() {
          element.removeEventListener('transitionend', eventCallback);
          callback();
        };
        element.addEventListener('transitionend', eventCallback);
      })();
    } else if (computedStyle.animationName !== 'none' && computedStyle.animationPlayState === 'running') {
      (function () {
        var eventCallback = function eventCallback() {
          element.removeEventListener('animationend', eventCallback);
          callback();
        };
        element.addEventListener('animationend', eventCallback);
      })();
    } else {
      callback();
    }
  }

  exports['default'] = _emberWormholeComponentsEmberWormhole['default'].extend({
    layout: _emberBasicDropdownTemplatesComponentsBasicDropdownContent['default'],
    mutationObserver: null,

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var dropdown = self.window.document.getElementById(this.get('dropdownId'));
      this.handleRootMouseDown = this.handleRootMouseDown.bind(this, dropdown);
      this.get('appRoot').addEventListener('mousedown', this.handleRootMouseDown, true);
      if (!this.get('renderInPlace')) {
        dropdown.addEventListener('focusin', this.get('onFocusIn'));
        dropdown.addEventListener('focusout', this.get('onFocusOut'));
        this.addGlobalEvents(dropdown);
      }
      run.scheduleOnce('actions', this.get('reposition'));
      if (this.get('animationEnabled')) {
        run.scheduleOnce('actions', this, this.animateIn, dropdown);
      }
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      var dropdown = self.window.document.getElementById(this.get('dropdownId'));
      this.get('appRoot').removeEventListener('mousedown', this.handleRootMouseDown, true);
      this.removeGlobalEvents(dropdown);
      if (this.get('animationEnabled')) {
        this.animateOut(dropdown);
      }
    },

    // Methods
    animateIn: function animateIn(dropdown) {
      var _this = this;

      this.set('transitionClass', 'ember-basic-dropdown--transitioning-in');
      waitForAnimations(dropdown, function () {
        return _this.set('ember-basic-dropdown--transitioned-in');
      });
    },

    animateOut: function animateOut(dropdown) {
      var parentElement = this.get('renderInPlace') ? dropdown.parentElement.parentElement : dropdown.parentElement;
      var clone = dropdown.cloneNode(true);
      clone.id = clone.id + '--clone';
      clone.classList.remove('ember-basic-dropdown--transitioned-in');
      clone.classList.remove('ember-basic-dropdown--transitioning-in');
      clone.classList.add('ember-basic-dropdown--transitioning-out');
      parentElement.appendChild(clone);
      waitForAnimations(clone, function () {
        parentElement.removeChild(clone);
      });
    },

    handleRootMouseDown: function handleRootMouseDown(dropdownContent, e) {
      var comesFromInside = this.element.parentElement.contains(e.target) || dropdownContent.contains(e.target);
      if (comesFromInside) {
        return;
      }
      var closestDDcontent = _ember['default'].$(e.target).closest('.ember-basic-dropdown-content')[0];
      if (closestDDcontent) {
        var closestDropdownId = closestDDcontent.id.match(/ember\d+$/)[0];
        var clickedOnNestedDropdown = !!dropdownContent.querySelector('#' + closestDropdownId);
        if (clickedOnNestedDropdown) {
          return;
        }
      }
      this.get('close')(e, true);
    },

    addGlobalEvents: function addGlobalEvents(dropdown) {
      var reposition = this.get('reposition');
      self.window.addEventListener('scroll', reposition);
      self.window.addEventListener('resize', reposition);
      self.window.addEventListener('orientationchange', reposition);
      if (MutObserver) {
        this.mutationObserver = new MutObserver(function (mutations) {
          if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
            reposition();
          }
        });
        this.mutationObserver.observe(dropdown, { childList: true, subtree: true });
      } else {
        dropdown.addEventListener('DOMNodeInserted', reposition, false);
        dropdown.addEventListener('DOMNodeRemoved', reposition, false);
      }
    },

    removeGlobalEvents: function removeGlobalEvents(dropdown) {
      var reposition = this.get('reposition');
      self.window.removeEventListener('scroll', reposition);
      self.window.removeEventListener('resize', reposition);
      self.window.removeEventListener('orientationchange', reposition);
      if (MutObserver) {
        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
          this.mutationObserver = null;
        }
      } else {
        dropdown.removeEventListener('DOMNodeInserted', reposition);
        dropdown.removeEventListener('DOMNodeRemoved', reposition);
      }
    }
  });
});
define('ember-basic-dropdown/components/basic-dropdown', ['exports', 'ember', 'ember-basic-dropdown/templates/components/basic-dropdown', 'ember-getowner-polyfill', 'ember-get-config'], function (exports, _ember, _emberBasicDropdownTemplatesComponentsBasicDropdown, _emberGetownerPolyfill, _emberGetConfig) {
  /*jshint unused:false*/
  'use strict';

  var Component = _ember['default'].Component;
  var run = _ember['default'].run;
  var computed = _ember['default'].computed;

  var defaultDestination = _emberGetConfig['default']['ember-basic-dropdown'] && _emberGetConfig['default']['ember-basic-dropdown'].destination || 'ember-basic-dropdown-wormhole';

  exports['default'] = Component.extend({
    layout: _emberBasicDropdownTemplatesComponentsBasicDropdown['default'],
    animationEnabled: !_ember['default'].testing,
    isTouchDevice: !!self.window && 'ontouchstart' in self.window,
    disabled: false,
    renderInPlace: false,
    role: 'button',
    destination: null,
    triggerDisabled: false,
    initiallyOpened: false,
    hasFocusInside: false,
    verticalPosition: 'auto', // above | below
    horizontalPosition: 'auto', // right | left
    classNames: ['ember-basic-dropdown'],
    attributeBindings: ['dir'],
    classNameBindings: ['renderInPlace:ember-basic-dropdown--in-place', 'hasFocusInside:ember-basic-dropdown--focus-inside', '_verticalPositionClass', '_horizontalPositionClass'],

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      this._touchMoveHandler = this._touchMoveHandler.bind(this);
      var registerActionsInParent = this.get('registerActionsInParent');
      if (registerActionsInParent) {
        registerActionsInParent(this.get('publicAPI'));
      }
    },

    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      if (this.get('triggerDisabled')) {
        return;
      }
      var trigger = this.element.querySelector('.ember-basic-dropdown-trigger');
      if (this.isTouchDevice) {
        trigger.addEventListener('touchstart', function (e) {
          _this.get('appRoot').addEventListener('touchmove', _this._touchMoveHandler);
        });
        trigger.addEventListener('touchend', function (e) {
          _this.send('handleTouchEnd', e);
          e.preventDefault(); // Prevent synthetic click
        });
      }
      trigger.addEventListener('mousedown', function (e) {
        return _this.send('handleMousedown', e);
      });

      var onMouseEnter = this.get('onMouseEnter');
      if (onMouseEnter) {
        trigger.addEventListener('mouseenter', function (e) {
          return onMouseEnter(_this.get('publicAPI'), e);
        });
      }

      var onMouseLeave = this.get('onMouseLeave');
      if (onMouseLeave) {
        trigger.addEventListener('mouseleave', function (e) {
          return onMouseLeave(_this.get('publicAPI'), e);
        });
      }
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this.get('appRoot').removeEventListener('touchmove', this._touchMoveHandler);
    },

    // Events
    focusIn: function focusIn(e) {
      this.send('handleFocusIn', e);
    },

    focusOut: function focusOut(e) {
      this.send('handleFocusOut', e);
    },

    // CPs
    appRoot: computed(function () {
      var rootSelector = _ember['default'].testing ? '#ember-testing' : (0, _emberGetownerPolyfill['default'])(this).lookup('application:main').rootElement;
      return self.document.querySelector(rootSelector);
    }),

    wormholeDestination: computed('destination', function () {
      return _ember['default'].testing ? 'ember-testing' : this.get('destination') || defaultDestination;
    }),

    dropdownId: computed(function () {
      return 'ember-basic-dropdown-content-' + this.elementId;
    }),

    tabIndex: computed('disabled', function () {
      return !this.get('disabled') ? this.get('tabindex') || '0' : null;
    }),

    publicAPI: computed(function () {
      var _this2 = this;

      return {
        isOpen: this.get('initiallyOpened'),
        actions: {
          open: this.open.bind(this),
          close: this.close.bind(this),
          toggle: this.toggle.bind(this),
          reposition: function reposition() {
            return run.join(_this2, _this2._performReposition);
          }
        }
      };
    }),

    // Actions
    actions: {
      handleTouchEnd: function handleTouchEnd(e) {
        if (e && e.defaultPrevented) {
          return;
        }
        if (!this.hasMoved) {
          this.toggle(e);
        }
        this.hasMoved = false;
      },

      handleMousedown: function handleMousedown(e) {
        if (e && e.defaultPrevented) {
          return;
        }
        this.stopTextSelectionUntilMouseup();
        this.toggle(e);
      },

      keydown: function keydown(e) {
        this.handleKeydown(e);
      },

      handleFocus: function handleFocus(e) {
        var onFocus = this.get('onFocus');
        if (onFocus) {
          onFocus(this.get('publicAPI'), e);
        }
      },

      handleFocusIn: function handleFocusIn() {
        this.set('hasFocusInside', true);
      },

      handleFocusOut: function handleFocusOut() {
        this.set('hasFocusInside', false);
      }
    },

    // Methods
    toggle: function toggle(e) {
      if (this.get('publicAPI.isOpen')) {
        this.close(e);
      } else {
        this.open(e);
      }
    },

    open: function open(e) {
      if (this.get('disabled') || this.get('publicAPI.isOpen')) {
        return;
      }
      var onOpen = this.get('onOpen');
      if (onOpen && onOpen(this.get('publicAPI'), e) === false) {
        return;
      }
      this.set('publicAPI.isOpen', true);
    },

    close: function close(e, skipFocus) {
      if (!this.get('publicAPI.isOpen')) {
        return;
      }
      var onClose = this.get('onClose');
      if (onClose && onClose(this.get('publicAPI'), e) === false) {
        return;
      }
      this.set('publicAPI.isOpen', false);
      this.setProperties({ _verticalPositionClass: null, _horizontalPositionClass: null });
      if (skipFocus) {
        return;
      }
      var trigger = this.element.querySelector('.ember-basic-dropdown-trigger');
      if (trigger.tabIndex > -1) {
        trigger.focus();
      }
    },

    handleKeydown: function handleKeydown(e) {
      if (this.get('disabled')) {
        return;
      }
      var onKeydown = this.get('onKeydown');
      if (onKeydown && onKeydown(this.get('publicAPI'), e) === false) {
        return;
      }
      if (e.keyCode === 13) {
        // Enter
        this.toggle(e);
      } else if (e.keyCode === 32) {
        // Space
        this.toggle(e);
        e.preventDefault(); // prevents the space to trigger a scroll page-next
      } else if (e.keyCode === 27) {
          this.close(e);
        }
    },

    stopTextSelectionUntilMouseup: function stopTextSelectionUntilMouseup() {
      if (self.FastBoot) {
        return;
      }
      var $appRoot = _ember['default'].$(this.get('appRoot'));
      var mouseupHandler = function mouseupHandler() {
        $appRoot[0].removeEventListener('mouseup', mouseupHandler, true);
        $appRoot.removeClass('ember-basic-dropdown-text-select-disabled');
      };
      $appRoot[0].addEventListener('mouseup', mouseupHandler, true);
      $appRoot.addClass('ember-basic-dropdown-text-select-disabled');
    },

    _performReposition: function _performReposition() {
      if (!this.get('publicAPI.isOpen')) {
        return;
      }
      var dropdown = self.document.getElementById(this.get('dropdownId'));
      if (!dropdown) {
        return;
      }

      var _getPositionInfo2 = // scroll
      this._getPositionInfo(dropdown);

      var triggerTop = _getPositionInfo2.triggerTop;
      var triggerLeft = _getPositionInfo2.triggerLeft;
      var triggerWidth = _getPositionInfo2.triggerWidth;
      var triggerHeight = _getPositionInfo2.triggerHeight;
      var // trigger dimensions
      dropdownHeight = _getPositionInfo2.dropdownHeight;
      var dropdownWidth = _getPositionInfo2.dropdownWidth;
      var // dropdown dimensions
      scrollTop = _getPositionInfo2.scrollTop;
      var scrollLeft = _getPositionInfo2.scrollLeft;

      var dropdownTop = undefined,
          dropdownLeft = triggerLeft;

      // hPosition
      var hPosition = this.get('horizontalPosition');
      if (this.get('renderInPlace')) {
        if (['right', 'left'].indexOf(hPosition) === -1) {
          var viewportRight = scrollLeft + self.window.innerWidth;
          hPosition = triggerLeft + dropdownWidth > viewportRight ? 'right' : 'left';
        }
        return this.set('_horizontalPositionClass', 'ember-basic-dropdown--' + hPosition);
      } else {
        if (['right', 'left'].indexOf(hPosition) === -1) {
          var viewportRight = scrollLeft + self.window.innerWidth;
          var roomForRight = viewportRight - triggerLeft;
          var roomForLeft = triggerLeft;
          hPosition = roomForRight > roomForLeft ? 'left' : 'right';
        }
        if (hPosition === 'right') {
          dropdownLeft = triggerLeft + triggerWidth - dropdownWidth;
        }
        this.set('_horizontalPositionClass', 'ember-basic-dropdown--' + hPosition);
      }

      // vPosition
      var vPosition = this.get('verticalPosition');
      var triggerTopWithScroll = triggerTop + scrollTop;
      if (vPosition === 'above') {
        dropdownTop = triggerTopWithScroll - dropdownHeight;
        this.set('_verticalPositionClass', 'ember-basic-dropdown--above');
      } else if (vPosition === 'below') {
        dropdownTop = triggerTopWithScroll + triggerHeight;
        this.set('_verticalPositionClass', 'ember-basic-dropdown--below');
      } else {
        // auto
        var viewportBottom = scrollTop + self.window.innerHeight;
        var enoughRoomBelow = triggerTopWithScroll + triggerHeight + dropdownHeight < viewportBottom;
        var enoughRoomAbove = triggerTop > dropdownHeight;

        var verticalPositionClass = this.get('_verticalPositionClass');
        if (verticalPositionClass === 'ember-basic-dropdown--below' && !enoughRoomBelow && enoughRoomAbove) {
          this.set('_verticalPositionClass', 'ember-basic-dropdown--above');
        } else if (verticalPositionClass === 'ember-basic-dropdown--above' && !enoughRoomAbove && enoughRoomBelow) {
          this.set('_verticalPositionClass', 'ember-basic-dropdown--below');
        } else if (!verticalPositionClass) {
          this.set('_verticalPositionClass', enoughRoomBelow ? 'ember-basic-dropdown--below' : 'ember-basic-dropdown--above');
        }
        verticalPositionClass = this.get('_verticalPositionClass'); // It might have changed
        dropdownTop = triggerTopWithScroll + (verticalPositionClass === 'ember-basic-dropdown--below' ? triggerHeight : -dropdownHeight);
      }

      dropdown.style.width = dropdownWidth + 'px';
      dropdown.style.top = dropdownTop + 'px';
      dropdown.style.left = dropdownLeft + 'px';
    },

    _getPositionInfo: function _getPositionInfo(dropdown) {
      var trigger = this.element.querySelector('.ember-basic-dropdown-trigger');

      var _trigger$getBoundingClientRect = trigger.getBoundingClientRect();

      var triggerLeft = _trigger$getBoundingClientRect.left;
      var triggerTop = _trigger$getBoundingClientRect.top;
      var triggerWidth = _trigger$getBoundingClientRect.width;
      var triggerHeight = _trigger$getBoundingClientRect.height;

      var _dropdown$getBoundingClientRect = dropdown.getBoundingClientRect();

      var dropdownHeight = _dropdown$getBoundingClientRect.height;
      var dropdownWidth = _dropdown$getBoundingClientRect.width;

      var $window = _ember['default'].$(self.window);
      var scrollLeft = $window.scrollLeft();
      var scrollTop = $window.scrollTop();
      if (this.get('matchTriggerWidth')) {
        dropdownWidth = triggerWidth;
      }
      return {
        triggerTop: triggerTop, triggerLeft: triggerLeft, triggerWidth: triggerWidth, triggerHeight: triggerHeight,
        dropdownHeight: dropdownHeight, dropdownWidth: dropdownWidth,
        scrollLeft: scrollLeft, scrollTop: scrollTop
      };
    },

    _touchMoveHandler: function _touchMoveHandler(e) {
      this.hasMoved = true;
      this.get('appRoot').removeEventListener('touchmove', this._touchMoveHandler);
    }
  });
});
define("ember-basic-dropdown/templates/components/basic-dropdown/content", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 6
          }
        },
        "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown/content.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'id');
        morphs[1] = dom.createAttrMorph(element0, 'class');
        morphs[2] = dom.createAttrMorph(element0, 'dir');
        morphs[3] = dom.createMorphAt(element0, 1, 1);
        return morphs;
      },
      statements: [["attribute", "id", ["get", "dropdownId", ["loc", [null, [1, 10], [1, 20]]]]], ["attribute", "class", ["concat", ["ember-basic-dropdown-content ", ["get", "transitionClass", ["loc", [null, [1, 61], [1, 76]]]], " ", ["get", "dropdownClass", ["loc", [null, [1, 81], [1, 94]]]], " ", ["get", "verticalPositionClass", ["loc", [null, [1, 99], [1, 120]]]], " ", ["get", "horizontalPositionClass", ["loc", [null, [1, 125], [1, 148]]]]]]], ["attribute", "dir", ["get", "dir", ["loc", [null, [1, 158], [1, 161]]]]], ["content", "yield", ["loc", [null, [2, 2], [2, 11]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-basic-dropdown/templates/components/basic-dropdown", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 2
              },
              "end": {
                "line": 35,
                "column": 2
              }
            },
            "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "publicAPI", ["loc", [null, [34, 12], [34, 21]]]]], [], ["loc", [null, [34, 4], [34, 23]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 36,
              "column": 0
            }
          },
          "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "basic-dropdown/content", [], ["animationEnabled", ["subexpr", "@mut", [["get", "animationEnabled", ["loc", [null, [21, 21], [21, 37]]]]], [], []], "appRoot", ["subexpr", "@mut", [["get", "appRoot", ["loc", [null, [22, 12], [22, 19]]]]], [], []], "close", ["subexpr", "@mut", [["get", "publicAPI.actions.close", ["loc", [null, [23, 10], [23, 33]]]]], [], []], "dir", ["subexpr", "@mut", [["get", "dir", ["loc", [null, [24, 8], [24, 11]]]]], [], []], "dropdownClass", ["subexpr", "@mut", [["get", "dropdownClass", ["loc", [null, [25, 18], [25, 31]]]]], [], []], "dropdownId", ["subexpr", "@mut", [["get", "dropdownId", ["loc", [null, [26, 15], [26, 25]]]]], [], []], "horizontalPositionClass", ["subexpr", "@mut", [["get", "_horizontalPositionClass", ["loc", [null, [27, 28], [27, 52]]]]], [], []], "onFocusIn", ["subexpr", "action", ["handleFocusIn"], [], ["loc", [null, [28, 14], [28, 38]]]], "onFocusOut", ["subexpr", "action", ["handleFocusOut"], [], ["loc", [null, [29, 15], [29, 40]]]], "renderInPlace", ["subexpr", "@mut", [["get", "renderInPlace", ["loc", [null, [30, 18], [30, 31]]]]], [], []], "reposition", ["subexpr", "@mut", [["get", "publicAPI.actions.reposition", ["loc", [null, [31, 15], [31, 43]]]]], [], []], "to", ["subexpr", "@mut", [["get", "wormholeDestination", ["loc", [null, [32, 7], [32, 26]]]]], [], []], "verticalPositionClass", ["subexpr", "@mut", [["get", "_verticalPositionClass", ["loc", [null, [33, 26], [33, 48]]]]], [], []]], 0, null, ["loc", [null, [20, 2], [35, 29]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 37,
            "column": 0
          }
        },
        "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "aria-haspopup", "true");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(17);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createAttrMorph(element0, 'aria-controls');
        morphs[2] = dom.createAttrMorph(element0, 'aria-describedby');
        morphs[3] = dom.createAttrMorph(element0, 'aria-disabled');
        morphs[4] = dom.createAttrMorph(element0, 'aria-expanded');
        morphs[5] = dom.createAttrMorph(element0, 'aria-invalid');
        morphs[6] = dom.createAttrMorph(element0, 'aria-label');
        morphs[7] = dom.createAttrMorph(element0, 'aria-labelledby');
        morphs[8] = dom.createAttrMorph(element0, 'aria-pressed');
        morphs[9] = dom.createAttrMorph(element0, 'aria-required');
        morphs[10] = dom.createAttrMorph(element0, 'id');
        morphs[11] = dom.createAttrMorph(element0, 'onfocus');
        morphs[12] = dom.createAttrMorph(element0, 'onkeydown');
        morphs[13] = dom.createAttrMorph(element0, 'role');
        morphs[14] = dom.createAttrMorph(element0, 'tabindex');
        morphs[15] = dom.createMorphAt(element0, 1, 1);
        morphs[16] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["ember-basic-dropdown-trigger ", ["get", "triggerClass", ["loc", [null, [1, 43], [1, 55]]]]]]], ["attribute", "aria-controls", ["get", "dropdownId", ["loc", [null, [2, 18], [2, 28]]]]], ["attribute", "aria-describedby", ["get", "ariaDescribedBy", ["loc", [null, [3, 21], [3, 36]]]]], ["attribute", "aria-disabled", ["get", "disabled", ["loc", [null, [4, 18], [4, 26]]]]], ["attribute", "aria-expanded", ["get", "publicAPI.isOpen", ["loc", [null, [5, 18], [5, 34]]]]], ["attribute", "aria-invalid", ["get", "ariaInvalid", ["loc", [null, [7, 17], [7, 28]]]]], ["attribute", "aria-label", ["get", "ariaLabel", ["loc", [null, [8, 15], [8, 24]]]]], ["attribute", "aria-labelledby", ["get", "ariaLabelledBy", ["loc", [null, [9, 20], [9, 34]]]]], ["attribute", "aria-pressed", ["get", "publicAPI.isOpen", ["loc", [null, [10, 17], [10, 33]]]]], ["attribute", "aria-required", ["get", "ariaRequired", ["loc", [null, [11, 18], [11, 30]]]]], ["attribute", "id", ["get", "triggerId", ["loc", [null, [12, 7], [12, 16]]]]], ["attribute", "onfocus", ["subexpr", "action", ["handleFocus"], [], ["loc", [null, [13, 10], [13, 34]]]]], ["attribute", "onkeydown", ["subexpr", "action", ["keydown"], [], ["loc", [null, [14, 12], [14, 32]]]]], ["attribute", "role", ["get", "role", ["loc", [null, [15, 9], [15, 13]]]]], ["attribute", "tabindex", ["get", "tabIndex", ["loc", [null, [16, 13], [16, 21]]]]], ["inline", "yield", [], ["to", "inverse"], ["loc", [null, [17, 2], [17, 24]]]], ["block", "if", [["get", "publicAPI.isOpen", ["loc", [null, [19, 6], [19, 22]]]]], [], 0, null, ["loc", [null, [19, 0], [36, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('ember-basic-dropdown', ['ember-basic-dropdown/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-app-version/components/app-version', ['exports', 'ember', 'ember-cli-app-version/templates/app-version'], function (exports, _ember, _emberCliAppVersionTemplatesAppVersion) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'span',
    layout: _emberCliAppVersionTemplatesAppVersion['default']
  });
});
define('ember-cli-app-version/initializer-factory', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = initializerFactory;

  var classify = _ember['default'].String.classify;

  function initializerFactory(name, version) {
    var registered = false;

    return function () {
      if (!registered && name && version) {
        var appName = classify(name);
        _ember['default'].libraries.register(appName, version);
        registered = true;
      }
    };
  }
});
define("ember-cli-app-version/templates/app-version", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "modules/ember-cli-app-version/templates/app-version.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "version", ["loc", [null, [1, 0], [1, 11]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('ember-cli-app-version', ['ember-cli-app-version/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-content-security-policy', ['ember-cli-content-security-policy/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-computed-decorators/decorator-alias', ['exports', 'ember-computed-decorators/utils/extract-value'], function (exports, _emberComputedDecoratorsUtilsExtractValue) {
  'use strict';

  exports['default'] = decoratorAlias;

  function decoratorAlias(fn, errorMessage) {
    return function () {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      // determine if user called as @computed('blah', 'blah') or @computed
      if (params.length === 0) {
        throw new Error(errorMessage);
      } else {
        return function (target, key, desc) {
          return {
            enumerable: desc.enumerable,
            configurable: desc.configurable,
            writable: desc.writable,
            initializer: function initializer() {
              var value = (0, _emberComputedDecoratorsUtilsExtractValue['default'])(desc);
              return fn.apply(null, params.concat(value));
            }
          };
        };
      }
    };
  }
});
define('ember-computed-decorators/ember-data', ['exports', 'ember-data', 'ember-computed-decorators/macro-alias'], function (exports, _emberData, _emberComputedDecoratorsMacroAlias) {
  'use strict';

  var attr = (0, _emberComputedDecoratorsMacroAlias['default'])(_emberData['default'].attr);
  exports.attr = attr;

  var hasMany = (0, _emberComputedDecoratorsMacroAlias['default'])(_emberData['default'].hasMany);
  exports.hasMany = hasMany;

  var belongsTo = (0, _emberComputedDecoratorsMacroAlias['default'])(_emberData['default'].belongsTo);
  exports.belongsTo = belongsTo;
});
define('ember-computed-decorators/index', ['exports', 'ember', 'ember-computed-decorators/utils/handle-descriptor', 'ember-computed-decorators/utils/is-descriptor', 'ember-computed-decorators/utils/extract-value', 'ember-computed-decorators/decorator-alias', 'ember-computed-decorators/macro-alias'], function (exports, _ember, _emberComputedDecoratorsUtilsHandleDescriptor, _emberComputedDecoratorsUtilsIsDescriptor, _emberComputedDecoratorsUtilsExtractValue, _emberComputedDecoratorsDecoratorAlias, _emberComputedDecoratorsMacroAlias) {
  'use strict';

  var _slice = Array.prototype.slice;

  exports['default'] = computedDecorator;
  exports.readOnly = readOnly;

  function computedDecorator() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    // determine if user called as @computed('blah', 'blah') or @computed
    if ((0, _emberComputedDecoratorsUtilsIsDescriptor['default'])(params[params.length - 1])) {
      return _emberComputedDecoratorsUtilsHandleDescriptor['default'].apply(undefined, arguments);
    } else {
      return function () /* target, key, desc */{
        return _emberComputedDecoratorsUtilsHandleDescriptor['default'].apply(undefined, _slice.call(arguments).concat([params]));
      };
    }
  }

  function readOnly(target, name, desc) {
    return {
      writable: false,
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      initializer: function initializer() {
        var value = (0, _emberComputedDecoratorsUtilsExtractValue['default'])(desc);
        return value.readOnly();
      }
    };
  }

  var on = (0, _emberComputedDecoratorsDecoratorAlias['default'])(_ember['default'].on, 'Can not `on` without event names');
  exports.on = on;

  var observes = (0, _emberComputedDecoratorsDecoratorAlias['default'])(_ember['default'].observer, 'Can not `observe` without property names');exports.observes = observes;

  var alias = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.alias);
  exports.alias = alias;

  var and = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.and);
  exports.and = and;

  var bool = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.bool);
  exports.bool = bool;

  var collect = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.collect);
  exports.collect = collect;

  var empty = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.empty);
  exports.empty = empty;

  var equal = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.equal);
  exports.equal = equal;

  var filter = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.filter);
  exports.filter = filter;

  var filterBy = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.filterBy);
  exports.filterBy = filterBy;

  var gt = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.gt);
  exports.gt = gt;

  var gte = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.gte);
  exports.gte = gte;

  var intersect = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.intersect);
  exports.intersect = intersect;

  var lt = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.lt);
  exports.lt = lt;

  var lte = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.lte);
  exports.lte = lte;

  var map = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.map);
  exports.map = map;

  var mapBy = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.mapBy);
  exports.mapBy = mapBy;

  var match = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.match);
  exports.match = match;

  var max = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.max);
  exports.max = max;

  var min = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.min);
  exports.min = min;

  var none = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.none);
  exports.none = none;

  var not = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.not);
  exports.not = not;

  var notEmpty = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.notEmpty);
  exports.notEmpty = notEmpty;

  var oneWay = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.oneWay);
  exports.oneWay = oneWay;

  var or = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.or);
  exports.or = or;

  var reads = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.reads);
  exports.reads = reads;

  var setDiff = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.setDiff);
  exports.setDiff = setDiff;

  var sort = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.sort);
  exports.sort = sort;

  var sum = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.sum);
  exports.sum = sum;

  var union = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.union);
  exports.union = union;

  var uniq = (0, _emberComputedDecoratorsMacroAlias['default'])(_ember['default'].computed.uniq);
  exports.uniq = uniq;
});
define('ember-computed-decorators/macro-alias', ['exports', 'ember-computed-decorators/utils/is-descriptor'], function (exports, _emberComputedDecoratorsUtilsIsDescriptor) {
  'use strict';

  exports['default'] = macroAlias;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function handleDescriptor(target, property, desc, fn) {
    var params = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

    return {
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      writable: desc.writable,
      initializer: function initializer() {
        return fn.apply(undefined, _toConsumableArray(params));
      }
    };
  }
  function macroAlias(fn) {
    return function () {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if ((0, _emberComputedDecoratorsUtilsIsDescriptor['default'])(params[params.length - 1])) {
        return handleDescriptor.apply(undefined, params.concat([fn]));
      } else {
        return function (target, property, desc) {
          return handleDescriptor(target, property, desc, fn, params);
        };
      }
    };
  }
});
define('ember-computed-decorators/utils/extract-value', ['exports'], function (exports) {
  'use strict';

  exports['default'] = extractValue;

  function extractValue(desc) {
    return desc.value || typeof desc.initializer === 'function' && desc.initializer();
  }
});
define('ember-computed-decorators/utils/handle-descriptor', ['exports', 'ember', 'ember-computed-decorators/utils/extract-value'], function (exports, _ember, _emberComputedDecoratorsUtilsExtractValue) {
  'use strict';

  exports['default'] = handleDescriptor;

  var computed = _ember['default'].computed;
  var expandProperties = _ember['default'].expandProperties;
  var get = _ember['default'].get;

  function handleDescriptor(target, key, desc) {
    var params = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

    return {
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      writeable: desc.writeable,
      initializer: function initializer() {
        var computedDescriptor = undefined;

        if (desc.writable) {
          var val = (0, _emberComputedDecoratorsUtilsExtractValue['default'])(desc);
          if (typeof val === 'object') {
            var value = {};
            if (val.get) {
              value.get = callUserSuppliedGet(params, val.get);
            }
            if (val.set) {
              value.set = callUserSuppliedSet(params, val.set);
            }
            computedDescriptor = value;
          } else {
            computedDescriptor = callUserSuppliedGet(params, val);
          }
        } else {
          throw new Error('ember-computed-decorators does not support using getters and setters');
        }

        return computed.apply(null, params.concat(computedDescriptor));
      }
    };
  }

  function expandPropertyList(propertyList) {
    return propertyList.reduce(function (newPropertyList, property) {
      var atEachIndex = property.indexOf('.@each');
      if (atEachIndex !== -1) {
        return newPropertyList.concat(property.slice(0, atEachIndex));
      } else if (property.slice(-2) === '[]') {
        return newPropertyList.concat(property.slice(0, -3));
      }

      expandProperties(property, function (expandedProperties) {
        newPropertyList = newPropertyList.concat(expandedProperties);
      });

      return newPropertyList;
    }, []);
  }

  function callUserSuppliedGet(params, func) {
    var expandedParams = expandPropertyList(params);
    return function () {
      var _this = this;

      var paramValues = expandedParams.map(function (p) {
        return get(_this, p);
      });

      return func.apply(this, paramValues);
    };
  }

  function callUserSuppliedSet(params, func) {
    var expandedParams = expandPropertyList(params);
    return function (key, value) {
      var _this2 = this;

      var paramValues = expandedParams.map(function (p) {
        return get(_this2, p);
      });
      paramValues.unshift(value);

      return func.apply(this, paramValues);
    };
  }
});
define('ember-computed-decorators/utils/is-descriptor', ['exports'], function (exports) {
  'use strict';

  exports['default'] = isDescriptor;

  function isDescriptor(item) {
    return item && typeof item === 'object' && 'writable' in item && 'enumerable' in item && 'configurable' in item;
  }
});
define('ember-computed-decorators', ['ember-computed-decorators/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-font-awesome/components/fa-icon', ['exports', 'ember', 'ember-computed-decorators', 'ember-font-awesome/utils/try-match', 'ember-font-awesome/utils/optional-decorator'], function (exports, _ember, _emberComputedDecorators, _emberFontAwesomeUtilsTryMatch, _emberFontAwesomeUtilsOptionalDecorator) {
  'use strict';

  function _createDecoratedObject(descriptors) {
    var target = {};for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];var decorators = descriptor.decorators;var key = descriptor.key;delete descriptor.key;delete descriptor.decorators;descriptor.enumerable = true;descriptor.configurable = true;if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];if (typeof decorator === 'function') {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
          }
        }
      }if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }Object.defineProperty(target, key, descriptor);
    }return target;
  }

  var FaIconComponent = _ember['default'].Component.extend(_createDecoratedObject([{
    key: 'tagName',
    initializer: function initializer() {
      return 'i';
    }
  }, {
    key: 'classNames',
    initializer: function initializer() {
      return ['fa'];
    }
  }, {
    key: 'classNameBindings',
    initializer: function initializer() {
      return ['iconCssClass', 'flipCssClass', 'rotateCssClass', 'sizeCssClass', 'pullCssClass', 'stackCssClass', 'spin:fa-spin', 'fixedWidth:fa-fw', 'listItem:fa-li', 'border:fa-border', 'pulse:fa-pulse', 'inverse:fa-inverse'];
    }
  }, {
    key: 'attributeBindings',
    initializer: function initializer() {
      return ['ariaHiddenAttribute:aria-hidden', 'title'];
    }
  }, {
    key: 'iconCssClass',
    decorators: [(0, _emberComputedDecorators['default'])('icon', 'params.[]')],
    value: function iconCssClass(icon, params) {
      icon = icon || params[0];
      if (icon) {
        return (0, _emberFontAwesomeUtilsTryMatch['default'])(icon, /^fa-/) ? icon : 'fa-' + icon;
      }
    }
  }, {
    key: 'flipCssClass',
    decorators: [_emberFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('flip')],
    value: function flipCssClass(flip) {
      return (0, _emberFontAwesomeUtilsTryMatch['default'])(flip, /^fa-flip/) ? flip : 'fa-flip-' + flip;
    }
  }, {
    key: 'rotateCssClass',
    decorators: [_emberFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('rotate')],
    value: function rotateCssClass(rotate) {
      if ((0, _emberFontAwesomeUtilsTryMatch['default'])(rotate, /^fa-rotate/)) {
        return rotate;
      } else {
        return 'fa-rotate-' + rotate;
      }
    }
  }, {
    key: 'sizeCssClass',
    decorators: [_emberFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('size')],
    value: function sizeCssClass(size) {
      if ((0, _emberFontAwesomeUtilsTryMatch['default'])(size, /^fa-/)) {
        return size;
      } else if ((0, _emberFontAwesomeUtilsTryMatch['default'])(size, /(?:lg|x)$/)) {
        return 'fa-' + size;
      } else {
        return 'fa-' + size + 'x';
      }
    }
  }, {
    key: 'pullCssClass',
    decorators: [_emberFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('pull')],
    value: function pullCssClass(pull) {
      return 'fa-pull-' + pull;
    }
  }, {
    key: 'stackCssClass',
    decorators: [_emberFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('stack')],
    value: function stackCssClass(stack) {
      if ((0, _emberFontAwesomeUtilsTryMatch['default'])(stack, /^fa-/)) {
        return stack;
      } else if ((0, _emberFontAwesomeUtilsTryMatch['default'])(stack, /x$/)) {
        return 'fa-stack-' + stack;
      } else {
        return 'fa-stack-' + stack + 'x';
      }
    }
  }, {
    key: 'ariaHiddenAttribute',
    decorators: [(0, _emberComputedDecorators['default'])('ariaHidden')],
    value: function ariaHiddenAttribute(ariaHidden) {
      return ariaHidden !== false ? true : undefined;
    }
  }]));

  FaIconComponent.reopenClass({
    positionalParams: 'params'
  });

  exports['default'] = FaIconComponent;
});
define('ember-font-awesome/components/fa-list', ['exports', 'ember', 'ember-font-awesome/templates/components/fa-list'], function (exports, _ember, _emberFontAwesomeTemplatesComponentsFaList) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberFontAwesomeTemplatesComponentsFaList['default'],
    tagName: 'ul',
    classNames: 'fa-ul'
  });
});
define('ember-font-awesome/components/fa-stack', ['exports', 'ember', 'ember-computed-decorators', 'ember-font-awesome/utils/try-match', 'ember-font-awesome/utils/optional-decorator', 'ember-font-awesome/templates/components/fa-stack'], function (exports, _ember, _emberComputedDecorators, _emberFontAwesomeUtilsTryMatch, _emberFontAwesomeUtilsOptionalDecorator, _emberFontAwesomeTemplatesComponentsFaStack) {
  'use strict';

  function _createDecoratedObject(descriptors) {
    var target = {};for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];var decorators = descriptor.decorators;var key = descriptor.key;delete descriptor.key;delete descriptor.decorators;descriptor.enumerable = true;descriptor.configurable = true;if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];if (typeof decorator === 'function') {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
          }
        }
      }if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }Object.defineProperty(target, key, descriptor);
    }return target;
  }

  exports['default'] = _ember['default'].Component.extend(_createDecoratedObject([{
    key: 'layout',
    initializer: function initializer() {
      return _emberFontAwesomeTemplatesComponentsFaStack['default'];
    }
  }, {
    key: 'tagName',
    initializer: function initializer() {
      return 'span';
    }
  }, {
    key: 'classNames',
    initializer: function initializer() {
      return 'fa-stack';
    }
  }, {
    key: 'classNameBindings',
    initializer: function initializer() {
      return ['sizeCssClass'];
    }
  }, {
    key: 'sizeCssClass',
    decorators: [_emberFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('size')],
    value: function sizeCssClass(size) {
      if ((0, _emberFontAwesomeUtilsTryMatch['default'])(size, /^fa-/)) {
        return size;
      } else if ((0, _emberFontAwesomeUtilsTryMatch['default'])(size, /(?:lg|x)$/)) {
        return 'fa-' + size;
      } else {
        return 'fa-' + size + 'x';
      }
    }
  }]));
});
define("ember-font-awesome/templates/components/fa-list", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "modules/ember-font-awesome/templates/components/fa-list.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "hash", [], ["fa-icon", ["subexpr", "component", ["fa-icon"], ["listItem", true], ["loc", [null, [1, 22], [1, 57]]]]], ["loc", [null, [1, 8], [1, 58]]]]], [], ["loc", [null, [1, 0], [1, 60]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-font-awesome/templates/components/fa-stack", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "modules/ember-font-awesome/templates/components/fa-stack.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "hash", [], ["stack-1x", ["subexpr", "component", ["fa-icon"], ["stack", "1"], ["loc", [null, [2, 11], [2, 42]]]], "stack-2x", ["subexpr", "component", ["fa-icon"], ["stack", "2"], ["loc", [null, [3, 11], [3, 42]]]]], ["loc", [null, [1, 8], [4, 1]]]]], [], ["loc", [null, [1, 0], [4, 3]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-font-awesome/utils/optional-decorator", ["exports"], function (exports) {
  "use strict";

  exports["default"] = optional;

  function optional(object, attributeName, descriptor) {
    var originalFunction = descriptor.value;

    descriptor.value = function () {
      var args = [].slice.call(arguments, 0);
      if (args.some(function (value) {
        return value != null;
      })) {
        return originalFunction.apply(undefined, arguments);
      }
    };

    return descriptor;
  }
});
define('ember-font-awesome/utils/try-match', ['exports'], function (exports) {
  'use strict';

  exports['default'] = function (object, regex) {
    return typeof object === 'string' && object.match(regex);
  };
});
define('ember-font-awesome', ['ember-font-awesome/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define("ember-get-config/index", ["exports"], function (exports) {
  "use strict";

  var configName = Object.keys(window.requirejs.entries).filter(function (entry) {
    return entry.match(/\/config\/environment/);
  })[0];

  exports["default"] = window.requirejs(configName)["default"];
});
define('ember-get-config', ['ember-get-config/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-getowner-polyfill/fake-owner', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  })();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  var CONTAINER = '__' + new Date() + '_container';
  var REGISTRY = '__' + new Date() + '_registry';

  var FakeOwner = (function () {
    function FakeOwner(object) {
      _classCallCheck(this, FakeOwner);

      this[CONTAINER] = object.container;

      if (_ember['default'].Registry) {
        // object.container._registry is used by 1.11
        this[REGISTRY] = object.container.registry || object.container._registry;
      } else {
        // Ember < 1.12
        this[REGISTRY] = object.container;
      }
    }

    // ContainerProxyMixin methods
    //
    // => http://emberjs.com/api/classes/ContainerProxyMixin.html
    //

    _createClass(FakeOwner, [{
      key: 'lookup',
      value: function lookup() {
        var _CONTAINER;

        return (_CONTAINER = this[CONTAINER]).lookup.apply(_CONTAINER, arguments);
      }
    }, {
      key: '_lookupFactory',
      value: function _lookupFactory() {
        var _CONTAINER2;

        return (_CONTAINER2 = this[CONTAINER]).lookupFactory.apply(_CONTAINER2, arguments);
      }

      // RegistryProxyMixin methods
      //
      // => http://emberjs.com/api/classes/RegistryProxyMixin.html
      //
    }, {
      key: 'hasRegistration',
      value: function hasRegistration() {
        var _REGISTRY;

        return (_REGISTRY = this[REGISTRY]).has.apply(_REGISTRY, arguments);
      }
    }, {
      key: 'inject',
      value: function inject() {
        var _REGISTRY2;

        return (_REGISTRY2 = this[REGISTRY]).injection.apply(_REGISTRY2, arguments);
      }
    }, {
      key: 'register',
      value: function register() {
        var _REGISTRY3;

        return (_REGISTRY3 = this[REGISTRY]).register.apply(_REGISTRY3, arguments);
      }
    }, {
      key: 'registerOption',
      value: function registerOption() {
        var _REGISTRY4;

        return (_REGISTRY4 = this[REGISTRY]).option.apply(_REGISTRY4, arguments);
      }
    }, {
      key: 'registerOptions',
      value: function registerOptions() {
        var _REGISTRY5;

        return (_REGISTRY5 = this[REGISTRY]).options.apply(_REGISTRY5, arguments);
      }
    }, {
      key: 'registerOptionsForType',
      value: function registerOptionsForType() {
        var _REGISTRY6;

        return (_REGISTRY6 = this[REGISTRY]).optionsForType.apply(_REGISTRY6, arguments);
      }
    }, {
      key: 'registeredOption',
      value: function registeredOption() {
        var _REGISTRY7;

        return (_REGISTRY7 = this[REGISTRY]).getOption.apply(_REGISTRY7, arguments);
      }
    }, {
      key: 'registeredOptions',
      value: function registeredOptions() {
        var _REGISTRY8;

        return (_REGISTRY8 = this[REGISTRY]).getOptions.apply(_REGISTRY8, arguments);
      }
    }, {
      key: 'registeredOptionsForType',
      value: function registeredOptionsForType(type) {
        if (this[REGISTRY].getOptionsForType) {
          var _REGISTRY9;

          return (_REGISTRY9 = this[REGISTRY]).getOptionsForType.apply(_REGISTRY9, arguments);
        } else {
          // used for Ember 1.10
          return this[REGISTRY]._typeOptions[type];
        }
      }
    }, {
      key: 'resolveRegistration',
      value: function resolveRegistration() {
        var _REGISTRY10;

        return (_REGISTRY10 = this[REGISTRY]).resolve.apply(_REGISTRY10, arguments);
      }
    }, {
      key: 'unregister',
      value: function unregister() {
        var _REGISTRY11;

        return (_REGISTRY11 = this[REGISTRY]).unregister.apply(_REGISTRY11, arguments);
      }
    }]);

    return FakeOwner;
  })();

  exports['default'] = FakeOwner;
});
define('ember-getowner-polyfill/index', ['exports', 'ember', 'ember-getowner-polyfill/fake-owner'], function (exports, _ember, _emberGetownerPolyfillFakeOwner) {
  'use strict';

  var hasGetOwner = !!_ember['default'].getOwner;

  exports['default'] = function (object) {
    var owner = undefined;

    if (hasGetOwner) {
      owner = _ember['default'].getOwner(object);
    }

    if (!owner && object.container) {
      owner = new _emberGetownerPolyfillFakeOwner['default'](object);
    }

    return owner;
  };
});
define('ember-getowner-polyfill', ['ember-getowner-polyfill/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-hash-helper-polyfill/helpers/hash', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.hash = hash;

  function hash(_, obj) {
    return obj;
  }

  exports['default'] = _ember['default'].Helper.helper(hash);
});
define('ember-hash-helper-polyfill', ['ember-hash-helper-polyfill/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-power-select/components/power-select/before-options', ['exports', 'ember', 'ember-power-select/templates/components/power-select/before-options', 'ember-power-select/utils/update-input-value'], function (exports, _ember, _emberPowerSelectTemplatesComponentsPowerSelectBeforeOptions, _emberPowerSelectUtilsUpdateInputValue) {
  'use strict';

  var run = _ember['default'].run;

  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    layout: _emberPowerSelectTemplatesComponentsPowerSelectBeforeOptions['default'],

    // Lifecycle hooks
    didReceiveAttrs: function didReceiveAttrs(_ref) {
      var oldAttrs = _ref.oldAttrs;
      var newAttrs = _ref.newAttrs;

      this._super.apply(this, arguments);
      if (newAttrs.searchText !== undefined && newAttrs.searchText !== null) {
        run.scheduleOnce('afterRender', this, this.updateInput, newAttrs.searchText);
      }
    },

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.focusInput();
      this.get('eventSender').on('focus', this, this.focusInput);
    },

    willDestroy: function willDestroy() {
      this._super.apply(this, arguments);
      if (this.get('searchEnabled')) {
        this.get('select.actions.search')('');
      }
      this.get('eventSender').off('focus', this, this.focusInput);
    },

    // Actions
    actions: {
      handleKeydown: function handleKeydown(e) {
        var select = this.get('select');
        if (e.keyCode === 13) {
          var onkeydown = this.get('onkeydown');
          if (onkeydown) {
            onkeydown(select, e);
          }
          if (e.defaultPrevented) {
            return;
          }
          select.actions.choose(this.get('highlighted'), e);
        } else if (e.keyCode === 32) {
          // noop
        } else {
            select.actions.handleKeydown(e);
          }
      }
    },

    // Methods
    updateInput: function updateInput(value) {
      (0, _emberPowerSelectUtilsUpdateInputValue['default'])(this.input, value);
    },

    focusInput: function focusInput() {
      this.input = self.document.querySelector('.ember-power-select-search input');
      if (this.input) {
        run.scheduleOnce('afterRender', this.input, 'focus');
      }
    }
  });
});
define('ember-power-select/components/power-select/options', ['exports', 'ember', 'ember-power-select/templates/components/power-select/options'], function (exports, _ember, _emberPowerSelectTemplatesComponentsPowerSelectOptions) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    isTouchDevice: !!self.window && 'ontouchstart' in self.window,
    layout: _emberPowerSelectTemplatesComponentsPowerSelectOptions['default'],
    tagName: 'ul',
    attributeBindings: ['role', 'aria-controls'],
    role: 'listbox',

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      if (this.get('role') === 'group') {
        return;
      }
      var findOptionAndPerform = function findOptionAndPerform(action, e) {
        var optionItem = _ember['default'].$(e.target).closest('[data-option-index]');
        if (!optionItem || !(0 in optionItem)) {
          return;
        }
        action(_this._optionFromIndex(optionItem[0].dataset.optionIndex), e);
      };
      this.element.addEventListener('mouseup', function (e) {
        return findOptionAndPerform(_this.get('select.actions.choose'), e);
      });
      this.element.addEventListener('mouseover', function (e) {
        return findOptionAndPerform(_this.get('select.actions.highlight'), e);
      });
      if (this.get('isTouchDevice')) {
        this._addTouchEvents();
      }
    },

    // Methods
    _addTouchEvents: function _addTouchEvents() {
      var _this2 = this;

      var touchMoveHandler = function touchMoveHandler() {
        _this2.hasMoved = true;
        _this2.element.removeEventListener('touchmove', touchMoveHandler);
      };
      // Add touch event handlers to detect taps
      this.element.addEventListener('touchstart', function () {
        _this2.element.addEventListener('touchmove', touchMoveHandler);
      });
      this.element.addEventListener('touchend', function (e) {
        var optionItem = _ember['default'].$(e.target).closest('[data-option-index]');

        if (!optionItem || !(0 in optionItem)) {
          return;
        }

        e.preventDefault();
        if (_this2.hasMoved) {
          _this2.hasMoved = false;
          return;
        }

        _this2.get('select.actions.choose')(_this2._optionFromIndex(optionItem[0].dataset.optionIndex), e);
      });
    },

    _optionFromIndex: function _optionFromIndex(index) {
      var parts = index.split('.');
      var options = this.get('options');
      if (!options.objectAt) {
        options = _ember['default'].A(options);
      }
      var option = options.objectAt(parseInt(parts[0], 10));
      for (var i = 1; i < parts.length; i++) {
        var groupOptions = option.options;
        if (!groupOptions.objectAt) {
          groupOptions = _ember['default'].A(groupOptions);
        }
        option = groupOptions.objectAt(parseInt(parts[i], 10));
      }
      return option;
    }
  });
});
define('ember-power-select/components/power-select/trigger', ['exports', 'ember', 'ember-power-select/templates/components/power-select/trigger'], function (exports, _ember, _emberPowerSelectTemplatesComponentsPowerSelectTrigger) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberPowerSelectTemplatesComponentsPowerSelectTrigger['default'],
    tagName: '',

    // Actions
    actions: {
      clear: function clear(e) {
        e.stopPropagation();
        this.get('select.actions.select')(null);
      }
    }
  });
});
define('ember-power-select/components/power-select-multiple/trigger', ['exports', 'ember', 'ember-power-select/templates/components/power-select-multiple/trigger', 'ember-power-select/utils/update-input-value'], function (exports, _ember, _emberPowerSelectTemplatesComponentsPowerSelectMultipleTrigger, _emberPowerSelectUtilsUpdateInputValue) {
  'use strict';

  var computed = _ember['default'].computed;
  var get = _ember['default'].get;
  var isBlank = _ember['default'].isBlank;
  var run = _ember['default'].run;
  var htmlSafe = _ember['default'].String.htmlSafe;

  var ua = self.window ? self.window.navigator.userAgent : '';
  var isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  var isTouchDevice = _ember['default'].testing || !!self.window && 'ontouchstart' in self.window;

  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    layout: _emberPowerSelectTemplatesComponentsPowerSelectMultipleTrigger['default'],

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      this.input = document.querySelector('.' + this.elementId + '-input');
      var optionsList = document.getElementById(this.elementId + '-ember-power-select-multiple-options');
      var chooseOption = function chooseOption(e) {
        if (e.target.dataset.selectedIndex) {
          e.stopPropagation();
          e.preventDefault();

          var index = e.target.dataset.selectedIndex;
          var selected = _this.get('selected');
          var object = _this.selectedObject(selected, index);

          _this.get('select.actions.choose')(object);
        }
      };
      if (isTouchDevice) {
        optionsList.addEventListener('touchstart', chooseOption);
      }
      optionsList.addEventListener('mousedown', chooseOption);
    },

    didUpdateAttrs: function didUpdateAttrs(_ref) {
      var oldAttrs = _ref.oldAttrs;
      var newAttrs = _ref.newAttrs;

      this._super.apply(this, arguments);
      if (oldAttrs.select.isOpen && !newAttrs.select.isOpen) {
        this.handleClose();
      }
      if (newAttrs.searchText !== undefined && newAttrs.searchText !== null) {
        run.scheduleOnce('afterRender', this, this.updateInput, newAttrs.searchText);
      }
    },

    // CPs
    triggerMultipleInputStyle: computed('searchText.length', 'selected.length', function () {
      run.scheduleOnce('afterRender', this.get('select.actions.reposition'));
      if (!this.get('selected.length')) {
        return htmlSafe('width: 100%;');
      } else {
        return htmlSafe('width: ' + ((this.get('searchText.length') || 0) * 0.5 + 1.5) + 'em');
      }
    }),

    maybePlaceholder: computed('placeholder', 'selected.length', function () {
      if (isIE) {
        return null;
      }
      var selected = this.get('selected');
      return !selected || get(selected, 'length') === 0 ? this.get('placeholder') || '' : '';
    }),

    // Actions
    actions: {
      handleInput: function handleInput(e) {
        var action = this.get('handleInput');
        if (action) {
          action(e);
        }
        if (e.defaultPrevented) {
          return;
        }
        this.get('select.actions.open')(e);
      },

      handleKeydown: function handleKeydown(e) {
        var _getProperties = this.getProperties('onkeydown', 'select');

        var onkeydown = _getProperties.onkeydown;
        var select = _getProperties.select;

        if (onkeydown && onkeydown(select, e) === false) {
          return false;
        }
        var selected = _ember['default'].A(this.get('selected') || []);
        if (e.keyCode === 8 && isBlank(e.target.value)) {
          var lastSelection = get(selected, 'lastObject');
          if (lastSelection) {
            select.actions.select(this.get('buildSelection')(lastSelection), e);
            if (typeof lastSelection === 'string') {
              select.actions.search(lastSelection);
            } else {
              var searchField = this.get('searchField');
              _ember['default'].assert('`{{power-select-multiple}}` requires a `searchField` when the options are not strings to remove options using backspace', searchField);
              select.actions.search(get(lastSelection, searchField));
            }
            select.actions.open(e);
          }
        } else if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32) {
          // Keys 0-9, a-z or SPACE
          e.stopPropagation();
        }
      }
    },

    // Methods
    handleClose: function handleClose() {
      run.scheduleOnce('actions', null, this.get('select.actions.search'), '');
    },

    updateInput: function updateInput(value) {
      (0, _emberPowerSelectUtilsUpdateInputValue['default'])(this.input, value);
    },

    selectedObject: function selectedObject(list, index) {
      if (list.objectAt) {
        return list.objectAt(index);
      } else {
        return get(list, index);
      }
    }
  });
});
define('ember-power-select/components/power-select-multiple', ['exports', 'ember', 'ember-power-select/templates/components/power-select-multiple', 'ember-power-select/utils/computed-fallback-if-undefined'], function (exports, _ember, _emberPowerSelectTemplatesComponentsPowerSelectMultiple, _emberPowerSelectUtilsComputedFallbackIfUndefined) {
  'use strict';

  var computed = _ember['default'].computed;

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberPowerSelectTemplatesComponentsPowerSelectMultiple['default'],
    // Config
    triggerComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select-multiple/trigger'),
    beforeOptionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),

    // CPs
    concatenatedTriggerClass: computed('triggerClass', function () {
      var classes = ['ember-power-select-multiple-trigger'];
      if (this.get('triggerClass')) {
        classes.push(this.get('triggerClass'));
      }
      return classes.join(' ');
    }),

    // Actions
    actions: {
      handleOpen: function handleOpen(select, e) {
        var action = this.get('onopen');
        if (action && action(select, e) === false) {
          return false;
        }
        this.focusInput();
      },

      handleFocus: function handleFocus(select, e) {
        var action = this.get('onfocus');
        if (action) {
          action(select, e);
        }
        this.focusInput();
      },

      handleKeydown: function handleKeydown(select, e) {
        var action = this.get('onkeydown');
        if (action && action(select, e) === false) {
          e.stopPropagation();
          return false;
        }
        var selected = _ember['default'].A(this.get('selected') || []);
        if (e.keyCode === 13 && select.isOpen) {
          e.stopPropagation();
          if (select.highlighted !== undefined) {
            if (selected.indexOf(select.highlighted) === -1) {
              select.actions.choose(select.highlighted, e);
            } else {
              select.actions.close(e);
            }
          } else {
            select.actions.close(e);
          }
        }
      },

      buildSelection: function buildSelection(option) {
        var newSelection = (this.get('selected') || []).slice(0);
        var idx = newSelection.indexOf(option);
        if (idx > -1) {
          newSelection.splice(idx, 1);
        } else {
          newSelection.push(option);
        }
        return newSelection;
      }
    },

    // Methods
    focusInput: function focusInput() {
      var input = this.element.querySelector('.ember-power-select-trigger-multiple-input');
      if (input) {
        input.focus();
      }
    }
  });
});
define('ember-power-select/components/power-select', ['exports', 'ember', 'ember-power-select/templates/components/power-select', 'ember-power-select/utils/group-utils', 'ember-power-select/utils/computed-fallback-if-undefined'], function (exports, _ember, _emberPowerSelectTemplatesComponentsPowerSelect, _emberPowerSelectUtilsGroupUtils, _emberPowerSelectUtilsComputedFallbackIfUndefined) {
  'use strict';

  var computed = _ember['default'].computed;
  var run = _ember['default'].run;
  var get = _ember['default'].get;
  var isBlank = _ember['default'].isBlank;

  var EventSender = _ember['default'].Object.extend(_ember['default'].Evented);
  var assign = _ember['default'].assign || _ember['default'].merge;
  function concatWithProperty(strings, property) {
    if (property) {
      strings.push(property);
    }
    return strings.join(' ');
  }

  exports['default'] = _ember['default'].Component.extend({
    // HTML
    layout: _emberPowerSelectTemplatesComponentsPowerSelect['default'],
    tagName: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(''),

    // Config
    disabled: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(false),
    placeholder: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    loadingMessage: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('Loading options...'),
    noMatchesMessage: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('No results found'),
    verticalPosition: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('auto'),
    horizontalPosition: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('auto'),
    matcher: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(_emberPowerSelectUtilsGroupUtils.defaultMatcher),
    searchField: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    search: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    closeOnSelect: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(true),
    dropdownClass: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    triggerClass: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    dir: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    initiallyOpened: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(false),
    searchEnabled: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(true),
    searchMessage: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])("Type to search"),
    searchPlaceholder: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    allowClear: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(false),
    triggerComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select/trigger'),
    selectedItemComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    optionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select/options'),
    beforeOptionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select/before-options'),
    afterOptionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    matchTriggerWidth: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(true),

    // Attrs
    searchText: '',
    lastSearchedText: '',
    expirableSearchText: '',
    activeSearch: null,
    openingEvent: null,
    loading: false,
    previousResults: null,

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].assert('{{power-select}} requires an `onchange` function', this.get('onchange') && typeof this.get('onchange') === 'function');
    },

    willDestroy: function willDestroy() {
      this._super.apply(this, arguments);
      this.activeSearch = null;
      run.cancel(this.expirableSearchDebounceId);
    },

    // CPs
    triggerId: computed(function () {
      return 'ember-power-select-trigger-' + this.elementId;
    }),

    optionsId: computed(function () {
      return 'ember-power-select-options-' + this.elementId;
    }),

    concatenatedClasses: computed('class', function () {
      return concatWithProperty(['ember-power-select'], this.get('class'));
    }),

    concatenatedTriggerClasses: computed('triggerClass', function () {
      return concatWithProperty(['ember-power-select-trigger'], this.get('triggerClass'));
    }),

    concatenatedDropdownClasses: computed('dropdownClass', function () {
      return concatWithProperty(['ember-power-select-dropdown', 'ember-power-select-dropdown-' + this.elementId], this.get('dropdownClass'));
    }),

    mustShowSearchMessage: computed('searchText', 'search', 'searchMessage', 'results.length', function () {
      return this.get('searchText.length') === 0 && !!this.get('search') && !!this.get('searchMessage') && this.get('results.length') === 0;
    }),

    mustShowNoMessages: computed('results.length', 'loading', 'search', 'lastSearchedText', function () {
      return !this.get('loading') && this.get('results.length') === 0 && (!this.get('search') || this.get('lastSearchedText.length') > 0);
    }),

    results: computed('options.[]', {
      get: function get() {
        var _this = this;

        var options = this.get('options') || [];
        var searchAction = this.get('search');
        if (options.then) {
          this.set('loading', true);
          options.then(function (results) {
            if (_this.get('isDestroyed')) {
              return;
            }
            _this.set('results', results);
          });
          return this.previousResults || [];
        }
        var newResults = searchAction ? options : this.filter(options, this.get('searchText'));
        this.setProperties({ loading: false, currentlyHighlighted: undefined });
        this.previousResults = newResults;
        return newResults;
      },
      set: function set(_, newResults) {
        this.previousResults = newResults;
        this.setProperties({ loading: false, currentlyHighlighted: undefined });
        return newResults;
      }
    }),

    resolvedSelected: computed('selected', {
      get: function get() {
        var _this2 = this;

        var selected = this.get('selected');
        if (selected && selected.then) {
          selected.then(function (value) {
            if (_this2.get('isDestroyed')) {
              return;
            }
            // Ensure that we don't overwrite new value
            if (_this2.get('selected') === selected) {
              _this2.set('resolvedSelected', value);
            }
          });
        } else {
          return selected;
        }
      },
      set: function set(_, v) {
        return v;
      }
    }),

    optionMatcher: computed('searchField', 'matcher', function () {
      var _getProperties = this.getProperties('matcher', 'searchField');

      var matcher = _getProperties.matcher;
      var searchField = _getProperties.searchField;

      if (searchField) {
        return function (option, text) {
          return matcher(get(option, searchField), text);
        };
      } else {
        return function (option, text) {
          return matcher(option, text);
        };
      }
    }),

    highlighted: computed('results.[]', 'currentlyHighlighted', 'resolvedSelected', function () {
      return this.get('currentlyHighlighted') || this.defaultHighlighted();
    }),

    resultsLength: computed('results.[]', function () {
      return (0, _emberPowerSelectUtilsGroupUtils.countOptions)(this.get('results'));
    }),

    eventSender: computed(function () {
      return EventSender.create();
    }),

    publicAPI: computed('registeredDropdown.isOpen', 'highlighted', 'searchText', function () {
      var _this3 = this;

      var dropdown = this.get('registeredDropdown');
      if (dropdown) {
        var ownActions = {
          search: function search(term, e) {
            return _this3.send('search', dropdown, term, e);
          },
          highlight: function highlight(option) {
            return _this3.send('highlight', dropdown, option);
          },
          select: function select(selected, e) {
            return _this3.send('select', dropdown, selected, e);
          },
          choose: function choose(selected, e) {
            return _this3._doChoose(dropdown, selected, e);
          },
          handleKeydown: function handleKeydown(e) {
            return _this3.send('handleKeydown', dropdown, e);
          }
        };
        return {
          isOpen: dropdown.isOpen,
          highlighted: this.get('highlighted'),
          searchText: this.get('searchText'),
          actions: assign(ownActions, dropdown.actions)
        };
      }
      return {};
    }),

    // Actions
    actions: {
      highlight: function highlight(dropdown, option) {
        this._doHighlight(dropdown, option);
      },

      search: function search(dropdown, term /*, e */) {
        this._doSearch(dropdown, term);
      },

      handleInput: function handleInput(e) {
        var term = e.target.value;
        var action = this.get('oninput');
        if (action) {
          var returnValue = action(e.target.value, this.get('publicAPI'), e);
          if (returnValue === false) {
            return;
          }
        }
        this.send('search', this.get('registeredDropdown'), term, e);
      },

      select: function select(dropdown, selected, e) {
        return this._doSelect(dropdown, selected, e);
      },

      choose: function choose(dropdown, selection, e) {
        return this._doChoose(dropdown, selection, e);
      },

      handleKeydown: function handleKeydown(dropdown, e) {
        var onkeydown = this.get('onkeydown');
        if (onkeydown && onkeydown(this.get('publicAPI'), e) === false) {
          return false;
        }
        if (e.keyCode === 38 || e.keyCode === 40) {
          // Up & Down
          return this._handleKeyUpDown(dropdown, e);
        } else if (e.keyCode === 13) {
          // ENTER
          return this._handleKeyEnter(dropdown, e);
        } else if (e.keyCode === 32) {
          // Space
          return this._handleKeySpace(dropdown, e);
        } else if (e.keyCode === 9) {
          // Tab
          return this._handleKeyTab(dropdown, e);
        } else if (e.keyCode === 27) {
          // ESC
          return this._handleKeyESC(dropdown, e);
        } else if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32) {
          // Keys 0-9, a-z or SPACE
          return this._handleTriggerTyping(dropdown, e);
        }
      },

      handleFocus: function handleFocus(dropdown, event) {
        var action = this.get('onfocus');
        if (action) {
          action(this.get('publicAPI'), event);
        }
        this.get('eventSender').trigger('focus');
      },

      // It is not evident what is going on here, so I'll explain why.
      //
      // As of this writting, Ember doesn allow to yield data to the "inverse" block.
      // Because of that, elements of this component rendered in the trigger can't receive the
      // yielded object contaning the public API of the ember-basic-dropdown, with actions for open,
      // close and toggle.
      //
      // The only possible workaround for this is to on initialization inject a similar object
      // to the one yielded and store it to make it available in the entire component.
      //
      // This this limitation on ember should be fixed soon, this is temporary. Because of that this
      // object will be passed to the action from the inverse block like if it was yielded.
      //
      registerDropdown: function registerDropdown(dropdown) {
        this.set('registeredDropdown', dropdown);
      },

      handleOpen: function handleOpen(dropdown, e) {
        var action = this.get('onopen');
        if (action) {
          var returnValue = action(this.get('publicAPI'), e);
          if (returnValue === false || e && e.defaultPrevented) {
            return false;
          }
        }
        if (e) {
          this.set('openingEvent', e);
        }
        run.scheduleOnce('afterRender', this, this.scrollIfHighlightedIsOutOfViewport);
      },

      handleClose: function handleClose(dropdown, e) {
        var action = this.get('onclose');
        if (action) {
          var returnValue = action(this.get('publicAPI'), e);
          if (returnValue === false || e && e.defaultPrevented) {
            return false;
          }
        }
        if (e) {
          this.set('openingEvent', null);
        }
        this.send('highlight', dropdown, null, e);
      }
    },

    _handleKeyUpDown: function _handleKeyUpDown(dropdown, e) {
      if (dropdown.isOpen) {
        e.preventDefault();
        var newHighlighted = this.advanceSelectableOption(this.get('highlighted'), e.keyCode === 40 ? 1 : -1);
        this.send('highlight', dropdown, newHighlighted, e);
      } else {
        dropdown.actions.open(e);
      }
    },

    _handleKeyEnter: function _handleKeyEnter(dropdown, e) {
      if (dropdown.isOpen) {
        return this._doChoose(dropdown, this.get('highlighted'), e);
      }
    },

    _handleKeySpace: function _handleKeySpace(dropdown, e) {
      if (dropdown.isOpen) {
        e.preventDefault();
        return this._doChoose(dropdown, this.get('highlighted'), e);
      }
    },

    _handleKeyTab: function _handleKeyTab(dropdown, e) {
      dropdown.actions.close(e);
    },

    _handleKeyESC: function _handleKeyESC(dropdown, e) {
      dropdown.actions.close(e);
    },

    // Methods
    scrollIfHighlightedIsOutOfViewport: function scrollIfHighlightedIsOutOfViewport() {
      if (!self.document) {
        return;
      }
      var optionsList = document.querySelector('.ember-power-select-options');
      if (!optionsList) {
        return;
      }
      var highlightedOption = optionsList.querySelector('.ember-power-select-option[aria-current="true"]');
      if (!highlightedOption) {
        return;
      }
      var optionTopScroll = highlightedOption.offsetTop - optionsList.offsetTop;
      var optionBottomScroll = optionTopScroll + highlightedOption.offsetHeight;
      if (optionBottomScroll > optionsList.offsetHeight + optionsList.scrollTop) {
        optionsList.scrollTop = optionBottomScroll - optionsList.offsetHeight;
      } else if (optionTopScroll < optionsList.scrollTop) {
        optionsList.scrollTop = optionTopScroll;
      }
    },

    indexOfOption: function indexOfOption(option) {
      return (0, _emberPowerSelectUtilsGroupUtils.indexOfOption)(this.get('results'), option);
    },

    optionAtIndex: function optionAtIndex(index) {
      return (0, _emberPowerSelectUtilsGroupUtils.optionAtIndex)(this.get('results'), index);
    },

    advanceSelectableOption: function advanceSelectableOption(activeHighlighted, step) {
      var resultsLength = this.get('resultsLength');
      var startIndex = Math.min(Math.max(this.indexOfOption(activeHighlighted) + step, 0), resultsLength - 1);
      var nextOption = this.optionAtIndex(startIndex);
      while (nextOption && get(nextOption, 'disabled')) {
        nextOption = this.optionAtIndex(startIndex += step);
      }
      return nextOption;
    },

    filter: function filter(options, term) {
      var skipDisabled = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      return (0, _emberPowerSelectUtilsGroupUtils.filterOptions)(options || [], term, this.get('optionMatcher'), skipDisabled);
    },

    defaultHighlighted: function defaultHighlighted() {
      var selected = this.get('resolvedSelected');
      if (!selected || this.indexOfOption(selected) === -1) {
        var nextOption = this.optionAtIndex(0);
        while (nextOption && nextOption.disabled) {
          nextOption = this.advanceSelectableOption(nextOption, 1);
        }
        return nextOption;
      }
      return selected;
    },

    buildSelection: function buildSelection(option) {
      return option;
    },

    _doChoose: function _doChoose(dropdown, selected, e) {
      if (e && e.clientY) {
        var openingEvent = this.get('openingEvent');
        if (openingEvent && openingEvent.clientY) {
          if (Math.abs(openingEvent.clientY - e.clientY) < 2) {
            return;
          }
        }
      }
      this.send('select', dropdown, this.get('buildSelection')(selected), e);
      if (this.get('closeOnSelect')) {
        dropdown.actions.close(e);
        return false;
      }
    },

    _doSelect: function _doSelect(dropdown, selected /*, e */) {
      if (this.get('resolvedSelected') !== selected) {
        this.get('onchange')(selected, this.get('publicAPI'));
      }
    },

    _doHighlight: function _doHighlight(dropdown, option) {
      if (option && get(option, 'disabled')) {
        return;
      }
      run.scheduleOnce('afterRender', this, this.scrollIfHighlightedIsOutOfViewport);
      this.set('currentlyHighlighted', option);
    },

    _doSearch: function _doSearch(dropdown, term) {
      var _this4 = this;

      if (isBlank(term)) {
        this._resetSearch();
      } else {
        var searchAction = this.get('search');
        if (searchAction) {
          this._performSearch(searchAction, term);
        } else {
          var options = this.get('options');
          if (options.then) {
            options.then(function (data) {
              _this4.setProperties({ results: _this4.filter(data, term), searchText: term, lastSearchedText: term });
            });
          } else {
            this.setProperties({ results: this.filter(options, term), searchText: term, lastSearchedText: term });
          }
        }
      }
    },

    _resetSearch: function _resetSearch() {
      var _this5 = this;

      var options = this.get('options') || [];
      this.activeSearch = null;
      if (options.then) {
        options.then(function (data) {
          _this5.setProperties({ results: data, searchText: '', lastSearchedText: '', loading: false });
        });
      } else {
        this.setProperties({ results: options, searchText: '', lastSearchedText: '', loading: false });
      }
    },

    _performSearch: function _performSearch(searchAction, term) {
      var _this6 = this;

      this.set('searchText', term);
      var search = searchAction(term, this.get('publicAPI'));
      if (!search) {
        this.setProperties({ lastSearchedText: term });
      } else if (search.then) {
        this.activeSearch = search;
        this.setProperties({ loading: true });
        search.then(function (results) {
          if (_this6.activeSearch === search) {
            _this6.setProperties({ results: results, lastSearchedText: term });
          }
        }, function () {
          if (_this6.activeSearch === search) {
            _this6.set('lastSearchedText', term);
          }
        });
      } else {
        this.setProperties({ results: search, lastSearchedText: term });
      }
    },

    _handleTriggerTyping: function _handleTriggerTyping(dropdown, e) {
      var term = this.get('expirableSearchText') + String.fromCharCode(e.keyCode);
      this.set('expirableSearchText', term);
      this.expirableSearchDebounceId = run.debounce(this, 'set', 'expirableSearchText', '', 1000);
      var firstMatch = this.filter(this.get('results'), term, true)[0]; // TODO: match only words starting with this substr?
      if (firstMatch !== undefined) {
        if (dropdown.isOpen) {
          this._doHighlight(dropdown, firstMatch, e);
        } else {
          this._doSelect(dropdown, firstMatch, e);
        }
      }
    }
  });
});
define('ember-power-select/helpers/ember-power-select-is-selected', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  })();

  exports.emberPowerSelectIsSelected = emberPowerSelectIsSelected;

  var isArray = _ember['default'].isArray;

  // TODO: Make it private or scoped to the component

  function emberPowerSelectIsSelected(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 2);

    var option = _ref2[0];
    var selected = _ref2[1];

    return isArray(selected) ? selected.indexOf(option) > -1 : option === selected;
  }

  exports['default'] = _ember['default'].Helper.helper(emberPowerSelectIsSelected);
});
define("ember-power-select/templates/components/power-select/before-options", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/before-options.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "ember-power-select-search");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("input");
          dom.setAttribute(el2, "type", "search");
          dom.setAttribute(el2, "autocomplete", "off");
          dom.setAttribute(el2, "autocorrect", "off");
          dom.setAttribute(el2, "autocapitalize", "off");
          dom.setAttribute(el2, "spellcheck", "false");
          dom.setAttribute(el2, "role", "combobox");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'aria-controls');
          morphs[1] = dom.createAttrMorph(element0, 'placeholder');
          morphs[2] = dom.createAttrMorph(element0, 'oninput');
          morphs[3] = dom.createAttrMorph(element0, 'onkeydown');
          return morphs;
        },
        statements: [["attribute", "aria-controls", ["get", "listboxId", ["loc", [null, [6, 22], [6, 31]]]]], ["attribute", "placeholder", ["get", "searchPlaceholder", ["loc", [null, [7, 20], [7, 37]]]]], ["attribute", "oninput", ["get", "handleInput", ["loc", [null, [8, 16], [8, 27]]]]], ["attribute", "onkeydown", ["subexpr", "action", ["handleKeydown"], [], ["loc", [null, [9, 16], [9, 42]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 7
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select/before-options.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "searchEnabled", ["loc", [null, [1, 6], [1, 19]]]]], [], 0, null, ["loc", [null, [1, 0], [11, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-power-select/templates/components/power-select/options", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "ember-power-select-option");
            dom.setAttribute(el1, "role", "option");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "loadingMessage", ["loc", [null, [3, 56], [3, 74]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "loadingMessage", ["loc", [null, [2, 8], [2, 22]]]]], [], 0, null, ["loc", [null, [2, 2], [4, 9]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 10,
                  "column": 6
                },
                "end": {
                  "line": 21,
                  "column": 6
                }
              },
              "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "yield", [["get", "option", ["loc", [null, [20, 16], [20, 22]]]], ["get", "lastSearchedText", ["loc", [null, [20, 23], [20, 39]]]]], [], ["loc", [null, [20, 8], [20, 41]]]]],
            locals: ["option"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 2
              },
              "end": {
                "line": 23,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "ember-power-select-group");
            dom.setAttribute(el1, "role", "option");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "ember-power-select-group-name");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 0, 0);
            morphs[1] = dom.createMorphAt(element1, 3, 3);
            return morphs;
          },
          statements: [["content", "opt.groupName", ["loc", [null, [9, 50], [9, 67]]]], ["block", "component", [["get", "optionsComponent", ["loc", [null, [10, 19], [10, 35]]]]], ["highlighted", ["subexpr", "readonly", [["get", "highlighted", ["loc", [null, [11, 30], [11, 41]]]]], [], ["loc", [null, [11, 20], [11, 42]]]], "selected", ["subexpr", "readonly", [["get", "selected", ["loc", [null, [12, 27], [12, 35]]]]], [], ["loc", [null, [12, 17], [12, 36]]]], "options", ["subexpr", "readonly", [["get", "opt.options", ["loc", [null, [13, 26], [13, 37]]]]], [], ["loc", [null, [13, 16], [13, 38]]]], "allOptions", ["subexpr", "readonly", [["get", "allOptions", ["loc", [null, [14, 29], [14, 39]]]]], [], ["loc", [null, [14, 19], [14, 40]]]], "optionsComponent", ["subexpr", "readonly", [["get", "optionsComponent", ["loc", [null, [15, 35], [15, 51]]]]], [], ["loc", [null, [15, 25], [15, 52]]]], "select", ["subexpr", "readonly", [["get", "select", ["loc", [null, [16, 25], [16, 31]]]]], [], ["loc", [null, [16, 15], [16, 32]]]], "groupIndex", ["subexpr", "concat", [["get", "groupIndex", ["loc", [null, [17, 27], [17, 37]]]], ["get", "index", ["loc", [null, [17, 38], [17, 43]]]], "."], [], ["loc", [null, [17, 19], [17, 48]]]], "role", "group", "class", "ember-power-select-options"], 0, null, ["loc", [null, [10, 6], [21, 20]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 2
              },
              "end": {
                "line": 32,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "ember-power-select-option");
            dom.setAttribute(el1, "role", "option");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(5);
            morphs[0] = dom.createAttrMorph(element0, 'aria-selected');
            morphs[1] = dom.createAttrMorph(element0, 'aria-disabled');
            morphs[2] = dom.createAttrMorph(element0, 'aria-current');
            morphs[3] = dom.createAttrMorph(element0, 'data-option-index');
            morphs[4] = dom.createMorphAt(element0, 1, 1);
            return morphs;
          },
          statements: [["attribute", "aria-selected", ["subexpr", "ember-power-select-is-selected", [["get", "opt", ["loc", [null, [25, 53], [25, 56]]]], ["get", "selected", ["loc", [null, [25, 57], [25, 65]]]]], [], ["loc", [null, [25, 20], [25, 67]]]]], ["attribute", "aria-disabled", ["get", "opt.disabled", ["loc", [null, [26, 22], [26, 34]]]]], ["attribute", "aria-current", ["subexpr", "eq", [["get", "opt", ["loc", [null, [27, 24], [27, 27]]]], ["get", "highlighted", ["loc", [null, [27, 28], [27, 39]]]]], [], ["loc", [null, [27, 19], [27, 41]]]]], ["attribute", "data-option-index", ["concat", [["get", "groupIndex", ["loc", [null, [28, 27], [28, 37]]]], ["get", "index", ["loc", [null, [28, 41], [28, 46]]]]]]], ["inline", "yield", [["get", "opt", ["loc", [null, [30, 14], [30, 17]]]], ["get", "lastSearchedText", ["loc", [null, [30, 18], [30, 34]]]]], [], ["loc", [null, [30, 6], [30, 36]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 33,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
        },
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "opt.groupName", ["loc", [null, [7, 8], [7, 21]]]]], [], 0, 1, ["loc", [null, [7, 2], [32, 9]]]]],
        locals: ["opt", "index"],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loading", ["loc", [null, [1, 6], [1, 13]]]]], [], 0, null, ["loc", [null, [1, 0], [5, 7]]]], ["block", "each", [["get", "options", ["loc", [null, [6, 8], [6, 15]]]]], [], 1, null, ["loc", [null, [6, 0], [33, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-power-select/templates/components/power-select/trigger", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "component", [["get", "selectedItemComponent", ["loc", [null, [3, 16], [3, 37]]]]], ["selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [3, 47], [3, 55]]]]], [], []], "lastSearchedText", ["subexpr", "@mut", [["get", "lastSearchedText", ["loc", [null, [3, 73], [3, 89]]]]], [], []]], ["loc", [null, [3, 4], [3, 91]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "ember-power-select-selected-item");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "selected", ["loc", [null, [5, 59], [5, 67]]]], ["get", "lastSearchedText", ["loc", [null, [5, 68], [5, 84]]]]], [], ["loc", [null, [5, 51], [5, 86]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 2
              },
              "end": {
                "line": 9,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "ember-power-select-clear-btn");
            var el2 = dom.createTextNode("×");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'onmousedown');
            return morphs;
          },
          statements: [["attribute", "onmousedown", ["subexpr", "action", ["clear"], [], ["loc", [null, [8, 59], [8, 77]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "selectedItemComponent", ["loc", [null, [2, 8], [2, 29]]]]], [], 0, 1, ["loc", [null, [2, 2], [6, 9]]]], ["block", "if", [["subexpr", "and", [["get", "allowClear", ["loc", [null, [7, 13], [7, 23]]]], ["subexpr", "not", [["get", "disabled", ["loc", [null, [7, 29], [7, 37]]]]], [], ["loc", [null, [7, 24], [7, 38]]]]], [], ["loc", [null, [7, 8], [7, 39]]]]], [], 2, null, ["loc", [null, [7, 2], [9, 9]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 0
              },
              "end": {
                "line": 12,
                "column": 0
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "ember-power-select-placeholder");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "placeholder", ["loc", [null, [11, 47], [11, 62]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "placeholder", ["loc", [null, [10, 10], [10, 21]]]]], [], 0, null, ["loc", [null, [10, 0], [12, 0]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 52
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "ember-power-select-status-icon");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "selected", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [12, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-power-select/templates/components/power-select-multiple/trigger", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 9,
                "column": 6
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "role", "button");
            dom.setAttribute(el1, "aria-label", "remove element");
            dom.setAttribute(el1, "class", "ember-power-select-multiple-remove-btn");
            var el2 = dom.createTextNode("×");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element1, 'data-selected-index');
            return morphs;
          },
          statements: [["attribute", "data-selected-index", ["get", "idx", ["loc", [null, [8, 32], [8, 35]]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 6
              },
              "end": {
                "line": 12,
                "column": 6
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "component", [["get", "selectedItemComponent", ["loc", [null, [11, 20], [11, 41]]]]], ["selected", ["subexpr", "@mut", [["get", "opt", ["loc", [null, [11, 51], [11, 54]]]]], [], []], "lastSearchedText", ["subexpr", "@mut", [["get", "lastSearchedText", ["loc", [null, [11, 72], [11, 88]]]]], [], []]], ["loc", [null, [11, 8], [11, 90]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 6
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "opt", ["loc", [null, [13, 16], [13, 19]]]], ["get", "lastSearchedText", ["loc", [null, [13, 20], [13, 36]]]]], [], ["loc", [null, [13, 8], [13, 38]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 16,
              "column": 2
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
        },
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "ember-power-select-multiple-option");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element2, 1, 1);
          morphs[1] = dom.createMorphAt(element2, 2, 2);
          return morphs;
        },
        statements: [["block", "unless", [["get", "disabled", ["loc", [null, [4, 16], [4, 24]]]]], [], 0, null, ["loc", [null, [4, 6], [9, 17]]]], ["block", "if", [["get", "selectedItemComponent", ["loc", [null, [10, 12], [10, 33]]]]], [], 1, 2, ["loc", [null, [10, 6], [14, 13]]]]],
        locals: ["opt", "idx"],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 2
            },
            "end": {
              "line": 26,
              "column": 2
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("input");
          dom.setAttribute(el1, "type", "search");
          dom.setAttribute(el1, "tabindex", "0");
          dom.setAttribute(el1, "autocomplete", "off");
          dom.setAttribute(el1, "autocorrect", "off");
          dom.setAttribute(el1, "autocapitalize", "off");
          dom.setAttribute(el1, "spellcheck", "false");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(7);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'aria-controls');
          morphs[2] = dom.createAttrMorph(element0, 'style');
          morphs[3] = dom.createAttrMorph(element0, 'placeholder');
          morphs[4] = dom.createAttrMorph(element0, 'disabled');
          morphs[5] = dom.createAttrMorph(element0, 'oninput');
          morphs[6] = dom.createAttrMorph(element0, 'onkeydown');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["ember-power-select-trigger-multiple-input ", ["get", "elementId", ["loc", [null, [18, 76], [18, 85]]]], "-input"]]], ["attribute", "aria-controls", ["get", "listboxId", ["loc", [null, [20, 22], [20, 31]]]]], ["attribute", "style", ["get", "triggerMultipleInputStyle", ["loc", [null, [21, 14], [21, 39]]]]], ["attribute", "placeholder", ["get", "maybePlaceholder", ["loc", [null, [22, 20], [22, 36]]]]], ["attribute", "disabled", ["get", "disabled", ["loc", [null, [23, 17], [23, 25]]]]], ["attribute", "oninput", ["subexpr", "action", ["handleInput"], [], ["loc", [null, [24, 14], [24, 38]]]]], ["attribute", "onkeydown", ["subexpr", "action", ["handleKeydown"], [], ["loc", [null, [25, 16], [25, 42]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 52
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "ember-power-select-multiple-options");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "ember-power-select-status-icon");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element3, 'id');
        morphs[1] = dom.createMorphAt(element3, 1, 1);
        morphs[2] = dom.createMorphAt(element3, 2, 2);
        return morphs;
      },
      statements: [["attribute", "id", ["concat", [["get", "elementId", ["loc", [null, [1, 10], [1, 19]]]], "-ember-power-select-multiple-options"]]], ["block", "each", [["get", "selected", ["loc", [null, [2, 10], [2, 18]]]]], [], 0, null, ["loc", [null, [2, 2], [16, 11]]]], ["block", "if", [["get", "searchEnabled", ["loc", [null, [17, 8], [17, 21]]]]], [], 1, null, ["loc", [null, [17, 2], [26, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-power-select/templates/components/power-select-multiple", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 48,
                "column": 4
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
          },
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "option", ["loc", [null, [47, 14], [47, 20]]]], ["get", "term", ["loc", [null, [47, 21], [47, 25]]]]], [], ["loc", [null, [47, 6], [47, 27]]]]],
          locals: ["option", "term"],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 48,
                "column": 4
              },
              "end": {
                "line": 50,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [], ["to", "inverse"], ["loc", [null, [49, 6], [49, 28]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 51,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "power-select", [], ["afterOptionsComponent", ["subexpr", "@mut", [["get", "afterOptionsComponent", ["loc", [null, [3, 28], [3, 49]]]]], [], []], "allowClear", ["subexpr", "@mut", [["get", "allowClear", ["loc", [null, [4, 17], [4, 27]]]]], [], []], "ariaDescribedBy", ["subexpr", "@mut", [["get", "ariaDescribedBy", ["loc", [null, [5, 22], [5, 37]]]]], [], []], "ariaInvalid", ["subexpr", "@mut", [["get", "ariaInvalid", ["loc", [null, [6, 18], [6, 29]]]]], [], []], "ariaLabel", ["subexpr", "@mut", [["get", "ariaLabel", ["loc", [null, [7, 16], [7, 25]]]]], [], []], "ariaLabelledBy", ["subexpr", "@mut", [["get", "ariaLabelledBy", ["loc", [null, [8, 21], [8, 35]]]]], [], []], "beforeOptionsComponent", ["subexpr", "@mut", [["get", "beforeOptionsComponent", ["loc", [null, [9, 29], [9, 51]]]]], [], []], "buildSelection", ["subexpr", "action", ["buildSelection"], [], ["loc", [null, [10, 21], [10, 46]]]], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [11, 12], [11, 17]]]]], [], []], "closeOnSelect", ["subexpr", "@mut", [["get", "closeOnSelect", ["loc", [null, [12, 20], [12, 33]]]]], [], []], "destination", ["subexpr", "@mut", [["get", "destination", ["loc", [null, [13, 18], [13, 29]]]]], [], []], "dir", ["subexpr", "@mut", [["get", "dir", ["loc", [null, [14, 10], [14, 13]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [15, 15], [15, 23]]]]], [], []], "dropdownClass", ["subexpr", "@mut", [["get", "dropdownClass", ["loc", [null, [16, 20], [16, 33]]]]], [], []], "extra", ["subexpr", "@mut", [["get", "extra", ["loc", [null, [17, 12], [17, 17]]]]], [], []], "horizontalPosition", ["subexpr", "@mut", [["get", "horizontalPosition", ["loc", [null, [18, 25], [18, 43]]]]], [], []], "initiallyOpened", ["subexpr", "@mut", [["get", "initiallyOpened", ["loc", [null, [19, 22], [19, 37]]]]], [], []], "loadingMessage", ["subexpr", "@mut", [["get", "loadingMessage", ["loc", [null, [20, 21], [20, 35]]]]], [], []], "matcher", ["subexpr", "@mut", [["get", "matcher", ["loc", [null, [21, 14], [21, 21]]]]], [], []], "matchTriggerWidth", ["subexpr", "@mut", [["get", "matchTriggerWidth", ["loc", [null, [22, 24], [22, 41]]]]], [], []], "noMatchesMessage", ["subexpr", "@mut", [["get", "noMatchesMessage", ["loc", [null, [23, 23], [23, 39]]]]], [], []], "onchange", ["subexpr", "@mut", [["get", "onchange", ["loc", [null, [24, 15], [24, 23]]]]], [], []], "onclose", ["subexpr", "@mut", [["get", "onclose", ["loc", [null, [25, 14], [25, 21]]]]], [], []], "onfocus", ["subexpr", "action", ["handleFocus"], [], ["loc", [null, [26, 14], [26, 36]]]], "oninput", ["subexpr", "@mut", [["get", "oninput", ["loc", [null, [27, 14], [27, 21]]]]], [], []], "onkeydown", ["subexpr", "action", ["handleKeydown"], [], ["loc", [null, [28, 16], [28, 40]]]], "onopen", ["subexpr", "action", ["handleOpen"], [], ["loc", [null, [29, 13], [29, 34]]]], "options", ["subexpr", "@mut", [["get", "options", ["loc", [null, [30, 14], [30, 21]]]]], [], []], "optionsComponent", ["subexpr", "@mut", [["get", "optionsComponent", ["loc", [null, [31, 23], [31, 39]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [32, 18], [32, 29]]]]], [], []], "renderInPlace", ["subexpr", "@mut", [["get", "renderInPlace", ["loc", [null, [33, 20], [33, 33]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [34, 15], [34, 23]]]]], [], []], "search", ["subexpr", "@mut", [["get", "search", ["loc", [null, [35, 13], [35, 19]]]]], [], []], "searchEnabled", ["subexpr", "@mut", [["get", "searchEnabled", ["loc", [null, [36, 20], [36, 33]]]]], [], []], "searchField", ["subexpr", "@mut", [["get", "searchField", ["loc", [null, [37, 18], [37, 29]]]]], [], []], "searchMessage", ["subexpr", "@mut", [["get", "searchMessage", ["loc", [null, [38, 20], [38, 33]]]]], [], []], "searchPlaceholder", ["subexpr", "@mut", [["get", "searchPlaceholder", ["loc", [null, [39, 24], [39, 41]]]]], [], []], "selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [40, 15], [40, 23]]]]], [], []], "selectedItemComponent", ["subexpr", "@mut", [["get", "selectedItemComponent", ["loc", [null, [41, 28], [41, 49]]]]], [], []], "tabindex", ["subexpr", "@mut", [["get", "tabindex", ["loc", [null, [42, 15], [42, 23]]]]], [], []], "triggerClass", ["subexpr", "@mut", [["get", "concatenatedTriggerClass", ["loc", [null, [43, 19], [43, 43]]]]], [], []], "triggerComponent", ["subexpr", "@mut", [["get", "triggerComponent", ["loc", [null, [44, 23], [44, 39]]]]], [], []], "verticalPosition", ["subexpr", "@mut", [["get", "verticalPosition", ["loc", [null, [45, 23], [45, 39]]]]], [], []]], 0, 1, ["loc", [null, [2, 2], [50, 19]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 52,
                "column": 2
              },
              "end": {
                "line": 98,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
          },
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "option", ["loc", [null, [97, 14], [97, 20]]]], ["get", "term", ["loc", [null, [97, 21], [97, 25]]]]], [], ["loc", [null, [97, 6], [97, 27]]]]],
          locals: ["option", "term"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 51,
              "column": 0
            },
            "end": {
              "line": 99,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "power-select", [], ["afterOptionsComponent", ["subexpr", "@mut", [["get", "afterOptionsComponent", ["loc", [null, [53, 28], [53, 49]]]]], [], []], "allowClear", ["subexpr", "@mut", [["get", "allowClear", ["loc", [null, [54, 17], [54, 27]]]]], [], []], "ariaDescribedBy", ["subexpr", "@mut", [["get", "ariaDescribedBy", ["loc", [null, [55, 22], [55, 37]]]]], [], []], "ariaInvalid", ["subexpr", "@mut", [["get", "ariaInvalid", ["loc", [null, [56, 18], [56, 29]]]]], [], []], "ariaLabel", ["subexpr", "@mut", [["get", "ariaLabel", ["loc", [null, [57, 16], [57, 25]]]]], [], []], "ariaLabelledBy", ["subexpr", "@mut", [["get", "ariaLabelledBy", ["loc", [null, [58, 21], [58, 35]]]]], [], []], "beforeOptionsComponent", ["subexpr", "@mut", [["get", "beforeOptionsComponent", ["loc", [null, [59, 29], [59, 51]]]]], [], []], "buildSelection", ["subexpr", "action", ["buildSelection"], [], ["loc", [null, [60, 21], [60, 46]]]], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [61, 12], [61, 17]]]]], [], []], "closeOnSelect", ["subexpr", "@mut", [["get", "closeOnSelect", ["loc", [null, [62, 20], [62, 33]]]]], [], []], "destination", ["subexpr", "@mut", [["get", "destination", ["loc", [null, [63, 18], [63, 29]]]]], [], []], "dir", ["subexpr", "@mut", [["get", "dir", ["loc", [null, [64, 10], [64, 13]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [65, 15], [65, 23]]]]], [], []], "dropdownClass", ["subexpr", "@mut", [["get", "dropdownClass", ["loc", [null, [66, 20], [66, 33]]]]], [], []], "extra", ["subexpr", "@mut", [["get", "extra", ["loc", [null, [67, 12], [67, 17]]]]], [], []], "horizontalPosition", ["subexpr", "@mut", [["get", "horizontalPosition", ["loc", [null, [68, 25], [68, 43]]]]], [], []], "initiallyOpened", ["subexpr", "@mut", [["get", "initiallyOpened", ["loc", [null, [69, 22], [69, 37]]]]], [], []], "loadingMessage", ["subexpr", "@mut", [["get", "loadingMessage", ["loc", [null, [70, 21], [70, 35]]]]], [], []], "matcher", ["subexpr", "@mut", [["get", "matcher", ["loc", [null, [71, 14], [71, 21]]]]], [], []], "matchTriggerWidth", ["subexpr", "@mut", [["get", "matchTriggerWidth", ["loc", [null, [72, 24], [72, 41]]]]], [], []], "noMatchesMessage", ["subexpr", "@mut", [["get", "noMatchesMessage", ["loc", [null, [73, 23], [73, 39]]]]], [], []], "onchange", ["subexpr", "@mut", [["get", "onchange", ["loc", [null, [74, 15], [74, 23]]]]], [], []], "onclose", ["subexpr", "@mut", [["get", "onclose", ["loc", [null, [75, 14], [75, 21]]]]], [], []], "onfocus", ["subexpr", "action", ["handleFocus"], [], ["loc", [null, [76, 14], [76, 36]]]], "oninput", ["subexpr", "@mut", [["get", "oninput", ["loc", [null, [77, 14], [77, 21]]]]], [], []], "onkeydown", ["subexpr", "action", ["handleKeydown"], [], ["loc", [null, [78, 16], [78, 40]]]], "onopen", ["subexpr", "action", ["handleOpen"], [], ["loc", [null, [79, 13], [79, 34]]]], "options", ["subexpr", "@mut", [["get", "options", ["loc", [null, [80, 14], [80, 21]]]]], [], []], "optionsComponent", ["subexpr", "@mut", [["get", "optionsComponent", ["loc", [null, [81, 23], [81, 39]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [82, 18], [82, 29]]]]], [], []], "renderInPlace", ["subexpr", "@mut", [["get", "renderInPlace", ["loc", [null, [83, 20], [83, 33]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [84, 15], [84, 23]]]]], [], []], "search", ["subexpr", "@mut", [["get", "search", ["loc", [null, [85, 13], [85, 19]]]]], [], []], "searchEnabled", ["subexpr", "@mut", [["get", "searchEnabled", ["loc", [null, [86, 20], [86, 33]]]]], [], []], "searchField", ["subexpr", "@mut", [["get", "searchField", ["loc", [null, [87, 18], [87, 29]]]]], [], []], "searchMessage", ["subexpr", "@mut", [["get", "searchMessage", ["loc", [null, [88, 20], [88, 33]]]]], [], []], "searchPlaceholder", ["subexpr", "@mut", [["get", "searchPlaceholder", ["loc", [null, [89, 24], [89, 41]]]]], [], []], "selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [90, 15], [90, 23]]]]], [], []], "selectedItemComponent", ["subexpr", "@mut", [["get", "selectedItemComponent", ["loc", [null, [91, 28], [91, 49]]]]], [], []], "tabindex", ["subexpr", "@mut", [["get", "tabindex", ["loc", [null, [92, 15], [92, 23]]]]], [], []], "triggerClass", ["subexpr", "@mut", [["get", "concatenatedTriggerClass", ["loc", [null, [93, 19], [93, 43]]]]], [], []], "triggerComponent", ["subexpr", "@mut", [["get", "triggerComponent", ["loc", [null, [94, 23], [94, 39]]]]], [], []], "verticalPosition", ["subexpr", "@mut", [["get", "verticalPosition", ["loc", [null, [95, 23], [95, 39]]]]], [], []]], 0, null, ["loc", [null, [52, 2], [98, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 100,
            "column": 0
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["subexpr", "hasBlock", ["inverse"], [], ["loc", [null, [1, 6], [1, 26]]]]], [], 0, 1, ["loc", [null, [1, 0], [99, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-power-select/templates/components/power-select", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 37,
                "column": 2
              },
              "end": {
                "line": 39,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("ul");
            dom.setAttribute(el1, "class", "ember-power-select-options");
            dom.setAttribute(el1, "role", "listbox");
            var el2 = dom.createElement("li");
            dom.setAttribute(el2, "class", "ember-power-select-option ember-power-select-option--search-message");
            dom.setAttribute(el2, "role", "option");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 0]), 0, 0);
            return morphs;
          },
          statements: [["content", "searchMessage", ["loc", [null, [38, 152], [38, 169]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@1.13.12",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 40,
                    "column": 4
                  },
                  "end": {
                    "line": 42,
                    "column": 4
                  }
                },
                "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("      ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["inline", "yield", [], ["to", "inverse"], ["loc", [null, [41, 6], [41, 28]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "revision": "Ember@1.13.12",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 42,
                      "column": 4
                    },
                    "end": {
                      "line": 44,
                      "column": 4
                    }
                  },
                  "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
                },
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("      ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("ul");
                  dom.setAttribute(el1, "class", "ember-power-select-options");
                  dom.setAttribute(el1, "role", "listbox");
                  var el2 = dom.createElement("li");
                  dom.setAttribute(el2, "class", "ember-power-select-option ember-power-select-option--no-matches-message");
                  dom.setAttribute(el2, "role", "option");
                  var el3 = dom.createComment("");
                  dom.appendChild(el2, el3);
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n    ");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 0]), 0, 0);
                  return morphs;
                },
                statements: [["content", "noMatchesMessage", ["loc", [null, [43, 158], [43, 178]]]]],
                locals: [],
                templates: []
              };
            })();
            return {
              meta: {
                "revision": "Ember@1.13.12",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 42,
                    "column": 4
                  },
                  "end": {
                    "line": 44,
                    "column": 4
                  }
                },
                "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["block", "if", [["get", "noMatchesMessage", ["loc", [null, [42, 14], [42, 30]]]]], [], 0, null, ["loc", [null, [42, 4], [44, 4]]]]],
              locals: [],
              templates: [child0]
            };
          })();
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 39,
                  "column": 2
                },
                "end": {
                  "line": 45,
                  "column": 2
                }
              },
              "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["subexpr", "hasBlock", ["inverse"], [], ["loc", [null, [40, 10], [40, 30]]]]], [], 0, 1, ["loc", [null, [40, 4], [44, 11]]]]],
            locals: [],
            templates: [child0, child1]
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@1.13.12",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 46,
                    "column": 4
                  },
                  "end": {
                    "line": 64,
                    "column": 4
                  }
                },
                "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
              },
              arity: 2,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("      ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["inline", "yield", [["get", "option", ["loc", [null, [63, 14], [63, 20]]]], ["get", "term", ["loc", [null, [63, 21], [63, 25]]]]], [], ["loc", [null, [63, 6], [63, 27]]]]],
              locals: ["option", "term"],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 45,
                  "column": 2
                },
                "end": {
                  "line": 65,
                  "column": 2
                }
              },
              "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("  ");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              return morphs;
            },
            statements: [["block", "component", [["get", "optionsComponent", ["loc", [null, [46, 17], [46, 33]]]]], ["allOptions", ["subexpr", "readonly", [["get", "results", ["loc", [null, [47, 27], [47, 34]]]]], [], ["loc", [null, [47, 17], [47, 35]]]], "aria-controls", ["subexpr", "readonly", [["get", "triggerId", ["loc", [null, [48, 30], [48, 39]]]]], [], ["loc", [null, [48, 20], [48, 40]]]], "class", "ember-power-select-options", "extra", ["subexpr", "readonly", [["get", "extra", ["loc", [null, [50, 22], [50, 27]]]]], [], ["loc", [null, [50, 12], [50, 28]]]], "groupIndex", "", "highlighted", ["subexpr", "readonly", [["get", "highlighted", ["loc", [null, [52, 28], [52, 39]]]]], [], ["loc", [null, [52, 18], [52, 40]]]], "id", ["subexpr", "readonly", [["get", "optionsId", ["loc", [null, [53, 19], [53, 28]]]]], [], ["loc", [null, [53, 9], [53, 29]]]], "lastSearchedText", ["subexpr", "readonly", [["get", "lastSearchedText", ["loc", [null, [54, 33], [54, 49]]]]], [], ["loc", [null, [54, 23], [54, 50]]]], "loading", ["subexpr", "readonly", [["get", "loading", ["loc", [null, [55, 24], [55, 31]]]]], [], ["loc", [null, [55, 14], [55, 32]]]], "loadingMessage", ["subexpr", "readonly", [["get", "loadingMessage", ["loc", [null, [56, 31], [56, 45]]]]], [], ["loc", [null, [56, 21], [56, 46]]]], "options", ["subexpr", "readonly", [["get", "results", ["loc", [null, [57, 24], [57, 31]]]]], [], ["loc", [null, [57, 14], [57, 32]]]], "optionsComponent", ["subexpr", "readonly", [["get", "optionsComponent", ["loc", [null, [58, 33], [58, 49]]]]], [], ["loc", [null, [58, 23], [58, 50]]]], "searchText", ["subexpr", "readonly", [["get", "searchText", ["loc", [null, [59, 27], [59, 37]]]]], [], ["loc", [null, [59, 17], [59, 38]]]], "select", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [60, 23], [60, 32]]]]], [], ["loc", [null, [60, 13], [60, 33]]]], "selected", ["subexpr", "readonly", [["get", "resolvedSelected", ["loc", [null, [61, 25], [61, 41]]]]], [], ["loc", [null, [61, 15], [61, 42]]]]], 0, null, ["loc", [null, [46, 4], [64, 18]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 39,
                "column": 2
              },
              "end": {
                "line": 65,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "mustShowNoMessages", ["loc", [null, [39, 12], [39, 30]]]]], [], 0, 1, ["loc", [null, [39, 2], [65, 2]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 71,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          return morphs;
        },
        statements: [["inline", "component", [["get", "beforeOptionsComponent", ["loc", [null, [26, 14], [26, 36]]]]], ["searchText", ["subexpr", "readonly", [["get", "searchText", ["loc", [null, [27, 25], [27, 35]]]]], [], ["loc", [null, [27, 15], [27, 36]]]], "onkeydown", ["subexpr", "readonly", [["get", "onkeydown", ["loc", [null, [28, 24], [28, 33]]]]], [], ["loc", [null, [28, 14], [28, 34]]]], "select", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [29, 21], [29, 30]]]]], [], ["loc", [null, [29, 11], [29, 31]]]], "handleInput", ["subexpr", "action", ["handleInput"], [], ["loc", [null, [30, 16], [30, 38]]]], "searchPlaceholder", ["subexpr", "readonly", [["get", "searchPlaceholder", ["loc", [null, [31, 32], [31, 49]]]]], [], ["loc", [null, [31, 22], [31, 50]]]], "searchEnabled", ["subexpr", "readonly", [["get", "searchEnabled", ["loc", [null, [32, 28], [32, 41]]]]], [], ["loc", [null, [32, 18], [32, 42]]]], "highlighted", ["subexpr", "readonly", [["get", "highlighted", ["loc", [null, [33, 26], [33, 37]]]]], [], ["loc", [null, [33, 16], [33, 38]]]], "listboxId", ["subexpr", "readonly", [["get", "optionsId", ["loc", [null, [34, 24], [34, 33]]]]], [], ["loc", [null, [34, 14], [34, 34]]]], "extra", ["subexpr", "readonly", [["get", "extra", ["loc", [null, [35, 20], [35, 25]]]]], [], ["loc", [null, [35, 10], [35, 26]]]], "eventSender", ["subexpr", "@mut", [["get", "eventSender", ["loc", [null, [36, 16], [36, 27]]]]], [], []]], ["loc", [null, [26, 2], [36, 29]]]], ["block", "if", [["get", "mustShowSearchMessage", ["loc", [null, [37, 8], [37, 29]]]]], [], 0, 1, ["loc", [null, [37, 2], [65, 9]]]], ["inline", "component", [["get", "afterOptionsComponent", ["loc", [null, [66, 14], [66, 35]]]]], ["select", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [67, 21], [67, 30]]]]], [], ["loc", [null, [67, 11], [67, 31]]]], "searchPlaceholder", ["subexpr", "readonly", [["get", "searchPlaceholder", ["loc", [null, [68, 32], [68, 49]]]]], [], ["loc", [null, [68, 22], [68, 50]]]], "searchEnabled", ["subexpr", "readonly", [["get", "searchEnabled", ["loc", [null, [69, 28], [69, 41]]]]], [], ["loc", [null, [69, 18], [69, 42]]]], "extra", ["subexpr", "readonly", [["get", "extra", ["loc", [null, [70, 20], [70, 25]]]]], [], ["loc", [null, [70, 10], [70, 26]]]]], ["loc", [null, [66, 2], [70, 28]]]]],
        locals: ["dropdown"],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 72,
                "column": 2
              },
              "end": {
                "line": 93,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
          },
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "opt", ["loc", [null, [92, 12], [92, 15]]]], ["get", "term", ["loc", [null, [92, 16], [92, 20]]]]], [], ["loc", [null, [92, 4], [92, 22]]]]],
          locals: ["opt", "term"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 71,
              "column": 0
            },
            "end": {
              "line": 94,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "component", [["get", "triggerComponent", ["loc", [null, [72, 15], [72, 31]]]]], ["allowClear", ["subexpr", "readonly", [["get", "allowClear", ["loc", [null, [73, 25], [73, 35]]]]], [], ["loc", [null, [73, 15], [73, 36]]]], "buildSelection", ["subexpr", "readonly", [["get", "buildSelection", ["loc", [null, [74, 29], [74, 43]]]]], [], ["loc", [null, [74, 19], [74, 44]]]], "disabled", ["subexpr", "readonly", [["get", "disabled", ["loc", [null, [75, 23], [75, 31]]]]], [], ["loc", [null, [75, 13], [75, 32]]]], "extra", ["subexpr", "readonly", [["get", "extra", ["loc", [null, [76, 20], [76, 25]]]]], [], ["loc", [null, [76, 10], [76, 26]]]], "handleInput", ["subexpr", "action", ["handleInput"], [], ["loc", [null, [77, 16], [77, 38]]]], "handleFocus", ["subexpr", "action", ["handleFocus", null], [], ["loc", [null, [78, 16], [78, 43]]]], "lastSearchedText", ["subexpr", "readonly", [["get", "lastSearchedText", ["loc", [null, [79, 31], [79, 47]]]]], [], ["loc", [null, [79, 21], [79, 48]]]], "listboxId", ["subexpr", "readonly", [["get", "optionsId", ["loc", [null, [80, 24], [80, 33]]]]], [], ["loc", [null, [80, 14], [80, 34]]]], "loading", ["subexpr", "readonly", [["get", "loading", ["loc", [null, [81, 22], [81, 29]]]]], [], ["loc", [null, [81, 12], [81, 30]]]], "onkeydown", ["subexpr", "readonly", [["get", "onkeydown", ["loc", [null, [82, 24], [82, 33]]]]], [], ["loc", [null, [82, 14], [82, 34]]]], "options", ["subexpr", "readonly", [["get", "results", ["loc", [null, [83, 22], [83, 29]]]]], [], ["loc", [null, [83, 12], [83, 30]]]], "placeholder", ["subexpr", "readonly", [["get", "placeholder", ["loc", [null, [84, 26], [84, 37]]]]], [], ["loc", [null, [84, 16], [84, 38]]]], "searchEnabled", ["subexpr", "readonly", [["get", "searchEnabled", ["loc", [null, [85, 28], [85, 41]]]]], [], ["loc", [null, [85, 18], [85, 42]]]], "searchField", ["subexpr", "readonly", [["get", "searchField", ["loc", [null, [86, 26], [86, 37]]]]], [], ["loc", [null, [86, 16], [86, 38]]]], "searchText", ["subexpr", "readonly", [["get", "searchText", ["loc", [null, [87, 25], [87, 35]]]]], [], ["loc", [null, [87, 15], [87, 36]]]], "select", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [88, 21], [88, 30]]]]], [], ["loc", [null, [88, 11], [88, 31]]]], "selected", ["subexpr", "readonly", [["get", "resolvedSelected", ["loc", [null, [89, 23], [89, 39]]]]], [], ["loc", [null, [89, 13], [89, 40]]]], "selectedItemComponent", ["subexpr", "readonly", [["get", "selectedItemComponent", ["loc", [null, [90, 36], [90, 57]]]]], [], ["loc", [null, [90, 26], [90, 58]]]]], 0, null, ["loc", [null, [72, 2], [93, 16]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 95,
            "column": 0
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "basic-dropdown", [], ["ariaDescribedBy", ["subexpr", "readonly", [["get", "ariaDescribedBy", ["loc", [null, [2, 28], [2, 43]]]]], [], ["loc", [null, [2, 18], [2, 44]]]], "ariaInvalid", ["subexpr", "readonly", [["get", "ariaInvalid", ["loc", [null, [3, 24], [3, 35]]]]], [], ["loc", [null, [3, 14], [3, 36]]]], "ariaLabel", ["subexpr", "readonly", [["get", "ariaLabel", ["loc", [null, [4, 22], [4, 31]]]]], [], ["loc", [null, [4, 12], [4, 32]]]], "ariaLabelledBy", ["subexpr", "readonly", [["get", "ariaLabelledBy", ["loc", [null, [5, 27], [5, 41]]]]], [], ["loc", [null, [5, 17], [5, 42]]]], "ariaRequired", ["subexpr", "readonly", [["get", "required", ["loc", [null, [6, 25], [6, 33]]]]], [], ["loc", [null, [6, 15], [6, 34]]]], "class", ["subexpr", "readonly", [["get", "concatenatedClasses", ["loc", [null, [7, 18], [7, 37]]]]], [], ["loc", [null, [7, 8], [7, 38]]]], "destination", ["subexpr", "readonly", [["get", "destination", ["loc", [null, [8, 24], [8, 35]]]]], [], ["loc", [null, [8, 14], [8, 36]]]], "dir", ["subexpr", "readonly", [["get", "dir", ["loc", [null, [9, 16], [9, 19]]]]], [], ["loc", [null, [9, 6], [9, 20]]]], "disabled", ["subexpr", "readonly", [["get", "disabled", ["loc", [null, [10, 21], [10, 29]]]]], [], ["loc", [null, [10, 11], [10, 30]]]], "dropdownClass", ["subexpr", "readonly", [["get", "concatenatedDropdownClasses", ["loc", [null, [11, 26], [11, 53]]]]], [], ["loc", [null, [11, 16], [11, 54]]]], "horizontalPosition", ["subexpr", "readonly", [["get", "horizontalPosition", ["loc", [null, [12, 31], [12, 49]]]]], [], ["loc", [null, [12, 21], [12, 50]]]], "initiallyOpened", ["subexpr", "@mut", [["get", "initiallyOpened", ["loc", [null, [13, 18], [13, 33]]]]], [], []], "matchTriggerWidth", ["subexpr", "@mut", [["get", "matchTriggerWidth", ["loc", [null, [14, 20], [14, 37]]]]], [], []], "onClose", ["subexpr", "action", ["handleClose"], [], ["loc", [null, [15, 10], [15, 32]]]], "onFocus", ["subexpr", "action", ["handleFocus"], [], ["loc", [null, [16, 10], [16, 32]]]], "onKeydown", ["subexpr", "action", ["handleKeydown"], [], ["loc", [null, [17, 12], [17, 36]]]], "onOpen", ["subexpr", "action", ["handleOpen"], [], ["loc", [null, [18, 9], [18, 30]]]], "registerActionsInParent", ["subexpr", "action", ["registerDropdown"], [], ["loc", [null, [19, 26], [19, 53]]]], "renderInPlace", ["subexpr", "readonly", [["get", "renderInPlace", ["loc", [null, [20, 26], [20, 39]]]]], [], ["loc", [null, [20, 16], [20, 40]]]], "tabindex", ["subexpr", "readonly", [["get", "tabindex", ["loc", [null, [21, 21], [21, 29]]]]], [], ["loc", [null, [21, 11], [21, 30]]]], "triggerClass", ["subexpr", "readonly", [["get", "concatenatedTriggerClasses", ["loc", [null, [22, 25], [22, 51]]]]], [], ["loc", [null, [22, 15], [22, 52]]]], "triggerId", ["subexpr", "@mut", [["get", "triggerId", ["loc", [null, [23, 12], [23, 21]]]]], [], []], "verticalPosition", ["subexpr", "readonly", [["get", "verticalPosition", ["loc", [null, [24, 29], [24, 45]]]]], [], ["loc", [null, [24, 19], [24, 46]]]]], 0, 1, ["loc", [null, [1, 0], [94, 19]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('ember-power-select/utils/computed-fallback-if-undefined', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = computedFallbackIfUndefined;

  function computedFallbackIfUndefined(fallback) {
    return _ember['default'].computed({
      get: function get() {
        return fallback;
      },
      set: function set(_, v) {
        return v === undefined ? fallback : v;
      }
    });
  }
});
define('ember-power-select/utils/group-utils', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.isGroup = isGroup;
  exports.countOptions = countOptions;
  exports.indexOfOption = indexOfOption;
  exports.optionAtIndex = optionAtIndex;
  exports.filterOptions = filterOptions;
  exports.stripDiacritics = stripDiacritics;
  exports.defaultMatcher = defaultMatcher;

  var get = _ember['default'].get;

  function isGroup(entry) {
    return !!entry && !!get(entry, 'groupName') && !!get(entry, 'options');
  }

  function countOptions(collection) {
    var counter = 0;
    (function walk(collection) {
      if (!collection) {
        return null;
      }
      if (!collection.objectAt) {
        collection = _ember['default'].A(collection);
      }
      for (var i = 0; i < get(collection, 'length'); i++) {
        var entry = collection.objectAt(i);
        if (isGroup(entry)) {
          walk(get(entry, 'options'));
        } else {
          counter++;
        }
      }
    })(collection);
    return counter;
  }

  function indexOfOption(collection, option) {
    var index = 0;
    return (function walk(collection) {
      if (!collection) {
        return null;
      }
      if (!collection.objectAt) {
        collection = _ember['default'].A(collection);
      }
      for (var i = 0; i < get(collection, 'length'); i++) {
        var entry = collection.objectAt(i);
        if (isGroup(entry)) {
          var result = walk(get(entry, 'options'));
          if (result > -1) {
            return result;
          }
        } else if (entry === option) {
          return index;
        } else {
          index++;
        }
      }
      return -1;
    })(collection);
  }

  function optionAtIndex(originalCollection, index) {
    var counter = 0;
    return (function walk(collection) {
      if (!collection) {
        return null;
      }
      if (!collection.objectAt) {
        collection = _ember['default'].A(collection);
      }
      var localCounter = 0;
      var length = get(collection, 'length');
      while (counter <= index && localCounter < length) {
        var entry = collection.objectAt(localCounter);
        if (isGroup(entry)) {
          var found = walk(get(entry, 'options'));
          if (found) {
            return found;
          }
        } else if (counter === index) {
          return entry;
        } else {
          counter++;
        }
        localCounter++;
      }
    })(originalCollection);
  }

  var deprecatedMatchers = {};

  function filterOptions(options, text, matcher) {
    var skipDisabled = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var sanitizedOptions = options.objectAt ? options : _ember['default'].A(options);
    var opts = _ember['default'].A();
    var length = get(options, 'length');
    for (var i = 0; i < length; i++) {
      var entry = sanitizedOptions.objectAt(i);
      if (isGroup(entry)) {
        var suboptions = filterOptions(get(entry, 'options'), text, matcher, skipDisabled);
        if (get(suboptions, 'length') > 0) {
          opts.push({ groupName: entry.groupName, options: suboptions });
        }
      } else if (!skipDisabled || !entry.disabled) {
        var matchResult = matcher(entry, text);
        if (typeof matchResult === 'number') {
          if (matchResult >= 0) {
            opts.push(entry);
          }
        } else if (matchResult) {
          var matcherToString = matcher.toString();
          if (!deprecatedMatchers[matcherToString]) {
            deprecatedMatchers[matcherToString] = true;
            _ember['default'].deprecate('Your custom matcher returned ' + matchResult + '. This is deprecated, custom matchers must return a number. Return any negative number when there was no match and return 0+ for positive matches. This will allow EPS to prioritize results', false, { id: 'ember-power-select-matcher-return-number', until: '0.10' });
          }
          opts.push(entry);
        }
      }
    }
    return opts;
  }

  var DIACRITICS = {
    'Ⓐ': 'A',
    'Ａ': 'A',
    'À': 'A',
    'Á': 'A',
    'Â': 'A',
    'Ầ': 'A',
    'Ấ': 'A',
    'Ẫ': 'A',
    'Ẩ': 'A',
    'Ã': 'A',
    'Ā': 'A',
    'Ă': 'A',
    'Ằ': 'A',
    'Ắ': 'A',
    'Ẵ': 'A',
    'Ẳ': 'A',
    'Ȧ': 'A',
    'Ǡ': 'A',
    'Ä': 'A',
    'Ǟ': 'A',
    'Ả': 'A',
    'Å': 'A',
    'Ǻ': 'A',
    'Ǎ': 'A',
    'Ȁ': 'A',
    'Ȃ': 'A',
    'Ạ': 'A',
    'Ậ': 'A',
    'Ặ': 'A',
    'Ḁ': 'A',
    'Ą': 'A',
    'Ⱥ': 'A',
    'Ɐ': 'A',
    'Ꜳ': 'AA',
    'Æ': 'AE',
    'Ǽ': 'AE',
    'Ǣ': 'AE',
    'Ꜵ': 'AO',
    'Ꜷ': 'AU',
    'Ꜹ': 'AV',
    'Ꜻ': 'AV',
    'Ꜽ': 'AY',
    'Ⓑ': 'B',
    'Ｂ': 'B',
    'Ḃ': 'B',
    'Ḅ': 'B',
    'Ḇ': 'B',
    'Ƀ': 'B',
    'Ƃ': 'B',
    'Ɓ': 'B',
    'Ⓒ': 'C',
    'Ｃ': 'C',
    'Ć': 'C',
    'Ĉ': 'C',
    'Ċ': 'C',
    'Č': 'C',
    'Ç': 'C',
    'Ḉ': 'C',
    'Ƈ': 'C',
    'Ȼ': 'C',
    'Ꜿ': 'C',
    'Ⓓ': 'D',
    'Ｄ': 'D',
    'Ḋ': 'D',
    'Ď': 'D',
    'Ḍ': 'D',
    'Ḑ': 'D',
    'Ḓ': 'D',
    'Ḏ': 'D',
    'Đ': 'D',
    'Ƌ': 'D',
    'Ɗ': 'D',
    'Ɖ': 'D',
    'Ꝺ': 'D',
    'Ǳ': 'DZ',
    'Ǆ': 'DZ',
    'ǲ': 'Dz',
    'ǅ': 'Dz',
    'Ⓔ': 'E',
    'Ｅ': 'E',
    'È': 'E',
    'É': 'E',
    'Ê': 'E',
    'Ề': 'E',
    'Ế': 'E',
    'Ễ': 'E',
    'Ể': 'E',
    'Ẽ': 'E',
    'Ē': 'E',
    'Ḕ': 'E',
    'Ḗ': 'E',
    'Ĕ': 'E',
    'Ė': 'E',
    'Ë': 'E',
    'Ẻ': 'E',
    'Ě': 'E',
    'Ȅ': 'E',
    'Ȇ': 'E',
    'Ẹ': 'E',
    'Ệ': 'E',
    'Ȩ': 'E',
    'Ḝ': 'E',
    'Ę': 'E',
    'Ḙ': 'E',
    'Ḛ': 'E',
    'Ɛ': 'E',
    'Ǝ': 'E',
    'Ⓕ': 'F',
    'Ｆ': 'F',
    'Ḟ': 'F',
    'Ƒ': 'F',
    'Ꝼ': 'F',
    'Ⓖ': 'G',
    'Ｇ': 'G',
    'Ǵ': 'G',
    'Ĝ': 'G',
    'Ḡ': 'G',
    'Ğ': 'G',
    'Ġ': 'G',
    'Ǧ': 'G',
    'Ģ': 'G',
    'Ǥ': 'G',
    'Ɠ': 'G',
    'Ꞡ': 'G',
    'Ᵹ': 'G',
    'Ꝿ': 'G',
    'Ⓗ': 'H',
    'Ｈ': 'H',
    'Ĥ': 'H',
    'Ḣ': 'H',
    'Ḧ': 'H',
    'Ȟ': 'H',
    'Ḥ': 'H',
    'Ḩ': 'H',
    'Ḫ': 'H',
    'Ħ': 'H',
    'Ⱨ': 'H',
    'Ⱶ': 'H',
    'Ɥ': 'H',
    'Ⓘ': 'I',
    'Ｉ': 'I',
    'Ì': 'I',
    'Í': 'I',
    'Î': 'I',
    'Ĩ': 'I',
    'Ī': 'I',
    'Ĭ': 'I',
    'İ': 'I',
    'Ï': 'I',
    'Ḯ': 'I',
    'Ỉ': 'I',
    'Ǐ': 'I',
    'Ȉ': 'I',
    'Ȋ': 'I',
    'Ị': 'I',
    'Į': 'I',
    'Ḭ': 'I',
    'Ɨ': 'I',
    'Ⓙ': 'J',
    'Ｊ': 'J',
    'Ĵ': 'J',
    'Ɉ': 'J',
    'Ⓚ': 'K',
    'Ｋ': 'K',
    'Ḱ': 'K',
    'Ǩ': 'K',
    'Ḳ': 'K',
    'Ķ': 'K',
    'Ḵ': 'K',
    'Ƙ': 'K',
    'Ⱪ': 'K',
    'Ꝁ': 'K',
    'Ꝃ': 'K',
    'Ꝅ': 'K',
    'Ꞣ': 'K',
    'Ⓛ': 'L',
    'Ｌ': 'L',
    'Ŀ': 'L',
    'Ĺ': 'L',
    'Ľ': 'L',
    'Ḷ': 'L',
    'Ḹ': 'L',
    'Ļ': 'L',
    'Ḽ': 'L',
    'Ḻ': 'L',
    'Ł': 'L',
    'Ƚ': 'L',
    'Ɫ': 'L',
    'Ⱡ': 'L',
    'Ꝉ': 'L',
    'Ꝇ': 'L',
    'Ꞁ': 'L',
    'Ǉ': 'LJ',
    'ǈ': 'Lj',
    'Ⓜ': 'M',
    'Ｍ': 'M',
    'Ḿ': 'M',
    'Ṁ': 'M',
    'Ṃ': 'M',
    'Ɱ': 'M',
    'Ɯ': 'M',
    'Ⓝ': 'N',
    'Ｎ': 'N',
    'Ǹ': 'N',
    'Ń': 'N',
    'Ñ': 'N',
    'Ṅ': 'N',
    'Ň': 'N',
    'Ṇ': 'N',
    'Ņ': 'N',
    'Ṋ': 'N',
    'Ṉ': 'N',
    'Ƞ': 'N',
    'Ɲ': 'N',
    'Ꞑ': 'N',
    'Ꞥ': 'N',
    'Ǌ': 'NJ',
    'ǋ': 'Nj',
    'Ⓞ': 'O',
    'Ｏ': 'O',
    'Ò': 'O',
    'Ó': 'O',
    'Ô': 'O',
    'Ồ': 'O',
    'Ố': 'O',
    'Ỗ': 'O',
    'Ổ': 'O',
    'Õ': 'O',
    'Ṍ': 'O',
    'Ȭ': 'O',
    'Ṏ': 'O',
    'Ō': 'O',
    'Ṑ': 'O',
    'Ṓ': 'O',
    'Ŏ': 'O',
    'Ȯ': 'O',
    'Ȱ': 'O',
    'Ö': 'O',
    'Ȫ': 'O',
    'Ỏ': 'O',
    'Ő': 'O',
    'Ǒ': 'O',
    'Ȍ': 'O',
    'Ȏ': 'O',
    'Ơ': 'O',
    'Ờ': 'O',
    'Ớ': 'O',
    'Ỡ': 'O',
    'Ở': 'O',
    'Ợ': 'O',
    'Ọ': 'O',
    'Ộ': 'O',
    'Ǫ': 'O',
    'Ǭ': 'O',
    'Ø': 'O',
    'Ǿ': 'O',
    'Ɔ': 'O',
    'Ɵ': 'O',
    'Ꝋ': 'O',
    'Ꝍ': 'O',
    'Ƣ': 'OI',
    'Ꝏ': 'OO',
    'Ȣ': 'OU',
    'Ⓟ': 'P',
    'Ｐ': 'P',
    'Ṕ': 'P',
    'Ṗ': 'P',
    'Ƥ': 'P',
    'Ᵽ': 'P',
    'Ꝑ': 'P',
    'Ꝓ': 'P',
    'Ꝕ': 'P',
    'Ⓠ': 'Q',
    'Ｑ': 'Q',
    'Ꝗ': 'Q',
    'Ꝙ': 'Q',
    'Ɋ': 'Q',
    'Ⓡ': 'R',
    'Ｒ': 'R',
    'Ŕ': 'R',
    'Ṙ': 'R',
    'Ř': 'R',
    'Ȑ': 'R',
    'Ȓ': 'R',
    'Ṛ': 'R',
    'Ṝ': 'R',
    'Ŗ': 'R',
    'Ṟ': 'R',
    'Ɍ': 'R',
    'Ɽ': 'R',
    'Ꝛ': 'R',
    'Ꞧ': 'R',
    'Ꞃ': 'R',
    'Ⓢ': 'S',
    'Ｓ': 'S',
    'ẞ': 'S',
    'Ś': 'S',
    'Ṥ': 'S',
    'Ŝ': 'S',
    'Ṡ': 'S',
    'Š': 'S',
    'Ṧ': 'S',
    'Ṣ': 'S',
    'Ṩ': 'S',
    'Ș': 'S',
    'Ş': 'S',
    'Ȿ': 'S',
    'Ꞩ': 'S',
    'Ꞅ': 'S',
    'Ⓣ': 'T',
    'Ｔ': 'T',
    'Ṫ': 'T',
    'Ť': 'T',
    'Ṭ': 'T',
    'Ț': 'T',
    'Ţ': 'T',
    'Ṱ': 'T',
    'Ṯ': 'T',
    'Ŧ': 'T',
    'Ƭ': 'T',
    'Ʈ': 'T',
    'Ⱦ': 'T',
    'Ꞇ': 'T',
    'Ꜩ': 'TZ',
    'Ⓤ': 'U',
    'Ｕ': 'U',
    'Ù': 'U',
    'Ú': 'U',
    'Û': 'U',
    'Ũ': 'U',
    'Ṹ': 'U',
    'Ū': 'U',
    'Ṻ': 'U',
    'Ŭ': 'U',
    'Ü': 'U',
    'Ǜ': 'U',
    'Ǘ': 'U',
    'Ǖ': 'U',
    'Ǚ': 'U',
    'Ủ': 'U',
    'Ů': 'U',
    'Ű': 'U',
    'Ǔ': 'U',
    'Ȕ': 'U',
    'Ȗ': 'U',
    'Ư': 'U',
    'Ừ': 'U',
    'Ứ': 'U',
    'Ữ': 'U',
    'Ử': 'U',
    'Ự': 'U',
    'Ụ': 'U',
    'Ṳ': 'U',
    'Ų': 'U',
    'Ṷ': 'U',
    'Ṵ': 'U',
    'Ʉ': 'U',
    'Ⓥ': 'V',
    'Ｖ': 'V',
    'Ṽ': 'V',
    'Ṿ': 'V',
    'Ʋ': 'V',
    'Ꝟ': 'V',
    'Ʌ': 'V',
    'Ꝡ': 'VY',
    'Ⓦ': 'W',
    'Ｗ': 'W',
    'Ẁ': 'W',
    'Ẃ': 'W',
    'Ŵ': 'W',
    'Ẇ': 'W',
    'Ẅ': 'W',
    'Ẉ': 'W',
    'Ⱳ': 'W',
    'Ⓧ': 'X',
    'Ｘ': 'X',
    'Ẋ': 'X',
    'Ẍ': 'X',
    'Ⓨ': 'Y',
    'Ｙ': 'Y',
    'Ỳ': 'Y',
    'Ý': 'Y',
    'Ŷ': 'Y',
    'Ỹ': 'Y',
    'Ȳ': 'Y',
    'Ẏ': 'Y',
    'Ÿ': 'Y',
    'Ỷ': 'Y',
    'Ỵ': 'Y',
    'Ƴ': 'Y',
    'Ɏ': 'Y',
    'Ỿ': 'Y',
    'Ⓩ': 'Z',
    'Ｚ': 'Z',
    'Ź': 'Z',
    'Ẑ': 'Z',
    'Ż': 'Z',
    'Ž': 'Z',
    'Ẓ': 'Z',
    'Ẕ': 'Z',
    'Ƶ': 'Z',
    'Ȥ': 'Z',
    'Ɀ': 'Z',
    'Ⱬ': 'Z',
    'Ꝣ': 'Z',
    'ⓐ': 'a',
    'ａ': 'a',
    'ẚ': 'a',
    'à': 'a',
    'á': 'a',
    'â': 'a',
    'ầ': 'a',
    'ấ': 'a',
    'ẫ': 'a',
    'ẩ': 'a',
    'ã': 'a',
    'ā': 'a',
    'ă': 'a',
    'ằ': 'a',
    'ắ': 'a',
    'ẵ': 'a',
    'ẳ': 'a',
    'ȧ': 'a',
    'ǡ': 'a',
    'ä': 'a',
    'ǟ': 'a',
    'ả': 'a',
    'å': 'a',
    'ǻ': 'a',
    'ǎ': 'a',
    'ȁ': 'a',
    'ȃ': 'a',
    'ạ': 'a',
    'ậ': 'a',
    'ặ': 'a',
    'ḁ': 'a',
    'ą': 'a',
    'ⱥ': 'a',
    'ɐ': 'a',
    'ꜳ': 'aa',
    'æ': 'ae',
    'ǽ': 'ae',
    'ǣ': 'ae',
    'ꜵ': 'ao',
    'ꜷ': 'au',
    'ꜹ': 'av',
    'ꜻ': 'av',
    'ꜽ': 'ay',
    'ⓑ': 'b',
    'ｂ': 'b',
    'ḃ': 'b',
    'ḅ': 'b',
    'ḇ': 'b',
    'ƀ': 'b',
    'ƃ': 'b',
    'ɓ': 'b',
    'ⓒ': 'c',
    'ｃ': 'c',
    'ć': 'c',
    'ĉ': 'c',
    'ċ': 'c',
    'č': 'c',
    'ç': 'c',
    'ḉ': 'c',
    'ƈ': 'c',
    'ȼ': 'c',
    'ꜿ': 'c',
    'ↄ': 'c',
    'ⓓ': 'd',
    'ｄ': 'd',
    'ḋ': 'd',
    'ď': 'd',
    'ḍ': 'd',
    'ḑ': 'd',
    'ḓ': 'd',
    'ḏ': 'd',
    'đ': 'd',
    'ƌ': 'd',
    'ɖ': 'd',
    'ɗ': 'd',
    'ꝺ': 'd',
    'ǳ': 'dz',
    'ǆ': 'dz',
    'ⓔ': 'e',
    'ｅ': 'e',
    'è': 'e',
    'é': 'e',
    'ê': 'e',
    'ề': 'e',
    'ế': 'e',
    'ễ': 'e',
    'ể': 'e',
    'ẽ': 'e',
    'ē': 'e',
    'ḕ': 'e',
    'ḗ': 'e',
    'ĕ': 'e',
    'ė': 'e',
    'ë': 'e',
    'ẻ': 'e',
    'ě': 'e',
    'ȅ': 'e',
    'ȇ': 'e',
    'ẹ': 'e',
    'ệ': 'e',
    'ȩ': 'e',
    'ḝ': 'e',
    'ę': 'e',
    'ḙ': 'e',
    'ḛ': 'e',
    'ɇ': 'e',
    'ɛ': 'e',
    'ǝ': 'e',
    'ⓕ': 'f',
    'ｆ': 'f',
    'ḟ': 'f',
    'ƒ': 'f',
    'ꝼ': 'f',
    'ⓖ': 'g',
    'ｇ': 'g',
    'ǵ': 'g',
    'ĝ': 'g',
    'ḡ': 'g',
    'ğ': 'g',
    'ġ': 'g',
    'ǧ': 'g',
    'ģ': 'g',
    'ǥ': 'g',
    'ɠ': 'g',
    'ꞡ': 'g',
    'ᵹ': 'g',
    'ꝿ': 'g',
    'ⓗ': 'h',
    'ｈ': 'h',
    'ĥ': 'h',
    'ḣ': 'h',
    'ḧ': 'h',
    'ȟ': 'h',
    'ḥ': 'h',
    'ḩ': 'h',
    'ḫ': 'h',
    'ẖ': 'h',
    'ħ': 'h',
    'ⱨ': 'h',
    'ⱶ': 'h',
    'ɥ': 'h',
    'ƕ': 'hv',
    'ⓘ': 'i',
    'ｉ': 'i',
    'ì': 'i',
    'í': 'i',
    'î': 'i',
    'ĩ': 'i',
    'ī': 'i',
    'ĭ': 'i',
    'ï': 'i',
    'ḯ': 'i',
    'ỉ': 'i',
    'ǐ': 'i',
    'ȉ': 'i',
    'ȋ': 'i',
    'ị': 'i',
    'į': 'i',
    'ḭ': 'i',
    'ɨ': 'i',
    'ı': 'i',
    'ⓙ': 'j',
    'ｊ': 'j',
    'ĵ': 'j',
    'ǰ': 'j',
    'ɉ': 'j',
    'ⓚ': 'k',
    'ｋ': 'k',
    'ḱ': 'k',
    'ǩ': 'k',
    'ḳ': 'k',
    'ķ': 'k',
    'ḵ': 'k',
    'ƙ': 'k',
    'ⱪ': 'k',
    'ꝁ': 'k',
    'ꝃ': 'k',
    'ꝅ': 'k',
    'ꞣ': 'k',
    'ⓛ': 'l',
    'ｌ': 'l',
    'ŀ': 'l',
    'ĺ': 'l',
    'ľ': 'l',
    'ḷ': 'l',
    'ḹ': 'l',
    'ļ': 'l',
    'ḽ': 'l',
    'ḻ': 'l',
    'ſ': 'l',
    'ł': 'l',
    'ƚ': 'l',
    'ɫ': 'l',
    'ⱡ': 'l',
    'ꝉ': 'l',
    'ꞁ': 'l',
    'ꝇ': 'l',
    'ǉ': 'lj',
    'ⓜ': 'm',
    'ｍ': 'm',
    'ḿ': 'm',
    'ṁ': 'm',
    'ṃ': 'm',
    'ɱ': 'm',
    'ɯ': 'm',
    'ⓝ': 'n',
    'ｎ': 'n',
    'ǹ': 'n',
    'ń': 'n',
    'ñ': 'n',
    'ṅ': 'n',
    'ň': 'n',
    'ṇ': 'n',
    'ņ': 'n',
    'ṋ': 'n',
    'ṉ': 'n',
    'ƞ': 'n',
    'ɲ': 'n',
    'ŉ': 'n',
    'ꞑ': 'n',
    'ꞥ': 'n',
    'ǌ': 'nj',
    'ⓞ': 'o',
    'ｏ': 'o',
    'ò': 'o',
    'ó': 'o',
    'ô': 'o',
    'ồ': 'o',
    'ố': 'o',
    'ỗ': 'o',
    'ổ': 'o',
    'õ': 'o',
    'ṍ': 'o',
    'ȭ': 'o',
    'ṏ': 'o',
    'ō': 'o',
    'ṑ': 'o',
    'ṓ': 'o',
    'ŏ': 'o',
    'ȯ': 'o',
    'ȱ': 'o',
    'ö': 'o',
    'ȫ': 'o',
    'ỏ': 'o',
    'ő': 'o',
    'ǒ': 'o',
    'ȍ': 'o',
    'ȏ': 'o',
    'ơ': 'o',
    'ờ': 'o',
    'ớ': 'o',
    'ỡ': 'o',
    'ở': 'o',
    'ợ': 'o',
    'ọ': 'o',
    'ộ': 'o',
    'ǫ': 'o',
    'ǭ': 'o',
    'ø': 'o',
    'ǿ': 'o',
    'ɔ': 'o',
    'ꝋ': 'o',
    'ꝍ': 'o',
    'ɵ': 'o',
    'ƣ': 'oi',
    'ȣ': 'ou',
    'ꝏ': 'oo',
    'ⓟ': 'p',
    'ｐ': 'p',
    'ṕ': 'p',
    'ṗ': 'p',
    'ƥ': 'p',
    'ᵽ': 'p',
    'ꝑ': 'p',
    'ꝓ': 'p',
    'ꝕ': 'p',
    'ⓠ': 'q',
    'ｑ': 'q',
    'ɋ': 'q',
    'ꝗ': 'q',
    'ꝙ': 'q',
    'ⓡ': 'r',
    'ｒ': 'r',
    'ŕ': 'r',
    'ṙ': 'r',
    'ř': 'r',
    'ȑ': 'r',
    'ȓ': 'r',
    'ṛ': 'r',
    'ṝ': 'r',
    'ŗ': 'r',
    'ṟ': 'r',
    'ɍ': 'r',
    'ɽ': 'r',
    'ꝛ': 'r',
    'ꞧ': 'r',
    'ꞃ': 'r',
    'ⓢ': 's',
    'ｓ': 's',
    'ß': 's',
    'ś': 's',
    'ṥ': 's',
    'ŝ': 's',
    'ṡ': 's',
    'š': 's',
    'ṧ': 's',
    'ṣ': 's',
    'ṩ': 's',
    'ș': 's',
    'ş': 's',
    'ȿ': 's',
    'ꞩ': 's',
    'ꞅ': 's',
    'ẛ': 's',
    'ⓣ': 't',
    'ｔ': 't',
    'ṫ': 't',
    'ẗ': 't',
    'ť': 't',
    'ṭ': 't',
    'ț': 't',
    'ţ': 't',
    'ṱ': 't',
    'ṯ': 't',
    'ŧ': 't',
    'ƭ': 't',
    'ʈ': 't',
    'ⱦ': 't',
    'ꞇ': 't',
    'ꜩ': 'tz',
    'ⓤ': 'u',
    'ｕ': 'u',
    'ù': 'u',
    'ú': 'u',
    'û': 'u',
    'ũ': 'u',
    'ṹ': 'u',
    'ū': 'u',
    'ṻ': 'u',
    'ŭ': 'u',
    'ü': 'u',
    'ǜ': 'u',
    'ǘ': 'u',
    'ǖ': 'u',
    'ǚ': 'u',
    'ủ': 'u',
    'ů': 'u',
    'ű': 'u',
    'ǔ': 'u',
    'ȕ': 'u',
    'ȗ': 'u',
    'ư': 'u',
    'ừ': 'u',
    'ứ': 'u',
    'ữ': 'u',
    'ử': 'u',
    'ự': 'u',
    'ụ': 'u',
    'ṳ': 'u',
    'ų': 'u',
    'ṷ': 'u',
    'ṵ': 'u',
    'ʉ': 'u',
    'ⓥ': 'v',
    'ｖ': 'v',
    'ṽ': 'v',
    'ṿ': 'v',
    'ʋ': 'v',
    'ꝟ': 'v',
    'ʌ': 'v',
    'ꝡ': 'vy',
    'ⓦ': 'w',
    'ｗ': 'w',
    'ẁ': 'w',
    'ẃ': 'w',
    'ŵ': 'w',
    'ẇ': 'w',
    'ẅ': 'w',
    'ẘ': 'w',
    'ẉ': 'w',
    'ⱳ': 'w',
    'ⓧ': 'x',
    'ｘ': 'x',
    'ẋ': 'x',
    'ẍ': 'x',
    'ⓨ': 'y',
    'ｙ': 'y',
    'ỳ': 'y',
    'ý': 'y',
    'ŷ': 'y',
    'ỹ': 'y',
    'ȳ': 'y',
    'ẏ': 'y',
    'ÿ': 'y',
    'ỷ': 'y',
    'ẙ': 'y',
    'ỵ': 'y',
    'ƴ': 'y',
    'ɏ': 'y',
    'ỿ': 'y',
    'ⓩ': 'z',
    'ｚ': 'z',
    'ź': 'z',
    'ẑ': 'z',
    'ż': 'z',
    'ž': 'z',
    'ẓ': 'z',
    'ẕ': 'z',
    'ƶ': 'z',
    'ȥ': 'z',
    'ɀ': 'z',
    'ⱬ': 'z',
    'ꝣ': 'z',
    'Ά': 'Α',
    'Έ': 'Ε',
    'Ή': 'Η',
    'Ί': 'Ι',
    'Ϊ': 'Ι',
    'Ό': 'Ο',
    'Ύ': 'Υ',
    'Ϋ': 'Υ',
    'Ώ': 'Ω',
    'ά': 'α',
    'έ': 'ε',
    'ή': 'η',
    'ί': 'ι',
    'ϊ': 'ι',
    'ΐ': 'ι',
    'ό': 'ο',
    'ύ': 'υ',
    'ϋ': 'υ',
    'ΰ': 'υ',
    'ω': 'ω',
    'ς': 'σ'
  };

  // Copied from Select2

  function stripDiacritics(text) {
    // Used 'uni range + named function' from http://jsperf.com/diacritics/18
    function match(a) {
      return DIACRITICS[a] || a;
    }

    return ('' + text).replace(/[^\u0000-\u007E]/g, match);
  }

  function defaultMatcher(value, text) {
    return stripDiacritics(value).toUpperCase().indexOf(stripDiacritics(text).toUpperCase());
  }
});
define("ember-power-select/utils/update-input-value", ["exports"], function (exports) {
  "use strict";

  exports["default"] = updateInputValue;

  function updateInputValue(input, value) {
    if (!input || input.value === value) {
      return;
    }
    input.value = value;
  }
});
define('ember-power-select', ['ember-power-select/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-simple-auth/authenticators/base', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var RSVP = _ember['default'].RSVP;

  /**
    The base class for all authenticators. __This serves as a starting point for
    implementing custom authenticators and must not be used directly.__
  
    The authenticator authenticates the session. The actual mechanism used to do
    this might e.g. be posting a set of credentials to a server and in exchange
    retrieving an access token, initiating authentication against an external
    provider like Facebook etc. and depends on the specific authenticator. Any
    data that the authenticator receives upon successful authentication and
    resolves with from the
    {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}
    method is stored in the session and can be accessed via the session service
    and be used by the authorizer (see
    {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) to e.g.
    authorize outgoing requests.
  
    The authenticator also decides whether a set of data that was restored from
    the session store (see
    {{#crossLink "BaseStore/restore:method"}}{{/crossLink}}) makes up an
    authenticated session or not.
  
    __Authenticators for an application are defined in the `app/authenticators`
    directory__, e.g.:
  
    ```js
    // app/authenticators/oauth2.js
    import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
  
    export default OAuth2PasswordGrantAuthenticator.extend({
      ...
    });
    ```
  
    and can then be used with the name Ember CLI automatically registers them
    with in the Ember container:
  
    ```js
    // app/components/login-form.js
    export default Ember.Controller.extend({
      session: Ember.inject.service(),
  
      actions: {
        authenticate: function() {
          this.get('session').authenticate('authenticator:oauth2');
        }
      }
    });
    ```
  
    @class BaseAuthenticator
    @module ember-simple-auth/authenticators/base
    @extends Ember.Object
    @uses Ember.Evented
    @public
  */
  exports['default'] = _ember['default'].Object.extend(_ember['default'].Evented, {
    /**
      __Triggered when the authentication data is updated by the authenticator
      due to an external or scheduled event__. This might happen e.g. if the
      authenticator refreshes an expired token or an event is triggered from an
      external authentication provider that the authenticator uses. The session
      handles that event, passes the updated data back to the authenticator's
      {{#crossLink "BaseAuthenticator/restore:method"}}{{/crossLink}}
      method and handles the result of that invocation accordingly.
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      __Triggered when the authenciation data is invalidated by the authenticator
      due to an external or scheduled event__. This might happen e.g. if a token
      expires or an event is triggered from an external authentication provider
      that the authenticator uses. The session handles that event and will
      invalidate itself when it is triggered.
       @event sessionDataInvalidated
      @public
    */

    /**
      Restores the session from a session data object. __This method is invoked
      by the session either on application startup if session data is restored
      from the session store__ or when properties in the store change due to
      external events (e.g. in another tab) and the new session data needs to be
      validated for whether it constitutes an authenticated session.
       __This method returns a promise. A resolving promise results in the session
      becoming or remaining authenticated.__ Any data the promise resolves with
      will be saved in and accessible via the session service's
      `data.authenticated` property (see
      {{#crossLink "SessionService/data:property"}}{{/crossLink}}). A rejecting
      promise indicates that `data` does not constitute a valid session and will
      result in the session being invalidated or remaining unauthencicated.
       The `BaseAuthenticator`'s implementation always returns a rejecting
      promise. __This method must be overridden in subclasses.__
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore() {
      return RSVP.reject();
    },

    /**
      Authenticates the session with the specified `args`. These options vary
      depending on the actual authentication mechanism the authenticator
      implements (e.g. a set of credentials or a Facebook account id etc.). __The
      session will invoke this method in order to authenticate itself__ (see
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}}).
       __This method returns a promise. A resolving promise will result in the
      session becoming authenticated.__ Any data the promise resolves with will
      be saved in and accessible via the session service's `data.authenticated`
      property (see {{#crossLink "SessionService/data:property"}}{{/crossLink}}).
      A rejecting promise indicates that authentication failed and will result in
      the session remaining unauthenticated.
       The `BaseAuthenticator`'s implementation always returns a rejecting promise
      and thus never authenticates the session. __This method must be overridden
      in subclasses__.
       @method authenticate
      @param {Any} [...args] The arguments that the authenticator requires to authenticate the session
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate() {
      return RSVP.reject();
    },

    /**
      This method is invoked as a callback when the session is invalidated. While
      the session will invalidate itself and clear all authenticated session data,
      it might be necessary for some authenticators to perform additional tasks
      (e.g. invalidating an access token on the server side).
       __This method returns a promise. A resolving promise will result in the
      session becoming unauthenticated.__ A rejecting promise will result in
      invalidation being intercepted and the session remaining authenticated.
       The `BaseAuthenticator`'s implementation always returns a resolving promise
      and thus never intercepts session invalidation. __This method doesn't have
      to be overridden in custom authenticators__ if no actions need to be
      performed on session invalidation.
       @method invalidate
      @param {Object} data The current authenticated session data
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate() {
      return RSVP.resolve();
    }
  });
});
define('ember-simple-auth/authenticators/devise', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  'use strict';

  var Promise = _ember['default'].RSVP.Promise;
  var isEmpty = _ember['default'].isEmpty;
  var run = _ember['default'].run;
  var get = _ember['default'].get;
  var $ = _ember['default'].$;

  /**
    Authenticator that works with the Ruby gem
    [devise](https://github.com/plataformatec/devise).
  
    __As token authentication is not actually part of devise anymore, the server
    needs to implement some customizations__ to work with this authenticator -
    see [this gist](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).
  
    @class DeviseAuthenticator
    @module ember-simple-auth/authenticators/devise
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    /**
      The endpoint on the server that the authentication request is sent to.
       @property serverTokenEndpoint
      @type String
      @default '/users/sign_in'
      @public
    */
    serverTokenEndpoint: '/users/sign_in',

    /**
      The devise resource name. __This will be used in the request and also be
      expected in the server's response.__
       @property resourceName
      @type String
      @default 'user'
      @public
    */
    resourceName: 'user',

    /**
      The token attribute name. __This will be used in the request and also be
      expected in the server's response.__
       @property tokenAttributeName
      @type String
      @default 'token'
      @public
    */
    tokenAttributeName: 'token',

    /**
      The identification attribute name. __This will be used in the request and
      also be expected in the server's response.__
       @property identificationAttributeName
      @type String
      @default 'email'
      @public
    */
    identificationAttributeName: 'email',

    /**
      Restores the session from a session data object; __returns a resolving
      promise when there are non-empty
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
      and
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}
      values in `data`__ and a rejecting promise otherwise.
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _getProperties = this.getProperties('tokenAttributeName', 'identificationAttributeName');

      var tokenAttributeName = _getProperties.tokenAttributeName;
      var identificationAttributeName = _getProperties.identificationAttributeName;

      var tokenAttribute = get(data, tokenAttributeName);
      var identificationAttribute = get(data, identificationAttributeName);

      if (!isEmpty(tokenAttribute) && !isEmpty(identificationAttribute)) {
        return Promise.resolve(data);
      } else {
        return Promise.reject();
      }
    },

    /**
      Authenticates the session with the specified `identification` and
      `password`; the credentials are `POST`ed to the
      {{#crossLink "DeviseAuthenticator/serverTokenEndpoint:property"}}server{{/crossLink}}.
      If the credentials are valid the server will responds with a
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
      and
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}.
      __If the credentials are valid and authentication succeeds, a promise that
      resolves with the server's response is returned__, otherwise a promise that
      rejects with the server error is returned.
       @method authenticate
      @param {String} identification The user's identification
      @param {String} password The user's password
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(identification, password) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var _getProperties2 = _this.getProperties('resourceName', 'identificationAttributeName');

        var resourceName = _getProperties2.resourceName;
        var identificationAttributeName = _getProperties2.identificationAttributeName;

        var data = {};
        data[resourceName] = { password: password };
        data[resourceName][identificationAttributeName] = identification;

        return _this.makeRequest(data).then(function (response) {
          return run(null, resolve, response);
        }, function (xhr) {
          return run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    },

    /**
      Does nothing
       @method invalidate
      @return {Ember.RSVP.Promise} A resolving promise
      @public
    */
    invalidate: function invalidate() {
      return Promise.resolve();
    },

    /**
      Makes a request to the devise server.
       @method makeRequest
      @param {Object} data The request data
      @param {Object} options Ajax configuration object merged into argument of `$.ajax`
      @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
      @protected
    */
    makeRequest: function makeRequest(data, options) {
      var serverTokenEndpoint = this.get('serverTokenEndpoint');
      var requestOptions = $.extend({}, {
        url: serverTokenEndpoint,
        type: 'POST',
        dataType: 'json',
        data: data,
        beforeSend: function beforeSend(xhr, settings) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        }
      }, options || {});

      return $.ajax(requestOptions);
    }
  });
});
define('ember-simple-auth/authenticators/oauth2-password-grant', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  /* jscs:disable requireDotNotation */
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;
  var run = _ember['default'].run;
  var computed = _ember['default'].computed;

  var assign = _ember['default'].assign || _ember['default'].merge;

  /**
    Authenticator that conforms to OAuth 2
    ([RFC 6749](http://tools.ietf.org/html/rfc6749)), specifically the _"Resource
    Owner Password Credentials Grant Type"_.
  
    This authenticator also automatically refreshes access tokens (see
    [RFC 6749, section 6](http://tools.ietf.org/html/rfc6749#section-6)) if the
    server supports it.
  
    @class OAuth2PasswordGrantAuthenticator
    @module ember-simple-auth/authenticators/oauth2-password-grant
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    /**
      Triggered when the authenticator refreshed the access token (see
      [RFC 6749, section 6](http://tools.ietf.org/html/rfc6749#section-6)).
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      The client_id to be sent to the authentication server (see
      https://tools.ietf.org/html/rfc6749#appendix-A.1). __This should only be
      used for statistics or logging etc. as it cannot actually be trusted since
      it could have been manipulated on the client!__
       @property clientId
      @type String
      @default null
      @public
    */
    clientId: null,

    /**
      The endpoint on the server that authentication and token refresh requests
      are sent to.
       @property serverTokenEndpoint
      @type String
      @default '/token'
      @public
    */
    serverTokenEndpoint: '/token',

    /**
      The endpoint on the server that token revocation requests are sent to. Only
      set this if the server actually supports token revokation. If this is
      `null`, the authenticator will not revoke tokens on session invalidation.
       __If token revocation is enabled but fails, session invalidation will be
      intercepted and the session will remain authenticated (see
      {{#crossLink "OAuth2PasswordGrantAuthenticator/invalidate:method"}}{{/crossLink}}).__
       @property serverTokenRevocationEndpoint
      @type String
      @default null
      @public
    */
    serverTokenRevocationEndpoint: null,

    /**
      Sets whether the authenticator automatically refreshes access tokens if the
      server supports it.
       @property refreshAccessTokens
      @type Boolean
      @default true
      @public
    */
    refreshAccessTokens: true,

    _refreshTokenTimeout: null,

    _clientIdHeader: computed('clientId', function () {
      var clientId = this.get('clientId');

      if (!isEmpty(clientId)) {
        var base64ClientId = window.btoa(clientId.concat(':'));
        return { Authorization: 'Basic ' + base64ClientId };
      }
    }),

    /**
      Restores the session from a session data object; __will return a resolving
      promise when there is a non-empty `access_token` in the session data__ and
      a rejecting promise otherwise.
       If the server issues
      [expiring access tokens](https://tools.ietf.org/html/rfc6749#section-5.1)
      and there is an expired access token in the session data along with a
      refresh token, the authenticator will try to refresh the access token and
      return a promise that resolves with the new access token if the refresh was
      successful. If there is no refresh token or the token refresh is not
      successful, a rejecting promise will be returned.
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var now = new Date().getTime();
        var refreshAccessTokens = _this.get('refreshAccessTokens');
        if (!isEmpty(data['expires_at']) && data['expires_at'] < now) {
          if (refreshAccessTokens) {
            _this._refreshAccessToken(data['expires_in'], data['refresh_token']).then(resolve, reject);
          } else {
            reject();
          }
        } else {
          if (isEmpty(data['access_token'])) {
            reject();
          } else {
            _this._scheduleAccessTokenRefresh(data['expires_in'], data['expires_at'], data['refresh_token']);
            resolve(data);
          }
        }
      });
    },

    /**
      Authenticates the session with the specified `identification`, `password`
      and optional `scope`; issues a `POST` request to the
      {{#crossLink "OAuth2PasswordGrantAuthenticator/serverTokenEndpoint:property"}}{{/crossLink}}
      and receives the access token in response (see
      http://tools.ietf.org/html/rfc6749#section-4.3).
       __If the credentials are valid (and the optionally requested scope is
      granted) and thus authentication succeeds, a promise that resolves with the
      server's response is returned__, otherwise a promise that rejects with the
      error as returned by the server is returned.
       __If the
      [server supports it](https://tools.ietf.org/html/rfc6749#section-5.1), this
      method also schedules refresh requests for the access token before it
      expires.__
       @method authenticate
      @param {String} identification The resource owner username
      @param {String} password The resource owner password
      @param {String|Array} scope The scope of the access request (see [RFC 6749, section 3.3](http://tools.ietf.org/html/rfc6749#section-3.3))
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(identification, password) {
      var _this2 = this;

      var scope = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      return new RSVP.Promise(function (resolve, reject) {
        var data = { 'grant_type': 'password', username: identification, password: password };
        var serverTokenEndpoint = _this2.get('serverTokenEndpoint');
        var scopesString = _ember['default'].makeArray(scope).join(' ');
        if (!_ember['default'].isEmpty(scopesString)) {
          data.scope = scopesString;
        }
        _this2.makeRequest(serverTokenEndpoint, data).then(function (response) {
          run(function () {
            var expiresAt = _this2._absolutizeExpirationTime(response['expires_in']);
            _this2._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
            if (!isEmpty(expiresAt)) {
              response = assign(response, { 'expires_at': expiresAt });
            }
            resolve(response);
          });
        }, function (xhr) {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    },

    /**
      If token revocation is enabled, this will revoke the access token (and the
      refresh token if present). If token revocation succeeds, this method
      returns a resolving promise, otherwise it will return a rejecting promise,
      thus intercepting session invalidation.
       If token revocation is not enabled this method simply returns a resolving
      promise.
       @method invalidate
      @param {Object} data The current authenticated session data
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate(data) {
      var _this3 = this;

      var serverTokenRevocationEndpoint = this.get('serverTokenRevocationEndpoint');
      function success(resolve) {
        run.cancel(this._refreshTokenTimeout);
        delete this._refreshTokenTimeout;
        resolve();
      }
      return new RSVP.Promise(function (resolve) {
        if (isEmpty(serverTokenRevocationEndpoint)) {
          success.apply(_this3, [resolve]);
        } else {
          (function () {
            var requests = [];
            _ember['default'].A(['access_token', 'refresh_token']).forEach(function (tokenType) {
              var token = data[tokenType];
              if (!isEmpty(token)) {
                requests.push(_this3.makeRequest(serverTokenRevocationEndpoint, {
                  'token_type_hint': tokenType, token: token
                }));
              }
            });
            var succeed = function succeed() {
              success.apply(_this3, [resolve]);
            };
            RSVP.all(requests).then(succeed, succeed);
          })();
        }
      });
    },

    /**
      Makes a request to the OAuth 2.0 server.
       @method makeRequest
      @param {String} url The request URL
      @param {Object} data The request data
      @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
      @protected
    */
    makeRequest: function makeRequest(url, data) {
      var options = {
        url: url,
        data: data,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded'
      };

      var clientIdHeader = this.get('_clientIdHeader');
      if (!isEmpty(clientIdHeader)) {
        options.headers = clientIdHeader;
      }

      return _ember['default'].$.ajax(options);
    },

    _scheduleAccessTokenRefresh: function _scheduleAccessTokenRefresh(expiresIn, expiresAt, refreshToken) {
      var refreshAccessTokens = this.get('refreshAccessTokens');
      if (refreshAccessTokens) {
        var now = new Date().getTime();
        if (isEmpty(expiresAt) && !isEmpty(expiresIn)) {
          expiresAt = new Date(now + expiresIn * 1000).getTime();
        }
        var offset = (Math.floor(Math.random() * 5) + 5) * 1000;
        if (!isEmpty(refreshToken) && !isEmpty(expiresAt) && expiresAt > now - offset) {
          run.cancel(this._refreshTokenTimeout);
          delete this._refreshTokenTimeout;
          if (!_ember['default'].testing) {
            this._refreshTokenTimeout = run.later(this, this._refreshAccessToken, expiresIn, refreshToken, expiresAt - now - offset);
          }
        }
      }
    },

    _refreshAccessToken: function _refreshAccessToken(expiresIn, refreshToken) {
      var _this4 = this;

      var data = { 'grant_type': 'refresh_token', 'refresh_token': refreshToken };
      var serverTokenEndpoint = this.get('serverTokenEndpoint');
      return new RSVP.Promise(function (resolve, reject) {
        _this4.makeRequest(serverTokenEndpoint, data).then(function (response) {
          run(function () {
            expiresIn = response['expires_in'] || expiresIn;
            refreshToken = response['refresh_token'] || refreshToken;
            var expiresAt = _this4._absolutizeExpirationTime(expiresIn);
            var data = assign(response, { 'expires_in': expiresIn, 'expires_at': expiresAt, 'refresh_token': refreshToken });
            _this4._scheduleAccessTokenRefresh(expiresIn, null, refreshToken);
            _this4.trigger('sessionDataUpdated', data);
            resolve(data);
          });
        }, function (xhr, status, error) {
          _ember['default'].Logger.warn('Access token could not be refreshed - server responded with ' + error + '.');
          reject();
        });
      });
    },

    _absolutizeExpirationTime: function _absolutizeExpirationTime(expiresIn) {
      if (!isEmpty(expiresIn)) {
        return new Date(new Date().getTime() + expiresIn * 1000).getTime();
      }
    }
  });
});
define('ember-simple-auth/authenticators/test', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  'use strict';

  var RSVP = _ember['default'].RSVP;

  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    restore: function restore(data) {
      return RSVP.resolve(data);
    },

    authenticate: function authenticate(data) {
      return RSVP.resolve(data);
    },

    invalidate: function invalidate() {
      return RSVP.resolve();
    }
  });
});
define('ember-simple-auth/authenticators/torii', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;

  /**
    Authenticator that wraps the
    [Torii library](https://github.com/Vestorly/torii) and thus allows to connect
    any external authentication provider that torii defines a provider for.
  
    In order to use this authenticator, __the application needs to have the
    [torii addon](https://github.com/Vestorly/torii) installed and must inject
    the torii service into the authenticator__:
  
    ```js
    // app/authenticators/torii.js
    import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
  
    export default ToriiAuthenticator.extend({
      torii: Ember.inject.service()
    });
    ```
  
    @class ToriiAuthenticator
    @module ember-simple-auth/authenticators/torii
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    _provider: null,

    /**
      Restores the session by calling the torii provider's `fetch` method.
       __Many torii providers do not implement the `fetch` method__. If the
      provider in use does not implement the method simply add it as follows:
       ```js
      // app/torii-providers/facebook.js
      import FacebookOauth2Provider from 'torii/providers/facebook-oauth2';
       export default FacebookOauth2Provider.extend({
        fetch(data) {
          return data;
        }
      });
      ```
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _this = this;

      this._assertToriiIsPresent();

      data = data || {};
      if (!isEmpty(data.provider)) {
        var _ret = (function () {
          var _data = data;
          var provider = _data.provider;

          return {
            v: _this.get('torii').fetch(data.provider, data).then(function (data) {
              _this._authenticateWithProvider(provider, data);
              return data;
            }, function () {
              return delete _this._provider;
            })
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      } else {
        delete this._provider;
        return RSVP.reject();
      }
    },

    /**
      Authenticates the session by opening the specified torii provider. For more
      documentation on torii and its providers abstraction, see the
      [project's README](https://github.com/Vestorly/torii#readme), specifically
      the
      [section on providers](https://github.com/Vestorly/torii#configuring-a-torii-provider).
       @method authenticate
      @param {String} provider The torii provider to authenticate the session with
      @param {Object} options The options to pass to the torii provider
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(provider, options) {
      var _this2 = this;

      this._assertToriiIsPresent();

      return this.get('torii').open(provider, options || {}).then(function (data) {
        _this2._authenticateWithProvider(provider, data);
        return data;
      });
    },

    /**
      Closes the torii provider. If the provider is successfully closed, this
      method returns a resolving promise, otherwise it will return a rejecting
      promise, thus intercepting session invalidation.
       @method invalidate
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate(data) {
      var _this3 = this;

      return this.get('torii').close(this._provider, data).then(function () {
        delete _this3._provider;
      });
    },

    _authenticateWithProvider: function _authenticateWithProvider(provider, data) {
      data.provider = provider;
      this._provider = data.provider;
    },

    _assertToriiIsPresent: function _assertToriiIsPresent() {
      var torii = this.get('torii');
      _ember['default'].assert('You are trying to use the torii authenticator but torii is not available. Inject torii into the authenticator with "torii: Ember.inject.service()".', _ember['default'].isPresent(torii));
    }
  });
});
define('ember-simple-auth/authorizers/base', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  /**
    The base class for all authorizers. __This serves as a starting point for
    implementing custom authorizers and must not be used directly.__
  
    Authorizers use the session data aqcuired by an authenticator when
    authenticating the session to construct authrorization data that can e.g. be
    injected into outgoing network requests etc. Depending on the authorization
    mechanism the authorizer implements, that authorization data might be an HTTP
    header, query string parameters, a cookie etc.
  
    __The authorizer has to fit the authenticator__ (see
    {{#crossLink "BaseAuthenticator"}}{{/crossLink}})
    as it can only use data that the authenticator acquires when authenticating
    the session.
  
    @class BaseAuthorizer
    @module ember-simple-auth/authorizers/base
    @extends Ember.Object
    @public
  */
  exports['default'] = _ember['default'].Object.extend({
    /**
      Authorizes a block of code. This method will be invoked by the session
      service's {{#crossLink "SessionService/authorize:method"}}{{/crossLink}}
      method which will pass the current authenticated session data (see
      {{#crossLink "SessionService/data:property"}}{{/crossLink}}) and a block.
      Depending on the mechanism it implements, the authorizer transforms the
      session data into authorization data and invokes the block with that data.
       `BaseAuthorizer`'s implementation does nothing. __This method must be
      overridden in custom authorizers.__
       @method authorize
      @param {Object} data The current authenticated session data
      @param {Function} block The callback to call with the authorization data
      @public
    */
    authorize: function authorize() {}
  });
});
define('ember-simple-auth/authorizers/devise', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, _ember, _emberSimpleAuthAuthorizersBase) {
  'use strict';

  var isEmpty = _ember['default'].isEmpty;

  /**
    Authorizer that works with the Ruby gem
    [devise](https://github.com/plataformatec/devise); includes the user's token
    and identification from the session data in the `Authorization` HTTP header,
    e.g.:
  
    ```
    Authorization: token="234rtgjneroigne4" email="user@domain.tld"
    ```
  
    __As token authentication is not actually part of devise anymore, the server
    needs to implement some customizations__ to work with this authenticator -
    see [this gist](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).
  
    @class DeviseAuthorizer
    @module ember-simple-auth/authorizers/devise
    @extends BaseAuthorizer
    @public
  */
  exports['default'] = _emberSimpleAuthAuthorizersBase['default'].extend({
    /**
      The token attribute name.
       @property tokenAttributeName
      @type String
      @default 'token'
      @public
    */
    tokenAttributeName: 'token',

    /**
      The identification attribute name.
       @property identificationAttributeName
      @type String
      @default 'email'
      @public
    */
    identificationAttributeName: 'email',

    /**
      Includes the user's token (see
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}{{/crossLink}})
      and identification (see
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}{{/crossLink}})
      in the `Authorization` header.
       @method authorize
      @param {Object} data The data that the session currently holds
      @param {Function} block(headerName,headerContent) The callback to call with the authorization data; will receive the header name and header content as arguments
      @public
    */
    authorize: function authorize(data, block) {
      var _getProperties = this.getProperties('tokenAttributeName', 'identificationAttributeName');

      var tokenAttributeName = _getProperties.tokenAttributeName;
      var identificationAttributeName = _getProperties.identificationAttributeName;

      var userToken = data[tokenAttributeName];
      var userIdentification = data[identificationAttributeName];

      if (!isEmpty(userToken) && !isEmpty(userIdentification)) {
        var authData = tokenAttributeName + '="' + userToken + '", ' + identificationAttributeName + '="' + userIdentification + '"';
        block('Authorization', 'Token ' + authData);
      }
    }
  });
});
define('ember-simple-auth/authorizers/oauth2-bearer', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, _ember, _emberSimpleAuthAuthorizersBase) {
  /* jscs:disable requireDotNotation */
  'use strict';

  var isEmpty = _ember['default'].isEmpty;

  /**
    Authorizer that conforms to OAuth 2
    ([RFC 6749](http://tools.ietf.org/html/rfc6749)); includes the access token
    from the session data as a bearer token
    ([RFC 6750](http://tools.ietf.org/html/rfc6750)) in the `Authorization`
    header, e.g.:
  
    ```
    Authorization: Bearer 234rtgjneroigne4
    ```
  
    @class OAuth2BearerAuthorizer
    @module ember-simple-auth/authorizers/oauth2-bearer
    @extends BaseAuthorizer
    @public
  */
  exports['default'] = _emberSimpleAuthAuthorizersBase['default'].extend({
    /**
      Includes the access token from the session data into the `Authorization`
      header as a Bearer token, e.g.:
       ```
      Authorization: Bearer 234rtgjneroigne4
      ```
       @method authorize
      @param {Object} data The data that the session currently holds
      @param {Function} block(headerName,headerContent) The callback to call with the authorization data; will receive the header name and header content as arguments
      @public
    */
    authorize: function authorize(data, block) {
      var accessToken = data['access_token'];

      if (!isEmpty(accessToken)) {
        block('Authorization', 'Bearer ' + accessToken);
      }
    }
  });
});
define('ember-simple-auth/configuration', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var getWithDefault = _ember['default'].getWithDefault;

  var DEFAULTS = {
    baseURL: '',
    authenticationRoute: 'login',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index'
  };

  /**
    Ember Simple Auth's configuration object.
  
    To change any of these values, set them on the application's environment
    object, e.g.:
  
    ```js
    // config/environment.js
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'sign-in'
    };
    ```
  
    @class Configuration
    @extends Object
    @module ember-simple-auth/configuration
    @public
  */
  exports['default'] = {
    /**
      The base URL of the application as configured in `config/environment.js`.
       @property baseURL
      @readOnly
      @static
      @type String
      @default ''
      @public
    */
    baseURL: DEFAULTS.baseURL,

    /**
      The route to transition to for authentication. The
      {{#crossLink "AuthenticatedRouteMixin"}}{{/crossLink}} will transition to
      this route when a route that implements the mixin is accessed when the
      route is not authenticated.
       @property authenticationRoute
      @readOnly
      @static
      @type String
      @default 'login'
      @public
    */
    authenticationRoute: DEFAULTS.authenticationRoute,

    /**
      The route to transition to after successful authentication.
       @property routeAfterAuthentication
      @readOnly
      @static
      @type String
      @default 'index'
      @public
    */
    routeAfterAuthentication: DEFAULTS.routeAfterAuthentication,

    /**
      The route to transition to if a route that implements the
      {{#crossLink "UnauthenticatedRouteMixin"}}{{/crossLink}} is accessed when
      the session is authenticated.
       @property routeIfAlreadyAuthenticated
      @readOnly
      @static
      @type String
      @default 'index'
      @public
    */
    routeIfAlreadyAuthenticated: DEFAULTS.routeIfAlreadyAuthenticated,

    load: function load(config) {
      for (var property in this) {
        if (this.hasOwnProperty(property) && _ember['default'].typeOf(this[property]) !== 'function') {
          this[property] = getWithDefault(config, property, DEFAULTS[property]);
        }
      }
    }
  };
});
define('ember-simple-auth/initializers/setup-session-service', ['exports', 'ember-simple-auth/utils/inject'], function (exports, _emberSimpleAuthUtilsInject) {
  'use strict';

  exports['default'] = setupSessionStore;

  function setupSessionStore(registry) {
    (0, _emberSimpleAuthUtilsInject['default'])(registry, 'service:session', 'session', 'session:main');
  }
});
define('ember-simple-auth/initializers/setup-session', ['exports', 'ember', 'ember-simple-auth/internal-session', 'ember-simple-auth/session-stores/ephemeral', 'ember-simple-auth/utils/inject'], function (exports, _ember, _emberSimpleAuthInternalSession, _emberSimpleAuthSessionStoresEphemeral, _emberSimpleAuthUtilsInject) {
  'use strict';

  exports['default'] = setupSession;

  function setupSession(registry) {
    registry.register('session:main', _emberSimpleAuthInternalSession['default']);

    var store = 'session-store:application';
    if (_ember['default'].testing) {
      store = 'session-store:test';
      registry.register(store, _emberSimpleAuthSessionStoresEphemeral['default']);
    }
    (0, _emberSimpleAuthUtilsInject['default'])(registry, 'session:main', 'store', store);
  }
});
define('ember-simple-auth/instance-initializers/setup-session-restoration', ['exports', 'ember-simple-auth/utils/lookup'], function (exports, _emberSimpleAuthUtilsLookup) {
  'use strict';

  exports['default'] = setupSessionRestoration;

  function setupSessionRestoration(instance) {
    var applicationRoute = (0, _emberSimpleAuthUtilsLookup['default'])(instance, 'route:application');
    var session = (0, _emberSimpleAuthUtilsLookup['default'])(instance, 'session:main');
    var originalBeforeModel = applicationRoute.beforeModel;
    var applyOriginalBeforeModel = function applyOriginalBeforeModel() {
      return originalBeforeModel.apply(applicationRoute, arguments);
    };
    applicationRoute.reopen({
      beforeModel: function beforeModel() {
        var _arguments = arguments;

        return session.restore().then(function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        }, function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        });
      }
    });
  }
});
define('ember-simple-auth/internal-session', ['exports', 'ember', 'ember-getowner-polyfill'], function (exports, _ember, _emberGetownerPolyfill) {
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var isNone = _ember['default'].isNone;
  var isEmpty = _ember['default'].isEmpty;

  var assign = _ember['default'].assign || _ember['default'].merge;

  exports['default'] = _ember['default'].ObjectProxy.extend(_ember['default'].Evented, {
    authenticator: null,
    store: null,
    isAuthenticated: false,
    attemptedTransition: null,

    init: function init() {
      this._super.apply(this, arguments);
      this.set('content', { authenticated: {} });
      this._busy = false;
      this._bindToStoreEvents();
    },

    authenticate: function authenticate(authenticatorFactory) {
      var _this = this;

      this._busy = true;
      _ember['default'].assert('Session#authenticate requires the authenticator to be specified, was "' + authenticatorFactory + '"!', !isEmpty(authenticatorFactory));
      var authenticator = this._lookupAuthenticator(authenticatorFactory);
      _ember['default'].assert('No authenticator for factory "' + authenticatorFactory + '" could be found!', !isNone(authenticator));

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return authenticator.authenticate.apply(authenticator, args).then(function (content) {
        _this._busy = false;
        return _this._setup(authenticatorFactory, content, true);
      }, function (error) {
        var rejectWithError = function rejectWithError() {
          return RSVP.Promise.reject(error);
        };

        _this._busy = false;
        return _this._clear().then(rejectWithError, rejectWithError);
      });
    },

    invalidate: function invalidate() {
      var _this2 = this;

      this._busy = true;
      _ember['default'].assert('Session#invalidate requires the session to be authenticated!', this.get('isAuthenticated'));

      var authenticator = this._lookupAuthenticator(this.authenticator);
      return authenticator.invalidate(this.content.authenticated).then(function () {
        authenticator.off('sessionDataUpdated');
        _this2._busy = false;
        return _this2._clear(true);
      }, function (error) {
        _this2.trigger('sessionInvalidationFailed', error);
        _this2._busy = false;
        return RSVP.Promise.reject(error);
      });
    },

    restore: function restore() {
      var _this3 = this;

      this._busy = true;
      var reject = function reject() {
        return RSVP.Promise.reject();
      };

      return this._callStoreAsync('restore').then(function (restoredContent) {
        var _ref = restoredContent.authenticated || {};

        var authenticatorFactory = _ref.authenticator;

        if (!!authenticatorFactory) {
          delete restoredContent.authenticated.authenticator;
          var authenticator = _this3._lookupAuthenticator(authenticatorFactory);
          return authenticator.restore(restoredContent.authenticated).then(function (content) {
            _this3.set('content', restoredContent);
            _this3._busy = false;
            return _this3._setup(authenticatorFactory, content);
          }, function (err) {
            _ember['default'].Logger.debug('The authenticator "' + authenticatorFactory + '" rejected to restore the session - invalidating…');
            if (err) {
              _ember['default'].Logger.debug(err);
            }
            _this3._busy = false;
            return _this3._clearWithContent(restoredContent).then(reject, reject);
          });
        } else {
          delete (restoredContent || {}).authenticated;
          _this3._busy = false;
          return _this3._clearWithContent(restoredContent).then(reject, reject);
        }
      }, function () {
        _this3._busy = false;
        return _this3._clear().then(reject, reject);
      });
    },

    _callStoreAsync: function _callStoreAsync(method) {
      var _store;

      for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      var result = (_store = this.store)[method].apply(_store, params);

      if (typeof result === 'undefined' || typeof result.then === 'undefined') {
        _ember['default'].deprecate('Ember Simple Auth: Synchronous stores have been deprecated. Make sure your custom store\'s ' + method + ' method returns a promise.', false, {
          id: 'ember-simple-auth.session-store.synchronous-' + method,
          until: '2.0.0'
        });
        return RSVP.Promise.resolve(result);
      } else {
        return result;
      }
    },

    _setup: function _setup(authenticator, authenticatedContent, trigger) {
      var _this4 = this;

      trigger = !!trigger && !this.get('isAuthenticated');
      this.beginPropertyChanges();
      this.setProperties({
        isAuthenticated: true,
        authenticator: authenticator
      });
      _ember['default'].set(this.content, 'authenticated', authenticatedContent);
      this._bindToAuthenticatorEvents();

      return this._updateStore().then(function () {
        _this4.endPropertyChanges();
        if (trigger) {
          _this4.trigger('authenticationSucceeded');
        }
      }, function () {
        _this4.setProperties({
          isAuthenticated: false,
          authenticator: null
        });
        _ember['default'].set(_this4.content, 'authenticated', {});
        _this4.endPropertyChanges();
      });
    },

    _clear: function _clear(trigger) {
      var _this5 = this;

      trigger = !!trigger && this.get('isAuthenticated');
      this.beginPropertyChanges();
      this.setProperties({
        isAuthenticated: false,
        authenticator: null
      });
      _ember['default'].set(this.content, 'authenticated', {});

      return this._updateStore().then(function () {
        _this5.endPropertyChanges();
        if (trigger) {
          _this5.trigger('invalidationSucceeded');
        }
      }, function () {
        return _this5.endPropertyChanges();
      });
    },

    _clearWithContent: function _clearWithContent(content, trigger) {
      this.set('content', content);
      return this._clear(trigger);
    },

    setUnknownProperty: function setUnknownProperty(key, value) {
      _ember['default'].assert('"authenticated" is a reserved key used by Ember Simple Auth!', key !== 'authenticated');
      var result = this._super(key, value);
      this._updateStore();
      return result;
    },

    _updateStore: function _updateStore() {
      var data = this.content;
      if (!_ember['default'].isEmpty(this.authenticator)) {
        _ember['default'].set(data, 'authenticated', assign({ authenticator: this.authenticator }, data.authenticated || {}));
      }
      return this._callStoreAsync('persist', data);
    },

    _bindToAuthenticatorEvents: function _bindToAuthenticatorEvents() {
      var _this6 = this;

      var authenticator = this._lookupAuthenticator(this.authenticator);
      authenticator.off('sessionDataUpdated');
      authenticator.off('sessionDataInvalidated');
      authenticator.on('sessionDataUpdated', function (content) {
        _this6._setup(_this6.authenticator, content);
      });
      authenticator.on('sessionDataInvalidated', function () {
        _this6._clear(true);
      });
    },

    _bindToStoreEvents: function _bindToStoreEvents() {
      var _this7 = this;

      this.store.on('sessionDataUpdated', function (content) {
        if (!_this7._busy) {
          (function () {
            _this7._busy = true;

            var _ref2 = content.authenticated || {};

            var authenticatorFactory = _ref2.authenticator;

            if (!!authenticatorFactory) {
              delete content.authenticated.authenticator;
              var authenticator = _this7._lookupAuthenticator(authenticatorFactory);
              authenticator.restore(content.authenticated).then(function (authenticatedContent) {
                _this7.set('content', content);
                _this7._busy = false;
                _this7._setup(authenticatorFactory, authenticatedContent, true);
              }, function (err) {
                _ember['default'].Logger.debug('The authenticator "' + authenticatorFactory + '" rejected to restore the session - invalidating…');
                if (err) {
                  _ember['default'].Logger.debug(err);
                }
                _this7._busy = false;
                _this7._clearWithContent(content, true);
              });
            } else {
              _this7._busy = false;
              _this7._clearWithContent(content, true);
            }
          })();
        }
      });
    },

    _lookupAuthenticator: function _lookupAuthenticator(authenticator) {
      return (0, _emberGetownerPolyfill['default'])(this).lookup(authenticator);
    }
  });
});
define('ember-simple-auth/mixins/application-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, _ember, _emberSimpleAuthConfiguration) {
  'use strict';

  var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  })();

  var inject = _ember['default'].inject;

  /**
    The mixin for the application route; __defines methods that are called when
    the session was successfully authenticated (see
    {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}})
    or invalidated__ (see
    {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}).
  
    __Using this mixin is optional.__ The session events can also be handled
    manually, e.g. in an instance initializer:
  
    ```js
    // app/instance-initializers/session-events.js
    export function initialize(instance) {
      const applicationRoute = instance.container.lookup('route:application');
      const session          = instance.container.lookup('service:session');
      session.on('authenticationSucceeded', function() {
        applicationRoute.transitionTo('index');
      });
      session.on('invalidationSucceeded', function() {
        window.location.reload();
      });
    };
  
    export default {
      initialize,
      name:  'session-events',
      after: 'ember-simple-auth'
    };
    ```
  
    __When using the `ApplicationRouteMixin` you need to specify
    `needs: ['service:session']` in the application route's unit test.__
  
    @class ApplicationRouteMixin
    @module ember-simple-auth/mixins/application-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = _ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: inject.service('session'),

    init: function init() {
      this._super.apply(this, arguments);
      this._subscribeToSessionEvents();
    },

    _subscribeToSessionEvents: function _subscribeToSessionEvents() {
      var _this = this,
          _arguments = arguments;

      _ember['default'].A([['authenticationSucceeded', 'sessionAuthenticated'], ['invalidationSucceeded', 'sessionInvalidated']]).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var event = _ref2[0];
        var method = _ref2[1];

        _this.get('session').on(event, _ember['default'].run.bind(_this, function () {
          _this[method].apply(_this, _arguments);
        }));
      });
    },

    /**
      This method handles the session's
      {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}}
      event. If there is a transition that was previously intercepted by
      {{#crossLink "AuthenticatedRouteMixin/beforeModel:method"}}the
      AuthenticatedRouteMixin's `beforeModel` method{{/crossLink}} it will retry
      it. If there is no such transition, this action transitions to the
      {{#crossLink "Configuration/routeAfterAuthentication:property"}}{{/crossLink}}.
       @method sessionAuthenticated
      @public
    */
    sessionAuthenticated: function sessionAuthenticated() {
      var attemptedTransition = this.get('session.attemptedTransition');

      if (attemptedTransition) {
        attemptedTransition.retry();
        this.set('session.attemptedTransition', null);
      } else {
        this.transitionTo(_emberSimpleAuthConfiguration['default'].routeAfterAuthentication);
      }
    },

    /**
      This method handles the session's
      {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}
      event. __It reloads the Ember.js application__ by redirecting the browser
      to the application's root URL so that all in-memory data (such as Ember
      Data stores etc.) gets cleared.
       If the Ember.js application will be used in an environment where the users
      don't have direct access to any data stored on the client (e.g.
      [cordova](http://cordova.apache.org)) this action can be overridden to e.g.
      simply transition to the index route.
       @method sessionInvalidated
      @public
    */
    sessionInvalidated: function sessionInvalidated() {
      if (!_ember['default'].testing) {
        window.location.replace(_emberSimpleAuthConfiguration['default'].baseURL);
      }
    }
  });
});
define('ember-simple-auth/mixins/authenticated-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, _ember, _emberSimpleAuthConfiguration) {
  'use strict';

  var service = _ember['default'].inject.service;

  /**
    __This mixin is used to make routes accessible only if the session is
    authenticated.__ It defines a `beforeModel` method that aborts the current
    transition and instead transitions to the
    {{#crossLink "Configuration/authenticationRoute:property"}}{{/crossLink}} if
    the session is not authenticated.
  
    ```js
    // app/routes/protected.js
    import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
  
    export default Ember.Route.extend(AuthenticatedRouteMixin);
    ```
  
    @class AuthenticatedRouteMixin
    @module ember-simple-auth/mixins/authenticated-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = _ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      Checks whether the session is authenticated and if it is not aborts the
      current transition and instead transitions to the
      {{#crossLink "Configuration/authenticationRoute:property"}}{{/crossLink}}.
      If the current transition is aborted, this method will save it in the
      session service's
      {{#crossLink "SessionService/attemptedTransition:property"}}{{/crossLink}}
      property so that  it can be retried after the session was authenticated
      (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}.
       __If `beforeModel` is overridden in a route that uses this mixin, the route's
     implementation must call `this._super(...arguments)`__ so that the mixin's
     `beforeModel` method is actually executed.
       @method beforeModel
      @param {Transition} transition The transition that lead to this route
      @public
    */
    beforeModel: function beforeModel(transition) {
      if (!this.get('session.isAuthenticated')) {
        _ember['default'].assert('The route configured as Configuration.authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== _emberSimpleAuthConfiguration['default'].authenticationRoute);

        transition.abort();
        this.set('session.attemptedTransition', transition);
        this.transitionTo(_emberSimpleAuthConfiguration['default'].authenticationRoute);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });
});
define('ember-simple-auth/mixins/data-adapter-mixin', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var service = _ember['default'].inject.service;

  /**
    __This mixin can be used to make Ember Data adapters authorize all outgoing
    API requests by injecting a header.__ It works with all authorizers that call
    the authorization callback (see
    {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) with header
    name and header content arguments.
  
    __The `DataAdapterMixin` will also invalidate the session whenever it
    receives a 401 response for an API request.__
  
    ```js
    // app/adapters/application.js
    import DS from 'ember-data';
    import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
  
    export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
      authorizer: 'authorizer:application'
    });
    ```
  
    __The `DataAdapterMixin` requires Ember Data 1.13 or later.__
  
    @class DataAdapterMixin
    @module ember-simple-auth/mixins/data-adapter-mixin
    @extends Ember.Mixin
    @public
  */

  exports['default'] = _ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      The authorizer that is used to authorize API requests. The authorizer has
      to call the authorization callback (see
      {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) with header
      name and header content arguments. __This property must be overridden in
      adapters using this mixin.__
       @property authorizer
      @type String
      @default null
      @public
    */
    authorizer: null,

    /**
      Defines a `beforeSend` hook (see http://api.jquery.com/jQuery.ajax/) that
      injects a request header containing the authorization data as constructed
      by the {{#crossLink "DataAdapterMixin/authorizer:property"}}{{/crossLink}}
      (see
      {{#crossLink "SessionService/authorize:method"}}{{/crossLink}}). The
      specific header name and contents depend on the actual auhorizer that is
      used.
       @method ajaxOptions
      @protected
    */
    ajaxOptions: function ajaxOptions() {
      var _this = this;

      var authorizer = this.get('authorizer');
      _ember['default'].assert("You're using the DataAdapterMixin without specifying an authorizer. Please add `authorizer: 'authorizer:application'` to your adapter.", _ember['default'].isPresent(authorizer));

      var hash = this._super.apply(this, arguments);
      var beforeSend = hash.beforeSend;

      hash.beforeSend = function (xhr) {
        _this.get('session').authorize(authorizer, function (headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });
        if (beforeSend) {
          beforeSend(xhr);
        }
      };
      return hash;
    },

    /**
      This method is called for every response that the adapter receives from the
      API. If the response has a 401 status code it invalidates the session (see
      {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}}).
       @method handleResponse
      @param {Number} status The response status as received from the API
      @protected
    */
    handleResponse: function handleResponse(status) {
      if (status === 401 && this.get('session.isAuthenticated')) {
        this.get('session').invalidate();
      }
      return this._super.apply(this, arguments);
    }
  });
});
define('ember-simple-auth/mixins/unauthenticated-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, _ember, _emberSimpleAuthConfiguration) {
  'use strict';

  var service = _ember['default'].inject.service;

  /**
    __This mixin is used to make routes accessible only if the session is
    not authenticated__ (e.g. login and registration routes). It defines a
    `beforeModel` method that aborts the current transition and instead
    transitions to the
    {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}
    if the session is authenticated.
  
    ```js
    // app/routes/login.js
    import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
  
    export default Ember.Route.extend(UnauthenticatedRouteMixin);
    ```
  
    @class UnauthenticatedRouteMixin
    @module ember-simple-auth/mixins/unauthenticated-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = _ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      Checks whether the session is authenticated and if it is aborts the current
      transition and instead transitions to the
      {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}.
       __If `beforeModel` is overridden in a route that uses this mixin, the route's
     implementation must call `this._super(...arguments)`__ so that the mixin's
     `beforeModel` method is actually executed.
       @method beforeModel
      @param {Transition} transition The transition that lead to this route
      @public
    */
    beforeModel: function beforeModel(transition) {
      if (this.get('session').get('isAuthenticated')) {
        transition.abort();
        _ember['default'].assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== _emberSimpleAuthConfiguration['default'].routeIfAlreadyAuthenticated);
        this.transitionTo(_emberSimpleAuthConfiguration['default'].routeIfAlreadyAuthenticated);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });
});
define('ember-simple-auth/services/session', ['exports', 'ember', 'ember-getowner-polyfill'], function (exports, _ember, _emberGetownerPolyfill) {
  'use strict';

  var _slice = Array.prototype.slice;

  var SESSION_DATA_KEY_PREFIX = /^data\./;

  var computed = _ember['default'].computed;

  /**
    __The session service provides access to the current session as well as
    methods to authenticate and invalidate it__ etc. It is the main interface for
    the application to Ember Simple Auth's functionality. It can be injected via
  
    ```js
    // app/components/login-form.js
    import Ember from 'ember';
  
    export default Ember.Component.extend({
      session: Ember.inject.service('session')
    });
    ```
  
    @class SessionService
    @module ember-simple-auth/services/session
    @extends Ember.Service
    @uses Ember.Evented
    @public
  */
  exports['default'] = _ember['default'].Service.extend(_ember['default'].Evented, {
    /**
      Triggered whenever the session is successfully authenticated. This happens
      when the session gets authenticated via
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}} but also
      when the session is authenticated in another tab or window of the same
      application and the session state gets synchronized across tabs or windows
      via the store (see
      {{#crossLink "BaseStore/sessionDataUpdated:event"}}{{/crossLink}}).
       When using the {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} this
      event will automatically get handled (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}).
       @event authenticationSucceeded
      @public
    */

    /**
      Triggered whenever the session is successfully invalidated. This happens
      when the session gets invalidated via
      {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}} but also
      when the session is invalidated in another tab or window of the same
      application and the session state gets synchronized across tabs or windows
      via the store (see
      {{#crossLink "BaseStore/sessionDataUpdated:event"}}{{/crossLink}}).
       When using the {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} this
      event will automatically get handled (see
      {{#crossLink "ApplicationRouteMixin/sessionInvalidated:method"}}{{/crossLink}}).
       @event invalidationSucceeded
      @public
    */

    /**
      Returns whether the session is currently authenticated.
       @property isAuthenticated
      @type Boolean
      @readOnly
      @default false
      @public
    */
    isAuthenticated: computed.oneWay('session.isAuthenticated'),

    /**
      The current session data as a plain object. The
      `authenticated` key holds the session data that the authenticator resolved
      with when the session was authenticated (see
      {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}) and
      that will be cleared when the session is invalidated. This data cannot be
      written. All other session data is writable and will not be cleared when
      the session is invalidated.
       @property data
      @type Object
      @readOnly
      @default { authenticated: {} }
      @public
    */
    data: computed.oneWay('session.content'),

    /**
      The session store.
       @property store
      @type BaseStore
      @readOnly
      @default null
      @public
    */
    store: computed.oneWay('session.store'),

    /**
      A previously attempted but intercepted transition (e.g. by the
      {{#crossLink "AuthenticatedRouteMixin"}}{{/crossLink}}). If an attempted
      transition is present, the
      {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} will retry it when the
      session becomes authenticated (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}).
       @property attemptedTransition
      @type Transition
      @default null
      @public
    */
    attemptedTransition: computed.alias('session.attemptedTransition'),

    init: function init() {
      this._super.apply(this, arguments);
      this._forwardSessionEvents();
    },

    set: function set(key, value) {
      var setsSessionData = SESSION_DATA_KEY_PREFIX.test(key);
      if (setsSessionData) {
        var sessionDataKey = 'session.' + key.replace(SESSION_DATA_KEY_PREFIX, '');
        return this._super(sessionDataKey, value);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    _forwardSessionEvents: function _forwardSessionEvents() {
      var _this = this,
          _arguments = arguments;

      _ember['default'].A(['authenticationSucceeded', 'invalidationSucceeded']).forEach(function (event) {
        var session = _this.get('session');
        // the internal session won't be available in route unit tests
        if (session) {
          session.on(event, function () {
            _this.trigger.apply(_this, [event].concat(_slice.call(_arguments)));
          });
        }
      });
    },

    /**
      __Authenticates the session with an `authenticator`__ and appropriate
      arguments. The authenticator implements the actual steps necessary to
      authenticate the session (see
      {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}) and
      returns a promise after doing so. The session handles the returned promise
      and when it resolves becomes authenticated, otherwise remains
      unauthenticated. All data the authenticator resolves with will be
      accessible via the
      {{#crossLink "SessionService/data:property"}}session data's{{/crossLink}}
      `authenticated` property.
       __This method returns a promise. A resolving promise indicates that the
      session was successfully authenticated__ while a rejecting promise
      indicates that authentication failed and the session remains
      unauthenticated. The promise does not resolve with a value; instead, the
      data returned from the authenticator is available via the
      {{#crossLink "SessionService/data:property"}}{{/crossLink}} property.
       When authentication succeeds this will trigger the
      {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}}
      event.
       @method authenticate
      @param {String} authenticator The authenticator to use to authenticate the session
      @param {Any} [...args] The arguments to pass to the authenticator; depending on the type of authenticator these might be a set of credentials, a Facebook OAuth Token, etc.
      @return {Ember.RSVP.Promise} A promise that resolves when the session was authenticated successfully and rejects otherwise
      @public
    */
    authenticate: function authenticate() {
      var session = this.get('session');

      return session.authenticate.apply(session, arguments);
    },

    /**
      __Invalidates the session with the authenticator it is currently
      authenticated with__ (see
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}}). This
      invokes the authenticator's
      {{#crossLink "BaseAuthenticator/invalidate:method"}}{{/crossLink}} method
      and handles the returned promise accordingly.
       This method returns a promise. A resolving promise indicates that the
      session was successfully invalidated while a rejecting promise indicates
      that invalidation failed and the session remains authenticated. Once the
      session is successfully invalidated it clears all of its authenticated data
      (see {{#crossLink "SessionService/data:property"}}{{/crossLink}}).
       When invalidation succeeds this will trigger the
      {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}
      event.
       @method invalidate
      @return {Ember.RSVP.Promise} A promise that resolves when the session was invalidated successfully and rejects otherwise
      @public
    */
    invalidate: function invalidate() {
      var session = this.get('session');

      return session.invalidate.apply(session, arguments);
    },

    /**
      Authorizes a block of code with an authorizer (see
      {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) if the
      session is authenticated. If the session is not currently authenticated
      this method does nothing.
       ```js
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        xhr.setRequestHeader(headerName, headerValue);
      });
      ```
       @method authorize
      @param {String} authorizer The authorizer to authorize the block with
      @param {Function} block The block of code to call with the authorization data generated by the authorizer
      @public
    */
    authorize: function authorize(authorizerFactory, block) {
      if (this.get('isAuthenticated')) {
        var authorizer = (0, _emberGetownerPolyfill['default'])(this).lookup(authorizerFactory);
        var sessionData = this.get('data.authenticated');
        authorizer.authorize(sessionData, block);
      }
    }
  });
});
define('ember-simple-auth/session-stores/adaptive', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/session-stores/local-storage', 'ember-simple-auth/session-stores/cookie'], function (exports, _ember, _emberSimpleAuthSessionStoresBase, _emberSimpleAuthSessionStoresLocalStorage, _emberSimpleAuthSessionStoresCookie) {
  /* global localStorage */
  'use strict';

  var computed = _ember['default'].computed;

  var LOCAL_STORAGE_TEST_KEY = '_ember_simple_auth_test_key';

  /**
    Session store that persists data in the browser's `localStorage` (see
    {{#crossLink "LocalStorageStore"}}{{/crossLink}}) if that is available or in
    a cookie (see {{#crossLink "CookieStore"}}{{/crossLink}}) if it is not.
  
    __This is the default store that Ember Simple Auth will use when the
    application doesn't define a custom store.__
  
    @class AdaptiveStore
    @module ember-simple-auth/session-stores/adaptive
    @extends BaseStore
    @public
  */
  exports['default'] = _emberSimpleAuthSessionStoresBase['default'].extend({
    /**
      The `localStorage` key the store persists data in if `localStorage` is
      available.
       @property localStorageKey
      @type String
      @default 'ember_simple_auth:session'
      @public
    */
    localStorageKey: 'ember_simple_auth:session',

    /**
      The domain to use for the cookie if `localStorage` is not available, e.g.,
      "example.com", ".example.com" (which includes all subdomains) or
      "subdomain.example.com". If not explicitly set, the cookie domain defaults
      to the domain the session was authneticated on.
       @property cookieDomain
      @type String
      @default null
      @public
    */
    cookieDomain: null,

    /**
      The name of the cookie to use if `localStorage` is not available.
       @property cookieName
      @type String
      @default ember_simple_auth:session
      @public
    */
    cookieName: 'ember_simple_auth:session',

    /**
      The expiration time for the cookie in seconds if `localStorage` is not
      available. A value of `null` will make the cookie a session cookie that
      expires and gets deleted when the browser is closed.
       @property cookieExpirationTime
      @default null
      @type Integer
      @public
    */
    cookieExpirationTime: null,

    _isLocalStorageAvailable: computed(function () {
      try {
        localStorage.setItem(LOCAL_STORAGE_TEST_KEY, true);
        localStorage.removeItem(LOCAL_STORAGE_TEST_KEY);
        return true;
      } catch (e) {
        return false;
      }
    }),

    init: function init() {
      this._super.apply(this, arguments);

      var store = undefined;
      if (this.get('_isLocalStorageAvailable')) {
        var options = { key: this.get('localStorageKey') };
        store = this._createStore(_emberSimpleAuthSessionStoresLocalStorage['default'], options);
      } else {
        var options = this.getProperties('cookieDomain', 'cookieName', 'cookieExpirationTime');
        store = this._createStore(_emberSimpleAuthSessionStoresCookie['default'], options);
      }
      this.set('_store', store);
    },

    _createStore: function _createStore(storeType, options) {
      var _this = this;

      var store = storeType.create(options);

      store.on('sessionDataUpdated', function (data) {
        _this.trigger('sessionDataUpdated', data);
      });
      return store;
    },

    /**
      Persists the `data` in the `localStorage` if it is available or in a cookie
      if it is not.
       @method persist
      @param {Object} data The data to persist
      @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
      @public
    */
    persist: function persist() {
      var _get;

      return (_get = this.get('_store')).persist.apply(_get, arguments);
    },

    /**
      Returns all data currently stored in the `localStorage` if that is
      available - or if it is not, in the cookie - as a plain object.
       @method restore
      @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
      @public
    */
    restore: function restore() {
      return this.get('_store').restore();
    },

    /**
      Clears the store by deleting the
      {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
      `localStorage` if that is available or by deleting the cookie if it is not.
       @method clear
      @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
      @public
    */
    clear: function clear() {
      return this.get('_store').clear();
    }
  });
});
define('ember-simple-auth/session-stores/base', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var RSVP = _ember['default'].RSVP;

  /**
    The base class for all session stores. __This serves as a starting point for
    implementing custom session stores and must not be used directly.__
  
    Session Stores persist the session's state so that it survives a page reload
    and is synchronized across multiple tabs or windows of the same application.
  
    @class BaseStore
    @module ember-simple-auth/session-stores/base
    @extends Ember.Object
    @uses Ember.Evented
    @public
  */
  exports['default'] = _ember['default'].Object.extend(_ember['default'].Evented, {
    /**
      Triggered when the session store's data changes due to an external event,
      e.g. from another tab or window of the same application. The session
      handles that event, passes the updated data to its authenticator's
      {{#crossLink "BaseAuthenticator/restore:method"}}{{/crossLink}} method and
      handles the result of that invocation accordingly.
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      Persists the `data`. This replaces all currently stored data.
       `BaseStores`'s implementation always returns a rejecting promise. __This
      method must be overridden in subclasses__.
       @method persist
      @param {Object} data The data to persist
      @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
      @public
    */
    persist: function persist() {
      return RSVP.reject();
    },

    /**
      Returns all data currently stored as a plain object.
       `BaseStores`'s implementation always returns a rejecting promise. __This
      method must be overridden in subclasses__.
       @method restore
      @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
      @public
    */
    restore: function restore() {
      return RSVP.reject();
    },

    /**
      Clears the store.
       `BaseStores`'s implementation always returns a rejecting promise. __This
      method must be overridden in subclasses__.
       @method clear
      @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
      @public
    */
    clear: function clear() {
      return RSVP.reject();
    }
  });
});
define('ember-simple-auth/session-stores/cookie', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/utils/objects-are-equal'], function (exports, _ember, _emberSimpleAuthSessionStoresBase, _emberSimpleAuthUtilsObjectsAreEqual) {
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var computed = _ember['default'].computed;
  var next = _ember['default'].run.next;

  /**
    Session store that persists data in a cookie.
  
    By default the cookie session store uses a session cookie that expires and is
    deleted when the browser is closed. The cookie expiration period can be
    configured by setting the
    {{#crossLink "CookieStore/cookieExpirationTime:property"}}{{/crossLink}}
    property. This can be used to implement "remember me" functionality that will
    either store the session persistently or in a session cookie depending on
    whether the user opted in or not:
  
    ```js
    // app/controllers/login.js
    export default Ember.Controller.extend({
      rememberMe: false,
  
      _rememberMeChanged: Ember.observer('rememberMe', function() {
        const expirationTime = this.get('rememberMe') ? (14 * 24 * 60 * 60) : null;
        this.set('session.store.cookieExpirationTime', expirationTime);
      }
    });
    ```
  
    __In order to keep multiple tabs/windows of an application in sync, this
    store has to periodically (every 500ms) check the cookie for changes__ as
    there are no events for cookie changes that the store could subscribe to. If
    the application does not need to make sure all session data is deleted when
    the browser is closed, the
    {{#crossLink "LocalStorageStore"}}`localStorage` session store{{/crossLink}}
    should be used.
  
    @class CookieStore
    @module ember-simple-auth/session-stores/cookie
    @extends BaseStore
    @public
  */
  exports['default'] = _emberSimpleAuthSessionStoresBase['default'].extend({
    /**
      The domain to use for the cookie, e.g., "example.com", ".example.com"
      (which includes all subdomains) or "subdomain.example.com". If not
      explicitly set, the cookie domain defaults to the domain the session was
      authneticated on.
       @property cookieDomain
      @type String
      @default null
      @public
    */
    cookieDomain: null,

    /**
      The name of the cookie.
       @property cookieName
      @type String
      @default ember_simple_auth:session
      @public
    */
    cookieName: 'ember_simple_auth:session',

    /**
      The expiration time for the cookie in seconds. A value of `null` will make
      the cookie a session cookie that expires and gets deleted when the browser
      is closed.
       @property cookieExpirationTime
      @default null
      @type Integer
      @public
    */
    cookieExpirationTime: null,

    _secureCookies: window.location.protocol === 'https:',

    _syncDataTimeout: null,

    _renewExpirationTimeout: null,

    _isPageVisible: computed(function () {
      var visibilityState = document.visibilityState || 'visible';
      return visibilityState === 'visible';
    }).volatile(),

    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);

      next(function () {
        _this._syncData().then(function () {
          _this._renewExpiration();
        });
      });
    },

    /**
      Persists the `data` in the cookie.
       @method persist
      @param {Object} data The data to persist
      @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
      @public
    */
    persist: function persist(data) {
      this._lastData = data;
      data = JSON.stringify(data || {});
      var expiration = this._calculateExpirationTime();
      this._write(data, expiration);
      return RSVP.resolve();
    },

    /**
      Returns all data currently stored in the cookie as a plain object.
       @method restore
      @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
      @public
    */
    restore: function restore() {
      var data = this._read(this.cookieName);
      if (_ember['default'].isEmpty(data)) {
        return RSVP.resolve({});
      } else {
        return RSVP.resolve(JSON.parse(data));
      }
    },

    /**
      Clears the store by deleting the cookie.
       @method clear
      @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
      @public
    */
    clear: function clear() {
      this._write(null, 0);
      this._lastData = {};
      return RSVP.resolve();
    },

    _read: function _read(name) {
      var value = document.cookie.match(new RegExp(name + '=([^;]+)')) || [];
      return decodeURIComponent(value[1] || '');
    },

    _calculateExpirationTime: function _calculateExpirationTime() {
      var cachedExpirationTime = this._read(this.cookieName + ':expiration_time');
      cachedExpirationTime = !!cachedExpirationTime ? new Date().getTime() + cachedExpirationTime * 1000 : null;
      return !!this.cookieExpirationTime ? new Date().getTime() + this.cookieExpirationTime * 1000 : cachedExpirationTime;
    },

    _write: function _write(value, expiration) {
      var path = '; path=/';
      var domain = _ember['default'].isEmpty(this.cookieDomain) ? '' : '; domain=' + this.cookieDomain;
      var expires = _ember['default'].isEmpty(expiration) ? '' : '; expires=' + new Date(expiration).toUTCString();
      var secure = !!this._secureCookies ? ';secure' : '';
      document.cookie = this.cookieName + '=' + encodeURIComponent(value) + domain + path + expires + secure;
      if (expiration !== null) {
        var cachedExpirationTime = this._read(this.cookieName + ':expiration_time');
        document.cookie = this.cookieName + ':expiration_time=' + encodeURIComponent(this.cookieExpirationTime || cachedExpirationTime) + domain + path + expires + secure;
      }
    },

    _syncData: function _syncData() {
      var _this2 = this;

      return this.restore().then(function (data) {
        if (!(0, _emberSimpleAuthUtilsObjectsAreEqual['default'])(data, _this2._lastData)) {
          _this2._lastData = data;
          _this2.trigger('sessionDataUpdated', data);
        }
        if (!_ember['default'].testing) {
          _ember['default'].run.cancel(_this2._syncDataTimeout);
          _this2._syncDataTimeout = _ember['default'].run.later(_this2, _this2._syncData, 500);
        }
      });
    },

    _renew: function _renew() {
      var _this3 = this;

      return this.restore().then(function (data) {
        if (!_ember['default'].isEmpty(data) && data !== {}) {
          data = _ember['default'].typeOf(data) === 'string' ? data : JSON.stringify(data || {});
          var expiration = _this3._calculateExpirationTime();
          _this3._write(data, expiration);
        }
      });
    },

    _renewExpiration: function _renewExpiration() {
      if (!_ember['default'].testing) {
        _ember['default'].run.cancel(this._renewExpirationTimeout);
        this._renewExpirationTimeout = _ember['default'].run.later(this, this._renewExpiration, 60000);
      }
      if (this.get('_isPageVisible')) {
        return this._renew();
      } else {
        return RSVP.resolve();
      }
    }
  });
});
define('ember-simple-auth/session-stores/ephemeral', ['exports', 'ember', 'ember-simple-auth/session-stores/base'], function (exports, _ember, _emberSimpleAuthSessionStoresBase) {
  'use strict';

  var RSVP = _ember['default'].RSVP;

  /**
    Session store that __persists data in memory and thus is not actually
    persistent__. It does also not synchronize the session's state across
    multiple tabs or windows as those cannot share memory. __This store is mainly
    useful for testing and will automatically be used when running tests.__
  
    @class EphemeralStore
    @module ember-simple-auth/session-stores/ephemeral
    @extends BaseStore
    @public
  */
  exports['default'] = _emberSimpleAuthSessionStoresBase['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      this.clear();
    },

    /**
      Persists the `data`. This replaces all currently stored data.
       @method persist
      @param {Object} data The data to persist
      @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
      @public
    */
    persist: function persist(data) {
      this._data = JSON.stringify(data || {});

      return RSVP.resolve();
    },

    /**
      Returns all data currently stored as a plain object.
       @method restore
      @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
      @public
    */
    restore: function restore() {
      var data = JSON.parse(this._data) || {};

      return RSVP.resolve(data);
    },

    /**
      Clears the store.
       @method clear
      @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
      @public
    */
    clear: function clear() {
      delete this._data;
      this._data = '{}';

      return RSVP.resolve();
    }
  });
});
define('ember-simple-auth/session-stores/local-storage', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/utils/objects-are-equal'], function (exports, _ember, _emberSimpleAuthSessionStoresBase, _emberSimpleAuthUtilsObjectsAreEqual) {
  /* global localStorage */
  'use strict';

  var RSVP = _ember['default'].RSVP;

  /**
    Session store that persists data in the browser's `localStorage`.
  
    __`localStorage` is not available in Safari when running in private mode. In
    general it is better to use the
    {{#crossLink "AdaptiveStore"}}{{/crossLink}} that automatically falls back to
    the {{#crossLink "CookieStore"}}{{/crossLink}} when `localStorage` is not
    available.__
  
    @class LocalStorageStore
    @module ember-simple-auth/session-stores/local-storage
    @extends BaseStore
    @public
  */
  exports['default'] = _emberSimpleAuthSessionStoresBase['default'].extend({
    /**
      The `localStorage` key the store persists data in.
       @property key
      @type String
      @default 'ember_simple_auth:session'
      @public
    */
    key: 'ember_simple_auth:session',

    init: function init() {
      this._super.apply(this, arguments);

      this._bindToStorageEvents();
    },

    /**
      Persists the `data` in the `localStorage`.
       @method persist
      @param {Object} data The data to persist
      @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
      @public
    */
    persist: function persist(data) {
      this._lastData = data;
      data = JSON.stringify(data || {});
      localStorage.setItem(this.key, data);

      return RSVP.resolve();
    },

    /**
      Returns all data currently stored in the `localStorage` as a plain object.
       @method restore
      @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
      @public
    */
    restore: function restore() {
      var data = localStorage.getItem(this.key);

      return RSVP.resolve(JSON.parse(data) || {});
    },

    /**
      Clears the store by deleting the
      {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
      `localStorage`.
       @method clear
      @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
      @public
    */
    clear: function clear() {
      localStorage.removeItem(this.key);
      this._lastData = {};

      return RSVP.resolve();
    },

    _bindToStorageEvents: function _bindToStorageEvents() {
      var _this = this;

      _ember['default'].$(window).bind('storage', function (e) {
        if (e.originalEvent.key === _this.key) {
          _this.restore().then(function (data) {
            if (!(0, _emberSimpleAuthUtilsObjectsAreEqual['default'])(data, _this._lastData)) {
              _this._lastData = data;
              _this.trigger('sessionDataUpdated', data);
            }
          });
        }
      });
    }
  });
});
define("ember-simple-auth/utils/inject", ["exports"], function (exports) {
  "use strict";

  exports["default"] = function (registry, factoryNameOrType, property, injectionName) {
    var inject = registry.inject || registry.injection;
    inject.call(registry, factoryNameOrType, property, injectionName);
  };
});
define("ember-simple-auth/utils/lookup", ["exports"], function (exports) {
  "use strict";

  exports["default"] = function (instance, factoryName) {
    if (instance.lookup) {
      return instance.lookup(factoryName);
    } else {
      return instance.container.lookup(factoryName);
    }
  };
});
define('ember-simple-auth/utils/objects-are-equal', ['exports'], function (exports) {
  'use strict';

  exports['default'] = objectsAreEqual;

  function objectsAreEqual(a, b) {
    function compare(x, y) {
      var property = undefined;
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true;
      }

      if (x === y) {
        return true;
      }

      if (!(x instanceof Object && y instanceof Object)) {
        return false;
      }

      for (property in y) {
        if (y.hasOwnProperty(property) !== x.hasOwnProperty(property)) {
          return false;
        } else if (typeof y[property] !== typeof x[property]) {
          return false;
        }
      }

      for (property in x) {
        if (y.hasOwnProperty(property) !== x.hasOwnProperty(property)) {
          return false;
        } else if (typeof y[property] !== typeof x[property]) {
          return false;
        }

        switch (typeof x[property]) {
          case 'object':
            if (!compare(x[property], y[property])) {
              return false;
            }
            break;
          default:
            if (x[property] !== y[property]) {
              return false;
            }
            break;
        }
      }

      return true;
    }

    return compare(a, b);
  }
});
define('ember-simple-auth', ['ember-simple-auth/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-truth-helpers/helpers/and', ['exports', 'ember-truth-helpers/utils/truth-convert'], function (exports, _emberTruthHelpersUtilsTruthConvert) {
  'use strict';

  exports.andHelper = andHelper;

  function andHelper(params) {
    for (var i = 0, len = params.length; i < len; i++) {
      if ((0, _emberTruthHelpersUtilsTruthConvert['default'])(params[i]) === false) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
});
define("ember-truth-helpers/helpers/equal", ["exports"], function (exports) {
  "use strict";

  exports.equalHelper = equalHelper;

  function equalHelper(params) {
    return params[0] === params[1];
  }
});
define('ember-truth-helpers/helpers/gt', ['exports'], function (exports) {
  'use strict';

  exports.gtHelper = gtHelper;

  function gtHelper(params, hash) {
    var left = params[0];
    var right = params[1];
    if (hash.forceNumber) {
      if (typeof left !== 'number') {
        left = Number(left);
      }
      if (typeof right !== 'number') {
        right = Number(right);
      }
    }
    return left > right;
  }
});
define('ember-truth-helpers/helpers/gte', ['exports'], function (exports) {
  'use strict';

  exports.gteHelper = gteHelper;

  function gteHelper(params, hash) {
    var left = params[0];
    var right = params[1];
    if (hash.forceNumber) {
      if (typeof left !== 'number') {
        left = Number(left);
      }
      if (typeof right !== 'number') {
        right = Number(right);
      }
    }
    return left >= right;
  }
});
define('ember-truth-helpers/helpers/is-array', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.isArrayHelper = isArrayHelper;

  function isArrayHelper(params) {
    for (var i = 0, len = params.length; i < len; i++) {
      if (_ember['default'].isArray(params[i]) === false) {
        return false;
      }
    }
    return true;
  }
});
define('ember-truth-helpers/helpers/lt', ['exports'], function (exports) {
  'use strict';

  exports.ltHelper = ltHelper;

  function ltHelper(params, hash) {
    var left = params[0];
    var right = params[1];
    if (hash.forceNumber) {
      if (typeof left !== 'number') {
        left = Number(left);
      }
      if (typeof right !== 'number') {
        right = Number(right);
      }
    }
    return left < right;
  }
});
define('ember-truth-helpers/helpers/lte', ['exports'], function (exports) {
  'use strict';

  exports.lteHelper = lteHelper;

  function lteHelper(params, hash) {
    var left = params[0];
    var right = params[1];
    if (hash.forceNumber) {
      if (typeof left !== 'number') {
        left = Number(left);
      }
      if (typeof right !== 'number') {
        right = Number(right);
      }
    }
    return left <= right;
  }
});
define("ember-truth-helpers/helpers/not-equal", ["exports"], function (exports) {
  "use strict";

  exports.notEqualHelper = notEqualHelper;

  function notEqualHelper(params) {
    return params[0] !== params[1];
  }
});
define('ember-truth-helpers/helpers/not', ['exports', 'ember-truth-helpers/utils/truth-convert'], function (exports, _emberTruthHelpersUtilsTruthConvert) {
  'use strict';

  exports.notHelper = notHelper;

  function notHelper(params) {
    for (var i = 0, len = params.length; i < len; i++) {
      if ((0, _emberTruthHelpersUtilsTruthConvert['default'])(params[i]) === true) {
        return false;
      }
    }
    return true;
  }
});
define('ember-truth-helpers/helpers/or', ['exports', 'ember-truth-helpers/utils/truth-convert'], function (exports, _emberTruthHelpersUtilsTruthConvert) {
  'use strict';

  exports.orHelper = orHelper;

  function orHelper(params) {
    for (var i = 0, len = params.length; i < len; i++) {
      if ((0, _emberTruthHelpersUtilsTruthConvert['default'])(params[i]) === true) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
});
define('ember-truth-helpers/helpers/xor', ['exports', 'ember-truth-helpers/utils/truth-convert'], function (exports, _emberTruthHelpersUtilsTruthConvert) {
  'use strict';

  exports.xorHelper = xorHelper;

  function xorHelper(params) {
    return (0, _emberTruthHelpersUtilsTruthConvert['default'])(params[0]) !== (0, _emberTruthHelpersUtilsTruthConvert['default'])(params[1]);
  }
});
define('ember-truth-helpers/utils/register-helper', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	exports.registerHelper = registerHelper;

	function registerHelperIteration1(name, helperFunction) {
		//earlier versions of ember with htmlbars used this
		_ember['default'].HTMLBars.helpers[name] = _ember['default'].HTMLBars.makeBoundHelper(helperFunction);
	}

	function registerHelperIteration2(name, helperFunction) {
		//registerHelper has been made private as _registerHelper
		//this is kept here if anyone is using it
		_ember['default'].HTMLBars.registerHelper(name, _ember['default'].HTMLBars.makeBoundHelper(helperFunction));
	}

	function registerHelperIteration3(name, helperFunction) {
		//latest versin of ember uses this
		_ember['default'].HTMLBars._registerHelper(name, _ember['default'].HTMLBars.makeBoundHelper(helperFunction));
	}

	function registerHelper(name, helperFunction) {
		// Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
		// will be auto-discovered.
		if (_ember['default'].Helper) {
			return;
		}

		if (_ember['default'].HTMLBars._registerHelper) {
			if (_ember['default'].HTMLBars.helpers) {
				registerHelperIteration1(name, helperFunction);
			} else {
				registerHelperIteration3(name, helperFunction);
			}
		} else if (_ember['default'].HTMLBars.registerHelper) {
			registerHelperIteration2(name, helperFunction);
		}
	}
});
define('ember-truth-helpers/utils/truth-convert', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = truthConvert;

  function truthConvert(result) {
    var truthy = result && _ember['default'].get(result, 'isTruthy');
    if (typeof truthy === 'boolean') {
      return truthy;
    }

    if (_ember['default'].isArray(result)) {
      return _ember['default'].get(result, 'length') !== 0;
    } else {
      return !!result;
    }
  }
});
define('ember-truth-helpers', ['ember-truth-helpers/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-wormhole/components/ember-wormhole', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;
  var observer = _ember['default'].observer;
  var run = _ember['default'].run;

  exports['default'] = _ember['default'].Component.extend({
    to: computed.alias('destinationElementId'),
    destinationElementId: null,
    destinationElement: computed('destinationElementId', 'renderInPlace', function () {
      return this.get('renderInPlace') ? this.element : document.getElementById(this.get('destinationElementId'));
    }),
    renderInPlace: false,

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this._firstNode = this.element.firstChild;
      this._lastNode = this.element.lastChild;
      this.appendToDestination();
    },

    willDestroyElement: function willDestroyElement() {
      var _this = this;

      this._super.apply(this, arguments);
      var firstNode = this._firstNode;
      var lastNode = this._lastNode;
      run.schedule('render', function () {
        _this.removeRange(firstNode, lastNode);
      });
    },

    destinationDidChange: observer('destinationElement', function () {
      var destinationElement = this.get('destinationElement');
      if (destinationElement !== this._firstNode.parentNode) {
        run.schedule('render', this, 'appendToDestination');
      }
    }),

    appendToDestination: function appendToDestination() {
      var destinationElement = this.get('destinationElement');
      if (!destinationElement) {
        var destinationElementId = this.get('destinationElementId');
        if (destinationElementId) {
          throw new Error('ember-wormhole failed to render into \'#' + this.get('destinationElementId') + '\' because the element is not in the DOM');
        }
        throw new Error('ember-wormhole failed to render content because the destinationElementId was set to an undefined or falsy value.');
      }
      this.appendRange(destinationElement, this._firstNode, this._lastNode);
    },

    appendRange: function appendRange(destinationElement, firstNode, lastNode) {
      while (firstNode) {
        destinationElement.insertBefore(firstNode, null);
        firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
      }
    },

    removeRange: function removeRange(firstNode, lastNode) {
      var node = lastNode;
      do {
        var next = node.previousSibling;
        if (node.parentNode) {
          node.parentNode.removeChild(node);
          if (node === firstNode) {
            break;
          }
        }
        node = next;
      } while (node);
    }

  });
});
define('ember-wormhole', ['ember-wormhole/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});
//# sourceMappingURL=addons.map