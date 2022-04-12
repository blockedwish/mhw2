/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const risposte =[null,null,null]
let risp_num = 0;

function select(event){
    const objcaller = event.currentTarget;
    const id = objcaller.dataset.questionId
    let index = -1;
    switch(id){
        case 'one':
            index = 0;
            break;
        case 'two':
            index = 1;
            break;
        case 'three':
            index = 2;
            break;
    }
    if(risposte[index]!=null){
        risposte[index].classList.remove("profile_selected");
        risposte[index].querySelector("img.checkbox").src="images/unchecked.png";
    }
    else{
        risp_num +=1;
    }
    risposte[index] = objcaller;
    for(el of document.querySelectorAll(".profile[data-question-id="+id+"]")){
        if(el === objcaller) {
           el.classList.add("profile_selected");
           el.classList.remove("opacity")
        }
        else{
            el.classList.add("opacity");
        }
    }
    objcaller.querySelector("img.checkbox").src="images/checked.png";
    
    if(risp_num==3){ //Quiz ultimato
        let max = 1;
        let max_element =  risposte[0].dataset.choiceId;
        const count_arr = {
            "blep":0
            ,"happy":0
            ,"sleeping":0
            ,"dopey":0
            ,"burger":0
            ,"cart":0
            ,"nerd":0
            ,"shy":0
            ,"sleepy":0
    }
        document.querySelector("section.risultato").style.display = "block";
        for(el of risposte){
            count_arr[el.dataset.choiceId] +=1;
        }
        for (el in count_arr){
            if(count_arr[el] > max) {
                max_element = el;
                max = count_arr[el];
            }
        }
        console.log(max_element);
       document.querySelector("#risultato_titolo").textContent =RESULTS_MAP[max_element].title;
       document.querySelector("#risultato_paragrafo").textContent =RESULTS_MAP[max_element].contents;
    }
}


function ricomincia_quiz(event){
    console.log("clicked");
    document.querySelector("section.risultato").style.display = "none";
    for(let i=0;i<risposte.length;i++){
        risposte[i].querySelector("img.checkbox").src="images/unchecked.png";
        risposte[i].classList.remove("profile_selected");
        risposte[i] = null;
        risp_num = 0;
    }
    for(el of document.querySelectorAll(".profile")){
        el.classList.remove("opacity");
    }

}
function initialize(){
    let objs_profile = document.querySelectorAll(".profile");
    for(let element of objs_profile){
        element.addEventListener("click", select);
    }

    let button = document.querySelector("#button_ricomincia");
    button.addEventListener("click", ricomincia_quiz);
}

initialize()