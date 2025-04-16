function doInsertRowTable(num, nom, prenom, points){
        
        table = document.querySelector("table tbody");
    
        
         row = document.createElement("tr");
        
    
        row.setAttribute("class", "row");
        
       
         col1 = document.createElement("td");
         col2 = document.createElement("td");
         col3 = document.createElement("td");
         col4 = document.createElement("td");
         col5 = document.createElement("td");
        
      
        col1.innerText = num;
        col2.innerText = nom;
        col3.innerText = prenom;
        col4.innerText = points;

        col1.setAttribute("class", "col_number");
        col2.setAttribute("class", "col_text");
        col3.setAttribute("class", "col_text");
        col4.setAttribute("class", "col_text");
        col5.setAttribute("class", "col_chkbox");
        
     
         checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        
      
        col5.appendChild(checkbox);
        
        
        row.append(col1, col2, col3, col4, col5);
        
        table.appendChild(row);
}



persons = [
    {
        nom: "Nom1",
        prenom: "Prenom1",
        points: 5
    },
    {
        nom: "Nom2",
        prenom: "Prenom2",
        points: 10
    },
    {
        nom: "Nom3",
        prenom: "Prenom3",
        points: 15
    }
];

lignes = 0;
total_points = 0;

function init(){
    for (let i = 0; i < persons.length; i++) {
        doInsert(persons[i].nom, persons[i].prenom, persons[i].points);
    }
}

function doInsert(nom, prenom, points) {
    lignes++;
    total_points += parseInt(points);  
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

function consoleTableau(){
    console.log(persons);
}

function update_summary() {
    element_lignes = document.getElementById("p1"); 
    element_points = document.getElementById("p3");
    element_lignes.innerHTML = lignes + " ligne(s)";
    element_points.innerHTML = "Total point(s)= " + total_points;
}

function doNewData(){
     nom = document.getElementById("form_nom").value;
     prenom = document.getElementById("form_prenom").value;
     points = document.getElementById("form_points").value;

    // Vérifier que les champs ne sont pas vides
    if (nom === "" || prenom === "" || points === "") {
        alert("Veuillez remplir tous les champs!");
        return;
    }
    
    // Insérer les données dans le tableau
    doInsert(nom, prenom, points);
    
    // Insérer les données dans le tableau persons (not person)
    persons.push({nom: nom, prenom: prenom, points: points});
    
    // Vider les champs de saisie
    document.getElementById("form_nom").value = "";
    document.getElementById("form_prenom").value = "";
    document.getElementById("form_points").value = "";
}



function deleteRow() {
    if (lignes <= 0) {
        alert("Tableau déjà vide !");
        return;
    }

    let rows = document.querySelectorAll("tbody tr");
    let anyChecked = false;

    for (let i = rows.length - 1; i >= 0; i--) {
        let checkbox = rows[i].querySelector("input[type='checkbox']");

        if (checkbox && checkbox.checked) {
            if (!anyChecked) {
                // Only ask for confirmation once
                if (!confirm("Voulez-vous vraiment supprimer les lignes ?")) return;
                anyChecked = true;
            }

            let points = parseInt(rows[i].querySelector("td:nth-child(4)").textContent);
            total_points -= points;
            rows[i].remove();
            persons.splice(i, 1);
            lignes--;
        }
    }

    if (anyChecked) {
        alert("Ligne(s) supprimée(s) avec succès !");
        update_summary();
    } else {
        alert("Sélectionnez au moins une ligne !");
    }
}
