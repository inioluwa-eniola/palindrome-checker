// DOM Elements 
const genPalindrome = document.getElementById("gen-pal");
const importFile = document.getElementById("import-file");
const saveInput = document.getElementById("save-input");
const saveOutput = document .getElementById("save-output");
const copyInput = document.getElementById("copy-input");
const copyOutput = document.getElementById("copy-output");
const fileInput = document.getElementById("file");


const input = document.getElementById("input");
const output = document.getElementById("output");

let chars = [];
let reversedChars = [];

// Event Listeners 
genPalindrome.addEventListener("click", () => {
    generatePalindrome(input.value)
})

fileInput.addEventListener ("change", previewFile);


input.addEventListener ("click", () => {
    const copyInputIcon = copyInput.querySelector(".copy-input-icon");
    copyInputIcon.classList.add("fa-copy");
    copyInputIcon.classList.remove("fa-check");
    copyInputIcon.classList.remove("disabled");


    const copyOutputIcon = copyOutput.querySelector(".copy-output-icon");
    copyOutputIcon.classList.add("fa-copy");
    copyOutputIcon.classList.remove ("fa-check");
    copyOutputIcon.classList.remove ("disabled");
});

saveInput.addEventListener("click", () => {
    saveTextAsFile (input.value, 'input.txt')
})

saveOutput.addEventListener("click", () => {
    saveTextAsFile (output.value, 'output.txt')
})



// Get access to the input text
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        isPalindrome(input.value);
    }
});




// Checks if the input text is a palindrome
function isPalindrome (inputString) {
    inputString = inputString.replace(/[^a-z0-9]/gi, "")

    const chars = [...inputString];
    const reversedChars = [...chars].reverse();

    if (chars.join('') === reversedChars.join('')) {
        output.value = "true";
    }
    
    else {
        output.value = "false";
    }
}


// Generates palindromes when the btn is clicked
function generatePalindrome (inputString) {
    inputString = inputString.replace(/[^a-z0-9]/gi, "")

    const chars = [...inputString];
    const reversedChars = [...chars].reverse();
    const palindromeArr = chars.concat(reversedChars)

    output.value = palindromeArr.join("");
}


// This Reads the text from a .txt file
function previewFile () {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // this will then display a text file 
        console.log(reader.result);
        input.value = reader.result;
    })

    if (file) {
        reader.readAsText(file);
    }
}

// Copies the input text to the clipboard
copyInput.addEventListener ("click", () => {

    const targetElement = document.querySelector(copyInput.dataset.copy);
    const inputToCopy = targetElement.value;

    navigator.clipboard.writeText(inputToCopy).then(() => {

        const copyInputIcon = copyInput.querySelector(".copy-input-icon")
    
        copyInputIcon.classList.remove("fa-copy");
        copyInputIcon.classList.add("fa-check");
        copyInputIcon.classList.add("disabled");

    });
});

// Copies the output text to the clipboard 
copyOutput.addEventListener ("click", () => {

    const targetElement = document.querySelector(copyOutput.dataset.copy);
    const outputToCopy = targetElement.value;

    navigator.clipboard.writeText(outputToCopy).then(() => {
        const copyOutputIcon = copyOutput.querySelector(".copy-output-icon");

        copyOutputIcon.classList.remove("fa-copy");
        copyOutputIcon.classList.add ("fa-check");
        copyOutputIcon.classList.add ("disabled");
    });
});

// Saves the text in the output or input textarea to a .txt file
function saveTextAsFile(textToWrite, fileNameToSaveAs) {

    let textFileAsBlob = new Blob ([textToWrite], {type: 'text/plain'});
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';

    if(window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}