module.exports = function (app,client) {
    app.post('/get/truyen', function(req, res) {
        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            let id_ten = req.body.id_ten
            let id_chuong = req.body.id_chuong
            let query = {
                query:{
                    query_string:{
                    query:("id_ten:"+id_ten) + " AND id_chuong:"+id_chuong,
                    default_operator: "and"
                    }
                }
            }
          
            console.log(JSON.stringify(query))
            client.search({index: "data_truyen", body: JSON.stringify(query)}).then(results => {
                res.send( results.hits.hits[0]._source)
            })
            
    })
}