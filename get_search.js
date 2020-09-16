module.exports = function (app,client) {
    app.post('/get/search', function(req, res) {
        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            let string = req.body.search

            let query = {
                size:5000,
                query: {
                    query_string: {
                      query: "(ten:"+JSON.stringify(string)+") OR (tac_gia:"+JSON.stringify(string)+")",
                     type:'phrase'
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