var libcreeps = require('lib.creeps');
var upgrader = require('role.upgrader');

module.exports = {
	run: function(creep){

		if (creep.carry.energy == creep.carryCapacity){
			creep.memory.mode = 'transfer';
		} else if (creep.carry.energy == 0){
			creep.memory.mode = 'harvest';
		}

		if (creep.memory.mode == 'harvest'){
			if (! creep.memory.targetSource){
				creep.memory.targetSource = libcreeps.findRandomEnergySource(creep);
			}

			var source = Game.getObjectById(creep.memory.targetSource);
			//var source = libcreeps.findClosestEnergySource(creep);

			libcreeps.harvest(creep, source);
		} else {

			var tower = undefined;

			if (creep.room.energyAvailable > 300){
				tower = libcreeps.findClosestTowerNotFull(creep);
			}

			if (tower){
				energyDepot = tower;
			} else{
				energyDepot = libcreeps.findClosestEnergyDepotNotFull(creep);
			}

			if (!energyDepot){
				upgrader.run(creep);
				return;
			}

			libcreeps.transfer(creep, energyDepot);
		}
	}
}
