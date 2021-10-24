export const fetchGet = async (url) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, requestOptions)
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });

  return res;
};

export const fetchPost = async (url, body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(url, requestOptions)
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });

  return res;
};

export const fetchPut = async (url, body) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, requestOptions)
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });

  return res;
};

export const fetchDelete = async (url) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, requestOptions)
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });

  return res;
};
