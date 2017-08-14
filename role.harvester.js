var transfer = require('lib.transfer');
var styles = require('lib.style');
var libcreeps = require('lib.creeps');
var path_style = styles['path'];


module.exports = {
	run: function(creep, transferTarget){

		if (! creep.memory.targetSource){
			creep.memory.targetSource = libcreeps.findRandomEnergySource(creep);
		}

		if (creep.carry.energy < creep.carryCapacity){
			//var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
			var source = Game.getObjectById(creep.memory.targetSource);

			//creep.say('Harvest', false);

			if (creep.harvest(source) == ERR_NOT_IN_RANGE){
				creep.moveTo(source, path_style);
			}
		} else {
			transfer.run(creep, transferTarget);
		}
	}
}
