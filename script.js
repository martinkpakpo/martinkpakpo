app = {};

// scroll to appropriate section from nav bar
app.anchorNav = function (linkClicked) {
	const anchor = $(linkClicked).attr("href");
// parent container changes on resize, this determines which parent to target
	if (window.innerWidth > 700) {
		const scrollParent = "main";
		$.smoothScroll({
			beforeScroll: function () {
				// need to determine this because of a smooth scroll quirk with safari
				if (navigator.userAgent.indexOf("Safari") != -1) {
					null;
				} else {
					app.preScroll();
				}
			},
			afterScroll: function () {
				if (navigator.userAgent.indexOf("Safari") != -1) {
					null;
				} else {
					app.postScroll();
				}
			},
			scrollElement: $(scrollParent),
			scrollTarget: anchor,
		});
		console.log(anchor);
	} else {
		null;
	}
};

app.preScroll = function () {
	$("main").css("scroll-snap-type", "none");
};

app.postScroll = function () {
	$("main").css("scroll-snap-type", "y mandatory");
};

// determine which nav should display active stylings on desktop
app.navActive = function () {
	if (window.innerWidth <= 1025) {
		app.mobileNavActive();
	} else {
		let scrolled = $("main").scrollTop();
		$("li").removeClass("activeNav");
		if (scrolled > 3.5 * window.innerHeight) {
			$(".nav5").addClass("activeNav");
		} else if (scrolled > 2.5 * window.innerHeight) {
			$(".nav4").addClass("activeNav");
		} else if (scrolled > 1.5 * window.innerHeight) {
			$(".nav3").addClass("activeNav");
		} else if (scrolled > 0.5 * window.innerHeight) {
			$(".nav2").addClass("activeNav");
		} else if (scrolled >= 0) {
			$(".nav1").addClass("activeNav");
		}
	}
};

// due to styling, scroll parents need to be altered
app.mobileNavActive = function () {
	let scrolled = $(window).scrollTop();
	let windowHeight = 0.75 * window.innerHeight;
	app.checkCurrentMobile(scrolled, windowHeight);
	$(window).on("scroll resize", function () {
		scrolled = $(window).scrollTop();
		app.checkCurrentMobile(scrolled, windowHeight);
	});
};

// determine which nav should display active stylings on mobile
app.checkCurrentMobile = function (scrolled, windowHeight) {
	$("li").removeClass("activeNav");
	let a = $(".aboutMe").offset();
	let b = $(".portfolio").offset();
	let c = $(".skills").offset();
	let d = $(".resume").offset();
	if (scrolled >= d.top + 0.5 * windowHeight) {
		$(".nav5").addClass("activeNav");
	} else if (scrolled >= c.top + windowHeight) {
		$(".nav4").addClass("activeNav");
	} else if (scrolled >= b.top + windowHeight) {
		$(".nav3").addClass("activeNav");
	} else if (scrolled >= a.top + windowHeight) {
		$(".nav2").addClass("activeNav");
	} else if (scrolled >= 0) {
		$(".nav1").addClass("activeNav");
	}
};

// hamburger menu toggle
app.showMobile = function () {
	$("nav").toggleClass("show");
	$(".hamburgerMenu").toggleClass("showingMenu");
};
app.closeHamburger = function () {
	$("nav").removeClass("show");
};

// dark mode toggle
$(`button.toggle`).on("click", function () {
	$(".lightTheme, .darkTheme").toggleClass("darkTheme lightTheme");
	$("nav li").toggleClass("lightThemeAfter darkThemeAfter");
	$(".toggle i").toggleClass("hide show");

	if ($("body").hasClass("darkTheme") === true) {
		$(".firebaseSVG").attr("src", "./assets/firebaseDarkMode.svg");
		$(".responsiveSVG").attr("src", "./assets/responsiveDesignDarkMode.svg");
	} else {
		$(".firebaseSVG").attr("src", "./assets/firebase.svg");
		$(".responsiveSVG").attr("src", "./assets/responsiveDesign.svg");
	}
});

//prevent formspree redirect

app.formSubmission = function () {
	$("form").on("submit", (e) => {
		e.preventDefault();
		if ($('form input:not([type="submit"])').val() === "" || $("form textarea").val() === "") {
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
			$('form input:not([type="submit"]), textarea').val("");
		})
		.catch(() => {
			swal({
				icon: "error",
				title: "Oh Oh!",
				text: "Quelque chose s'est mal passé avec les serveurs de formulaires, n'hésitez pas à me contacter à martinkpakpo22@gmail.com !",
			});
		});
};

app.init = function () {
	app.navActive();
	app.formSubmission();

	$("aside a").on("click", function () {
		app.anchorNav(this);
	});

	$("main").on("scroll", function () {
		setTimeout(() => {
			app.navActive();
		}, 300);
	});

	$(window).on("resize", function () {
		app.anchorNav(".activeNav a");
		app.navActive();
	});

	$(".resume h3").on("click, focus", function () {
		$(".resume h3").removeClass("activeResume");
		$(this).addClass("activeResume");
	});

	$("button.hamburgerMenu").on("click", function () {
		app.showMobile();
	});

	$("nav li").on("click", function () {
		app.closeHamburger();
	});
};

$(function () {
	app.init();
});
