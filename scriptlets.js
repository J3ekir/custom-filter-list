/// Vavien.techolay.reaction.js
(()=>{
	self.qs = (a, b) => typeof a === "string" ? document.querySelector(a) : a.querySelector?.(b);
	self.qsa = (a, b) => typeof a === "string" ? document.querySelectorAll(a) : a.querySelectorAll?.(b);
	self.waitForElement = selector => new Promise(resolve => {
		const elem = qs(selector);
		if (elem) { return resolve(elem); }
		new MutationObserver((_, observer) => {
			const elem = qs(selector);
			if (elem) {
				observer.disconnect();
				resolve(elem);
			}
		}).observe(document, { childList: true, subtree: true });
	});
	function f() {
		qsa(".reaction-text.js-reactionText").forEach(elem => {
			if (elem.textContent.trim() === "Beğendim") {
				elem.textContent = elem.previousElementSibling.title = elem.previousElementSibling.title = "Beğen";
			}
		});
		qsa(".reaction-sprite.js-reaction[alt='Beğendim']").forEach(elem => {
			elem.alt = elem.title = elem.ariaLabel = elem.dataset.originalTitle = "Beğen";
		});
		qsa(".tooltip-content").forEach(elem => {
			if (elem.textContent.trim() === "Beğendim") {
				elem.textContent = "Beğen";
			}
		});
	}
	waitForElement(".blockMessage--none").then(elem => {
		f();
		new MutationObserver(() => f()).observe(document, { childList: true, subtree: true });
	});
})();
