
/**
 * Definição de model utilizado pela aplicação de gerenciamento
 * 
 * @param mongoose
 */
module.exports = function(mongoose) {

	var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;


	/**
	 * Schema para o ActuatorType. Ex: Motor, Iluminação, Porta, etc...
	 */
	var ActuatorTypeSchema = new Schema({
		identifier: { type: String },
		name: { type: String },
		type: { type: String },
		valueType: { type: String }
	});

	mongoose.model('ActuatorType', ActuatorTypeSchema);
	var ActuatorType = mongoose.model('ActuatorType');

	/**
	 * Schema para os Atuadores, que serão os caras que correspondem a uma
	 * tecnologia embarcada especifica e contém o formato de comandos para
	 * controla-lo corretamente.
	 */
	var ActuatorSchema = new Schema({
		name: { type: String },
		command: { type: String },
		value: { type: String },
		actuatorTypeId: { type: ObjectId }
	});
	mongoose.model('Actuator', ActuatorSchema);
	var Actuator = mongoose.model('Actuator');

	/**
	 * Localização cadastrada que identifica um endereço especifico. Esse
	 * model será usado para fazer buscas por raio de distancia.
	 */
	var LocalizationSchema = new Schema({
		latitude: { type: Number },
		longitude: { type: Number },
		address: { type: String },
		city: { type: String },
		country: { type: String },
		state: { type: String }
	});
	mongoose.model('Localization', LocalizationSchema);
	var Localization = mongoose.model('Localization');

	/**
	 * Corresponde a um controlador cadastrado que é idenficado pelo seu mac,
	 * o mac address também servirá como identificador unico para comunicação
	 * via socket.
	 */
	var ControllerSchema = new Schema({
		mac: { type: String, unique: true },
		rescueCode: { type: String },
		actuators: [{ actuatorId : { type: ObjectId }}]
	});
	mongoose.model('Controller', ControllerSchema);
	var Controller = mongoose.model('Controller');

	/**
	 * Define os campos que compoem o usuário e a quais controladores que ele
	 * terá acesso.
	 */ 
	var UserSchema = new Schema({
		name: { type: String },
		phone: { type: String },
		email: { type: String },
		username: { type: String },
		password: { type: String },
		controllers: [{ controllerId: { type: ObjectId }}]
	});
	mongoose.model('User', UserSchema);
	var User = mongoose.model('User');

	/**
	 * Usuário responsável por fazer o atendimento aos locais de perigo, o mesmo
	 * está associado a uma localização de atendimento e atende a um determinado
	 * raio de sinistros
	 */
	var SafeUserSchema = new Schema({
		name: { type: String },
		phone: { type: String },
		email: { type: String },
		username: { type: String },
		password: { type: String },
		rescueRange: { type: Number },
		enableRescue: { type: Boolean },
		rescueCode: { type: String },
		localizations: [{ localizationId: { type: ObjectId }}]
	});
	mongoose.model('SafeUser', SafeUserSchema);
	var SafeUser = mongoose.model('SafeUser', SafeUserSchema);


	/**
	 * Metodo fabrica de modelos
	 */
	var BeanFactory = function() {
		
		this.ActuatorType = ActuatorType;
		this.Actuator = Actuator;
		this.Localization = Localization;
		this.Controller = Controller;
		this.User = User;
		this.SafeUser = SafeUser;

	};

	BeanFactory.prototype.create = function(modelName, configs) {
		if(this[modelName]) {
			return new this[modelName](configs);
		} else {
			console.info('The entity: ' + modelName + ' no exist!');
		}
	}
	return new BeanFactory();

};