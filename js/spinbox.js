var spinbox_groups = [];


var SpinBoxGroup = function(spinboxes, min, max) {
	this.id = spinbox_groups.length;
	spinbox_groups.push(this);
	this.spinboxes = spinboxes;	
	this.min = min || 0;
	this.max = max || this.spinboxes.length*10;
	
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
	this.holdPeriod = 1000;

	this.plus = function() {
		console.log(this.group.id, this.id, 'plus');
		if(this.value+this.step <= this.max) {
			if(this.group) {
				if(this.group.getSum()+this.step <= this.group.max) {
					if(this.isHeld) {
						this.value += this.step;
						this.holdPeriod > 150 ? this.holdPeriod *= 0.6 : this.holdPeriod = 150;
						var self = this;
						setTimeout(function() {self.plus.call(self)}, self.holdPeriod);
					};
				};
			} else {
				this.value += this.step;
			};
		} else {
			this.isHeld = false;
			this.holdPeriod = 1000;
		}
		this.refresh();		
	};
	
	this.minus = function() {
		console.log(this.group.id, this.id, 'minus');
		if(this.value-this.step >= this.min) {
			if(this.group) {
				if(this.group.getSum()-this.step >= this.group.min) {
					if(this.isHeld) {
						this.value -= this.step;
						this.holdPeriod > 150 ? this.holdPeriod *= 0.6 : this.holdPeriod = 150;
						var self = this;
						setTimeout(function() {self.minus.call(self)}, self.holdPeriod);
					};
				};
			} else {
				this.value -= this.step;
			};
		} else {
			this.isHeld = false;
			this.holdPeriod = 1000;
		};
		this.refresh();		
	};

	this.refresh = function() {
		$('.spinbox[data-id='+this.id+'][data-group_id='+this.group.id+']').html(this.getInnerHtml());
	};
	
	this.getInnerHtml = function() {
		var html = '';
		html += '<div class="spinbox_value">' + this.value + '</div>';
		html += '<div class="spinbox_arrows"><div class="spinbox_arrow arrow_up"></div><div class="spinbox_arrow arrow_down"></div></div>';
		return html;
	};

	this.getHTML = function() {
		var html = '<div class="spinbox" data-id='+this.id+' data-group_id='+this.group.id+'>';
		html += this.getInnerHtml();
		html += '</div>';
		return html;
	};
	
};

$(document).on('mousedown', '.spinbox_arrow', function() {
	var $arrow = $(this);
	var $spinbox = $arrow.parents('.spinbox');
	var spinbox_id = $spinbox.data('id');
	var group_id = $spinbox.data('group_id');
	var spinbox = spinbox_groups[group_id].spinboxes[spinbox_id];
	spinbox.isHeld = true;
	if($arrow.hasClass('arrow_up')) {
		spinbox.plus();
	} else {
		spinbox.minus();
	};
});
$(document).on('mouseup', '.spinbox_arrow', function() {
	var $arrow = $(this);
	var $spinbox = $arrow.parents('.spinbox');
	var spinbox_id = $spinbox.data('id');
	var group_id = $spinbox.data('group_id');
	var spinbox = spinbox_groups[group_id].spinboxes[spinbox_id];
	spinbox.isHeld = false;
	spinbox.holdPeriod = 1000;
})
