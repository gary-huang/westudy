export default Ember.HTMLBars.template((function() {
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
          "line": 84,
          "column": 0
        }
      },
      "moduleName": "studyapp-web/templates/login.hbs"
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","login-page");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","login-topBlock");
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","login-container");
      var el3 = dom.createTextNode("\n		\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","login-title galada");
      var el4 = dom.createTextNode("\n			WeStudy\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("hr");
      dom.setAttribute(el3,"class","login-lineDividers");
      dom.setAttribute(el3,"size","10px");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"style","padding-top:15px;padding-left:30px;padding-right:30px;text-align:left;font-weight:bold;font-size:20px;font-family:cursive,Comic Sans MS,Helvetica Neue,Helvetica,sans-serif");
      var el4 = dom.createTextNode("\n			\"Let's start studying you degenerates\"\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"style","padding-top:15px;padding-left:30px;padding-right:30px;text-align:right;font-weight:bold;font-size:20px;font-family:cursive,Comic Sans MS,Helvetica Neue,Helvetica,sans-serif");
      var el4 = dom.createTextNode("\n			-Feridun\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("hr");
      dom.setAttribute(el3,"class","login-lineDividers");
      dom.setAttribute(el3,"size","10px");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("\n		<div class=\"login-buttons\">\n			<a class=\"login-buttons bluefb\">Log In with Facebook</a>\n		</div>\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","login-fields-desc bold");
      var el4 = dom.createTextNode("\n			Email Address\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","login-text");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","login-fields-desc bold");
      var el4 = dom.createTextNode("\n			Password\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","login-text");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","forgotPwd");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("a");
      dom.setAttribute(el4,"style","color:black;padding-top:00px");
      dom.setAttribute(el4,"href","https://google.ca");
      dom.setAttribute(el4,"target","_blank");
      var el5 = dom.createTextNode("\n				Forgot your password?\n			");
      dom.appendChild(el4, el5);
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
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","login-buttons");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("a");
      dom.setAttribute(el4,"class","login-buttons green");
      var el5 = dom.createTextNode("\n				Log In\n			");
      dom.appendChild(el4, el5);
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
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","login-buttons");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("a");
      dom.setAttribute(el4,"class","login-buttons red");
      var el5 = dom.createTextNode("\n				Sign Up\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("br");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("br");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment(" The frontend Modal ");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"id","loginFailurePrelim");
      dom.setAttribute(el3,"class","login-modal");
      var el4 = dom.createTextNode("\n\n		  ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment(" Modal content ");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		  ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","login-modal-content");
      var el5 = dom.createTextNode("\n		    ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      dom.setAttribute(el5,"class","close");
      var el6 = dom.createTextNode("x");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n		    ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("p");
      var el6 = dom.createTextNode("A valid email must be entered, and the password must not be blank.");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n		  ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment(" The backend Modal ");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"id","loginFailureBack");
      dom.setAttribute(el3,"class","login-modal");
      var el4 = dom.createTextNode("\n\n		  ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment(" Modal content ");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		  ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","login-modal-content");
      var el5 = dom.createTextNode("\n		    ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      dom.setAttribute(el5,"class","close");
      var el6 = dom.createTextNode("x");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n		    ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("p");
      var el6 = dom.createTextNode("Login failed, password do not match.");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n		  ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0, 3]);
      var element1 = dom.childAt(element0, [25, 1]);
      var element2 = dom.childAt(element0, [29, 1]);
      var morphs = new Array(4);
      morphs[0] = dom.createMorphAt(dom.childAt(element0, [15]),1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(element0, [19]),1,1);
      morphs[2] = dom.createElementMorph(element1);
      morphs[3] = dom.createElementMorph(element2);
      return morphs;
    },
    statements: [
      ["inline","input",[],["type","text","placeholder","Email Address","value",["subexpr","@mut",[["get","email",["loc",[null,[29,57],[29,62]]]]],[],[]],"class","inputbox","maxlength","85"],["loc",[null,[29,3],[29,96]]]],
      ["inline","input",[],["type","text","placeholder","Password","value",["subexpr","@mut",[["get","password",["loc",[null,[37,52],[37,60]]]]],[],[]],"type","password","class","inputbox","maxlength","85"],["loc",[null,[37,3],[37,110]]]],
      ["element","action",["login"],[],["loc",[null,[48,34],[48,52]]]],
      ["element","action",["signup"],[],["loc",[null,[54,32],[54,51]]]]
    ],
    locals: [],
    templates: []
  };
}()));