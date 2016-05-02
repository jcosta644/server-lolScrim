$(document).on("ready", function(){

});

$("#btnSalvar").on("click", function(){
	console.log($("#summonerID").val() + " "+ $("#playerLane").val());
	$.ajax({
		url: "http://localhost:8000/api/requisicoes/championstats",
		type: "POST",
		data: {id: $("#summonerID").val(), region: "br", lane: $("#playerLane").val()},
		success: function(response){
			$("#mostPlayed").html(null);
			response.forEach(function(item, index){
				$.ajax({
					url: "http://localhost:8000/api/requisicoes/champion",
					type: "POST",
					data: {id: item.id, region: "br"},
					success: function(data){
						var formattedName = formatarString(data['name'].split('').join(''));

						$("#mostPlayed").prepend('<div class="block"><img src="http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/'+formattedName+'.png" alt="'+formattedName+'" height="60" width="60"><div class="information"><b>KDA</b> '+((item['stats']['totalChampionKills']+item['stats']['totalAssists'])/item['stats']['totalDeathsPerSession']).toFixed(1) +'<br><b>'+ (item['stats']['totalChampionKills']/item['stats']['totalSessionsPlayed']).toFixed(1)+' / '+(item['stats']['totalDeathsPerSession']/item['stats']['totalSessionsPlayed']).toFixed(1)+' / '+(item['stats']['totalAssists']/item['stats']['totalSessionsPlayed']).toFixed(1)+'</b><br>'+(item['stats']['totalMinionKills']/item['stats']['totalSessionsPlayed']).toFixed(1)+' <b>CS</b></div><div class="played">'+ item['stats']['totalSessionsPlayed'] +' Jogos<br><big>'+Math.round(( item['stats']['totalSessionsWon']/ item['stats']['totalSessionsPlayed'] ) * 100)+'%</big></div></div>');
					}
				});
			});
		}
	});
});

function formatarString(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}