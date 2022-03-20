let key_sequence = [];
let timer = null;

function enableCheats(){
    document.getElementById('cheat-window').classList.remove('hide');
    setTimeout( ()=>{
        document.getElementById('cheat-window').classList.add('hide');
    },5000)
    resetKeys();
}

function resetKeys(){
    console.debug('key_sequence:reset', key_sequence.join(''));
    key_sequence = [];
}

window.addEventListener('keyup', (e)=> {

    if(timer){
        clearTimeout(timer);
    }

    timer = setTimeout( resetKeys, 1000);

    key_sequence.push(e.key);
    const sequence = key_sequence.join('');

    switch(sequence){

        case "sepia":
            document.getElementsByTagName("html")[0].classList.toggle('sepia')
            break;

        case "enderman":
            document.getElementsByTagName("html")[0].classList.toggle('invert')
            break;

        case "deepfry":
            document.getElementsByTagName("html")[0].classList.toggle('deepfried')
            break;

        case "spin":
            var els = document.getElementsByTagName("*")
            for (var i = 0; i < els.length; i++) {
                console.log(els[i].id); //second console output
                els[i].classList.toggle('spin');
            }
            break;

        case "threedee":
            var els = document.getElementsByClassName("bordered")
            for (var i = 0; i < els.length; i++) {
                els[i].classList.toggle('threedee');
            }
            break;

        case "gmod":


            document.getElementsByTagName("html")[0].classList.toggle('no-css')

            var images = document.getElementsByTagName("img")
            for (var a = 0; a < images.length; a++) {

                const img = images[a];

                console.log(img);
                if(img.getAttribute('data-original-src')){
                    img.setAttribute('src', img.getAttribute('data-original-src'));
                }else{
                    img.setAttribute('data-original-src', img.getAttribute('src'));
                    img.setAttribute('src', '/assets/media/site/error.png');
                }
            }



            break;

        case "zzz":
        case "goodnight":
            document.getElementsByTagName("html")[0].classList.toggle('sleepy')
            break;

        default:
            return false;
    }

    enableCheats();


});