app = {};

// scroll to appropriate section from nav bar


// determine which nav should display active stylings on mobile


// dark mode toggle

//prevent formspree redirect
app.postEmail = function () {
	console.log("function called");
	$.ajax({
		url: "https://formspree.io/f/xdobprvy",
		method: "POST",
		data: {
			email: $("#email").val(),
			name: $("#name").val(),
			message: $("#message").val(),
		},
		dataType: "json",
	})
		.then(function () {
			$('#form input:not([type="submit"]), textarea').val("");
		})
		.catch(() => {
			swal({
				icon: "error",
				title: "Oh Oh!",
				text: "Quelque chose s'est mal passé avec les serveurs de formulaires, n'hésitez pas à me contacter à martinkpakpo22@gmail.com !",
			});
		});
};

app.formSubmission = function () {
	$("#form").on("submit", (e) => {
		e.preventDefault();
		if ($('#form input:not([type="submit"])').val() === "" || $("#form textarea").val() === "") {
			console.log("no dice");
			swal({
				icon: "error",
				title: "Uh Oh!",
				text: "Merci de remplir tous les champs afin que je puisse vous recontacter !",
			});
		} else {
			app.postEmail();
			console.log("sent off");
			swal({
				icon: "success",
				buttons: false,
				timer: 1800,
				text: `Message envoyé!`,
			});
		}
	});
};