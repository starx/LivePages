exports.sayHelloWorld = (req, res) => {
    res.send("Hello, World!");
}

exports.greet = (req, res) => {
    res.send(`Hello, ${req.body.name}!`)
};