$(document).ready(function () {

    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });

    // footer insert
    $.get('/body_content?content=footer', function (data) {

            $('#footer').append(data);
        
        });

    // header instert
    $.get('header.html', function (data) {

            $('body').prepend(data);
        
        });
    

    // favicon 
    let link = $('link[rel~="icon"]');
    if (!link.length) {
        link = $('<link rel="icon" type="image/svg+xml">');
        $('head').append(link);
    };
    link.attr('href', '../static/svg/favicon.svg');

    $('.logo').click(function () {
        window.location.href = '/';
    });

    $(document).on('click', '.content_button, #footer .content_button', function () {
        var buttonText = $(this).text();
        var content = $(this).val();
        var button = $(this);
        button.prop('disabled', true);
        button.text('...');
        $.get('/body_content?content=' + content, function (data) {

            button.prop('disabled', false);
            button.text(buttonText);

            $('body').append('<div id="lightbox">' + '</div>');

            $('#lightbox').append('<button id="lightbox_close">&times;</button>');
            $('#lightbox').append(data);
            $('#lightbox').show();

            $('#lightbox_close').click(function (event) {
                $('#lightbox').remove();
            });
        });
    });
});
