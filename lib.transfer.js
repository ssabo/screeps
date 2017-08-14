var styles = require('lib.style');
var path_style = styles['path'];

module.exports = {
	run: function(creep, target){
		switch (creep.transfer(target, RESOURCE_ENERGY)){
			case ERR_NOT_IN_RANGE:
				creep.moveTo(target, path_style);
				break;
			case ERR_FULL:
				creep.say('Spawn Full!');
				break;
			default:
				//creep.say('Transfer');
				break;
		}
	}
}
