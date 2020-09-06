module.exports = function (app,client) {
    app.post('/get_content/truyen', function(req, res) {
        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            let string = req.body.ten_truyen
            let query = {
                query: {
                    query_string: {
                      query: string,
                      default_operator: "and"
                    }
                  }
            }
          

            console.log(JSON.stringify(query))
            client.search({index: "menu_truyen", body: JSON.stringify(query)}).then(results => {
               
                res.send(results.hits.hits[0]._source)
            })
            
    })
}