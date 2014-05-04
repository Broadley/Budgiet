$(document).ready(function(){

    $('#form1').submit(function(event) {
        alert('1');
        event.preventDefault();
        var form = $(this);
        if (document.getElementById('password').value == document.getElementById('password2').value){
            alert('2');
            $.post('http://www.ibenn.co.uk/budgietRegister.php', form.serialize(), function(data){
                alert(data);
                //if (data[0].boolean == true) {
                //window.location.href="index.html";
                //} else {
                //window.location.href="index53453.html";
                //}
            });
        } else {
            window.location.href="register.html";
        }

    });

});