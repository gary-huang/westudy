import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service("session"),
	email: null,
	password: null,
	accepted: false,

	actions: {
		authenticate() {
			this.get('session').authenticate('authenticator:oauth2', 'USERNAME',
			 'PASSWORD').catch((reason) => {
			 		console.log("ERROR: " + reason);
			 });
		},

		signup() {
			this.transitionTo('sign-up');
		},

		login() {
			var loginEmail = this.get('email');
			var loginPassword = this.get('password');
			console.log("Email: " + loginEmail);
			var loginPrelim = false;
			if (loginEmail === null) {
				console.log("Must enter email.");
			} else if (loginEmail.search("@") === -1) {
				console.log("Not a valid email.");
			} else if (loginEmail.substring(loginEmail.search("@") + 1, loginEmail.length).indexOf('.') === -1) {
				console.log("Not a valid email domain.");
			} else if ((loginPassword === null) || (loginPassword === "")) {
				console.log("Must enter password.");
			} else {
				console.log("Prelimnary validations cleared.");
				loginPrelim = true;
			}
			if (loginPrelim === false) {
				failAlert('loginFailurePrelim');
				return false;
			}

			console.log("Passed prelim");
			var self = this;
			var loginUser = this.get('store').queryRecord('user', {
				params: {
					check: true
				},
			  filter: {
			    email: loginEmail,
			    password: loginPassword
			  }
			}); 

			//console.log(loginUser.body);
			loginUser.then(function(retVals) {
				console.log(Ember.get(retVals, 'accepted'));
				self.set('accepted', Ember.get(retVals, 'accepted'));
				if (self.get('accepted') === true) {
				console.log("Login success.");
				return true;
			} else {
				console.log("Login failure.");
				failAlert('loginFailureBack');
				return false;
			}
			});
		}
	}
});

function failAlert(modalId) {
	// Get the modal
	var modal = document.getElementById(modalId);

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	    modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
	return true;
}
