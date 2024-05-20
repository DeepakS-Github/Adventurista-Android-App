export const postAPI = async (endpointURL, data) => {
  try {
    const response = await fetch(`https://adventurista-backend.vercel.app/api/${endpointURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
    return {data: responseData, status: response.status};
  } catch (error) {
    console.log("Error:", error);
  }
};
