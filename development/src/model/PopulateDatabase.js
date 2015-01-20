
var PopulateDatabase = function(model) {
	this.model = model;
};

PopulateDatabase.prototype.logSuccess = function(entity) {
	return function(err) {
		if(err) {
			console.info(err);
		} else {
			console.info('Create with success: ' + entity);
		}
	};
}

PopulateDatabase.prototype.start = function() {
	
	var Model = this.model;

	//INICALIZA ActuatorType
	var ActuatorMotorCC = Model.create('ActuatorType', {
		identifier: 'MotorCC',
		name: 'MotorCC',
		type: 'Motor'
	});
	ActuatorMotorCC.save(this.logSuccess('ActuatorMotorCC'));

	var ActuatorMotorStep = Model.create('ActuatorType', {
		identifier: 'MotorStep',
		name: 'Step Motor',
		type: 'Motor',
		valueType: 'Number'
	});
	ActuatorMotorStep.save(this.logSuccess('ActuatorMotorStep'));

	var ActuatorMotorServo = Model.create('ActuatorType', {
		identifier: 'ActuatorMotor',
		name: 'Actuator Motor',
		type: 'Motor',
	});
	ActuatorMotorServo.save(this.logSuccess('ActuatorMotorServo'));

	var ActuatorLightSample = Model.create('ActuatorType', {
		identifier: 'LightSample',
		identifier: 'Light Sample',
		type: 'Light',
		valueType: 'Boolean'
	});
	ActuatorLightSample.save(this.logSuccess('ActuatorLightSample'));

	//INICIALIZA Actuator
	var Motor5VPWM = Model.create('Actuator', {
		name: 'Motor5VPWM',
		command: '{ direction : 0, power: 0 }',
		value: '{ power: 0 }',
		actuatorTypeId: ActuatorMotorCC._id
	});
	Motor5VPWM.save(this.logSuccess('Motor5VPWM'));

	var ActuatorServoMG995 = Model.create('Actuator', {
		name: 'ActuatorServoMG995',
		command: '{ angle: 0 }',
		value: '{ angle: 0 }',
		actuatorTypeId: ActuatorMotorServo._id
	});
	ActuatorServoMG995.save(this.logSuccess('ActuatorServoMG995'));

	var LightSample220V = Model.create('Actuator', {
		name: 'LightSample220V',
		command: '{ status: true }',
		value: '{ status : true }',
		actuatorTypeId: ActuatorLightSample._id
	});
	LightSample220V.save(this.logSuccess('LightSample220V'));

	//INICIALIZA Localization
	var LocalizationMassaranduba = Model.create('Localization', {
		latitude: -49.65589,
		longitude: -26.55466,
		address: 'Rua Fundos Butuca',
		city: 'Massaranduba',
		state: 'SC',
		country: 'Brasil'
	});
	LocalizationMassaranduba.save(this.logSuccess('LocalizationMassaranduba'));

	var LocalizationJaraguaDoSul = Model.create('Localization', {
		latitude: -49.95589,
		longitude: -26.65466,
		address: 'Rua Waldemar Grubba',
		city: 'Jaraguá do Sul',
		state: 'SC',
		country: 'Brasil'
	});
	LocalizationJaraguaDoSul.save(this.logSuccess('LocalizationJaraguaDoSul'));

	//INICIALIZA SafeUser
	var SafeUserPolice = Model.create('SafeUser', {
		name: 'Ned Flanders',
		phone: '47 99889966',
		email: 'ned@simpsons.com',
		username: 'ned',
		password: 'flandersned',
		rescueRange: 5,
		enableRescue: true,
		rescueCode: 11223344,
		localizations: [
			{ localizationId: LocalizationMassaranduba._id},
			{ localizationId: LocalizationJaraguaDoSul._id}
		]
	});
	SafeUserPolice.save(this.logSuccess('SafeUserPolice'));


	//INCIIALIZA Controllers
	var ControllerHomerHouse = Model.create('Controller', {
		mac: '123456789',
		rescueCode: '123456789',
		actuators: [
			{ actuatorId : Motor5VPWM._id },
			{ actuatorId : ActuatorServoMG995._id }
		]
	});
	ControllerHomerHouse.save(this.logSuccess('ControllerHomerHouse'));

	var ControllerHomerJob = Model.create('Controller', {
		mac: '987654321',
		rescueCode: '987654321',
		actuators: [
			{ actuatorId : LightSample220V._id }
		]
	});
	ControllerHomerJob.save(this.logSuccess('ControllerHomerJob'));

	//INICIALIZA User
	var UserHomer = Model.create('User', {
		name: 'Homer Simpsons',
		phone: '47 88997799',
		email: 'homer@simpsons.com',
		username: 'homer',
		password: 'beer',
		controllers: [
			{ controllerId: ControllerHomerHouse._id },
			{ controllerId: ControllerHomerJob._id }
		]
	});
	UserHomer.save(this.logSuccess('UserHomer'));

};

module.exports = PopulateDatabase;