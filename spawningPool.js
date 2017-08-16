var conf = require('conf');
var libcreeps = require('lib.creeps');

const CREEP_BASE_SIZE = 300;

var spawnCreep = function(role, spawn){

	bodySize = Math.floor(spawn.room.energyAvailable / CREEP_BASE_SIZE);

	body = [];
	for ( i = 0; i < bodySize; i++){
		body.push(WORK);
		body.push(WORK);
		body.push(CARRY);
		body.push(MOVE);
		//body.push(MOVE);
	}

	new_creep = spawn.createCreep(body, undefined, {role: role});
	console.log("Spawning: " + new_creep + " Role: " + role + " Size: " + bodySize + " NumParts: " + (body.length));
}

module.exports = {
	run: function (spawn) {

		roles = ['harvester', 'repairer', 'builder', 'upgrader', 'wallrepairer'];
		// for (let role of roles){
		// 	console.log(role + ": " + libcreeps.countByRole(role));
		// }

		// If the room doesn't have enough energy to spawn a single size creep, then move on
		if (spawn.room.energyAvailable < CREEP_BASE_SIZE ){
			return;
		}

		// Spawn single size creeps since we fell below the min count for this role.
		for (let i in roles){
			role = roles[i];


			count = libcreeps.countByRole(role);

			if (count < conf[role].min){
				spawnCreep(role, spawn);
				console.log("Min Spawn " + role);
				return;
			}
		}

		// If the room is at enough energy for double sized creeps and we have met the conditions
		// for the minimum number of creeps, spawn double sized creeps
		if (spawn.room.energyAvailable < (CREEP_BASE_SIZE * 2)){
			return;
		}


		// Since we have the min number of workers in all roles, start going towards the desired count
		// but with double size creeps
		for (let i in roles){
			role = roles[i];

			count = libcreeps.countByRole(role);

			if (count < conf[role].desired){
				spawnCreep(role, spawn);
				console.log("Desired Spawn " + role);
				return;
			}
		}


		// If the room is at max energy and the previous conditions are met, spawn max size creeps
		// if (spawn.room.energyAvailable != spawn.room.energyCapacityAvailable){
		if (spawn.room.energyAvailable < (CREEP_BASE_SIZE * 3)) {
			return;
		}

		// Spawn max size creeps up to the max limit for each role.
		for (let i in roles){
			role = roles[i];

			count = libcreeps.countByRole(role);

			if (count < conf[role].max){
				spawnCreep(role, spawn);
				console.log("Max Spawn " + role);
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
