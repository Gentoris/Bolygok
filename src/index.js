import './style.css';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Loaded')
    let response =  await fetch('/planets.json');
    let eredmeny = await response.json();
    document.getElementById('buttonOsszes').addEventListener('click', async () => {
        document.getElementById('OsszesListaz').textContent = "";
        response =  await fetch('/planets.json');
        eredmeny = await response.json();
        let bolygolista =  eredmeny.planets.map((a) => a);
        bolygolista.sort((a, b) => a.name.localeCompare(b.name))
        for (let bolygo of bolygolista) {
            let li = document.createElement('li');
            if (bolygo.dwarf)  {
                li.innerHTML = '<i>'+ bolygo.name +'</i>'
         
            } else {
                li.innerText = bolygo.name;

            }
            document.getElementById('OsszesListaz').appendChild(li);
        }
     
    })
    document.getElementById('buttonThem').addEventListener('click', async () => {
        response =  await fetch('/planets.json');
        eredmeny = await response.json();

        let areaList =  eredmeny.planets.map((a) => a.area);

        let size = areaList.map((a) => 2 * Math.sqrt(a / (4 * Math.PI)))

        document.getElementById('themList').textContent = size.join('; ')
        
    });

    document.getElementById('buttonminMax').addEventListener('click', async () => {
        document.getElementById('minMax').textContent= "";
        response =  await fetch('/planets.json');
        eredmeny = await response.json();

        let min = document.getElementById('minErtek').value;
        let max = document.getElementById('maxErtek').value;
        
        let bolygok = eredmeny.planets.map((a) => a);

        let filteredBolygok = bolygok.filter((a) => a.area >= min && a.area <= max)

        for (let bolygo of filteredBolygok) { 
            let li = document.createElement('li');
            li.textContent = bolygo.name + " Mérete: " + bolygo.area
             document.getElementById('minMax').appendChild(li);
        }
    });
    
    document.getElementById('osszTerulet').addEventListener('click', async () => {
        response =  await fetch('/planets.json');
        eredmeny = await response.json();
        let bolygok = eredmeny.planets.map((a) => a);
        if(document.getElementById('torpeBolygok').checked) {
            bolygok = bolygok.filter((a) => a.dwarf==true)
        } else {
            bolygok = bolygok.filter((a) => a.dwarf==false)
        }
        let sum = 0;

        for (let bolygo of bolygok) {  
            sum += bolygo.area;
        }
        document.getElementById('osszTeruletKiir').innerText = sum;
        



    })

})  