var storage = window.localStorage;

function addLOCALSTORAGE(item){
    storage.setItem("3", item);
    window.alert("Added");
}

function getLOCALSTORAGE(){
    return storage.getItem("3");
}