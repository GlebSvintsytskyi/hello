import { notification } from 'antd';

const openNatification = ({ text, type, title, duration = 3 }) =>
  notification[type]({
    message: title,
    description: text,
    duration,
});

export default openNatification;