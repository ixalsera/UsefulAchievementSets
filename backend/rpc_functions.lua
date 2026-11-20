local logger     = require("logger")
local millennium = require("millennium")

require("util.request")

---@ffi
---@return string
function getSteamBrewIconResource()
    logger:info("Getting SteamClientHomebrew icon...")
    return millennium.assets.read("resources/favicon.svg")
end

---@ffi
---@param appId number
---@return table
function getAchievementGroups(appId)
    return Request(string.format("https://steamhunters.com/api/GetAchievementGroups/v1?appid=%s", appId))
end

---@ffi
---@param appId number
---@return table
function getAchievementDetails(appId)
    return Request(string.format("https://steamhunters.com/api/apps/%s/achievements", appId))
end

---@ffi
---@param appId number
---@return table
function getAppInfo(appId)
    return Request(string.format("https://steamhunters.com/api/apps/%s", appId))
end

logger:info("Registered RPC Functions")
