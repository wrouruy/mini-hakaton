// import canvas and context from it
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

[cvs.width, cvs.height] = [500, 500];    // set up canvas size
ctx.font = '400 150px "Pixelify Sans"';  // set up own font

function randRGB(){ // the function for random RGB color
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
}

// changing icon when pressed the button
$('#save').click(() => {

    // fill the area with a gradient
    const gradient = ctx.createRadialGradient(0, 0, cvs.width, 0, 0, 0);   // create a gradient
    gradient.addColorStop(0, randRGB());                                   // add the first color
    gradient.addColorStop(1, randRGB());                                   // add the second color
    ctx.fillStyle = gradient;                                              // set gradient as fill color
    ctx.fillRect(0, 0, cvs.width, cvs.height);                             // finally, fill in the gradient on the canvas.

    // write the shortener name
    ctx.fillStyle = 'black'; // set color
    ctx.save();
    const text = [$('#firstname').val(), $('#secondname').val()].map((el) => el = el[0]).join('');   // getting the first letter from the names
    ctx.fillText(text, cvs.width / 2 - ctx.measureText(text).width / 2, cvs.height / 2 + 50);        // writing it in icon
    ctx.restore();
});

// for flipping coin
$('#flipCoin').click(() => {
    $('#coin').css('animation-name', 'flipCoin');  // set up animation for tossing a coin (around the y-axis)
    $('#coin').text('?');
    setTimeout(() => {
        $('#coin').css('animation-name', 'none');                          // remove the animation 
        $('#coin').text(Math.floor(Math.random() * 2) == 0 ? '1' : '$');   // write what the user got (heads or tails)
    }, 880) // timeout when animation is over
});

// change background gradient
$('#blendColor').click(() => {
    $('.colorBlendScreen').css('background',
        `linear-gradient(0.25turn, ${$('#firstColor').val()}, ${$('#secondColor').val()})`);
});

// scroll down the page by clicking the button
let scrollIteraion = 1;   // a variable that shows how many times we press the button
$('#toNextPage').click(() => {
    scrollIteraion++;
    $('body > div').eq(scrollIteraion).css('display', 'flex');  // show the following screen
    $('body hr').eq(scrollIteraion - 1).css('display', 'flex'); // show the following hr
    $('hr').eq(0).css('display', 'flex');                       // show the first hr
    window.scroll(0, window.innerHeight * scrollIteraion);      // scroll a window

    if(scrollIteraion >= 4){
        $('.unlock').css('top', 0);              // show unlocker
        $('html').css('overflow', 'hidden');     // do not allow the user to scroll, when unlocker show
        $('#toNextPage').css('display', 'none'); // remove this button if we can't scroll any further
    }
});

// swipe to hide unlock screen
$('#unlockInput').on('input', () => {
    if($('#unlockInput').val() == 10){                  // if we swipe to end
        $('.unlock').css('animation-name', 'unlock');   // set css animation for get transparency to element
        setTimeout(() => {                              // wait until css animation end
            $('html').css('overflow', 'scroll');        // allow user to scroll the page
            $('.unlock').css('display', 'none');        // finally, remove the element
        }, 450);
    }
});