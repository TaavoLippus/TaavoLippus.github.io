const start_page = document.getElementById("start_page");
const test_ise = document.getElementById("test_ise");
//const nupud = document.getElementById('nupud')

const noodid_sharp = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]
const noodid_naturaal = ["E", "F", "G", "A", "B", "C", "D"]
const noodid_ainult_sharp = ["F#", "G#", "A#", "C#", "D#"]
const keeled = {"E":0, "A":5, "D":10, "G":15, "B":19, "e":24}
let noodid_lubatud = noodid_naturaal
let keeled_lubatud = []

let viimane_prompt = ""
let skoor = 0

function updateText(element_id, newValue) {
    const outputElement = document.getElementById(element_id);
    outputElement.innerText = newValue;
}

function test_setup() {
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
    if (document.getElementById('noodid_naturaal').checked == true){
        noodid_lubatud = noodid_naturaal
        document.getElementById('nupud_naturaal').style.display='block'
        document.getElementById('nupud_sharp').style.display='none'
    }
    if (document.getElementById('noodid_sharp').checked == true && document.getElementById('noodid_naturaal').checked == true){
        noodid_lubatud = noodid_sharp
        document.getElementById('nupud_naturaal').style.display='block'
        document.getElementById('nupud_sharp').style.display='block'

    }
    if (document.getElementById('noodid_sharp').checked == true && document.getElementById('noodid_naturaal').checked == false){
        noodid_lubatud = noodid_ainult_sharp
        document.getElementById('nupud_sharp').style.display='block'
        document.getElementById('nupud_naturaal').style.display='none'

    }

    if (keeled_lubatud.length < 1 || noodid_lubatud.length < 1){
        document.getElementById('hoiatus').style.display="block"
    }
    else {
        start_page.style.display="none";
        test_ise.style.display="block";
        test_main()
    }

}

function test_main() {
    document.body.classList.remove('disabled');
    document.getElementById("leek").style.display="none"


    /*nupud.querySelectorAll('*').forEach((nupp)=>{nupp.style.display='block'})
    nupud.querySelectorAll('*').forEach((nupp)=>{
        if (noodid_lubatud.includes(nupp.innerText)==false){
            nupp.style.display="none"
        }
    });*/
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
    viimane_prompt = keel_ja_fret
    console.log(`viimane prompt oli ${viimane_prompt}`)

    window.check = function(guess) {
        if (guess == õige_noot_sharp) {
            updateText("tulemus", ":D");
            //document.getElementById("leek").style.display="none"
            skoor += 100
            updateText("skoor", `skoor: ${skoor}`)
            console.log(skoor)
            document.body.classList.add('disabled');
            setTimeout(test_main, 1000);
        } else {
            updateText("tulemus", "D:")
            document.getElementById("leek").style.display="block"
            skoor = skoor - 100
            updateText("skoor", `skoor: ${skoor}`)
            setTimeout(test_main, 10000);
        }
    }
}

function reload_function() {
    start_page.style.display="block";
    test_ise.style.display="none";
}
