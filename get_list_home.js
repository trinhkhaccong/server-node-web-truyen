module.exports = function (app,client) {
    app.post('/get_list/type/home', function(req, res) {
        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            let string = req.body.type
            let query = {
                size:15,
                query: {
                    query_string: {
                      query: string,
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