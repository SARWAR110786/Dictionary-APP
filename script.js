let form = document.querySelector("form")
let main = document.querySelector("main")
let result = document.querySelector(".result")
// let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let input = document.querySelector("input")
    getwordinfo(input.value);


})

const getwordinfo = async (word)=>{

    
    try {
        result.innerHTML = `Fetching Data.....`
        let res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        console.log(res);
        result.innerHTML = `<h2> <strong> Word: </strong>${res.data[0].word}</h2>
        <p> <strong>Part Of Speech:</strong> ${res.data[0].meanings[0].partOfSpeech}</p>
         <p><strong>Meaning:</strong>${res.data[0].meanings[0].definitions[0].definition === undefined ? "Not Fount" : res.data[0].meanings[0].definitions[0].definition}</p>
        <p><strong>Example:</strong>${res.data[0].meanings[0].definitions[1].definition === undefined ? "Not Fount" : res.data[0].meanings[0].definitions[1].definition}</p>
        <p><strong>Antonmys:</strong>
        
        
        
        `
        if (res.data[0].meanings[0].antonyms.length === 0) {
            result.innerHTML +=  `<p>NOT Found</p>`
        } else {
            for (let i = 0; i < res.data[0].meanings[0].antonyms.length; i++) {
                result.innerHTML += `<li>${res.data[0].meanings[0].antonyms[i]}</li>`
            
        }
        }
                 result.innerHTML+= `<p><strong>Synonyms:</strong>`

        if (res.data[0].meanings[0].synonyms.length === 0) {
            result.innerHTML +=  `<p>NOT Found</p>`
        } else {
             for (let i = 0; i < res.data[0].meanings[0].synonyms.length; i++) {
            result.innerHTML += `<li>${res.data[0].meanings[0].synonyms[i]}</li>`
            
        }
        }

        //adding read more button
        result.innerHTML += `<div><a href="${res.data[0].sourceUrls}" target="_blank">Read More</a></div>`



    } catch (error) {
        
        result.innerHTML = `<p>The word Could Not be Found</p>`
    }

    
    
}

