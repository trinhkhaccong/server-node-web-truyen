module.exports = function (app,client) {
    app.post('/get_list/type/nomal', function(req, res) {
        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            let string = req.body.type
            let array_string = string.split("+")
            console.log(array_string)
            var string_query =""
            array_string.map((value,index)=>{
                if(index == 0)
                {
                    string_query = "(id_the_loai:"+value+")"
                } 
                else
                {
                    string_query =string_query + " OR (id_the_loai:"+value+")"
                } 
            })
            let query = {
                size:150,
                query: {
                    query_string: {
                      query: string_query,
                    }
                  }
            }
            client.search({index: "menu_truyen", body: JSON.stringify(query)}).then(results => {
                let data=[]
                results.hits.hits.map(value=>{
                    data.push(value._source)
                })
                res.send(data)
            })
            
    })
}