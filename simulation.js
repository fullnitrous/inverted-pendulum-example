var pend = document.querySelector(".pendulum");
var rad = document.querySelector(".rad");
var deg = document.querySelector(".deg");
var gravaccel = document.querySelector(".gravaccel");
var length = document.querySelector(".length");

function update_angle(angle)
{
	pend.style.transform = "rotate("+angle+"rad)";
	rad.innerHTML = "rad: " + String(Math.round(angle * 100) / 100, 2) + ", ";
	deg.innerHTML = "deg: " + String(Math.round(angle * (180/Math.PI) * 100) / 100);
	return;
}

function update_constants(g, L)
{
	gravaccel.innerHTML = "g: " + String(g) + " m/s^2, ";
	length.innerHTML = "L: " + String(L) + " m";
	return;
}

//-- simulation code begins here --//

const g = 9.82; //unit: m / s^2
const L = 1; //unit: m
const h = 0.001; //unit: seconds

update_constants(g, L);

function f(y)
{
    return (g / (L*L)) * Math.sin(y)
}

function y_next(y_last, y_now) 
{ 
    return f(y_now) * h * h - y_last + 2 * y_now; 
}

function simulate()
{
    //y0 = y(i - 1)
    //y1 = y(i)
    //y2 = y(i + 1)
    var y0, y1, y2; //radians
    
    const h_limit = 0.1; //seconds  
    var h_sum = 0; //seconds
        
    //initializers, define start angular velocity
    y0 = 0; //initial position
    y1 = 0.0001; //position after h seconds

    function loop()
    {
        y2 = y_next(y0, y1);
        y0 = y1;
        y1 = y2;

		update_angle(y2);

		h_sum += h;
		
		if(y2 >= Math.PI / 2) return;

        if(h_sum >= h_limit)
        {
            h_sum = 0;
            setTimeout(loop, h_limit * 1000);
        }
        else
        {
            loop();
		}
		return;
    }
	loop();
	return;
}

simulate();