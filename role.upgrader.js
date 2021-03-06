var style = require('lib.style');
var libcreeps = require('lib.creeps');


module.exports = {
	run: function(creep){
		transferTarget = creep.room.controller;

		if (creep.carry.energy == creep.carryCapacity){
			creep.memory.mode = 'transfer';
		}else if (creep.carry.energy == 0 ){
			creep.memory.mode = 'harvest';
		}


		if (creep.memory.mode == 'harvest'){
			var source = libcreeps.findClosestEnergySource(creep);

			//creep.say('Harvest', false);

			libcreeps.harvest(creep, source);
		} else {
			libcreeps.transfer(creep, transferTarget);
		}
	}
}
