const express = require('express');
const cors = require('cors');

const {Sequelize} = require ('./models')

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.Itempedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.get('/', function (req, res) {
    res.send('Hello, World!')
});

app.post('/servicos', async (req, res) => {
    await servico.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar"
        })
    });
});

app.post('/clientes', async (req, res) => {
    await cliente.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Cliente cadastrado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar"
        })
    });
});

app.post('/pedidos', async (req, res) => {
    await pedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Pedido cadastrado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

app.post('/itenspedido', async (req, res) => {
    await itempedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Item Pedido cadastrado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

//  app.get('/itempedidos', async(req,res) => {
//      await itempedido.create({
//      PedidoId: 1,
//      ServicoId: 1,
//      quantidade: 1,
//      valor: 350.40,
//      createAt: new Date(),
//      updateAt: new Date()
//      });
//      res.send('Item Pedido inserido com sucesso');
//  });

// app.get('/servico', function(req,res){
//     res.send('Sejam bem-vindo(a), serviços')
// });

// app.get('/pedidos', function(req,res){
//     res.send('Sejam bem-vindo(a) a pedidos')
// });

//Consultas

// app.get('/listaservicos', async(req,res)=>{
//     await servico.findAll({
//         raw: true
//     }).then(function(servicos){
//         res.json({servicos})
//     });
// });

//listar serviços ordenados DEC ou ASC
app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

//qtde de seviços
app.get('/ofertaservicos', async (req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/servico/:id', async(req,res)=>{
    await servico.findByPk(req.params.id)
    .then(serv =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json(
            {
            error: true,
            message: "Erro: código não encontrado!"
        });
    })
})

//listarClientes
app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll({
        raw:true
    }).then(function(clientes){
        res.json({clientes})
    })
})

//Update
app.put('/atualizaservico', async(req,res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id, {include:[{all:true}]})
    .then(ped=>{
        return res.json({ped});
    })
})

app.put('/pedidos/:id/editaritem', async (req,res)=>{
    const item={
        quantidade:req.body.quantidade,
        valor: req.body.valor
    };
    if (!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        })
    };
    if (!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        })
    }

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Pedido foi alterado com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro: não foi possível alterar."
        });
    });
});

//Rota para fazer uma exclusão interna
app.get('/excluirCliente/:id', async (req,res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluido com sucesso!"
        })
    }).catch(function(erro){
        return res.json({
            error:true,
            message: "Erro ao excluir o cliente."
        })
    })
});

let port = process.env.PORT || 3001; //a definição da porta é feita pelo servidor

app.listen(port, (req, res) => {
    console.log('Servidor ativo: http://localhost:3001');
});