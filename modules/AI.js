var inputs = document.getElementById('voiceInput')
var audio2 = document.getElementById('myAudio')
inputs.addEventListener('click', function (e) {
    //print("Recieved")
    var API_URL = "https://api-inference.huggingface.co/models/Koriyy/DialoGPT-medium-alexbot"

    //Get Input from Mic
    // get output div reference
    //var output = document.getElementById("output");
    // get action element reference
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function () {

    };

    recognition.onspeechend = function () {
        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        async function query(data) {
            var output = document.getElementById("output")
            const API_TOKEN = "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"
            const response = await fetch(
                "https://api-inference.huggingface.co/models/Koriyy/DialoGPT-medium-gf", {
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            if (result.hasOwnProperty("error")) {
                var synth = window.speechSynthesis;
                var voices = synth.getVoices();
                if (voices.length !== 0) {
                    audio2.play();
                    setTimeout(() => {
                        audio2.pause();
                    }, 5000);
                }
                console.log("Error")
                output.innerHTML = "Sorry, I'm still loading."
            }
            return result;
        }

        query(transcript).then((response) => {
            var responseStr = (JSON.stringify(response.generated_text));
            var responseStr = responseStr.replace(/"/g, '');
            console.log(responseStr)
    
                var output = document.getElementById("output")
                audio2.play();
                output.innerHTML = responseStr
                setTimeout(() => {
                    audio2.pause();
                }, 5000);



        });


    };

    // start recognition
    recognition.start();
});
