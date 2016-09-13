var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Contato = require('./app/models/contatos')

//Conexão com mongoDB
mongoose.connect('mongodb://localhost:27017/waibapi', function(err){
	if(err){
		console.log('Erro ao conectar no mongodb:' + err)
	}
});


app.use(bodyParser());

var port = process.env.PORT || 8080

//rotas da API
var router = express.Router();

router.get('/',function(req,res){
	res.json({message: 'Waib API'});
});

////Especificando rotas
router.route('/contatos')
	//listando todos os contatos
	.get(function(req,res){
		//res.json({message: 'Contatos - GET'});
		Contato.find(function(err,data){
				if(err){
					console.log(err);
				}else{
					res.json(data);
				}
			});
	})
	//inserindo novo contato
	.post(function(req,res){
		var model = new Contato();
		model.nome = req.body.nome;

		model.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: 'Contato cadastrado com sucesso'});
		})
			
	});

router.route('/contatos_por_nome/:nome')
	//lista por nome
	.get(function(req,res){
		Contato.findOne({nome: req.params.nome}, function(err,row){
			if(err){
				res.send(err)
			} 
			res.json(row)
		})
	})
	//atualiza contato por nome
	.put(function(req,res){
		Contato.findOne({nome: req.params.nome}, function(err,row){
			if(err){
				res.send(err);
			}

			row.nome = req.body.nome;
			row.save(function(err){
				if(err){
					res.send(err);
				}
				res.json({message: 'Contato atualizado com sucesso!'});
			}) 
		})
	})
	//deleta contato por nome
	.delete(function(req,res){
		Contato.remove({_id: req.params.id}, function(err,row){
			if(err){
				res.send(err)
			}
			res.json({message: 'Contato excluido com sucesso'});
		})
	});

router.route('/contatos_por_id/:id')
	.get(function(req,res){
		Contato.findById(req.params.id, function(err,row){
			if(err){
				res.send(err)
			} 
			res.json(row)
		})
	})
	.put(function(req,res){
			Contato.findById(req.params.id,function(err, row){
				if(err){
					res.send(err);
				}

				row.nome = req.body.nome;
				row.save(function(err){
					if(err){
						res.send(err);
					}
					res.json({message: "Contato atualizado com sucesso!"});
				}) 
			})
		})
	.delete(function(req,res){
		Contato.remove({_id: req.params.id}, function(err,row){
			if(err){
				res.send(err)
			}
			res.json({message: 'Contato excluido com sucesso'});
		})
	});	

//Mandar devolver nome do Header
/*	.post(function(req,res){
		var value = req.body.nome;
		res.json({message: value});	
	});
*/

//resgitro de rotas

app.use('/api',router);

//iniciando servidor
//////////////////////////////////////////////////////
app.listen(port,function(){
	console.log('Servidor rodando na Porta' + port);
})