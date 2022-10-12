const locForm = document.getElementById("location_form");
const lon = document.getElementById("lon_input");
const lat = document.getElementById("lat_input");
const dataBlock = document.getElementById("weather_data_block");

locForm.addEventListener('submit', (e) => {
    e.preventDefault();
    Weatherpage();
})

async function Weatherpage()
{
    try {
        if (!lon.value )
        {
            dataBlock.innerHTML="You must enter Lon and Lat"
        } 
        if (!lat.value )
        {
            dataBlock.innerHTML="You must enter Lon and Lat"
        }
        else {
            const server_url = `http://localhost:3000/weather/${lon.value}/${lat.value}`;

             let res = await fetch(server_url);

            let data = await res.text();

            if (res.ok)
            {
                dataBlock.innerHTML=data;

            } else
            {
               throw new Error(data);
            }
        }
    } catch (err)
    {
        dataBlock.innerHTML=err.message;
        console.log(err);
    }
}