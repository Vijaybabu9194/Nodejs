const handlerA = (req, res) => {
    res.send(`controller handler a`)
}

const handlerB = (req, res) => {
    res.send("controller handler b")
}


module.exports = {
    handlerA,
    handlerB
}
