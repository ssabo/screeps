// ###
// # Chain
// ###
// builder -> repairer -> upgrader
// wallreparier -> repairer -> upgrader
// harvester -> upgrader
// repairer -> upgrader
// upgrader

var conf = {
	harvester: {
		min: 4,
		desired: 6,
		max: 7,
	},
	upgrader: {
		min: 1,
		desired: 2,
		max: 4,
	},
	builder: {
		min: 1,
		desired: 3,
		max: 5,
	},
	repairer: {
		min: 3,
		desired: 4,
		max: 5,
	},
	wallrepairer: {
		min: 1,
		desired: 2,
		max: 3,
	}
};

Memory.stats.conf = conf;

module.exports = conf;
