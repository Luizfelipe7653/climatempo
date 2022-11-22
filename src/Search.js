import { useState, } from "react";


function Search(props) {

    const [cidade, setCidade] = useState("");
    function SearchInput(e) {
        e.preventDefault();
        let correntValue = document.querySelector('input[name=SearchInput]').value;
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${correntValue}&appid=c7f3427ea049078399fc436f303e45f2&units=metric`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const {main, name, sys, weather } = data;
            if (sys !== undefined){
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
            
            } else{
                setCidade("");
            };
     }
    )}

    return(
        <div className="searchwraper">
            <div className="search">
                <h2> DIGITE O NOME DA CIDADE :</h2>
                <form onSubmit={(e) => SearchInput(e)}>
                    <input className="search-input" placeholder={props.placeholder} type="text" name="SearchInput"/>
                    <input className="input" type="submit" value="PESQUISAR POR CIDADE !"/>
                </form>
        </div>

        {
           (cidade !== "") ?
            <div dangerouslySetInnerHTML={{__html: cidade}} className="previsao"/>:
            <div><h2>Pesquise algo Acima ......</h2></div>
        }
        </div>
    )
};
export default Search;
