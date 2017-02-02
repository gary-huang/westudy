define("studyapp-web/templates/dashboard", ["exports"], function (exports) {
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
            "line": 7,
            "column": 153
          }
        },
        "moduleName": "studyapp-web/templates/dashboard.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "box-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium");
        dom.setAttribute(el2, "style", "background-image: url('/assets/images/dashboardImage1.jpg');");
        var el3 = dom.createTextNode("One");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium marginL");
        dom.setAttribute(el2, "style", "background-image: url('/assets/images/dashboardImage2.jpg');");
        var el3 = dom.createTextNode("Two");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium");
        dom.setAttribute(el2, "style", "background-image: url('/assets/images/dashboardImage3.jpg');");
        var el3 = dom.createTextNode("Three");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium marginL");
        dom.setAttribute(el2, "style", "background-image: url('/assets/images/dashboardOtherThings.jpg');");
        var el3 = dom.createTextNode("Four");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "loadmore-button-container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "load-button");
        var el3 = dom.createTextNode("Load More");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "increase-font-size");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2, 0, 2]), 0, 0);
        return morphs;
      },
      statements: [["inline", "fa-icon", ["arrow-down"], [], ["loc", [null, [7, 110], [7, 134]]]]],
      locals: [],
      templates: []
    };
  })());
});