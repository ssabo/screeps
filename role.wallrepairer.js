var libcreeps = require('lib.creeps');
var repairer = require('role.repairer');

module.exports = {
	run: function(creep){

		structure = libcreeps.findRepairableWall(creep);
		if (! structure){
			repairer.run(creep);
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
			libcreeps.repair(creep, structure);
		}
	}
}
