function to_f_string(s){
    if(s.indexOf("return") > -1){
        return s;
    }else{
        let lines = s.split("\n");
        lines[lines.length-1] = "return " + lines[lines.length-1];
        return lines.join("\n"); 
    }
}

let state_equation = 0;

function change_state(i){
    if(i==0){
        state_equation = 0;
        document.querySelector("#expression").style.display = "flex";
        document.querySelector("#equation").style.display = "none";
    }else{
        state_equation = 1;
        document.querySelector("#expression").style.display = "none";
        document.querySelector("#equation").style.display = "flex";
    }
}

window.addEventListener("load", (e)=>{

    let ans = document.querySelector("#ans");

    document.querySelector("#calculate").addEventListener("mouseup",(e)=>{

        let iter = document.querySelector("#iter").value;
        iter = (isNaN(iter)) ? 100 : Number(iter);

        let init = document.querySelector("#init").value;
        init = (isNaN(init)) ? 1 : Number(init);

        let check = document.querySelector("#check").checked;

        if(state_equation){
            let f1 = new Function("x", to_f_string(document.querySelector("#eq_box1").value));
            let f2 = new Function("x", to_f_string(document.querySelector("#eq_box2").value));

            let result = Newton.equation_root(f1, f2, init, iter, check);

            if(result){
                ans.innerHTML = `<div class="good">x = ${result}</div>`;
            }else{
                ans.innerHTML = "<div class='bad'>No real solution</div>";
            }

        }else{
            let f = new Function("x", to_f_string(document.querySelector("#ex_box").value));

            let result = Newton.expression_root(f, init, iter, check);

            if(result){
                ans.innerHTML = `<div class="good">x = ${result}</div>`;
            }else{
                ans.innerHTML = "<div class='bad'>No real solution</div>";
            }
        }

    });
});
