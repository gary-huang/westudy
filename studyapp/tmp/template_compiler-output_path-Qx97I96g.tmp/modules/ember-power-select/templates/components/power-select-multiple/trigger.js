export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
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
          dom.setAttribute(el1,"role","button");
          dom.setAttribute(el1,"aria-label","remove element");
          dom.setAttribute(el1,"class","ember-power-select-multiple-remove-btn");
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
        statements: [
          ["attribute","data-selected-index",["get","idx",["loc",[null,[8,32],[8,35]]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
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
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","component",[["get","selectedItemComponent",["loc",[null,[11,20],[11,41]]]]],["selected",["subexpr","@mut",[["get","opt",["loc",[null,[11,51],[11,54]]]]],[],[]],"lastSearchedText",["subexpr","@mut",[["get","lastSearchedText",["loc",[null,[11,72],[11,88]]]]],[],[]]],["loc",[null,[11,8],[11,90]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
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
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","opt",["loc",[null,[13,16],[13,19]]]],["get","lastSearchedText",["loc",[null,[13,20],[13,36]]]]],[],["loc",[null,[13,8],[13,38]]]]
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
        dom.setAttribute(el1,"class","ember-power-select-multiple-option");
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
        morphs[0] = dom.createMorphAt(element2,1,1);
        morphs[1] = dom.createMorphAt(element2,2,2);
        return morphs;
      },
      statements: [
        ["block","unless",[["get","disabled",["loc",[null,[4,16],[4,24]]]]],[],0,null,["loc",[null,[4,6],[9,17]]]],
        ["block","if",[["get","selectedItemComponent",["loc",[null,[10,12],[10,33]]]]],[],1,2,["loc",[null,[10,6],[14,13]]]]
      ],
      locals: ["opt","idx"],
      templates: [child0, child1, child2]
    };
  }());
  var child1 = (function() {
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
        dom.setAttribute(el1,"type","search");
        dom.setAttribute(el1,"tabindex","0");
        dom.setAttribute(el1,"autocomplete","off");
        dom.setAttribute(el1,"autocorrect","off");
        dom.setAttribute(el1,"autocapitalize","off");
        dom.setAttribute(el1,"spellcheck","false");
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
      statements: [
        ["attribute","class",["concat",["ember-power-select-trigger-multiple-input ",["get","elementId",["loc",[null,[18,76],[18,85]]]],"-input"]]],
        ["attribute","aria-controls",["get","listboxId",["loc",[null,[20,22],[20,31]]]]],
        ["attribute","style",["get","triggerMultipleInputStyle",["loc",[null,[21,14],[21,39]]]]],
        ["attribute","placeholder",["get","maybePlaceholder",["loc",[null,[22,20],[22,36]]]]],
        ["attribute","disabled",["get","disabled",["loc",[null,[23,17],[23,25]]]]],
        ["attribute","oninput",["subexpr","action",["handleInput"],[],["loc",[null,[24,14],[24,38]]]]],
        ["attribute","onkeydown",["subexpr","action",["handleKeydown"],[],["loc",[null,[25,16],[25,42]]]]]
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
      dom.setAttribute(el1,"class","ember-power-select-multiple-options");
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
      dom.setAttribute(el1,"class","ember-power-select-status-icon");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element3 = dom.childAt(fragment, [0]);
      var morphs = new Array(3);
      morphs[0] = dom.createAttrMorph(element3, 'id');
      morphs[1] = dom.createMorphAt(element3,1,1);
      morphs[2] = dom.createMorphAt(element3,2,2);
      return morphs;
    },
    statements: [
      ["attribute","id",["concat",[["get","elementId",["loc",[null,[1,10],[1,19]]]],"-ember-power-select-multiple-options"]]],
      ["block","each",[["get","selected",["loc",[null,[2,10],[2,18]]]]],[],0,null,["loc",[null,[2,2],[16,11]]]],
      ["block","if",[["get","searchEnabled",["loc",[null,[17,8],[17,21]]]]],[],1,null,["loc",[null,[17,2],[26,9]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));