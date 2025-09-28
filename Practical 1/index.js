
    let js = 0;
    let py = 0;
    let java = 0;
    javaVotes = document.getElementById("javabtn");
    PyVotes = document.getElementById("pybtn");
    JSvotes = document.getElementById("jsbtn");


    javaVotes.addEventListener("click", () => {
        javaInc();
    });
    PyVotes.addEventListener("click", () => {
        PyInc();
    });
    JSvotes.addEventListener("click", () => {
        jsInc();
    });

    function javaInc() {
      java++;
      const javaUpdate = document.querySelector(".updatejava");
      javaUpdate.innerHTML = java;
    }
    function jsInc() {
      js++;
      const jsUpdate = document.querySelector(".updatejs");
      jsUpdate.innerHTML = js;
    }
    function PyInc() {
      py++;
      const pyUpdate = document.querySelector(".updatepy");
      pyUpdate.innerHTML = py;
    }
    setInterval(() => {
            v = Math.random()*3
            if(v<1){
                jsInc()
            }
            else if(1<v && v<2){
                PyInc()
            }
            else{
                javaInc()
            }
    }, 2000);
  