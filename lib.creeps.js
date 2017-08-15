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
	var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
		filter: (s) => s.hits < s.hitsMax &&
			(s.structureType != STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
	})
}

var findRepairableWall = function(creep){
	walls = creep.room.find(FIND_STRUCTURES, {
		filter: (s) => s.structureType == STRUCTURE_WALL && s.hits < Math.floor(s.hitsMax / 50000)
	});

	return walls[0];
}

var findClosestEnergyDepotNotFull = function(creep){
	structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
	 	filter: (s) => s.energy < s.energyCapacity
	});

	return structure;
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
		default:
			//creep.say('Transfer');
			break;
	}
}

module.exports = {
	countByRole: countByRole,
	findClosestEnergySource: findClosestEnergySource,
	findRandomEnergySource: findRandomEnergySource,
	findClosestConstructionSite: findClosestConstructionSite,
	findClosestRepairableStructure: findClosestRepairableStructure,
	findClosestRepairableStructureNotWall: findClosestRepairableStructureNotWall,
	findClosestEnergyDepotNotFull: findClosestEnergyDepotNotFull,
	findRepairableWall: findRepairableWall,
	build: build,
	harvest: harvest,
	repair: repair,
	transfer: transfer,
}
