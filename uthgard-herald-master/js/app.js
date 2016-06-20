//--BEGIN ANGULAR JS--//
var app = angular.module("myApp", []);

//--BEGIN CUSTOM JQUERY--//

$(document).ready(function(){
    
//    $("#player-section").hide();
    
    //--Mobile First Compatibility--//    
    size();
    
    $(window).resize(function(){
        size();
    });
    
    function size(){
        if($(window).width() <= 1199){
            $("#rp-rankings").prependTo($(".mod-row:nth-of-type(2)"));
            $("#pve-kills").appendTo($(".mod-row:nth-of-type(3)"));
            $("#misc-info").appendTo($(".mod-row:nth-of-type(3)"));
        }
        else {
            $("#rp-rankings").appendTo($(".mod-row:nth-of-type(1)"));
            $("#pve-kills").appendTo($(".mod-row:nth-of-type(2)"));
            $("#misc-info").appendTo($(".mod-row:nth-of-type(2)"));
        }

        var emblem = $("#guild-emblem");
        
        if($(window).width() <= 767){
            $("#player-avatar").after(emblem);
            $(".mod-row").removeClass("row");
        }
        else {
            $("#player-avatar").before(emblem);
            $(".mod-row").addClass("row");
        }
    }
    
    //--Load RESTful API data--//
    $.ajax({
        //To be replaced with searched result
        url: "Desperados.json"
    }).then(function(response) {
        
        //--Load emblem--//
        var emblemID = response.Raw.EmblemID;
        
        $("#emblem").attr("src", "https://herald.uthgard.org/Emblem/emblem.php?id=" + emblemID);
        
        //--Player avatar--//
        $("#avatar").attr("src", "http://images.uthgard.org/players/" + response.Raw.Name + ".jpg");
        
        //--General--//
        var playerRealm = response.Raw.Realm;
        var progressXP = response.XP_Percent;

        //--Races Killed--//
        //--Albion--//
        if (playerRealm == 2 || playerRealm == 3){
            var britonsKilled = response.BritonKilled;
            var saracensKilled = response.SaracenKilled;
            var highlandersKilled = response.HighlanderKilled;
            var avaloniansKilled = response.AvalonianKilled;
            var inconnuKilled = response.InconnuKilled;
        }
        //--Midgard--//
        if (playerRealm == 1 || playerRealm == 3){
            var norseKilled = response.NorseKilled;
            var koboldKilled = response.KoboldKilled;
            var trollKilled = response.TrollKilled;
            var dwarfKilled = response.DwarfKilled;
            var valkynKilled = response.ValkynKilled;
        }
        //--Hibernia--//
        if (playerRealm == 2 || playerRealm == 1){
            var celtKilled = response.CeltKilled;
            var lurikeenKilled = response.LurikeenKilled;
            var firbolgKilled = response.FirbolgKilled;
            var elfKilled = response.ElfKilled;
            var sylvanKilled = response.SylvanKilled;
        }
        
        //--Classes Killed--//
        //--Albion--//
        if (playerRealm == 2 || playerRealm == 3){
            var armsmanKilled = response.Armsman;
            var cabalistKilled = response.Cabalist;
            var clericKilled = response.Cleric;
            var friarKilled = response.Friar;
            var infiltratorKilled = response.Infiltrator;
            var mercenaryKilled = response.Mercenary;
            var minstrelKilled = response.Minstrel;
            var necromancerKilled = response.Necromancer;
            var paladinKilled = response.Paladin;
            var reaverKilled = response.Reaver;
            var scoutKilled = response.Scout;
            var sorcererKilled = response.Sorcerer;
            var wizardKilled = response.Wizard;
            var theurgistKilled = response.Theurgist;
        }
        //--Midgard--//
        if (playerRealm == 1 || playerRealm == 3){
            var berserkerKilled = response.Berserker;
            var bonedancerKilled = response.Bonedancer;
            var healerKilled = response.Healer;
            var hunterKilled = response.Hunter;
            var runemasterKilled = response.Runemaster;
            var savageKilled = response.Savage;
            var shadowbladeKilled = response.Shadowblade;
            var shamanKilled = response.Shaman;
            var skaldKilled = response.Skald;
            var spiritmasterKilled = response.Spiritmaster;
            var thaneKilled = response.Thane;
            var warriorKilled = response.Warrior;
        }
        //--Hibernia--//
        if (playerRealm == 2 || playerRealm == 1){
            var animistKilled = response.Animist;
            var bardKilled = response.Bard;
            var blademasterKilled = response.Blademaster;
            var championKilled = response.Champion;
            var druidKilled = response.Druid;
            var eldritchKilled = response.Eldritch;
            var enchanterKilled = response.Enchanter;
            var heroKilled = response.Hero;
            var mentalistKilled = response.Mentalist;
            var nightshadeKilled = response.Nightshade;
            var rangerKilled = response.Ranger;
            var valewalkerKilled = response.Valewalker;
            var wardenKilled = response.Warden;
        }

        //--RvR--//
        var progressRealmLevel = response.RP_Percent;
        var realmRank = response.RealmRank;
        //--Sorry, this is probably a nightmare to look at. It moves RP_Percent  --//
        //--decimal place to the left once, adds it to realm level (by removing  --//
        //--the realm rank from RealmRank), then multiplies it by 100 for the    --//
        //--progress bar on the Progress chart.                                  --// 
        var progressRealmRank = (((progressRealmLevel / Math.pow(10, 1)) + realmRank) - Math.floor(realmRank)) * 100;
        var totalKills = response.TotalKills;
        var realmOneKills;
        var realmTwoKills;
        if (playerRealm == 1){
            realmOneKills = response.TotalHiberniaKills;
            realmTwoKills = response.TotalMidgardKills;
        }
        if (playerRealm == 2){
            realmOneKills = response.TotalHiberniaKills;
            realmTwoKills = response.TotalAlbionKills;
        }
        if (playerRealm == 3){
            realmOneKills = response.TotalAlbionKills;
            realmTwoKills = response.TotalMidgardKills;
        }
        var deathblows = response.Deathblows;
        var soloKills = response.SoloKills;
        //--RPs over the last 7 days: Index 0 is today, index 1 is yesterday, etc.--//
        var RpLastSevenDays = response.RPsLastSevenDays;
        var RpLastTwelveMonths = response.RPsLastTwelveMonths;

        //--PvE--//
        var legionKilled = response.LegionKills;
        var epicSiBossKilled = response.EpicSIBossKills;
        var epicSiDragonKilled = response.EpicSIDragonKills;
        var grandSummonerKilled = response.GrandSummonerKills;
        var dragonKilled = response.DragonKills;
        
        
        //--BEGIN CUSTOM CHART.JS | REFER TO http://www.chartjs.org/docs/ FOR DOCUMENTATION--//

        //--BEGIN KILL STATS CHART--//
        var killStatsCanvas = document.getElementById("kill-stats");
        var killStatsChart = new Chart(killStatsCanvas, {
            type: 'bar',
            data: {
                labels: ["Total Kills", "Hibernia Kills", "Midgard Kills", "Deathblows", "Solo Kills"],
                datasets: [{
                    label: 'RvR Kills',
                    data: [totalKills, realmOneKills, realmTwoKills, deathblows, soloKills],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display:true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        //--END KILL STATS CHART--//


        //--BEGIN PVE STATS CHART--//
        
        var mobsKilledCanvas = document.getElementById("mobs-killed");
        var mobsKilledChart = new Chart(mobsKilledCanvas, {
            type: 'pie',
            data: {
                labels: ["Dragon", "Legion", "Apocalypse", "Xanxicar", "Grand Summoner"],
                datasets: [{
                    label: 'PvE Kills',
                    data: [dragonKilled, legionKilled, epicSiBossKilled, epicSiDragonKilled, grandSummonerKilled],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(100, 26, 86, 0.2)',
                        'rgba(255, 20, 0, 0.2)',
                        'rgba(0, 106, 255, 0.2)',
                        'rgba(255, 144, 144, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(100, 26, 86, 1)',
                        'rgba(255, 20, 0, 1)',
                        'rgba(0, 106, 255, 1)',
                        'rgba(255, 144, 144, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {           
                display: false
            }
        });
        //--END PVE STATS CHART--//

        //--BEGIN RACE KILLS STATS CHART--//

        //--These variables are determined by which realm the character is a member of.--//
        var labels1;
        var labels2;
        var killStats1;
        var killStats2;
        var killStats3;
        var killStats4;

        //--Labels of races killed, followed by the title labels, followed by appropriate chart colors (opaque first, transparent second).--//
        var albionLabels = [
            "Briton", "Saracen", "Highlander", "Avalonian", "Inconnu",
            "Members of Albion Killed",
            'rgba(255, 20, 0, 1)', 'rgba(255, 20, 0, 0.2)',
            "Armsman", "Cabalist", "Cleric", "Friar", "Infiltrator", "Mercenary",
            "Minstrel", "Necromancer", "Paladin", "Reaver", "Scout", "Sorcerer",
            "Wizard", "Theurgist"
        ];
        var midgardLabels = [
            "Norse", "Kobold", "Troll", "Dwarf", "Valkyn", 
            "Members of Midgard Killed",
            'rgba(0, 100, 250, 1)', 'rgba(0, 100, 250, 0.2)',
            "Berserker", "Bonedancer", "Healer", "Hunter", "Runemaster", "Savage",
            "Shadowblade", "Shaman", "Skald", "Spiritmaster", "Thane", "Warrior"
        ];
        var hiberniaLabels = [
            "Celt", "Lurikeen", "Firbolg", "Elf", "Sylvan",
            "Members of Hibernia Killed",
            'rgba(0, 206, 86, 1)', 'rgba(0, 206, 86, 0.2)',
            "Animist", "Bard", "Blademaster", "Champion", "Druid", "Eldritch",
            "Enchanter", "Hero", "Mentalist", "Nightshade", "Ranger",
            "Valewalker", "Warden"
        ];        
        
        //--Stats of races/classes killed. One of these variables in null depending on character's realm.--//
        var albionRaceKills = [britonsKilled, saracensKilled, highlandersKilled, avaloniansKilled, inconnuKilled];
        var midgardRaceKills = [norseKilled, koboldKilled, trollKilled, dwarfKilled, valkynKilled];
        var hiberniaRaceKills = [celtKilled, lurikeenKilled, firbolgKilled, elfKilled, sylvanKilled];
        
        var albionClassKills = [
            armsmanKilled,
            cabalistKilled,
            clericKilled,
            friarKilled,
            infiltratorKilled,
            mercenaryKilled,
            minstrelKilled,
            necromancerKilled,
            paladinKilled,
            reaverKilled,
            scoutKilled,
            sorcererKilled,
            wizardKilled,
            theurgistKilled
        ]
        
        var midgardClassKills = [
            berserkerKilled,
            bonedancerKilled,
            healerKilled,
            hunterKilled,
            runemasterKilled,
            savageKilled,
            shadowbladeKilled,
            shamanKilled,
            skaldKilled,
            spiritmasterKilled,
            thaneKilled,
            warriorKilled
        ]
        

        var hiberniaClassKills = [
            animistKilled,
            bardKilled,
            blademasterKilled,
            championKilled,
            druidKilled,
            eldritchKilled,
            enchanterKilled,
            heroKilled,
            mentalistKilled,
            nightshadeKilled,
            rangerKilled,
            valewalkerKilled,
            wardenKilled
        ]
        
        //--Determing labels and datasets.--//
        if (playerRealm == 1){
            labels1 = midgardLabels;
            labels2 = hiberniaLabels;
            killStats1 = midgardRaceKills;
            killStats2 = hiberniaRaceKills;
            killStats3 = midgardClassKills;
            killStats4 = hiberniaClassKills;
        }
        if (playerRealm == 2){
            labels1 = albionLabels;
            labels2 = hiberniaLabels;
            killStats1 = albionRaceKills;
            killStats2 = hiberniaRaceKills;
            killStats3 = albionClassKills;
            killStats4 = hiberniaClassKills;
        }
        if (playerRealm == 3){
            labels1 = albionLabels;
            labels2 = midgardLabels;
            killStats1 = albionRaceKills;
            killStats2 = midgardRaceKills;
            killStats3 = albionClassKills;
            killStats4 = midgardClassKills;
        }
        
        //--Tabs--//
        var raceKillsTabs = $(".special-kills");
        
        var racesKilledCanvas1 = document.getElementById("races-killed1");
        var racesKilledCanvas2 = document.getElementById("races-killed2");

        var classesKilledCanvas1 = document.getElementById("classes-killed1");
        var classesKilledCanvas2 = document.getElementById("classes-killed2");
        
        $(racesKilledCanvas1).hide();
        $(racesKilledCanvas2).hide();
        $(classesKilledCanvas1).hide();
        $(classesKilledCanvas2).hide();
        $(racesKilledCanvas1).show();
        
        raceKillsTabs.on("click", function(){
            
            for (var i in raceKillsTabs){
                raceKillsTabs.removeClass("active-tab");
            }
            
            $(this).addClass("active-tab");
            
            if ($(".special-kills:eq(0)").hasClass("active-tab")){
                $(racesKilledCanvas1).hide();
                $(racesKilledCanvas2).hide();
                $(classesKilledCanvas1).hide();
                $(classesKilledCanvas2).hide();
                $(racesKilledCanvas1).show();
                racesKilledCanvas1.render();
            }

            if ($(".special-kills:eq(1)").hasClass("active-tab")){
                $(racesKilledCanvas1).hide();
                $(racesKilledCanvas2).hide();
                $(classesKilledCanvas1).hide();
                $(classesKilledCanvas2).hide();
                $(racesKilledCanvas2).show();
                racesKilledCanvas2.render();
            }

            if ($(".special-kills:eq(2)").hasClass("active-tab")){
                $(racesKilledCanvas1).hide();
                $(racesKilledCanvas2).hide();
                $(classesKilledCanvas1).hide();
                $(classesKilledCanvas2).hide();
                $(classesKilledCanvas1).show();
            }

            if ($(".special-kills:eq(3)").hasClass("active-tab")){
                $(racesKilledCanvas1).hide();
                $(racesKilledCanvas2).hide();
                $(classesKilledCanvas1).hide();
                $(classesKilledCanvas2).hide();
                $(classesKilledCanvas2).show();
            }
        });

        //--Begin Charts--//
        var racesKilledChart1 = new Chart(racesKilledCanvas1, {
            type: 'bar',
            data: {
                labels: [labels1[0], labels1[1], labels1[2], labels1[3], labels1[4]],
                datasets: [{
                    label: labels1[5],
                    data: killStats1,
                    backgroundColor: [
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7]
                    ],
                    borderColor: [
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6]
                    ],
                    borderWidth: 1
                }]
            }
        });

        var racesKilledChart2 = new Chart(racesKilledCanvas2, {
            type: 'bar',
            data: {
                labels: [labels2[0], labels2[1], labels2[2], labels2[3], labels2[4]],
                datasets: [{
                    label: labels2[5],
                    data: killStats2,
                    backgroundColor: [
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7]
                    ],
                    borderColor: [
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6]
                    ],
                    borderWidth: 1
                }]
            },
        });
        
        var classesKilledChart1 = new Chart(classesKilledCanvas1, {
            type: 'bar',
            data: {
                labels: [labels1[8], labels1[9], labels1[10], labels1[11], labels1[12], labels1[13], labels1[14], labels1[15], labels1[16], labels1[17], labels1[18], labels1[19]],
                datasets: [{
                    label: labels1[5],
                    data: killStats3,
                    backgroundColor: [
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7],
                        labels1[7]
                    ],
                    borderColor: [
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6],
                        labels1[6]
                    ],
                    borderWidth: 1
                }]
            },
        });
        
        if (playerRealm == 2 || playerRealm == 3){
            classesKilledChart1.data.labels.push(labels1[20]);
            classesKilledChart1.data.labels.push(labels1[21]);
            classesKilledChart1.update();
        }
        
        var classesKilledChart2 = new Chart(classesKilledCanvas2, {
            type: 'bar',
            data: {
                labels: [labels2[8], labels2[9], labels2[10], labels2[11], labels2[12], labels2[13], labels2[14], labels2[15], labels2[16], labels2[17], labels2[18], labels2[19]],
                datasets: [{
                    label: labels2[5],
                    data: killStats4,
                    backgroundColor: [
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7],
                        labels2[7]
                    ],
                    borderColor: [
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6],
                        labels2[6]
                    ],
                    borderWidth: 1
                }]
            },
        });

        if (playerRealm == 1 || playerRealm == 2){
            classesKilledChart2.data.labels.push(labels2[20]);
        }
        //--END RACE KILL STATS CHART--//

        //--BEGIN RP STATS CHART--//
        
        //--Tabs--//
        var rankingsTabs = $(".rankings");

        var weeklyRpsCanvas = document.getElementById("weekly-rp-canvas");
        var yearlyRpsCanvas = document.getElementById("yearly-rp-canvas");

        var weeklyRankCanvas = document.getElementById("weekly-rank-canvas");
        var overallRankCanvas = document.getElementById("overall-rank-canvas");

        $(weeklyRpsCanvas).hide();
        $(yearlyRpsCanvas).hide();
        $(weeklyRankCanvas).hide();
        $(overallRankCanvas).hide();
        $(weeklyRpsCanvas).show();

        rankingsTabs.on("click", function(){

            for (var i in rankingsTabs){
                rankingsTabs.removeClass("active-tab");
            }

            $(this).addClass("active-tab");

            if ($(".rankings:eq(0)").hasClass("active-tab")){
                $(weeklyRpsCanvas).hide();
                $(yearlyRpsCanvas).hide();
                $(weeklyRankCanvas).hide();
                $(overallRankCanvas).hide();
                $(weeklyRpsCanvas).show();
                weeklyRpsCanvas.render();
            }

            if ($(".rankings:eq(1)").hasClass("active-tab")){
                $(weeklyRpsCanvas).hide();
                $(yearlyRpsCanvas).hide();
                $(weeklyRankCanvas).hide();
                $(overallRankCanvas).hide();
                $(yearlyRpsCanvas).show();
                yearlyRpsCanvas.render();
            }

            if ($(".rankings:eq(2)").hasClass("active-tab")){
                $(weeklyRpsCanvas).hide();
                $(yearlyRpsCanvas).hide();
                $(weeklyRankCanvas).hide();
                $(overallRankCanvas).hide();
                $(weeklyRankCanvas).show();
            }

            if ($(".rankings:eq(3)").hasClass("active-tab")){
                $(weeklyRpsCanvas).hide();
                $(yearlyRpsCanvas).hide();
                $(weeklyRankCanvas).hide();
                $(overallRankCanvas).hide();
                $(overallRankCanvas).show();
            }
        });

        var monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var date = new Date();
        var currentDay = date.getDay();
        var currentMonth = date.getMonth();

        var weeklyRpChart = new Chart(weeklyRpsCanvas, {
            type: 'line',
            data: {
                labels: [
                    //--It looks funky, but it gets the job done O_o --//
                    daysOfWeek[(((currentDay - 6) % 7) +7) % 7], 
                    daysOfWeek[(((currentDay - 5) % 7) +7) % 7], 
                    daysOfWeek[(((currentDay - 4) % 7) +7) % 7], 
                    daysOfWeek[(((currentDay - 3) % 7) +7) % 7], 
                    daysOfWeek[(((currentDay - 2) % 7) +7) % 7],
                    daysOfWeek[(((currentDay - 1) % 7) +7) % 7],
                    daysOfWeek[currentDay]
                ],
                datasets: [{
                    label: 'Weekly RPs',
                    data: [RpLastSevenDays[6], RpLastSevenDays[5], RpLastSevenDays[4], RpLastSevenDays[3], RpLastSevenDays[2], RpLastSevenDays[1], RpLastSevenDays[0]],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        
        var yearlyRpChart = new Chart(yearlyRpsCanvas, {
            type: 'line',
            data: {
                labels: [
                    //--It looks funky, but it gets the job done O_o --//
                    monthsOfYear[(((currentMonth - 11) % 12) +12) % 12],
                    monthsOfYear[(((currentMonth - 10) % 12) +12) % 12],
                    monthsOfYear[(((currentMonth - 9) % 12) +12) % 12],
                    monthsOfYear[(((currentMonth - 8) % 12) +12) % 12],
                    monthsOfYear[(((currentMonth - 7) % 12) +12) % 12],
                    monthsOfYear[(((currentMonth - 6) % 12) +12) % 12], 
                    monthsOfYear[(((currentMonth - 5) % 12) +12) % 12], 
                    monthsOfYear[(((currentMonth - 4) % 12) +12) % 12], 
                    monthsOfYear[(((currentMonth - 3) % 12) +12) % 12], 
                    monthsOfYear[(((currentMonth - 2) % 12) +12) % 12],
                    monthsOfYear[(((currentMonth - 1) % 12) +12) % 12],
                    monthsOfYear[currentMonth]
                ],
                datasets: [{
                    label: 'Weekly RPs',
                    data: [RpLastTwelveMonths[0], RpLastTwelveMonths[1], RpLastTwelveMonths[2], RpLastTwelveMonths[3], RpLastTwelveMonths[4], RpLastTwelveMonths[5], RpLastTwelveMonths[6], RpLastTwelveMonths[7], RpLastTwelveMonths[8], RpLastTwelveMonths[9], RpLastTwelveMonths[10], RpLastTwelveMonths[11]],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        
        var sevenDayTotal = 0;
        for (var index = 0; index < RpLastSevenDays.length; index++){
            sevenDayTotal += RpLastSevenDays[index];
        }
        
        var weeklyRankChart = new Chart(weeklyRankCanvas, {
            type: 'bar',
            data: {
                labels: ["Top All Classes", "Top Armsman", "#25 All Classes", "#25 Armsman", "Desperados"],
                datasets: [{
                    label: 'RP Rankings this week',
                    data: [421444, 211321, 143222, 58654, sevenDayTotal],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display:true,
                    text:"RvR Kills Overview (click for realm breakdown)"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        
        var overallRankChart = new Chart(overallRankCanvas, {
            type: 'bar',
            data: {
                labels: ["Top All Classes", "Top Armsman", "#25 All Classes", "#25 Armsman", "Desperados"],
                datasets: [{
                    label: 'RP Rankings this week',
                    data: [8421444, 5211321, 3143222, 4158654, response.Raw.RP],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display:true,
                    text:"RvR Kills Overview (click for realm breakdown)"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        //--END RP STATS CHART--//

        //--BEGIN PROGRESS STATS CHART--//

        var remainingXP = 100 - progressXP;
        var remainingRealmLevel = 100 - progressRealmLevel;
        var remainingRealmRank = 100 - progressRealmRank;

        var progressCanvas = document.getElementById("progress-canvas");
        var progressChart = new Chart(progressCanvas, {
            type: 'horizontalBar',
            data: {
                labels: ["XP Progress", "Realm Level Progress", "Realm Rank Progress"],
                datasets: [{
                    label: '% Progress',
                    data: [progressXP, progressRealmLevel, progressRealmRank],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(255, 206, 86, 0.4)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                },
                           {
                               label: '% Remaining',
                               data: [remainingXP, remainingRealmLevel, remainingRealmRank],
                               backgroundColor: [
                                   "rgba(220, 220, 220, 0.2)",
                                   "rgba(220, 220, 220, 0.2)",
                                   "rgba(220, 220, 220, 0.2)"
                               ],
                               borderColor: [

                                   "rgba(220, 220, 220, .1)",
                                   "rgba(220, 220, 220, .1)",
                                   "rgba(220, 220, 220, .1)"
                               ]
                           }]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true,
                        categoryPercentage: 0.5
                    }],
                    yAxes: [{
                        stacked: true,
                        categoryPercentage: 0.5,
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        //--END PROGRESS STATS CHART--//

        //--END CUSTOM CHART.JS--//
    });
});
//--END CUSTOM JQUERY--//