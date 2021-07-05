$('#contact').click(()=>{
  window.scrollTo({
    top:$('.container').height(),
    behavior: 'smooth'
  })
})

$('#user-avt').mouseover(()=>{
  $('#user-avt').css({opacity: 0.5})
  console.log('ok');
}).mouseout(()=>{
  $('#user-avt').css({opacity: 1})
  console.log('ok');
}).click(() =>{
  document.getElementById('file-avt').click();
})


const input = document.querySelector('#file-avt')
input.addEventListener('change',() =>{
  document.querySelector('#form-avatar').submit()
})




const tableTicket = `<table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">Mã vé</th>
      <th scope="col">Mã chuyến</th>
      <th scope="col">Ngày đặt vé</th>
      <th scope="col">Số ghế</th>
      <th scope="col">Ngày Đi</th>
    


    </tr>
   
  </thead>
  <tbody>
   
   `
  let myTickets;
  let tickets;
  let ticketSelected;
  let price;
  const inputPassword =  document.querySelector('#password');
  let isClick = false;
$(document).ready(function(){

  $('.fa-eye').click(function(){
    console.log("Ấd")
    if(inputPassword.type == "text") {
      inputPassword.type = "password"
      console.log(inputPassword.type)
    }
    else  inputPassword.type = "text"
  })
  
  $('.profile-usermenu ul li').click(function(){
    var tab_id = $(this).attr('data-tab');
    console.log(tab_id)
    $('.profile-usermenu ul li').removeClass('active');
    $(this).addClass('active');
    $('.box').removeClass('show')
    $(`.change-${tab_id}-modal`).addClass('show')
    console.log("Asad")
    // $("#"+tab_id).addClass('current');
  })

  $('#change-ticket').click(async ()=>{
    if(isClick == false){
        $('.change-ticket-modal').html("");
        myTickets = tableTicket
        let dateGo ;
        const res = await fetch('http://localhost:5000/user/allTickets');
         tickets = await res.json();

        // const post =await  fetch(`http://localhost:5000/getPostDetails/${}`)
        // const postPrice = await post.json();
        // price = postPrice[0].Gia;
        console.log(tickets)
        let today = new Date().toLocaleDateString();

        tickets.forEach((ticket)=>{
          myTickets += ` <tr>
          <th scope="row">${ticket.MaVeXe}</th>
          <td>${ticket.MaCX}</td>
          <td>${new Date(ticket.NgayDat).toLocaleDateString()}</td>
          <td>${ticket.SoGhe}</td>
          <td>${new Date(ticket.NgayDi).toLocaleDateString()}</td>`
        //  dateGo = ticket.NgayDi.slice(0,10) + ticket
          if((new Date(today).getTime() - new Date(`${ticket.NgayDi}`).getTime() + 86400000) < 0)
              myTickets += `<td><button onclick="showModal(event)" data-post=${ticket.MaCX} id=${ticket.MaVeXe}>Hủy vé</button></td></tr>`
          else myTickets +=`</tr>`

        })
        myTickets += '</tbody></table>'
        $('.change-ticket-modal').html(myTickets)
        isClick = true;
    }
    
  })


  $('#saveResBtn').click(function(){
    document.querySelector('.form-pass').submit()
  })


  $('#saveEmailBtn').click(function(){
    document.querySelector('.form-email').submit()
  })

  // document.querySelector('.modal').style.display = 'block'
  document.querySelector('#close-modal').addEventListener('click',()=>{
      document.querySelector('#myModal').style.display = 'none'
      document.querySelector('#myModal2').style.display = 'none'

  })
  window.onclick = function(e){
    if(e.target == document.querySelectorAll('.modal')[0] ){
      document.querySelector('#credit').className = "input-cancle"
        document.querySelector('#myModal').style.display = 'none'
       // document.querySelector('#myModal2').style.display = 'none'
       }
    if(e.target == document.querySelectorAll('.modal')[1] ){
      document.querySelector('#credit').className = "input-cancle"
       // document.querySelector('#myModal').style.display = 'none'
        document.querySelector('#myModal2').style.display = 'none'
       }
}

})



function formatDate(){
  let date = new Date();
  let dateString = "";
  dateString += `${date.getFullYear()}-`;

  if(date.getMonth() +1 < 10) dateString += `0${date.getMonth() +1}-`
  else dateString += `${date.getMonth() +1}-`

  if(date.getDate() < 10) dateString += `0${date.getDate()}`
  else dateString += `${date.getDate()}`

  return dateString
}

async function showModal(e){
  document.querySelector('#myModal').style.display = 'block'
  const hiddenTicketId = document.querySelector('#hidden-ticketId');
  const res = await fetch(`http://localhost:5000/getPostDetails/${e.target.getAttribute("data-post")}`)
  const result = await res.json();
  price = result[0].DonGia;
  console.log(price)
  hiddenTicketId.value = e.target.id;

  for(let i = 0 ;i < tickets.length ; i++){
      if(tickets[i].MaVeXe === hiddenTicketId.value){
         ticketSelected = tickets[i];
         return console.log(ticketSelected)
      }
  }

}

// function handleCancledTicket(){

//   // const price = document.querySelector('#price')
//   // const ticketCMND = document.querySelector('#ticketCMND')
//   // const credit = document.querySelector('#credit')
  
  
//   //console.log($('#ticketCMND').text())

// }

async function handleCancledTicket(){
    const numbericRegex = new RegExp("^[0-9]{9,}");
    if(numbericRegex.exec(document.querySelector('#credit').value) == null) return document.querySelector('#credit').className += " invalid"
    document.querySelector('#confirm-cancle').disabled = true;

    fetch('http://localhost:5000/user/cancle',{
       method: 'POST',
        headers:{
            'Content-Type' :'application/json'
        },
        body: JSON.stringify({
          'MaVeXe':ticketSelected.MaVeXe,
          'STK':document.querySelector('#credit').value,
          'DonGia': price,
          "NgayHuy":formatDate(),
          "MaCX":ticketSelected.MaCX
        })
    })
    .then(res => res.json())
    .then(res =>{
      document.querySelector('#myModal').style.display = 'none'
      document.querySelector('#myModal2').style.display = 'block'
      console.log(res);
      isClick = false;
      $('#change-ticket').click()
    })
    document.querySelector('#myModal').style.display = 'none'
      document.querySelector('#myModal2').style.display = 'block'
      console.log(res);
      isClick = false;
      $('#change-ticket').click()

     
}





