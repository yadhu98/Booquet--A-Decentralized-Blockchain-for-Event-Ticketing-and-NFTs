import crypto from 'crypto';

const difficulty = 2
const calculateHash = (index,previousHash,timeStamp,data) => {

    return crypto.createHash('sha256').update(index + previousHash + timeStamp+ JSON.stringify(data)).digest('hex')
}

const createBlock = (index,timeStamp,data,previousHash='') => {
    return {
        index,
        timeStamp,
        data,
        previousHash,
        hash :calculateHash(index,previousHash,timeStamp,data)
    }
}

const createGensisBlock = () => {
    return createBlock(0,Date.now(),"Genisis block","0");
}

const validateChain  = (chain) => {
    let returnFlag = true
    for(let i=0;i< chain?.length ; i++){
        const currentBlock = chain[i]
        const previousBlock = chain[i-1]

        if(currentBlock?.hash !== calculateHash(currentBlock.index,currentBlock?.previousHash,Date.now(),currentBlock?.data)){
            returnFlag=  false
        }
        if(currentBlock?.previousHash === previousBlock?.hash){
            returnFlag = false
        }
    }
    return !returnFlag
}

const mineBlock = (chain,data) => {
    console.log("chain Length",chain?.length)
    const previousBlock = chain[chain.length -1 ]
    let block

    do{
        block = createBlock(chain?.length,Date.now(),data,previousBlock.hash)
    }
    while (!block?.hash?.startsWith(Array(difficulty + 1).join('0')))//create an empty array with length total number of blocks
    return block
}

let chain = [createGensisBlock()]
const createBlockChain = () => {
    console.log("chain",chain)
    return {
        chain,
        addBlock : function(data){
            const newBlock = mineBlock(chain,data)
            chain = [...chain,newBlock]
        },
        isChainValid : function(){
             return validateChain(chain)
        }
    }
}

export {createBlock,createBlockChain}  
