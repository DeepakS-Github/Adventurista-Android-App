export const getAPI = async (endpointURL) => {
  console.log(endpointURL);
  try {
    const response = await fetch(`https://adventurista-backend.vercel.app/api/${endpointURL}`, {
      method: 'GET',
    });
    const responseData = await response.json();
    console.log(responseData);
    return {data: responseData, status: response.status};
  } catch (error) {
    console.log(error);
  }
};

