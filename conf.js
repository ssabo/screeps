// ###
// # Chain
// ###
// builder -> upgrader
// harvester -> upgrader
// repairer -> builder -> upgrader
// wallreparier -> repairer -> builder -> upgrader
// upgrader
//
// ###
// # Tree
// ###
// upgrader
// |- builder
// |  |- repairer
// |     |- wallrepairer
// |- harvester

var conf = {
	harvester: {
		min: 4,
		desired: 7,
		max: 10,
	},
	upgrader: {
		min: 3,
		desired: 5,
		max: 10,
	},
	builder: {
		min: 3,
		desired: 5,
		max: 10,
	},
	repairer: {
		min: 2,
		desired: 4,
		max: 10,
	},
	wallrepairer: {
		min: 1,
		desired: 3,
		max: 10,
	}
};

Memory.stats.conf = conf;

module.exports = conf;
