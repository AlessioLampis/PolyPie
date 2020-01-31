//POLYMETER notation

guest2.onchange = function () { //N1 Numerator of rhythm number 1
  document.getElementById("guest2").value = Math.floor(
    guest2.value
  );
  if (guest2.value > 8) { //To change but I don't know how
    guest2.value = 8;
    alert("Guest value can't exceed 8"); // to change in "20(?)"
  }
  if (guest2.value == 0) {
    guest2.value = 1;
  }
  if (guest2.value < 0){
    alert("Host value must be positive");
    guest2.value = 1;}
  
};

host2.onchange = function () { // D1 Denumerator of rhythm number 2
  document.getElementById("host2").value = Math.floor(
    host2.value
  );
  if (host2.value > 16) { 
    host2.value = 16;
    
  }
  if (host2.value < 4) {
    host2.value = 4;
  }
  
  //tatum_calculation();
};

guest3.onchange = function () { //N2 Numerator of rhythm 2
  document.getElementById("guest3").value = Math.floor(
    guest3.value
  );
  if (guest3.value > 8) { //Same as N1
    guest3.value = 8;
    alert("Guest value can't exceed 8");
  }
  if (guest3.value == 0) {
    guest3.value = 1;
  }
  if (guest3.value < 0){
    alert("Host value must be positive");
    guest3.value = 1;}
  //tatum_calculation();
};

host3.onchange = function () {  // D2 Denominator of rhythm 2
  document.getElementById("host3").value = Math.floor(
    host3.value
  );
  if (host3.value > 16) { //Same as N1
    host3.value = 16;
    
  }
  if (host3.value < 4) {
    host3.value = 4;
  }
};

document.querySelector(".minus").onclick = function(){
  host2.value = parseInt(host2.value)%2;
  
  if (host2.value > 16) { 
    host2.value = 16;
    
  }
  if (host2.value < 4) {
    host2.value = 4;
  }
};

document.querySelector(".plus").onclick = function(){
    host2.value = parseInt(host2.value)*2;
    
    if (host2.value > 16) { 
      host2.value = 16;
      
    }
    if (host2.value < 4) {
      host2.value = 4;
    }
  };

document.querySelector(".minus2").onclick = function(){
      host3.value = parseInt(host3.value)%2;
      
      if (host3.value > 16) { //Same as N1
        host3.value = 16;
        
      }
      if (host3.value < 4) {
        host3.value = 4;
      }
    };

document.querySelector(".plus2").onclick = function(){
        host3.value = parseInt(host3.value)*2; 
        
        if (host3.value > 16) { //Same as N1
          host3.value = 16;
          
        }
        if (host3.value < 4) {
          host3.value = 4;
        }
      };    

