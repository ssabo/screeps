var libcreeps = require('lib.creeps');
var builder = require('role.builder');

module.exports = {
	run: function(creep, transferTarget){

		if (transferTarget.energy == transferTarget.energyCapacity){
			builder.run(creep);
			return;
		}

		if (! creep.memory.targetSource){
			creep.memory.targetSource = libcreeps.findRandomEnergySource(creep);
		}

		if (creep.carry.energy < creep.carryCapacity){
			//var source = Game.getObjectById(creep.memory.targetSource);
			var source = libcreeps.findClosestEnergySource(creep);

			libcreeps.harvest(creep, source);
		} else {
			libcreeps.transfer(creep, transferTarget);
		}
	}
}
