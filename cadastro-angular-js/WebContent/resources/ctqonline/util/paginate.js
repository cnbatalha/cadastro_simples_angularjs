function Paginate(navigation) {
	self = this;

	// funcao para nevegar
	self.navegation = navigation;
	
	self.content = [];
	self.pages = [];
	self.totalPages = 0;

	self.numberPage = 0;

	self.loadPage = function(page) {

		self.content = page.content;
		self.pages = [];
		self.totalPages = page.totalPages;

		self.navegation = navigation;

		for (var int = 0; int < page.totalPages; int++) {
			self.pages[int] = int;
		}

		self.numberPage = page.number;
	}

	self.prevPage = function() {
		if (self.numberPage > 0) {
			self.numberPage--;

			self.navegation(self.numberPage);
		}
	};

	self.prevPageDisabled = function() {
		return self.numberPage === 0 ? "disabled" : "";
	};

	self.pageCount = function() {
		return self.totalPages - 1;
	};

	self.nextPage = function() {
		if (self.numberPage < self.pageCount()) {
			self.numberPage++;

			self.navegation(self.numberPage);
		}
	};

	self.nextPageDisabled = function() {
		return self.numberPage === self.pageCount() ? "disabled" : "";
	};
}