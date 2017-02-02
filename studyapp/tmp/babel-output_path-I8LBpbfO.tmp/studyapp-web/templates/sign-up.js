define("studyapp-web/templates/sign-up", ["exports"], function (exports) {
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
              "line": 5,
              "column": 0
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
          dom.setAttribute(el1, "class", "already-signedup");
          var el2 = dom.createTextNode("\n		Sorry, looks like an account with this email has already been created.\n	");
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
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 19,
                "column": 2
              },
              "end": {
                "line": 21,
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
          statements: [["content", "uni.name", ["loc", [null, [20, 3], [20, 15]]]]],
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
                "line": 22,
                "column": 2
              },
              "end": {
                "line": 26,
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
                "line": 31,
                "column": 2
              },
              "end": {
                "line": 33,
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
          statements: [["content", "course.name", ["loc", [null, [32, 3], [32, 18]]]], ["content", "course.id", ["loc", [null, [32, 22], [32, 35]]]]],
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
                "line": 34,
                "column": 2
              },
              "end": {
                "line": 38,
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
                  "line": 45,
                  "column": 5
                },
                "end": {
                  "line": 47,
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
              var element6 = dom.childAt(fragment, [7, 0]);
              var morphs = new Array(5);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
              morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
              morphs[3] = dom.createElementMorph(element6);
              morphs[4] = dom.createMorphAt(element6, 0, 0);
              return morphs;
            },
            statements: [["inline", "fa-icon", ["graduation-cap"], [], ["loc", [null, [46, 6], [46, 34]]]], ["content", "course.name", ["loc", [null, [46, 35], [46, 50]]]], ["content", "course.id", ["loc", [null, [46, 54], [46, 67]]]], ["element", "action", ["removeCourse", ["get", "index", ["loc", [null, [46, 127], [46, 132]]]]], [], ["loc", [null, [46, 103], [46, 134]]]], ["inline", "fa-icon", ["minus-circle"], [], ["loc", [null, [46, 135], [46, 161]]]]],
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
                "line": 39,
                "column": 2
              },
              "end": {
                "line": 50,
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
          statements: [["block", "each", [["get", "selectedCourses", ["loc", [null, [45, 13], [45, 28]]]]], [], 0, null, ["loc", [null, [45, 5], [47, 14]]]]],
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
              "line": 7,
              "column": 1
            },
            "end": {
              "line": 58,
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
          var element7 = dom.childAt(fragment, [1, 1]);
          var element8 = dom.childAt(element7, [22, 1]);
          var morphs = new Array(6);
          morphs[0] = dom.createMorphAt(element7, 10, 10);
          morphs[1] = dom.createMorphAt(element7, 11, 11);
          morphs[2] = dom.createMorphAt(element7, 18, 18);
          morphs[3] = dom.createMorphAt(element7, 19, 19);
          morphs[4] = dom.createMorphAt(element7, 20, 20);
          morphs[5] = dom.createElementMorph(element8);
          return morphs;
        },
        statements: [["block", "power-select", [], ["options", ["subexpr", "@mut", [["get", "universities", ["loc", [null, [19, 26], [19, 38]]]]], [], []], "onchange", ["subexpr", "action", ["chooseUniversity"], [], ["loc", [null, [19, 48], [19, 75]]]], "placeholder", "Please choose your university.", "allowClear", true, "selected", ["subexpr", "@mut", [["get", "uni", ["loc", [null, [19, 146], [19, 149]]]]], [], []], "class", "powerselect", "searchField", "name"], 0, null, ["loc", [null, [19, 2], [21, 19]]]], ["block", "if", [["get", "uniError", ["loc", [null, [22, 8], [22, 16]]]]], [], 1, null, ["loc", [null, [22, 2], [26, 9]]]], ["block", "power-select", [], ["options", ["subexpr", "@mut", [["get", "courses", ["loc", [null, [31, 26], [31, 33]]]]], [], []], "onchange", ["subexpr", "action", ["addCourse"], [], ["loc", [null, [31, 43], [31, 63]]]], "placeholder", "Please select a course.", "allowClear", true, "class", "powerselect", "searchField", "name"], 2, null, ["loc", [null, [31, 2], [33, 19]]]], ["block", "if", [["get", "courseError", ["loc", [null, [34, 8], [34, 19]]]]], [], 3, null, ["loc", [null, [34, 2], [38, 9]]]], ["block", "if", [["get", "anyCourses", ["loc", [null, [39, 8], [39, 18]]]]], [], 4, null, ["loc", [null, [39, 2], [50, 9]]]], ["element", "action", ["nextStep"], [], ["loc", [null, [53, 26], [53, 47]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 69,
                "column": 2
              },
              "end": {
                "line": 73,
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
                "line": 81,
                "column": 2
              },
              "end": {
                "line": 85,
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
                "line": 93,
                "column": 2
              },
              "end": {
                "line": 97,
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
                "line": 105,
                "column": 2
              },
              "end": {
                "line": 109,
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
                "line": 111,
                "column": 3
              },
              "end": {
                "line": 113,
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
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password1", ["loc", [null, [112, 30], [112, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Password"], ["loc", [null, [112, 4], [112, 96]]]]],
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
                "line": 113,
                "column": 3
              },
              "end": {
                "line": 115,
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
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password1", ["loc", [null, [114, 30], [114, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "type", "password", "placeholder", "Password"], ["loc", [null, [114, 4], [114, 112]]]]],
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
                "line": 121,
                "column": 2
              },
              "end": {
                "line": 125,
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
                "line": 127,
                "column": 3
              },
              "end": {
                "line": 129,
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
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password2", ["loc", [null, [128, 30], [128, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Confirm Password"], ["loc", [null, [128, 4], [128, 104]]]]],
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
                "line": 129,
                "column": 3
              },
              "end": {
                "line": 131,
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
          statements: [["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "password2", ["loc", [null, [130, 30], [130, 39]]]]], [], []], "class", "inputbox", "maxlength", "85", "type", "password", "placeholder", "Confirm Password"], ["loc", [null, [130, 4], [130, 120]]]]],
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
                "line": 133,
                "column": 2
              },
              "end": {
                "line": 137,
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
                "line": 139,
                "column": 3
              },
              "end": {
                "line": 141,
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
          statements: [["element", "action", ["togglePassword"], [], ["loc", [null, [140, 7], [140, 34]]]], ["inline", "fa-icon", ["check-square-o"], ["size", 2], ["loc", [null, [140, 35], [140, 70]]]]],
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
                "line": 141,
                "column": 3
              },
              "end": {
                "line": 143,
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
          statements: [["element", "action", ["togglePassword"], [], ["loc", [null, [142, 7], [142, 34]]]], ["inline", "fa-icon", ["square-o"], ["size", 2], ["loc", [null, [142, 35], [142, 64]]]]],
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
              "line": 58,
              "column": 1
            },
            "end": {
              "line": 164,
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
          dom.setAttribute(el4, "class", "modal-header");
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
          var el5 = dom.createTextNode("\n		      ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("p");
          var el6 = dom.createTextNode("Sign up complete");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n		      ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("p");
          var el6 = dom.createTextNode("Welcome to WeStudy");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n		    ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "modal-footer");
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
          var element2 = dom.childAt(fragment, [1, 1]);
          var element3 = dom.childAt(element2, [47]);
          var element4 = dom.childAt(element3, [1]);
          var element5 = dom.childAt(element3, [3]);
          var morphs = new Array(14);
          morphs[0] = dom.createMorphAt(element2, 7, 7);
          morphs[1] = dom.createMorphAt(dom.childAt(element2, [9]), 1, 1);
          morphs[2] = dom.createMorphAt(element2, 15, 15);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [17]), 1, 1);
          morphs[4] = dom.createMorphAt(element2, 23, 23);
          morphs[5] = dom.createMorphAt(dom.childAt(element2, [25]), 1, 1);
          morphs[6] = dom.createMorphAt(element2, 31, 31);
          morphs[7] = dom.createMorphAt(dom.childAt(element2, [33]), 1, 1);
          morphs[8] = dom.createMorphAt(element2, 39, 39);
          morphs[9] = dom.createMorphAt(dom.childAt(element2, [41]), 1, 1);
          morphs[10] = dom.createMorphAt(element2, 43, 43);
          morphs[11] = dom.createMorphAt(dom.childAt(element2, [45]), 1, 1);
          morphs[12] = dom.createElementMorph(element4);
          morphs[13] = dom.createElementMorph(element5);
          return morphs;
        },
        statements: [["block", "if", [["get", "firstnameError", ["loc", [null, [69, 8], [69, 22]]]]], [], 0, null, ["loc", [null, [69, 2], [73, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "firstname", ["loc", [null, [75, 29], [75, 38]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "First Name"], ["loc", [null, [75, 3], [75, 97]]]], ["block", "if", [["get", "lastnameError", ["loc", [null, [81, 8], [81, 21]]]]], [], 1, null, ["loc", [null, [81, 2], [85, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "lastname", ["loc", [null, [87, 29], [87, 37]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Last Name"], ["loc", [null, [87, 3], [87, 95]]]], ["block", "if", [["get", "emailError", ["loc", [null, [93, 8], [93, 18]]]]], [], 2, null, ["loc", [null, [93, 2], [97, 9]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [99, 29], [99, 34]]]]], [], []], "class", "inputbox", "maxlength", "85", "placeholder", "Email Address"], ["loc", [null, [99, 3], [99, 96]]]], ["block", "if", [["get", "password1Error", ["loc", [null, [105, 8], [105, 22]]]]], [], 3, null, ["loc", [null, [105, 2], [109, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [111, 9], [111, 24]]]]], [], 4, 5, ["loc", [null, [111, 3], [115, 10]]]], ["block", "if", [["get", "password2Error", ["loc", [null, [121, 8], [121, 22]]]]], [], 6, null, ["loc", [null, [121, 2], [125, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [127, 9], [127, 24]]]]], [], 7, 8, ["loc", [null, [127, 3], [131, 10]]]], ["block", "if", [["get", "passwordMatchError", ["loc", [null, [133, 8], [133, 26]]]]], [], 9, null, ["loc", [null, [133, 2], [137, 9]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [139, 9], [139, 24]]]]], [], 10, 11, ["loc", [null, [139, 3], [143, 10]]]], ["element", "action", ["prevStep"], [], ["loc", [null, [146, 27], [146, 48]]]], ["element", "action", ["nextStep"], [], ["loc", [null, [147, 38], [147, 59]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9, child10, child11]
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
            "line": 168,
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
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
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
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "alreadySignedUp", ["loc", [null, [1, 6], [1, 21]]]]], [], 0, null, ["loc", [null, [1, 0], [5, 7]]]], ["block", "if", [["subexpr", "int-equal", [["get", "currentStep", ["loc", [null, [7, 18], [7, 29]]]], 1], [], ["loc", [null, [7, 7], [7, 32]]]]], [], 1, 2, ["loc", [null, [7, 1], [164, 8]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});