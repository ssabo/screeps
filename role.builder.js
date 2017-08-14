var libcreeps = require('lib.creeps');
var upgrader = require('role.upgrader');

module.exports = {
	run: function(creep){

		if (! creep.room.find(FIND_CONSTRUCTION_SITES).length){
			upgrader.run(creep);
			return;
		}

		if (creep.carry.energy == creep.carryCapacity){
			creep.memory.mode = 'transfer';
		} else if (creep.carry.energy == 0){
			creep.memory.mode = 'harvest';
		}

		if (creep.memory.mode == 'harvest'){
			var source = libcreeps.findClosestEnergySource(creep);
			libcreeps.harvest(creep, source);
		} else {
			target = libcreeps.findClosestConstructionSite(creep);
			libcreeps.build(creep, target)
		}
	}
}
