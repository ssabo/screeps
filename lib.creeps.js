var style = require('lib.style');

var countByRole = function(role){
	return _.sum(Game.creeps, (c) => c.memory.role == role);
}

var findClosestEnergySource = function(creep){
	var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
	return source;
}

var findRandomEnergySource = function(creep){
	sources = creep.room.find(FIND_SOURCES_ACTIVE);
	num_sources = sources.length;

	target_index = Math.floor(Math.random() * num_sources);

	return sources[target_index].id;
}

var findClosestConstructionSite = function(creep){
	return target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
}

var findClosestRepairableStructure = function(creep){
	var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,{
		filter: (s) => s.hits < s.hitsMax
	})

	return structure;
}

var findClosestRepairableStructureNotWall = function(creep){
	var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: (s) => s.hits < s.hitsMax &&
			(s.structureType != STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
	});
	return structure;
}

var findRepairableWall = function(creep){
	walls = creep.room.find(FIND_STRUCTURES, {
		filter: (s) => s.structureType == STRUCTURE_WALL && s.hits < Math.floor(s.hitsMax / 50000)
	});

	if (walls.length == 0){
		walls = creep.room.find(FIND_STRUCTURES, {
			filter: (s) => s.structureType == STRUCTURE_WALL && s.hits < Math.floor(s.hitsMax / 25000)
		})
	}

	if (walls.length == 0){
		walls = creep.room.find(FIND_STRUCTURES, {
			filter: (s) => s.structureType == STRUCTURE_WALL && s.hits < Math.floor(s.hitsMax / 15000)
		})
	}

	return walls[0];
}

var findClosestEnergyDepotNotFull = function(creep){
	structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
	 	filter: (s) => s.energy < s.energyCapacity
	});

	return structure;
}

var findClosestTowerNotFull = function(creep){
	tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
		filter: (t) => t.structureType == STRUCTURE_TOWER && t.energy < t.energyCapacity
	});

	return tower;
}

var harvest = function(creep, target){
	if (creep.harvest(target) == ERR_NOT_IN_RANGE){
		creep.moveTo(target, style.path);
	}
}

var build = function(creep, target){
	switch (creep.build(target)){
		case ERR_NOT_IN_RANGE:
			creep.moveTo(target, style.path);
			break;
		default:
			break;
	}
}

var repair = function(creep, structure){
	switch (creep.repair(structure)){
		case ERR_NOT_IN_RANGE:
			creep.moveTo(structure, style.path);
			break;
		default:
			break;
	}
}

var transfer = function(creep, target){

	switch (creep.transfer(target, RESOURCE_ENERGY)){
		case ERR_NOT_IN_RANGE:
			creep.moveTo(target, style.path);
			break;
		case ERR_FULL:
			creep.say('Target Full!');
			break;
		case OK:
				//recordEnergyEfficiency(creep);
				break;
		default:
			//creep.say('Transfer');
			break;
	}
}

var recordEnergyEfficiency = function(creep){
	console.log(creep.name + " recording efficiency");
	// If the creep hasn't finished a full transfer, don't record
	if (creep.carry.energy != 0){
		return;
	}

	console.log(creep.name + " actually recoding efficiency");

	// If this is the first complete transfer, initialize it
	if (!creep.memory.energyTransported){
		creep.memory.energyTransported = 0;
	}

	var lifeTime = 1500 - creep.ticksToLive;

	// This assumes a creep will never go into transfer mode after gathering
	// less than maximum energy
	creep.memory.energyTransported += creep.carryCapacity;

	console.log(creep.memory.energyTransported);

}

module.exports = {
	countByRole: countByRole,
	findClosestEnergySource: findClosestEnergySource,
	findRandomEnergySource: findRandomEnergySource,
	findClosestConstructionSite: findClosestConstructionSite,
	findClosestRepairableStructure: findClosestRepairableStructure,
	findClosestRepairableStructureNotWall: findClosestRepairableStructureNotWall,
	findClosestEnergyDepotNotFull: findClosestEnergyDepotNotFull,
	findClosestTowerNotFull: findClosestTowerNotFull,
	findRepairableWall: findRepairableWall,
	build: build,
	harvest: harvest,
	repair: repair,
	transfer: transfer,
}
