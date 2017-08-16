var spawningPool = require('spawningPool');

var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var repairer = require('role.repairer');
var wallrepairer = require('role.wallrepairer');


var towers = require('towers');

var screepsplus = require('screepsplus');


module.exports.loop = function () {

	var spawn = Game.spawns.Spawn1;
	spawningPool.run(spawn);
	spawningPool.reaper();

	towers.run(spawn.room);

	for (let name in Game.creeps){
		creep = Game.creeps[name];

		//creep.say(creep.memory.role);

		switch (creep.memory.role){
			case 'harvester':
				//creep.say(creep.memory.role);
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
			case 'wallrepairer':
				wallrepairer.run(creep);
				break;
			default:
				creep.say('No role!', false);
		}
	}

	screepsplus.collect_stats();
}
