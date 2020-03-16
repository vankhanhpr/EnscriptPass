var formData = new FormData();
$(document).ready(function () {
    window.scrollTo(0, 0);
    //document.getElementById('customFile').addEventListener('change', handleFileSelect, false);
    window.onscroll = function () { myFunction() };

 
    function myFunction() {
        var navbarMenu = document.getElementById("navbar-menu");
        var topNavbarMenu = navbarMenu.offsetTop;
        var navbarLeft = document.getElementById("navbar-left");
        var topNavbarLeft = navbarLeft.offsetTop;
        if (window.pageYOffset >= 0) {
            var heightBanner = document.getElementById("banner-main-top").offsetHeight;
            if (window.pageYOffset >= heightBanner) {
                navbarMenu.style.top = "0";
                var heightMenu = navbarMenu.offsetHeight;
                navbarLeft.style.top = heightMenu + "px";
            } else {
                navbarMenu.style.top = (heightBanner - window.pageYOffset) + "px";
                var heightMenu = navbarMenu.offsetHeight + (heightBanner - window.pageYOffset);
                navbarLeft.style.top = heightMenu + "px";
            }
        }
    }   




    // document.getElementById("btn-upload").onchange = function(event) {
    //     var fileList = document.getElementById("btn-upload").files;
        //TODO do something with fileList.  
    // }
});

//Hàm kiểm tra IdentifyCard chỉ chứa số
jQuery('.datetimepicker').datetimepicker({
    i18n:{
     de:{
      months:[
       'Januar','Februar','März','April',
       'Mai','Juni','Juli','August',
       'September','Oktober','November','Dezember',
      ],
      dayOfWeek:[
       "So.", "Mo", "Di", "Mi", 
       "Do", "Fr", "Sa.",
      ]
     }
    },
    timepicker:false,
    format:'d/m/Y'
   });

  //Hàm kiểm tra Email, Họ và Tên 
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');

      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          
         
          var fullname = $("#fullname").val();
          var email = $("#email").val();
          if(email !== null || email !== "" ){ 
          form.classList.add('was-validated');
            $("#validate").addClass("error");
            event.preventDefault();
            event.stopPropagation();              
          }
                
          else{
          $("#validate").removeClass("error");
          form.classList.add('was-validated');
          }
         
        }, false);
      });
    }, false);
})();



  //ChangeAvatar
function handleFileSelect(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        var output = document.getElementById('user-avatar');
        output.src = dataURL;
        $(".img-profile > .btn-confirm, #user-avatar").show();
        $("#btnclose").click();
    };
    reader.readAsDataURL(input.files[0]);
    if (formData.get("avatar") != null) {
        formData.delete("avatar");
    }
    formData.append("avatar", input.files[0]);
};

function hidenPopup(classNm) {
    $("." + classNm).hide();
};

function showPopup(classNm) {
    $("." + classNm).show();
};

function resetDataPopAvatar() {
    //reset dat cua pop change avatar
    //1. remove file trong input file type
    $("#btn-upload").val(null);
    //2. remove hinh2 trong image tag
    document.getElementById('user-avatar').src = "images/avatar-1.jpg";
    //3. an imgae tag va btn confirm
    $(".img-profile > .btn-confirm, #user-avatar").hide();
};


