exports.fetcher = async (body, url, method = "GET", headers = {}, jsonMode = true) => {
  try {
      const options = {
          method: method.toUpperCase(),
          credentials: "include",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
              ...headers
          }
      };

      if (jsonMode && method.toUpperCase() !== "GET") {
          options.body = JSON.stringify(body);
      } else if (!jsonMode) {
          options.body = body;
      }

      const response = await fetch(url, options);

      // Ensure proper response handling
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
          return await response.json();
      } else {
          return await response.text(); 
      }

  } catch (error) {
      console.error("Error in fetcher:", error);
      throw error;
  }
};
