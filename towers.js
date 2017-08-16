module.exports = {
	run: function(room){
			var towers = room.find(FIND_STRUCTURES, {
				filter: (s) => s.structureType == STRUCTURE_TOWER
			});
			for (let tower of towers){
				var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
				if (target){
					tower.attack(target);
				}
			}
	}
}
