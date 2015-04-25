var spinBoxGroups = [];


var SpinBoxGroup = function(spinboxes, max, min) {
	this.id = spinBoxGroups.length;
	spinBoxGroups.push(this);
	this.spinboxes = spinboxes;	
	this.max = max || this.spinboxes.length*10;
	this.min = min || 0;
	
	var self = this;
	this.spinboxes.forEach(function(spinbox, id){			
		spinbox.group = self;
		spinbox.id = id;
	}); 
	

	this.getSum = function() {
		var sum = 0;
		this.spinboxes.forEach(function(spinbox, id) {
			sum += spinbox.value;
		});
		return sum;
	};
	
	this.getHTML = function() {
		var html = '<div class="spinbox_group" data-id='+this.id+'>';
		this.spinboxes.forEach(function(spinbox){
			html += spinbox.getHTML();
		});
		html += '</div>'
		return html;
	};	
};


var SpinBox = function(start, min, max, step) {

	this.start = start || 0;
	this.min = min || 0;
	this.max = max || 10;
	this.step = step || 1;
	this.value = this.start;
	

	this.plus = function() {
		if(this.value+this.step <= this.max) {
			if(this.group) {
				if(this.group.getSum()+this.step <= this.group.max) {
					this.value += this.step;
				}
			} else {
				this.value += this.step;
			}
		};
		this.refresh();		
	};
	
	this.minus = function() {
		if(this.value-this.step >= this.min) {
			if(this.group) {
				if(this.group.getSum()-this.step >= this.group.min) {
					this.value -= this.step;
				}
			} else {
				this.value -= this.step;
			}
		};
		this.refresh();		
	};

	this.refresh = function() {
		$('[id]='+this.id).html(this.getCode());
	};
	
	this.getHTML = function() {
		console.log(this.group)
		var html = '<div class="spinbox" data-id='+this.id+' data-group_id='+this.group.id+'>';
		html += '<div class="spinbox_value">' + this.value + '</div>';
		html += '<div class="spinbox_arrows"><div class="spinbox_arrow arrow_up"></div><div class="spinbox_arrow arrow_down"></div></div>';
		html += '</div>';
		return html;
	};
	
};

$(document).on('click', '.spinbox_arrow', function() {
	var id = $(this).data(id);
	if($(this).hasClass('arrow_up')) {

	}
});