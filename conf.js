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
		max: 10,
	},
	upgrader: {
		min: 1,
		desired: 2,
		max: 10,
	},
	builder: {
		min: 1,
		desired: 3,
		max: 10,
	},
	repairer: {
		min: 3,
		desired: 4,
		max: 10,
	},
	wallrepairer: {
		min: 1,
		desired: 2,
		max: 5,
	}
};

Memory.stats.conf = conf;

module.exports = conf;
