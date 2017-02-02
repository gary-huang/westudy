define('studyapp-web/controllers/sign-up', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({

		alreadySignedUp: false,
		uni: null,
		selectedCourses: [],
		currentStep: 1,
		uniError: false,
		courseError: false,
		firstname: null,
		lastname: null,
		email: null,
		password: null,
		displayPassword: false,
		firstnameError: false,
		lastnameError: false,
		password1Error: false,
		password2Error: false,
		passwordMatchError: false,
		emailError: false,
		universities: [{
			name: 'University of Waterloo'
		}, {
			name: 'Wilfred Laurier'
		}, {
			name: 'University of Toronto'
		}],
		courses: [{
			name: 'Combinatorics',
			id: 'Math239'
		}, {
			name: 'Data Structures and Data Managment',
			id: 'CS240'
		}, {
			name: 'Foundations of Sequential Programs',
			id: 'CS241'
		}, {
			name: 'Computer Organization and Design',
			id: 'CS251'
		}],

		accountAlreadyCreated: _ember['default'].computed('alreadySignedUp', function () {
			return this.get('alreadySignedUp');
		}),

		anyCourses: _ember['default'].computed('selectedCourses.[]', function () {
			var any = this.get('selectedCourses').length > 0;
			if (any && this.get('courseError')) {
				this.set('courseError', false);
			}
			return any;
		}),

		actions: {
			saveUser: function saveUser() {
				var self = this;
				user.save().then(function (values) {
					self.set('alreadySignedUp', _ember['default'].get(values, 'alreadySignedUp'));
				});
			},
			addCourse: function addCourse(course) {
				var curr = this.get('selectedCourses');
				curr.addObject(course);
				this.set('selectedCourses', curr);
			},
			removeCourse: function removeCourse(index) {
				this.get('selectedCourses').removeAt(index);
			},
			chooseUniversity: function chooseUniversity(uni) {
				if (this.get('uniError')) this.set('uniError', false);
				this.set('uni', uni);
			},
			nextStep: function nextStep() {

				if (this.get('currentStep') === 1) {
					var canContinue = true;
					if (this.get('selectedCourses').length == 0) {
						canContinue = false;
						this.set('courseError', true);
					}
					if (this.get('uni') === null) {
						canContinue = false;
						this.set('uniError', true);
					}
					if (canContinue) this.set('currentStep', 2);
				} else if (this.get('currentStep') === 2) {
					var properFirstName = false;
					var properLastName = false;
					var properEmail = false;
					var properPassword1 = false;
					var properPassword2 = false;
					var passwordMatch = false;

					if (this.get('firstname') === null) {
						this.set('firstnameError', true);
					} else {
						this.set('firstnameError', false);
					}
					if (this.get('lastname') === null) {
						this.set('lastnameError', true);
					} else {
						this.set('lastnameError', false);
					}
					if (this.get('email') === null) {
						this.set('emailError', true);
					} else {
						this.set('emailError', false);
					}
					if (this.get('password1') === null) {
						this.set('password1Error', true);
					} else {
						this.set('password1Error', false);
					}
					if (this.get('password2') === null) {
						this.set('password2Error', true);
					} else {
						this.set('password2Error', false);
					}

					if (this.get('firstname').length > 0) properFirstName = true;
					if (this.get('lastname').length > 0) properLastName = true;
					if (this.get('email').replace(/.+@.+\..+/g, "").length != this.get('email').length) properEmail = true;
					if (this.get('password1').length > 0) properPassword1 = true;
					if (this.get('password2').length > 0) properPassword2 = true;
					if (this.get('password1') === this.get('password2')) passwordMatch = true;

					if (properPassword1 && properPassword2 && passwordMatch && properEmail && properFirstName && properLastName) {

						this.set('firstnameError', false);
						this.set('lastnameError', false);
						this.set('emailError', false);
						this.set('password1Error', false);
						this.set('password2Error', false);
						var arr = [];
						for (var i = 0; i < this.get('selectedCourses').length; i++) {
							arr.push(this.get('selectedCourses')[i].id);
						}

						// Get the modal
						var modal = document.getElementById('modal');

						// Get the button that opens the modal
						var btn = document.getElementsByClassName("submit");

						// Get the <span> element that closes the modal
						var span = document.getElementsByClassName("close")[0];

						// When the user clicks on <span> (x), close the modal
						span.onclick = function () {
							modal.style.display = "none";
							window.location.href = '';
						};

						// When the user clicks anywhere outside of the modal, close it
						window.onclick = function (event) {
							if (event.target == modal) {
								modal.style.display = "none";
								window.location.href = '';
							}
						};

						var user = this.store.createRecord('user', {
							firstname: this.get('firstname'),
							lastname: this.get('lastname'),
							email: this.get('email'),
							password: this.get('password1'),
							admin: false,
							university: this.get('uni').name,
							courses: arr
						});
						var self = this;
						user.save().then(function (values) {
							self.set('alreadySignedUp', _ember['default'].get(values, 'alreadySignedUp'));
							if (self.get('alreadySignedUp')) {
								_ember['default'].run.later(function () {
									self.set('alreadySignedUp', false);
								}, 2000);
							}
						});
						modal.style.display = "block";
					} else {
						if (!properFirstName) this.set('firstnameError', true);
						if (!properLastName) this.set('lastnameError', true);
						if (!properEmail) this.set('emailError', true);
						if (!properPassword1) this.set('password1Error', true);
						if (!properPassword2) this.set('password2Error', true);
						if (!passwordMatch) this.set('passwordMatchError', true);
					}
				}
			},
			prevStep: function prevStep() {
				this.set('currentStep', this.get('currentStep') - 1);
			},
			togglePassword: function togglePassword() {
				this.set('displayPassword', !this.get('displayPassword'));
			}
		}
	});
});