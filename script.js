let output_string = '';
let num_a = '';
let num_b = '';
let operator = '';

let display = document.querySelector("#display");
let buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        
        if(num_a.length == 0) clear_all();

        let val = e.target.textContent;
        if(val == 'AC') {
            clear_all();
        }else if(val == "DEL") {
            delete_char_from_number_strings();
        }else if(val == '=') {
            compute();
        }else if(is_operator(val)){
            //ensures if a minus sign is entered as a negative sign or as an operator
            if(val == '-' && (operator.length != 0 || num_a.length == 0 || num_a[0] == '-' || num_b[0] == '-')) {
                if(add_char_to_number_strings(val) == true) {
                    output_string += val;
                    update_display();
                }
            }else{
                if(num_a.length != 0 && num_b.length != 0 && operator.length != 0) {
                    compute();
                }
                output_string += (" " + val + " ");
                update_display();
                operator = val;
            }
        }else if(val == '.' ||val == '0'|| is_number(val)){
            if(add_char_to_number_strings(val) == true) {
                output_string += val;
                update_display();
            }
        }
        console.log(`val: ${val} type: ${typeof val}`);
        log_values();
    });
});

function clear_all() {
    output_string = '';
    num_a = '';
    num_b = '';
    operator = '';
    update_display();
}
function delete_char_from_number_strings() {
    if(output_string.length == 0) {
        //nothing to delete
        return;
    }else if(output_string[output_string.length-1] == ' '){
        //below line removes the space and the last but one line in this function removes the character.
        output_string = output_string.slice(0, -1);
        if(is_operator(output_string[output_string.length-1])) {
            operator = operator.slice(0, -1);
        }else{
            num_a = num_a.slice(0, -1);
        }
    }else if(is_operator(output_string[output_string.length -1])){
        operator = operator.slice(0, -1);
    }else if(operator.length == 0) {
        num_a = num_a.slice(0, -1);
        if(num_a.length > 0 && num_a[num_a.length-1] == '-') {
            //if no number is there no need for lone negative sign.
            num_a = num_a.slice(0, -1);
            output_string = output_string.slice(0, -1);
        }
    }else{
        num_b = num_b.slice(0, -1);
        if(num_b.length > 0 && num_b[num_b.length-1] == '-') {
            num_b = num_b.slice(0, -1);
            output_string = output_string.slice(0, -1);
        }
    }
    output_string = output_string.slice(0, -1);
    update_display();
}
function compute() {
    if(num_a.length != 0 && num_b.length != 0) {
        let result = calculate();
        if(result == "Infinity") {
            clear_all();
            output_string = "Can't divide by zero";
            update_display();
            output_string = '';
        }else{
            clear_all();
            output_string = result;
            num_a = result;
            update_display();
        }
    }else if(num_a.length == 0) {
        let temp = output_string;
        output_string = "What to Calculate?";
        update_display();
        output_string = temp;
    }else if(operator.length == 0) {
        let temp = output_string;
        output_string = "Select an operator and a second operand";
        update_display();
        output_string = temp;
    }else if(num_b.length == 0) {
        output_string = "Select a second number";
        update_display();
    }
}
function add_char_to_number_strings(ch) {
    if(operator == '') {
        
        //if number is made negative then don't add another - sign to it at the start
        if(num_a.length == 1 && num_a[0] == '-' && ch == '-') return false;
        if(ch == '.' && num_a.includes('.')) return false;
        num_a += ch;
    }else{
        if(num_b.length == 1 && num_b[0] == '-' && ch == '-') return false;
        if(ch == '.' && num_b.includes('.')) return false;
        num_b += ch;
    }
    return true;
}
function calculate() {
    let result;
    if(operator == 'x') {
        result = (parseFloat(num_a) * parseFloat(num_b));
    }else if(operator == '÷'){
        result = (parseFloat(num_a) / parseFloat(num_b));
    }else if(operator == '+'){
        result = (parseFloat(num_a) + parseFloat(num_b));
    }else if(operator == '-'){
        result = (parseFloat(num_a) - parseFloat(num_b));
    }
    let result_str = result.toFixed(4); //toFixed function returns a string on its own so no need to convert the result back to string.

    //removes trailing zeroes from result after decimal.
    while(result_str.length > 0 && result_str.includes('.') && (result_str[result_str.length - 1] == '0' || result_str[result_str.length -1] == '.')) {
        result_str = result_str.slice(0, -1);
    }
    return result_str; 
}
function update_display(){
    display.textContent = output_string; 
}
function is_operator(str){
    return (str == 'x' || str == '÷' || str == '-' || str == '+');
}
function is_number(str){
    if(parseInt(str)) return true;
    else return false;
}
function log_values() {
    console.log(`output_string: ${output_string} type: ${typeof output_string}`);
    console.log(`num_a: ${num_a} type: ${typeof num_a}`);
    console.log(`num_b: ${num_b}, type: ${typeof num_b}`);
    console.log(`operator: ${operator}, type: ${typeof operator}`);
    console.log(`-------------------------------------------------------------------------------`);
}