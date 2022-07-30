const express = require('express');
const cors = require('cors');

const models=require('./models');

const app = express();
app.use(cors());

let cliente=models.Cliente;
let itempedido = models.itempedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.get('/', function(req,res){
    res.send('Hello, World!')
});

app.get('/servicos', async(req,res) => {
    await servico.create({
        nome: "Nodejs",
        descricao: "Desenvolvimento de aplicação back-end",
        createAt: new Date(),
        updateAt: new Date()
    });
    res.send("Serviço criado com sucesso!");
})

app.get('/clientes', async(req,res) => {
    await cliente.create({
    nome: "João Silva",
    endereco: "Rua das Couves, 17",
    cidade: "Maringá",
    uf: "PR",
    nascimento: "2000-07-31",
    clienteDesde: "2000-02-20",
    createAt: new Date(),
    updateAt: new Date()
    });
    res.send('Cliente inserido com sucesso')
});

app.get('/pedidos', async(req,res) => {
    await pedido.create({
    data: "2022-02-20", //data não deu certo;
    ClienteId: 1,
    createAt: new Date(),
    updateAt: new Date()
    });
    res.send('Pedido inserido com sucesso');
});

// app.get('/itempedidos', async(req,res) => {
//     await itempedido.create({
//     ServicoId: 1,
//     quantidade: 1,
//     valor: 350.40,
//     createAt: new Date(),
//     updateAt: new Date()
//     });
//     res.send('Item Pedido inserido com sucesso');
// });

// app.get('/servico', function(req,res){
//     res.send('Sejam bem-vindo(a), serviços')
// });

// app.get('/pedidos', function(req,res){
//     res.send('Sejam bem-vindo(a) a pedidos')
// });

let port = process.env.PORT || 3001; //a definição da porta é definida pelo servidor

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});