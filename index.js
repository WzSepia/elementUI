// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//连接
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log("连接成功！");
});
//构建大纲
var kittySchema = mongoose.Schema({
	name: String
});
// 译者注：注意了， method 是给 document 用的
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function() {
	var greeting = this.name ?
		"Meow name is " + this.name :
		"I don't have a name";
	console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
var fluffy = new Kitten({
	name: 'fluffy'
});

fluffy.save(function(err, fluffy) {
	if (err) return console.error(err);
	fluffy.speak();
});
