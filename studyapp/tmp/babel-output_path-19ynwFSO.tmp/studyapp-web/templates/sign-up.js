define("studyapp-web/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 2
              },
              "end": {
                "line": 16,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
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
          statements: [["content", "uni.name", ["loc", [null, [15, 3], [15, 15]]]]],
          locals: ["uni"],
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
                "line": 17,
                "column": 2
              },
              "end": {
                "line": 21,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please choose a university to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
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
                "line": 26,
                "column": 2
              },
              "end": {
                "line": 28,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" - (");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(")\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["content", "course.name", ["loc", [null, [27, 3], [27, 18]]]], ["content", "course.id", ["loc", [null, [27, 22], [27, 35]]]]],
          locals: ["course"],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 2
              },
              "end": {
                "line": 33,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please select atleast one service to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 40,
                  "column": 5
                },
                "end": {
                  "line": 42,
                  "column": 5
                }
              },
              "moduleName": "studyapp-web/templates/sign-up.hbs"
            },
            arity: 2,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("						");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(" ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(" - (");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(") ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("span");
              dom.setAttribute(el1, "class", "span-float-right");
              var el2 = dom.createElement("a");
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("br");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element10 = dom.childAt(fragment, [7, 0]);
              var morphs = new Array(5);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
              morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
              morphs[3] = dom.createElementMorph(element10);
              morphs[4] = dom.createMorphAt(element10, 0, 0);
              return morphs;
            },
            statements: [["inline", "fa-icon", ["graduation-cap"], [], ["loc", [null, [41, 6], [41, 34]]]], ["content", "course.name", ["loc", [null, [41, 35], [41, 50]]]], ["content", "course.id", ["loc", [null, [41, 54], [41, 67]]]], ["element", "action", ["removeCourse", ["get", "index", ["loc", [null, [41, 127], [41, 132]]]]], [], ["loc", [null, [41, 103], [41, 134]]]], ["inline", "fa-icon", ["minus-circle"], [], ["loc", [null, [41, 135], [41, 161]]]]],
            locals: ["course", "index"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 34,
                "column": 2
              },
              "end": {
                "line": 45,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "courses-container");
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "text-center padding-top");
            var el3 = dom.createTextNode("\n					");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("span");
            dom.setAttribute(el3, "class", "bold");
            var el4 = dom.createTextNode("Courses Selected:");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n				");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "course-list");
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("				");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["block", "each", [["get", "selectedCourses", ["loc", [null, [40, 13], [40, 28]]]]], [], 0, null, ["loc", [null, [40, 5], [42, 14]]]]],
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
              "line": 2,
              "column": 1
            },
            "end": {
              "line": 53,
              "column": 1
            }
          },
          "moduleName": "studyapp-web/templates/sign-up.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "signup-background1");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "background");
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-titles");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "bold large");
          var el5 = dom.createTextNode("Join Now!");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("br");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			Connect With Other Students in Your Classes!\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-question");
          var el4 = dom.createTextNode("\n			What University do ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "underline");
          var el5 = dom.createTextNode("you");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" go to?\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-question");
          var el4 = dom.createTextNode("\n			What Courses are ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "underline");
          var el5 = dom.createTextNode("you");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" currently taking?\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-buttons");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "class", "button gold");
          var el5 = dom.createTextNode("Continue");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("		\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element11 = dom.childAt(fragment, [1, 1]);
          var element12 = dom.childAt(element11, [22, 1]);
          var morphs = new Array(6);
          morphs[0] = dom.createMorphAt(element11, 10, 10);
          morphs[1] = dom.createMorphAt(element11, 11, 11);
          morphs[2] = dom.createMorphAt(element11, 18, 18);
          morphs[3] = dom.createMorphAt(element11, 19, 19);
          morphs[4] = dom.createMorphAt(element11, 20, 20);
          morphs[5] = dom.createElementMorph(element12);
          return morphs;
        },
        statements: [["block", "power-select", [], ["options", ["subexpr", "@mut", [["get", "universities", ["loc", [null, [14, 26], [14, 38]]]]], [], []], "onchange", ["subexpr", "action", ["chooseUniversity"], [], ["loc", [null, [14, 48], [14, 75]]]], "placeholder", "Please choose your university.", "allowClear", true, "selected", ["subexpr", "@mut", [["get", "uni", ["loc", [null, [14, 146], [14, 149]]]]], [], []], "class", "powerselect", "searchField", "name"], 0, null, ["loc", [null, [14, 2], [16, 19]]]], ["block", "if", [["get", "uniError", ["loc", [null, [17, 8], [17, 16]]]]], [], 1, null, ["loc", [null, [17, 2], [21, 9]]]], ["block", "power-select", [], ["options", ["subexpr", "@mut", [["get", "courses", ["loc", [null, [26, 26], [26, 33]]]]], [], []], "onchange", ["subexpr", "action", ["addCourse"], [], ["loc", [null, [26, 43], [26, 63]]]], "placeholder", "Please select a course.", "allowClear", true, "class", "powerselect", "searchField", "name"], 2, null, ["loc", [null, [26, 2], [28, 19]]]], ["block", "if", [["get", "courseError", ["loc", [null, [29, 8], [29, 19]]]]], [], 3, null, ["loc", [null, [29, 2], [33, 9]]]], ["block", "if", [["get", "anyCourses", ["loc", [null, [34, 8], [34, 18]]]]], [], 4, null, ["loc", [null, [34, 2], [45, 9]]]], ["element", "action", ["nextStep"], [], ["loc", [null, [48, 26], [48, 47]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4]
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
                "line": 65,
                "column": 2
              },
              "end": {
                "line": 69,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid first name to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
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
                "line": 77,
                "column": 2
              },
              "end": {
                "line": 81,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid last name to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
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
                "line": 89,
                "column": 2
              },
              "end": {
                "line": 93,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid email to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 101,
                "column": 2
              },
              "end": {
                "line": 105,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid password to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 107,
                "column": 3
              },
              "end": {
                "line": 109,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
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
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password1", ["loc", [null, [108, 30], [108, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Password"], ["loc", [null, [108, 4], [108, 96]]]]],
          locals: [],
          templates: []
        };
      })();
      var child5 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 109,
                "column": 3
              },
              "end": {
                "line": 111,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
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
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password1", ["loc", [null, [110, 30], [110, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "type", "password", "placeholder", "Password"], ["loc", [null, [110, 4], [110, 112]]]]],
          locals: [],
          templates: []
        };
      })();
      var child6 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 117,
                "column": 2
              },
              "end": {
                "line": 121,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Please enter a valid password to continue.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child7 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 123,
                "column": 3
              },
              "end": {
                "line": 125,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
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
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password2", ["loc", [null, [124, 30], [124, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Confirm Password"], ["loc", [null, [124, 4], [124, 104]]]]],
          locals: [],
          templates: []
        };
      })();
      var child8 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 125,
                "column": 3
              },
              "end": {
                "line": 127,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
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
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password2", ["loc", [null, [126, 30], [126, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "type", "password", "placeholder", "Confirm Password"], ["loc", [null, [126, 4], [126, 120]]]]],
          locals: [],
          templates: []
        };
      })();
      var child9 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 129,
                "column": 2
              },
              "end": {
                "line": 133,
                "column": 2
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createTextNode("\n				Your passwords do not match.\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child10 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 135,
                "column": 3
              },
              "end": {
                "line": 137,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "text");
            var el2 = dom.createTextNode("- Hide your password");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element1);
            morphs[1] = dom.createMorphAt(element1, 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["togglePassword"], [], ["loc", [null, [136, 7], [136, 34]]]], ["inline", "fa-icon", ["check-square-o"], ["size", 2], ["loc", [null, [136, 35], [136, 70]]]]],
          locals: [],
          templates: []
        };
      })();
      var child11 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 137,
                "column": 3
              },
              "end": {
                "line": 139,
                "column": 3
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "text");
            var el2 = dom.createTextNode("- Display your password");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createMorphAt(element0, 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["togglePassword"], [], ["loc", [null, [138, 7], [138, 34]]]], ["inline", "fa-icon", ["square-o"], ["size", 2], ["loc", [null, [138, 35], [138, 64]]]]],
          locals: [],
          templates: []
        };
      })();
      var child12 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 154,
                  "column": 9
                },
                "end": {
                  "line": 154,
                  "column": 110
                }
              },
              "moduleName": "studyapp-web/templates/sign-up.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createElement("p");
              dom.setAttribute(el1, "class", "modal-login-button");
              var el2 = dom.createTextNode("Lets go to the login page?");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
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
                "line": 152,
                "column": 7
              },
              "end": {
                "line": 155,
                "column": 7
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("Looks like there was an account already with that email.");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n			      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["block", "link-to", ["login"], ["class", "no-underline"], 0, null, ["loc", [null, [154, 9], [154, 122]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child13 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 155,
                "column": 7
              },
              "end": {
                "line": 158,
                "column": 7
              }
            },
            "moduleName": "studyapp-web/templates/sign-up.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("Sign up complete");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n			      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("Welcome to WeStudy");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
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
              "line": 53,
              "column": 1
            },
            "end": {
              "line": 165,
              "column": 1
            }
          },
          "moduleName": "studyapp-web/templates/sign-up.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "signup-background2");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "background");
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-titles");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "bold large");
          var el5 = dom.createTextNode("Account Information");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("br");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			Input a few pieces of information to get started\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			What is your first name?\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			What is your last name?\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			Enter your email address\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			Create your password\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("<div class=\"signup-question\">\n			Confirm password\n		</div>");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-center");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "display-password-container");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "signup-buttons");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "class", "button black");
          var el5 = dom.createTextNode("Go Back");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "id", "submit");
          dom.setAttribute(el4, "class", "button gold");
          var el5 = dom.createTextNode("Finish");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "id", "modal");
          dom.setAttribute(el2, "class", "modal");
          var el3 = dom.createTextNode("\n		  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "modal-content");
          var el4 = dom.createTextNode("\n		  	");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          var el5 = dom.createTextNode("\n		      ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("span");
          dom.setAttribute(el5, "class", "close");
          var el6 = dom.createTextNode("×");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n		    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "modal-body");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("		    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          var el5 = dom.createTextNode("\n		    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		  ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var element3 = dom.childAt(element2, [1]);
          var element4 = dom.childAt(element3, [50]);
          var element5 = dom.childAt(element4, [1]);
          var element6 = dom.childAt(element4, [3]);
          var element7 = dom.childAt(element2, [3, 1]);
          var element8 = dom.childAt(element7, [1]);
          var element9 = dom.childAt(element7, [5]);
          var morphs = new Array(17);
          morphs[0] = dom.createMorphAt(element3, 10, 10);
          morphs[1] = dom.createMorphAt(dom.childAt(element3, [12]), 1, 1);
          morphs[2] = dom.createMorphAt(element3, 18, 18);
          morphs[3] = dom.createMorphAt(dom.childAt(element3, [20]), 1, 1);
          morphs[4] = dom.createMorphAt(element3, 26, 26);
          morphs[5] = dom.createMorphAt(dom.childAt(element3, [28]), 1, 1);
          morphs[6] = dom.createMorphAt(element3, 34, 34);
          morphs[7] = dom.createMorphAt(dom.childAt(element3, [36]), 1, 1);
          morphs[8] = dom.createMorphAt(element3, 42, 42);
          morphs[9] = dom.createMorphAt(dom.childAt(element3, [44]), 1, 1);
          morphs[10] = dom.createMorphAt(element3, 46, 46);
          morphs[11] = dom.createMorphAt(dom.childAt(element3, [48]), 1, 1);
          morphs[12] = dom.createElementMorph(element5);
          morphs[13] = dom.createElementMorph(element6);
          morphs[14] = dom.createAttrMorph(element8, 'class');
          morphs[15] = dom.createMorphAt(dom.childAt(element7, [3]), 1, 1);
          morphs[16] = dom.createAttrMorph(element9, 'class');
          return morphs;
        },
        statements: [["block", "if", [["get", "firstnameError", ["loc", [null, [65, 8], [65, 22]]]]], [], 0, null, ["loc", [null, [65, 2], [69, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "firstname", ["loc", [null, [71, 29], [71, 38]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "First Name"], ["loc", [null, [71, 3], [71, 97]]]], ["block", "if", [["get", "lastnameError", ["loc", [null, [77, 8], [77, 21]]]]], [], 1, null, ["loc", [null, [77, 2], [81, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "lastname", ["loc", [null, [83, 29], [83, 37]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Last Name"], ["loc", [null, [83, 3], [83, 95]]]], ["block", "if", [["get", "emailError", ["loc", [null, [89, 8], [89, 18]]]]], [], 2, null, ["loc", [null, [89, 2], [93, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [95, 29], [95, 34]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Email Address"], ["loc", [null, [95, 3], [95, 96]]]], ["block", "if", [["get", "password1Error", ["loc", [null, [101, 8], [101, 22]]]]], [], 3, null, ["loc", [null, [101, 2], [105, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [107, 9], [107, 24]]]]], [], 4, 5, ["loc", [null, [107, 3], [111, 10]]]], ["block", "if", [["get", "password2Error", ["loc", [null, [117, 8], [117, 22]]]]], [], 6, null, ["loc", [null, [117, 2], [121, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [123, 9], [123, 24]]]]], [], 7, 8, ["loc", [null, [123, 3], [127, 10]]]], ["block", "if", [["get", "passwordMatchError", ["loc", [null, [129, 8], [129, 26]]]]], [], 9, null, ["loc", [null, [129, 2], [133, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [135, 9], [135, 24]]]]], [], 10, 11, ["loc", [null, [135, 3], [139, 10]]]], ["element", "action", ["prevStep"], [], ["loc", [null, [142, 27], [142, 48]]]], ["element", "action", ["nextStep"], [], ["loc", [null, [143, 38], [143, 59]]]], ["attribute", "class", ["concat", ["modal-header ", ["subexpr", "if", [["get", "accountAlreadyCreated", ["loc", [null, [148, 35], [148, 56]]]], "error-red", ""], [], ["loc", [null, [148, 30], [148, 73]]]]]]], ["block", "if", [["get", "accountAlreadyCreated", ["loc", [null, [152, 13], [152, 34]]]]], [], 12, 13, ["loc", [null, [152, 7], [158, 14]]]], ["attribute", "class", ["concat", ["modal-footer ", ["subexpr", "if", [["get", "accountAlreadyCreated", ["loc", [null, [160, 36], [160, 57]]]], "error-red", ""], [], ["loc", [null, [160, 31], [160, 74]]]]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9, child10, child11, child12, child13]
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
            "line": 169,
            "column": 3
          }
        },
        "moduleName": "studyapp-web/templates/sign-up.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "signup-container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("\n<a {{action 'saveUser'}} class=\"test\">Save</a>\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["subexpr", "int-equal", [["get", "currentStep", ["loc", [null, [2, 18], [2, 29]]]], 1], [], ["loc", [null, [2, 7], [2, 32]]]]], [], 0, 1, ["loc", [null, [2, 1], [165, 8]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});