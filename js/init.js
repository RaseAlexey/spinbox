var races_spinboxes = {
		'Human' : new SpinBoxGroup([
			new SpinBox(10, 3, 18),
			new SpinBox(10, 3, 18),
			new SpinBox(10, 3, 18),
			new SpinBox(10, 3, 18),
			new SpinBox(10, 3, 18),
			new SpinBox(10, 3, 18),
		], 0, 76),
		'Halforc' : new SpinBoxGroup([
			new SpinBox(12, 5, 20),
			new SpinBox(10, 3, 18),
			new SpinBox(10, 3, 18),
			new SpinBox(8, 1, 16),
			new SpinBox(10, 3, 18),
			new SpinBox(8, 1, 16),
		], 0, 74),
		'Drow' : new SpinBoxGroup([
			new SpinBox(10, 3, 18),
			new SpinBox(12, 5, 20),
			new SpinBox(8, 1, 16),
			new SpinBox(12, 5, 20),
			new SpinBox(10, 3, 18),
			new SpinBox(12, 5, 20),
		], 0, 80),
};

$(document).ready(function() {
	var html = '';
	$.each(races_spinboxes, function(race, spinbox_group) {
		html += '<div class="race_spinbox_group">'+race;
		html += '<div class="stat_spinbox"> Strength: ' + 		spinbox_group.spinboxes[0].getHTML() + '</div>';
		html += '<div class="stat_spinbox"> Dexterity: ' + 		spinbox_group.spinboxes[1].getHTML() + '</div>';
		html += '<div class="stat_spinbox"> Constitution: ' + 	spinbox_group.spinboxes[2].getHTML() + '</div>';
		html += '<div class="stat_spinbox"> Intelligence: ' + 	spinbox_group.spinboxes[3].getHTML() + '</div>';
		html += '<div class="stat_spinbox"> Wisdom: ' + 		spinbox_group.spinboxes[4].getHTML() + '</div>';
		html += '<div class="stat_spinbox"> Charisma: ' + 		spinbox_group.spinboxes[5].getHTML() + '</div>';
		html += '</div>';
	});
	$('.container').html(html);
});