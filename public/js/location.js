const locForm = document.getElementById("location_form");
const locInput = document.getElementById("location_input");
const dataBlock = document.getElementById("location_data_block");

locForm.addEventListener('submit', (e) => {
    // prevent page from refreshing.
    e.preventDefault();
    fetchData();
})

async function fetchData()
{
    try {
        if (!locInput.value)
        {
            dataBlock.innerHTML="You must enter location"
        } else {
            // User entered location, call our server with that location
            const server_url = `http://localhost:3000/location/${locInput.value}`
            // default is GET
            let res = await fetch(server_url);
            // try reading response body as text
            // if response body is json we'll call res.json();
            let data = await res.text();
            if (res.ok)
            {
                dataBlock.innerHTML=data;
            } else {
               throw new Error(data);
            }
        }
    } catch (err)
    {
        dataBlock.innerHTML=err.message;
        console.log(err);
    }
}