import axios from "axios";

const vaApi = axios.create({
  baseURL: "https://api.vam.ac.uk/v2",
});

const articApi = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
});

const usersApi = axios.create({
  baseURL: "https://virtually-curated-user-db.onrender.com/api",
});

export const retrieveAllCollections = (pg_number) => {
  const vaReq = `objects/search?page=${pg_number}&page_size=20&q=`;
  const articReq = `artworks?page=${pg_number}&limit=20`;

  const promise1 = vaApi.get(vaReq);
  const promise2 = articApi.get(articReq);

  return Promise.all([promise1, promise2])
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchAllCollections = (search_query, pg_number) => {
  const vaReq = `objects/search?page=${pg_number}&page_size=20&q=${search_query}`;
  const articReq = `/artworks/search?q=${search_query}&page=${pg_number}&limit=20`;

  const promise1 = vaApi.get(vaReq);
  const promise2 = articApi.get(articReq);

  return Promise.all([promise1, promise2])
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchCollections = (
  search_query,
  pg_number,
  search_category,
  posts_per_page,
  imgsOnly,
  onDisplay,
  date,
  filterCollections,
  orderBy
) => {
  let category = "";
  let imagesExist = "";
  let display = "";
  let yearMade = "";
  let collections = "";
  let sortingQuery = "";

  if (filterCollections.length > 0) {
    filterCollections.forEach(
      (query) => (collections = collections + `id_collection=${query}`)
    );
  }

  if (Object.keys(date).length === 2) {
    yearMade = `&year_made_from=${date.from}&year_made_to=${date.to}`;
  }

  if (onDisplay) {
    display =
      "&on_display_at=dundee&on_display_at=south_kensington&on_display_at=moc";
  }

  if (Object.keys(orderBy).length === 2) {
    sortingQuery = `&order_by=${orderBy.order_by}&order_sort=${orderBy.order_sort}`;
  }

  if (search_category === "all") {
    category = "q";
  } else if (search_category === "title") {
    category = "q_object_title";
  } else if (search_category === "type") {
    category = "q_object_type";
  } else if (search_category === "place") {
    category = "q_place_name";
  } else if (search_category === "materialtechnique") {
    category = "q_material_technique";
  } else if (search_category === "person") {
    category = "q_actor";
  }

  if (imgsOnly) {
    imagesExist = "&images_exist=true";
  }

  const queryStr = `/objects/search?${collections}${imagesExist}${display}&page=${pg_number}&page_size=${posts_per_page}&${category}=${search_query}${yearMade}${sortingQuery}`;

  return vaApi
    .get(queryStr)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      return err;
    });
};

export const retrieveSingleVaObject = (systemNumber) => {
  return vaApi.get(`/museumobject/${systemNumber}`).then(({ data }) => {
    return data;
  });
};

export const searchArtic = (search_query, page_number, postsPerPage) => {
  return articApi
    .get(
      `/artworks/search?q=${search_query}&page=${page_number}&limit=${postsPerPage}`
    )
    .then((data) => {
      return data.data;
    });
};

export const retrieveSingleArticObject = (id) => {
  return articApi.get(`/artworks/${id}`).then(({ data }) => {
    return data;
  });
};

export const retrieveUserIdLogin = (username, password) => {
  return usersApi
    .get(`/user/${username}/${password}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const retrieveUserCollections = (user_id) => {
  return usersApi
    .get(`/collections/${user_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const retrieveCollection = (user_id, collection_id) => {
  return usersApi
    .get(`/collections/${user_id}/${collection_id}`)
    .then(({ data }) => {
      return data;
    });
};

export const createNewUser = (userObj) => {
  return usersApi
    .post("/users", userObj)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteCollection = (user_id, password, collection_id) => {
  return usersApi.delete(
    `/collections/${user_id}/${password}/${collection_id}`
  );
};

export const createNewCollection = (user_id, password, collectionName) => {
  const collection_name = { collection_name: collectionName };
  return usersApi
    .post(`/collections/${user_id}/${password}`, collection_name)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const removeItemFromCollection = (
  user_id,
  password,
  collection_id,
  objectId
) => {
  const object_id = { objectId: `${objectId}` };
  return usersApi
    .patch(
      `/collections/${user_id}/${password}/${collection_id}/remove`,
      object_id
    )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const addToCollection = (user_id, password, collection_id, objectId) => {
  const object_id = { objectId: `${objectId}` };
  return usersApi
    .patch(`/collections/${user_id}/${password}/${collection_id}`, object_id)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
