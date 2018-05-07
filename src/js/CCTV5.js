(function () {
    // 数据统计-详细
    define('dataCtrl',["jquery"],function($){
    
        // 加载接口数据工具方法
        var getData = function(interface,callback,error){
            $.ajax({
                type: "get",  
                async: true,  
                url: interface,
                dataType: "jsonp", 
                callback: "ajaxExec",
                success: function(result){
                    callback(result);
                },
                error: function(){
                    error();
                }
            });
        }
    
        var INTERFACES = {
            allData: "http://sportswebapi.qq.com/kbs/matchStat?from=nba_database&selectParams=teamRank,periodGoals,playerStats,nbaPlayerMatchTotal,maxPlayers&mid=100000:",
            playerInfo:"http://sportswebapi.qq.com/player/baseInfo?callback=getPlayerData&from=web&playerId=",
            article:"http://matchweb.sports.qq.com/cms/article?callback=dealLinkMap&mid=100000:"
        };
    
    
        var getPlayerInfo = function(pid,callback) {
            var interface = INTERFACES.playerInfo + pid;
            getData(interface,function(data){
                if (data.code === 0) {
                    callback(data.data);
                } else {
                    throw new Error("player's interface exception!");
                }
            },function(err){});
        }
    
        var getMatchData = function(pid,callback) {
            var interface = INTERFACES.allData + pid;
            getData(interface,function(data){
                if (data.code === 0) {}{
                    callback(data);
                }
            },function(err){})
        }
    
        var getMatchArticle = function(mid,callback) {
            var interface = INTERFACES.article + mid;
            getData(interface,function(data){
                if (data.code === 0) {}{
                    callback(data.data);
                }
            },function(err){})
        }
        var getForumInfoById = function(mid,callback) {
            var interface = "http://shequweb.sports.qq.com/topic/getMatchTopics?matchId=100000:" + mid;
            getData(interface,function(data){
                if (data.code === 0) {}{
                    callback(data.data);
                }
            },function(err){})
        }
    
        return {
            getPlayerInfo:getPlayerInfo,
            getMatchData:getMatchData,
            getForumInfoById:getForumInfoById,
            getMatchArticle:getMatchArticle
        }
    
    });
    (function(global) {
    
        var Tools = {
    
            stringJoint: function(src) {
                if (arguments.length == 0) return "";
                var args = Array.prototype.slice.call(arguments, 1);
                return src.replace(/\{(\d+)\}/g, function(m, i) {
                    return args[i];
                });
            },
            /**
             * URL 处理工具
             * @type {Object}
             */
            Url: {
                /**
                 * @description URL解析方法
                 * @param {String} url 选填，如果不填则解析浏览器URL地址
                 * @return {Object} 解析后的URL对象
                 * @example
                 * 	Tools.url.parse('http://www.example.com:443/f1/t.html?attr1=123&attr2=abc#top')
                 *  	href:http://www.example.com:443/f1/t.html?attr1=123&attr2=abc#top
                 *  	protocol:http:
                 *  	host:www.example.com:443
                 *  	hostname:www.example.com
                 *  	port:443
                 *  	path:/f1/t.html?attr1=123&attr2=abc
                 *  	pathname:/f1/t.html
                 *  	query:?attr1=123&attr2=abc
                 *  	search:将query转化为Object
                 *  	hash:#top
                 */
                parse: function(url) {
                    url = url || window.location.href;
                    var a = document.createElement('a');
                    a.href = url;
                    return {
                        href: url,
                        protocol: a.protocol,
                        host: a.host, // host = hostname + port;
                        hostname: a.hostname,
                        port: a.port,
                        path: a.pathname + a.search, // path = pathname + search
                        pathname: a.pathname,
                        search: (function() {
                            var map = {},
                                arr = a.search.substring(1).split('&');
                            for (var e in arr) {
                                var t = arr[e].toString().split('=');
                                map[t[0]] = t[1];
                            }
                            return map;
                        })(),
                        query: a.search, // search 2 obj
                        hash: a.hash
                    }
                },
                format: function(urlObj) {
    
                }
            },
            /**
             * 获取URL中query参数值
             * @param  {String} param 参数名
             * @param  {String} url   可选参数，默认为window.location
             * @return {String}       返回参数值
             */
            getUrlParam: function(param, url) {
                return this.Url.parse(url).search[param];
            },
            /**
             * Cookie 操作类
             * @type {Object}
             */
            Cookie: {
                /**
                 * @description 获取Cookie值
                 * @param {String} sKey Cookie key值
                 * @return {String} Key值对应的Value
                 */
                getItem: function(sKey) {
                    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
                },
                /**
                 * @description 设置Cookie
                 * @param {String} sKey 必须，key
                 * @param {String} sValue 必须，value
                 */
                setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                        return false; }
                    var sExpires = "";
                    if (vEnd) {
                        switch (vEnd.constructor) {
                            case Number:
                                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                                break;
                            case String:
                                sExpires = "; expires=" + vEnd;
                                break;
                            case Date:
                                sExpires = "; expires=" + vEnd.toUTCString();
                                break;
                        }
                    }
                    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
                    return true;
                },
                removeItem: function(sKey, sPath, sDomain) {
                    if (!sKey || !this.hasItem(sKey)) {
                        return false; }
                    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
                    return true;
                },
                hasItem: function(sKey) {
                    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
                },
                keys: function() {
                    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
                    return aKeys;
                }
            }
    
        }
    
        if (typeof define === "function") {
            define("tools", [], function() {
                return Tools;
            });
        }else {
            global.Tools = Tools;
        }
    
    })(window)
    ;
    /*TMODJS:{"version":"1.0.0"}*/
    !function () {
    
        function template (filename, content) {
            return (
                /string|function/.test(typeof content)
                ? compile : renderFile
            )(filename, content);
        };
    
    
        var cache = template.cache = {};
        var String = this.String;
    
        function toString (value, type) {
    
            if (typeof value !== 'string') {
    
                type = typeof value;
                if (type === 'number') {
                    value += '';
                } else if (type === 'function') {
                    value = toString(value.call(value));
                } else {
                    value = '';
                }
            }
    
            return value;
    
        };
    
    
        var escapeMap = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        };
    
    
        function escapeFn (s) {
            return escapeMap[s];
        }
    
    
        function escapeHTML (content) {
            return toString(content)
            .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
        };
    
    
        var isArray = Array.isArray || function(obj) {
            return ({}).toString.call(obj) === '[object Array]';
        };
    
    
        function each (data, callback) {
            if (isArray(data)) {
                for (var i = 0, len = data.length; i < len; i++) {
                    callback.call(data, data[i], i, data);
                }
            } else {
                for (i in data) {
                    callback.call(data, data[i], i);
                }
            }
        };
    
    
        function resolve (from, to) {
            var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
            var dirname = ('./' + from).replace(/[^/]+$/, "");
            var filename = dirname + to;
            filename = filename.replace(/\/\.\//g, "/");
            while (filename.match(DOUBLE_DOT_RE)) {
                filename = filename.replace(DOUBLE_DOT_RE, "/");
            }
            return filename;
        };
    
    
        var utils = template.utils = {
    
            $helpers: {},
    
            $include: function (filename, data, from) {
                filename = resolve(from, filename);
                return renderFile(filename, data);
            },
    
            $string: toString,
    
            $escape: escapeHTML,
    
            $each: each
            
        };
    
    
        var helpers = template.helpers = utils.$helpers;
    
    
        function renderFile (filename, data) {
            var fn = template.get(filename) || showDebugInfo({
                filename: filename,
                name: 'Render Error',
                message: 'Template not found'
            });
            return data ? fn(data) : fn; 
        };
    
    
        function compile (filename, fn) {
    
            if (typeof fn === 'string') {
                var string = fn;
                fn = function () {
                    return new String(string);
                };
            }
    
            var render = cache[filename] = function (data) {
                try {
                    return new fn(data, filename) + '';
                } catch (e) {
                    return showDebugInfo(e)();
                }
            };
    
            render.prototype = fn.prototype = utils;
            render.toString = function () {
                return fn + '';
            };
    
            return render;
        };
    
    
        function showDebugInfo (e) {
    
            var type = "{Template Error}";
            var message = e.stack || '';
    
            if (message) {
                // 利用报错堆栈信息
                message = message.split('\n').slice(0,2).join('\n');
            } else {
                // 调试版本，直接给出模板语句行
                for (var name in e) {
                    message += "<" + name + ">\n" + e[name] + "\n\n";
                }  
            }
    
            return function () {
                if (typeof console === "object") {
                    console.error(type + "\n\n" + message);
                }
                return type;
            };
        };
    
    
        template.get = function (filename) {
            return cache[filename.replace(/^\.\//, '')];
        };
    
    
        template.helper = function (name, helper) {
            helpers[name] = helper;
        };
    
    
        if (typeof define === 'function') {define('templateModule',[],function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
        
        /*v:1*/
    template('detail',function($data,$filename
    /**/) {
    'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,enName=$data.enName,logo=$data.logo,teamName=$data.teamName,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,iLen=$data.iLen,record=$data.record,j=$data.j,$out='';$out+='<div class="title"> <a href="http://nba.stats.qq.com/team/?id=';
    $out+=$escape(enName);
    $out+='" target="_blank" bosszone="SSSJ_staTeam"> <img src="';
    $out+=$escape(logo);
    $out+='" alt="42x42"/> <h2>';
    $out+=$escape(teamName);
    $out+='</h2> </a> </div> <div class="data"> <table> ';
    $each(data,function(item,i){
    $out+=' <tr data-playerid="';
    $out+=$escape(item.playerId);
    $out+='" class="';
    $out+=$escape(i === iLen - 1 || i === iLen - 2 ? ' dark ' : (i + 1) % 2 === 1 && i < iLen - 1 ? 'dark ' : 'light ');
    $out+=' ';
    $out+=$escape(i === 0 || i === 6 ? 'tit ' : ' ');
    $out+=' ';
    $out+=$escape(i === iLen - 2 ? 'total ' : i === iLen - 1 ? 'hitrate ' : ' ');
    $out+='"> ';
    $each(item.row,function(record,j){
    $out+=' ';
    if(i === 0 || i === 6 ){
    $out+=' <td data-coord="';
    $out+=$escape(i);
    $out+=',';
    $out+=$escape(j);
    $out+='" class="';
    $out+=$escape(j >= 2 && j <= 4 ? 'bg' : '');
    $out+='">';
    $out+=$escape(record);
    $out+='</td> ';
    }else{
    $out+=' ';
    if(item.enName && j === 0){
    $out+=' <td data-coord="';
    $out+=$escape(i);
    $out+=',';
    $out+=$escape(j);
    $out+='"> <a href="http://nba.stats.qq.com/player/?id=';
    $out+=$escape(item.playerId);
    $out+='" target="_blank" bosszone="SSSJ_staPla">';
    $out+=$escape(record);
    $out+='</a></td> ';
    }else{
    $out+=' <td data-coord="';
    $out+=$escape(i);
    $out+=',';
    $out+=$escape(j);
    $out+='">';
    $out+=$escape(record);
    $out+='</td> ';
    }
    $out+=' ';
    }
    $out+=' ';
    });
    $out+=' </tr> ';
    });
    $out+=' </table> </div> ';
    return new String($out);
    });/*v:1*/
    template('goal',function($data,$filename
    /**/) {
    'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,leftEnName=$data.leftEnName,leftBadge=$data.leftBadge,leftFullCnName=$data.leftFullCnName,leftRank=$data.leftRank,leftRecord=$data.leftRecord,total=$data.total,$each=$utils.$each,head=$data.head,$value=$data.$value,$index=$data.$index,width=$data.width,rows=$data.rows,val=$data.val,idx=$data.idx,rightEnName=$data.rightEnName,rightBadge=$data.rightBadge,rightFullCnName=$data.rightFullCnName,rightRank=$data.rightRank,rightRecord=$data.rightRecord,$out='';$out+='<div class="visit"> <a href="http://nba.stats.qq.com/team/?id=';
    $out+=$escape(leftEnName);
    $out+='" target="_blank" bosszone="SSSJ_topTeam"> <img src="';
    $out+=$escape(leftBadge);
    $out+='" alt="70x70"/> <p class="team">';
    $out+=$escape(leftFullCnName);
    $out+='</p> <p class="rank">';
    $out+=$escape(leftRank);
    $out+=$escape(leftRecord);
    $out+='</p> </a> </div> <div class="data"> <span class="visitgoal">';
    $out+=$escape(total[0]);
    $out+='</span> <table> <tr class="bg"> ';
    $each(head,function($value,$index){
    $out+=' <td style="width: ';
    $out+=$escape(width);
    $out+='px;">';
    $out+=$escape($value);
    $out+='</td> ';
    });
    $out+=' </tr> ';
    $each(rows,function($value,$index){
    $out+=' <tr> ';
    $each($value,function(val,idx){
    $out+=' <td class="';
    $out+=$escape(idx === 0 ? 'bg' : '');
    $out+='">';
    $out+=$escape(val);
    $out+='</td> ';
    });
    $out+=' </tr> ';
    });
    $out+=' </table> <span class="homegoal">';
    $out+=$escape(total[1]);
    $out+='</span> </div> <div class="home"> <a href="http://nba.stats.qq.com/team/?id=';
    $out+=$escape(rightEnName);
    $out+='" target="_blank" bosszone="SSSJ_topTeam"> <img src="';
    $out+=$escape(rightBadge);
    $out+='" alt="70x70"/> <p class="team">';
    $out+=$escape(rightFullCnName);
    $out+='</p> <p class="rank">';
    $out+=$escape(rightRank);
    $out+=$escape(rightRecord);
    $out+='</p> </a> </div> ';
    return new String($out);
    });/*v:1*/
    template('graph',function($data,$filename
    /**/) {
    'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,awayEnName=$data.awayEnName,awayName=$data.awayName,homeEnName=$data.homeEnName,homeName=$data.homeName,$each=$utils.$each,data=$data.data,record=$data.record,i=$data.i,$out='';$out+='<div class="hint"> <span class="visit"> <a href="http://nba.stats.qq.com/team/?id=';
    $out+=$escape(awayEnName);
    $out+='" target="_blank" bosszone="SSSJ_totalTeam">';
    $out+=$escape(awayName);
    $out+='</a> </span> <i class="visit"></i> <span class="home"> <a href="http://nba.stats.qq.com/team/?id=';
    $out+=$escape(homeEnName);
    $out+='" target="_blank" bosszone="SSSJ_totalTeam">';
    $out+=$escape(homeName);
    $out+='</a> </span> <i class="home"></i> </div> <div class="bar"> ';
    $each(data,function(record,i){
    $out+=' <div class="item"> <div class="container"> <em class="visit" style="height:';
    $out+=$escape(record.awayValue);
    $out+='px"> <span>';
    $out+=$escape(record.awayValue);
    $out+='%</span> </em> <em class="home" style="height:';
    $out+=$escape(record.homeValue);
    $out+='px"> <span>';
    $out+=$escape(record.homeValue);
    $out+='%</span> </em> </div> <p>';
    $out+=$escape(record.name);
    $out+='</p> </div> ';
    });
    $out+=' </div> ';
    return new String($out);
    });/*v:1*/
    template('links',function($data,$filename
    /**/) {
    'use strict';var $utils=this,$helpers=$utils.$helpers,linkMap=$data.linkMap,matchPeriod=$data.matchPeriod,$escape=$utils.$escape,$out='';$out+='<div class="others"> ';
    if(linkMap.qz && matchPeriod === "1"  ){
    $out+=' <a href="';
    $out+=$escape(linkMap.qz);
    $out+='" class="qz" target="_blank" bosszone="SSSJ_navQz">前瞻</a> ';
    }
    $out+=' ';
    if(linkMap.zb && matchPeriod === "2"  ){
    $out+=' <a href="';
    $out+=$escape(linkMap.zb);
    $out+='" class="zb" target="_blank" bosszone="SSSJ_navZb">战报</a> ';
    }
    $out+=' ';
    if(linkMap.jj ){
    $out+=' <a href="';
    $out+=$escape(linkMap.jj);
    $out+='" class="jj" target="_blank" bosszone="SSSJ_navJj">集锦</a> ';
    }
    $out+=' ';
    if(linkMap.hf ){
    $out+=' <a href="';
    $out+=$escape(linkMap.hf);
    $out+='" class="hf" target="_blank" bosszone="SSSJ_navHf">回放</a> ';
    }
    $out+=' </div> ';
    return new String($out);
    });/*v:1*/
    template('list',function($data,$filename
    /**/) {
    'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,rows=$data.rows,record=$data.record,i=$data.i,$escape=$utils.$escape,$out='';$out+='<table> ';
    $each(rows,function(record,i){
    $out+=' <tr> <td>';
    $out+=$escape(record.item);
    $out+='</td> ';
    if(i === 0 ){
    $out+=' <td><a href="http://nba.stats.qq.com/team/?id=';
    $out+=$escape(record.awayEnName);
    $out+='" target="_blank" bosszone="SSSJ_totalTeam">';
    $out+=$escape(record.awayName);
    $out+='</a></td> ';
    }else{
    $out+=' <td>';
    $out+=$escape(record.visit);
    $out+='</td> ';
    }
    $out+=' ';
    if(i === 0 ){
    $out+=' <td><a href="http://nba.stats.qq.com/team/?id=';
    $out+=$escape(record.homeEnName);
    $out+='" target="_blank" bosszone="SSSJ_totalTeam">';
    $out+=$escape(record.homeName);
    $out+='</a></td> ';
    }else{
    $out+=' <td>';
    $out+=$escape(record.home);
    $out+='</td> ';
    }
    $out+=' </tr> ';
    });
    $out+=' </table> ';
    return new String($out);
    });/*v:1*/
    template('optimumData',function($data,$filename
    /**/) {
    'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="title"> <h2>各项最佳</h2> </div> <div class="list"> <table> ';
    $each(data,function($value,$index){
    $out+=' ';
    if($index === 0){
    $out+=' <tr> <td></td> <td> <a href="http://sports.qq.com/nba/news.htm?type=team&id=';
    $out+=$escape($value.visitEnName);
    $out+='" target="_blank" bosszone="SSSJ_bestTeam"> ';
    $out+=$escape($value.visitName);
    $out+=' </a> </td> <td> <a href="http://sports.qq.com/nba/news.htm?type=team&id=';
    $out+=$escape($value.homeEnName);
    $out+='" target="_blank" bosszone="SSSJ_bestTeam"> ';
    $out+=$escape($value.homeName);
    $out+=' </a> </td> </tr> ';
    }else{
    $out+=' <tr> <td> ';
    $out+=$escape($value.item);
    $out+=' </td> <td> <span class="player" data-player-id="';
    $out+=$escape($value.visitID);
    $out+='"> <a href="http://sports.qq.com/nba/player/?id=';
    $out+=$escape($value.visitID);
    $out+='" target="_blank" bosszone="SSSJ_bestPla" data-pid="';
    $out+=$escape($value.visitID);
    $out+='" class="mtf">';
    $out+=$escape($value.visitName);
    $out+='</a> <div style="display: none;" class="card right"></div> </span> <span class="value">';
    $out+=$escape($value.visitValue);
    $out+='</span> </td> <td> <span class="player" data-player-id="';
    $out+=$escape($value.homeIDhomeID);
    $out+='"> <a href="http://sports.qq.com/nba/player/?id=';
    $out+=$escape($value.homeID);
    $out+='" target="_blank" bosszone="SSSJ_bestPla" data-pid="';
    $out+=$escape($value.homeID);
    $out+='" class="mtf">';
    $out+=$escape($value.homeName);
    $out+='</a> <div style="display: none;" class="card right"></div> </span> <span class="value">';
    $out+=$escape($value.homeValue);
    $out+='</span> </td> </tr> ';
    }
    $out+=' ';
    });
    $out+=' </table> </div> ';
    return new String($out);
    });/*v:1*/
    template('playerInfo',function($data,$filename
    /**/) {
    'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,playerId=$data.playerId,logo=$data.logo,cnName=$data.cnName,g=$data.g,enName=$data.enName,jerseyNum=$data.jerseyNum,position=$data.position,height=$data.height,weight=$data.weight,$out='';$out+='<a href="http://nba.stats.qq.com/player/?id=';
    $out+=$escape(playerId);
    $out+='" target="_blank"> <div class="infos"> <div class="avatar"> <img src="';
    $out+=$escape(logo);
    $out+='" alt=""> </div> <div class="txt"> <p class="chName"> ';
    $out+=$escape(cnName.replace(/\-/g, " "));
    $out+=' </p> <p class="enName"> ';
    $out+=$escape(enName);
    $out+=' </p> <p class="sum"># ';
    $out+=$escape(jerseyNum);
    $out+=$escape(position);
    $out+=' |';
    $out+=$escape(height);
    $out+=',';
    $out+=$escape(weight);
    $out+=' </p> </div> </div> </a> ';
    return new String($out);
    });
    
    }();
    define('goal',["jquery", "templateModule"], function($, template) {
        var goal = {
            init: function(data) {
    
    
                if (data.teamInfo && data.periodGoals) {
    
    
                    var d = data.teamInfo;
                    // 处理球队名
                    d.leftEnName = d.leftEnName.split(" ").pop().toLowerCase();
                    d.rightEnName = d.rightEnName.split(" ").pop().toLowerCase();
    
                    
                    // 球队总得分
                    d.total = [data.periodGoals.rows[0][9],data.periodGoals.rows[1][9]];
                    // 表头
                    data.periodGoals.head.unshift("");
                    d.head = data.periodGoals.head;
                    // 表行
                    d.rows = [[d.leftName],[d.rightName]];
                    
                    for (var i = 1; i < data.periodGoals.rows[0].length; i++) {
                        var item = data.periodGoals.rows[0][i];
                        var item2 = data.periodGoals.rows[1][i];
                        // if(isNaN(item)) continue;
                        
                        d.rows[0].push(item);
                        d.rows[1].push(item2);
                    }
    
                    d.head = d.head.slice(0,d.rows[0].length);
    
                    // 计算每列宽度
                    d.width = 310/d.head.length;
    
                    $('.goal').html(template("goal", d));
    
                }
            }
        };
    
        return goal;
    });
    
    define('links',["jquery","dataCtrl","templateModule"],function($,dataCtrl,template){
        var links = {
            init: function(mid,matchData) {
                var matchPeriod = matchData.teamInfo.matchPeriod;
                if (mid) {
                    dataCtrl.getMatchArticle(mid,function(data){
                        var linkMap = {};
                        for (var i = 0, iLen = data.length; i < iLen; i++) {
                            var item = data[i];
                            var key = item.type === '1' ? 'qz' : item.type === '2' ? 'zb' : item.type === '3' ? 'jj' : item.type === '4' ? 'hf' : '';
                            if (linkMap[key]) {
                                continue;
                            } else {
                                linkMap[key] = item.url;
                            }
                        }
    
                        // 0比赛前，1比赛中，2已结束
                        if (linkMap && matchPeriod !== "0" && matchData.playerStats) {
                            $('.links_banner').append(template("links",{ linkMap: linkMap, matchPeriod: matchPeriod }));
                        } else {
                            $('.links_banner').append('<div class="default">暂无比赛数据...</div>');
                        }
    
                        dataCtrl.getForumInfoById(mid,function(d){
                            if(d.list && d.list.length){
                                $.each(d.list, function(index, val) {
                                    if(val.subtype == 1){
                                        $('.links_banner .others').append('<a href="http://fans.sports.qq.com/post.htm?id='+val.id+'&mid='+val.moduleIds+'" class="lt" target="_blank" bosszone="SSSJ_navSq-zbhd">社区直播互动</a>');
                                        return false;
                                    }
                                });
                            }
                        });
                    });
    
                } else {
                }
    
            }
        };
    
        return links;
    });
    define('table',["jquery", "templateModule"], function($, template) {
        // Êý¾Ý±í
        var table = {
            init: function(data) {
    
                var homeData = {};
                var visitData = {};
    
                var teamInfo = dealTeamInfo(data.teamInfo);
    
                // 处理球队Title数据
                visitData.teamName = teamInfo.leftFullCnName;
                visitData.enName = teamInfo.leftEnName.split(" ").pop().toLowerCase();
                visitData.logo = teamInfo.leftBadge;
    
                homeData.teamName = teamInfo.rightFullCnName;
                homeData.enName = teamInfo.rightEnName.split(" ").pop().toLowerCase();
                homeData.logo = teamInfo.rightBadge;
    
                // 获取最佳数据球员
                var maxVal = {home:{},away:{}}
                $.each(data.maxPlayers, function(index, val) {
                    if(val.text == "得分"){
                        maxVal.home.score = val.rightPlayer.playerId;
                        maxVal.away.score = val.leftPlayer.playerId;
                    } else if (val.text == "助攻") {
                        maxVal.home.assists = val.rightPlayer.playerId;
                        maxVal.away.assists = val.leftPlayer.playerId;
                    } else if (val.text == "篮板") {
                        maxVal.home.rebounds = val.rightPlayer.playerId;
                        maxVal.away.rebounds = val.leftPlayer.playerId;
                    }
                });
    
                // 处理球员数据
                var tableData = dealTableData(data);
                visitData.data = tableData.visitData;
                homeData.data = tableData.homeData;
    
                visitData.iLen = tableData.visitData.length
                homeData.iLen = tableData.homeData.length
    
    
                $('.statictis .left .visit').html(template("detail",visitData));
                $('.statictis .left .home').html(template("detail",homeData));
    
                addMaxLabel(maxVal);
    
                this.bind();
                
            },
            bind: function() {
    
                /***************** visit team begin***********************/
                var v_trs = $('.statictis .left .visit .data table tr');
                v_trs.splice(v_trs.size() - 2);
    
                // ÒÆÈë¾ä±ú
                var v_in = function(e, elem) {
                    var coords = $(elem).attr('data-coord').split(',');
                    var x = coords[0];
                    var y = coords[1];
    
                    var trs = $('.statictis .left .visit .data table tr');
                    trs.splice(trs.size() - 2); // Å×³ö×îºóÁ½ÐÐ
    
                    for (var i = 0, iLen = trs.size(); i < iLen; i++) {
                        if (i === 0) { // µÚÒ»ÐÐ
                            if (y / 1 !== 0) trs.eq(i).find('td').eq(y).addClass('blue_h');
                        } else if (i == x && i !== 6) { // Å×³öÌæ²¹ÇòÔ±ÄÇÐÐ
                            $(elem).addClass('check');
                            var tds = trs.eq(i).find('td');
                            for (var j = 0, jLen = tds.size(); j < jLen; j++) {
                                if (j === 0) {
                                    tds.eq(j).addClass('blue_v');
                                } else {
                                    tds.eq(j).addClass('others_h');
                                }
                            }
                        } else {
                            if (y / 1 !== 0) trs.eq(i).find('td').eq(y).addClass('others_v');
                        }
                    }
                };
                // ÒÆ³ö¾ä±ú
                var v_out = function(e, elem) {
                    var coords = $(elem).attr('data-coord').split(',');
                    var x = coords[0];
                    var y = coords[1];
    
                    var trs = $('.statictis .left .visit .data table tr');
                    trs.splice(trs.size() - 2);
    
                    for (var i = 0, iLen = trs.size(); i < iLen; i++) {
                        if (i === 0) {
                            trs.eq(i).find('td').eq(y).removeClass('blue_h');
                        } else if (i == x && i !== 6) { // Ìæ²¹ÇòÔ±ÄÇÁÐ
                            $(elem).removeClass('check');
                            var tds = trs.eq(i).find('td');
                            for (var j = 0, jLen = tds.size(); j < jLen; j++) {
                                if (j === 0) {
                                    tds.eq(j).removeClass('blue_v');
                                } else {
                                    tds.eq(j).removeClass('others_h');
                                }
                            }
                        } else {
                            trs.eq(i).find('td').eq(y).removeClass('others_v');
                        }
                    }
                };
                // ÒÆÈë
                v_trs.on('mouseenter', 'td', function(e) {
                    v_in(e, this);
    
                });
                // // ÒÆ³ö
                v_trs.on('mouseleave', 'td', function(e) {
                    v_out(e, this);
                });
                /***************** visit team end***********************/
    
    
    
                /***************** home team begin***********************/
                var h_trs = $('.statictis .left .home .data table tr');
                h_trs.splice(h_trs.size() - 2);
    
                // ÒÆÈë¾ä±ú
                var h_in = function(e, elem) {
                    var coords = $(elem).attr('data-coord').split(',');
                    var x = coords[0];
                    var y = coords[1];
    
                    var trs = $('.statictis .left .home .data table tr');
                    trs.splice(trs.size() - 2);
    
                    for (var i = 0, iLen = trs.size(); i < iLen; i++) {
                        if (i === 0) {
                            if (y / 1 !== 0) trs.eq(i).find('td').eq(y).addClass('blue_h');
                        } else if (i == x && i !== 6) { // Ìæ²¹ÇòÔ±ÄÇÁÐ
                            $(elem).addClass('check');
                            var tds = trs.eq(i).find('td');
                            for (var j = 0, jLen = tds.size(); j < jLen; j++) {
                                if (j === 0) {
                                    tds.eq(j).addClass('blue_v');
                                } else {
                                    tds.eq(j).addClass('others_h');
                                }
                            }
                        } else {
                            if (y / 1 !== 0) trs.eq(i).find('td').eq(y).addClass('others_v');
                        }
                    }
                };
                // ÒÆ³ö¾ä±ú
                var h_out = function(e, elem) {
                    var coords = $(elem).attr('data-coord').split(',');
                    var x = coords[0];
                    var y = coords[1];
    
                    var trs = $('.statictis .left .home .data table tr');
                    trs.splice(trs.size() - 2);
    
                    for (var i = 0, iLen = trs.size(); i < iLen; i++) {
                        if (i === 0) {
                            trs.eq(i).find('td').eq(y).removeClass('blue_h');
                        } else if (i == x && i !== 6) { // Ìæ²¹ÇòÔ±ÄÇÁÐ
                            $(elem).removeClass('check');
                            var tds = trs.eq(i).find('td');
                            for (var j = 0, jLen = tds.size(); j < jLen; j++) {
                                if (j === 0) {
                                    tds.eq(j).removeClass('blue_v');
                                } else {
                                    tds.eq(j).removeClass('others_h');
                                }
                            }
                        } else {
                            trs.eq(i).find('td').eq(y).removeClass('others_v');
                        }
                    }
                };
                // ÒÆÈë
                h_trs.on('mouseenter', 'td', function(e) {
                    h_in(e, this);
    
                });
                // // ÒÆ³ö
                h_trs.on('mouseleave', 'td', function(e) {
                    h_out(e, this);
                });
                /***************** home team end***********************/
    
    
            }
        };
    
        var dealTeamInfo = function(data) {
            var enNameToLower = function(name) {
                switch (name) {
                    case '76ers':
                        name = 'sixers';
                        break;
                    case 'Trail Blazers':
                        name = 'blazers';
                        break;
                }
                return (name + '').toLowerCase();
            };
            var splitFullChName = function(fullName, name) {
                var pattern = new RegExp(name + '$', 'g');
                return fullName.replace(pattern, '') + ' ' + name;
            };
    
            // if (!data.leftRank) {
            //     data.leftRank = '';
            // }
            // if (!data.leftRecord) {
            //     data.leftRecord = '';
            // }
            // if (!data.rightRank) {
            //     data.rightRank = '';
            // }
            // if (!data.rightRecord) {
            //     data.rightRecord = '';
            // }
            data.leftEnName = enNameToLower(data.leftEnName);
            data.rightEnName = enNameToLower(data.rightEnName);
    
            data.leftFullCnName = splitFullChName(data.leftFullCnName, data.leftName);
            data.rightFullCnName = splitFullChName(data.rightFullCnName, data.rightName);
    
            return data;
        };
    
        // 处理球员数据
        var dealTableData = function(data) {
            var handle = function(playerStats, totalStats, totalScore) {
                for (var i = 0, iLen = playerStats.length; i < iLen; i++) {
                    var record = playerStats[i];
                    if (i === 0) {
                        var head = record.head;
                        head.shift();
                        head[0] = '首发球员';
                        record.row = head;
                    } else {
                        record.row.splice(1, 1); 
                        record.enName = record.enName.split(' ').join('_');
                    }
                }
                // 添加首发替补中间表头
                playerStats.splice(6, 0, { row: ['替补球员', '时间', '得分', '篮板', '助攻', '投篮', '三分', '罚球', '前场板', '后场板', '抢断', '盖帽', '失误', '犯规'] });
                // 添加总计
                var total = dealTotalData(totalStats,totalScore);
                playerStats.splice(playerStats.length, 2, total[0], total[1]);
            };
            handle(data.playerStats.left,data.nbaPlayerMatchTotal.away,data.periodGoals.rows[0][9]);
            handle(data.playerStats.right,data.nbaPlayerMatchTotal.home,data.periodGoals.rows[1][9]);
            return {visitData:data.playerStats.left,homeData:data.playerStats.right};
        };
    
        // 处理数据
        var dealTotalData = function(data, score) {
            var arr = [];
            var rebounds = data.rebounds;
            var assists = data.assists;
            var shoots = data.fieldGoals + '/' + data.fieldGoalsAttempted;
            var tris = data.threePointGoals + '/' + data.threePointAttempted;
            var penalty = data.freeThrows + '/' + data.freeThrowsAttempted;
            var offensiveRebounds = data.offensiveRebounds;
            var defensiveRebounds = data.defensiveRebounds;
            var steals = data.steals;
            var blocked = data.blocked;
            var turnovers = data.turnovers;
            var personalFouls = data.personalFouls;
    
            var round = function(num) {
                num = Math.round(num * 1000) / 10;
                num = (num + '').indexOf('.') > -1 ? num : num + '.0';
                return num;
            };
    
            var shootsNum = data.fieldGoalsAttempted == '0' ? 0 : round(data.fieldGoals / data.fieldGoalsAttempted);
            var trisNum = data.threePointAttempted == '0' ? 0 : round(data.threePointGoals / data.threePointAttempted);
            var penaltyNum = data.freeThrowsAttempted == '0' ? 0 : round(data.freeThrows / data.freeThrowsAttempted);
    
            arr.push({ row: ['总计', '', score, rebounds, assists, shoots, tris, penalty, offensiveRebounds, defensiveRebounds, steals, blocked, turnovers, personalFouls] });
            arr.push({ row: ['命中率', '', '', '', '', shootsNum + '%', trisNum + '%', penaltyNum + '%', '', '', '', '', '', ''] });
    
            return arr;
        };
    
        var addMaxLabel = function(data) {
    
            $($('.visit [data-playerid="'+data.away.score+'"] td')[2]).addClass('red');
            $($('.home [data-playerid="'+data.home.score+'"] td')[2]).addClass('red');
    
            $($('.visit [data-playerid="'+data.away.rebounds+'"] td')[3]).addClass('red');
            $($('.home [data-playerid="'+data.home.rebounds+'"] td')[3]).addClass('red');
    
            $($('.visit [data-playerid="'+data.away.assists+'"] td')[4]).addClass('red');
            $($('.home [data-playerid="'+data.home.assists+'"] td')[4]).addClass('red');
            
        };
    
    
        return table;
    });
    
    
    define('compare',["jquery","templateModule"], function($, template) {
    
        var visitTotal, homeTotal;
    
        var compare = {
            init: function(data) {
    
                var teamInfo = dealTeamInfo(data.teamInfo);
                var matchData = data.nbaPlayerMatchTotal;
    
                var graphData = {
                    homeName:teamInfo.rightName,
                    homeEnName:teamInfo.rightEnName.split(" ").pop().toLowerCase(),
                    awayName:teamInfo.leftName,
                    awayEnName:teamInfo.leftEnName.split(" ").pop().toLowerCase(),
                    data:[ 
                        {
                            name: "投篮",
                            homeValue: ((matchData.home.fieldGoals / matchData.home.fieldGoalsAttempted)*100).toFixed(1),
                            awayValue: ((matchData.away.fieldGoals / matchData.away.fieldGoalsAttempted)*100).toFixed(1)
                        },
                        {
                            name: "三分",
                            homeValue: ((matchData.home.threePointGoals / matchData.home.threePointAttempted)*100).toFixed(1),
                            awayValue: ((matchData.away.threePointGoals / matchData.away.threePointAttempted)*100).toFixed(1)
                        },
                        {
                            name: "罚球",
                            homeValue: matchData.home.freeThrowsAttempted > 0?((matchData.home.freeThrows / matchData.home.freeThrowsAttempted)*100).toFixed(1):0,
                            awayValue: matchData.away.freeThrowsAttempted > 0?((matchData.away.freeThrows / matchData.away.freeThrowsAttempted)*100).toFixed(1):0
                        }
                    ]
                };
    
                $('.statictis .right .compare .graph').html(template("graph",graphData));
    
                var listData = {
                    rows:[
                        {
                            item:"",
                            homeName:teamInfo.rightName,
                            homeEnName:teamInfo.rightEnName.split(" ").pop().toLowerCase(),
                            awayName:teamInfo.leftName,
                            awayEnName:teamInfo.leftEnName.split(" ").pop().toLowerCase(),
                        },
                        {item:"投篮",home:matchData.home.fieldGoals+"/"+matchData.home.fieldGoalsAttempted,visit:matchData.away.fieldGoals+"/"+matchData.away.fieldGoalsAttempted},
                        {item:"三分",home:matchData.home.threePointGoals+"/"+matchData.home.threePointAttempted,visit:matchData.away.threePointGoals+"/"+matchData.away.threePointAttempted},
                        {item:"罚球",home:matchData.home.freeThrows+"/"+matchData.home.freeThrowsAttempted,visit:matchData.away.freeThrows+"/"+matchData.away.freeThrowsAttempted},
                        {item:"篮板",home:matchData.home.rebounds,visit:matchData.away.rebounds},
                        {item:"助攻",home:matchData.home.assists,visit:matchData.away.assists},
                        {item:"抢断",home:matchData.home.steals,visit:matchData.away.steals},
                        {item:"盖帽",home:matchData.home.blocked,visit:matchData.away.blocked},
                        {item:"失误",home:matchData.home.turnovers,visit:matchData.away.turnovers}
                    ]
                };
                $('.statictis .right .compare .list').html(template("list",listData));
            }
        };
    
        var dealTeamInfo = function(data) {
            var enNameToLower = function(name) {
                switch (name) {
                    case '76ers':
                        name = 'sixers';
                        break;
                    case 'Trail Blazers':
                        name = 'blazers';
                        break;
                }
                return (name + '').toLowerCase();
            };
            var splitFullChName = function(fullName, name) {
                var pattern = new RegExp(name + '$', 'g');
                return fullName.replace(pattern, '') + ' ' + name;
            };
    
            // if (!data.leftRank) {
            //     data.leftRank = '';
            // }
            // if (!data.leftRecord) {
            //     data.leftRecord = '';
            // }
            // if (!data.rightRank) {
            //     data.rightRank = '';
            // }
            // if (!data.rightRecord) {
            //     data.rightRecord = '';
            // }
            data.leftEnName = enNameToLower(data.leftEnName);
            data.rightEnName = enNameToLower(data.rightEnName);
    
            data.leftFullCnName = splitFullChName(data.leftFullCnName, data.leftName);
            data.rightFullCnName = splitFullChName(data.rightFullCnName, data.rightName);
    
            return data;
        };
        
    
        return compare;
    
    });
    
    define('best',["jquery","templateModule","dataCtrl"], function($, template, dataCtrl) {
    
        var best = {
            init: function(data) {
                var teamInfo = data.teamInfo;
                var maxPlayers = data.maxPlayers;
                // 第一行表头
                var arr = [];
                arr.push({
                    item: '',
                    visitName: teamInfo.leftName,
                    visitEnName: teamInfo.leftEnName.split(" ").pop().toLowerCase(),
                    homeName: teamInfo.rightName,
                    homeEnName: teamInfo.rightEnName.split(" ").pop().toLowerCase()
                });
    
                for (var i = 0, iLen = maxPlayers.length; i < iLen; i++) {
                    var record = maxPlayers[i],
                        map = {};
                    try{
                        // 条目
                        map.item = record.text;
                        // 值
                        map.visitValue = record.leftVal;
                        map.homeValue = record.rightVal;
                        // 中文名
                        map.visitName = record.leftPlayer.name;
                        map.homeName = record.rightPlayer.name;
                        // 英文名
                        map.visitEnName = record.leftPlayer.enName.split(' ').join('_');
                        map.homeEnName = record.rightPlayer.enName.split(' ').join('_');
                        // ID
                        map.visitID = record.leftPlayer.playerId;
                        map.homeID = record.rightPlayer.playerId;
                        
                    }catch(e){}
    
                    arr.push(map);
                }
    
    
                $('#best').html(template("optimumData",{data:arr}));       
                this.bind(); // 控制是否球员hover详细信息功能
            },
            bind: function() {
                var cards = $("#best .card");
                // 移入
                $('#best table tr td').on('mouseenter', 'span.player', function(e) {
                    e.stopPropagation();
                    var pid = $(this).attr('data-id');
    
                    if ($(this).attr('data-loaded') === 'true') {
                        cards.hide();
                        $(this).find('.card').show();
    
                    } else {
                        cards.hide();
                        
                        var pid = $(this).find('> a').attr('data-pid');
                        var elem = $(this).find('.card');
    
                        dataCtrl.getPlayerInfo(pid,function(data){
                            data.playerId = pid;
                            elem.html(template("playerInfo",data)).show().attr('data-loaded', 'true');
                        });
                    }
    
                });
                // 移出
                $('#best table tr td').on('mouseleave', 'span.player', function(e) {
                    e.stopPropagation();
                    cards.hide();
                });
    
            }
        };
    
        return best;
    
    });
    
    define('lift',[],function(){
        var Goto = {
            util: {
                getXYScroll: function() {
                    var xs = [],
                        ys = [];
                    $.each(Goto.scrollTarget, function(idx, ele) {
                        var t;
                        t = $(ele).scrollLeft() === void 0 ? 0 : $(ele).scrollLeft();
                        xs.push(t);
                        t = $(ele).scrollTop() === void 0 ? 0 : $(ele).scrollTop();
                        ys.push(t);
                    });
    
                    return {
                        x: xs[0] === xs[1] ? xs[0] : xs[0] > xs[1] ? xs[0] : xs[1],
                        y: ys[0] === ys[1] ? ys[0] : ys[0] > ys[1] ? ys[0] : ys[1]
                    };
    
                },
                getViewPosition: function(id) {
                    if (id === null || id === void 0) {
                        return null; }
                    var dom = document.getElementById(id);
                    var DOMRect = dom.getBoundingClientRect();
                    var rect = {};
                    rect.left = DOMRect.left || 0;
                    rect.top = DOMRect.top || 0;
                    rect.right = DOMRect.right || 0;
                    rect.bottom = DOMRect.bottom || 0;
                    rect.width = DOMRect.width || DOMRect.right - DOMRect.left;
                    rect.height = DOMRect.height || DOMRect.bottom - DOMRect.top;
                    return rect;
                }
            },
            ctrl: {
                init: function(options) {
                    Goto.scrollTarget = $('html, body');
    
                    Goto.timing = options.timing || 1000;
                    Goto.offsetTop = options.offsetTop || 0;
                    Goto.offsetLeft = options.offsetLeft || 0;
                },
                goto: function(id) {
                    Goto.containerId = id || null;
                    var distant, target, y = Goto.util.getXYScroll().y;
                    if (id) {
                        distant = Goto.util.getViewPosition(id).top - Goto.offsetTop; 
                        target = y + distant;
                    } else {
                        distant = y - Goto.offsetTop; 
                        target = 0;
                    }
                    
                    Goto.scrollTarget.animate({ scrollTop: target }, Goto.timing);
                }
            }
        };
        var util = {
            redirect: function(url) {
                url = url || 'http://sports.qq.com/nba/';
                win.location.href = url;
            },
            throttle: function(func, wait, options) {
                var context, args, result;
                var timeout = null;
                var previous = 0;
                if (!options) options = {};
                var later = function() {
                    previous = options.leading === false ? 0 : new Date().getTime();
                    timeout = null;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                };
                return function() {
                    var now = new Date().getTime();
                    if (!previous && options.leading === false) previous = now;
                    var remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0 || remaining > wait) {
                        if (timeout) {
                            clearTimeout(timeout);
                            timeout = null;
                        }
                        previous = now;
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    } else if (!timeout && options.trailing !== false) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            }
        };
    
        var lift = {
            init: function() {
                this.render();
            },
            render: function() {
                this.bind();
            },
            bind: function() {
                $('.lift .list').on('mouseenter', 'li.app', function(e) {
                    $(this).find('.code').css('display', 'block');
                });
                $('.lift .list').on('mouseleave', 'li.app', function(e) {
                    $(this).find('.code').css('display', 'none');
                });
                $('.lift .list').on('click', 'li.arrow', function(e) {
                    Goto.ctrl.init({});
                    Goto.ctrl.goto();
                });
            }
        };
        
        lift.init();
        var scrollHandler = function() {
            var lift = $('.lift');
            var scrollTop = $(window).scrollTop();
            var scrollLeft = $(window).scrollLeft();
    
            if (scrollTop >= 260) {
                lift.find('.arrow').css('visibility', 'visible');
            } else {
                lift.find('.arrow').css('visibility', 'hidden'); 
            }
    
        };
        var throttled = util.throttle(scrollHandler, 100, { leading: false });
        $(window).scroll(function() {
            throttled();
        });
    });
    define('main',["jquery","dataCtrl","tools","goal","links","table","compare","best","lift"], function($,dataCtrl,tools,goal,links,table,compare,best) {
    
        var mid = tools.getUrlParam("mid");
        if (!mid) window.location = "//nba.stats.qq.com/schedule/";
    
        dataCtrl.getMatchData(mid,function(data) {
            if (data.code === 0) {
                data = data.data;
    
                goal.init(data);
                best.init(data);
                links.init(mid,data);
                table.init(data);
                compare.init(data);
    
                if (typeof ExposureBoss === 'function') ExposureBoss(null, 'SSSJ_s');
            } else {
                throw new Error('KBS Data Interface error.');
            }
        });
        
    });
    
    require.config({
        baseUrl:'./scripts/',
        paths: {
            jquery: '//mat1.gtimg.com/libs/jquery/1.11.3/jquery.min'
        },
        shim:{
        }
    });
    
    require(['main']);
    
    define("config", function(){});
    
    }());