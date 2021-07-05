
  const app = {
    pages: [],
    show: new Event('show'),
    init: function(){

        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })

        if( window.location.search.slice() == "")
            history.replaceState({}, 'Step1', '#step1');
        else history.replaceState({}, 'Step2', '#step2');

        let hash = location.hash.replace('#' ,'');
        console.log(hash)

         document.querySelectorAll('.forward').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })

        document.getElementById(hash).classList.add('active');
     
        window.addEventListener('popstate', app.poppin);
        console.log("1")

    },
    nav: function(ev){
        console.log("2")
        ev.preventDefault();

        let currentPage = ev.target.getAttribute('data-target');
        console.log(currentPage)
        // reset all
        document.querySelector('.active').classList.remove('active');
        // set link to active
        document.getElementById(currentPage).classList.add('active');

        document.querySelector('.instep').classList.remove('instep');
        // set link to active
        document.querySelector(`.${currentPage}`).classList.add('instep');

        history.pushState({}, currentPage, `#${currentPage}`);
        console.log(location.href)
        document.getElementById(currentPage).dispatchEvent(app.show);
         $(window). scrollTop(0);

    },
    pageShown: function(ev){
        console.log("3")
        $(window).scrollTop(0);
        console.log($(window).scrollTop())
        console.log('Page', ev.target.id, 'just shown');
        // let h1 = ev.target.querySelector('h1');
        // h1.classList.add('big')
        // setTimeout((h)=>{
        //     h.classList.remove('big');
        // }, 1200, h1);
       $(window). scrollTop(0);

    },
    poppin: function(ev){
        console.log("4")
        console.log(location.hash)
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        console.log(hash)
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');

        document.querySelector('.instep').classList.remove('instep');
        document.querySelector(`.${hash}`).classList.add('instep');

        console.log(hash)
        history.pushState({}, hash, `#${hash}`);
        document.getElementById(hash).dispatchEvent(app.show);
         $(window).scrollTop(0);
        

    }
}
    

document.addEventListener('DOMContentLoaded', app.init);

// window.onclick = function(e){
//     if(e.target == document.querySelector('.modal') )
//         document.querySelector('.modal').style.display = "none"
// }
window.onclick = function(e){
    if(e.target == document.querySelectorAll('.modal')[0] ){
        document.querySelectorAll('.modal')[0].style.display = 'none'
       // document.querySelector('#myModal2').style.display = 'none'
       }
    if(e.target == document.querySelectorAll('.modal')[1] ){
       // document.querySelector('#myModal').style.display = 'none'
        document.querySelectorAll('.modal')[1].style.display = 'none'
       }
}

let seatNums = 0;
let tickets = [];
let postSelected;
let price;
var buttons = document.querySelectorAll('.seat');
const timer = document.querySelector('#time');
const inputDate = document.querySelector('#basicDate');
const modal = document.querySelector('.loader')
const tripID= document.querySelector('.post').getAttribute('data-trip');
const buttonCancle = document.querySelector('.cancle')

console.log(buttons.length)

inputDate.value = localStorage.getItem('dateTrip');

//Initzalize some stuff
setSeatDisabledAll()

checkPostByURL();

buttonCancle.addEventListener('click',()=>{
  let quit = confirm("Mọi thông tin sẽ bị hủy. Bạn có chắc?")
    if(quit) return window.location = 'http://localhost:5000/home'
      return ;
})

// when user pick time
timer.addEventListener('change',() =>{
     $(window). scrollTop(0);
    tickets = [];
    seatNums = 0;
    // is today == the post day go ? check time < 2h : block this post
    if(new Date(inputDate.value).toLocaleDateString() == new Date().toLocaleDateString()){
      if(timer.value.slice(0,2) - new Date().getHours() >= 2){
        modal.style.visibility = "visible";
        modal.classList.add("show");
        findPostTime();
      }else{
        document.querySelectorAll('.modal')[0].style.display = "block"
        $('.modal-title').text("Chuyến xe đã đóng! Lần sau đặt vé sớm hơn nhé.")
        // timer.value=""
        // setSeatDisabledAll();
      }
    }else{
        modal.style.visibility = "visible";
        modal.classList.add("show");
        findPostTime();
    }
   
 
    
})
// when user pick date
inputDate.addEventListener('change',() =>{
     location.href =`http://localhost:5000${window.location.pathname}?d=${inputDate.value}#step1`
    window.location.hash="#step1"
    checkPostByURL();
    setSeatDisabledAll()
})
//some function
function checkPostByURL(){
    if(window.location.search.slice(3,window.location.search.length) != "")
        {
            inputDate.value = window.location.search.slice(3,window.location.search.length);
        findPostDate();
        }

}

function resetSeat(){
    buttons.forEach((btn) =>{
        btn.disabled = false;
     btn.classList.remove("selected");

    })
    document.querySelector('.showcase').style.opacity="1";
    document.querySelector('.showcase').style.pointerEvents="unset";

}

// document.querySelector('.close').addEventListener('click', () =>{
//     document.querySelector('.modal').style.display = "none"
// })

function setSeatDisabledAll(){
    buttons.forEach((btn) =>{
        btn.disabled = true;
    })
    inputDate.value = "";
    document.querySelector('.showcase').style.opacity="0.5";
    document.querySelector('.showcase').style.pointerEvents="none";


}

async function  findPostDate(){
    let dateTrip = inputDate.value;
    // fetch data available post
    try{
      const response = await fetch(`http://localhost:5000/post/${tripID}/${dateTrip}`);
        const myJson = await response.json();
    
        if(myJson.length != 0) {
            $('.date-go-detail').html(new Date(myJson[0].NgayDi).toLocaleDateString())
            fillTimePicker();
        }
        else {
            // alert("Không có chuyến phù hợp")
            document.querySelectorAll('.modal')[0].style.display = "block"
            setSeatDisabledAll();
        }
      }catch(err){
      //  alert(err)
      }
   
}

async function fillTimePicker(){
    let output ='<option selected disabled>Chọn giờ đi</option>'
    let dateTrip = inputDate.value;
   try{ 
    const response = await fetch(`http://localhost:5000/time/${tripID}/${dateTrip}`);
       const myJson = await response.json();
       
       if(myJson.length != 0) {
   
           myJson.forEach((time) =>{
               output +=  `<option id=${time.MaCX} value="${time.GioDi}" style="outline:none">${time.GioDi}</option>`
   
           })
           $('#time').html(output);
        }
      }catch(err){
       // alert("Đã xảy ra lỗi. Thử lại")
      }
     
}

async function findPostTime(){

    let dateTrip = inputDate.value;
    console.log(dateTrip)
    let time = timer.value;
   try{
       const response = await fetch(`http://localhost:5000/post/${tripID}/${dateTrip}/${time}`);
       const myJson = await response.json();
       const options = timer.options;
       postSelected = options[options.selectedIndex].id
   
       //GET NOIXUATPHAT 
       const post = await fetch(`http://localhost:5000/getPostDetails/${postSelected}`)
       const postDetails = await post.json();
       const numberOfSeats = postDetails[0].SoLuongGhe;
       
      if(numberOfSeats == 40 ){
        
       
          let seatmap = `<div id="seat-map-columns">`
        // top seats
            for( let i = 1; i <= 20 ;i++){
              if( i < 10 ){
                let seat = '0' + i;
                seatmap += `<button class="seat" id="A${seat}">A${seat}</button>`
              }
              else seatmap += `<button class="seat" id="A${i}">A${i}</button>`
            }
            seatmap += `</div><div id="seat-map-columns">`
        // bottom seats
        for( let i = 21; i <= 40 ;i++){
          if( i < 10 ){
            let seat = '0' + i;
            seatmap += `<button class="seat" id="A${seat}">A${seat}</button>`
          }
          else seatmap += `<button class="seat" id="A${i}">A${i}</button>`
        }
        seatmap += `</div>`
        document.querySelector('#changable').className = 'seat-map-2'
        $('.seat-map-2').html(seatmap)
          
        //$('.showcase').html(seatmap)
        buttons = document.querySelectorAll('.seat')

      }
      seatPicker();
    
    
     console.log(postSelected)
      if(myJson.length != 0) {
         
          resetSeat();
          $('#move-to-3').css('pointerEvents','none')
          $('.src-detail').html(postDetails[0].TenBX)
          price = postDetails[0].DonGia;
          console.log("Available")
          myJson.forEach((ticket) => {
              document.querySelector(`#${ticket.SoGhe}`).disabled = true;
          })
         
         

      }else {
           console.log("Out of ticket")
          $('#move-to-3').css('pointerEvents','none')
          $('.src-detail').html(postDetails[0].TenBX)
          price = postDetails[0].DonGia;
           resetSeat();
       }
      // location.href=`http://localhost:5000/mua-ve-saigon-kiengiang?d=${dateTrip}#step2`
      window.location.hash="#step2"
      modal.style.visibility = "hidden";
      modal.classList.remove("show");

     }catch(err){

     // alert("Đã xảy ra lỗi. Thử lại")
     }
}


function checkSeatForBook(list){
    // let seat = {isBooked:true}
   for(let i in list){
        for(let k in tickets){
            if(list[i].SoGhe ==tickets[k]) return {isBooked:true}
        }
    }
    return {isBooked:false}
}


async function addCustomerAndTicket(event){
  console.log("Bạn đã click đặt vé")
  event.target.disabled = true;
  // VALIDATION
  const numbericRegex = new RegExp("^[0-9]{9,}");
 const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-z0-9-.]+\.[a-z]{2,}");

  if($('#name').val().length <= 0 ){
     $('#name').addClass("invalid") 
     event.target.disabled = false;
    return  window.location.hash="#step3";
  }
  if($('#email').val().length <= 0|| emailRegex.exec( $('#email').val()) === null){
     $('#email').addClass("invalid") 
     event.target.disabled = false;
    return  window.location.hash="#step3";
  }
  if($('#phone').val().length <= 0 || numbericRegex.exec( $('#phone').val()) === null){
     event.target.disabled = false;
     $('#phone').addClass("invalid") 
    return  window.location.hash="#step3";
  }
  if($('#gender').val().length <= 0 ){
     event.target.disabled = false;
     $('#gender').addClass("invalid") 
    return  window.location.hash="#step3";
  }
   if($('#address').val().length <= 0 ){
     event.target.disabled = false;
     $('#address').addClass("invalid") 
    return  window.location.hash="#step3";
  }
  // END OF VALIDATION
  

try{  
  let response =  await fetch(`http://localhost:5000/checkseat/${postSelected}`)
  let result = await response.json();
  //tickets = ["A11"]
  //tickets = ["A03"]

  let seat = await checkSeatForBook(result)
 
    if(seat.isBooked) {
      event.target.disabled = false;
      document.querySelectorAll('.modal')[1].style.display = "block"
    //  location.href =`http://localhost:5000${window.location.pathname}?d=${inputDate.value}#step1`
      window.location.hash="#step2"
      return findPostTime()
    }
    modal.style.visibility = "visible";

    const post = await fetch(`http://localhost:5000/getPostDetails/${postSelected}`)
    const postDetails = await post.json();
    console.log({
      'TenKH':$('#name').val(),
      'Email':$('#email').val(),
      'SDT': $('#phone').val(),
      'GioiTinh': $('#gender').val(),
      'DiaChi': $('#address').val(),
      'SLGhe' :tickets,
      'DonGia':price,
      'NgayDat': formatDate(),
      "MaCX":postSelected,
      "ChuyenXe":postName(),
      "BienSoXe":postDetails[0].BienSoXe

    });
  
 fetch('http://localhost:5000/customer/insert',{
        method: 'POST',
        headers:{
            'Content-Type' :'application/json'
        },
        body: JSON.stringify({
          'TenKH':$('#name').val(),
          'Email':$('#email').val(),
          'SDT': $('#phone').val(),
          'GioiTinh': $('#gender').val(),
          'DiaChi': $('#address').val(),
          'SLGhe' :tickets,
          'DonGia':price,
          'NgayDat': formatDate(),
          "MaCX":postSelected,
          "ChuyenXe":postName(),
          "BienSoXe":postDetails[0].BienSoXe

        })
    })
    .then(res => res.json())
    .then(res =>{
         if(typeof res.link != 'undefined')  window.location = res.link 
          else if(res.status == 1){
                document.querySelectorAll('.modal')[1].style.display = "block"
                $('#email-modal').text("Không thể lưu thông tin khách hàng")
                   window.location.hash="#step2"
                   modal.style.visibility = "hidden";
                   modal.classList.remove("show");
            }else{
                $('#email-modal').text("Vui lòng kiểm tra lại email")
                document.querySelectorAll('.modal')[1].style.display = "block"
                   window.location.hash="#step2"
                   modal.style.visibility = "hidden";
                   modal.classList.remove("show");
            }
            event.target.disabled = false;
    })
  }catch(err){
    alert(`Có lỗi trong quá trình đật vé`)
  }
  console.log('get thí far');
  event.target.disabled = false;
  
   // if(res.status == true) return console.log("OK")
   //  console.log("Not OK")
}



function postName(){
   return window.location.pathname.split("-")[2].toUpperCase() +" - "+window.location.pathname.split("-")[3].toUpperCase()
}

function formatDate(){
  let date = new Date();
  let dateString = "";
  dateString += `${date.getFullYear()}-`;

  if(date.getMonth()+1  < 10) dateString += `0${date.getMonth() +1}-`
  else dateString += `${date.getMonth()+1 }-`

  if(date.getDate() < 10) dateString += `0${date.getDate()}`
  else dateString += `${date.getDate()}`

  return dateString
}


// when user pick seats
var ticketToString ;

function seatPicker(){
  console.log("were heer")
  buttons.forEach((btn) =>{
    btn.addEventListener('click',(e)=>{
      if(e.target.className.includes("selected")) {

          btn.classList.remove("selected");
          seatNums --;
          for (var i = 0; i <  tickets.length; i++) {
              if(tickets[i] === btn.id)
                  tickets.splice(i,1);
          }
          $('.seats-detail').html(tickets.toString())
           console.log(tickets.toString())
         // document.querySelector('.seat-pick').textContent = `Số ghế ${tickets.toString()}`
          console.log(tickets)
      }
      else if(seatNums < 3){
          btn.classList.add("selected")
          seatNums ++;
          tickets.push(btn.id)
          $('.seats-detail').html(tickets.toString())

          console.log(tickets)
           console.log(tickets.toString())
         // document.querySelector('.seat-pick').textContent = `Số ghế ${tickets.toString()}`



      }
      else{
          alert("Bạn đã chọn đủ số ghế tối đa !")
      }
      if(tickets.length > 0) {
          $('#move-to-3').css('pointerEvents','unset')
          $('.total-price').html(`Tổng tiền: ${price * tickets.length} ₫`)
          $('.confirm-total-price').html(`Số tiền: ${price * tickets.length} ₫`)

      }
      else{
          $('.total-price').html(`Tổng tiền: 0₫`)      
          $('#move-to-3').css('pointerEvents','none')
      }
      
    });
  });
}
// config date picker
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() +  14);

  $("#basicDate").flatpickr({
    dateFormat:"Y-m-d",
    minDate:new Date(),
    maxDate:maxDate
});
 