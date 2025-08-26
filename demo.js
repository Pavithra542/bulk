

// const fileInput = document.getElementById("fileInput")

// fileInput.addEventListener("change",function(event)
// {
//     const file = event.target.files[0]
//     const reader = new FileReader()

//     reader.onload = function(event){
//         const data = event.target.result
//         const workbook = XLSX.read(data,{type:"binary"})
//         const sheetName = workbook.SheetNames[0]
//         const worksheet = workbook.Sheets[sheetName]
//         const emaillist = XLSX.utils.sheet_to_json(worksheet)
//         console.log(emaillist)
//     }

//     reader.readAsBinaryString(file);  


// })
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);  // array buffer -> Uint8Array
        const workbook = XLSX.read(data, { type: "array" });  // type = array
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const emaillist = XLSX.utils.sheet_to_json(worksheet);
        console.log(emaillist);
    };

    if (file) {
        reader.readAsArrayBuffer(file);   // ✅ use this instead
    }
});
