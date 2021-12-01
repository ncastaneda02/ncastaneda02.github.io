! function($) {
    function randomBit() {
        return Math.random() < .5 ? "0" : "1"
    }

    let methods = {
        init: function(options) {
            let settings = $.extend({}, $.fn.toBinary.defaults, options),
                elements = this;
            return elements.each(function() {
                let element = $(this),
                    text = settings.text;
                let steps = 0;
                ! function binarify() {
                    let output = text.split(""),
                        start_index = Math.floor(steps / settings.stepsUntilFixed);
                    for (steps++; output[start_index] && !output[start_index].match(settings.matchRE);)
                        start_index++, steps = start_index * settings.stepsUntilFixed;
                    "type" == settings.mode && start_index < output.length - 1 && (output = output.slice(0, start_index + 1));
                    for (var i = start_index; i < output.length; i++) 
                        output[i] = randomBit();
                    element.text(output.join("")), "endless" == settings.mode && (steps = 0), !element.data("go-binary-stop") && steps / output.length <= settings.stepsUntilFixed ? setTimeout(function() {
                        binarify()
                    }, 1e3 / (settings.sps + eval(settings.spsFormulaBasedOnTextLength.replace(/length/g, text.length)))) : (element.data("go-binary-running", !1), element.data("go-binary-stop") || settings.callback(element))
                }()
            }), this
        },
        stop: function() {
            $(this).data("go-binary-stop", !0)
        }
    };
    $.fn.toBinary = function(t) {
        return methods.init.apply(this, arguments)
    }, $.fn.toBinary.defaults = {
        text: "",
        stepsUntilFixed: 4,
        sps: 25,
        matchRE: /[^\s]/,
        mode: "shuffle",
        callback: function() {},
        spsFormulaBasedOnTextLength: "0"
    }
}(jQuery);