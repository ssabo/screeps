module.exports = {
	countByRole: function(role){

		count = 0;

		for (var name in Game.creeps){
			if (Game.creeps[name].memory.role == role){
				count += 1;
			}
		}

		return count;
	},
	findClosestEnergySource: function(creep){
		var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
		return source;
	},
	findRandomEnergySource: function(creep){
		sources = creep.room.find(FIND_SOURCES_ACTIVE);
		num_sources = sources.length;

		target_index = Math.floor(Math.random() * num_sources);

		return sources[target_index];
	}
}
