/// Vavien.techolay.reaction.js
(()=>{
	self.qs = (a, b) => typeof a === "string" ? document.querySelector(a) : a.querySelector?.(b);
	self.qsa = (a, b) => typeof a === "string" ? document.querySelectorAll(a) : a.querySelectorAll?.(b);
	self.waitForElement = selector => new Promise(resolve => {
		let elem;
		if (elem = qs(selector)) { return resolve(elem); }
		new MutationObserver((_, observer) => {
			if (elem = qs(selector)) {
				observer.disconnect();
				resolve(elem);
			}
		}).observe(document, { childList: true, subtree: true });
	});
	const map = {
		Beğendim: "Beğen",
		Beğenmedim: "Beğenme",
	};
	function updateReactions() {
		Object.entries(map).forEach(([k, v]) => {
			qsa(".reaction-text.js-reactionText").forEach(elem => {
				if (elem.textContent.trim() === k) {
					elem.textContent = elem.previousElementSibling.title = v;
				}
			});
			qsa(`.reaction-sprite.js-reaction[alt='${ k }']`).forEach(elem => {
				elem.alt = elem.title = elem.ariaLabel = elem.dataset.originalTitle = v;
			});
			qsa(".tooltip-content").forEach(elem => {
				if (elem.textContent.trim() === k) {
					elem.textContent = v;
				}
			});
		});
	}
	waitForElement(".blockMessage--none").then(elem => {
		updateReactions();
		new MutationObserver(() => updateReactions()).observe(document, { childList: true, subtree: true });
	});
})();
