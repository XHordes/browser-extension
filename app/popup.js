let mod_list = $('#modlist');
let mod_temp = `<div class="float-center"><div class="btn-toolbar" role="toolbar"><div class="btn-group btn-group-sm" role="group"><button type="button" class="btn btn-info"><span class="d-inline-block text-truncate mnspan">%n</span></button><button type="button" class="%c %i">%e</button></div></div></div>`;

function addMod(name, enabled = false) {
	$(mod_temp.replace('%n', name).replace('%e', (enabled) ? 'Enabled' : 'Disabled').replace('%c', 'btn btn-' + ((enabled) ? 'success' : 'danger')).replace('%i', 'm' + ((enabled) ? 'enabled' : 'disabled'))).appendTo(mod_list);
	console.log(mod_list);
}

for (let i = 0; i < 6; i++) {
	addMod("Example Mod " + (i + 1), i <= 2 ? true : false);
}

addMod("Truncated Text: Foo bar foo bar foo bar foo bar.", true);
