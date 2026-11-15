// let file = 'The Script';
// file += ', is this thing. What thing? No idea.'

//console.log(file);

// ### Time to finally get leet. ###
let name;
let coolName;
let coolThing;

name = 'Shiba'
coolName = 'InuMaki'
coolThing = 'DawgBall'

// It's absolutely is useless but hey, who cares.
const baller = {
	get name() {
		return name;
	},
	get coolName() {
		return coolName;
	},
	get coolThing() {
		return coolThing;
	}
};

const corn = { name: baller.name, cool: baller.coolName, thing: baller.coolThing };

// console.log(corn);
