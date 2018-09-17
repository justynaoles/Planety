( function(){
    
        var table = document.querySelector('table');
        var thead = table.querySelector('thead');
        var tableheaders = thead.querySelectorAll('th'); /*nagłówki tabeli*/
        var tbody = document.querySelector('tbody');
        var lines = tbody.querySelectorAll('tbody tr');  /*wiersze tabeli*/
        
        
        // funkcja czyści  dodane wcześniej klasy
           function remove(nodeList){
                for (var x = 0; x<nodeList.length; x++){
                    nodeList[x].classList.remove('sortdown');
                    nodeList[x].classList.remove('sortup');
                    nodeList[x].classList.remove('show');   
                }
            }


        //funkcja pomocniczna do tworzenia tablic
        function makeArray(nodeList) {
            var arr =[];
    
            for (var i = 0; i<nodeList.length; i++) {
                arr.push(nodeList[i]); 
            }
            return arr;
        }
        
     
     //przypisanie zdarzenia do kliknięcia na dany nagłówek tabeli
    for (var j =0; j<tableheaders.length; j++) {
        tableheaders[j].addEventListener('click', sortBy);
    }
        
        

      //funkcja sortująca dane w tabeli
        function sortBy(e) {

            var target = e.target;
            var classname = target.classList.contains("integer");
            var attribute = target.hasAttribute('data-order');
            var thArr = makeArray(tableheaders);
            var index = thArr.indexOf(target);
            var trArr = makeArray(lines);
            var df = document.createDocumentFragment();
            var order =(target.classList.contains('notsorted') || target.classList.contains('sortdown')) ? 'sortup' : 'sortdown';
            var td = tbody.querySelectorAll('td');
    
       
         remove(tableheaders); //usunięcie klas z nagłowka tabeli za pomocą funkcji linia 11
         remove(td); //usunięcie klas z wierszy tabeli za pomocą funkcji linia 11
            
    //warunek sprawdza czy mamy klase  integer
            if(classname) {
                
                    trArr.sort(function (a,b) {
                    var a = a.children[index].textContent;
                    var b = b.children[index].textContent;
    
                    
            if(parseFloat(a) < parseFloat(b)) {
            return order === 'sortdown' ? -1 : 1;
            } 
            else if(parseFloat(a) > parseFloat(b)) {
                return order === 'sortdown' ? 1 : -1;
                } 
            else {
                return 0;
                }

            });      
        }
            
            
    //sprawdzam czy posiada atrybut 'data-order'  
            else if (attribute)  {
   
                    trArr.sort(function (a,b) {
                    var a = a.children[index].getAttribute('data-order');
                    var b = b.children[index].getAttribute('data-order');
     
        if(a<b) {
            return order === 'sortdown' ? 1 : -1;
            } 
        else if(a>b) {
            return order === 'sortdown' ? -1 : 1;
            } 
        else {
            return 0;
            }
     
                });
            }
            
    //pozostałe sortowanie np. alfabetycznie
            
            else {    
                
                trArr.sort(function (a,b) {
                var a = a.children[index].textContent;
                var b = b.children[index].textContent;

            if(a<b) {
                return order === 'sortdown' ? 1 : -1;
                    } 
            else if(a>b) {
                return order === 'sortdown' ? -1 : 1;
                    } 
            else {
                return 0;
                }
 
           
                });}


    //po sortowaniu muszę wstawić elementy wg nowego porządku do dokumentu   
    trArr.forEach(function(tr) {
        df.appendChild(tr);
    });
           
   
    //poniższy kod jest na potrzeby modyfikacji tabeli dla mobile, tr musi miec display "block" a nie jak domyśle "table-cell"       
    trArr.forEach(function(tr) {
       tr.children[index].classList.add('show');
    });
            
 
    target.classList.add(order); //dodajemy klasę po kliknięciu sortDown/sprtUp
    target.classList.remove("notsorted"); 
    table.querySelector("tbody").appendChild(df); //wstawiamy fragment dokumentu w związku z posortowaniem
            
    //koniec funkcji sortBy        
            
        }         
})();
 

