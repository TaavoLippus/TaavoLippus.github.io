const start_page = document.getElementById("start_page");
const test_ise = document.getElementById("test_ise");
//const nupud = document.getElementById('nupud')

const noodid_sharp = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]
const noodid_naturaal = ["E", "F", "G", "A", "B", "C", "D"]
const noodid_ainult_sharp = ["F#", "G#", "A#", "C#", "D#"]
/*const keeled = {"E":0, "A":5, "D":10, "G":15, "B":19, "e":24}*/
const keeled = {'e':24, "B":19, "G":15, "D":10, "A":5, "E":0,}

let noodid_lubatud = noodid_naturaal
let keeled_lubatud = []

let viimane_prompt = ""
let skoor = 0

if(localStorage.getItem('hai_skoor_saved')==null){
    localStorage.setItem('hai_skoor_saved', 0)
}

let hai_skoor = localStorage.getItem('hai_skoor_saved')

let diagramm_laetud = false

window.onload = function(){
    updateText('hai-skoor-main', `hai skoor: ${hai_skoor}`)
}

function updateText(element_id, newValue) {
    const outputElement = document.getElementById(element_id);
    outputElement.innerText = newValue;
}

function test_setup() {

    if(diagramm_laetud==false){
        fretboard_diagramm()
    }

    keeled_lubatud = []
    skoor=0
    updateText("skoor", `skoor: ${skoor}`)
    keeled_checkboxid.querySelectorAll('*').forEach((checkbox)=>{
        if (checkbox.checked == true && keeled_lubatud.includes(checkbox.id)==false){
            //console.log(`${checkbox.id} checkbox on checkitud`)
            keeled_lubatud.push(checkbox.id)
        }
    })

    noodid_lubatud = []

    nupud.querySelectorAll('*').forEach((nupp)=>{
        nupp.style.display="none"
        if (document.getElementById('noodid_naturaal').checked == true){
            if (nupp.className=='nupu-class-naturaal'){
                nupp.style.display="flex"
            }
        }
        if (document.getElementById('noodid_sharp').checked == true){
            if (nupp.className=='nupu-class-sharp'){
                nupp.style.display="flex"
            }
        }
    })

    if (document.getElementById('noodid_naturaal').checked == true){
        noodid_lubatud = noodid_naturaal
    }
    if (document.getElementById('noodid_sharp').checked == true && document.getElementById('noodid_naturaal').checked == true){
        noodid_lubatud = noodid_sharp
    }
    if (document.getElementById('noodid_sharp').checked == true && document.getElementById('noodid_naturaal').checked == false){
        noodid_lubatud = noodid_ainult_sharp
    }

    console.log(noodid_lubatud)

    if (keeled_lubatud.length < 1 || noodid_lubatud.length < 1){
        document.getElementById('hoiatus').style.display="block"
    }
    else {
        start_page.style.display="none";
        test_ise.style.display="flex";
        test_main()
    }

}

function test_main() {
    document.body.classList.remove('disabled');
    document.getElementById("leek").style.display="none"

    updateText("tulemus", "-_-")

    let keel_ja_fret=""
    let õige_noot_sharp=""
    let suvaline_keel=""

    while (noodid_lubatud.includes(õige_noot_sharp) == false || keel_ja_fret == viimane_prompt || keeled_lubatud.includes(suvaline_keel) == false) {
        suvaline_keel = Object.keys(keeled)[Math.floor(Math.random()*6)]
        let suvaline_fret = (Math.floor(Math.random()*12)+1);
        pitch = keeled[suvaline_keel]+suvaline_fret;
        õige_noot_sharp = noodid_sharp[pitch % 12];
        keel_ja_fret = `${suvaline_keel}${suvaline_fret}`;
    }
    updateText("prompt", keel_ja_fret);
    let keel_ja_fret_div = document.getElementById(keel_ja_fret)
    keel_ja_fret_div.style.backgroundColor='red'

    let viimane_keel_ja_fret_div = document.getElementById(viimane_prompt)
    if(viimane_keel_ja_fret_div){
        viimane_keel_ja_fret_div.removeAttribute('style')
    }

    viimane_prompt = keel_ja_fret
    console.log(`viimane prompt oli ${viimane_prompt}`)

    window.check = function(guess) {
        if (guess == õige_noot_sharp) {
            updateText("tulemus", ":D");
            skoor += 100
            if(skoor >= hai_skoor && skoor>0){
                hai_skoor=skoor
                updateText('hai-skoor', `hai skoor: ${hai_skoor}`)
                localStorage.setItem('hai_skoor_saved', hai_skoor)
                console.log(`saved:${localStorage.getItem('hai_skoor_saved')}`)
            }
            console.log(`hai_skoor on ${hai_skoor}`)
            updateText("skoor", `skoor: ${skoor}`)
            document.body.classList.add('disabled');
            setTimeout(test_main, 500);
        } else {
            updateText("tulemus", `D:  õige noot on ${õige_noot_sharp}`)
            document.getElementById("leek").style.display="block"
            skoor = skoor - 100
            updateText("skoor", `skoor: ${skoor}`)
            setTimeout(test_main, 1000);
        }
    }
}

function reload_function() {
    start_page.style.display="block";
    test_ise.style.display="none";
    diagramm_laetud=true
    updateText('hai-skoor-main', `hai skoor: ${hai_skoor}`)
}

function fretboard_diagramm() {
    const fretboard = document.getElementById("fretboard")
    const keele_nimed_div = document.getElementById('keele_nimed_div')
    const keelte_arv = 6
    const fretide_arv = 12

    for (let freti_number = 1; freti_number <= fretide_arv; freti_number++) {
        const freti_number_div = document.createElement('div')
        freti_number_div.className = 'freti_number'
        freti_number_div.innerText=`${freti_number}`
        freti_numbrid_div.appendChild(freti_number_div)
    }
    
    for(let keel = 1; keel <= keelte_arv; keel++){

        const keele_nimi_div = document.createElement('div')
        keele_nimi_div.innerText=`${Object.keys(keeled)[keel-1]}`
        keele_nimi_div.className="keele_nimi"
        keele_nimed_div.appendChild(keele_nimi_div)

        const keel_div = document.createElement('div');
        keel_div.className='keel'
        keel_div.dataset.keel = keel;

        for (let fret = 1; fret <= fretide_arv; fret++) {
            const fret_div = document.createElement('div')
            fret_div.className = 'fret'
            fret_div.dataset.fret = fret
            fret_div.id=`${Object.keys(keeled)[keel-1]}${fret}`
            /*fret_div.innerText=`${fret_div.id}`*/
            keel_div.appendChild(fret_div)
        }

        fretboard.appendChild(keel_div)
    }
}