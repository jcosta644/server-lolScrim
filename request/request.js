var getSummonerByName = function(req, res){
	let name = req.body.name;
	let region = req.body.region;

	request('https://br.api.pvp.net/api/lol/'+ region +'/v1.4/summoner/by-name/'+ name + '?api_key='+ key, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		res.json(JSON.parse(body));
  		}
	});
}

var getRankedLeague = function(req, res){
	let id = req.body.id;
	let region = req.body.region;

	request('https://br.api.pvp.net/api/lol/'+ region +'/v2.5/league/by-summoner/'+ id + '/entry?api_key='+ key, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			res.json(JSON.parse(body));
		}
	});
}

var getChampionStatsBySummonerId = function(req, res){
	let id = req.body.id;
	let region = req.body.region;
	let lane = req.body.lane;

	request('https://br.api.pvp.net/api/lol/'+ region +'/v2.2/matchlist/by-summoner/'+ id +'?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5&seasons=SEASON2016&api_key='+ key, function(error, response, body){
		if(!error && response.statusCode == 200) {
		}
	});

	request('https://br.api.pvp.net/api/lol/'+ region +'/v1.3/stats/by-summoner/'+ id + '/ranked?api_key='+ key, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			let stats = JSON.parse(body);			
			stats.champions.forEach(function(item, index){
				if(item.id == 0){
					stats.champions.splice(index,1);
				}
			});

			stats.champions.sort(function(a,b) {
			    return a.stats.totalSessionsPlayed < b.stats.totalSessionsPlayed ? -1 : a.stats.totalSessionsPlayed > b.stats.totalSessionsPlayed ? 1 : 0;
			});

			res.json(stats.champions.slice(-3));
		}
	});
}
