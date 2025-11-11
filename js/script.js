const fadeElements = document.querySelectorAll('.fade-up');

function handleScroll() {
	fadeElements.forEach(el => {
		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight - 100) {
			el.classList.add('show');
		}
	});
}

window.addEventListener('scroll', handleScroll);
handleScroll();