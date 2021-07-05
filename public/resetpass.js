var codeSecret = new Date().getHours();
var currentTab = 0; // Current tab is set to be the first tab (0)4
var position = 0;
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  console.log(x.length)
  x[n].style.display = "block";

}
function fixTab(n) {
   var tabs = document.querySelectorAll('.tab')
   tabs.forEach(tab => {
    tab.style.display = "none";  
   })
    
}
 async function handlePost(event) {
  event.target.disabled = true;
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  var email = document.querySelector('#email').value;
console.log(email)
  // Exit the function if any field in the current tab is invalid:
  if (!validateForm()) return false;

 
  document.getElementById("handlePost").innerHTML = "Đang gửi";
try{
   const res = await fetch('http://192.168.1.4:5000/user/email',{
          method:'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({"email":email,"check":codeSecret})
         })
   const myJson = await res.json()
   console.log(myJson)
   if(myJson.status ==true){
    document.querySelector('.error').style.display = "none"
  event.target.disabled = true;

      fixTab();
  // Increase or decrease the current tab by 1:
      showTab(1)
   }
   else {
     document.querySelector('.error').innerHTML = 'Đã có lỗi! Thử lại'
    document.querySelector('.error').style.display = "block"
    document.getElementById("handlePost").innerHTML = "Gửi mã xác nhận";

   }
 }catch(err){

  alert("Đã xảy ra lỗi. Thử lại")
 }
    

}
function DateToString(){
  const date = new Date();
  let dateString = toFullTwoDigital(date.getYears()) + toFullTwoDigital(date.getMonths()) +
   toFullTwoDigital(date.getDay()) ;
}
function toFullTwoDigital(x){
  if(x >= 10) return  x;
  return '0' + x;
}
function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}
function handleBack(){
  fixTab();
  showTab(0);
  document.getElementById("handlePost").disabled = false;
  document.getElementById("handlePost").innerHTML = "Gửi lại mã xác nhận";

}
function handleConfirm(){
  const secret = document.querySelector('#secret-code').value;
  if(secret == codeSecret){
    fixTab();
    showTab(2);
  }
  else{
     document.querySelector('.error').style.display = "block"
    document.querySelector('.error').textContent = 'Mã xác nhận không đúng'
    document.querySelector('.error').className += ' show' 
    }
}
async function handleChange(){
  const newPass = document.querySelector('#new').value
  const confirm = document.querySelector('#confirm').value
  const email = document.querySelector('#email').value
  console.log(confirm)
  if (newPass.length < 6) 
    return  document.querySelector('#new').className += 'invalid'
 
  if( newPass != confirm){
    return  document.querySelector('#new').className += 'invalid'
  }
try{
  const res = await fetch('http://192.168.1.4:5000/user/confirm',{
          method:'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({"password":newPass,"email":email})
         })
   const myJson = await res.json()
   console.log(myJson)
   if(myJson.isChanged ==true){
      window.location = 'http://localhost:5000/user/account#dangnhap';
      setTimeout(function(){
        document.querySelector('.error').style.display = "block"
        document.querySelector('.error').textContent = 'Thành công! Vui lòng đăng nhập'        
      },2000)
   }
   else {
    document.querySelector('.error').innerHTML = 'Đã có lỗi! Thử lại'
    document.querySelector('.error').style.display = "block"
      window.location = 'http://localhost:5000/user/reset';
    

   }
  }catch(err){
    alert("Đã xảy ra lỗi. Thử lại")
  }
}