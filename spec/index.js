var main = require("../index.js");
var MockContext = require('mock-lambda-context');
var assert = require('power-assert');

describe('Lambda func', function() {
  var context;

  before(function() {
    context = new MockContext();
  });

  describe('No bugs', function() {
    before(function(done) {
      main.handler({ env: "TEST" }, context, done);
    });

    it('should succeed with Yay', function() {
      console.log(context.succeed)
      assert.ok(context.succeed.calledWith('Yay'))
    });

    after(function() {
      //reset counters
      context.reset();
    })

  })
});
