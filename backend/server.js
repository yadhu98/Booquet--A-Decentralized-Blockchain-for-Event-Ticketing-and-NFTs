
import express from 'express'
import bodyParser from 'body-parser'
import {createBlockChain} from './blockchain.js'

const port = 5000 

const app = express()
createBlockChain()
app.use(bodyParser.json())

app.get('/block',(req,res) => {
    console.log("chain",chain)
    res.json({
        "chain-data" : chain
    })
})

app.post('/create-block',(req,res)=>{
    const data = req.body.data
    console.log("data",data)
    // createBlock(chain[chain.length+1],Date.now(),"Hello Second Node",chain[chain.length].)
    createBlockChain().addBlock(data)
    res.json({
        "chain-data" : createBlockChain().chain
    })
})

app.get('/validate-chain',(req,res)=>{
    const isValid = createBlockChain().isChainValid()
    console.log("isValid",isValid)
    res.json({
            "chain-validity" : isValid
        })
    }
)

// console.log("blockchain",blockChain)

app.listen(port,() => 
console.log("Running"))