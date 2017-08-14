var spawningPool = require('spawningPool');

var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');

var screepsplus = require('screepsplus');



module.exports.loop = function () {

	var spawn = Game.spawns.Spawn1;
	spawningPool.run(spawn);
	spawningPool.reaper();

	for (let name in Game.creeps){
		creep = Game.creeps[name];

		switch (creep.memory.role){
			case 'harvester':
				harvester.run(creep, spawn);
				break;
			case 'upgrader':
				upgrader.run(creep);
				break;
			case 'builder':
				//harvester.run(creep, spawn);
				builder.run(creep);
				break;
			default:
				creep.say('No role!', false);
		}
	}

	screepsplus.collect_stats();
}
