window.onload = function()
{
    var tracerBox = document.getElementById("tracerBox");
    var widthInput = document.getElementById("widthInput");
    var heightInput = document.getElementById("heightInput");

    var xPostion = document.getElementById("x-position");
    var yPostion = document.getElementById("y-position");

    var offset = [0,0];
    var isDown = false;

    widthInput.value = parseInt(tracerBox.style.width);
    heightInput.value = parseInt(tracerBox.style.height);

    tracerBox.addEventListener('mousedown', function(e) {
        isDown = true;
        offset = [
            tracerBox.offsetLeft - e.clientX,
            tracerBox.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);
    
    document.addEventListener('mousemove', function(e) {
        event.preventDefault();
        if (isDown) {
            tracerBox.style.left = (e.clientX + offset[0]) + 'px';
            tracerBox.style.top  = (e.clientY + offset[1]) + 'px';
            
            xPostion.value = parseInt(tracerBox.style.top);
            yPostion.value = parseInt(tracerBox.style.left);
        }
    }, true);

    document.getElementById('toggleBgColor').onchange = function(){
        tracerBox.style.backgroundColor = this.value;
    }

    document.getElementById('toggleTextColor').onchange = function(){
        tracerBox.style.color = this.value;
    }

    widthInput.onkeyup = function()
    {
        tracerBox.style.width = this.value + 'px';
    }

    heightInput.onkeyup = function()
    {
        tracerBox.style.height = this.value + 'px';
    }

    xPostion.onkeyup = function()
    {
        var pos = parseInt(this.value);
        tracerBox.style.top = pos + 'px';
    }

    yPostion.onkeyup = function()
    {
        var pos = parseInt(this.value);
        tracerBox.style.left = pos + 'px';
    }

    document.getElementById('textEditor').onkeyup = function(){
        tracerBox.textContent = this.value;
    }
}

function toggleBgColor( color )
{
    tracerBox.style.backgroundColor = color;
}

function toggleTextColor( color )
{
    tracerBox.style.color = color;
}

function resizeWidth( operator )
{
    var width = tracerBox.style.width;
    var newWidth = 300;

    if( width != '' )
    {
        width = parseInt(width);

        switch(operator)
        {
            case "+":
                newWidth = width + 1;
                break;
            case "-":
                newWidth = width - 1;
                break;
            default:
                return;
        }
    }

    widthInput.value = newWidth;
    tracerBox.style.width = newWidth+"px";
}

function resizeHeight( operator )
{
    var height = tracerBox.style.height;
    var newHeight;

    if( height != '' )
    {
        height = parseInt(height);

        switch(operator)
        {
            case "+":
                newHeight = height + 1;
                break;
            case "-":
                newHeight = height - 1;
                break;
            default:
                return;
        }

        heightInput.value = newHeight;
        tracerBox.style.height = newHeight+"px";
    }
    else
    {
        tracerBox.style.height ="300px";
        heightInput.value = 300;
    }
}