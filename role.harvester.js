var libcreeps = require('lib.creeps');
var builder = require('role.upgrader');

module.exports = {
	run: function(creep){

		energyDepot = libcreeps.findClosestEnergyDepotNotFull(creep);

		if (!energyDepot){
			upgrader.run(creep);
			return;
		}

		if (! creep.memory.targetSource){
			creep.memory.targetSource = libcreeps.findRandomEnergySource(creep);
		}

		if (creep.carry.energy < creep.carryCapacity){
			var source = Game.getObjectById(creep.memory.targetSource);
			//var source = libcreeps.findClosestEnergySource(creep);

			libcreeps.harvest(creep, source);
		} else {
			libcreeps.transfer(creep, energyDepot);
		}
	}
}
