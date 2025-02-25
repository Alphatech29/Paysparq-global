const { fetcher } = require("./fetcher");
const { getWebSettings } = require("./settings");
const { generateVTUId } = require("./uniqueID");

/**
 * ✅ Generate authentication headers (includes all required API keys)
 */
const getAuthHeaders = async () => {
    try {
        const settingsArray = await getWebSettings();

        if (!settingsArray || !Array.isArray(settingsArray) || settingsArray.length === 0) {
            throw new Error("VTU settings are missing.");
        }

        const settings = settingsArray[0]; 

        const { website_vtpass_api_key, website_vtpass_pk, website_vtpass_sk } = settings;

        if (!website_vtpass_api_key || !website_vtpass_pk || !website_vtpass_sk) {
            throw new Error("Missing API keys in web settings.");
        }

        const headers = {
            "api-key": website_vtpass_api_key,
            "public-key": website_vtpass_pk,
            "secret-key": website_vtpass_sk,
            "Content-Type": "application/json",
        };

        return headers;
    } catch (error) {
        throw error;
    }
};

/**
 * ✅ GET VTUPASS WALLET BALANCE
 */
exports.checkVtuBalance = async () => {
    try {
        const settingsArray = await getWebSettings();

        if (!settingsArray || !Array.isArray(settingsArray) || settingsArray.length === 0) {
            throw new Error("VTU settings are missing.");
        }
        const settings = settingsArray[0];

        if (!settings.website_vtpass_url || typeof settings.website_vtpass_url !== "string") {
            throw new Error(`Invalid VTU API base URL: ${JSON.stringify(settings.website_vtpass_url)}`);
        }

        const headers = await getAuthHeaders();
        const apiUrl = `${settings.website_vtpass_url}/api/balance`;

        const result = await fetcher({}, apiUrl, "GET", headers);

        if (result.code === 1) {
            const balance = parseFloat(result.contents.balance);
            return { success: true, balance };
        }

        return { success: false, error: result.response_description || "Failed to fetch balance" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * ✅ DIRECT RECHARGE (AIRTIME)
 */
exports.rechargeAirtime = async (amount, type, phone) => {
    try {
        const balanceCheck = await exports.checkVtuBalance();

        if (!balanceCheck.success || balanceCheck.balance < amount) {
            throw new Error("Insufficient VTU balance.");
        }
        const settingsArray = await getWebSettings();

        if (!settingsArray || !Array.isArray(settingsArray) || settingsArray.length === 0) {
            throw new Error("VTU settings are missing.");
        }

        const settings = settingsArray[0];

        if (!settings.website_vtpass_url) {
            throw new Error("VTU API base URL is missing in settings.");
        }

        const headers = await getAuthHeaders();

        const payload = {
            serviceID: type,
            request_id: generateVTUId(),
            amount,
            phone,
        };

        const url = `${settings.website_vtpass_url}/api/pay`;

        const result = await fetcher(payload, url, "POST", headers);

        if (result.code === "000") {
            return { success: true, message: "Airtime recharge successful", data: result };
        }

        return { success: false, error: result.response_description || "Recharge failed" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
