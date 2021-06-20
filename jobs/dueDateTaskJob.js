import cron from "node-cron";
import { TASK_STATUS } from "../config/constants";
import tasksServices from '../services/tasksServices';
import Error from "../utils/Error";


cron.schedule("*/5 * * * *", async () => { // Every 5 minutes */5
  try {
    console.log("cron executing... 5 minutes");
    const data = await tasksServices.verifyTaskForUpdateStatus();
    console.log('info',data);
    data.forEach( async(el) => {
      try {
        await tasksServices.updateStatus(TASK_STATUS.Due_Date, `${el.id}`);
      } catch (error) {
        throw Error(error);
      }
    })
  } catch (error) {
    console.log('error', error);
  }
 
});

export default cron;
