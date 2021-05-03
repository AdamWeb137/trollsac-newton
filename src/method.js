class Newton {
    static dif(f, x, h=0.0001){
        return (f(x+h)-f(x))/h;
    }

    static get_root(f, initial=1, iterations=100){
        let x = initial;
        for(let i = 0; i < iterations; i++){
            x = x - (f(x)/Newton.dif(f, x));
        }
        return x;
    }

    static equals_zero(f, x, delta=0.01){
        let result = f(x);
        return Math.abs(result) <= delta;
    }

    static expression_root(f, initial=1, iterations=100, check=true){
        let root = Newton.get_root(f, initial, iterations);
        if(Newton.equals_zero(f, root) || !check){
            return root;
        }else {
            return false;
        }
    }

    static equation_root(f1, f2, initial=1, iterations=100, check=true){

        let f = null;

        if(typeof f1 == "function" && typeof f2 == "function"){
            f = (x)=>{
                return f1(x)-f2(x);
            }
        }else if(typeof f1 == "number" && typeof f2 == "function"){
            f = (x)=>{
                return f1-f2(x);
            }
        }else if(typeof f1 === "function" && typeof f2 === "number"){
            f = (x)=>{
                return f1(x)-f2;
            }
        }else{
            f = (x)=>{
                return f1-f2;
            }
        }

        let root = Newton.get_root(f, initial, iterations);
        if(Newton.equals_zero(f, root) || !check){
            return root;
        }else {
            return false;
        }
    }

}