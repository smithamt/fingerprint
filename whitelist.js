const whitelist = [
  "http://localhost:27016",
];


export const corsOptions = {
  origin: (
    requestOrigin,
    callback
  ) => {
    if (
      (requestOrigin && whitelist.indexOf(requestOrigin) !== -1) ||
      !requestOrigin
    ) {
      callback(null, true);
    } else {
      callback(new Error("not allow by cors!"));
    }
  },
  credentials: true,
};
