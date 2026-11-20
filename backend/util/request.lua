local logger     = require("logger")
local json       = require("json")
local http       = require("http")

local DEFAULT_HEADERS = {
    ["Accept"] = "application/json,text/html",
    ["X-Requested-With"] = "Steam",
    ["User-Agent"] =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36"
}

--- Makes a request to the provided URL, optionally with passed headers
---@return string
function Request(url, headers)
    local options = {
        headers = headers or DEFAULT_HEADERS,
        timeout = 20
    }

    -- Add proxy settings back here if necessary
    --if settings.proxyUrl and settings.proxyUrl ~= "" then
    --    options.proxy = settings.proxyUrl
    --    options.verify_ssl = false
    --end

    local response, err = http.get(url, options)

    if not response then
        logger:error("Request failed: " .. (err or "No response"))
        return json.encode({
            success = false,
            error = err or "No response"
        })
    end

    if response.status ~= 200 then
        return json.encode({
            success = false,
            error = string.format("HTTP %s %s", response.status, response.body or "No response")
        })
    end

    -- TODO: Cache responses to avoid hammering the SH API (or other URLs)

    return response.body
end