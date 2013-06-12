(function($, ko){
	function ViewModel() {
		var self = this;

		self.pixels = ko.observable(false);
		self.pixelsTogglerLabel = ko.computed(function(){
			return self.pixels() ? 'Show column numbers' : 'Show column widths';
		});
		self.togglePixels = function(){
			self.pixels(!self.pixels());
			self.submit();
		}

		self.gridColumns = ko.observable(12);
		self.gridColumnWidth = ko.observable(60);
		self.gridGutterWidth = ko.observable(20);

		self.width = ko.computed(function(){
			return self.gridColumns() * self.gridColumnWidth() + (self.gridGutterWidth() * (self.gridColumns() - 1))
		});

		self.rows = ko.observableArray();

		self.submitEnabled = ko.computed(function(){
			return !isNaN(parseInt(self.gridColumns())) && !isNaN(parseInt(self.gridColumnWidth())) && !isNaN(parseInt(self.gridGutterWidth()));
		});

		self.submit = function() {
			var rows = [],
				row = [],
				gridColumns = self.gridColumns(),
				gridColumnWidth = self.gridColumnWidth(),
				gridGutterWidth = self.gridGutterWidth(),
				pixels = self.pixels();

			less.modifyVars({
				'@gridColumns': '' + gridColumns,
				'@gridColumnWidth': gridColumnWidth + 'px',
				'@gridGutterWidth': gridGutterWidth + 'px',
			});

			for(var i = 0; i < gridColumns; i++) {
				var number = (i + 1);
				var width = gridColumnWidth + 'px';
				row.push({
					text: pixels ? width : number,
					css: 'span1',
					title: pixels ? number : width
				});
			}
			rows.push(row);

			for(var i = 2; i <= gridColumns; i++) {
				var number = i;
				var width = (gridColumnWidth * i + (gridGutterWidth * (i - 1))) + 'px';
				row = [];
				row.push({
					text: pixels ? width : number,
					css: 'span' + i,
					title: pixels ? number : width
				});
				if (i < gridColumns) {
					number = gridColumns - i;
					width = (gridColumnWidth * (gridColumns - i) + (gridGutterWidth * (gridColumns - i - 1))) + 'px';
					row.push({
						text: pixels ? width : number,
						css: 'span' + (gridColumns - i),
						title: pixels ? number : width
					});
				}
				rows.push(row);
			}
			self.rows(rows);
		}
		self.submit();

		self.preset_700_12_40_20 = function(){
			self.gridColumns(12);
			self.gridColumnWidth(40);
			self.gridGutterWidth(20);
			self.submit();
		}

		self.preset_940_12_60_20 = function(){
			self.gridColumns(12);
			self.gridColumnWidth(60);
			self.gridGutterWidth(20);
			self.submit();
		}

		self.preset_950_12_70_10 = function(){
			self.gridColumns(12);
			self.gridColumnWidth(70);
			self.gridGutterWidth(10);
			self.submit();
		}

		self.preset_980_18_45_10 = function(){
			self.gridColumns(18);
			self.gridColumnWidth(45);
			self.gridGutterWidth(10);
			self.submit();
		}

		self.preset_1000_12_65_20 = function(){
			self.gridColumns(12);
			self.gridColumnWidth(65);
			self.gridGutterWidth(20);
			self.submit();
		}

		self.preset_1170_12_70_30 = function(){
			self.gridColumns(12);
			self.gridColumnWidth(70);
			self.gridGutterWidth(30);
			self.submit();
		}

	}

	ko.applyBindings(new ViewModel());
})(jQuery, ko);