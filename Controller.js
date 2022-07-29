const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', function(req,res){
    res.send('Hello, World!')
});

app.get('/clientes', function(req,res){
    res.send('Sejam bem-vindo(a) a JmMends')
});

let port = process.env.PORT || 3001; //a definição da porta é definida pelo servidor

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});