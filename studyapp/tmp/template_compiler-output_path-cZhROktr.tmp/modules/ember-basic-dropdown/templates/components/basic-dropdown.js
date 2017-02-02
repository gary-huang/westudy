export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
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
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","publicAPI",["loc",[null,[34,12],[34,21]]]]],[],["loc",[null,[34,4],[34,23]]]]
        ],
        locals: [],
        templates: []
      };
    }());
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
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","basic-dropdown/content",[],["animationEnabled",["subexpr","@mut",[["get","animationEnabled",["loc",[null,[21,21],[21,37]]]]],[],[]],"appRoot",["subexpr","@mut",[["get","appRoot",["loc",[null,[22,12],[22,19]]]]],[],[]],"close",["subexpr","@mut",[["get","publicAPI.actions.close",["loc",[null,[23,10],[23,33]]]]],[],[]],"dir",["subexpr","@mut",[["get","dir",["loc",[null,[24,8],[24,11]]]]],[],[]],"dropdownClass",["subexpr","@mut",[["get","dropdownClass",["loc",[null,[25,18],[25,31]]]]],[],[]],"dropdownId",["subexpr","@mut",[["get","dropdownId",["loc",[null,[26,15],[26,25]]]]],[],[]],"horizontalPositionClass",["subexpr","@mut",[["get","_horizontalPositionClass",["loc",[null,[27,28],[27,52]]]]],[],[]],"onFocusIn",["subexpr","action",["handleFocusIn"],[],["loc",[null,[28,14],[28,38]]]],"onFocusOut",["subexpr","action",["handleFocusOut"],[],["loc",[null,[29,15],[29,40]]]],"renderInPlace",["subexpr","@mut",[["get","renderInPlace",["loc",[null,[30,18],[30,31]]]]],[],[]],"reposition",["subexpr","@mut",[["get","publicAPI.actions.reposition",["loc",[null,[31,15],[31,43]]]]],[],[]],"to",["subexpr","@mut",[["get","wormholeDestination",["loc",[null,[32,7],[32,26]]]]],[],[]],"verticalPositionClass",["subexpr","@mut",[["get","_verticalPositionClass",["loc",[null,[33,26],[33,48]]]]],[],[]]],0,null,["loc",[null,[20,2],[35,29]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
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
      dom.setAttribute(el1,"aria-haspopup","true");
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
      morphs[15] = dom.createMorphAt(element0,1,1);
      morphs[16] = dom.createMorphAt(fragment,2,2,contextualElement);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["attribute","class",["concat",["ember-basic-dropdown-trigger ",["get","triggerClass",["loc",[null,[1,43],[1,55]]]]]]],
      ["attribute","aria-controls",["get","dropdownId",["loc",[null,[2,18],[2,28]]]]],
      ["attribute","aria-describedby",["get","ariaDescribedBy",["loc",[null,[3,21],[3,36]]]]],
      ["attribute","aria-disabled",["get","disabled",["loc",[null,[4,18],[4,26]]]]],
      ["attribute","aria-expanded",["get","publicAPI.isOpen",["loc",[null,[5,18],[5,34]]]]],
      ["attribute","aria-invalid",["get","ariaInvalid",["loc",[null,[7,17],[7,28]]]]],
      ["attribute","aria-label",["get","ariaLabel",["loc",[null,[8,15],[8,24]]]]],
      ["attribute","aria-labelledby",["get","ariaLabelledBy",["loc",[null,[9,20],[9,34]]]]],
      ["attribute","aria-pressed",["get","publicAPI.isOpen",["loc",[null,[10,17],[10,33]]]]],
      ["attribute","aria-required",["get","ariaRequired",["loc",[null,[11,18],[11,30]]]]],
      ["attribute","id",["get","triggerId",["loc",[null,[12,7],[12,16]]]]],
      ["attribute","onfocus",["subexpr","action",["handleFocus"],[],["loc",[null,[13,10],[13,34]]]]],
      ["attribute","onkeydown",["subexpr","action",["keydown"],[],["loc",[null,[14,12],[14,32]]]]],
      ["attribute","role",["get","role",["loc",[null,[15,9],[15,13]]]]],
      ["attribute","tabindex",["get","tabIndex",["loc",[null,[16,13],[16,21]]]]],
      ["inline","yield",[],["to","inverse"],["loc",[null,[17,2],[17,24]]]],
      ["block","if",[["get","publicAPI.isOpen",["loc",[null,[19,6],[19,22]]]]],[],0,null,["loc",[null,[19,0],[36,7]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));