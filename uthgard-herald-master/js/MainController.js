app.controller('MainController', ['$scope', '$http', function($scope, $http){
    
    //--"Desperados.json" is a placeholder file. Link will be replaced --//
    //--by https://uthgard.org/herald/api/player/Desperados            --//
    $http.get("Desperados.json")
        .then(function(response) {
        
        
        //--GENERAL STATS--//
        $scope.level = response.data.Level;
        $scope.characterName = response.data.FullName;
        
        //--These variables separate the first letter from the rest of the name to--// 
        //--allow for Uthgard logo styling of the name.                           --//
        $scope.firstLetterOfName = $scope.characterName.substr(0,1);
        $scope.restOfName = $scope.characterName.substr(1);
        
        
        $scope.guildName = response.data.Raw.GuildName;
        $scope.realmRank = response.data.RealmRank;
        
        //--Realm Rank without Realm Level--//
        $scope.justRRank = Math.floor($scope.realmRank);
        
        //--Just the Realm Level--//
        $scope.justRLevel = (($scope.realmRank % 1).toFixed(1)) * 10;
        $scope.race = response.data.RaceName;
        $scope.characterClass = response.data.ClassName;
        $scope.houseTier = response.data.HouseTier;
        $scope.houseNumber = response.data.HouseNumber;
        $scope.lastLogin = response.data.LastLogin;
        
        //--RVR STATS--//
        
        $scope.relicsCaptured = response.data.RelicsCaptured;
        $scope.keepsCaptured = response.data.KeepsCaptured;
        $scope.keepBossKilled = response.data.KeepBossKilled;
        $scope.killStreak = response.data.KillStreak;
        $scope.nemesisDeaths = response.data.NemesisDeaths;
        $scope.nemesis = response.data.Nemesis;
        $scope.victimKills = response.data.VictimKills;
        $scope.victim = response.data.Victim;
        $scope.totalKills = response.data.TotalKills;
        $scope.soloKills = response.data.SoloKills;
        $scope.deaths = response.data.Deaths;
        $scope.rawKillDeathRatio = $scope.totalKills / $scope.deaths;
        $scope.killDeathRatio = $scope.rawKillDeathRatio.toFixed(2);
        $scope.rawSoloKillRatio = $scope.soloKills / $scope.totalKills;
        $scope.soloKillRatio = $scope.rawSoloKillRatio.toFixed(3);
        
        //--TRADE SKILL RELATED--//
        
        $scope.tradesTitle = response.data.TradesTitle;
        $scope.tradeskill1 = {
            name: response.data.TradeSkillOne.Name,
            skill: response.data.TradeSkillOne.Skill
        };
        $scope.tradeskill2 = {
            name: response.data.TradeSkillTwo.Name,
            skill: response.data.TradeSkillTwo.Skill
        };
        
        //--For class/race kill icons--//
        if (response.data.Raw.Realm == 1){
            $scope.realm1 = "midgard";
            $scope.realm2 = "hibernia";
        }
        if (response.data.Raw.Realm == 2){
            $scope.realm1 = "albion";
            $scope.realm2 = "hibernia";
        }
        if (response.data.Raw.Realm == 3){
            $scope.realm1 = "albion";
            $scope.realm2 = "midgard";
        }
    });
}]);