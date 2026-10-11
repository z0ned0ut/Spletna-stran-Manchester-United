// Menjava videza deluje na vseh treh podstraneh.
let gumbTema = document.getElementById("tema");
gumbTema.addEventListener("click", function () {
    document.body.classList.toggle("temna");
    let temna = document.body.classList.contains("temna");
    if (temna) {
        gumbTema.textContent = "Svetli način";
    } else {
        gumbTema.textContent = "Temni način";
    }
    gumbTema.setAttribute("aria-pressed", temna);
});

let igralci = [
    { ime: "Wayne Rooney", polozaj: "Napadalec" },
    { ime: "Cristiano Ronaldo", polozaj: "Napadalec" },
    { ime: "Paul Scholes", polozaj: "Vezist" },
    { ime: "Ryan Giggs", polozaj: "Vezist" },
    { ime: "David Beckham", polozaj: "Vezist" },
    { ime: "David De Gea", polozaj: "Vratar" }
];

let seznam = document.getElementById("igralci");
let iskanje = document.getElementById("iskanje");
let polozaj = document.getElementById("polozaj");

// Elementi za igralce obstajajo samo v navijaškem kotičku.
if (seznam) {
    function prikaziIgralce() {
        seznam.textContent = "";
        let stevilo = 0;
        let iskano = iskanje.value.trim().toLowerCase();

        for (let i = 0; i < igralci.length; i++) {
            let igralec = igralci[i];
            let ustrezaImenu = igralec.ime.toLowerCase().includes(iskano);
            let ustrezaPolozaju = polozaj.value === "vsi" || igralec.polozaj === polozaj.value;

            if (ustrezaImenu && ustrezaPolozaju) {
                let kartica = document.createElement("article");
                kartica.classList.add("igralec");
                let ime = document.createElement("h3");
                ime.textContent = igralec.ime;
                let opis = document.createElement("p");
                opis.textContent = igralec.polozaj;
                kartica.appendChild(ime);
                kartica.appendChild(opis);
                seznam.appendChild(kartica);
                stevilo++;
            }
        }
        let izpis = document.getElementById("stevilo");
        if (stevilo === 0) {
            izpis.textContent = "Noben igralec ne ustreza iskanju. Spremeni ime ali položaj.";
        } else {
            izpis.textContent = "Prikazani igralci: " + stevilo + " / " + igralci.length;
        }
    }
    iskanje.addEventListener("input", prikaziIgralce);
    polozaj.addEventListener("change", prikaziIgralce);
    prikaziIgralce();
}

let obrazec = document.getElementById("obrazec");
if (obrazec) {
    obrazec.addEventListener("submit", function (dogodek) {
        // Preprečimo osvežitev, da lahko rezultat izpišemo na isto stran.
        dogodek.preventDefault();
        let ime = document.getElementById("ime").value.trim();
        let emailPolje = document.getElementById("email");
        let email = emailPolje.value.trim();
        let letaPolje = document.getElementById("leta");
        let leta = letaPolje.value;
        let najljubsi = document.getElementById("najljubsi").value;
        let sporocilo = document.getElementById("sporocilo").value.trim();
        let potrditev = document.getElementById("potrditev").checked;
        let rezultat = document.getElementById("rezultat");
        let napaka = "";

        if (ime.length < 2) {
            napaka = "Ime ali vzdevek mora imeti vsaj 2 znaka.";
        } else if (email === "" || !emailPolje.validity.valid) {
            napaka = "Vnesi e-poštni naslov v pravilni obliki, npr. ime@gmail.com.";
        } else if (leta === "" || !letaPolje.validity.valid) {
            napaka = "Vnesi celo število let med 0 in 100.";
        } else if (najljubsi === "") {
            napaka = "Izberi najljubšega igralca.";
        } else if (sporocilo.length < 5) {
            napaka = "Napiši vsaj 5 znakov o tem, zakaj navijaš za klub.";
        } else if (!potrditev) {
            napaka = "Potrdi, da razumeš namen učnega obrazca.";
        }

        rezultat.hidden = false;
        rezultat.classList.remove("napaka", "uspeh");
        if (napaka !== "") {
            rezultat.textContent = napaka;
            rezultat.classList.add("napaka");
        } else {
            rezultat.textContent = "Živjo, " + ime + "! Za Manchester United navijaš " + leta +
                " let. Tvoj najljubši igralec iz izbora je " + najljubsi +
                ".\nTvoj razlog: " + sporocilo + "\nVnesena e-pošta: " + email;
            rezultat.classList.add("uspeh");
        }
    });
}
