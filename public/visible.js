 $(document).ready(function(){
    var ga = document.createElement('script')
    ga.type ='text/javascript'
    ga.src = 'home.js'
    ga.id = 'invisible'
    document.body.appendChild(ga);
    $('#invisible').remove();

  })