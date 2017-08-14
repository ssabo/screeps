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

		// If the spawn isn't at max energy, just do nothing
		if (spawn.energy != spawn.energyCapacity){
			return;
		}

		roles = ['harvester', 'repairer', 'builder', 'upgrader'];


		// First check if any roles have less than min workers
		for (let i in roles){
			role = roles[i];

			count = libcreeps.countByRole(role);

			if (count < conf[role].min){
				spawnCreep(role, spawn);
				return;
			}
		}

		// Since we have the min number of workers in all roles, start going towards the target
		for (let i in roles){
			role = roles[i];

			count = libcreeps.countByRole(role);

			if (count < conf[role].desired){
				spawnCreep(role, spawn);
				return;
			}
		}

		// Log if we have too many workers in a given role.
		for (let i in roles){
			role = roles[i];

			count = libcreeps.countByRole(role);

			if (count > conf[role].max){
				console.log("Too many creeps in role " + role);
				continue;
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
