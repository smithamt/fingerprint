import ZKJUBAER from "zk-jubaer";
// import ZKJUBAER from 'zkteco-js';


export const createFingerprintUser = async ({
  link,
  uid,
  userId,
  password,
  role,
  name,
}) => {
  let obj = new ZKJUBAER(link, 3000, 5200, 5000);

  try {
    await obj.createSocket();
    await obj.setUser(uid, userId, name, password, role);
    console.log("set user to finger print");
  } catch (error) {
    console.log("setUser error");
  }
};

// createFingerprintUser({
//   link: "172.16.88.15",
//   uid: 407,
//   userId: "S22",
//   password: "",
//   role: 0,
//   name: "Thae Sandi",
// });

export const connectMachine = async (link, port) => {
  let obj = new ZKJUBAER(link, port, 5200, 5000);
  try {
    await obj.createSocket();
    console.log('connect',)
    const info = await obj.getUsers();
    console.log("device info", link, info.data[info.data.length - 1]);

    const logs = await obj.getAttendances();
    await obj.disconnect();
    return logs.data;
  } catch (e) {
    console.log(e);
  }
};

connectMachine('172.16.88.15', 3000)

export const getFingerprintData = async (link, port) => {
  let obj = new ZKJUBAER(link, port, 10000, 5000);
  try {
    await obj.createSocket();
    const logs = await obj.getAttendances();
    const info = await obj.getUsers();
    console.log("last user", link, info.data[info.data.length - 1]);
    await obj.disconnect();
    return logs.data;
  } catch (e) {
    console.log(e);
  }
};

export const getFingerprintUsers = async (link, port) => {
  let obj = new ZKJUBAER(link, port, 5200, 5000);
  try {
    await obj.createSocket();
    const info = await obj.getUsers();

    await obj.disconnect();
    return info.data;
  } catch (e) {
    console.log(e);
  }
};


export const deleteFingerprintUser = async (link, port, uid) => {
  let obj = new ZKJUBAER(link, port, 5200, 5000);
  try {
    await obj.deleteUser();
    const info = await obj.createSocket(uid);
    console.log("delete user", info)
    await obj.disconnect();
    return info.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteAllAttendances = async (link, port) => {
  let obj = new ZKJUBAER(link, port, 5200, 5000);
  try {
    await obj.createSocket();
    await obj.clearAttendanceLog();
    console.log("All attendance logs cleared");
    await obj.disconnect();
  } catch (error) {
    console.log("Error clearing attendance logs:", error);
  }
};

// deleteAllAttendances("172.16.89.48", 3000)
// deleteAllAttendances("172.16.88.15", 3000)
// deleteAllAttendances("172.16.89.30", 3000)