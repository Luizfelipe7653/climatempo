import { useEffect, useState, } from "react";
import Capitais from "./capitais";


function Estados(props) {

    const [cidade, setCidade] = useState("");
    function SearchInput(e) {

        let correntValue = e
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${correntValue}&appid=c7f3427ea049078399fc436f303e45f2&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather } = data;
                if (sys !== undefined) {
                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                    setCidade(`
                <div>
                <img src= "${icon} " bgcolor= "red" width="70px"/>
                <h2>${Math.round(main.temp)}°</h2>
                <h2> ${sys.coutry}</h2>
                <h2> ${name}</h2>
                <h2> ${weather[0]['description']}</h2>
                </div>

                `)

                } else {
                    setCidade("");
                };
            }
            )
    }
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log( Math.round(Math.random() * 26) ); 
            SearchInput(Capitais[Math.round(Math.random() * 26)][0]);
            // SearchInput(ListaDeCapitais[2][0]); 
        }, 4000);
        return () => clearInterval(interval);
    });
    
    return (
        <div className="searchwraper">
            

            {
                (cidade !== "") ?
                    <div dangerouslySetInnerHTML={{ __html: cidade }} className="previsao" /> :
                    <div><h2>CARREGANDO......</h2></div>
            }
        </div>
    )
};
export default Estados;
