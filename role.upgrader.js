var transfer = require('lib.transfer');
var styles = require('lib.style');
var libcreeps = require('lib.creeps');
var path_style = styles['path'];


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

			if (creep.harvest(source) == ERR_NOT_IN_RANGE){
				creep.moveTo(source, path_style);
			}
		} else {
			transfer.run(creep, transferTarget);
		}
	}
}
