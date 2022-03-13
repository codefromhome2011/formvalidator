// Viết mã JS tại đây

//Object Validator
function validator(options) {
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage = rule.check(inputElement.value)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    
    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form)
    
    if (formElement) {
        options.rules.forEach(function (rule){
            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                inputElement.onblur = function() {validate(inputElement, rule)} 
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector('.form-message')
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

validator.isRequired = function(selector) {
    return {
        selector: selector,
        check: function(value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
}

validator.isEmail = function(selector) {
    return {
        selector: selector,
        check: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui lòng nhập email đúng'
        }
    }
}

validator.minLength = function(selector, min) {
    return {
        selector: selector,
        check: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập mật khẩu tối thiểu ${min} kí tự`
        }
    }
}

validator.isConfirmed = function(selector, confirmedValue) {
    return {
        selector: selector,
        check: function(value) {
            return value === confirmedValue() ? undefined : 'Vui lòng nhập đúng mật khẩu'
        }
    }
}