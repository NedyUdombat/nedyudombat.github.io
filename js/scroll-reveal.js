/*
 * Site interactions
 * Scroll reveal and mobile navigation
 */

(() => {
	const revealElements = document.querySelectorAll(".reveal");
	const FALLBACK_DELAY = 5000; // ms before forcing all elements visible

	function showAllElements() {
		revealElements.forEach((el) => {
			el.classList.add("visible");
		});
	}

	function initScrollReveal() {
		// Check for IntersectionObserver support
		if (!("IntersectionObserver" in window)) {
			showAllElements();
			return;
		}

		const observerOptions = {
			threshold: 0.05,
			rootMargin: "0px 0px -30px 0px",
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		revealElements.forEach((el) => {
			observer.observe(el);
		});
	}

	function initMobileNav() {
		const toggle = document.querySelector(".nav-toggle");
		const navLinks = document.querySelector(".nav-links");

		if (!toggle || !navLinks) return;

		toggle.addEventListener("click", () => {
			const isExpanded = toggle.getAttribute("aria-expanded") === "true";
			toggle.setAttribute("aria-expanded", !isExpanded);
			navLinks.classList.toggle("active");
			document.body.style.overflow = isExpanded ? "" : "hidden";
		});

		// Close menu when clicking a link
		navLinks.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", () => {
				toggle.setAttribute("aria-expanded", "false");
				navLinks.classList.remove("active");
				document.body.style.overflow = "";
			});
		});
	}

	// Initialize on DOM ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			initScrollReveal();
			initMobileNav();
		});
	} else {
		initScrollReveal();
		initMobileNav();
	}

	// Fallback: ensure everything is visible after delay
	// This catches edge cases where IntersectionObserver might not fire
	setTimeout(showAllElements, FALLBACK_DELAY);
})();
