var libcreeps = require('lib.creeps');
//var builder = require('role.builder');
var upgrader = require('role.upgrader');

module.exports = {
	run: function(creep){

		structure = libcreeps.findClosestRepairableStructureNotWall(creep);
		if (! structure){
			//builder.run(creep);
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
			libcreeps.repair(creep, structure);
		}
	}
}
