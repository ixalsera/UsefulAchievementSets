local logger     = require("logger")
local millennium = require("millennium")
local utils      = require("utils")

-- define the RPC functions
require("rpc_functions")

local function on_load()
    logger:info("Loaded with Millennium version " .. millennium.version())
    millennium.ready()
end

-- Called when your plugin is unloaded. This happens when the plugin is disabled or Steam is shutting down.
-- NOTE: If Steam crashes or is force closed by task manager, this function may not be called -- so don't rely on it for critical cleanup.
local function on_unload()
    logger:info("Plugin unloaded")
end

-- Called when the Steam UI has fully loaded.
local function on_frontend_loaded()
    local start = utils.time_micro()
    logger:info("Frontend load notification received!")
    -- once the frontend is loaded, we can make calls with it.
end

local function get_patches()
    return {
        -- Achievements view: wrap the Valve block (toolbar + pinned list + AchievementsTable)
        -- in our tab component. `find` spans from the view's props destructure so the
        -- transform can capture `appid` and `overlayPinned`. Minified identifiers may
        -- contain `$`, hence `[\w$]+`.
        {
            file = [[sp\.js]],
            find =
            [[const\{appid:[\w$]+,targetsteamid:[\w$]+,asPanel:[\w$]+=!1,overlayPinned:[\w$]+=!1,.*?\(0,[\w$]+\.jsx\)\([\w$]+,\{typeFilter:[\w$]+,compareTo:[\w$]+\}\)\]\}\)]],
            transforms = {
                {
                    match =
                    [[(const\{appid:([\w$]+),targetsteamid:[\w$]+,asPanel:[\w$]+=!1,overlayPinned:([\w$]+)=!1,.*?)\(0,([\w$]+)\.jsxs\)\(([\w$]+\.s,\{direction:"column",gap:"5",children:\[\(0,[\w$]+\.jsx\)\([\w$]+\.az,\{className:[\w$]+\?[\w$]+\.OverlayHidden:void 0,children:\(0,[\w$]+\.jsx\)\([\w$]+,\{typeFilter:[\w$]+,setTypeFilter:[\w$]+\}\)\}\),\(0,[\w$]+\.jsx\)\([\w$]+,\{compareTo:[\w$]+\}\),\(0,[\w$]+\.jsx\)\([\w$]+,\{typeFilter:[\w$]+,compareTo:[\w$]+\}\)\]\}\))]],
                    replace =
                    [[\1(0,\4.jsx)(#{{self}}?.UASAchievementView?.Tabs||(p=>p.children),{appid:\2,overlayPinned:\3,children:(0,\4.jsxs)(\5})]],
                }
            }
        }
    }
end

return {
    on_frontend_loaded = on_frontend_loaded,
    on_load = on_load,
    on_unload = on_unload,
    patches = get_patches()
}
