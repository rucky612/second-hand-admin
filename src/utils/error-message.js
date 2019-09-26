
import { message } from "antd"

export default function(error) {
  message.error(`${error.message}`);
}