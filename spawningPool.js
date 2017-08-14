var conf = require('conf');
var libcreeps = require('lib.creeps');

var spawnCreep = function(role, spawn){
	new_creep = spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: role});
	console.log("Spawning: " + new_creep + " Role: " + role);
}

module.exports = {
	run: function (spawn) {

		// console.log("Harvesters: " + libcreeps.countByRole('harvester'));
		// console.log("Builders: " + libcreeps.countByRole('builder'));
		// console.log("Upgraders: " + libcreeps.countByRole('upgrader'));

		if (spawn.energy != spawn.energyCapacity){
			return;
		}

		roles = ['harvester', 'builder', 'upgrader'];
		for (let i in roles){
			role = roles[i];
			console.log(role);

			count = libcreeps.countByRole(role);
			if(count > conf[role].max){
				console.log("Too many creeps in role " + role);
				continue;
			} else if (count < conf[role].min){
				spawnCreep(role, spawn);
				return;
			} else if (count < conf[role].desired){
				spawnCreep(role, spawn);
				return;
			}
		}
	},

	reaper: function(){
		for (let name in Memory.creeps){
			if (Game.creeps[name] == undefined){
				delete Memory.creeps[name];
			}
		}
	},
}
