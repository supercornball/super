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
		const x = name;
		return x[Math.floor(Math.random() * x.length)];
	},
	get coolName() {
		const x = coolName;
		return x[Math.floor(Math.random() * x.length)];
	},
	get coolThing() {
		const x = coolThing;
		return x[Math.floor(Math.random() * x.length)];
	}
};

const corn = { name: baller.name, cool: baller.coolName, thing: baller.coolThing };

function pachinko() {
	console.log(`[===*=*=*=[ PACHINKO ]=*=*=*===]\nName: ${baller.name},\nCool Name: ${baller.coolName},\nCool Thing: ${baller.coolThing}.\n=====*===*===*===*===*===*=====`);
};

pachinko()
