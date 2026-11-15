// let file = 'The Script';
// file += ', is this thing. What thing? No idea.'

//console.log(file);

// ### Time to finally get leet. ###
let name;
let coolName;
let coolThing;

name = [ 'Shiba', 'Kuzuryu' ]
coolName = [ 'InuMaki', 'Nonagron' ]
coolThing = [ 'DawgBall', 'NineNoodle' ]

// It's absolutely is useless but hey, who cares.
const baller = {
	get name() {
		return name[Math.floor(Math.random() * name.length)];
	},
	get coolName() {
		return coolName[Math.floor(Math.random() * coolName.length)];
	},
	get coolThing() {
		return coolThing[Math.floor(Math.random() * coolThing.length)];
	}
};

const corn = { name: baller.name, cool: baller.coolName, thing: baller.coolThing };

function pachinko() {
	console.log(baller);
};
