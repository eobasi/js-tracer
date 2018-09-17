window.onload = function()
{
    jsTracer = new jsTracer();
    tracerBox = jsTracer.self;

    jsTracer.widthInput.value = parseInt(tracerBox.style.width);
    jsTracer.heightInput.value = parseInt(tracerBox.style.height);

    var offset = [0,0];
    var isDown = false;

    if( jsTracer.soundCookie.get() != '')
        jsTracer.toggleSound(jsTracer.soundCookie.get());
    else
        jsTracer.soundCookie.set('sound-on');

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
            
            jsTracer.xPostion.value = parseInt(tracerBox.style.top);
            jsTracer.yPostion.value = parseInt(tracerBox.style.left);
            
            jsTracer.playSound();
        }
    }, true);

    jsTracer.soundControl.onclick = function()
    {
        var soundState = 'sound-on';

        switch(this.className){
            case 'sound-on':
                soundState = 'sound-off';
                break;
            case 'sound-off':
                soundState = 'sound-on';
                break;
        }

        jsTracer.soundCookie.set(soundState);
        jsTracer.toggleSound(soundState);
    }

    document.getElementById('toggleBgColor').onchange = function(){
        tracerBox.style.backgroundColor = this.value;
    }

    document.getElementById('toggleTextColor').onchange = function(){
        tracerBox.style.color = this.value;
    }

    jsTracer.widthInput.onkeyup = function()
    {
        tracerBox.style.width = this.value + 'px';
    }

    jsTracer.heightInput.onkeyup = function()
    {
        tracerBox.style.height = this.value + 'px';
    }

    jsTracer.xPostion.onkeyup = function()
    {
        var pos = parseInt(this.value);
        tracerBox.style.top = pos + 'px';
    }

    jsTracer.yPostion.onkeyup = function()
    {
        var pos = parseInt(this.value);
        tracerBox.style.left = pos + 'px';
    }

    document.getElementById('textEditor').onkeyup = function(){
        tracerBox.textContent = this.value;
        jsTracer.playSound();
    }
}

jsTracer = function()
{
    this.soundCookie = new JS_TracerCookie('jsTracer.sound.switch');

    this.self = document.getElementById("tracerBox");
    this.style = this.self.style;

    this.widthInput = document.getElementById("widthInput");
    this.heightInput = document.getElementById("heightInput");

    this.xPostion = document.getElementById("x-position");
    this.yPostion = document.getElementById("y-position");

    this.soundControl = document.getElementById('toggleSound');
    this.soundPlayer = document.getElementById('soundPlayer');

    this.playSound = function()
    {
        if( this.soundCookie.get() == 'sound-on' ) this.soundPlayer.play();
    };

    this.toggleSound = function( state ){
        this.soundControl.className = state;
    };
    
    this.toggleBgColor = function( color ){
        this.style.backgroundColor = color;
    };
    
    this.toggleTextColor = function( color ){
        this.style.color = color;
    };
    
    this.resizeWidth = function( operator ){
        var width = this.style.width;
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
        this.style.width = newWidth+"px";
    };
    
    this.resizeHeight = function( operator ){
        var height = this.style.height;
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
            tracerBox.style.height ="50px";
            heightInput.value = 50;
        }
    };
}

JS_TracerCookie = function( name )
{
    this.cookie = document.cookie;
    this.name = name;

    this.set = function( value, exp, path )
    {
        value = this.name+"="+value;

        if( exp != undefined )
        {
            var d = new Date();
            d.setTime( d.getTime() + (exp*24*60*60*1000));
            value += '; expires='+d.toUTCString();
        }

        value += (path != undefined) ? '; path='+path : '';

        this.cookie = value;
    }

    this.get = function()
    {
        var name = this.name + "=";
        var decodedCookie = decodeURIComponent(this.cookie);
        var ca = decodedCookie.split(';');

        for(var i = 0; i <ca.length; i++)
        {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return '';
    }

    this.delete = function()
    {
        this.set('', -250);
    }
}