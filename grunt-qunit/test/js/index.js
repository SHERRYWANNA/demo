module('Util');

QUnit.test("isInt", function() {
    ok(
        Util.isInt(11) === true,
        '是整数'
    );

    ok(
        Util.isInt('11') === false
    )

    ok(
        Util.isInt(11.11) === false
    )

});