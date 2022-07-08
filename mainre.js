function upload(op) {
    var files = document.getElementById('file_upload').files;
    
    if(files.length==0){
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0],op);
    }else{
        alert("Please select a valid excel file.");
    }

  }
 //  var resultEle;
  //Method to read excel file and convert it into JSON 
  function excelFileToJSON(file,op){
     let x=document.getElementById("empid").value;
      try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function(e) {

            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type : 'binary'
            });
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
          });
            //displaying the json result
            var dinres=JSON.stringify(result);
            // var resultEle=document.getElementById("json-result");
            // resultEle.value=JSON.stringify(result, null, 4);
            var parres=JSON.parse(dinres);
            if(op=="autofill"){
              automatic(parres,x);
            }
           
           //  document.getElementById("msg").innerHTML=parres.Sheet1.length;
           
           //  resultEle.style.display='block';               
            }
        }catch(e){
            console.error(e);
        }
        
  }

  // if(op=="submit"){
  //   display();
  // }

function automatic(parres,x){
    for(let i=0;i<parres.Sheet1.length;i++){
      if(x==parres.Sheet1[i].ID){
        document.getElementById("name").value=parres.Sheet1[i].Name;
        document.getElementById("mno").value=parres.Sheet1[i].Mobile;
        document.getElementById("com").value=parres.Sheet1[i].Company;
        document.getElementById("email").value=parres.Sheet1[i].Email;
        document.getElementById("gender").value=parres.Sheet1[i].Gender;
        // document.getElementById("msg").innerHTML="Hello There";
      }
    }
}


function display(){
  let x = document.getElementById("empid").value;
  let y = document.getElementById("name").value;
  let z = document.getElementById("mno").value;
  let a = document.getElementById("com").value;
  let b = document.getElementById("email").value;
  let c = document.getElementById("gender").value;

  document.getElementById("textarea").value=`${x}\n${y}\n${z}\n${a}\n${b}\n${c}`;

  document.getElementById("empid").value = "";
  empid.focus();
  document.getElementById("name").value = "";
  document.getElementById("mno").value = "";
  document.getElementById("com").value = "";
  document.getElementById("email").value = "";
  document.getElementById("gender").value = "";
}