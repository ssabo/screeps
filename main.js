var spawningPool = require('spawningPool');
var reaper = require('reaper');


var harvester = require('role.harvester');
var upgrader = require('role.upgrader');



module.exports.loop = function () {

	var spawn = Game.spawns.Spawn1;
	spawningPool.run(spawn);
	reaper.run();

	for (let name in Game.creeps){
		creep = Game.creeps[name];

		switch (creep.memory.role){
			case 'harvester':
				harvester.run(creep, spawn);
				break;
			case 'upgrader':
				upgrader.run(creep);
				break;
			default:
				creep.say('No role assigned', false);
		}
	}
}
