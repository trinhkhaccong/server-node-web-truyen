module.exports = function (app,client) {
    app.post('/get/history', function(req, res) {
        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            let string = req.body.ten_truyen
            var string_query =""
            string.split(";").map((value,index)=>{
                if(value!="")
                {
                    if(index == 0)
                    {
                        string_query= "( id_ten:\""+value+"\")"
                    }
                    else{
                        string_query = string_query +" OR "+ "( id_ten:\""+value+"\")"
                    }
                }
            })
            console.log(string_query)
            let query = {
                size:15,
                query: {
                    query_string: {
                      query: string_query,
                      default_operator: "and"
                    }
                  }
            }
          

            console.log(JSON.stringify(query))
            client.search({index: "menu_truyen", body: JSON.stringify(query)}).then(results => {
                let data=[]
                results.hits.hits.map(value=>{
                    data.push(value._source)
                })
                res.send(data)
            })
            
    })
}