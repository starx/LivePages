const gettingStartedController = require("../../controllers/GettingStartedController");
const gettingStartedRouter = require("../../routes/getting_started");

describe('Test actions', function () {

    test('sayHelloWorld_withoutPreconditions_outputsHelloWorld', () => {
        const req = {};
        const res = { 
            text: '',
            send: function(input) {
                this.text = input;
            }
        };
        gettingStartedController.sayHelloWorld(req, res);
        expect(res.text).toEqual('Hello, World!')
    });

    test('greet_withValidRequest_outputsCorrectGreeting', () => {
        const req = { body: { name: 'John' } };
        const res = {
            text: '',
            send: function (input) {
                this.text = input;
            }
        };
        gettingStartedController.greet(req, res);
        expect(res.text).toEqual('Hello, John!');
    })
});