var style = require('lib.style');

var countByRole = function(role){
	count = 0;
	for (var name in Game.creeps){
		if (Game.creeps[name].memory.role == role){
			count += 1;
		}
	}
	return count;
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
	build: build,
	harvest: harvest,
	transfer: transfer,
}
