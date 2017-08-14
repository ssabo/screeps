var spawningPool = require('spawningPool');

var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var repairer = require('role.repairer');

var screepsplus = require('screepsplus');


module.exports.loop = function () {

	var spawn = Game.spawns.Spawn1;
	spawningPool.run(spawn);
	spawningPool.reaper();

	for (let name in Game.creeps){
		creep = Game.creeps[name];

		switch (creep.memory.role){
			case 'harvester':
				harvester.run(creep);
				break;
			case 'upgrader':
				upgrader.run(creep);
				break;
			case 'builder':
				builder.run(creep);
				break;
			case 'repairer':
				repairer.run(creep);
				break;
			default:
				creep.say('No role!', false);
		}
	}

	screepsplus.collect_stats();
}
