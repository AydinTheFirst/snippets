import axios from "axios";

class Netgsm {
  private netgsm = axios.create({
    baseURL: "https://api.netgsm.com.tr",
  });

  private netgsmConf = {
    appkey: "xxx",
    password: process.env.NETGSM_PASSWORD,
    usercode: process.env.NETGSM_USERCODE,
  };

  public async sendSMS(gsmno: string, message: string) {
    const res = await this.netgsm.post("/sms/send/get", null, {
      params: {
        ...this.netgsmConf,
        gsmno,
        message,
        msgheader: process.env.NETGSM_USERCODE,
      },
    });

    console.log(res.data);

    return res.data;
  }
}

export default new Netgsm();
